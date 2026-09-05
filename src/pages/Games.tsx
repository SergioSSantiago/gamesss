import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GamePoster, PosterSkeleton } from '../components/GamePoster'
import { PLATFORMS } from '../data/platforms'
import { searchGames } from '../lib/wikidata'
import type { GameSummary } from '../types'

export function Games() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const platform = params.get('platform') ?? ''
  const [input, setInput] = useState(q)
  const [games, setGames] = useState<GameSummary[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => { setInput(q) }, [q])

  useEffect(() => {
    let alive = true
    setGames(null)
    setError('')
    const query = q.trim()
    if (!query) {
      setGames([])
      return
    }
    searchGames(query, 32, 0, platform || undefined)
      .then((results) => {
        if (!alive) return
        setGames(results)
      })
      .catch(() => {
        if (alive) {
          setError('No se pudo buscar ahora. Prueba de nuevo en unos segundos.')
          setGames([])
        }
      })
    return () => { alive = false }
  }, [q, platform])

  const makers = useMemo(() => {
    const seen = new Set<string>()
    return PLATFORMS.filter((p) => {
      if (seen.has(p.manufacturer)) return false
      seen.add(p.manufacturer)
      return true
    })
  }, [])

  function submit(e: FormEvent) {
    e.preventDefault()
    const next = new URLSearchParams(params)
    if (input.trim()) next.set('q', input.trim())
    else next.delete('q')
    setParams(next)
  }

  return (
    <div className="page">
      <div className="hero">
        <h1>Juegos</h1>
        <p>Busca en el catálogo mundial. Hay cientos de miles de títulos indexados.</p>
      </div>
      <form onSubmit={submit} className="filters">
        <div className="field" style={{ flex: 1, minWidth: 220 }}>
          <label>Título</label>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Zelda, Halo, Tetris…" />
        </div>
        <div className="field" style={{ minWidth: 200 }}>
          <label>Filtrar plataforma (en resultados)</label>
          <select
            value={platform}
            onChange={(e) => {
              const next = new URLSearchParams(params)
              if (e.target.value) next.set('platform', e.target.value)
              else next.delete('platform')
              setParams(next)
            }}
          >
            <option value="">Todas</option>
            {makers.map((m) => (
              <optgroup key={m.manufacturer} label={m.manufacturer}>
                {PLATFORMS.filter((p) => p.manufacturer === m.manufacturer).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="field" style={{ justifyContent: 'end' }}>
          <label>&nbsp;</label>
          <button className="btn" type="submit">Buscar</button>
        </div>
      </form>

      {!q && (
        <p className="empty">Escribe un título para buscar en todo el catálogo.</p>
      )}
      {q && games === null && <PosterSkeleton count={12} />}
      {error && <p className="empty">{error}</p>}
      {games && games.length === 0 && q && !error && (
        <p className="empty">Nada con “{q}”. Prueba el nombre en inglés o más corto.</p>
      )}
      {games && games.length > 0 && (
        <div className="grid-posters">
          {games.map((game) => (
            <GamePoster key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
