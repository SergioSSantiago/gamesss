import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GamePoster, PosterSkeleton } from '../components/GamePoster'
import { PlatformPhoto } from '../components/PlatformPhoto'
import { arcadeByCategory, ARCADE_CATEGORY_LABEL } from '../data/arcadeCabinets'
import { ARCADE_GAME_PLANS } from '../data/arcadeGamePlans'
import { TYPE_LABEL, familyOf, platformBySlug } from '../data/platforms'
import { formatYearRange } from '../lib/format'
import { gamesOnPlatform } from '../lib/wikidata'
import type { GameSummary } from '../types'

export function PlatformPage() {
  const { slug = '' } = useParams()
  const platform = platformBySlug(slug)
  const [games, setGames] = useState<GameSummary[] | null>(null)
  const [page, setPage] = useState(0)
  const kin = platform ? familyOf(platform).filter((p) => p.slug !== platform.slug) : []

  useEffect(() => {
    setPage(0)
  }, [slug])

  useEffect(() => {
    if (!platform) return
    let alive = true
    setGames(null)
    gamesOnPlatform(platform.gamesId, 24, page * 24)
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
      <div className="platform-hero">
        <PlatformPhoto src={platform.image} name={platform.name} className="lg" />
        <div>
          <p className="game-kicker">{platform.manufacturer}</p>
          <h1>{platform.name}</h1>
          <p>
            {formatYearRange(platform.yearStart, platform.yearEnd)}
            {' · '}
            {TYPE_LABEL[platform.type]}
            {platform.variant ? ` · ${platform.variant}` : ''}
            {platform.aka?.length ? ` · También ${platform.aka.join(', ')}` : ''}
          </p>
        </div>
      </div>

      {kin.length > 0 && (
        <section>
          <div className="section-head"><h2>Modelos y versiones</h2></div>
          <div className="platform-grid">
            {kin.map((p) => (
              <Link className="platform-card has-photo" key={p.slug} to={`/platform/${p.slug}`}>
                <PlatformPhoto src={p.image} name={p.name} />
                <strong>{p.name}</strong>
                <span>{p.variant ?? p.yearStart}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {platform.slug === 'arcade' && (
        <section>
          <div className="section-head">
            <h2>Planes por modelo de juego</h2>
            <Link to="/arcade">Ver catálogo completo</Link>
          </div>
          <div className="platform-grid">
            {ARCADE_GAME_PLANS.slice(0, 12).map((g) => (
              <Link className="platform-card has-photo" key={g.id} to={`/arcade/${g.id}`}>
                <PlatformPhoto src={g.image} name={g.name} />
                <strong>{g.name}</strong>
                <span>{g.year} · plan de panel</span>
              </Link>
            ))}
          </div>
          <div className="section-head" style={{ marginTop: 28 }}>
            <h2>Formas y chasis</h2>
          </div>
          {arcadeByCategory().slice(0, 2).map((group) => (
            <div key={group.category} style={{ marginBottom: 18 }}>
              <p className="game-kicker">{ARCADE_CATEGORY_LABEL[group.category]}</p>
              <div className="platform-grid">
                {group.items.slice(0, 4).map((cab) => (
                  <Link className="platform-card has-photo" key={cab.id} to={`/arcade/${cab.id}`}>
                    <PlatformPhoto src={cab.image} name={cab.name} />
                    <strong>{cab.name}</strong>
                    <span>{cab.dims ?? 'plan / esquema'}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <div className="section-head"><h2>Juegos</h2></div>
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
