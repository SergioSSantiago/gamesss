import { FEATURED_GAME_IDS, FEATURED_NAMES } from '../data/featured'
import { SPECIAL_GAME_IDS } from '../data/special'
import { PLATFORMS } from '../data/platforms'
import type { GameDetail, GameSummary } from '../types'
import { looksLikeCover, steamCoverUrls, uniqueUrls } from './covers'
import { yearFromDate } from './format'

const WD_API = 'https://www.wikidata.org/w/api.php'
const SPARQL = 'https://query.wikidata.org/sparql'
const WP_SUMMARY = 'https://en.wikipedia.org/api/rest_v1/page/summary/'
const GAME_CLASS = 'Q7889'

const mem = new Map<string, GameDetail>()
const searchCache = new Map<string, GameSummary[]>()

type WdEntity = {
  id: string
  labels?: Record<string, { value: string }>
  descriptions?: Record<string, { value: string }>
  aliases?: Record<string, { value: string }[]>
  claims?: Record<string, Claim[]>
  sitelinks?: Record<string, { title: string }>
}

type Claim = {
  mainsnak?: {
    datavalue?: {
      value?:
        | string
        | { id?: string; time?: string; 'text'?: string }
    }
  }
}

function labelOf(entity: WdEntity, ...langs: string[]): string {
  for (const lang of langs) {
    const value = entity.labels?.[lang]?.value
    if (value) return value
  }
  return entity.id
}

function descOf(entity: WdEntity): string {
  return entity.descriptions?.es?.value || entity.descriptions?.en?.value || ''
}

function claimIds(entity: WdEntity, prop: string): string[] {
  return (entity.claims?.[prop] ?? [])
    .map((c) => {
      const v = c.mainsnak?.datavalue?.value
      return typeof v === 'object' && v && 'id' in v ? v.id : null
    })
    .filter((id): id is string => Boolean(id))
}

function claimTime(entity: WdEntity, prop: string): string | null {
  const v = entity.claims?.[prop]?.[0]?.mainsnak?.datavalue?.value
  if (typeof v === 'object' && v && 'time' in v && v.time) {
    return v.time.replace(/^\+/, '').slice(0, 10)
  }
  return null
}

function claimStrings(entity: WdEntity, prop: string): string[] {
  return (entity.claims?.[prop] ?? [])
    .map((c) => {
      const v = c.mainsnak?.datavalue?.value
      return typeof v === 'string' ? v : null
    })
    .filter((v): v is string => Boolean(v))
}

/** Reject towns, political unions, songs, etc. that slipped in via wrong QIDs. */
function isVideoGameEntity(entity: WdEntity): boolean {
  const types = claimIds(entity, 'P31')
  if (types.includes(GAME_CLASS)) return true
  const desc = descOf(entity).toLowerCase()
  return /\b(video ?game|videogame|jeu vid[eé]o|videojuego)\b/.test(desc)
}

export function commonsThumb(fileOrUrl: string, width = 400): string {
  if (fileOrUrl.includes('Special:FilePath')) {
    const https = fileOrUrl.replace('http://', 'https://')
    return `${https}${https.includes('?') ? '&' : '?'}width=${width}`
  }
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileOrUrl)}?width=${width}`
}

async function wdApi(params: Record<string, string>): Promise<unknown> {
  const url = new URL(WD_API)
  url.search = new URLSearchParams({ format: 'json', origin: '*', ...params }).toString()
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Wikidata ${res.status}`)
  return res.json()
}

async function sparqlBindings(query: string): Promise<Record<string, { value: string }>[]> {
  const url = `${SPARQL}?format=json&query=${encodeURIComponent(query)}`
  const res = await fetch(url, { headers: { Accept: 'application/sparql-results+json' } })
  if (!res.ok) throw new Error(`SPARQL ${res.status}`)
  const json = (await res.json()) as { results?: { bindings?: Record<string, { value: string }>[] } }
  return json.results?.bindings ?? []
}

function qidFromUri(uri: string): string {
  return uri.split('/').pop() ?? uri
}

async function getEntitiesRaw(ids: string[]): Promise<WdEntity[]> {
  const unique = [...new Set(ids.filter((id) => /^Q\d+$/.test(id)))]
  if (!unique.length) return []
  const chunks: string[][] = []
  for (let i = 0; i < unique.length; i += 40) chunks.push(unique.slice(i, i + 40))
  const out: WdEntity[] = []
  for (const chunk of chunks) {
    const json = (await wdApi({
      action: 'wbgetentities',
      ids: chunk.join('|'),
      props: 'labels|descriptions|aliases|claims|sitelinks',
      languages: 'es|en',
    })) as { entities?: Record<string, WdEntity> }
    out.push(...Object.values(json.entities ?? {}).filter((e) => e.id))
  }
  return out
}

async function wikipediaThumb(title: string): Promise<{ image: string | null; extract: string; url: string | null }> {
  try {
    const res = await fetch(`${WP_SUMMARY}${encodeURIComponent(title)}`)
    if (!res.ok) return { image: null, extract: '', url: null }
    const json = (await res.json()) as {
      thumbnail?: { source?: string }
      originalimage?: { source?: string }
      extract?: string
      content_urls?: { desktop?: { page?: string } }
    }
    return {
      image: json.originalimage?.source || json.thumbnail?.source || null,
      extract: json.extract ?? '',
      url: json.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    }
  } catch {
    return { image: null, extract: '', url: null }
  }
}

async function wikipediaCovers(titles: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  const unique = [...new Set(titles.filter(Boolean))]
  for (let i = 0; i < unique.length; i += 40) {
    const chunk = unique.slice(i, i + 40)
    const json = (await wdApiFrom('https://en.wikipedia.org/w/api.php', {
      action: 'query',
      titles: chunk.join('|'),
      prop: 'pageimages',
      pithumbsize: '800',
      piprop: 'thumbnail|name|original',
    })) as {
      query?: {
        normalized?: { from: string; to: string }[]
        pages?: Record<string, { title: string; original?: { source?: string }; thumbnail?: { source?: string } }>
      }
    }
    const normalized = new Map((json.query?.normalized ?? []).map((n) => [n.from, n.to]))
    const byTitle = new Map<string, string>()
    for (const page of Object.values(json.query?.pages ?? {})) {
      const src = page.original?.source || page.thumbnail?.source
      if (src) byTitle.set(page.title, src)
    }
    for (const title of chunk) {
      const src = byTitle.get(normalized.get(title) ?? title) || byTitle.get(title)
      if (src) map.set(title, src)
    }
  }
  return map
}

async function wdApiFrom(base: string, params: Record<string, string>): Promise<unknown> {
  const url = new URL(base)
  url.search = new URLSearchParams({ format: 'json', origin: '*', ...params }).toString()
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Wiki ${res.status}`)
  return res.json()
}

const commonsCoverCache = new Map<string, string | null>()

async function commonsCoverSearch(name: string): Promise<string | null> {
  const key = name.toLowerCase()
  if (commonsCoverCache.has(key)) return commonsCoverCache.get(key) ?? null
  try {
    const json = (await wdApiFrom('https://commons.wikimedia.org/w/api.php', {
      action: 'query',
      list: 'search',
      srsearch: `"${name}" (cover OR "box art" OR carátula OR jaquette)`,
      srnamespace: '6',
      srlimit: '8',
    })) as { query?: { search?: { title: string }[] } }
    const file = (json.query?.search ?? [])
      .map((r) => r.title.replace(/^File:/, ''))
      .find((title) => looksLikeCover(title) && !/\.(webm|ogv|svg)$/i.test(title))
    const url = file ? commonsThumb(file, 600) : null
    commonsCoverCache.set(key, url)
    return url
  } catch {
    commonsCoverCache.set(key, null)
    return null
  }
}

function rankedCovers(entity: WdEntity, wikiCover: string | null, commonsCover: string | null): string[] {
  const steam = claimStrings(entity, 'P1733')[0]
  const p18 = claimStrings(entity, 'P18')
  const coverP18 = p18.filter(looksLikeCover).map((f) => commonsThumb(f, 600))
  const otherP18 = p18.filter((f) => !looksLikeCover(f)).map((f) => commonsThumb(f, 600))
  return uniqueUrls([
    ...(steam ? steamCoverUrls(steam) : []),
    commonsCover,
    ...coverP18,
    wikiCover,
    ...otherP18,
  ])
}

function toSummary(entity: WdEntity, labels: Map<string, string>, covers: string[]): GameSummary {
  const released = claimTime(entity, 'P577')
  const platformIds = claimIds(entity, 'P400')
  return {
    id: entity.id,
    name: labelOf(entity, 'es', 'en'),
    image: covers[0] ?? null,
    covers,
    year: yearFromDate(released),
    description: descOf(entity),
    released,
    platforms: platformIds.map((id) => ({
      id,
      name: labels.get(id) || PLATFORMS.find((p) => p.id === id)?.name || id,
    })),
    genres: claimIds(entity, 'P136').map((id) => labels.get(id) ?? id),
    developers: claimIds(entity, 'P178').map((id) => labels.get(id) ?? id),
    publishers: claimIds(entity, 'P123').map((id) => labels.get(id) ?? id),
  }
}

export async function getGames(ids: string[]): Promise<GameDetail[]> {
  const missing = ids.filter((id) => !mem.has(id))
  if (missing.length) {
    const raw = await getEntitiesRaw(missing)
    const entities = raw.filter(isVideoGameEntity)
    const extraIds = new Set<string>()
    for (const e of entities) {
      for (const prop of ['P400', 'P136', 'P178', 'P123']) {
        for (const id of claimIds(e, prop)) extraIds.add(id)
      }
    }
    const extras = extraIds.size ? await getEntitiesRaw([...extraIds]) : []
    const labels = new Map<string, string>()
    for (const e of extras) labels.set(e.id, labelOf(e, 'es', 'en'))

    const wikiTitles = entities
      .map((e) => e.sitelinks?.enwiki?.title || e.sitelinks?.eswiki?.title)
      .filter((t): t is string => Boolean(t))
    const wikiCoverMap = await wikipediaCovers(wikiTitles).catch(() => new Map<string, string>())

    const wikiJobs = entities.map(async (entity) => {
      let extract = ''
      let wikipediaUrl: string | null = null
      const wikiTitle = entity.sitelinks?.enwiki?.title || entity.sitelinks?.eswiki?.title
      const enName = labelOf(entity, 'en', 'es')
      if (wikiTitle) {
        const wp = await wikipediaThumb(wikiTitle)
        extract = wp.extract
        wikipediaUrl = wp.url
      }
      const hasSteam = Boolean(claimStrings(entity, 'P1733')[0])
      const hasCoverFile = claimStrings(entity, 'P18').some(looksLikeCover)
      const commonsCover = !hasSteam && !hasCoverFile && !wikiCoverMap.get(wikiTitle ?? '')
        ? await commonsCoverSearch(enName)
        : null
      const covers = rankedCovers(entity, wikiCoverMap.get(wikiTitle ?? '') ?? null, commonsCover)
      const summary = toSummary(entity, labels, covers)
      const aliases = [
        ...(entity.aliases?.es ?? []),
        ...(entity.aliases?.en ?? []),
      ].map((a) => a.value)
      const detail: GameDetail = { ...summary, extract, wikipediaUrl, aliases }
      mem.set(entity.id, detail)
    })
    await Promise.all(wikiJobs)
  }
  return ids.map((id) => mem.get(id)).filter((g): g is GameDetail => Boolean(g))
}

export async function getGame(id: string): Promise<GameDetail | null> {
  const [game] = await getGames([id])
  return game ?? null
}

export async function searchGames(
  query: string,
  limit = 24,
  offset = 0,
  platformId?: string,
): Promise<GameSummary[]> {
  const q = query.trim()
  if (!q) return []
  const key = `${q}:${platformId ?? ''}:${limit}:${offset}`
  const cached = searchCache.get(key)
  if (cached) return cached

  const platformFilter = platformId ? ` haswbstatement:P400=${platformId}` : ''
  const json = (await wdApi({
    action: 'query',
    list: 'search',
    srsearch: `${q} haswbstatement:P31=${GAME_CLASS}${platformFilter}`,
    srnamespace: '0',
    srlimit: String(limit),
    sroffset: String(offset),
  })) as { query?: { search?: { title: string }[] } }

  const ids = (json.query?.search ?? [])
    .map((r) => r.title)
    .filter((t) => /^Q\d+$/.test(t))
  const games = await getGames(ids)
  searchCache.set(key, games)
  return games
}

export async function gamesOnPlatform(platformId: string, limit = 24, offset = 0): Promise<GameSummary[]> {
  const key = `plat:${platformId}:${limit}:${offset}`
  const cached = searchCache.get(key)
  if (cached) return cached

  const json = (await wdApi({
    action: 'query',
    list: 'search',
    srsearch: `haswbstatement:P31=${GAME_CLASS} haswbstatement:P400=${platformId}`,
    srnamespace: '0',
    srlimit: String(limit),
    sroffset: String(offset),
  })) as { query?: { search?: { title: string }[] } }

  const ids = (json.query?.search ?? [])
    .map((r) => r.title)
    .filter((t) => /^Q\d+$/.test(t))
  const games = await getGames(ids)
  searchCache.set(key, games)
  return games
}

export async function popularGames(): Promise<GameSummary[]> {
  const key = 'popular'
  const cached = searchCache.get(key)
  if (cached) return cached
  try {
    const bindings = await sparqlBindings(`
      SELECT ?game WHERE {
        ?game wdt:P31 wd:${GAME_CLASS};
              wikibase:sitelinks ?links.
        FILTER(?links >= 45)
      }
      ORDER BY DESC(?links)
      LIMIT 24
    `)
    const ids = bindings.map((b) => qidFromUri(b.game.value))
    const games = await getGames(ids)
    if (games.length) {
      searchCache.set(key, games)
      return games
    }
  } catch {
    // fallback below
  }
  const featured = await getGames(FEATURED_GAME_IDS)
  if (featured.length) {
    searchCache.set(key, featured)
    return featured
  }
  const searched = (
    await Promise.all(FEATURED_NAMES.slice(0, 12).map((name) => searchGames(name, 1)))
  ).flat()
  searchCache.set(key, searched)
  return searched
}

export async function recentGames(): Promise<GameSummary[]> {
  const key = 'recent'
  const cached = searchCache.get(key)
  if (cached) return cached
  const year = new Date().getFullYear() - 1
  try {
    const bindings = await sparqlBindings(`
      SELECT ?game WHERE {
        ?game wdt:P31 wd:${GAME_CLASS};
              wdt:P577 ?date;
              wikibase:sitelinks ?links.
        FILTER(?date >= "${year}-01-01T00:00:00Z"^^xsd:dateTime)
        FILTER(?links >= 15)
      }
      ORDER BY DESC(?date)
      LIMIT 18
    `)
    const ids = bindings.map((b) => qidFromUri(b.game.value))
    const games = await getGames(ids)
    if (games.length) {
      searchCache.set(key, games)
      return games
    }
  } catch {
    // ignore
  }
  return popularGames()
}

export async function classics(): Promise<GameSummary[]> {
  const key = 'classics'
  const cached = searchCache.get(key)
  if (cached) return cached
  const ids = [
    'Q11168', // Super Mario Bros.
    'Q213911', // Ocarina of Time
    'Q1194825', // Super Metroid
    'Q761815', // Chrono Trigger
    'Q214232', // Final Fantasy VII
    'Q2007022', // Symphony of the Night
    'Q1133204', // Street Fighter II
    'Q193581', // Half-Life 2
    'Q279446', // Portal 2
    'Q17452', // GTA V
    'Q1986744', // The Last of Us
    'Q1166232', // Dark Souls
  ]
  const games = await getGames(ids)
  searchCache.set(key, games)
  return games
}

export async function specialGames(): Promise<GameSummary[]> {
  const key = 'special'
  const cached = searchCache.get(key)
  if (cached) return cached
  const games = await getGames(SPECIAL_GAME_IDS)
  searchCache.set(key, games)
  return games
}
