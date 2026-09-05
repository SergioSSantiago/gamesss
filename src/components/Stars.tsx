import { ratingLabel } from '../lib/format'

const HALVES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const

export function Stars({
  value,
  onChange,
  size = 'static',
}: {
  value: number | null
  onChange?: (value: number | null) => void
  size?: 'static' | 'edit'
}) {
  if (!onChange) {
    if (value == null) return null
    const full = Math.floor(value)
    const half = value - full >= 0.5
    return (
      <span className="stars static" title={ratingLabel(value)} aria-label={`${value} estrellas`}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
      </span>
    )
  }

  return (
    <div className={`stars ${size}`} role="radiogroup" aria-label="Puntuación">
      {HALVES.map((n) => (
        <button
          key={n}
          type="button"
          className={value != null && value >= n ? 'on' : ''}
          onClick={() => onChange(value === n ? null : n)}
          aria-label={`${n} estrellas`}
        >
          {n % 1 === 0 ? '★' : '☆'}
        </button>
      ))}
    </div>
  )
}
