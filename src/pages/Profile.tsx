import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GamePoster } from '../components/GamePoster'
import { ReviewCard } from '../components/ReviewCard'
import { useLibrary } from '../context/LibraryContext'
import { initials, statusLabel } from '../lib/format'
import type { GameRef, LogStatus } from '../types'

const FILTERS: (LogStatus | 'all' | 'reviews')[] = ['all', 'played', 'playing', 'backlog', 'wishlist', 'dropped', 'reviews']

export function Profile() {
  const { username } = useParams()
  const { users, currentUser, logs, lists, updateUser, signOut } = useLibrary()
  const user = users.find((u) => u.username === username)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all')
  const [bio, setBio] = useState(user?.bio ?? '')
  const mine = currentUser?.id === user?.id

  const userLogs = useMemo(
    () => logs.filter((l) => l.userId === user?.id).sort((a, b) => (b.playedOn || b.createdAt).localeCompare(a.playedOn || a.createdAt)),
    [logs, user?.id],
  )
  const userLists = lists.filter((l) => l.userId === user?.id)
  const played = userLogs.filter((l) => l.status === 'played' || l.status === 'dropped')
  const thisYear = played.filter((l) => (l.playedOn || l.createdAt).startsWith(String(new Date().getFullYear()))).length
  const reviews = userLogs.filter((l) => l.review)

  const histogram = useMemo(() => {
    const buckets = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    const counts = buckets.map((b) => userLogs.filter((l) => l.rating === b).length)
    const max = Math.max(1, ...counts)
    return buckets.map((b, i) => ({ b, h: (counts[i] / max) * 100 }))
  }, [userLogs])

  const visible = userLogs.filter((l) => {
    if (filter === 'all') return l.status !== 'wishlist'
    if (filter === 'reviews') return Boolean(l.review)
    return l.status === filter
  })

  if (!user) {
    return (
      <div className="page">
        <p className="empty">Ese perfil no existe en este navegador. <Link to="/signin">Crear uno</Link></p>
      </div>
    )
  }

  function setFavorite(slot: number, game: GameRef | null) {
    if (!mine) return
    const next = [...user!.favorites]
    if (game) next[slot] = game
    else next.splice(slot, 1)
    updateUser({ favorites: next.slice(0, 4) })
  }

  return (
    <div className="page">
      <div className="profile-head">
        <div className="avatar xl">{initials(user.displayName)}</div>
        <div>
          <h1 style={{ margin: 0 }}>{user.displayName}</h1>
          <p className="game-kicker">@{user.username}</p>
          {mine ? (
            <div className="field" style={{ marginTop: 8, maxWidth: 420 }}>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                onBlur={() => updateUser({ bio })}
                placeholder="Una línea sobre ti y a qué juegas"
              />
            </div>
          ) : (
            user.bio && <p>{user.bio}</p>
          )}
          <div className="stats">
            <div className="stat"><b>{played.length}</b><span>Jugados</span></div>
            <div className="stat"><b>{thisYear}</b><span>Este año</span></div>
            <div className="stat"><b>{reviews.length}</b><span>Reseñas</span></div>
            <div className="stat"><b>{userLists.length}</b><span>Listas</span></div>
          </div>
          {mine && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Link className="btn ghost" to={`/u/${user.username}/diary`}>Diario</Link>
              <Link className="btn ghost" to={`/u/${user.username}/lists`}>Listas</Link>
              <button className="btn ghost" onClick={signOut}>Salir</button>
            </div>
          )}
        </div>
      </div>

      <div className="section-head"><h2>Favoritos</h2></div>
      <div className="favs">
        {[0, 1, 2, 3].map((i) => {
          const g = user.favorites[i]
          return g ? (
            <div key={g.id} onContextMenu={(e) => { e.preventDefault(); if (mine) setFavorite(i, null) }}>
              <GamePoster game={g} />
            </div>
          ) : (
            <div key={i} className="poster">
              <div className="poster-art" style={{ outline: '1px dashed var(--line)' }}>
                <div className="poster-fallback">{mine ? 'Vacío' : ''}</div>
              </div>
            </div>
          )
        })}
      </div>
      {mine && userLogs.length > 0 && (
        <p style={{ color: 'var(--faint)', fontSize: 13 }}>
          Para fijar un favorito, elige un juego reciente:
          {userLogs.filter((l) => l.status !== 'wishlist').slice(0, 8).map((l) => (
            <button
              key={l.id}
              className="btn ghost"
              style={{ margin: '0 0 0 6px', padding: '2px 8px' }}
              onClick={() => {
                const next = [...user.favorites.filter((f) => f.id !== l.game.id), l.game].slice(0, 4)
                updateUser({ favorites: next })
              }}
            >
              {l.game.name}
            </button>
          ))}
        </p>
      )}

      <div className="section-head"><h2>Puntuaciones</h2></div>
      <div className="histogram" aria-hidden>
        {histogram.map((x) => (
          <i key={x.b} style={{ height: `${Math.max(4, x.h)}%` }} title={`${x.b}`} />
        ))}
      </div>

      <div className="status-pills" style={{ margin: '22px 0' }}>
        {FILTERS.map((f) => (
          <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Actividad' : f === 'reviews' ? 'Reseñas' : statusLabel(f)}
          </button>
        ))}
      </div>

      {visible.length === 0 && <p className="empty">Nada aquí todavía.</p>}
      {filter === 'reviews'
        ? visible.map((log) => <ReviewCard key={log.id} log={log} />)
        : (
          <div className="grid-posters">
            {visible.map((log) => (
              <GamePoster key={log.id} game={log.game} />
            ))}
          </div>
        )}
    </div>
  )
}
