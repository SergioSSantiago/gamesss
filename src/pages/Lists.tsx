import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GamePoster } from '../components/GamePoster'
import { useLibrary } from '../context/LibraryContext'

export function Lists() {
  const { username } = useParams()
  const navigate = useNavigate()
  const { users, currentUser, lists, createList } = useLibrary()
  const user = users.find((u) => u.username === username)
  const mine = currentUser?.id === user?.id
  const userLists = lists.filter((l) => l.userId === user?.id)
  const [name, setName] = useState('')
  const [ranked, setRanked] = useState(false)

  if (!user) {
    return <div className="page"><p className="empty">Perfil no encontrado.</p></div>
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    const list = createList(name, '', ranked)
    setName('')
    navigate(`/list/${list.id}`)
  }

  return (
    <div className="page">
      <div className="hero">
        <p className="game-kicker"><Link to={`/u/${user.username}`}>{user.displayName}</Link></p>
        <h1>Listas</h1>
      </div>
      {mine && (
        <form onSubmit={submit} className="filters">
          <div className="field" style={{ flex: 1 }}>
            <label>Nueva lista</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="JRPG de 2004, Souls-like, backlog de verano…" />
          </div>
          <label style={{ alignSelf: 'end', paddingBottom: 8 }}>
            <input type="checkbox" checked={ranked} onChange={(e) => setRanked(e.target.checked)} /> Ranking
          </label>
          <div className="field">
            <label>&nbsp;</label>
            <button className="btn" type="submit">Crear</button>
          </div>
        </form>
      )}
      {userLists.length === 0 && <p className="empty">Todavía no hay listas.</p>}
      {userLists.map((list) => (
        <section key={list.id} style={{ marginBottom: 28 }}>
          <div className="section-head">
            <h2><Link to={`/list/${list.id}`}>{list.name}</Link> · {list.games.length}</h2>
          </div>
          <div className="rail">
            {list.games.slice(0, 10).map((g) => (
              <GamePoster key={g.id} game={g} showMeta={false} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
