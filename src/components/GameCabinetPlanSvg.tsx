import type { ArcadeGamePlan, PanelExtra } from '../data/arcadeGamePlans'
import { EXTRA_LABEL, FORM_LABEL } from '../data/arcadeGamePlans'

function playerBlock(
  x: number,
  y: number,
  sticks: number,
  buttons: number,
  label: string,
  extras: PanelExtra[] = [],
) {
  const parts: string[] = []
  parts.push(`<text x="${x}" y="${y - 10}" text-anchor="middle" fill="#9ab" font-size="11">${label}</text>`)
  let cx = x - 50
  for (let s = 0; s < sticks; s++) {
    parts.push(`<circle cx="${cx}" cy="${y + 20}" r="16" fill="#1c2228" stroke="#00e054" stroke-width="2"/>`)
    parts.push(`<circle cx="${cx}" cy="${y + 20}" r="5" fill="#00e054"/>`)
    parts.push(`<text x="${cx}" y="${y + 48}" text-anchor="middle" fill="#678" font-size="9">STICK</text>`)
    cx += 42
  }
  let bx = x + (sticks ? 10 : -40)
  const by = y + 12
  for (let b = 0; b < buttons; b++) {
    const col = b % 3
    const row = Math.floor(b / 3)
    const px = bx + col * 28
    const py = by + row * 28
    parts.push(`<circle cx="${px}" cy="${py}" r="11" fill="#2a3340" stroke="#ff8000" stroke-width="2"/>`)
    parts.push(`<text x="${px}" y="${py + 3}" text-anchor="middle" fill="#def" font-size="8">${b + 1}</text>`)
  }
  let ex = x - 40
  const ey = y + 70
  for (const extra of extras) {
    if (extra === 'trackball' || extra === 'spinner') {
      parts.push(`<circle cx="${ex}" cy="${ey}" r="18" fill="#1c2228" stroke="#40bcf4" stroke-width="2"/>`)
      parts.push(`<text x="${ex}" y="${ey + 36}" text-anchor="middle" fill="#678" font-size="8">${EXTRA_LABEL[extra]}</text>`)
      ex += 50
    } else if (extra === 'wheel') {
      parts.push(`<circle cx="${ex + 10}" cy="${ey}" r="22" fill="none" stroke="#40bcf4" stroke-width="3"/>`)
      parts.push(`<text x="${ex + 10}" y="${ey + 40}" text-anchor="middle" fill="#678" font-size="8">VOLANTE</text>`)
      ex += 60
    } else if (extra === 'yoke') {
      parts.push(`<rect x="${ex - 24}" y="${ey - 10}" width="48" height="16" rx="4" fill="#1c2228" stroke="#40bcf4" stroke-width="2"/>`)
      parts.push(`<text x="${ex}" y="${ey + 36}" text-anchor="middle" fill="#678" font-size="8">YOKE</text>`)
      ex += 60
    } else if (extra === 'gun') {
      parts.push(`<rect x="${ex - 8}" y="${ey - 28}" width="16" height="40" rx="3" fill="#1c2228" stroke="#ff8000" stroke-width="2"/>`)
      parts.push(`<text x="${ex}" y="${ey + 30}" text-anchor="middle" fill="#678" font-size="8">GUN</text>`)
      ex += 45
    } else if (extra === 'pedals') {
      parts.push(`<rect x="${ex - 20}" y="${ey}" width="18" height="24" fill="#2a3340" stroke="#9ab"/>`)
      parts.push(`<rect x="${ex + 4}" y="${ey}" width="18" height="24" fill="#2a3340" stroke="#9ab"/>`)
      parts.push(`<text x="${ex}" y="${ey + 40}" text-anchor="middle" fill="#678" font-size="8">PEDALES</text>`)
      ex += 55
    } else if (extra === 'shifter') {
      parts.push(`<rect x="${ex - 10}" y="${ey - 16}" width="20" height="36" rx="2" fill="#1c2228" stroke="#00e054"/>`)
      parts.push(`<text x="${ex}" y="${ey + 40}" text-anchor="middle" fill="#678" font-size="8">GEAR</text>`)
      ex += 45
    } else if (extra === 'dancepad') {
      parts.push(`<rect x="${ex - 30}" y="${ey - 30}" width="60" height="60" fill="#1c2228" stroke="#00e054" stroke-width="2"/>`)
      parts.push(`<polygon points="${ex},${ey - 18} ${ex - 10},${ey - 4} ${ex + 10},${ey - 4}" fill="#00e054"/>`)
      parts.push(`<polygon points="${ex},${ey + 18} ${ex - 10},${ey + 4} ${ex + 10},${ey + 4}" fill="#00e054"/>`)
      parts.push(`<polygon points="${ex - 18},${ey} ${ex - 4},${ey - 10} ${ex - 4},${ey + 10}" fill="#00e054"/>`)
      parts.push(`<polygon points="${ex + 18},${ey} ${ex + 4},${ey - 10} ${ex + 4},${ey + 10}" fill="#00e054"/>`)
      parts.push(`<text x="${ex}" y="${ey + 48}" text-anchor="middle" fill="#678" font-size="8">PAD</text>`)
      ex += 80
    } else if (extra === 'paddles') {
      parts.push(`<rect x="${ex - 8}" y="${ey - 20}" width="16" height="40" rx="8" fill="#1c2228" stroke="#40bcf4" stroke-width="2"/>`)
      parts.push(`<text x="${ex}" y="${ey + 36}" text-anchor="middle" fill="#678" font-size="8">PADDLE</text>`)
      ex += 45
    }
  }
  return parts.join('')
}

/** SVG del panel de control + metadatos del plan por juego. */
export function GameCabinetPlanSvg({ game }: { game: ArcadeGamePlan }) {
  const w = game.players >= 4 ? 720 : game.players === 2 ? 560 : 420
  const h = game.extras?.length ? 320 : 260
  const centers =
    game.players === 1
      ? [w / 2]
      : game.players === 2
        ? [w * 0.28, w * 0.72]
        : game.players === 3
          ? [w * 0.2, w * 0.5, w * 0.8]
          : [w * 0.15, w * 0.38, w * 0.62, w * 0.85]

  const extrasPerPlayer = game.extras ?? []
  const sharedExtras = extrasPerPlayer.filter((e) =>
    ['wheel', 'pedals', 'shifter', 'yoke', 'dancepad'].includes(e),
  )
  const localExtras = extrasPerPlayer.filter((e) => !sharedExtras.includes(e))

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      className="game-plan-svg"
      role="img"
      aria-label={`Plan de panel: ${game.name}`}
    >
      <rect width={w} height={h} fill="#0e1216" />
      <text x={w / 2} y="28" textAnchor="middle" fill="#9ab" fontSize="14" letterSpacing="2">
        {game.name.toUpperCase()} — PANEL
      </text>
      <text x={w / 2} y="48" textAnchor="middle" fill="#678" fontSize="11">
        {FORM_LABEL[game.form]} · {game.maker} · {game.year}
      </text>
      <rect
        x="24"
        y="64"
        width={w - 48}
        height={h - 100}
        rx="10"
        fill="#1c2228"
        stroke="#2c3440"
        strokeWidth="2"
      />
      <g
        dangerouslySetInnerHTML={{
          __html: centers
            .map((cx, i) =>
              playerBlock(
                cx,
                110,
                game.sticks,
                game.buttons,
                game.players === 1 ? '1P' : `${i + 1}P`,
                i === 0 ? [...localExtras, ...sharedExtras] : localExtras,
              ),
            )
            .join(''),
        }}
      />
      <text x={w / 2} y={h - 16} textAnchor="middle" fill="#678" fontSize="10">
        {[
          game.sticks ? `${game.sticks} stick` : null,
          game.buttons ? `${game.buttons} botones` : null,
          ...(game.extras?.map((e) => EXTRA_LABEL[e]) ?? []),
          game.dims,
        ]
          .filter(Boolean)
          .join(' · ')}
      </text>
    </svg>
  )
}
