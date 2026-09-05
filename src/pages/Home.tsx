import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GameRow } from '../components/GameRow'
import { PosterSkeleton } from '../components/GamePoster'
import { ReviewCard } from '../components/ReviewCard'
import { useLibrary } from '../context/LibraryContext'
import { classics, popularGames, recentGames } from '../lib/wikidata'
import type { GameSummary } from '../types'

export function Home() {
  const { currentUser, myLogs } = useLibrary()
  const [popular, setPopular] = useState<GameSummary[] | null>(null)
  const [fresh, setFresh] = useState<GameSummary[] | null>(null)
  const [old, setOld] = useState<GameSummary[] | null>(null)

  useEffect(() => {
    let alive = true
    popularGames().then((g) => alive && setPopular(g)).catch(() => alive && setPopular([]))
    recentGames().then((g) => alive && setFresh(g)).catch(() => alive && setFresh([]))
    classics().then((g) => alive && setOld(g)).catch(() => alive && setOld([]))
    return () => { alive = false }
  }, [])

  const reviews = myLogs.filter((l) => l.review)
  const playing = myLogs.filter((l) => l.status === 'playing')

  return (
    <div className="page">
      <div className="hero">
        <h1>Tu diario de videojuegos.</h1>
        <p>
          Registra lo que juegas, puntúa, escribe reseñas y recorre todas las consolas
          que han existido — de la Odyssey al Switch 2.
        </p>
        {!currentUser && (
          <p style={{ marginTop: 16 }}>
            <Link className="btn" to="/signin">Crear perfil</Link>
          </p>
        )}
      </div>

      {currentUser && playing.length > 0 && (
        <GameRow title="Ahora mismo" games={playing.map((l) => l.game)} />
      )}

      {popular ? <GameRow title="Populares" to="/games" games={popular} /> : <PosterSkeleton />}
      {fresh ? <GameRow title="Lanzamientos recientes" games={fresh} /> : null}
      {old ? <GameRow title="Clásicos" games={old} /> : null}

      {reviews.length > 0 && (
        <section>
          <div className="section-head">
            <h2>Tus reseñas</h2>
            <Link to={`/u/${currentUser?.username}`}>Perfil</Link>
          </div>
          {reviews.slice(0, 5).map((log) => (
            <ReviewCard key={log.id} log={log} />
          ))}
        </section>
      )}
    </div>
  )
}
