import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ARCADE_CABINETS,
  ARCADE_CATEGORY_LABEL,
  arcadeByCategory,
  arcadeById,
  type ArcadeCategory,
} from '../data/arcadeCabinets'
import {
  ARCADE_GAME_PLANS,
  FORM_LABEL,
  EXTRA_LABEL,
  arcadeGamePlanById,
  arcadeGamePlansByForm,
  type CabinetForm,
} from '../data/arcadeGamePlans'
import { PlatformPhoto } from '../components/PlatformPhoto'
import { GameCabinetPlanSvg } from '../components/GameCabinetPlanSvg'

type Filter = 'Todos' | 'games' | ArcadeCategory

const FILTERS: Filter[] = ['games', 'Todos', 'form', 'chassis', 'dedicated', 'interface']

function filterLabel(f: Filter): string {
  if (f === 'Todos') return 'Carcasas y esquemas'
  if (f === 'games') return 'Por modelo de juego'
  return ARCADE_CATEGORY_LABEL[f]
}

export function Arcade() {
  const { id } = useParams()
  const cabinet = id ? arcadeById(id) : undefined
  const gamePlan = id ? arcadeGamePlanById(id) : undefined
  const [filter, setFilter] = useState<Filter>('games')

  const groups = useMemo(() => {
    if (filter === 'games' || filter === 'Todos') return arcadeByCategory()
    return [{ category: filter, items: ARCADE_CABINETS.filter((c) => c.category === filter) }]
  }, [filter])

  const gameGroups = useMemo(() => arcadeGamePlansByForm(), [])

  if (gamePlan) {
    return (
      <div className="page">
        <p className="game-kicker">
          <Link to="/arcade">← Arcade · planes por juego</Link>
        </p>
        <div className="arcade-detail">
          <div>
            <PlatformPhoto src={gamePlan.image} name={gamePlan.name} className="lg" />
            <figure className="arcade-plan-fig">
              <img src={gamePlan.shellPlan} alt={`Carcasa: ${FORM_LABEL[gamePlan.form]}`} />
              <figcaption>Carcasa · {FORM_LABEL[gamePlan.form]}</figcaption>
            </figure>
          </div>
          <div>
            <p className="game-kicker">Plan por modelo de juego</p>
            <h1 className="game-title">{gamePlan.name}</h1>
            <p className="game-sub">
              {gamePlan.maker} · {gamePlan.year}
              {gamePlan.dims ? ` · ${gamePlan.dims}` : ''}
            </p>
            <p className="extract">{gamePlan.notes}</p>
            <div className="chips" style={{ marginTop: 12 }}>
              <span className="chip">{FORM_LABEL[gamePlan.form]}</span>
              <span className="chip">{gamePlan.players}P</span>
              {gamePlan.sticks > 0 && <span className="chip">{gamePlan.sticks} stick</span>}
              {gamePlan.buttons > 0 && <span className="chip">{gamePlan.buttons} botones</span>}
              {gamePlan.extras?.map((e) => (
                <span className="chip" key={e}>{EXTRA_LABEL[e]}</span>
              ))}
            </div>
            <div className="section-head" style={{ marginTop: 28 }}>
              <h2>Panel de control</h2>
            </div>
            <div className="game-plan-wrap">
              <GameCabinetPlanSvg game={gamePlan} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              <Link className="btn" to={`/game/${gamePlan.gameId}`}>Ficha del juego</Link>
              <Link className="btn ghost" to="/arcade">Todos los modelos</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cabinet) {
    return (
      <div className="page">
        <p className="game-kicker">
          <Link to="/arcade">← Arcade · bornes y planos</Link>
        </p>
        <div className="arcade-detail">
          <div>
            <PlatformPhoto src={cabinet.image} name={cabinet.name} className="lg" />
            {cabinet.plan && cabinet.plan !== cabinet.image && (
              <figure className="arcade-plan-fig">
                <img src={cabinet.plan} alt={`Plan / esquema: ${cabinet.name}`} />
                <figcaption>Plan / esquema</figcaption>
              </figure>
            )}
          </div>
          <div>
            <p className="game-kicker">{ARCADE_CATEGORY_LABEL[cabinet.category]}</p>
            <h1 className="game-title">{cabinet.name}</h1>
            <p className="game-sub">
              {[cabinet.maker, cabinet.years, cabinet.dims].filter(Boolean).join(' · ')}
            </p>
            <p className="extract">{cabinet.description}</p>
            {cabinet.plan && (
              <p style={{ marginTop: 16 }}>
                <a className="btn ghost" href={cabinet.plan} target="_blank" rel="noreferrer">
                  Abrir plan / esquema ↗
                </a>
              </p>
            )}
            <p style={{ marginTop: 20 }}>
              <Link className="btn" to="/platform/arcade">Ver juegos arcade</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="hero">
        <h1>Arcade · planos por juego</h1>
        <p>
          Cada modelo tiene su plan de carcasa y el esquema del panel (sticks, botones,
          volante, guns, dance pad…).
        </p>
      </div>

      <div className="status-pills" style={{ marginBottom: 22 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={filter === f ? 'on' : ''}
            onClick={() => setFilter(f)}
          >
            {filterLabel(f)}
          </button>
        ))}
      </div>

      {(filter === 'games' || filter === 'Todos') && (
        <section className="mfr-block">
          <h2>Por modelo de juego ({ARCADE_GAME_PLANS.length})</h2>
          {gameGroups.map((group) => (
            <div key={group.form} style={{ marginBottom: 22 }}>
              <p className="game-kicker">{FORM_LABEL[group.form as CabinetForm]}</p>
              <div className="platform-grid">
                {group.items.map((g) => (
                  <Link className="platform-card has-photo" key={g.id} to={`/arcade/${g.id}`}>
                    <PlatformPhoto src={g.image} name={g.name} />
                    <strong>{g.name}</strong>
                    <span>
                      {g.year} · {g.players}P
                      {g.buttons ? ` · ${g.buttons} btn` : ''}
                      {g.extras?.length ? ` · ${EXTRA_LABEL[g.extras[0]]}` : ''}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {filter !== 'games' &&
        groups.map((group) => (
          <section className="mfr-block" key={group.category}>
            <h2>{ARCADE_CATEGORY_LABEL[group.category]}</h2>
            <div className="platform-grid">
              {group.items.map((cab) => (
                <Link className="platform-card has-photo" key={cab.id} to={`/arcade/${cab.id}`}>
                  <PlatformPhoto src={cab.image} name={cab.name} />
                  <strong>{cab.name}</strong>
                  <span>
                    {cab.dims ?? cab.years ?? ARCADE_CATEGORY_LABEL[cab.category]}
                    {cab.plan ? ' · plan' : ''}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}
