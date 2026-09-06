import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GamePoster, PosterSkeleton } from '../components/GamePoster'
import { SPECIAL_GAMES, specialTag } from '../data/special'
import { specialGames } from '../lib/wikidata'
import type { GameSummary } from '../types'

const FILTERS = ['Todos', ...[...new Set(SPECIAL_GAMES.map((g) => g.tag))]]

export function Special() {
  const [games, setGames] = useState<GameSummary[] | null>(null)
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    let alive = true
    specialGames()
      .then((g) => alive && setGames(g))
      .catch(() => alive && setGames([]))
    return () => { alive = false }
  }, [])

  const visible = useMemo(() => {
    if (!games) return []
    if (filter === 'Todos') return games
    return games.filter((g) => specialTag(g.id) === filter)
  }, [games, filter])

  return (
    <div className="page">
      <div className="hero">
        <h1>Juegos especiales</h1>
        <p>
          Rarezas, fracasos míticos, experimentos y cultos raros: CD-i, Virtual Boy
          espiritual, indies absurdas y leyendas urbanas del catálogo.
        </p>
      </div>

      <Link className="maddog-banner" to="/special/mad-dog-mccree">
        <strong>Mad Dog McCree</strong>
        <span>Ficha especial · todas las versiones arcade (Rev. A/B, CRT, proyección, Mad Dog II)</span>
      </Link>

      <div className="status-pills" style={{ marginBottom: 22 }}>
        {FILTERS.map((f) => (
          <button key={f} type="button" className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {games === null && <PosterSkeleton count={12} />}
      {games && visible.length === 0 && (
        <p className="empty">Nada en esta etiqueta por ahora.</p>
      )}
      {visible.length > 0 && (
        <div className="grid-posters special-grid">
          {visible.map((game) => (
            <div key={game.id} className="special-card">
              <GamePoster game={game} />
              {specialTag(game.id) && <span className="special-tag">{specialTag(game.id)}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="empty" style={{ marginTop: 28 }}>
        ¿Echas uno en falta? Búscalo en <Link to="/games">Juegos</Link> y añádelo a una lista.
      </p>
    </div>
  )
}
