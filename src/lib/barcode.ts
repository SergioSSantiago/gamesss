import { searchGames } from './wikidata'
import type { GameSummary } from '../types'

const OPF_API = 'https://world.openproductsfacts.org/api/v2/product'
const WD_API = 'https://www.wikidata.org/w/api.php'
const SPARQL = 'https://query.wikidata.org/sparql'

export type BarcodeHit = {
  barcode: string
  productName: string
  brand?: string
  platform?: string
  igdbId?: number
  source: 'scandex' | 'upcitemdb' | 'openproductsfacts' | 'wikidata' | 'manual'
  /** Wikidata Q-id si el GTIN está enlazado directamente */
  wikidataId?: string
}

export type BarcodeLookupResult = {
  barcode: string
  hit: BarcodeHit | null
  query: string
  games: GameSummary[]
}

/** Variantes UPC-A / EAN-13 habituales en cajas. */
export function barcodeVariants(raw: string): string[] {
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 14) return []
  const out = new Set<string>([digits])
  if (digits.length === 12) out.add(`0${digits}`)
  if (digits.length === 13 && digits.startsWith('0')) out.add(digits.slice(1))
  if (digits.length === 14 && digits.startsWith('0')) {
    out.add(digits.slice(1))
    if (digits.startsWith('00')) out.add(digits.slice(2))
  }
  // sin ceros a la izquierda (algunas DBs)
  out.add(digits.replace(/^0+/, '') || digits)
  return [...out]
}

export function isLikelyBarcode(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 14 && /^\d+$/.test(digits)
}

/** Limpia nombres de producto de tienda → título buscable. */
export function cleanProductTitle(name: string, brand?: string): string {
  let t = name.trim()
  t = t.replace(/\s+/g, ' ')
  // Prefijos / ruido común en Open Products Facts
  t = t.replace(/^(jeu(x)?|video\s*game|juego|game)\s*[:\-–]?\s*/i, '')
  t = t.replace(
    /\b(nintendo\s*)?(switch\s*2|switch|wii\s*u|wii|3ds|nds|n64|gamecube|game\s*boy[^,)]*|xbox\s*(series\s*)?[sx]|xbox\s*one|xbox|playstation\s*[1-5]|ps[1-5]|psp|ps\s*vita|steam|pc)\b/gi,
    ' ',
  )
  t = t.replace(/[([].*?[)\]]/g, ' ')
  t = t.replace(
    /\b(edition|édition|deluxe|standard|complete|hits|selects|greatest hits|platinum|essentials)\b/gi,
    ' ',
  )
  if (brand) {
    const re = new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'ig')
    t = t.replace(re, ' ')
  }
  t = t.replace(/[,:;|/]+/g, ' ').replace(/\s+/g, ' ').trim()
  // Capitaliza suave si viene todo en minúsculas
  if (t === t.toLowerCase() && t.length > 2) {
    t = t.replace(/\b\w/g, (c) => c.toUpperCase())
  }
  return t || name.trim()
}

type ScanDexApiHit = {
  barcode: string
  name: string
  platform?: string | null
  igdbId?: number | null
  igdbPlatformId?: number | null
  brand?: string | null
  source: 'scandex' | 'upcitemdb'
}

/** Variantes de título para buscar en Wikidata tras un hit de barcode. */
export function titleSearchVariants(name: string): string[] {
  const base = name.trim()
  if (!base) return []
  const out = new Set<string>([base])

  let t = cleanProductTitle(base)
  if (t) out.add(t)

  t = t
    .replace(/\b(remake|reboot|hd(\s*remaster)?|ultimate\s*hd(\s*edition)?|wii\s*edition|vr|gold\s*edition|complete\s*edition|definitive\s*edition)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (t) out.add(t)

  // "Resident Evil 4 (2023 video game)" → "Resident Evil 4"
  t = t.replace(/\s*\([^)]*\)\s*$/g, '').trim()
  if (t) out.add(t)

  return [...out].filter(Boolean)
}

async function lookupScanDex(barcode: string): Promise<BarcodeHit | null> {
  try {
    const res = await fetch(`/api/scandex?value=${encodeURIComponent(barcode)}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as ScanDexApiHit
    if (!data?.name) return null
    return {
      barcode: data.barcode || barcode,
      productName: data.name,
      platform: data.platform || undefined,
      brand: data.brand || undefined,
      igdbId: data.igdbId ?? undefined,
      source: data.source === 'upcitemdb' ? 'upcitemdb' : 'scandex',
    }
  } catch {
    return null
  }
}

async function searchCatalogForHit(hit: BarcodeHit): Promise<{ query: string; games: GameSummary[] }> {
  const seed =
    hit.source === 'scandex'
      ? hit.productName
      : cleanProductTitle(hit.productName, hit.brand) || hit.productName
  // Siempre ampliar: "… Remake" → también "…" (clave para RE4 2023 en Wikidata)
  const variants = titleSearchVariants(seed)
  const seen = new Set<string>()
  const merged: GameSummary[] = []
  let query = variants[0] || seed

  for (const q of variants) {
    const list = await searchGames(q, 24)
    if (!merged.length && list.length) query = q
    for (const g of list) {
      if (seen.has(g.id)) continue
      seen.add(g.id)
      merged.push(g)
    }
    if (merged.length >= 12) break
  }

  return { query, games: rankGamesForHit(merged, hit) }
}

async function lookupOpenProducts(barcode: string): Promise<BarcodeHit | null> {
  for (const code of barcodeVariants(barcode)) {
    try {
      const res = await fetch(`${OPF_API}/${encodeURIComponent(code)}.json`, {
        headers: { Accept: 'application/json', 'User-Agent': 'Gamesss/1.0 (barcode lookup)' },
      })
      if (!res.ok) continue
      const data = (await res.json()) as {
        status?: number
        product?: {
          product_name?: string
          product_name_en?: string
          product_name_fr?: string
          product_name_es?: string
          generic_name?: string
          brands?: string
          categories_tags?: string[]
        }
      }
      if (data.status !== 1 || !data.product) continue
      const p = data.product
      const name =
        p.product_name_en ||
        p.product_name_es ||
        p.product_name_fr ||
        p.product_name ||
        p.generic_name
      if (!name) continue
      const tags = (p.categories_tags || []).join(' ').toLowerCase()
      const looksGame =
        /video.?game|jeu.?vid|videojuego|software|game.?console|nintendo|playstation|xbox|sega/.test(
          tags + ' ' + name.toLowerCase(),
        )
      // Aceptamos también si no hay categoría clara: muchas fichas OPF son pobres
      if (!looksGame && tags && !/electronic|software|game/.test(tags)) continue
      return {
        barcode: code,
        productName: name,
        brand: p.brands?.split(',')[0]?.trim(),
        source: 'openproductsfacts',
      }
    } catch {
      /* try next variant */
    }
  }
  return null
}

async function lookupWikidataGtin(barcode: string): Promise<BarcodeHit | null> {
  const variants = barcodeVariants(barcode)
  if (!variants.length) return null

  // Búsqueda MediaWiki rápida por haswbstatement
  for (const code of variants) {
    try {
      const url = new URL(WD_API)
      url.searchParams.set('action', 'query')
      url.searchParams.set('list', 'search')
      url.searchParams.set('srsearch', `haswbstatement:P3962=${code}`)
      url.searchParams.set('srnamespace', '0')
      url.searchParams.set('srlimit', '5')
      url.searchParams.set('format', 'json')
      url.searchParams.set('origin', '*')
      const res = await fetch(url.toString())
      if (!res.ok) continue
      const data = (await res.json()) as {
        query?: { search?: { title: string; snippet: string }[] }
      }
      const hits = data.query?.search ?? []
      for (const h of hits) {
        const id = h.title
        if (!/^Q\d+$/.test(id)) continue
        const labelUrl = new URL(WD_API)
        labelUrl.searchParams.set('action', 'wbgetentities')
        labelUrl.searchParams.set('ids', id)
        labelUrl.searchParams.set('props', 'labels|descriptions|claims')
        labelUrl.searchParams.set('languages', 'en|es|fr')
        labelUrl.searchParams.set('format', 'json')
        labelUrl.searchParams.set('origin', '*')
        const er = await fetch(labelUrl.toString())
        if (!er.ok) continue
        const ed = (await er.json()) as {
          entities?: Record<
            string,
            {
              labels?: Record<string, { value: string }>
              claims?: Record<string, { mainsnak?: { datavalue?: { value?: { id?: string } } } }[]>
            }
          >
        }
        const ent = ed.entities?.[id]
        if (!ent) continue
        const types = (ent.claims?.P31 ?? [])
          .map((c) => c.mainsnak?.datavalue?.value?.id)
          .filter(Boolean)
        if (!types.includes('Q7889')) continue
        const name =
          ent.labels?.en?.value || ent.labels?.es?.value || ent.labels?.fr?.value || id
        return {
          barcode: code,
          productName: name,
          source: 'wikidata',
          wikidataId: id,
        }
      }
    } catch {
      /* next */
    }
  }

  // SPARQL fallback (más lento)
  const values = variants.map((v) => `"${v}"`).join(' ')
  const query = `
    SELECT ?item ?itemLabel WHERE {
      VALUES ?gtin { ${values} }
      ?item wdt:P3962 ?gtin .
      ?item wdt:P31 wd:Q7889 .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en,es,fr". }
    } LIMIT 3`
  try {
    const url = new URL(SPARQL)
    url.searchParams.set('query', query)
    url.searchParams.set('format', 'json')
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/sparql-results+json', 'User-Agent': 'Gamesss/1.0' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      results?: { bindings?: { item: { value: string }; itemLabel: { value: string } }[] }
    }
    const b = data.results?.bindings?.[0]
    if (!b) return null
    const id = b.item.value.split('/').pop()!
    return {
      barcode: variants[0],
      productName: b.itemLabel.value,
      source: 'wikidata',
      wikidataId: id,
    }
  } catch {
    return null
  }
}

function rankGamesForHit(games: GameSummary[], hit: BarcodeHit): GameSummary[] {
  const platformNeedle = (hit.platform || '').toLowerCase()
  if (!platformNeedle) return games

  const score = (g: GameSummary) => {
    const plats = g.platforms.map((p) => p.name.toLowerCase()).join(' ')
    if (plats.includes(platformNeedle)) return 2
    // fuzzy: "PlayStation 5" ↔ "PS5", "Nintendo Switch" ↔ "Switch"
    const short = platformNeedle
      .replace('playstation', 'ps')
      .replace('nintendo ', '')
      .replace('xbox series x|s', 'xbox series')
    if (short && plats.includes(short)) return 1
    return 0
  }

  return [...games].sort((a, b) => score(b) - score(a))
}

/**
 * Resuelve un código de barras de caja → candidatos en el catálogo Wikidata.
 * Orden: ScanDex → Wikidata GTIN → Open Products Facts → búsqueda por título.
 */
export async function lookupBarcode(raw: string): Promise<BarcodeLookupResult> {
  const barcode = raw.replace(/\D/g, '')
  if (!isLikelyBarcode(barcode)) {
    return { barcode, hit: null, query: '', games: [] }
  }

  const scandex = await lookupScanDex(barcode)
  const wd = scandex ? null : await lookupWikidataGtin(barcode)
  const opf = scandex || wd ? null : await lookupOpenProducts(barcode)
  const hit = scandex ?? wd ?? opf

  if (hit?.wikidataId) {
    const games = await searchGames(hit.productName, 12)
    const exact = games.find((g) => g.id === hit.wikidataId)
    const ordered = exact
      ? [exact, ...games.filter((g) => g.id !== hit.wikidataId)]
      : games
    return {
      barcode: hit.barcode,
      hit,
      query: hit.productName,
      games: ordered,
    }
  }

  if (hit) {
    const { query, games } = await searchCatalogForHit(hit)
    return { barcode: hit.barcode, hit, query, games }
  }

  // Sin ficha de producto: no inventamos título
  return { barcode, hit: null, query: '', games: [] }
}
