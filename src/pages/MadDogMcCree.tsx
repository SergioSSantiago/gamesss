import { Link } from 'react-router-dom'
import {
  MAD_DOG_KIND_LABEL,
  MAD_DOG_SERIES,
  MAD_DOG_VERSIONS,
  type MadDogVersion,
} from '../data/madDogMcCree'
import { MAD_DOG_GALLERY } from '../data/madDogMedia'
import {
  MAD_DOG_SCHEMATICS,
  MAD_DOG_SCHEMATIC_GROUPS,
  MAD_DOG_SCHEMATIC_PDF,
  type MadDogSchematic,
} from '../data/madDogSchematics'
import { PlatformPhoto } from '../components/PlatformPhoto'

function VersionCard({ v }: { v: MadDogVersion }) {
  return (
    <article className="maddog-card">
      <div className="maddog-card-photo">
        <img src={v.image} alt={v.title} loading="lazy" />
      </div>
      <div className="maddog-card-head">
        <span className="chip">{MAD_DOG_KIND_LABEL[v.kind]}</span>
        <span className="chip">{v.players}</span>
        {v.screen && <span className="chip">{v.screen}</span>}
        <span className="maddog-year">{v.year}</span>
      </div>
      <h2>{v.title}</h2>
      <p className="extract">{v.summary}</p>
      <ul className="maddog-hw">
        {v.hardware.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="maddog-card-actions">
        <Link className="btn" to={`/arcade/${v.arcadeId}`}>
          Plan de borne
        </Link>
      </div>
    </article>
  )
}

function SchematicBlock({
  group,
  items,
}: {
  group: MadDogSchematic['group']
  items: MadDogSchematic[]
}) {
  return (
    <div className="maddog-schem-block">
      <p className="game-kicker">{MAD_DOG_SCHEMATIC_GROUPS[group]}</p>
      <div className="maddog-schem-grid">
        {items.map((s) => (
          <figure key={s.id} className="maddog-schem">
            <a href={s.src} target="_blank" rel="noreferrer">
              <img src={s.src} alt={s.title} loading="lazy" />
            </a>
            <figcaption>
              <strong>{s.title}</strong>
              <span>p. {s.page} · ALG Op. &amp; Service Manual</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function MadDogMcCree() {
  const hardware = MAD_DOG_VERSIONS.filter((v) => v.kind === 'hardware')
  const cabinets = MAD_DOG_VERSIONS.filter((v) => v.kind === 'cabinet')
  const sequels = MAD_DOG_VERSIONS.filter((v) => v.kind === 'sequel')
  const schemGroups = (Object.keys(MAD_DOG_SCHEMATIC_GROUPS) as MadDogSchematic['group'][]).map(
    (group) => ({
      group,
      items: MAD_DOG_SCHEMATICS.filter((s) => s.group === group),
    }),
  )

  return (
    <div className="page">
      <p className="game-kicker">
        <Link to="/special">← Especiales</Link>
        {' · '}
        <Link to="/arcade">Arcade</Link>
      </p>

      <div className="maddog-hero">
        <PlatformPhoto src={MAD_DOG_SERIES.image} name={MAD_DOG_SERIES.title} className="lg" />
        <div>
          <p className="game-kicker">Ficha especial · arcade laserdisc</p>
          <h1 className="game-title">{MAD_DOG_SERIES.title}</h1>
          <p className="game-sub">
            {MAD_DOG_SERIES.maker} · {MAD_DOG_SERIES.years}
          </p>
          <p className="extract">{MAD_DOG_SERIES.blurb}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <Link className="btn" to={`/game/${MAD_DOG_SERIES.wikiGameId}`}>
              Ficha del juego
            </Link>
            <a className="btn ghost" href="#schematics">
              Esquemas técnicos
            </a>
            <Link className="btn ghost" to="/arcade">
              Todos los planes arcade
            </Link>
          </div>
        </div>
      </div>

      <section className="mfr-block" id="schematics">
        <div className="section-head">
          <h2>Esquemas técnicos</h2>
        </div>
        <p className="extract" style={{ marginBottom: 12 }}>
          Páginas de esquemas del <em>American Laser Games — Operation &amp; Service Manual for All Games</em>{' '}
          (v1.05, 16 sep 1993): bandeja Amiga 500 + LDP, cableado guns/consola, placa TAOS, gun board y
          optoisolador. También montaje field 33″/50″.
        </p>
        <p style={{ marginBottom: 18 }}>
          <a className="btn" href={MAD_DOG_SCHEMATIC_PDF} target="_blank" rel="noreferrer">
            Descargar PDF de esquemas ↗
          </a>
        </p>
        {schemGroups.map(({ group, items }) => (
          <SchematicBlock key={group} group={group} items={items} />
        ))}
      </section>

      <section className="mfr-block">
        <div className="section-head">
          <h2>Bornes originales</h2>
        </div>
        <p className="extract" style={{ marginBottom: 16 }}>
          Fotos y flyers de época: upright CRT, Space Saver 25″, pedestal + proyección 45″/50″, distribución
          Capcom Japón y Mad Dog II.
        </p>
        <div className="maddog-gallery">
          {MAD_DOG_GALLERY.map((item) => (
            <figure key={item.src} className="maddog-shot">
              <a href={item.src} target="_blank" rel="noreferrer">
                <img src={item.src} alt={item.caption} loading="lazy" />
              </a>
              <figcaption>
                <strong>{item.caption}</strong>
                <span>{item.credit}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mfr-block">
        <div className="section-head">
          <h2>Sistemas (hardware)</h2>
        </div>
        <p className="extract" style={{ marginBottom: 16 }}>
          El mismo Mad Dog McCree corre en dos revisiones ALG. Cambian pistolas, genlock y capacidad ROM.
        </p>
        <div className="maddog-grid">
          {hardware.map((v) => (
            <VersionCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      <section className="mfr-block">
        <div className="section-head">
          <h2>Carcasas</h2>
        </div>
        <p className="extract" style={{ marginBottom: 16 }}>
          Misma electrónica; distinta pantalla. CRT compacto o proyección trasera de feria.
        </p>
        <div className="maddog-grid">
          {cabinets.map((v) => (
            <VersionCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      <section className="mfr-block">
        <div className="section-head">
          <h2>Misma plataforma</h2>
        </div>
        <div className="maddog-grid">
          {sequels.map((v) => (
            <VersionCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      <p className="empty" style={{ marginTop: 8 }}>
        Créditos: Museum of the Game (KLOV), Arcade Flyer Archive, Dragon’s Lair Project (manuales ALG).
      </p>
    </div>
  )
}
