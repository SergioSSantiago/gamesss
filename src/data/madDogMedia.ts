/** Photos / flyers originales (Museum of the Game · Arcade Flyer Archive). */
const P = '/arcade/maddog'

export const MAD_DOG_MEDIA = {
  uprightCrt: `${P}/cab-upright-crt.jpg`,
  environmentalPlayer: `${P}/cab-environmental-player.jpg`,
  marquee: `${P}/marquee.jpg`,
  flyerSpacesaver25: `${P}/flyer-spacesaver-25.jpg`,
  flyerProjection45: `${P}/flyer-projection-45.jpg`,
  flyerPedestal: `${P}/flyer-pedestal-33-50.jpg`,
  flyerJapan: `${P}/flyer-japan-capcom.jpg`,
  flyerWanted: `${P}/flyer-wanted.jpg`,
  maddogIiFront: `${P}/cab-maddog-ii-front.jpg`,
  maddogIiSide: `${P}/cab-maddog-ii-side.jpg`,
} as const

export type MadDogGalleryItem = {
  src: string
  caption: string
  credit: string
}

export const MAD_DOG_GALLERY: MadDogGalleryItem[] = [
  {
    src: MAD_DOG_MEDIA.uprightCrt,
    caption: 'Borne upright CRT · Mad Dog McCree (ALG)',
    credit: 'Museum of the Game / KLOV',
  },
  {
    src: MAD_DOG_MEDIA.flyerSpacesaver25,
    caption: 'Flyer 1992 · Space Saver 25″ (foto de borne + medidas)',
    credit: 'Arcade Flyer Archive',
  },
  {
    src: MAD_DOG_MEDIA.flyerPedestal,
    caption: 'Flyer USA · monitor + pedestal (33″ / 50″ proyección)',
    credit: 'Arcade Flyer Archive',
  },
  {
    src: MAD_DOG_MEDIA.flyerProjection45,
    caption: 'Flyer UK / Atari · proyección trasera 45″ + consola 2 guns',
    credit: 'Arcade Flyer Archive',
  },
  {
    src: MAD_DOG_MEDIA.flyerJapan,
    caption: 'Flyer Japón (Capcom) · borne pantalla grande',
    credit: 'Arcade Flyer Archive',
  },
  {
    src: MAD_DOG_MEDIA.environmentalPlayer,
    caption: 'Setup environmental · pantalla separada + pedestal',
    credit: 'Museum of the Game / KLOV',
  },
  {
    src: MAD_DOG_MEDIA.maddogIiFront,
    caption: 'Mad Dog II: The Lost Gold · upright 2 guns',
    credit: 'Museum of the Game / KLOV',
  },
  {
    src: MAD_DOG_MEDIA.maddogIiSide,
    caption: 'Mad Dog II · vista lateral (holsters + guns)',
    credit: 'Museum of the Game / KLOV',
  },
  {
    src: MAD_DOG_MEDIA.marquee,
    caption: 'Marquee original Mad Dog McCree',
    credit: 'Museum of the Game / KLOV',
  },
  {
    src: MAD_DOG_MEDIA.flyerWanted,
    caption: 'Flyer “Wanted” · promoción operadores (Betson)',
    credit: 'Arcade Flyer Archive',
  },
]
