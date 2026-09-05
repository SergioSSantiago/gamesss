import type { GameList, LogEntry, User } from '../types'

const KEY = 'gamesss.v1'

export type LibraryState = {
  users: User[]
  currentUserId: string | null
  logs: LogEntry[]
  lists: GameList[]
}

const empty: LibraryState = {
  users: [],
  currentUserId: null,
  logs: [],
  lists: [],
}

export function loadLibrary(): LibraryState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as LibraryState
    return {
      users: parsed.users ?? [],
      currentUserId: parsed.currentUserId ?? null,
      logs: parsed.logs ?? [],
      lists: parsed.lists ?? [],
    }
  } catch {
    return empty
  }
}

export function saveLibrary(state: LibraryState): void {
  localStorage.setItem(KEY, JSON.stringify(state))
}
