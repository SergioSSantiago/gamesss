import type { GameSummary } from '../types'
import { searchGames } from './wikidata'

export type CoverOcrResult = {
  rawText: string
  candidates: string[]
  best: string
  games: GameSummary[]
}

const NOISE =
  /\b(pegi|esrb|cero|usk|nintendo|sony|microsoft|sega|ubisoft|ea sports|electronic arts|activision|bandai|namco|capcom|square enix|warner|only on|multiplayer|online|players?|wireless|vibration|memory|card|disc|dvd|blu-?ray|includes?|manual|instruction|contents?|warning|rated|mature|teen|everyone|comic|violence|blood|language|switch|playstation|xbox|steam|epic|pc dvd|windows)\b/i

function normalizeLine(line: string): string {
  return line
    .replace(/[|{}[\]<>_=]+/g, ' ')
    .replace(/[^\p{L}\p{N}\s:'&.\-!?/]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreLine(line: string): number {
  const t = normalizeLine(line)
  if (t.length < 3) return -100
  if (/^\d+([.,]\d+)?$/.test(t)) return -100
  if (NOISE.test(t) && t.split(' ').length <= 3) return -40
  let score = Math.min(t.length, 40)
  // Títulos suelen tener mayúsculas / pocas palabras
  const words = t.split(' ').filter(Boolean)
  if (words.length >= 1 && words.length <= 8) score += 12
  if (words.length > 12) score -= 20
  const letters = (t.match(/\p{L}/gu) || []).length
  const digits = (t.match(/\d/g) || []).length
  if (letters < 3) score -= 30
  if (digits > letters) score -= 25
  if (NOISE.test(t)) score -= 8
  // Bonus si parece título propio
  if (/^[A-Z0-9]/.test(t) || /\b[A-Z]{2,}\b/.test(t)) score += 6
  return score
}

/** Extrae candidatos a título desde texto OCR de una carátula. */
export function titleCandidatesFromOcr(text: string): string[] {
  const lines = text
    .split(/\n+/)
    .map(normalizeLine)
    .filter(Boolean)

  const ranked = [...new Set(lines)]
    .map((line) => ({ line, score: scoreLine(line) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  const out: string[] = []
  for (const { line } of ranked) {
    if (out.some((o) => o.toLowerCase() === line.toLowerCase())) continue
    out.push(line)
    if (out.length >= 6) break
  }

  // También combina las 2 mejores líneas cortas (logo + subtítulo)
  if (ranked.length >= 2) {
    const combo = normalizeLine(`${ranked[0].line} ${ranked[1].line}`)
    if (combo.length <= 60 && scoreLine(combo) > 0) {
      out.unshift(combo)
    }
  }

  return [...new Set(out)].slice(0, 6)
}

let workerPromise: Promise<import('tesseract.js').Worker> | null = null

async function getWorker() {
  if (!workerPromise) {
    workerPromise = (async () => {
      const { createWorker } = await import('tesseract.js')
      // eng cubre la mayoría de títulos; spa/fra ayudan en ediciones locales
      const worker = await createWorker('eng')
      return worker
    })()
  }
  return workerPromise
}

export async function recognizeCoverText(
  source: HTMLCanvasElement | HTMLImageElement | Blob | ImageBitmap | string,
): Promise<{ text: string; candidates: string[] }> {
  const worker = await getWorker()
  const result = await worker.recognize(source)
  const text = result.data.text || ''
  return { text, candidates: titleCandidatesFromOcr(text) }
}

export async function identifyCoverPhoto(
  source: HTMLCanvasElement | HTMLImageElement | Blob | ImageBitmap | string,
  queryOverride?: string,
): Promise<CoverOcrResult> {
  const { text, candidates } = await recognizeCoverText(source)
  const best = (queryOverride?.trim() || candidates[0] || '').trim()
  if (!best) {
    return { rawText: text, candidates, best: '', games: [] }
  }
  const games = await searchGames(best, 24)
  return { rawText: text, candidates, best, games }
}
