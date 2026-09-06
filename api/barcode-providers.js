/**
 * Barcode → game title providers (server-side only).
 * Order used by /api/scandex: ScanDex → PriceCharting → UPCitemdb → Barcode Lookup.
 *
 * CLZ / Collectorz: no public API — not available.
 */

const SCANDEX = 'https://scandex.gamery.app/api/v2/lookup'
const UPCITEMDB = 'https://api.upcitemdb.com/prod/trial/lookup'
const PRICECHARTING = 'https://www.pricecharting.com/api/product'
const BARCODELOOKUP = 'https://api.barcodelookup.com/v3/products'

/** Token d’exemple publié dans la doc PriceCharting (remplaçable via PRICECHARTING_TOKEN). */
const PC_DOCS_DEMO_TOKEN = 'c0b53bce27c1bdab90b1605249e600dc43dfd1d5'

export function barcodeVariants(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 14) return []
  const out = new Set([digits])
  if (digits.length === 12) {
    out.add(`0${digits}`)
    out.add(`00${digits}`)
  }
  if (digits.length === 13 && digits.startsWith('0')) {
    out.add(digits.slice(1))
    out.add(`0${digits}`)
  }
  if (digits.length === 13 && !digits.startsWith('0')) {
    out.add(`0${digits}`)
  }
  if (digits.length === 14 && digits.startsWith('0')) {
    out.add(digits.slice(1))
    if (digits.startsWith('00')) out.add(digits.slice(2))
  }
  out.add(digits.replace(/^0+/, '') || digits)
  return [...out]
}

function looksLikeGameTitle(title, category = '', brand = '') {
  const t = `${title} ${category} ${brand}`.toLowerCase()
  return /video.?game|nintendo|playstation|xbox|sega|switch|gamecube|wii|steam|capcom|resident evil|biohazard|jeu vid|videojuego|game boy|console|\b(ps[1-5]|psp|3ds|nds|snes|nes)\b/.test(
    t,
  )
}

export async function lookupScanDex(token, code) {
  if (!token) return null
  const res = await fetch(`${SCANDEX}?value=${encodeURIComponent(code)}`, {
    headers: {
      Accept: 'application/json',
      Authorization: token,
      'User-Agent': 'Gamesss/1.0 (barcode)',
    },
  })
  if (res.status === 401 || res.status === 403) {
    const err = new Error('scandex_auth_failed')
    err.code = 'AUTH'
    throw err
  }
  const data = await res.json().catch(() => null)
  if (!data || data.message) return null
  const meta = data.igdb_metadata
  if (!meta?.name) return null
  return {
    barcode: code,
    name: meta.name,
    platform: meta.platform?.name || null,
    igdbId: meta.id ?? null,
    igdbPlatformId: meta.platform?.id ?? null,
    brand: null,
    source: 'scandex',
  }
}

export async function lookupPriceCharting(token, code) {
  const t = token || process.env.PRICECHARTING_TOKEN || PC_DOCS_DEMO_TOKEN
  if (!t) return null
  const url = `${PRICECHARTING}?t=${encodeURIComponent(t)}&upc=${encodeURIComponent(code)}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'Gamesss/1.0 (barcode)' },
  })
  if (!res.ok) return null
  const data = await res.json().catch(() => null)
  if (!data || data.status === 'error' || !data['product-name']) return null
  return {
    barcode: code,
    name: data['product-name'],
    platform: data['console-name'] || null,
    igdbId: null,
    igdbPlatformId: null,
    brand: null,
    pricechartingId: data.id || null,
    source: 'pricecharting',
  }
}

export async function lookupUpcItemDb(code) {
  const res = await fetch(`${UPCITEMDB}?upc=${encodeURIComponent(code)}`, {
    headers: { Accept: 'application/json', 'User-Agent': 'Gamesss/1.0 (barcode)' },
  })
  if (!res.ok) return null
  const data = await res.json().catch(() => null)
  const item = data?.items?.[0]
  if (!item?.title) return null
  if (!looksLikeGameTitle(item.title, item.category, item.brand)) {
    if (item.category && !/game|toy|software|electronic/i.test(item.category)) return null
  }
  return {
    barcode: code,
    name: item.title,
    platform: null,
    igdbId: null,
    igdbPlatformId: null,
    brand: item.brand || null,
    source: 'upcitemdb',
  }
}

export async function lookupBarcodeLookup(apiKey, code) {
  const key = apiKey || process.env.BARCODELOOKUP_API_KEY
  if (!key) return null
  const url = `${BARCODELOOKUP}?barcode=${encodeURIComponent(code)}&formatted=y&key=${encodeURIComponent(key)}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'Gamesss/1.0 (barcode)' },
  })
  if (!res.ok) return null
  const data = await res.json().catch(() => null)
  const p = data?.products?.[0]
  if (!p?.product_name && !p?.title) return null
  const name = p.product_name || p.title
  const category = Array.isArray(p.category) ? p.category.join(' ') : p.category || ''
  if (!looksLikeGameTitle(name, category, p.brand || '')) {
    if (category && !/game|toy|software|electronic|video/i.test(category)) return null
  }
  return {
    barcode: code,
    name,
    platform: null,
    igdbId: null,
    igdbPlatformId: null,
    brand: p.brand || null,
    source: 'barcodelookup',
  }
}

/**
 * Try all providers across UPC/EAN variants. Returns first hit.
 */
export async function resolveBarcode(raw, opts = {}) {
  const codes = barcodeVariants(raw)
  if (!codes.length) return { hit: null, tried: [], error: 'invalid_barcode' }

  const scandexToken = opts.scandexToken || process.env.SCANDEX_TOKEN
  const pcToken = opts.pricechartingToken || process.env.PRICECHARTING_TOKEN || PC_DOCS_DEMO_TOKEN
  const blKey = opts.barcodelookupKey || process.env.BARCODELOOKUP_API_KEY

  const providers = [
    {
      name: 'scandex',
      run: (code) => lookupScanDex(scandexToken, code),
    },
    {
      name: 'pricecharting',
      run: (code) => lookupPriceCharting(pcToken, code),
    },
    {
      name: 'upcitemdb',
      run: (code) => lookupUpcItemDb(code),
    },
    {
      name: 'barcodelookup',
      run: (code) => lookupBarcodeLookup(blKey, code),
    },
  ]

  for (const provider of providers) {
    for (const code of codes) {
      try {
        const hit = await provider.run(code)
        if (hit?.name) return { hit, tried: codes, provider: provider.name }
      } catch (err) {
        if (err && err.code === 'AUTH') {
          return { hit: null, tried: codes, error: 'scandex_auth_failed' }
        }
        /* try next code / provider */
      }
    }
  }

  return { hit: null, tried: codes, error: 'not_found' }
}
