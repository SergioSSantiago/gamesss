import { Link } from 'react-router-dom'
import { platformsByManufacturer } from '../data/platforms'
import { formatYearRange } from '../lib/format'

const TYPE_LABEL: Record<string, string> = {
  home: 'Sobremesa',
  handheld: 'Portátil',
  hybrid: 'Híbrida',
  computer: 'Ordenador',
  mobile: 'Móvil',
  vr: 'VR',
  arcade: 'Arcade',
  cloud: 'Nube',
}

export function Platforms() {
  const groups = platformsByManufacturer()
  return (
    <div className="page">
      <div className="hero">
        <h1>Todas las consolas</h1>
        <p>
          De la Magnavox Odyssey al Switch 2: sobremesa, portátiles, ordenadores,
          arcade, VR y nubes. Entra en una para ver sus juegos.
        </p>
      </div>
      {groups.map((group) => (
        <section className="mfr-block" key={group.manufacturer}>
          <h2>{group.manufacturer}</h2>
          <div className="platform-grid">
            {group.platforms.map((p) => (
              <Link className="platform-card" key={p.id} to={`/platform/${p.slug}`}>
                <strong>{p.name}</strong>
                <span>
                  {formatYearRange(p.yearStart, p.yearEnd)} · {TYPE_LABEL[p.type]}
                  {p.generation ? ` · Gen ${p.generation}` : ''}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
