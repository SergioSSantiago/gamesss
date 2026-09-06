/**
 * Proxy ScanDex (barcode → IGDB game metadata).
 * Token: SCANDEX_TOKEN (Vercel env / local vite middleware).
 */

const SCANDEX = 'https://scandex.gamery.app/api/v2/lookup'

function variants(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 14) return []
  const out = new Set([digits])
  if (digits.length === 12) out.add(`0${digits}`)
  if (digits.length === 13 && digits.startsWith('0')) out.add(digits.slice(1))
  if (digits.length === 14 && digits.startsWith('0')) {
    out.add(digits.slice(1))
    if (digits.startsWith('00')) out.add(digits.slice(2))
  }
  out.add(digits.replace(/^0+/, '') || digits)
  return [...out]
}

async function lookupOne(token, code) {
  const res = await fetch(`${SCANDEX}?value=${encodeURIComponent(code)}`, {
    headers: {
      Accept: 'application/json',
      Authorization: token,
      'User-Agent': 'Gamesss/1.0 (barcode proxy)',
    },
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  return { status: res.status, data }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const token = process.env.SCANDEX_TOKEN
  if (!token) {
    return res.status(500).json({ error: 'SCANDEX_TOKEN_missing' })
  }

  const codes = variants(req.query?.value)
  if (!codes.length) {
    return res.status(400).json({ error: 'invalid_barcode' })
  }

  try {
    for (const code of codes) {
      const { status, data } = await lookupOne(token, code)
      if (status === 401 || status === 403) {
        return res.status(502).json({ error: 'scandex_auth_failed' })
      }
      if (status === 404 || data?.message) continue
      const meta = data?.igdb_metadata
      if (!meta?.name) {
        // barcode known but unmatched — keep trying variants; if none, report unmatched
        if (data?.status === 'unmatched') {
          return res.status(404).json({ error: 'unmatched', barcode: code })
        }
        continue
      }
      return res.status(200).json({
        barcode: code,
        name: meta.name,
        platform: meta.platform?.name || null,
        igdbId: meta.id ?? null,
        igdbPlatformId: meta.platform?.id ?? null,
        source: 'scandex',
      })
    }
    return res.status(404).json({ error: 'not_found', tried: codes })
  } catch (err) {
    return res.status(502).json({
      error: 'scandex_unreachable',
      detail: err instanceof Error ? err.message : 'unknown',
    })
  }
}
