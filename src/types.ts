export type PlatformType =
  | 'home'
  | 'handheld'
  | 'hybrid'
  | 'computer'
  | 'mobile'
  | 'vr'
  | 'arcade'
  | 'cloud'

export type Platform = {
  id: string
  slug: string
  name: string
  shortName: string
  manufacturer: string
  yearStart: number
  yearEnd?: number
  type: PlatformType
  generation?: number
  aka?: string[]
  image: string
  family: string
  variant?: string
  gamesId: string
}

export type GameRef = {
  id: string
  name: string
  image: string | null
  year: number | null
}

export type GameSummary = GameRef & {
  description: string
  released: string | null
  platforms: { id: string; name: string }[]
  genres: string[]
  developers: string[]
  publishers: string[]
}

export type GameDetail = GameSummary & {
  extract: string
  wikipediaUrl: string | null
  aliases: string[]
}

export type LogStatus = 'played' | 'playing' | 'backlog' | 'wishlist' | 'dropped'

export type User = {
  id: string
  username: string
  displayName: string
  bio: string
  createdAt: string
  favorites: GameRef[]
}

export type LogEntry = {
  id: string
  userId: string
  game: GameRef
  status: LogStatus
  rating: number | null
  review: string
  spoiler: boolean
  liked: boolean
  replay: boolean
  hours: number | null
  platformId: string | null
  platformName: string | null
  playedOn: string | null
  createdAt: string
}

export type GameList = {
  id: string
  userId: string
  name: string
  description: string
  ranked: boolean
  games: GameRef[]
  createdAt: string
}
