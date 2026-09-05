import { Link, useParams } from 'react-router-dom'
import { CoverImage } from '../components/CoverImage'
import { Stars } from '../components/Stars'
import { useLibrary } from '../context/LibraryContext'
import { formatMonth, statusLabel } from '../lib/format'

export function Diary() {
  const { username } = useParams()
  const { users, logs } = useLibrary()
  const user = users.find((u) => u.username === username)
  const entries = logs
    .filter((l) => l.userId === user?.id && l.status !== 'wishlist' && l.status !== 'backlog')
    .sort((a, b) => (b.playedOn || b.createdAt).localeCompare(a.playedOn || a.createdAt))

  const groups = new Map<string, typeof entries>()
  for (const e of entries) {
    const key = formatMonth(e.playedOn || e.createdAt)
    groups.set(key, [...(groups.get(key) ?? []), e])
  }

  if (!user) {
    return <div className="page"><p className="empty">Perfil no encontrado.</p></div>
  }

  return (
    <div className="page">
      <div className="hero">
        <p className="game-kicker"><Link to={`/u/${user.username}`}>{user.displayName}</Link></p>
        <h1>Diario</h1>
      </div>
      {entries.length === 0 && <p className="empty">Cuando registres partidas, aparecerán aquí por mes.</p>}
      {[...groups.entries()].map(([month, rows]) => (
        <section key={month}>
          <h2 className="diary-month">{month}</h2>
          {rows.map((log) => {
            const day = new Date(log.playedOn || log.createdAt).getDate()
            return (
              <div className="diary-row" key={log.id}>
                <div className="day">{day}</div>
                <Link className="mini poster" to={`/game/${log.game.id}`}>
                  <div className="poster-art">
                    <CoverImage name={log.game.name} image={log.game.image} covers={log.game.covers} />
                  </div>
                </Link>
                <div>
                  <Link to={`/game/${log.game.id}`} style={{ fontWeight: 700 }}>{log.game.name}</Link>
                  <div style={{ color: 'var(--faint)', fontSize: 13 }}>
                    {statusLabel(log.status)}
                    {log.platformName ? ` · ${log.platformName}` : ''}
                    {log.replay ? ' · Replay' : ''}
                  </div>
                </div>
                <Stars value={log.rating} />
              </div>
            )
          })}
        </section>
      ))}
    </div>
  )
}
