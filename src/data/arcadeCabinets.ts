import { commons } from '../lib/commons'

export type ArcadeCategory = 'form' | 'chassis' | 'dedicated' | 'interface'

export type ArcadeCabinet = {
  id: string
  name: string
  category: ArcadeCategory
  maker?: string
  years?: string
  description: string
  /** Photo / illustration */
  image: string
  /** Plan coté, schéma ou brevet */
  plan?: string
  /** Dimensions typiques L × P × H */
  dims?: string
  aka?: string[]
}

const C = commons

export const ARCADE_CATEGORY_LABEL: Record<ArcadeCategory, string> = {
  form: 'Formas / carcasas',
  chassis: 'Chasis universales',
  dedicated: 'Bornes dedicadas',
  interface: 'Esquemas e interfaces',
}

/** Catálogo de bornes, planos y esquemas de arcade. */
export const ARCADE_CABINETS: ArcadeCabinet[] = [
  // —— Formas ——
  {
    id: 'upright',
    name: 'Upright (vertical)',
    category: 'form',
    years: '1972—',
    description:
      'La borne de pie clásica: monitor a la altura de la vista, panel de control delante y altavoces encima o debajo. Formato dominante en salas occidentales.',
    image: C('Borne arcade Pacman.png'),
    plan: '/arcade/plan-upright.svg',
    dims: '≈ 63 × 83 × 175–185 cm',
    aka: ['Stand-up', 'Upright cab'],
  },
  {
    id: 'cabaret',
    name: 'Cabaret / mini upright',
    category: 'form',
    years: '1978—',
    description:
      'Versión más baja y estrecha del upright, pensada para locales pequeños. Misma ergonomía, menos volumen.',
    image: C('Borne arcade Pacman.png'),
    plan: '/arcade/plan-cabaret.svg',
    dims: '≈ 50 × 70 × 140–155 cm',
    aka: ['Mini', 'Cabaret'],
  },
  {
    id: 'cocktail',
    name: 'Cocktail / tabletop',
    category: 'form',
    years: '1970s—',
    description:
      'Mesa con monitor mirando hacia arriba y dos paneles enfrentados. Ideal para dos jugadores sentados; el vídeo se voltea según el turno.',
    image: C('Cocktail table arcade game (white background).jpg'),
    plan: '/arcade/plan-cocktail.svg',
    dims: '≈ 80 × 70 × 75 cm',
    aka: ['Table', 'Cocktail table'],
  },
  {
    id: 'bartop',
    name: 'Bartop / countertop',
    category: 'form',
    years: '1980s—',
    description:
      'Caja sin pie: se apoya en barra o mueble. Popular en bares y en réplicas DIY modernas (Raspberry Pi, etc.).',
    image: C('Cocktail table arcade game.jpg'),
    plan: '/arcade/plan-bartop.svg',
    dims: '≈ 50 × 45 × 45–55 cm',
  },
  {
    id: 'sitdown',
    name: 'Sit-down / cockpit',
    category: 'form',
    years: '1980s—',
    description:
      'Asiento integrado o carlinga: conducción, shooters en rail y simuladores. El jugador queda envuelto por el panel y a veces por un marco.',
    image: C('Outrun-sit-down-cabinet.jpg'),
    plan: '/arcade/plan-sitdown.svg',
    dims: '≈ 100–170 × 150–200 × 170–200 cm',
    aka: ['Cockpit', 'Deluxe sit-down'],
  },
  {
    id: 'candy',
    name: 'Candy cabinet (Japón)',
    category: 'form',
    maker: 'Sega / Taito / Namco…',
    years: '1990s—',
    description:
      'Carcasa japonesa “pastel”: laterales claros, gran cristal, 29″ CRT o LCD. Pensada para placas JAMMA intercambiables en game centers.',
    image: C('Sega astro city candy cab.jpg'),
    plan: '/arcade/plan-candy.svg',
    dims: '≈ 75 × 85 × 190 cm (Astro City típica)',
    aka: ['Candy cab', 'Japanese cab'],
  },
  {
    id: 'twin',
    name: 'Twin / versus',
    category: 'form',
    years: '1990s—',
    description:
      'Dos puestos simétricos (a menudo 1P/2P frente a frente o lado a lado) para luchas y versus. Chasis Versus City, Net City, etc.',
    image: C('Sega New Astro City (50356520032).jpg'),
    plan: '/arcade/plan-twin.svg',
    dims: '≈ 140 × 90 × 190 cm',
  },
  {
    id: 'environmental',
    name: 'Environmental / deluxe ride',
    category: 'form',
    years: '1980s—',
    description:
      'Bornes de gran formato: hidráulica, force feedback, varias pantallas o carlingas cerradas (After Burner, WaveRunner, DDR theater, etc.).',
    image: C('Spy Hunter sit-down cabinet.jpg'),
    plan: '/arcade/plan-environmental.svg',
    dims: 'Variable (a menudo > 2 m de lado)',
  },

  // —— Chasis universales ——
  {
    id: 'astro-city',
    name: 'Sega Astro City',
    category: 'chassis',
    maker: 'Sega',
    years: '1993—',
    description:
      'Candy cab icónica: CRT 29″, panel JAMMA, estética blanca/rosa. Base de muchas salas japonesas y del mercado de segunda mano.',
    image: C('Sega astro city candy cab.jpg'),
    plan: '/arcade/plan-candy.svg',
    dims: '≈ 75 × 84 × 192 cm',
  },
  {
    id: 'new-astro-city',
    name: 'Sega New Astro City',
    category: 'chassis',
    maker: 'Sega',
    years: '1990s—',
    description:
      'Evolución del Astro City con mejor cristal, cableado y acabados. Misma huella general; compatible con placas JAMMA estándar.',
    image: C('Sega New Astro City (50356520032).jpg'),
    plan: '/arcade/plan-candy.svg',
  },
  {
    id: 'blast-city',
    name: 'Sega Blast City',
    category: 'chassis',
    maker: 'Sega',
    years: '1996—',
    description:
      'Chasis más “serio” (gris/negro), muy usado con NAOMI, Model 3 y luchas. Buen acceso al harness y al monitor.',
    image: C('Festival du jeu video 20080926 030.jpg'),
    plan: '/arcade/plan-candy.svg',
  },
  {
    id: 'egret',
    name: 'Taito Egret / Egret II',
    category: 'chassis',
    maker: 'Taito',
    years: '1996—',
    description:
      'Candy Taito rival del Astro City. Egret II Plus admite también monitores LCD en conversiones modernas.',
    image: C('Sega astro city candy cab.jpg'),
    plan: '/arcade/plan-candy.svg',
  },
  {
    id: 'vewlix',
    name: 'Taito Vewlix',
    category: 'chassis',
    maker: 'Taito',
    years: '2007—',
    description:
      'Chasis LCD 32–37″ (Vewlix L/F/etc.), estándar actual en Japón para Taito Type X, NESiCAxLive y multi.',
    image: C('Sega New Astro City (50356520032).jpg'),
    plan: '/arcade/plan-candy.svg',
    dims: '≈ 85 × 90 × 200 cm',
  },
  {
    id: 'neo-geo-mvs-cab',
    name: 'Neo Geo MVS (chasis)',
    category: 'chassis',
    maker: 'SNK',
    years: '1990–2004',
    description:
      'Placas MVS de 1 a 6 slots en bornes dedicadas o candy. El “chasis” es tanto la PCB multicartucho como la carcasa del local.',
    image: C('Neo-Geo-MVS-2Slot.png'),
    plan: '/arcade/plan-upright.svg',
  },

  // —— Dedicadas míticas ——
  {
    id: 'pong-cab',
    name: 'Pong (Atari)',
    category: 'dedicated',
    maker: 'Atari',
    years: '1972',
    description: 'Una de las primeras bornes comerciales. Carcasa de madera, TV B/N y dos paddle.',
    image: C('Atari game cabinet patent.png'),
    plan: C('Atari game cabinet patent.png'),
  },
  {
    id: 'pacman-cab',
    name: 'Pac-Man',
    category: 'dedicated',
    maker: 'Namco / Midway',
    years: '1980',
    description: 'Upright y cocktail icónicos; marquee amarillo y panel con stick + 1 botón.',
    image: C('Borne arcade Pacman.png'),
    plan: '/arcade/plan-upright.svg',
  },
  {
    id: 'space-invaders-cab',
    name: 'Space Invaders',
    category: 'dedicated',
    maker: 'Taito',
    years: '1978',
    description: 'Upright con monitor vertical y a veces cocktail. Definó el boom de las salas a finales de los 70.',
    image: C('Musée Mécanique 183.JPG'),
    plan: '/arcade/plan-upright.svg',
  },
  {
    id: 'outrun-cab',
    name: 'OutRun (sit-down)',
    category: 'dedicated',
    maker: 'Sega',
    years: '1986',
    description: 'Cockpit con asiento, volante y palanca de marchas. Referencia del sit-down de conducción.',
    image: C('Outrun-sit-down-cabinet.jpg'),
    plan: '/arcade/plan-sitdown.svg',
  },
  {
    id: 'spyhunter-cab',
    name: 'Spy Hunter (sit-down)',
    category: 'dedicated',
    maker: 'Bally Midway',
    years: '1983',
    description: 'Sit-down con volante y pedales; ejemplo occidental de borne “vehículo”.',
    image: C('Spy Hunter sit-down cabinet.jpg'),
    plan: '/arcade/plan-sitdown.svg',
  },
  {
    id: 'ddr-cab',
    name: 'Dance Dance Revolution',
    category: 'dedicated',
    maker: 'Konami',
    years: '1998—',
    description: 'Borne + stage de flechas. El “plan” incluye altura del monitor, distancia al pad y zona de seguridad.',
    image: C('Segas Line of Fire and Namcos Pole Position II sit-down cabinets.jpg'),
    plan: '/arcade/plan-environmental.svg',
    dims: 'Pad ≈ 100 × 100 cm + borne',
  },

  // —— Interfaces / esquemas ——
  {
    id: 'jamma',
    name: 'JAMMA (pinout)',
    category: 'interface',
    years: '1985—',
    description:
      'Japan Arcade Machine Manufacturers’ Association: conector edge de 56 pines (28×2) que unifica +5 V, +12 V, vídeo RGB, altavoz, sticks y 3–4 botones. Base de casi todo el conversion era 80s–90s.',
    image: '/arcade/jamma-pinout.svg',
    plan: '/arcade/jamma-pinout.svg',
    aka: ['JAMMA harness'],
  },
  {
    id: 'jamma-kick',
    name: 'Kick harness / extra botones',
    category: 'interface',
    years: '1990s—',
    description:
      'Cable auxiliar (a menudo 3–6 pines) para botones 4–6 en luchas (SFII, KOF…). Complementa el edge JAMMA sin romper compatibilidad.',
    image: '/arcade/jamma-kick.svg',
    plan: '/arcade/jamma-kick.svg',
  },
  {
    id: 'jvs',
    name: 'JVS (JAMMA Video Standard)',
    category: 'interface',
    years: '1997—',
    description:
      'Sucesor digital del JAMMA: USB-A host en la I/O board, daisy-chain de controles, usado por NAOMI, Triforce, Chihiro, System 246/256, Taito Type X…',
    image: C('JVS-JAMMA-I-O-Board-Set-for-Namco-System.jpg'),
    plan: '/arcade/jvs-overview.svg',
  },
  {
    id: 'atari-patent',
    name: 'Plan Atari (patente de carcasa)',
    category: 'interface',
    maker: 'Atari',
    years: '1970s',
    description:
      'Dibujo de patente de carcasa Atari: uno de los planos públicos más antiguos que documentan la geometría de una borne upright.',
    image: C('Atari game cabinet patent.png'),
    plan: C('Atari game cabinet patent.png'),
  },
]

export function arcadeByCategory(): { category: ArcadeCategory; items: ArcadeCabinet[] }[] {
  const order: ArcadeCategory[] = ['form', 'chassis', 'dedicated', 'interface']
  return order.map((category) => ({
    category,
    items: ARCADE_CABINETS.filter((c) => c.category === category),
  }))
}

export function arcadeById(id: string): ArcadeCabinet | undefined {
  return ARCADE_CABINETS.find((c) => c.id === id)
}
