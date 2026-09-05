import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ARCADE_CABINETS,
  ARCADE_CATEGORY_LABEL,
  arcadeByCategory,
  arcadeById,
  type ArcadeCategory,
} from '../data/arcadeCabinets'
import { PlatformPhoto } from '../components/PlatformPhoto'

const FILTERS: Array<'Todos' | ArcadeCategory> = ['Todos', 'form', 'chassis', 'dedicated', 'interface']

export function Arcade() {
  const { id } = useParams()
  const detail = id ? arcadeById(id) : undefined
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Todos')

  const groups = useMemo(() => {
    if (filter === 'Todos') return arcadeByCategory()
    return [{ category: filter, items: ARCADE_CABINETS.filter((c) => c.category === filter) }]
  }, [filter])

  if (detail) {
    return (
      <div className="page">
        <p className="game-kicker">
          <Link to="/arcade">← Arcade · bornes y planos</Link>
        </p>
        <div className="arcade-detail">
          <div>
            <PlatformPhoto src={detail.image} name={detail.name} className="lg" />
            {detail.plan && detail.plan !== detail.image && (
              <figure className="arcade-plan-fig">
                <img src={detail.plan} alt={`Plan / esquema: ${detail.name}`} />
                <figcaption>Plan / esquema</figcaption>
              </figure>
            )}
            {detail.plan && detail.plan === detail.image && (
              <p className="game-sub">La imagen superior es el plano o la patente de referencia.</p>
            )}
          </div>
          <div>
            <p className="game-kicker">{ARCADE_CATEGORY_LABEL[detail.category]}</p>
            <h1 className="game-title">{detail.name}</h1>
            <p className="game-sub">
              {[detail.maker, detail.years, detail.dims].filter(Boolean).join(' · ')}
            </p>
            <p className="extract">{detail.description}</p>
            {detail.aka?.length ? (
              <p className="game-sub">También: {detail.aka.join(', ')}</p>
            ) : null}
            {detail.plan && (
              <p style={{ marginTop: 16 }}>
                <a className="btn ghost" href={detail.plan} target="_blank" rel="noreferrer">
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
        <h1>Arcade · bornes y planos</h1>
        <p>
          Formas de carcasa, chasis universales (Astro City, Vewlix…), bornes dedicadas
          y esquemas (JAMMA, kick, JVS) con planos acotados.
        </p>
        <p style={{ marginTop: 12 }}>
          <Link className="btn ghost" to="/platform/arcade">Catálogo de juegos arcade</Link>
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
            {f === 'Todos' ? 'Todos' : ARCADE_CATEGORY_LABEL[f]}
          </button>
        ))}
      </div>

      {groups.map((group) => (
        <section className="mfr-block" key={group.category}>
          <h2>{ARCADE_CATEGORY_LABEL[group.category]}</h2>
          <div className="platform-grid">
            {group.items.map((cab) => (
              <Link className="platform-card has-photo arcade-card" key={cab.id} to={`/arcade/${cab.id}`}>
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
