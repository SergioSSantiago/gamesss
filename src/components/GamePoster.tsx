import { Link } from 'react-router-dom'
import type { GameRef } from '../types'

export function GamePoster({
  game,
  large,
  showMeta = true,
}: {
  game: GameRef
  large?: boolean
  showMeta?: boolean
}) {
  return (
    <Link className={`poster ${large ? 'lg' : ''}`} to={`/game/${game.id}`}>
      <div className="poster-art">
        {game.image ? (
          <img src={game.image} alt="" loading="lazy" />
        ) : (
          <div className="poster-fallback">{game.name}</div>
        )}
      </div>
      {showMeta && (
        <div className="poster-meta">
          <b>{game.name}</b>
          {game.year ? <span>{game.year}</span> : null}
        </div>
      )}
    </Link>
  )
}

export function PosterSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="rail">
      {Array.from({ length: count }, (_, i) => (
        <div className="poster" key={i}>
          <div className="poster-art skel" />
          <div className="skel" style={{ height: 12, width: '80%' }} />
        </div>
      ))}
    </div>
  )
}
