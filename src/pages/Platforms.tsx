import { Link } from 'react-router-dom'
import { PlatformPhoto } from '../components/PlatformPhoto'
import { TYPE_LABEL, platformsByManufacturer } from '../data/platforms'

export function Platforms() {
  const groups = platformsByManufacturer()
  return (
    <div className="page">
      <div className="hero">
        <h1>Todas las consolas</h1>
        <p>
          Modelos, revisiones y versiones: de la Odyssey al Switch 2, fat y slim,
          Lite y OLED, Pro y Digital.
        </p>
      </div>
      {groups.map((group) => (
        <section className="mfr-block" key={group.manufacturer}>
          <h2>{group.manufacturer}</h2>
          {group.families.map((family) => (
            <div className="platform-grid" key={family[0].family}>
              {family.map((p) => (
                <Link className="platform-card has-photo" key={p.slug} to={`/platform/${p.slug}`}>
                  <PlatformPhoto src={p.image} name={p.name} />
                  <strong>{p.name}</strong>
                  <span>
                    {p.variant ? `${p.variant} · ` : ''}
                    {p.yearStart}
                    {p.yearEnd ? `–${p.yearEnd}` : ''}
                    {' · '}
                    {TYPE_LABEL[p.type]}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
