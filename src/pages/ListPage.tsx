import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GamePoster } from '../components/GamePoster'
import { useLibrary } from '../context/LibraryContext'

export function ListPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { lists, currentUser, users, updateList, deleteList } = useLibrary()
  const list = lists.find((l) => l.id === id)
  const owner = users.find((u) => u.id === list?.userId)
  const mine = currentUser?.id === list?.userId
  const [name, setName] = useState(list?.name ?? '')
  const [description, setDescription] = useState(list?.description ?? '')

  if (!list || !owner) {
    return <div className="page"><p className="empty">Lista no encontrada.</p></div>
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...list!.games]
    const j = index + dir
    if (j < 0 || j >= next.length) return
    ;[next[index], next[j]] = [next[j], next[index]]
    updateList(list!.id, { games: next })
  }

  return (
    <div className="page">
      <p className="game-kicker">
        Lista de <Link to={`/u/${owner.username}`}>{owner.displayName}</Link>
      </p>
      {mine ? (
        <div className="field" style={{ marginBottom: 12 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} onBlur={() => updateList(list.id, { name })} />
        </div>
      ) : (
        <h1 className="game-title">{list.name}</h1>
      )}
      {mine ? (
        <div className="field" style={{ marginBottom: 16 }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => updateList(list.id, { description })}
            placeholder="De qué va esta lista"
          />
        </div>
      ) : (
        list.description && <p className="extract">{list.description}</p>
      )}
      <p style={{ color: 'var(--muted)' }}>
        {list.games.length} juegos{list.ranked ? ' · ranking' : ''}
      </p>
      {list.games.length === 0 && (
        <p className="empty">Añade juegos desde su ficha, con “Añadir a lista”.</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {list.games.map((game, i) => (
          <div key={game.id} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {list.ranked && <b style={{ width: 24, color: 'var(--green)' }}>{i + 1}</b>}
            <div style={{ width: 64 }}>
              <GamePoster game={game} showMeta={false} />
            </div>
            <Link to={`/game/${game.id}`} style={{ fontWeight: 700, flex: 1 }}>{game.name}</Link>
            {mine && (
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="btn ghost" type="button" onClick={() => move(i, -1)}>↑</button>
                <button className="btn ghost" type="button" onClick={() => move(i, 1)}>↓</button>
                <button
                  className="btn ghost"
                  type="button"
                  onClick={() => updateList(list.id, { games: list.games.filter((g) => g.id !== game.id) })}
                >
                  Quitar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {mine && (
        <p style={{ marginTop: 28 }}>
          <button
            className="btn danger"
            onClick={() => {
              deleteList(list.id)
              navigate(`/u/${owner.username}/lists`)
            }}
          >
            Borrar lista
          </button>
        </p>
      )}
    </div>
  )
}
