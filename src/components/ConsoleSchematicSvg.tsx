import type { PlatformSchematic, SchemaKind } from '../data/platformSchematics'

const KIND_COLOR: Record<SchemaKind, string> = {
  cpu: '#00e054',
  gpu: '#40bcf4',
  apu: '#ff8000',
  mem: '#c9a0ff',
  media: '#ffd166',
  io: '#9ab',
  power: '#f66',
  bus: '#678',
  display: '#7fdbca',
  storage: '#e6b3ff',
  net: '#5dade2',
}

const COLS = 4
const BOX_W = 150
const BOX_H = 52
const GAP_X = 24
const GAP_Y = 36
const PAD = 28

function layout(schematic: PlatformSchematic) {
  const positions = new Map<string, { x: number; y: number }>()
  schematic.blocks.forEach((b, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    positions.set(b.id, {
      x: PAD + col * (BOX_W + GAP_X),
      y: PAD + 36 + row * (BOX_H + GAP_Y),
    })
  })
  const rows = Math.ceil(schematic.blocks.length / COLS)
  const width = PAD * 2 + COLS * BOX_W + (COLS - 1) * GAP_X
  const height = PAD + 36 + rows * BOX_H + (rows - 1) * GAP_Y + PAD
  return { positions, width, height }
}

function center(pos: { x: number; y: number }) {
  return { x: pos.x + BOX_W / 2, y: pos.y + BOX_H / 2 }
}

/** Diagrama de bloques SVG para la arquitectura de una consola. */
export function ConsoleSchematicSvg({ schematic }: { schematic: PlatformSchematic }) {
  const { positions, width, height } = layout(schematic)

  const edgePaths = schematic.edges
    .map(([from, to, label], i) => {
      const a = positions.get(from)
      const b = positions.get(to)
      if (!a || !b) return null
      const ca = center(a)
      const cb = center(b)
      const mx = (ca.x + cb.x) / 2
      const my = (ca.y + cb.y) / 2
      return (
        <g key={`${from}-${to}-${i}`}>
          <line
            x1={ca.x}
            y1={ca.y}
            x2={cb.x}
            y2={cb.y}
            stroke="#3a4550"
            strokeWidth={2}
            markerEnd="url(#arrow)"
          />
          {label && (
            <text x={mx} y={my - 6} textAnchor="middle" fill="#678" fontSize={10}>
              {label}
            </text>
          )}
        </g>
      )
    })
    .filter(Boolean)

  return (
    <svg
      className="console-schematic-svg"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={schematic.title}
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#3a4550" />
        </marker>
      </defs>
      <rect width={width} height={height} fill="#0e1216" rx={8} />
      <text x={PAD} y={22} fill="#9ab" fontSize={13} fontWeight={600}>
        {schematic.title}
      </text>
      {schematic.subtitle && (
        <text x={PAD} y={38} fill="#678" fontSize={11}>
          {schematic.subtitle}
        </text>
      )}
      {edgePaths}
      {schematic.blocks.map((block) => {
        const pos = positions.get(block.id)!
        const stroke = KIND_COLOR[block.kind]
        return (
          <g key={block.id}>
            <rect
              x={pos.x}
              y={pos.y}
              width={BOX_W}
              height={BOX_H}
              rx={6}
              fill="#161c22"
              stroke={stroke}
              strokeWidth={2}
            />
            <text
              x={pos.x + BOX_W / 2}
              y={pos.y + 22}
              textAnchor="middle"
              fill="#e8eef4"
              fontSize={12}
              fontWeight={600}
            >
              {block.label}
            </text>
            {block.detail && (
              <text
                x={pos.x + BOX_W / 2}
                y={pos.y + 38}
                textAnchor="middle"
                fill="#9ab"
                fontSize={10}
              >
                {block.detail}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
