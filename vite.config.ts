import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const SCANDEX = 'https://scandex.gamery.app/api/v2/lookup'
const UPCITEMDB = 'https://api.upcitemdb.com/prod/trial/lookup'

function variants(raw: string): string[] {
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 14) return []
  const out = new Set<string>([digits])
  if (digits.length === 12) out.add(`0${digits}`)
  if (digits.length === 13 && digits.startsWith('0')) out.add(digits.slice(1))
  if (digits.length === 14 && digits.startsWith('0')) {
    out.add(digits.slice(1))
    if (digits.startsWith('00')) out.add(digits.slice(2))
  }
  out.add(digits.replace(/^0+/, '') || digits)
  return [...out]
}

async function upcItemDbHit(code: string) {
  const r = await fetch(`${UPCITEMDB}?upc=${encodeURIComponent(code)}`, {
    headers: { Accept: 'application/json', 'User-Agent': 'Gamesss/1.0 (vite dev)' },
  })
  if (!r.ok) return null
  const data = (await r.json()) as {
    items?: { title?: string; brand?: string; category?: string }[]
  }
  const item = data.items?.[0]
  if (!item?.title) return null
  const blob = `${item.title} ${item.category || ''} ${item.brand || ''}`.toLowerCase()
  if (
    item.category &&
    !/game|toy|software|electronic/i.test(item.category) &&
    !/nintendo|playstation|xbox|capcom|resident|video.?game/.test(blob)
  ) {
    return null
  }
  return {
    barcode: code,
    name: item.title,
    platform: null,
    igdbId: null,
    igdbPlatformId: null,
    brand: item.brand || null,
    source: 'upcitemdb' as const,
  }
}

/** Dev-only `/api/scandex` so local Vite matches Vercel serverless. */
function scandexDevPlugin(): Plugin {
  return {
    name: 'scandex-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/scandex')) return next()

        const token = process.env.SCANDEX_TOKEN
        if (!token) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'SCANDEX_TOKEN_missing' }))
          return
        }

        const qs = new URL(url, 'http://localhost').searchParams
        const codes = variants(qs.get('value') || '')
        if (!codes.length) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'invalid_barcode' }))
          return
        }

        try {
          for (const code of codes) {
            const r = await fetch(`${SCANDEX}?value=${encodeURIComponent(code)}`, {
              headers: {
                Accept: 'application/json',
                Authorization: token,
                'User-Agent': 'Gamesss/1.0 (vite dev)',
              },
            })
            const data = (await r.json()) as {
              message?: string
              status?: string
              igdb_metadata?: {
                id?: number
                name?: string
                platform?: { id?: number; name?: string }
              }
            }
            if (r.status === 404 || data.message) continue
            const meta = data.igdb_metadata
            if (!meta?.name) continue
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                barcode: code,
                name: meta.name,
                platform: meta.platform?.name || null,
                igdbId: meta.id ?? null,
                igdbPlatformId: meta.platform?.id ?? null,
                source: 'scandex',
              }),
            )
            return
          }

          for (const code of codes) {
            const hit = await upcItemDbHit(code)
            if (hit) {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(hit))
              return
            }
          }

          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'not_found', tried: codes }))
        } catch (err) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'barcode_unreachable',
              detail: err instanceof Error ? err.message : 'unknown',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.SCANDEX_TOKEN) process.env.SCANDEX_TOKEN = env.SCANDEX_TOKEN

  return {
    plugins: [react(), scandexDevPlugin()],
  }
})
