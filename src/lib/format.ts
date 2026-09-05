import type { LogStatus } from '../types'

export function yearFromDate(value: string | null | undefined): number | null {
  if (!value) return null
  const match = value.match(/(\d{4})/)
  return match ? Number(match[1]) : null
}

export function formatYearRange(start: number, end?: number): string {
  if (!end) return `${start} —`
  if (end === start) return String(start)
  return `${start}–${end}`
}

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10)
  return d.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatMonth(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('es', { month: 'long', year: 'numeric' })
}

export function statusLabel(status: LogStatus): string {
  const labels: Record<LogStatus, string> = {
    played: 'Jugado',
    playing: 'Jugando',
    backlog: 'Backlog',
    wishlist: 'Wishlist',
    dropped: 'Abandonado',
  }
  return labels[status]
}

export function ratingLabel(rating: number | null): string {
  if (rating == null) return ''
  return rating % 1 === 0 ? `${rating}` : rating.toFixed(1)
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('')
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function uid(): string {
  return crypto.randomUUID()
}
