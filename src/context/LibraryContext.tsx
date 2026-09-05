import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadLibrary, saveLibrary, type LibraryState } from '../lib/storage'
import { uid } from '../lib/format'
import type { GameList, GameRef, LogEntry, User } from '../types'

type LibraryContextValue = {
  users: User[]
  currentUser: User | null
  logs: LogEntry[]
  lists: GameList[]
  myLogs: LogEntry[]
  myLists: GameList[]
  signIn: (username: string, displayName?: string) => User
  signOut: () => void
  updateUser: (patch: Partial<Pick<User, 'displayName' | 'bio' | 'favorites'>>) => void
  logGame: (entry: Omit<LogEntry, 'id' | 'userId' | 'createdAt'> & { id?: string }) => LogEntry
  removeLog: (id: string) => void
  logForGame: (gameId: string) => LogEntry | undefined
  createList: (name: string, description?: string, ranked?: boolean) => GameList
  updateList: (id: string, patch: Partial<Pick<GameList, 'name' | 'description' | 'ranked' | 'games'>>) => void
  deleteList: (id: string) => void
  toggleGameInList: (listId: string, game: GameRef) => void
}

const LibraryContext = createContext<LibraryContextValue | null>(null)

function persist(next: LibraryState) {
  saveLibrary(next)
  return next
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LibraryState>(() => loadLibrary())

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId],
  )

  const myLogs = useMemo(
    () =>
      state.logs
        .filter((l) => l.userId === state.currentUserId)
        .sort((a, b) => (b.playedOn || b.createdAt).localeCompare(a.playedOn || a.createdAt)),
    [state.logs, state.currentUserId],
  )

  const myLists = useMemo(
    () => state.lists.filter((l) => l.userId === state.currentUserId),
    [state.lists, state.currentUserId],
  )

  const signIn = useCallback((username: string, displayName?: string) => {
    const clean = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
    if (!clean) throw new Error('Elige un nombre de usuario')
    let user: User | undefined
    setState((prev) => {
      user = prev.users.find((u) => u.username === clean)
      if (!user) {
        user = {
          id: uid(),
          username: clean,
          displayName: displayName?.trim() || clean,
          bio: '',
          createdAt: new Date().toISOString(),
          favorites: [],
        }
        return persist({
          ...prev,
          users: [...prev.users, user],
          currentUserId: user.id,
        })
      }
      return persist({ ...prev, currentUserId: user.id })
    })
    return user!
  }, [])

  const signOut = useCallback(() => {
    setState((prev) => persist({ ...prev, currentUserId: null }))
  }, [])

  const updateUser = useCallback((patch: Partial<Pick<User, 'displayName' | 'bio' | 'favorites'>>) => {
    setState((prev) =>
      persist({
        ...prev,
        users: prev.users.map((u) => (u.id === prev.currentUserId ? { ...u, ...patch } : u)),
      }),
    )
  }, [])

  const logGame = useCallback(
    (entry: Omit<LogEntry, 'id' | 'userId' | 'createdAt'> & { id?: string }) => {
      if (!state.currentUserId) throw new Error('Inicia sesión para registrar un juego')
      const next: LogEntry = {
        ...entry,
        id: entry.id ?? uid(),
        userId: state.currentUserId,
        createdAt: entry.id
          ? state.logs.find((l) => l.id === entry.id)?.createdAt ?? new Date().toISOString()
          : new Date().toISOString(),
      }
      setState((prev) => {
        const others = prev.logs.filter((l) => l.id !== next.id)
        const withoutDup =
          next.status === 'wishlist'
            ? others
            : others.filter((l) => !(l.userId === next.userId && l.game.id === next.game.id && l.status === next.status && !entry.id))
        return persist({ ...prev, logs: [next, ...withoutDup] })
      })
      return next
    },
    [state.currentUserId, state.logs],
  )

  const removeLog = useCallback((id: string) => {
    setState((prev) => persist({ ...prev, logs: prev.logs.filter((l) => l.id !== id) }))
  }, [])

  const logForGame = useCallback(
    (gameId: string) => myLogs.find((l) => l.game.id === gameId && l.status !== 'wishlist'),
    [myLogs],
  )

  const createList = useCallback(
    (name: string, description = '', ranked = false) => {
      if (!state.currentUserId) throw new Error('Inicia sesión para crear listas')
      const list: GameList = {
        id: uid(),
        userId: state.currentUserId,
        name: name.trim() || 'Lista sin título',
        description,
        ranked,
        games: [],
        createdAt: new Date().toISOString(),
      }
      setState((prev) => persist({ ...prev, lists: [list, ...prev.lists] }))
      return list
    },
    [state.currentUserId],
  )

  const updateList = useCallback(
    (id: string, patch: Partial<Pick<GameList, 'name' | 'description' | 'ranked' | 'games'>>) => {
      setState((prev) =>
        persist({
          ...prev,
          lists: prev.lists.map((l) => (l.id === id ? { ...l, ...patch } : l)),
        }),
      )
    },
    [],
  )

  const deleteList = useCallback((id: string) => {
    setState((prev) => persist({ ...prev, lists: prev.lists.filter((l) => l.id !== id) }))
  }, [])

  const toggleGameInList = useCallback((listId: string, game: GameRef) => {
    setState((prev) =>
      persist({
        ...prev,
        lists: prev.lists.map((l) => {
          if (l.id !== listId) return l
          const exists = l.games.some((g) => g.id === game.id)
          return {
            ...l,
            games: exists ? l.games.filter((g) => g.id !== game.id) : [...l.games, game],
          }
        }),
      }),
    )
  }, [])

  const value = useMemo<LibraryContextValue>(
    () => ({
      users: state.users,
      currentUser,
      logs: state.logs,
      lists: state.lists,
      myLogs,
      myLists,
      signIn,
      signOut,
      updateUser,
      logGame,
      removeLog,
      logForGame,
      createList,
      updateList,
      deleteList,
      toggleGameInList,
    }),
    [
      state.users,
      state.logs,
      state.lists,
      currentUser,
      myLogs,
      myLists,
      signIn,
      signOut,
      updateUser,
      logGame,
      removeLog,
      logForGame,
      createList,
      updateList,
      deleteList,
      toggleGameInList,
    ],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}

export function toRef(game: { id: string; name: string; image: string | null; year: number | null }): GameRef {
  return { id: game.id, name: game.name, image: game.image, year: game.year }
}

export function wishlistHas(logs: LogEntry[], userId: string | undefined, gameId: string): boolean {
  if (!userId) return false
  return logs.some((l) => l.userId === userId && l.game.id === gameId && l.status === 'wishlist')
}
