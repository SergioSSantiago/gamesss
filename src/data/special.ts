/** Rarezas, cultos raros, fracasos míticos y experimentos — IDs Wikidata verificados. */
export type SpecialGame = {
  id: string
  tag: string
}

export const SPECIAL_GAMES: SpecialGame[] = [
  { id: 'Q977919', tag: 'Infame' }, // E.T. Atari
  { id: 'Q745427', tag: 'Malo mítico' }, // Big Rigs
  { id: 'Q2530979', tag: 'Infame' }, // Superman 64
  { id: 'Q865277', tag: 'Objeto de culto' }, // Hong Kong 97
  { id: 'Q1368183', tag: 'CD-i' }, // Hotel Mario
  { id: 'Q1323428', tag: 'Controversia' }, // Night Trap
  { id: 'Q845417', tag: 'Experimental' }, // LSD Dream Emulator
  { id: 'Q2529856', tag: 'Sueño / cult' }, // Yume Nikki
  { id: 'Q1206519', tag: 'Surrealista' }, // Katamari Damacy
  { id: 'Q1757803', tag: 'Minimalista' }, // Vib-Ribbon
  { id: 'Q1340462', tag: 'Ritmo' }, // PaRappa the Rapper
  { id: 'Q7440692', tag: 'Extraño' }, // Seaman
  { id: 'Q1638020', tag: 'Experimental' }, // Noby Noby Boy
  { id: 'Q1324448', tag: 'Obra maestra rara' }, // Ico
  { id: 'Q846051', tag: 'Obra maestra rara' }, // Shadow of the Colossus
  { id: 'Q7766240', tag: 'Meta' }, // The Stanley Parable
  { id: 'Q59618073', tag: 'Viral' }, // Untitled Goose Game
  { id: 'Q42266752', tag: 'Masoquista' }, // Getting Over It
  { id: 'Q62061666', tag: 'Puzzle extremo' }, // Baba Is You
  { id: 'Q14565978', tag: 'Moral' }, // Papers, Please
  { id: 'Q15984890', tag: 'Absurdo' }, // Goat Simulator
  { id: 'Q15707420', tag: 'Viral' }, // Flappy Bird
  { id: 'Q248810', tag: 'Simulación infinita' }, // Dwarf Fortress
  { id: 'Q21039924', tag: 'Indie cult' }, // Undertale
  { id: 'Q1195267', tag: 'Microjuegos' }, // WarioWare Mega Microgames
]

export const SPECIAL_GAME_IDS = SPECIAL_GAMES.map((g) => g.id)

export function specialTag(id: string): string | undefined {
  return SPECIAL_GAMES.find((g) => g.id === id)?.tag
}
