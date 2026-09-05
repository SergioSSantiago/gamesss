import { Link } from 'react-router-dom'
import { formatDate, statusLabel } from '../lib/format'
import type { LogEntry } from '../types'
import { Stars } from './Stars'

export function ReviewCard({ log, showGame = true }: { log: LogEntry; showGame?: boolean }) {
  if (!log.review && log.rating == null) return null
  return (
    <article className="review-card">
      {showGame && (
        <Link to={`/game/${log.game.id}`} style={{ fontWeight: 700 }}>
          {log.game.name}
        </Link>
      )}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--muted)', fontSize: 13 }}>
        <Stars value={log.rating} />
        <span>{statusLabel(log.status)}</span>
        {log.platformName && <span>{log.platformName}</span>}
        <span>{formatDate(log.playedOn || log.createdAt)}</span>
        {log.liked && <span style={{ color: 'var(--orange)' }}>♥</span>}
      </div>
      {log.review && (
        <p>
          {log.spoiler ? <em style={{ color: 'var(--orange)' }}>Spoilers. </em> : null}
          {log.review}
        </p>
      )}
    </article>
  )
}
