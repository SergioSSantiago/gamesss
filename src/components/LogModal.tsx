import { useState, type FormEvent } from 'react'
import { useLibrary, toRef } from '../context/LibraryContext'
import { statusLabel } from '../lib/format'
import type { GameSummary, LogEntry, LogStatus } from '../types'
import { Stars } from './Stars'

const STATUSES: LogStatus[] = ['played', 'playing', 'backlog', 'wishlist', 'dropped']

export function LogModal({
  game,
  initial,
  onClose,
}: {
  game: GameSummary
  initial?: LogEntry
  onClose: () => void
}) {
  const { currentUser, logGame } = useLibrary()
  const [status, setStatus] = useState<LogStatus>(initial?.status ?? 'played')
  const [rating, setRating] = useState<number | null>(initial?.rating ?? null)
  const [review, setReview] = useState(initial?.review ?? '')
  const [playedOn, setPlayedOn] = useState(initial?.playedOn ?? new Date().toISOString().slice(0, 10))
  const [platformId, setPlatformId] = useState(initial?.platformId ?? game.platforms[0]?.id ?? '')
  const [liked, setLiked] = useState(initial?.liked ?? false)
  const [replay, setReplay] = useState(initial?.replay ?? false)
  const [spoiler, setSpoiler] = useState(initial?.spoiler ?? false)
  const [hours, setHours] = useState(initial?.hours != null ? String(initial.hours) : '')

  if (!currentUser) return null

  function submit(e: FormEvent) {
    e.preventDefault()
    const platform = game.platforms.find((p) => p.id === platformId)
    logGame({
      id: initial?.id,
      game: toRef(game),
      status,
      rating,
      review: review.trim(),
      spoiler,
      liked,
      replay,
      hours: hours ? Number(hours) : null,
      platformId: platform?.id ?? null,
      platformName: platform?.name ?? null,
      playedOn: status === 'wishlist' || status === 'backlog' ? null : playedOn,
    })
    onClose()
  }

  return (
    <div className="modal-back" onClick={onClose} role="presentation">
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>Registrar {game.name}</h2>
        <div className="field" style={{ marginBottom: 12 }}>
          <label>Estado</label>
          <div className="status-pills">
            {STATUSES.map((s) => (
              <button key={s} type="button" className={status === s ? 'on' : ''} onClick={() => setStatus(s)}>
                {statusLabel(s)}
              </button>
            ))}
          </div>
        </div>
        <div className="field" style={{ marginBottom: 12 }}>
          <label>Puntuación</label>
          <Stars value={rating} onChange={setRating} size="edit" />
        </div>
        <div className="field" style={{ marginBottom: 12 }}>
          <label>Reseña</label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="¿Qué te pareció?" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="field">
            <label>Fecha</label>
            <input type="date" value={playedOn} onChange={(e) => setPlayedOn(e.target.value)} />
          </div>
          <div className="field">
            <label>Plataforma</label>
            <select value={platformId} onChange={(e) => setPlatformId(e.target.value)}>
              <option value="">—</option>
              {game.platforms.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="field" style={{ marginTop: 10 }}>
          <label>Horas</label>
          <input type="number" min={0} step={0.5} value={hours} onChange={(e) => setHours(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, color: 'var(--muted)' }}>
          <label><input type="checkbox" checked={liked} onChange={(e) => setLiked(e.target.checked)} /> Me gusta</label>
          <label><input type="checkbox" checked={replay} onChange={(e) => setReplay(e.target.checked)} /> Replay</label>
          <label><input type="checkbox" checked={spoiler} onChange={(e) => setSpoiler(e.target.checked)} /> Spoilers</label>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancelar</button>
          <button className="btn" type="submit">Guardar</button>
        </div>
      </form>
    </div>
  )
}
