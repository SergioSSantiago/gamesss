import type { Platform } from '../types'

export const PLATFORMS: Platform[] = [
  { id: 'Q172742', slug: 'nes', name: 'Nintendo Entertainment System', shortName: 'NES', manufacturer: 'Nintendo', yearStart: 1983, yearEnd: 2003, type: 'home', generation: 3, aka: ['Famicom'] },
  { id: 'Q135321', slug: 'famicom-disk', name: 'Famicom Disk System', shortName: 'FDS', manufacturer: 'Nintendo', yearStart: 1986, yearEnd: 2003, type: 'home', generation: 3 },
  { id: 'Q183259', slug: 'snes', name: 'Super Nintendo Entertainment System', shortName: 'SNES', manufacturer: 'Nintendo', yearStart: 1990, yearEnd: 2003, type: 'home', generation: 4, aka: ['Super Famicom'] },
  { id: 'Q184839', slug: 'n64', name: 'Nintendo 64', shortName: 'N64', manufacturer: 'Nintendo', yearStart: 1996, yearEnd: 2002, type: 'home', generation: 5 },
  { id: 'Q182172', slug: 'gamecube', name: 'GameCube', shortName: 'GCN', manufacturer: 'Nintendo', yearStart: 2001, yearEnd: 2007, type: 'home', generation: 6 },
  { id: 'Q8079', slug: 'wii', name: 'Wii', shortName: 'Wii', manufacturer: 'Nintendo', yearStart: 2006, yearEnd: 2013, type: 'home', generation: 7 },
  { id: 'Q56942', slug: 'wii-u', name: 'Wii U', shortName: 'Wii U', manufacturer: 'Nintendo', yearStart: 2012, yearEnd: 2017, type: 'home', generation: 8 },
  { id: 'Q19610114', slug: 'switch', name: 'Nintendo Switch', shortName: 'Switch', manufacturer: 'Nintendo', yearStart: 2017, type: 'hybrid', generation: 8 },
  { id: 'Q122761124', slug: 'switch-2', name: 'Nintendo Switch 2', shortName: 'Switch 2', manufacturer: 'Nintendo', yearStart: 2025, type: 'hybrid', generation: 9 },
  { id: 'Q164651', slug: 'virtual-boy', name: 'Virtual Boy', shortName: 'VB', manufacturer: 'Nintendo', yearStart: 1995, yearEnd: 1996, type: 'home', generation: 5 },
  { id: 'Q186437', slug: 'game-boy', name: 'Game Boy', shortName: 'GB', manufacturer: 'Nintendo', yearStart: 1989, yearEnd: 2003, type: 'handheld', generation: 4 },
  { id: 'Q203992', slug: 'game-boy-color', name: 'Game Boy Color', shortName: 'GBC', manufacturer: 'Nintendo', yearStart: 1998, yearEnd: 2003, type: 'handheld', generation: 5 },
  { id: 'Q188642', slug: 'game-boy-advance', name: 'Game Boy Advance', shortName: 'GBA', manufacturer: 'Nintendo', yearStart: 2001, yearEnd: 2010, type: 'handheld', generation: 6 },
  { id: 'Q170323', slug: 'nintendo-ds', name: 'Nintendo DS', shortName: 'DS', manufacturer: 'Nintendo', yearStart: 2004, yearEnd: 2013, type: 'handheld', generation: 7 },
  { id: 'Q637178', slug: 'nintendo-dsi', name: 'Nintendo DSi', shortName: 'DSi', manufacturer: 'Nintendo', yearStart: 2008, yearEnd: 2013, type: 'handheld', generation: 7 },
  { id: 'Q203597', slug: 'nintendo-3ds', name: 'Nintendo 3DS', shortName: '3DS', manufacturer: 'Nintendo', yearStart: 2011, yearEnd: 2020, type: 'handheld', generation: 8 },
  { id: 'Q1759168', slug: 'pokemon-mini', name: 'Pokémon Mini', shortName: 'P Mini', manufacturer: 'Nintendo', yearStart: 2001, yearEnd: 2002, type: 'handheld', generation: 6 },
  { id: 'Q215034', slug: 'game-watch', name: 'Game & Watch', shortName: 'G&W', manufacturer: 'Nintendo', yearStart: 1980, yearEnd: 1991, type: 'handheld', generation: 2 },

  { id: 'Q10677', slug: 'ps1', name: 'PlayStation', shortName: 'PS1', manufacturer: 'Sony', yearStart: 1994, yearEnd: 2006, type: 'home', generation: 5 },
  { id: 'Q10680', slug: 'ps2', name: 'PlayStation 2', shortName: 'PS2', manufacturer: 'Sony', yearStart: 2000, yearEnd: 2013, type: 'home', generation: 6 },
  { id: 'Q10683', slug: 'ps3', name: 'PlayStation 3', shortName: 'PS3', manufacturer: 'Sony', yearStart: 2006, yearEnd: 2017, type: 'home', generation: 7 },
  { id: 'Q5014725', slug: 'ps4', name: 'PlayStation 4', shortName: 'PS4', manufacturer: 'Sony', yearStart: 2013, type: 'home', generation: 8 },
  { id: 'Q63184502', slug: 'ps5', name: 'PlayStation 5', shortName: 'PS5', manufacturer: 'Sony', yearStart: 2020, type: 'home', generation: 9 },
  { id: 'Q170325', slug: 'psp', name: 'PlayStation Portable', shortName: 'PSP', manufacturer: 'Sony', yearStart: 2004, yearEnd: 2014, type: 'handheld', generation: 7 },
  { id: 'Q188808', slug: 'vita', name: 'PlayStation Vita', shortName: 'Vita', manufacturer: 'Sony', yearStart: 2011, yearEnd: 2019, type: 'handheld', generation: 8 },
  { id: 'Q16011703', slug: 'psvr', name: 'PlayStation VR', shortName: 'PSVR', manufacturer: 'Sony', yearStart: 2016, yearEnd: 2023, type: 'vr', generation: 8 },
  { id: 'Q107944338', slug: 'psvr2', name: 'PlayStation VR2', shortName: 'PSVR2', manufacturer: 'Sony', yearStart: 2023, type: 'vr', generation: 9 },

  { id: 'Q132020', slug: 'xbox', name: 'Xbox', shortName: 'Xbox', manufacturer: 'Microsoft', yearStart: 2001, yearEnd: 2009, type: 'home', generation: 6 },
  { id: 'Q48263', slug: 'xbox-360', name: 'Xbox 360', shortName: '360', manufacturer: 'Microsoft', yearStart: 2005, yearEnd: 2016, type: 'home', generation: 7 },
  { id: 'Q13361286', slug: 'xbox-one', name: 'Xbox One', shortName: 'XB1', manufacturer: 'Microsoft', yearStart: 2013, type: 'home', generation: 8 },
  { id: 'Q98973368', slug: 'xbox-series', name: 'Xbox Series X/S', shortName: 'Series X/S', manufacturer: 'Microsoft', yearStart: 2020, type: 'home', generation: 9 },
  { id: 'Q1406', slug: 'windows', name: 'Microsoft Windows', shortName: 'PC', manufacturer: 'Microsoft', yearStart: 1985, type: 'computer' },
  { id: 'Q47604', slug: 'ms-dos', name: 'MS-DOS', shortName: 'DOS', manufacturer: 'Microsoft', yearStart: 1981, yearEnd: 2000, type: 'computer' },

  { id: 'Q337535', slug: 'steam', name: 'Steam', shortName: 'Steam', manufacturer: 'Valve', yearStart: 2003, type: 'computer' },
  { id: 'Q107542665', slug: 'steam-deck', name: 'Steam Deck', shortName: 'Deck', manufacturer: 'Valve', yearStart: 2022, type: 'hybrid' },

  { id: 'Q1136956', slug: 'sg-1000', name: 'SG-1000', shortName: 'SG-1000', manufacturer: 'Sega', yearStart: 1983, yearEnd: 1985, type: 'home', generation: 3 },
  { id: 'Q209868', slug: 'master-system', name: 'Master System', shortName: 'SMS', manufacturer: 'Sega', yearStart: 1985, yearEnd: 1996, type: 'home', generation: 3 },
  { id: 'Q10676', slug: 'mega-drive', name: 'Mega Drive / Genesis', shortName: 'MD', manufacturer: 'Sega', yearStart: 1988, yearEnd: 1997, type: 'home', generation: 4, aka: ['Genesis'] },
  { id: 'Q1047516', slug: 'sega-cd', name: 'Sega CD / Mega-CD', shortName: 'Mega-CD', manufacturer: 'Sega', yearStart: 1991, yearEnd: 1996, type: 'home', generation: 4 },
  { id: 'Q1063978', slug: 'sega-32x', name: 'Sega 32X', shortName: '32X', manufacturer: 'Sega', yearStart: 1994, yearEnd: 1996, type: 'home', generation: 4 },
  { id: 'Q200912', slug: 'saturn', name: 'Sega Saturn', shortName: 'Saturn', manufacturer: 'Sega', yearStart: 1994, yearEnd: 2000, type: 'home', generation: 5 },
  { id: 'Q184198', slug: 'dreamcast', name: 'Dreamcast', shortName: 'DC', manufacturer: 'Sega', yearStart: 1998, yearEnd: 2001, type: 'home', generation: 6 },
  { id: 'Q751719', slug: 'game-gear', name: 'Game Gear', shortName: 'GG', manufacturer: 'Sega', yearStart: 1990, yearEnd: 1997, type: 'handheld', generation: 4 },
  { id: 'Q540868', slug: 'nomad', name: 'Sega Nomad', shortName: 'Nomad', manufacturer: 'Sega', yearStart: 1995, yearEnd: 1999, type: 'handheld', generation: 4 },

  { id: 'Q206261', slug: 'atari-2600', name: 'Atari 2600', shortName: '2600', manufacturer: 'Atari', yearStart: 1977, yearEnd: 1992, type: 'home', generation: 2 },
  { id: 'Q743222', slug: 'atari-5200', name: 'Atari 5200', shortName: '5200', manufacturer: 'Atari', yearStart: 1982, yearEnd: 1984, type: 'home', generation: 2 },
  { id: 'Q753600', slug: 'atari-7800', name: 'Atari 7800', shortName: '7800', manufacturer: 'Atari', yearStart: 1986, yearEnd: 1992, type: 'home', generation: 3 },
  { id: 'Q650601', slug: 'jaguar', name: 'Atari Jaguar', shortName: 'Jaguar', manufacturer: 'Atari', yearStart: 1993, yearEnd: 1996, type: 'home', generation: 5 },
  { id: 'Q753657', slug: 'lynx', name: 'Atari Lynx', shortName: 'Lynx', manufacturer: 'Atari', yearStart: 1989, yearEnd: 1995, type: 'handheld', generation: 4 },
  { id: 'Q249075', slug: 'atari-8bit', name: 'Atari 8-bit', shortName: 'Atari 8-bit', manufacturer: 'Atari', yearStart: 1979, yearEnd: 1992, type: 'computer' },
  { id: 'Q627302', slug: 'atari-st', name: 'Atari ST', shortName: 'ST', manufacturer: 'Atari', yearStart: 1985, yearEnd: 1993, type: 'computer' },

  { id: 'Q1057377', slug: 'pc-engine', name: 'PC Engine / TurboGrafx-16', shortName: 'PCE', manufacturer: 'NEC', yearStart: 1987, yearEnd: 1994, type: 'home', generation: 4, aka: ['TurboGrafx-16'] },
  { id: 'Q202375', slug: 'supergrafx', name: 'PC Engine SuperGrafx', shortName: 'SGX', manufacturer: 'NEC', yearStart: 1989, yearEnd: 1990, type: 'home', generation: 4 },
  { id: 'Q1136902', slug: 'pc-fx', name: 'PC-FX', shortName: 'PC-FX', manufacturer: 'NEC', yearStart: 1994, yearEnd: 1998, type: 'home', generation: 5 },
  { id: 'Q183505', slug: 'pc-98', name: 'NEC PC-98', shortName: 'PC-98', manufacturer: 'NEC', yearStart: 1982, yearEnd: 2003, type: 'computer' },

  { id: 'Q1054350', slug: 'neo-geo', name: 'Neo Geo', shortName: 'AES', manufacturer: 'SNK', yearStart: 1990, yearEnd: 2004, type: 'home', generation: 4 },
  { id: 'Q2703883', slug: 'neo-geo-cd', name: 'Neo Geo CD', shortName: 'NGCD', manufacturer: 'SNK', yearStart: 1994, yearEnd: 1997, type: 'home', generation: 4 },
  { id: 'Q939881', slug: 'neo-geo-pocket', name: 'Neo Geo Pocket', shortName: 'NGP', manufacturer: 'SNK', yearStart: 1998, yearEnd: 1999, type: 'handheld', generation: 5 },
  { id: 'Q1977455', slug: 'neo-geo-pocket-color', name: 'Neo Geo Pocket Color', shortName: 'NGPC', manufacturer: 'SNK', yearStart: 1999, yearEnd: 2001, type: 'handheld', generation: 5 },

  { id: 'Q229429', slug: '3do', name: '3DO Interactive Multiplayer', shortName: '3DO', manufacturer: '3DO', yearStart: 1993, yearEnd: 1996, type: 'home', generation: 5 },
  { id: 'Q1023103', slug: 'cd-i', name: 'Philips CD-i', shortName: 'CD-i', manufacturer: 'Philips', yearStart: 1991, yearEnd: 1998, type: 'home', generation: 4 },
  { id: 'Q695161', slug: 'amiga-cd32', name: 'Amiga CD32', shortName: 'CD32', manufacturer: 'Commodore', yearStart: 1993, yearEnd: 1994, type: 'home', generation: 5 },
  { id: 'Q744987', slug: 'odyssey', name: 'Magnavox Odyssey', shortName: 'Odyssey', manufacturer: 'Magnavox', yearStart: 1972, yearEnd: 1975, type: 'home', generation: 1 },
  { id: 'Q1053294', slug: 'channel-f', name: 'Fairchild Channel F', shortName: 'Channel F', manufacturer: 'Fairchild', yearStart: 1976, yearEnd: 1983, type: 'home', generation: 2 },
  { id: 'Q1061441', slug: 'intellivision', name: 'Intellivision', shortName: 'INTV', manufacturer: 'Mattel', yearStart: 1979, yearEnd: 1990, type: 'home', generation: 2 },
  { id: 'Q1046862', slug: 'colecovision', name: 'ColecoVision', shortName: 'CV', manufacturer: 'Coleco', yearStart: 1982, yearEnd: 1985, type: 'home', generation: 2 },
  { id: 'Q576932', slug: 'odyssey-2', name: 'Odyssey²', shortName: 'O²', manufacturer: 'Magnavox', yearStart: 1978, yearEnd: 1984, type: 'home', generation: 2 },
  { id: 'Q767631', slug: 'vectrex', name: 'Vectrex', shortName: 'Vectrex', manufacturer: 'GCE', yearStart: 1982, yearEnd: 1984, type: 'home', generation: 2 },

  { id: 'Q100047', slug: 'amiga', name: 'Commodore Amiga', shortName: 'Amiga', manufacturer: 'Commodore', yearStart: 1985, yearEnd: 1996, type: 'computer' },
  { id: 'Q99775', slug: 'c64', name: 'Commodore 64', shortName: 'C64', manufacturer: 'Commodore', yearStart: 1982, yearEnd: 1994, type: 'computer' },
  { id: 'Q23882', slug: 'zx-spectrum', name: 'ZX Spectrum', shortName: 'Spectrum', manufacturer: 'Sinclair', yearStart: 1982, yearEnd: 1992, type: 'computer' },
  { id: 'Q478829', slug: 'amstrad-cpc', name: 'Amstrad CPC', shortName: 'CPC', manufacturer: 'Amstrad', yearStart: 1984, yearEnd: 1990, type: 'computer' },
  { id: 'Q853547', slug: 'msx', name: 'MSX', shortName: 'MSX', manufacturer: 'ASCII / Microsoft', yearStart: 1983, yearEnd: 1996, type: 'computer' },
  { id: 'Q3017175', slug: 'apple-ii', name: 'Apple II', shortName: 'Apple II', manufacturer: 'Apple', yearStart: 1977, yearEnd: 1993, type: 'computer' },
  { id: 'Q13522376', slug: 'mac-classic', name: 'Classic Mac OS', shortName: 'Mac', manufacturer: 'Apple', yearStart: 1984, yearEnd: 2001, type: 'computer' },
  { id: 'Q14116', slug: 'macos', name: 'macOS', shortName: 'macOS', manufacturer: 'Apple', yearStart: 2001, type: 'computer' },
  { id: 'Q388', slug: 'linux', name: 'Linux', shortName: 'Linux', manufacturer: 'Comunidad', yearStart: 1991, type: 'computer' },
  { id: 'Q1758277', slug: 'x68000', name: 'Sharp X68000', shortName: 'X68k', manufacturer: 'Sharp', yearStart: 1987, yearEnd: 1993, type: 'computer' },
  { id: 'Q531896', slug: 'fm-towns', name: 'FM Towns', shortName: 'FM Towns', manufacturer: 'Fujitsu', yearStart: 1989, yearEnd: 1997, type: 'computer' },

  { id: 'Q1065792', slug: 'wonderswan', name: 'WonderSwan', shortName: 'WS', manufacturer: 'Bandai', yearStart: 1999, yearEnd: 2003, type: 'handheld', generation: 5 },
  { id: 'Q1048035', slug: 'wonderswan-color', name: 'WonderSwan Color', shortName: 'WSC', manufacturer: 'Bandai', yearStart: 2000, yearEnd: 2003, type: 'handheld', generation: 6 },
  { id: 'Q336434', slug: 'n-gage', name: 'N-Gage', shortName: 'N-Gage', manufacturer: 'Nokia', yearStart: 2003, yearEnd: 2006, type: 'handheld', generation: 6 },
  { id: 'Q426119', slug: 'gp32', name: 'GP32', shortName: 'GP32', manufacturer: 'GamePark', yearStart: 2001, yearEnd: 2005, type: 'handheld', generation: 6 },
  { id: 'Q909005', slug: 'gizmondo', name: 'Gizmondo', shortName: 'Gizmondo', manufacturer: 'Tiger Telematics', yearStart: 2005, yearEnd: 2006, type: 'handheld', generation: 7 },
  { id: 'Q523532', slug: 'tapwave-zodiac', name: 'Tapwave Zodiac', shortName: 'Zodiac', manufacturer: 'Tapwave', yearStart: 2003, yearEnd: 2005, type: 'handheld', generation: 6 },

  { id: 'Q15015195', slug: 'pippin', name: 'Apple Pippin', shortName: 'Pippin', manufacturer: 'Apple', yearStart: 1996, yearEnd: 1997, type: 'home', generation: 5 },
  { id: 'Q661952', slug: 'casio-loopy', name: 'Casio Loopy', shortName: 'Loopy', manufacturer: 'Casio', yearStart: 1995, yearEnd: 1996, type: 'home', generation: 5 },
  { id: 'Q2475188', slug: 'super-acan', name: 'Super A\'Can', shortName: 'A\'Can', manufacturer: 'Funtech', yearStart: 1995, yearEnd: 1996, type: 'home', generation: 5 },
  { id: 'Q981935', slug: 'gx4000', name: 'Amstrad GX4000', shortName: 'GX4000', manufacturer: 'Amstrad', yearStart: 1990, yearEnd: 1991, type: 'home', generation: 4 },
  { id: 'Q184372', slug: 'zeebo', name: 'Zeebo', shortName: 'Zeebo', manufacturer: 'Zeebo Inc.', yearStart: 2009, yearEnd: 2011, type: 'home', generation: 7 },
  { id: 'Q1391641', slug: 'ouya', name: 'Ouya', shortName: 'Ouya', manufacturer: 'Ouya Inc.', yearStart: 2013, yearEnd: 2015, type: 'home', generation: 8 },

  { id: 'Q192851', slug: 'arcade', name: 'Arcade', shortName: 'Arcade', manufacturer: 'Varios', yearStart: 1971, type: 'arcade' },
  { id: 'Q48493', slug: 'ios', name: 'iOS', shortName: 'iOS', manufacturer: 'Apple', yearStart: 2007, type: 'mobile' },
  { id: 'Q94', slug: 'android', name: 'Android', shortName: 'Android', manufacturer: 'Google', yearStart: 2008, type: 'mobile' },
  { id: 'Q63777286', slug: 'quest', name: 'Meta Quest', shortName: 'Quest', manufacturer: 'Meta', yearStart: 2019, type: 'vr' },
  { id: 'Q60309635', slug: 'stadia', name: 'Google Stadia', shortName: 'Stadia', manufacturer: 'Google', yearStart: 2019, yearEnd: 2023, type: 'cloud' },
  { id: 'Q28133964', slug: 'geforce-now', name: 'GeForce Now', shortName: 'GFN', manufacturer: 'NVIDIA', yearStart: 2015, type: 'cloud' },
  { id: 'Q99582374', slug: 'luna', name: 'Amazon Luna', shortName: 'Luna', manufacturer: 'Amazon', yearStart: 2020, type: 'cloud' },
]

export const MANUFACTURER_ORDER = [
  'Nintendo',
  'Sony',
  'Microsoft',
  'Sega',
  'Atari',
  'NEC',
  'SNK',
  'Commodore',
  'Apple',
  'Valve',
  'Google',
  'Meta',
  'Bandai',
  'Philips',
  'Mattel',
  'Coleco',
  'Magnavox',
  'Varios',
]

export function platformById(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id)
}

export function platformBySlug(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug)
}

export function platformsByManufacturer(): { manufacturer: string; platforms: Platform[] }[] {
  const groups = new Map<string, Platform[]>()
  for (const p of PLATFORMS) {
    const list = groups.get(p.manufacturer) ?? []
    list.push(p)
    groups.set(p.manufacturer, list)
  }
  const known = MANUFACTURER_ORDER.filter((m) => groups.has(m)).map((m) => ({
    manufacturer: m,
    platforms: groups.get(m)!,
  }))
  const extra = [...groups.keys()]
    .filter((m) => !MANUFACTURER_ORDER.includes(m))
    .sort()
    .map((m) => ({ manufacturer: m, platforms: groups.get(m)! }))
  return [...known, ...extra]
}
