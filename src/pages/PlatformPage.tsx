import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GamePoster, PosterSkeleton } from '../components/GamePoster'
import { platformBySlug } from '../data/platforms'
import { formatYearRange } from '../lib/format'
import { gamesOnPlatform } from '../lib/wikidata'
import type { GameSummary } from '../types'

export function PlatformPage() {
  const { slug = '' } = useParams()
  const platform = platformBySlug(slug)
  const [games, setGames] = useState<GameSummary[] | null>(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (!platform) return
    let alive = true
    setGames(null)
    gamesOnPlatform(platform.id, 24, page * 24)
      .then((g) => alive && setGames(g))
      .catch(() => alive && setGames([]))
    return () => { alive = false }
  }, [platform, page])

  if (!platform) {
    return (
      <div className="page">
        <p className="empty">Consola no encontrada. <Link to="/platforms">Volver al directorio</Link></p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="hero">
        <p className="game-kicker">{platform.manufacturer}</p>
        <h1>{platform.name}</h1>
        <p>
          {formatYearRange(platform.yearStart, platform.yearEnd)}
          {platform.aka?.length ? ` · También ${platform.aka.join(', ')}` : ''}
        </p>
      </div>
      {games === null && <PosterSkeleton count={12} />}
      {games && games.length === 0 && (
        <p className="empty">Aún no hay partidas indexadas para esta máquina, o Wikidata las etiqueta con otro nombre.</p>
      )}
      {games && games.length > 0 && (
        <div className="grid-posters">
          {games.map((game) => (
            <GamePoster key={game.id} game={game} />
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
        <button className="btn ghost" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
          Anterior
        </button>
        <button className="btn ghost" disabled={!games || games.length < 24} onClick={() => setPage((p) => p + 1)}>
          Más juegos
        </button>
      </div>
    </div>
  )
}
