/**
 * GET /api/scandex?value=UPC
 * Multi-source barcode lookup: ScanDex → PriceCharting → UPCitemdb → Barcode Lookup.
 * CLZ Collectorz has no public API and is not queried.
 */

import { resolveBarcode } from './barcode-providers.js'

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

  if (!process.env.SCANDEX_TOKEN) {
    return res.status(500).json({ error: 'SCANDEX_TOKEN_missing' })
  }

  try {
    const result = await resolveBarcode(req.query?.value)
    if (result.error === 'invalid_barcode') {
      return res.status(400).json({ error: 'invalid_barcode' })
    }
    if (result.error === 'scandex_auth_failed') {
      return res.status(502).json({ error: 'scandex_auth_failed' })
    }
    if (!result.hit) {
      return res.status(404).json({
        error: 'not_found',
        tried: result.tried,
        note: 'CLZ/Collectorz has no public API; PriceCharting/BarcodeLookup need keys for full coverage.',
      })
    }
    return res.status(200).json(result.hit)
  } catch (err) {
    return res.status(502).json({
      error: 'barcode_unreachable',
      detail: err instanceof Error ? err.message : 'unknown',
    })
  }
}
