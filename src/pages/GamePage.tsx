import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LogModal } from '../components/LogModal'
import { ReviewCard } from '../components/ReviewCard'
import { Stars } from '../components/Stars'
import { toRef, useLibrary, wishlistHas } from '../context/LibraryContext'
import { platformById } from '../data/platforms'
import { getGame } from '../lib/wikidata'
import type { GameDetail } from '../types'

export function GamePage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { currentUser, logGame, logForGame, myLogs, myLists, toggleGameInList, removeLog } = useLibrary()
  const [game, setGame] = useState<GameDetail | null | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [listOpen, setListOpen] = useState(false)

  useEffect(() => {
    let alive = true
    setGame(undefined)
    getGame(id).then((g) => alive && setGame(g)).catch(() => alive && setGame(null))
    return () => { alive = false }
  }, [id])

  if (game === undefined) {
    return (
      <div className="page">
        <div className="game-layout">
          <div className="poster-art skel" style={{ height: 340 }} />
          <div>
            <div className="skel" style={{ height: 36, width: '60%', marginBottom: 12 }} />
            <div className="skel" style={{ height: 120, width: '90%' }} />
          </div>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="page">
        <p className="empty">No encontramos ese juego.</p>
      </div>
    )
  }

  const existing = logForGame(game.id)
  const wished = wishlistHas(myLogs, currentUser?.id, game.id)
  const reviews = myLogs.filter((l) => l.game.id === game.id && l.review)

  function requireUser(action: () => void) {
    if (!currentUser) {
      navigate('/signin')
      return
    }
    action()
  }

  return (
    <div className="page">
      <div className="game-layout">
        <div className="game-poster-col">
          <div className="poster-art">
            {game.image ? <img src={game.image} alt="" /> : <div className="poster-fallback">{game.name}</div>}
          </div>
          <div className="game-actions">
            <button className="btn" onClick={() => requireUser(() => setOpen(true))}>
              {existing ? 'Editar registro' : 'Registrar'}
            </button>
            <button
              className="btn ghost"
              onClick={() =>
                requireUser(() => {
                  if (wished) {
                    const wish = myLogs.find((l) => l.game.id === game.id && l.status === 'wishlist')
                    if (wish) removeLog(wish.id)
                  } else {
                    logGame({
                      game: toRef(game),
                      status: 'wishlist',
                      rating: null,
                      review: '',
                      spoiler: false,
                      liked: false,
                      replay: false,
                      hours: null,
                      platformId: null,
                      platformName: null,
                      playedOn: null,
                    })
                  }
                })
              }
            >
              {wished ? 'En wishlist' : 'Añadir a wishlist'}
            </button>
            {currentUser && myLists.length > 0 && (
              <button className="btn ghost" onClick={() => setListOpen((v) => !v)}>Añadir a lista</button>
            )}
            {listOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {myLists.map((list) => {
                  const on = list.games.some((g) => g.id === game.id)
                  return (
                    <button key={list.id} className="btn ghost" onClick={() => toggleGameInList(list.id, toRef(game))}>
                      {on ? '✓ ' : ''}{list.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="game-kicker">{game.developers[0] || game.publishers[0] || 'Videojuego'}</p>
          <h1 className="game-title">{game.name}</h1>
          <p className="game-sub">
            {game.year ?? 'Año desconocido'}
            {existing?.rating != null && (
              <>
                {' · '}
                <Stars value={existing.rating} />
              </>
            )}
          </p>
          {game.description && <p className="extract">{game.description}</p>}
          {game.extract && <p className="extract">{game.extract}</p>}

          {game.platforms.length > 0 && (
            <section>
              <div className="section-head"><h2>Plataformas</h2></div>
              <div className="chips">
                {game.platforms.map((p) => {
                  const known = platformById(p.id)
                  return known ? (
                    <Link className="chip" key={p.id} to={`/platform/${known.slug}`}>{p.name}</Link>
                  ) : (
                    <span className="chip" key={p.id}>{p.name}</span>
                  )
                })}
              </div>
            </section>
          )}

          {(game.genres.length > 0 || game.developers.length > 0) && (
            <section>
              <div className="section-head"><h2>Ficha</h2></div>
              <p className="game-sub">
                {game.genres.filter((g) => !g.startsWith('Q')).join(' · ')}
                {game.publishers[0] && !game.publishers[0].startsWith('Q') ? ` · ${game.publishers[0]}` : ''}
              </p>
            </section>
          )}

          {game.wikipediaUrl && (
            <p style={{ marginTop: 16 }}>
              <a href={game.wikipediaUrl} target="_blank" rel="noreferrer">Wikipedia ↗</a>
            </p>
          )}

          <section>
            <div className="section-head"><h2>Reseñas</h2></div>
            {reviews.length === 0 ? (
              <p className="empty" style={{ textAlign: 'left' }}>Aún no hay reseña tuya. Sé el primero en este perfil.</p>
            ) : (
              reviews.map((log) => <ReviewCard key={log.id} log={log} showGame={false} />)
            )}
          </section>
        </div>
      </div>
      {open && <LogModal game={game} initial={existing} onClose={() => setOpen(false)} />}
    </div>
  )
}
