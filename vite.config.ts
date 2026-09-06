import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { resolveBarcode } from './api/barcode-providers.js'

/** Dev-only `/api/scandex` so local Vite matches Vercel serverless. */
function scandexDevPlugin(): Plugin {
  return {
    name: 'scandex-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/scandex')) return next()

        if (!process.env.SCANDEX_TOKEN) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'SCANDEX_TOKEN_missing' }))
          return
        }

        const qs = new URL(url, 'http://localhost').searchParams
        try {
          const result = await resolveBarcode(qs.get('value') || '')
          if (result.error === 'invalid_barcode') {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'invalid_barcode' }))
            return
          }
          if (result.error === 'scandex_auth_failed') {
            res.statusCode = 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'scandex_auth_failed' }))
            return
          }
          if (!result.hit) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'not_found', tried: result.tried }))
            return
          }
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.hit))
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
  if (env.PRICECHARTING_TOKEN) process.env.PRICECHARTING_TOKEN = env.PRICECHARTING_TOKEN
  if (env.BARCODELOOKUP_API_KEY) process.env.BARCODELOOKUP_API_KEY = env.BARCODELOOKUP_API_KEY

  return {
    plugins: [react(), scandexDevPlugin()],
  }
})
