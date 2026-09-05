import { useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { initials } from '../lib/format'

export function Layout() {
  const { currentUser } = useLibrary()
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  function search(e: FormEvent) {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    navigate(`/games?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="logo" to="/">game<span>sss</span></Link>
          <form className="header-search" onSubmit={search}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar juegos…"
              aria-label="Buscar juegos"
            />
          </form>
          <nav className="nav">
            <NavLink to="/games" className={({ isActive }) => (isActive ? 'active' : '')}>Juegos</NavLink>
            <NavLink to="/special" className={({ isActive }) => (isActive ? 'active' : '')}>Especiales</NavLink>
            <NavLink to="/arcade" className={({ isActive }) => (isActive ? 'active' : '')}>Arcade</NavLink>
            <NavLink to="/platforms" className={({ isActive }) => (isActive ? 'active' : '')}>Consolas</NavLink>
            {currentUser ? (
              <>
                <NavLink to={`/u/${currentUser.username}/lists`}>Listas</NavLink>
                <NavLink to={`/u/${currentUser.username}`} className="nav-user">
                  <span className="avatar">{initials(currentUser.displayName)}</span>
                  {currentUser.username}
                </NavLink>
              </>
            ) : (
              <NavLink to="/signin">Entrar</NavLink>
            )}
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        Catálogo mundial de consolas y videojuegos vía Wikidata y Wikipedia.
        Tu diario se guarda en este navegador.
      </footer>
    </div>
  )
}
