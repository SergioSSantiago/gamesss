export type BarcodeProviderHit = {
  barcode: string
  name: string
  platform?: string | null
  igdbId?: number | null
  igdbPlatformId?: number | null
  brand?: string | null
  pricechartingId?: string | null
  source: 'scandex' | 'pricecharting' | 'upcitemdb' | 'barcodelookup'
}

export function barcodeVariants(raw: string): string[]

export function resolveBarcode(
  raw: string,
  opts?: {
    scandexToken?: string
    pricechartingToken?: string
    barcodelookupKey?: string
  },
): Promise<{
  hit: BarcodeProviderHit | null
  tried: string[]
  error?: string
  provider?: string
}>
