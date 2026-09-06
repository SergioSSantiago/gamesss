/** Schémas techniques extraits du ALG Operation & Service Manual v1.05 (sept. 1993). */

const P = '/arcade/maddog/schematics'

export type MadDogSchematic = {
  id: string
  page: number
  title: string
  group: 'layout' | 'wiring' | 'taos' | 'boards' | 'assembly'
  src: string
}

export const MAD_DOG_SCHEMATIC_PDF = `${P}/ALG_MadDog_Schematics_extract.pdf`

export const MAD_DOG_SCHEMATIC_GROUPS: Record<MadDogSchematic['group'], string> = {
  layout: 'Layout / interconnexion',
  wiring: 'Câblage borne',
  taos: 'TAOS board',
  boards: 'Cartes gun / opto / audio',
  assembly: 'Montage 33″ / 50″',
}

export const MAD_DOG_SCHEMATICS: MadDogSchematic[] = [
  {
    id: 'tray',
    page: 6,
    title: 'Component & connector locations · equipment tray',
    group: 'layout',
    src: `${P}/06-equipment-tray-locations.jpg`,
  },
  {
    id: 'interconnect',
    page: 7,
    title: 'LDP ↔ main computer · system interconnect',
    group: 'layout',
    src: `${P}/07-ldp-computer-interconnect.jpg`,
  },
  {
    id: 'mainboard',
    page: 10,
    title: 'Main computer · RAM/ROM & TAOS layout',
    group: 'layout',
    src: `${P}/10-mainboard-ramrom-taos-layout.jpg`,
  },
  {
    id: 'cables',
    page: 11,
    title: 'LDP serial · power · bill acceptor · console cables',
    group: 'layout',
    src: `${P}/11-ldp-serial-power-bill-console-cables.jpg`,
  },
  {
    id: 'gun-wiring',
    page: 8,
    title: 'Console switch cable & gun wiring',
    group: 'wiring',
    src: `${P}/08-console-gun-wiring.jpg`,
  },
  {
    id: 'audio-coin',
    page: 9,
    title: 'AC power · audio / coin-light wiring',
    group: 'wiring',
    src: `${P}/09-ac-power-audio-coin-wiring.jpg`,
  },
  {
    id: 'ac',
    page: 20,
    title: 'AC wiring (input, fuse, marquee, monitor…)',
    group: 'wiring',
    src: `${P}/20-ac-wiring.jpg`,
  },
  {
    id: 'ground',
    page: 21,
    title: 'Ground wiring',
    group: 'wiring',
    src: `${P}/21-ground-wiring.jpg`,
  },
  {
    id: 'taos-audio',
    page: 13,
    title: 'TAOS · audio amplifier section',
    group: 'taos',
    src: `${P}/13-taos-audio-amp.jpg`,
  },
  {
    id: 'taos-12v',
    page: 14,
    title: 'TAOS · 12 V power supply',
    group: 'taos',
    src: `${P}/14-taos-12v-supply.jpg`,
  },
  {
    id: 'taos-ticket',
    page: 15,
    title: 'TAOS · ticket dispenser interface',
    group: 'taos',
    src: `${P}/15-taos-ticket-interface.jpg`,
  },
  {
    id: 'taos-psu',
    page: 16,
    title: 'TAOS · backend power supply',
    group: 'taos',
    src: `${P}/16-taos-backend-psu.jpg`,
  },
  {
    id: 'taos-gun',
    page: 17,
    title: 'TAOS · gun optoisolation / selection',
    group: 'taos',
    src: `${P}/17-taos-gun-opto-select.jpg`,
  },
  {
    id: 'taos-lv',
    page: 18,
    title: 'TAOS · low-voltage harness',
    group: 'taos',
    src: `${P}/18-taos-low-voltage-harness.jpg`,
  },
  {
    id: 'taos-ic',
    page: 19,
    title: 'TAOS · interconnect diagram',
    group: 'taos',
    src: `${P}/19-taos-interconnect.jpg`,
  },
  {
    id: 'taos-a',
    page: 22,
    title: 'TAOS · feuille complémentaire A',
    group: 'taos',
    src: `${P}/22-taos-sheet-extra-a.jpg`,
  },
  {
    id: 'taos-b',
    page: 23,
    title: 'TAOS · feuille complémentaire B',
    group: 'taos',
    src: `${P}/23-taos-sheet-extra-b.jpg`,
  },
  {
    id: 'gun-layout',
    page: 26,
    title: 'Gun shot board · component layout',
    group: 'boards',
    src: `${P}/26-gun-shot-board-layout.jpg`,
  },
  {
    id: 'gun-sch',
    page: 27,
    title: 'Gun shot board · schematic',
    group: 'boards',
    src: `${P}/27-gun-shot-board-schematic.jpg`,
  },
  {
    id: 'opto-layout',
    page: 28,
    title: 'Optoisolator board · layout',
    group: 'boards',
    src: `${P}/28-optoisolator-layout.jpg`,
  },
  {
    id: 'opto-sch',
    page: 29,
    title: 'Optoisolator board · schematic',
    group: 'boards',
    src: `${P}/29-optoisolator-schematic.jpg`,
  },
  {
    id: 'audio-sch',
    page: 30,
    title: 'Audio amplifier board · schematic',
    group: 'boards',
    src: `${P}/30-audio-amp-board-schematic.jpg`,
  },
  {
    id: 'asm1',
    page: 1,
    title: 'Field assembly 33″ / 50″ · page 1',
    group: 'assembly',
    src: `${P}/assembly-33-50-p1.jpg`,
  },
  {
    id: 'asm2',
    page: 2,
    title: 'Field assembly 33″ / 50″ · page 2',
    group: 'assembly',
    src: `${P}/assembly-33-50-p2.jpg`,
  },
  {
    id: 'asm3',
    page: 3,
    title: 'Field assembly 33″ / 50″ · page 3',
    group: 'assembly',
    src: `${P}/assembly-33-50-p3.jpg`,
  },
]
