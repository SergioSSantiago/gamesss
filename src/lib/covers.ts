const COVER_HINT =
  /cover|box[\s._-]?art|box[\s._-]?front|car[aá]tula|jaquette|portada|bo[iî]te|keep.?case|packshot|packaging|artwork/i

export function looksLikeCover(filename: string): boolean {
  return COVER_HINT.test(filename)
}

export function steamCoverUrls(appId: string): string[] {
  const id = appId.trim()
  if (!id) return []
  return [
    `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900_2x.jpg`,
    `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900.jpg`,
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_600x900.jpg`,
  ]
}

export function uniqueUrls(urls: Array<string | null | undefined>): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const url of urls) {
    if (!url || seen.has(url)) continue
    seen.add(url)
    out.push(url)
  }
  return out
}
