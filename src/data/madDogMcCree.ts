import { MAD_DOG_MEDIA } from './madDogMedia'

/** Ficha especial: todas las versiones arcade de Mad Dog McCree (American Laser Games). */

export type MadDogVersion = {
  id: string
  /** Enlace al plan arcade `/arcade/:id` */
  arcadeId: string
  title: string
  year: string
  kind: 'hardware' | 'cabinet' | 'sequel'
  players: '1P' | '2P' | '1–2P'
  screen?: string
  summary: string
  hardware: string[]
  /** Foto / flyer de borne original */
  image: string
}

export const MAD_DOG_GAME_ID = 'Q2747251'
export const MAD_DOG_II_GAME_ID = 'Q3275126'

export const MAD_DOG_SERIES = {
  title: 'Mad Dog McCree',
  maker: 'American Laser Games',
  years: '1990–1992',
  blurb:
    'Primer laserdisc live-action de ALG. Hardware Amiga 500 + Sony LDP-1450 + genlock; el juego se reparte en ROM/laserdisc y se monta en upright CRT o proyección trasera gigante.',
  image: MAD_DOG_MEDIA.uprightCrt,
  wikiGameId: MAD_DOG_GAME_ID,
}

/**
 * Versiones arcade documentadas:
 * - Rev. A (1990): 1 pistola
 * - Rev. B (1992): 2 pistolas / TAOS
 * - Carcasa CRT 25″/33″
 * - Carcasa proyección 46″/50″
 * - Secuela Mad Dog II (misma plataforma Rev. B)
 */
export const MAD_DOG_VERSIONS: MadDogVersion[] = [
  {
    id: 'rev-a',
    arcadeId: 'maddog-rev-a',
    title: 'Mad Dog McCree · System Revision A',
    year: '1990',
    kind: 'hardware',
    players: '1P',
    summary:
      'Lanzamiento original. Una sola light gun, placa RAM/ROM Rev. A (2×64 kB) y genlock Mimetics AmiGen. Solo Mad Dog McCree y Who Shot Johnny Rock? cabían en este sistema.',
    hardware: [
      'Amiga 500 (placa madre)',
      'RAM/ROM board Rev. A (2×64 kB)',
      'Mimetics AmiGen genlock',
      'Sony LDP-1450 LaserDisc',
      'Opto-aislador 1P + amplificador de disparo',
      '1 light gun (tilt mercurio = recarga)',
    ],
    image: MAD_DOG_MEDIA.uprightCrt,
  },
  {
    id: 'rev-b',
    arcadeId: 'maddog-rev-b',
    title: 'Mad Dog McCree · System Revision B',
    year: '1992',
    kind: 'hardware',
    players: '2P',
    summary:
      'Upgrade dual-player: más ROM (2×128 kB), RocGen Plus, placa TAOS (audio + 2 guns + ticket opcional). Mad Dog McCree sigue siendo el mismo título; cambia el hardware del borne.',
    hardware: [
      'Amiga 500 (placa madre)',
      'RAM/ROM board Rev. B (2×128 kB)',
      'Roctec RocGen Plus genlock',
      'Sony LDP-1450 LaserDisc',
      'TAOS board (audio 2×8 W + opto 2P)',
      '2 light guns con amplificador integrado',
    ],
    image: MAD_DOG_MEDIA.flyerSpacesaver25,
  },
  {
    id: 'crt',
    arcadeId: 'maddog-crt',
    title: 'Mad Dog McCree · upright CRT',
    year: '1990',
    kind: 'cabinet',
    players: '1–2P',
    screen: 'Monitor 25″ o 33″',
    summary:
      'Carcasa upright clásica con CRT. Misma lógica de juego; el número de pistolas depende de si el interior es Rev. A (1P) o Rev. B (2P).',
    hardware: [
      'Carcasa upright dedicada ALG',
      'CRT 25″ / 33″ horizontal',
      'Panel con pistola(s) en cable',
      'Marquee / side-art Mad Dog McCree',
    ],
    image: MAD_DOG_MEDIA.flyerSpacesaver25,
  },
  {
    id: 'projection',
    arcadeId: 'maddog-projection',
    title: 'Mad Dog McCree · proyección trasera',
    year: '1990',
    kind: 'cabinet',
    players: '1–2P',
    screen: 'Proyección 45″ / 50″',
    summary:
      'Borne “deluxe” bipieza: monitor de proyección + pedestal con gun(s). Flyer UK documenta Pioneer 45″ + Amiga + Sony LDP; USA también 33″/50″.',
    hardware: [
      'Monitor base + pedestal separado',
      'Pioneer / rear-projection 45″–50″ (o 33″)',
      '1–2 light guns en consola',
      'Misma electrónica Rev. A o Rev. B',
    ],
    image: MAD_DOG_MEDIA.flyerProjection45,
  },
  {
    id: 'maddog-ii',
    arcadeId: 'maddog-ii',
    title: 'Mad Dog II: The Lost Gold',
    year: '1992',
    kind: 'sequel',
    players: '2P',
    summary:
      'Secuela arcade en la misma plataforma Rev. B. Se cambia el laserdisc + ROMs; tiroteos dinámicos añadidos. Misma familia de bornes CRT / proyección.',
    hardware: [
      'System Revision B (obligatorio)',
      'Laserdisc Mad Dog II',
      'ROM set Mad Dog II',
      '2 light guns',
    ],
    image: MAD_DOG_MEDIA.maddogIiFront,
  },
]

export const MAD_DOG_KIND_LABEL: Record<MadDogVersion['kind'], string> = {
  hardware: 'Sistema / placa',
  cabinet: 'Carcasa',
  sequel: 'Secuela',
}
