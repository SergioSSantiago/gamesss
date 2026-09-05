import { Link } from 'react-router-dom'
import type { GameRef } from '../types'
import { GamePoster } from './GamePoster'

export function GameRow({
  title,
  to,
  games,
}: {
  title: string
  to?: string
  games: GameRef[]
}) {
  if (!games.length) return null
  return (
    <section>
      <div className="section-head">
        <h2>{title}</h2>
        {to ? <Link to={to}>Ver más</Link> : null}
      </div>
      <div className="rail">
        {games.map((game) => (
          <GamePoster key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}
