import { commons } from '../lib/commons'
import type { Platform, PlatformType } from '../types'

type Draft = {
  id: string
  slug: string
  name: string
  shortName: string
  manufacturer: string
  yearStart: number
  yearEnd?: number
  type: PlatformType
  generation?: number
  aka?: string[]
  file: string
  family: string
  variant?: string
  gamesId?: string
}

function make(d: Draft): Platform {
  const { file, gamesId, ...rest } = d
  return { ...rest, image: commons(file), gamesId: gamesId ?? d.id }
}

export const PLATFORMS: Platform[] = [
  // Nintendo home
  make({ id: 'Q491640', slug: 'famicom', name: 'Family Computer', shortName: 'Famicom', manufacturer: 'Nintendo', yearStart: 1983, yearEnd: 2003, type: 'home', generation: 3, family: 'nes', variant: 'Famicom', file: 'Nintendo-Famicom-Console-Set.jpg', gamesId: 'Q172742' }),
  make({ id: 'Q172742', slug: 'nes', name: 'Nintendo Entertainment System', shortName: 'NES', manufacturer: 'Nintendo', yearStart: 1985, yearEnd: 1995, type: 'home', generation: 3, family: 'nes', variant: 'NES (USA/EU)', file: 'NES-Console-Set.png' }),
  make({ id: 'Q135321', slug: 'famicom-disk', name: 'Famicom Disk System', shortName: 'FDS', manufacturer: 'Nintendo', yearStart: 1986, yearEnd: 2003, type: 'home', generation: 3, family: 'nes', variant: 'Disk System', file: 'Nintendo-Famicom-Disk-System.png', gamesId: 'Q135321' }),
  make({ id: 'local:snes-jp', slug: 'super-famicom', name: 'Super Famicom', shortName: 'SFC', manufacturer: 'Nintendo', yearStart: 1990, yearEnd: 2003, type: 'home', generation: 4, family: 'snes', variant: 'Super Famicom', file: 'Nintendo-Super-Famicom-Set-FL.jpg', gamesId: 'Q183259' }),
  make({ id: 'Q183259', slug: 'snes', name: 'Super Nintendo Entertainment System', shortName: 'SNES', manufacturer: 'Nintendo', yearStart: 1991, yearEnd: 1999, type: 'home', generation: 4, family: 'snes', variant: 'SNES (USA/EU)', file: 'SNES-Mod1-Console-Set.png' }),
  make({ id: 'Q184839', slug: 'n64', name: 'Nintendo 64', shortName: 'N64', manufacturer: 'Nintendo', yearStart: 1996, yearEnd: 2002, type: 'home', generation: 5, family: 'n64', file: 'Nintendo-64-wController-L.jpg' }),
  make({ id: 'Q226941', slug: 'n64dd', name: 'Nintendo 64DD', shortName: '64DD', manufacturer: 'Nintendo', yearStart: 1999, yearEnd: 2001, type: 'home', generation: 5, family: 'n64', variant: '64DD', file: 'Nintendo-64DD-Set.jpg', gamesId: 'Q184839' }),
  make({ id: 'Q182172', slug: 'gamecube', name: 'GameCube', shortName: 'GCN', manufacturer: 'Nintendo', yearStart: 2001, yearEnd: 2007, type: 'home', generation: 6, family: 'gamecube', variant: 'DOL-001', file: 'GameCube-Console-Set.png' }),
  make({ id: 'Q1192887', slug: 'panasonic-q', name: 'Panasonic Q', shortName: 'Q', manufacturer: 'Nintendo', yearStart: 2001, yearEnd: 2003, type: 'home', generation: 6, family: 'gamecube', variant: 'Panasonic Q', file: 'Panasonic-Q-Console-FL.jpg', gamesId: 'Q182172' }),
  make({ id: 'Q8079', slug: 'wii', name: 'Wii', shortName: 'Wii', manufacturer: 'Nintendo', yearStart: 2006, yearEnd: 2013, type: 'home', generation: 7, family: 'wii', variant: 'Original', file: 'Wii-Console.png' }),
  make({ id: 'Q15726658', slug: 'wii-mini', name: 'Wii Mini', shortName: 'Wii Mini', manufacturer: 'Nintendo', yearStart: 2012, yearEnd: 2017, type: 'home', generation: 7, family: 'wii', variant: 'Mini', file: 'Wii-Mini-Console-Set-H.jpg', gamesId: 'Q8079' }),
  make({ id: 'Q56942', slug: 'wii-u', name: 'Wii U', shortName: 'Wii U', manufacturer: 'Nintendo', yearStart: 2012, yearEnd: 2017, type: 'home', generation: 8, family: 'wii-u', file: 'Wii_U_Console_and_Gamepad.png' }),
  make({ id: 'Q19610114', slug: 'switch', name: 'Nintendo Switch', shortName: 'Switch', manufacturer: 'Nintendo', yearStart: 2017, type: 'hybrid', generation: 8, family: 'switch', variant: 'HAC-001', file: 'Nintendo-Switch-wJoyCons-BlRd-Standing-FL.png' }),
  make({ id: 'Q65090004', slug: 'switch-lite', name: 'Nintendo Switch Lite', shortName: 'Lite', manufacturer: 'Nintendo', yearStart: 2019, type: 'handheld', generation: 8, family: 'switch', variant: 'Lite', file: 'Nintendo Switch Lite representation.png', gamesId: 'Q19610114' }),
  make({ id: 'Q108303764', slug: 'switch-oled', name: 'Nintendo Switch OLED', shortName: 'OLED', manufacturer: 'Nintendo', yearStart: 2021, type: 'hybrid', generation: 8, family: 'switch', variant: 'OLED', file: 'Nintendo Switch – OLED-Modell mit gedockter Konsole 20230506 HOF01624 RAW-Export.png', gamesId: 'Q19610114' }),
  make({ id: 'Q122761124', slug: 'switch-2', name: 'Nintendo Switch 2', shortName: 'Switch 2', manufacturer: 'Nintendo', yearStart: 2025, type: 'hybrid', generation: 9, family: 'switch-2', file: 'Nintendo_Switch_2_and_Joy-Con_2.jpg' }),
  make({ id: 'Q164651', slug: 'virtual-boy', name: 'Virtual Boy', shortName: 'VB', manufacturer: 'Nintendo', yearStart: 1995, yearEnd: 1996, type: 'home', generation: 5, family: 'virtual-boy', file: 'Virtual-Boy-Set.png' }),

  // Nintendo handheld
  make({ id: 'Q186437', slug: 'game-boy', name: 'Game Boy', shortName: 'GB', manufacturer: 'Nintendo', yearStart: 1989, yearEnd: 2003, type: 'handheld', generation: 4, family: 'game-boy', variant: 'Original (DMG)', file: 'Game-Boy-FL.png' }),
  make({ id: 'Q1054001', slug: 'game-boy-pocket', name: 'Game Boy Pocket', shortName: 'GBP', manufacturer: 'Nintendo', yearStart: 1996, yearEnd: 2003, type: 'handheld', generation: 4, family: 'game-boy', variant: 'Pocket', file: 'Game-Boy-Pocket-FL.jpg', gamesId: 'Q186437' }),
  make({ id: 'Q1140738', slug: 'game-boy-light', name: 'Game Boy Light', shortName: 'GBL', manufacturer: 'Nintendo', yearStart: 1998, yearEnd: 2003, type: 'handheld', generation: 4, family: 'game-boy', variant: 'Light', file: 'Game-Boy-Light-FL.jpg', gamesId: 'Q186437' }),
  make({ id: 'Q203992', slug: 'game-boy-color', name: 'Game Boy Color', shortName: 'GBC', manufacturer: 'Nintendo', yearStart: 1998, yearEnd: 2003, type: 'handheld', generation: 5, family: 'gbc', file: 'Nintendo-Game-Boy-Color-FL.png' }),
  make({ id: 'Q188642', slug: 'game-boy-advance', name: 'Game Boy Advance', shortName: 'GBA', manufacturer: 'Nintendo', yearStart: 2001, yearEnd: 2010, type: 'handheld', generation: 6, family: 'gba', variant: 'AGS original', file: 'Nintendo-Game-Boy-Advance-Purple-FL.png' }),
  make({ id: 'Q2270475', slug: 'gba-sp', name: 'Game Boy Advance SP', shortName: 'GBA SP', manufacturer: 'Nintendo', yearStart: 2003, yearEnd: 2010, type: 'handheld', generation: 6, family: 'gba', variant: 'SP', file: 'Game-Boy-Advance-SP-Mk1-Blue.png', gamesId: 'Q188642' }),
  make({ id: 'Q1140654', slug: 'game-boy-micro', name: 'Game Boy Micro', shortName: 'Micro', manufacturer: 'Nintendo', yearStart: 2005, yearEnd: 2010, type: 'handheld', generation: 6, family: 'gba', variant: 'Micro', file: 'Game-Boy-Micro.png', gamesId: 'Q188642' }),
  make({ id: 'Q170323', slug: 'nintendo-ds', name: 'Nintendo DS', shortName: 'DS', manufacturer: 'Nintendo', yearStart: 2004, yearEnd: 2013, type: 'handheld', generation: 7, family: 'ds', variant: 'Original (Phat)', file: 'Nintendo-DS-Fat-Blue.png' }),
  make({ id: 'Q244489', slug: 'ds-lite', name: 'Nintendo DS Lite', shortName: 'DS Lite', manufacturer: 'Nintendo', yearStart: 2006, yearEnd: 2013, type: 'handheld', generation: 7, family: 'ds', variant: 'Lite', file: 'Nintendo-DS-Lite-Black-Open.jpg', gamesId: 'Q170323' }),
  make({ id: 'Q637178', slug: 'nintendo-dsi', name: 'Nintendo DSi', shortName: 'DSi', manufacturer: 'Nintendo', yearStart: 2008, yearEnd: 2013, type: 'handheld', generation: 7, family: 'ds', variant: 'DSi', file: 'Nintendo-DSi-Bl-Open.png', gamesId: 'Q170323' }),
  make({ id: 'Q1054305', slug: 'dsi-xl', name: 'Nintendo DSi XL', shortName: 'DSi XL', manufacturer: 'Nintendo', yearStart: 2009, yearEnd: 2013, type: 'handheld', generation: 7, family: 'ds', variant: 'DSi XL', file: 'Nintendo-DSi-XL-Wine-Red-Open.jpg', gamesId: 'Q170323' }),
  make({ id: 'Q203597', slug: 'nintendo-3ds', name: 'Nintendo 3DS', shortName: '3DS', manufacturer: 'Nintendo', yearStart: 2011, yearEnd: 2020, type: 'handheld', generation: 8, family: '3ds', variant: 'Original', file: 'Nintendo-3DS-AquaOpen.png' }),
  make({ id: 'Q4019308', slug: '3ds-xl', name: 'Nintendo 3DS XL', shortName: '3DS XL', manufacturer: 'Nintendo', yearStart: 2012, yearEnd: 2020, type: 'handheld', generation: 8, family: '3ds', variant: 'XL', file: 'Nintendo-3DS-XL-Red-Open.jpg', gamesId: 'Q203597' }),
  make({ id: 'Q1140275', slug: '2ds', name: 'Nintendo 2DS', shortName: '2DS', manufacturer: 'Nintendo', yearStart: 2013, yearEnd: 2020, type: 'handheld', generation: 8, family: '3ds', variant: '2DS', file: 'Nintendo-2DS-angle.png', gamesId: 'Q203597' }),
  make({ id: 'Q15972507', slug: 'new-3ds', name: 'New Nintendo 3DS', shortName: 'New 3DS', manufacturer: 'Nintendo', yearStart: 2014, yearEnd: 2020, type: 'handheld', generation: 8, family: '3ds', variant: 'New 3DS', file: 'New_Nintendo_3DS.png', gamesId: 'Q203597' }),
  make({ id: 'Q18643715', slug: 'new-3ds-xl', name: 'New Nintendo 3DS XL', shortName: 'New 3DS XL', manufacturer: 'Nintendo', yearStart: 2014, yearEnd: 2020, type: 'handheld', generation: 8, family: '3ds', variant: 'New 3DS XL', file: 'New-Nintendo-3DS-XL-Black-FL.jpg', gamesId: 'Q203597' }),
  make({ id: 'Q26883157', slug: 'new-2ds-xl', name: 'New Nintendo 2DS XL', shortName: 'New 2DS XL', manufacturer: 'Nintendo', yearStart: 2017, yearEnd: 2020, type: 'handheld', generation: 8, family: '3ds', variant: 'New 2DS XL', file: 'New_Nintendo_2DS_LL_(White_&_Orange).png', gamesId: 'Q203597' }),
  make({ id: 'Q1759168', slug: 'pokemon-mini', name: 'Pokémon Mini', shortName: 'P Mini', manufacturer: 'Nintendo', yearStart: 2001, yearEnd: 2002, type: 'handheld', generation: 6, family: 'pokemon-mini', file: 'Pokemon_mini.png' }),
  make({ id: 'Q215034', slug: 'game-watch', name: 'Game & Watch', shortName: 'G&W', manufacturer: 'Nintendo', yearStart: 1980, yearEnd: 1991, type: 'handheld', generation: 2, family: 'game-watch', file: 'Game-and-Watch-Ball.jpg' }),

  // Sony
  make({ id: 'Q10677', slug: 'ps1', name: 'PlayStation', shortName: 'PS1', manufacturer: 'Sony', yearStart: 1994, yearEnd: 2006, type: 'home', generation: 5, family: 'ps1', variant: 'SCPH-1000', file: 'PlayStation-SCPH-1000-with-Controller.jpg' }),
  make({ id: 'Q10678', slug: 'psone', name: 'PSone', shortName: 'PSone', manufacturer: 'Sony', yearStart: 2000, yearEnd: 2006, type: 'home', generation: 5, family: 'ps1', variant: 'PSone', file: 'PSone-Console-Set-NoLCD.png', gamesId: 'Q10677' }),
  make({ id: 'Q10680', slug: 'ps2', name: 'PlayStation 2', shortName: 'PS2', manufacturer: 'Sony', yearStart: 2000, yearEnd: 2013, type: 'home', generation: 6, family: 'ps2', variant: 'Fat (SCPH-30000)', file: 'PS2-Fat-Console-Set.png' }),
  make({ id: 'local:ps2-slim', slug: 'ps2-slim', name: 'PlayStation 2 Slim', shortName: 'PS2 Slim', manufacturer: 'Sony', yearStart: 2004, yearEnd: 2013, type: 'home', generation: 6, family: 'ps2', variant: 'Slim', file: 'PS2-Slim-Console-Set.png', gamesId: 'Q10680' }),
  make({ id: 'Q10683', slug: 'ps3', name: 'PlayStation 3', shortName: 'PS3', manufacturer: 'Sony', yearStart: 2006, yearEnd: 2017, type: 'home', generation: 7, family: 'ps3', variant: 'Fat (CECH)', file: 'Sony-PlayStation-3-CECHA01-wController-L.jpg' }),
  make({ id: 'local:ps3-slim', slug: 'ps3-slim', name: 'PlayStation 3 Slim', shortName: 'PS3 Slim', manufacturer: 'Sony', yearStart: 2009, yearEnd: 2017, type: 'home', generation: 7, family: 'ps3', variant: 'Slim', file: 'Sony-PlayStation-3-Slim-Console-US.jpg', gamesId: 'Q10683' }),
  make({ id: 'local:ps3-super-slim', slug: 'ps3-super-slim', name: 'PlayStation 3 Super Slim', shortName: 'PS3 SS', manufacturer: 'Sony', yearStart: 2012, yearEnd: 2017, type: 'home', generation: 7, family: 'ps3', variant: 'Super Slim', file: 'Sony-PlayStation-3-Super-Slim-Console.jpg', gamesId: 'Q10683' }),
  make({ id: 'Q5014725', slug: 'ps4', name: 'PlayStation 4', shortName: 'PS4', manufacturer: 'Sony', yearStart: 2013, type: 'home', generation: 8, family: 'ps4', variant: 'Original (CUH-10)', file: 'PS4-Console-wDS4.jpg' }),
  make({ id: 'local:ps4-slim', slug: 'ps4-slim', name: 'PlayStation 4 Slim', shortName: 'PS4 Slim', manufacturer: 'Sony', yearStart: 2016, type: 'home', generation: 8, family: 'ps4', variant: 'Slim', file: 'PS4-Slim-Console.jpg', gamesId: 'Q5014725' }),
  make({ id: 'Q20797322', slug: 'ps4-pro', name: 'PlayStation 4 Pro', shortName: 'PS4 Pro', manufacturer: 'Sony', yearStart: 2016, type: 'home', generation: 8, family: 'ps4', variant: 'Pro', file: 'Sony-PlayStation4-Pro-Console-FL.png', gamesId: 'Q5014725' }),
  make({ id: 'Q63184502', slug: 'ps5', name: 'PlayStation 5', shortName: 'PS5', manufacturer: 'Sony', yearStart: 2020, type: 'home', generation: 9, family: 'ps5', variant: 'Original (disco)', file: 'Black_and_white_Playstation_5_base_edition_with_controller.png' }),
  make({ id: 'local:ps5-digital', slug: 'ps5-digital', name: 'PlayStation 5 Digital Edition', shortName: 'PS5 Digital', manufacturer: 'Sony', yearStart: 2020, type: 'home', generation: 9, family: 'ps5', variant: 'Digital', file: 'PlayStation-5-Digital-Edition.png', gamesId: 'Q63184502' }),
  make({ id: 'local:ps5-slim', slug: 'ps5-slim', name: 'PlayStation 5 Slim', shortName: 'PS5 Slim', manufacturer: 'Sony', yearStart: 2023, type: 'home', generation: 9, family: 'ps5', variant: 'Slim', file: 'PlayStation_5_Slim.png', gamesId: 'Q63184502' }),
  make({ id: 'Q130461008', slug: 'ps5-pro', name: 'PlayStation 5 Pro', shortName: 'PS5 Pro', manufacturer: 'Sony', yearStart: 2024, type: 'home', generation: 9, family: 'ps5', variant: 'Pro', file: 'PlayStation 5 Pro no disc drive.jpg', gamesId: 'Q63184502' }),
  make({ id: 'Q170325', slug: 'psp', name: 'PlayStation Portable', shortName: 'PSP-1000', manufacturer: 'Sony', yearStart: 2004, yearEnd: 2014, type: 'handheld', generation: 7, family: 'psp', variant: 'PSP-1000', file: 'PSP-1000.png' }),
  make({ id: 'local:psp-2000', slug: 'psp-2000', name: 'PSP Slim & Lite', shortName: 'PSP-2000', manufacturer: 'Sony', yearStart: 2007, yearEnd: 2014, type: 'handheld', generation: 7, family: 'psp', variant: 'PSP-2000', file: 'PSP-2000.png', gamesId: 'Q170325' }),
  make({ id: 'local:psp-3000', slug: 'psp-3000', name: 'PSP-3000', shortName: 'PSP-3000', manufacturer: 'Sony', yearStart: 2008, yearEnd: 2014, type: 'handheld', generation: 7, family: 'psp', variant: 'PSP-3000', file: 'PSP-3000.png', gamesId: 'Q170325' }),
  make({ id: 'Q1070132', slug: 'psp-go', name: 'PSP Go', shortName: 'PSP Go', manufacturer: 'Sony', yearStart: 2009, yearEnd: 2011, type: 'handheld', generation: 7, family: 'psp', variant: 'Go', file: 'PSP-Go-FL-Open.jpg', gamesId: 'Q170325' }),
  make({ id: 'local:psp-e1000', slug: 'psp-street', name: 'PSP Street', shortName: 'E-1000', manufacturer: 'Sony', yearStart: 2011, yearEnd: 2014, type: 'handheld', generation: 7, family: 'psp', variant: 'Street', file: 'PSP-E1000.jpg', gamesId: 'Q170325' }),
  make({ id: 'Q188808', slug: 'vita', name: 'PlayStation Vita', shortName: 'Vita', manufacturer: 'Sony', yearStart: 2011, yearEnd: 2019, type: 'handheld', generation: 8, family: 'vita', variant: 'PCH-1000 OLED', file: 'PlayStation-Vita-1101-FL.png' }),
  make({ id: 'local:vita-2000', slug: 'vita-2000', name: 'PlayStation Vita 2000', shortName: 'Vita Slim', manufacturer: 'Sony', yearStart: 2013, yearEnd: 2019, type: 'handheld', generation: 8, family: 'vita', variant: 'PCH-2000 LCD', file: 'PlayStation-Vita-2000-FL.jpg', gamesId: 'Q188808' }),
  make({ id: 'Q16011703', slug: 'psvr', name: 'PlayStation VR', shortName: 'PSVR', manufacturer: 'Sony', yearStart: 2016, yearEnd: 2023, type: 'vr', generation: 8, family: 'psvr', file: 'Sony-PlayStation-4-PSVR-Headset-Mk1-FL.jpg' }),
  make({ id: 'Q107944338', slug: 'psvr2', name: 'PlayStation VR2', shortName: 'PSVR2', manufacturer: 'Sony', yearStart: 2023, type: 'vr', generation: 9, family: 'psvr2', file: 'PSVR2_(Non-Stereoscopic).png' }),

  // Microsoft
  make({ id: 'Q132020', slug: 'xbox', name: 'Xbox', shortName: 'Xbox', manufacturer: 'Microsoft', yearStart: 2001, yearEnd: 2009, type: 'home', generation: 6, family: 'xbox', file: 'Xbox-Console-wDuke-L.png' }),
  make({ id: 'Q48263', slug: 'xbox-360', name: 'Xbox 360', shortName: '360', manufacturer: 'Microsoft', yearStart: 2005, yearEnd: 2016, type: 'home', generation: 7, family: '360', variant: 'Pro / Elite', file: 'Xbox-360-Pro-wController.jpg' }),
  make({ id: 'local:360-s', slug: 'xbox-360-s', name: 'Xbox 360 S', shortName: '360 S', manufacturer: 'Microsoft', yearStart: 2010, yearEnd: 2016, type: 'home', generation: 7, family: '360', variant: 'S (Slim)', file: 'Xbox-360-S-wController.jpg', gamesId: 'Q48263' }),
  make({ id: 'local:360-e', slug: 'xbox-360-e', name: 'Xbox 360 E', shortName: '360 E', manufacturer: 'Microsoft', yearStart: 2013, yearEnd: 2016, type: 'home', generation: 7, family: '360', variant: 'E', file: 'Xbox-360-E-wController.jpg', gamesId: 'Q48263' }),
  make({ id: 'Q13361286', slug: 'xbox-one', name: 'Xbox One', shortName: 'XB1', manufacturer: 'Microsoft', yearStart: 2013, type: 'home', generation: 8, family: 'xbox-one', variant: 'Original', file: 'Xbox-One-Console-wKinect.jpg' }),
  make({ id: 'Q26883890', slug: 'xbox-one-s', name: 'Xbox One S', shortName: 'One S', manufacturer: 'Microsoft', yearStart: 2016, type: 'home', generation: 8, family: 'xbox-one', variant: 'S', file: 'Microsoft-Xbox-One-S-Console-FL.png', gamesId: 'Q13361286' }),
  make({ id: 'Q28843625', slug: 'xbox-one-x', name: 'Xbox One X', shortName: 'One X', manufacturer: 'Microsoft', yearStart: 2017, type: 'home', generation: 8, family: 'xbox-one', variant: 'X', file: 'Xbox-One-X-wController.jpg', gamesId: 'Q13361286' }),
  make({ id: 'Q64513817', slug: 'xbox-series-x', name: 'Xbox Series X', shortName: 'Series X', manufacturer: 'Microsoft', yearStart: 2020, type: 'home', generation: 9, family: 'xbox-series', variant: 'Series X', file: 'Xbox Series X 2 (transparent background).png', gamesId: 'Q98973368' }),
  make({ id: 'Q98967383', slug: 'xbox-series-s', name: 'Xbox Series S', shortName: 'Series S', manufacturer: 'Microsoft', yearStart: 2020, type: 'home', generation: 9, family: 'xbox-series', variant: 'Series S', file: 'Xbox Series S with controller.jpg', gamesId: 'Q98973368' }),
  make({ id: 'Q1406', slug: 'windows', name: 'Microsoft Windows', shortName: 'PC', manufacturer: 'Microsoft', yearStart: 1985, type: 'computer', family: 'windows', file: 'Windows_logo_-_2021.svg' }),
  make({ id: 'Q47604', slug: 'ms-dos', name: 'MS-DOS', shortName: 'DOS', manufacturer: 'Microsoft', yearStart: 1981, yearEnd: 2000, type: 'computer', family: 'dos', file: 'StartingMsdos.png' }),

  // Valve
  make({ id: 'Q337535', slug: 'steam', name: 'Steam', shortName: 'Steam', manufacturer: 'Valve', yearStart: 2003, type: 'computer', family: 'steam', file: 'Steam_icon_logo.svg' }),
  make({ id: 'Q107542665', slug: 'steam-deck', name: 'Steam Deck', shortName: 'Deck LCD', manufacturer: 'Valve', yearStart: 2022, type: 'hybrid', family: 'steam-deck', variant: 'LCD', file: 'Steam_Deck_(front).png' }),
  make({ id: 'Q123581447', slug: 'steam-deck-oled', name: 'Steam Deck OLED', shortName: 'Deck OLED', manufacturer: 'Valve', yearStart: 2023, type: 'hybrid', family: 'steam-deck', variant: 'OLED', file: 'Steam Deck OLED framsida hemskärm.jpg', gamesId: 'Q107542665' }),

  // Sega
  make({ id: 'Q1136956', slug: 'sg-1000', name: 'SG-1000', shortName: 'SG-1000', manufacturer: 'Sega', yearStart: 1983, yearEnd: 1985, type: 'home', generation: 3, family: 'sg-1000', file: 'Sega-SG-1000-Console-Set.jpg' }),
  make({ id: 'Q209868', slug: 'master-system', name: 'Master System', shortName: 'SMS', manufacturer: 'Sega', yearStart: 1985, yearEnd: 1996, type: 'home', generation: 3, family: 'sms', variant: 'Model 1', file: 'Sega-Master-System-Set.png' }),
  make({ id: 'local:sms2', slug: 'master-system-2', name: 'Master System II', shortName: 'SMS II', manufacturer: 'Sega', yearStart: 1990, yearEnd: 1996, type: 'home', generation: 3, family: 'sms', variant: 'Model 2', file: 'Sega-Master-System-II.jpg', gamesId: 'Q209868' }),
  make({ id: 'Q10676', slug: 'mega-drive', name: 'Mega Drive / Genesis', shortName: 'MD', manufacturer: 'Sega', yearStart: 1988, yearEnd: 1997, type: 'home', generation: 4, family: 'genesis', variant: 'Model 1', aka: ['Genesis'], file: 'Sega-Mega-Drive-JP-Mk1-Console-Set.jpg' }),
  make({ id: 'local:md2', slug: 'mega-drive-2', name: 'Mega Drive 2 / Genesis 2', shortName: 'MD 2', manufacturer: 'Sega', yearStart: 1993, yearEnd: 1997, type: 'home', generation: 4, family: 'genesis', variant: 'Model 2', file: 'Sega-Genesis-Model2-wController.jpg', gamesId: 'Q10676' }),
  make({ id: 'Q1047516', slug: 'sega-cd', name: 'Sega CD / Mega-CD', shortName: 'Mega-CD', manufacturer: 'Sega', yearStart: 1991, yearEnd: 1996, type: 'home', generation: 4, family: 'sega-cd', file: 'Sega-CD-Model1-Set.jpg' }),
  make({ id: 'Q1063978', slug: 'sega-32x', name: 'Sega 32X', shortName: '32X', manufacturer: 'Sega', yearStart: 1994, yearEnd: 1996, type: 'home', generation: 4, family: '32x', file: 'Sega-Genesis-Model2-32X.jpg' }),
  make({ id: 'Q200912', slug: 'saturn', name: 'Sega Saturn', shortName: 'Saturn', manufacturer: 'Sega', yearStart: 1994, yearEnd: 2000, type: 'home', generation: 5, family: 'saturn', file: 'Sega-Saturn-Console-Set-Mk2.png' }),
  make({ id: 'Q184198', slug: 'dreamcast', name: 'Dreamcast', shortName: 'DC', manufacturer: 'Sega', yearStart: 1998, yearEnd: 2001, type: 'home', generation: 6, family: 'dreamcast', file: 'Dreamcast-Console-Set.png' }),
  make({ id: 'Q751719', slug: 'game-gear', name: 'Game Gear', shortName: 'GG', manufacturer: 'Sega', yearStart: 1990, yearEnd: 1997, type: 'handheld', generation: 4, family: 'game-gear', file: 'Sega-Game-Gear-WB.png' }),
  make({ id: 'Q540868', slug: 'nomad', name: 'Sega Nomad', shortName: 'Nomad', manufacturer: 'Sega', yearStart: 1995, yearEnd: 1999, type: 'handheld', generation: 4, family: 'genesis', variant: 'Nomad', file: 'Sega-Nomad-Front.jpg', gamesId: 'Q10676' }),

  // Atari
  make({ id: 'Q206261', slug: 'atari-2600', name: 'Atari 2600', shortName: '2600', manufacturer: 'Atari', yearStart: 1977, yearEnd: 1992, type: 'home', generation: 2, family: '2600', variant: 'Woody', file: 'Atari-2600-Wood-4Sw-Set.png' }),
  make({ id: 'local:2600-jr', slug: 'atari-2600-jr', name: 'Atari 2600 Jr.', shortName: '2600 Jr', manufacturer: 'Atari', yearStart: 1986, yearEnd: 1992, type: 'home', generation: 2, family: '2600', variant: 'Junior', file: 'Atari-2600-Jr-wController-L.jpg', gamesId: 'Q206261' }),
  make({ id: 'Q743222', slug: 'atari-5200', name: 'Atari 5200', shortName: '5200', manufacturer: 'Atari', yearStart: 1982, yearEnd: 1984, type: 'home', generation: 2, family: '5200', file: 'Atari-5200-4-Port-wController-L.jpg' }),
  make({ id: 'Q753600', slug: 'atari-7800', name: 'Atari 7800', shortName: '7800', manufacturer: 'Atari', yearStart: 1986, yearEnd: 1992, type: 'home', generation: 3, family: '7800', file: 'Atari-7800-Console-Set.jpg' }),
  make({ id: 'Q650601', slug: 'jaguar', name: 'Atari Jaguar', shortName: 'Jaguar', manufacturer: 'Atari', yearStart: 1993, yearEnd: 1996, type: 'home', generation: 5, family: 'jaguar', file: 'Atari-Jaguar-Console-Set.png' }),
  make({ id: 'Q753657', slug: 'lynx', name: 'Atari Lynx', shortName: 'Lynx', manufacturer: 'Atari', yearStart: 1989, yearEnd: 1995, type: 'handheld', generation: 4, family: 'lynx', variant: 'Lynx I', file: 'Atari-Lynx-I-Handheld.jpg' }),
  make({ id: 'local:lynx-2', slug: 'lynx-2', name: 'Atari Lynx II', shortName: 'Lynx II', manufacturer: 'Atari', yearStart: 1991, yearEnd: 1995, type: 'handheld', generation: 4, family: 'lynx', variant: 'Lynx II', file: 'Atari-Lynx-II-Handheld.jpg', gamesId: 'Q753657' }),
  make({ id: 'Q249075', slug: 'atari-8bit', name: 'Atari 8-bit', shortName: 'Atari 8-bit', manufacturer: 'Atari', yearStart: 1979, yearEnd: 1992, type: 'computer', family: 'atari-8bit', file: 'Atari-800-Computer-FL.jpg' }),
  make({ id: 'Q627302', slug: 'atari-st', name: 'Atari ST', shortName: 'ST', manufacturer: 'Atari', yearStart: 1985, yearEnd: 1993, type: 'computer', family: 'atari-st', file: 'Atari_1040STf.jpg' }),

  // NEC / SNK
  make({ id: 'Q1057377', slug: 'pc-engine', name: 'PC Engine / TurboGrafx-16', shortName: 'PCE', manufacturer: 'NEC', yearStart: 1987, yearEnd: 1994, type: 'home', generation: 4, family: 'pce', variant: 'PC Engine / TG-16', aka: ['TurboGrafx-16'], file: 'NEC-TurboGrafx-16-Console-Set.jpg' }),
  make({ id: 'local:pce-duo', slug: 'pc-engine-duo', name: 'PC Engine Duo / TurboDuo', shortName: 'Duo', manufacturer: 'NEC', yearStart: 1991, yearEnd: 1994, type: 'home', generation: 4, family: 'pce', variant: 'Duo', file: 'NEC-TurboDuo-Console-Set.jpg', gamesId: 'Q1057377' }),
  make({ id: 'Q202375', slug: 'supergrafx', name: 'PC Engine SuperGrafx', shortName: 'SGX', manufacturer: 'NEC', yearStart: 1989, yearEnd: 1990, type: 'home', generation: 4, family: 'pce', variant: 'SuperGrafx', file: 'NEC-SuperGrafx-Console-Set.jpg', gamesId: 'Q1057377' }),
  make({ id: 'Q1057374', slug: 'turboexpress', name: 'TurboExpress / PC Engine GT', shortName: 'TGX', manufacturer: 'NEC', yearStart: 1990, yearEnd: 1994, type: 'handheld', generation: 4, family: 'pce', variant: 'GT / Express', file: 'NEC-TurboExpress-Upright-FL.jpg', gamesId: 'Q1057377' }),
  make({ id: 'Q1136902', slug: 'pc-fx', name: 'PC-FX', shortName: 'PC-FX', manufacturer: 'NEC', yearStart: 1994, yearEnd: 1998, type: 'home', generation: 5, family: 'pc-fx', file: 'PC-FX-Console-Set.jpg' }),
  make({ id: 'Q183505', slug: 'pc-98', name: 'NEC PC-98', shortName: 'PC-98', manufacturer: 'NEC', yearStart: 1982, yearEnd: 2003, type: 'computer', family: 'pc-98', file: 'PC-9801-1st-001.jpg' }),
  make({ id: 'Q1054350', slug: 'neo-geo', name: 'Neo Geo AES', shortName: 'AES', manufacturer: 'SNK', yearStart: 1990, yearEnd: 2004, type: 'home', generation: 4, family: 'neogeo', variant: 'AES', file: 'Neo-Geo-AES-Console-Set.png' }),
  make({ id: 'Q17042614', slug: 'neo-geo-mvs', name: 'Neo Geo MVS', shortName: 'MVS', manufacturer: 'SNK', yearStart: 1990, yearEnd: 2004, type: 'arcade', generation: 4, family: 'neogeo', variant: 'MVS', file: 'Neo-Geo-MVS-2Slot.png', gamesId: 'Q1054350' }),
  make({ id: 'Q2703883', slug: 'neo-geo-cd', name: 'Neo Geo CD', shortName: 'NGCD', manufacturer: 'SNK', yearStart: 1994, yearEnd: 1997, type: 'home', generation: 4, family: 'neogeo', variant: 'CD', file: 'Neo-Geo-CD-TopLoader-wController-FL.png' }),
  make({ id: 'Q939881', slug: 'neo-geo-pocket', name: 'Neo Geo Pocket', shortName: 'NGP', manufacturer: 'SNK', yearStart: 1998, yearEnd: 1999, type: 'handheld', generation: 5, family: 'ngp', variant: 'Mono', file: 'Neo-Geo-Pocket-Anthra-Left.jpg' }),
  make({ id: 'Q1977455', slug: 'neo-geo-pocket-color', name: 'Neo Geo Pocket Color', shortName: 'NGPC', manufacturer: 'SNK', yearStart: 1999, yearEnd: 2001, type: 'handheld', generation: 5, family: 'ngp', variant: 'Color', file: 'Neo-Geo-Pocket-Color-Blue-Left.jpg' }),

  // Other home
  make({ id: 'Q229429', slug: '3do', name: '3DO Interactive Multiplayer', shortName: '3DO', manufacturer: '3DO', yearStart: 1993, yearEnd: 1996, type: 'home', generation: 5, family: '3do', file: '3DO-FZ1-Console-Set.png' }),
  make({ id: 'Q1023103', slug: 'cd-i', name: 'Philips CD-i', shortName: 'CD-i', manufacturer: 'Philips', yearStart: 1991, yearEnd: 1998, type: 'home', generation: 4, family: 'cdi', file: 'Philips-CDi-910-Console-Set.jpg' }),
  make({ id: 'Q695161', slug: 'amiga-cd32', name: 'Amiga CD32', shortName: 'CD32', manufacturer: 'Commodore', yearStart: 1993, yearEnd: 1994, type: 'home', generation: 5, family: 'cd32', file: 'Amiga-CD32-wController-L-TRSP.png' }),
  make({ id: 'Q744987', slug: 'odyssey', name: 'Magnavox Odyssey', shortName: 'Odyssey', manufacturer: 'Magnavox', yearStart: 1972, yearEnd: 1975, type: 'home', generation: 1, family: 'odyssey', file: 'Magnavox-Odyssey-Console-Set.jpg' }),
  make({ id: 'Q1053294', slug: 'channel-f', name: 'Fairchild Channel F', shortName: 'Channel F', manufacturer: 'Fairchild', yearStart: 1976, yearEnd: 1983, type: 'home', generation: 2, family: 'channel-f', file: 'Fairchild-Channel-F.jpg' }),
  make({ id: 'Q1061441', slug: 'intellivision', name: 'Intellivision', shortName: 'INTV', manufacturer: 'Mattel', yearStart: 1979, yearEnd: 1990, type: 'home', generation: 2, family: 'intellivision', file: 'Intellivision-Console-Set.png' }),
  make({ id: 'Q1046862', slug: 'colecovision', name: 'ColecoVision', shortName: 'CV', manufacturer: 'Coleco', yearStart: 1982, yearEnd: 1985, type: 'home', generation: 2, family: 'coleco', file: 'ColecoVision-wController-L.jpg' }),
  make({ id: 'Q576932', slug: 'odyssey-2', name: 'Odyssey²', shortName: 'O²', manufacturer: 'Magnavox', yearStart: 1978, yearEnd: 1984, type: 'home', generation: 2, family: 'odyssey-2', file: 'Magnavox-Odyssey-2-Console-Set.jpg' }),
  make({ id: 'Q767631', slug: 'vectrex', name: 'Vectrex', shortName: 'Vectrex', manufacturer: 'GCE', yearStart: 1982, yearEnd: 1984, type: 'home', generation: 2, family: 'vectrex', file: 'Vectrex-Console-Set.jpg' }),

  // Computers
  make({ id: 'Q100047', slug: 'amiga', name: 'Commodore Amiga', shortName: 'Amiga', manufacturer: 'Commodore', yearStart: 1985, yearEnd: 1996, type: 'computer', family: 'amiga', variant: 'A500', file: 'Amiga500_system.jpg' }),
  make({ id: 'Q99775', slug: 'c64', name: 'Commodore 64', shortName: 'C64', manufacturer: 'Commodore', yearStart: 1982, yearEnd: 1994, type: 'computer', family: 'c64', file: 'Commodore-64-Computer-FL.jpg' }),
  make({ id: 'Q23882', slug: 'zx-spectrum', name: 'ZX Spectrum', shortName: 'Spectrum', manufacturer: 'Sinclair', yearStart: 1982, yearEnd: 1992, type: 'computer', family: 'spectrum', file: 'ZXSpectrum48k.jpg' }),
  make({ id: 'Q478829', slug: 'amstrad-cpc', name: 'Amstrad CPC', shortName: 'CPC', manufacturer: 'Amstrad', yearStart: 1984, yearEnd: 1990, type: 'computer', family: 'cpc', file: 'Amstrad_CPC464.jpg' }),
  make({ id: 'Q853547', slug: 'msx', name: 'MSX', shortName: 'MSX', manufacturer: 'ASCII / Microsoft', yearStart: 1983, yearEnd: 1996, type: 'computer', family: 'msx', file: 'Sony_HitBit_HB-10P_(White_Background).jpg' }),
  make({ id: 'Q3017175', slug: 'apple-ii', name: 'Apple II', shortName: 'Apple II', manufacturer: 'Apple', yearStart: 1977, yearEnd: 1993, type: 'computer', family: 'apple-ii', file: 'Apple_II-IMG_7064.jpg' }),
  make({ id: 'Q13522376', slug: 'mac-classic', name: 'Classic Mac OS', shortName: 'Mac', manufacturer: 'Apple', yearStart: 1984, yearEnd: 2001, type: 'computer', family: 'mac', variant: 'Classic', file: 'Apple_Macintosh_Plus.jpg' }),
  make({ id: 'Q14116', slug: 'macos', name: 'macOS', shortName: 'macOS', manufacturer: 'Apple', yearStart: 2001, type: 'computer', family: 'mac', variant: 'macOS', file: 'MacOS_wordmark_(2017).svg' }),
  make({ id: 'Q388', slug: 'linux', name: 'Linux', shortName: 'Linux', manufacturer: 'Comunidad', yearStart: 1991, type: 'computer', family: 'linux', file: 'Tux.svg' }),
  make({ id: 'Q1758277', slug: 'x68000', name: 'Sharp X68000', shortName: 'X68k', manufacturer: 'Sharp', yearStart: 1987, yearEnd: 1993, type: 'computer', family: 'x68k', file: 'X68000ACE-HD.JPG' }),
  make({ id: 'Q531896', slug: 'fm-towns', name: 'FM Towns', shortName: 'FM Towns', manufacturer: 'Fujitsu', yearStart: 1989, yearEnd: 1997, type: 'computer', family: 'fmtowns', file: 'FMTOWNS_2F.jpg' }),

  // Other handhelds / rare
  make({ id: 'Q1065792', slug: 'wonderswan', name: 'WonderSwan', shortName: 'WS', manufacturer: 'Bandai', yearStart: 1999, yearEnd: 2003, type: 'handheld', generation: 5, family: 'wonderswan', variant: 'Mono', file: 'WonderSwan-Black-Left.jpg' }),
  make({ id: 'Q1048035', slug: 'wonderswan-color', name: 'WonderSwan Color', shortName: 'WSC', manufacturer: 'Bandai', yearStart: 2000, yearEnd: 2003, type: 'handheld', generation: 6, family: 'wonderswan', variant: 'Color', file: 'WonderSwan-Color-Blue-Left.jpg' }),
  make({ id: 'Q336434', slug: 'n-gage', name: 'N-Gage', shortName: 'N-Gage', manufacturer: 'Nokia', yearStart: 2003, yearEnd: 2006, type: 'handheld', generation: 6, family: 'ngage', variant: 'Classic', file: 'Nokia-NGage-LL.png' }),
  make({ id: 'Q387925', slug: 'n-gage-qd', name: 'N-Gage QD', shortName: 'QD', manufacturer: 'Nokia', yearStart: 2004, yearEnd: 2006, type: 'handheld', generation: 6, family: 'ngage', variant: 'QD', file: 'Nokia-NGage-QD.png', gamesId: 'Q336434' }),
  make({ id: 'Q426119', slug: 'gp32', name: 'GP32', shortName: 'GP32', manufacturer: 'GamePark', yearStart: 2001, yearEnd: 2005, type: 'handheld', generation: 6, family: 'gp32', file: 'Gp32.jpg' }),
  make({ id: 'Q909005', slug: 'gizmondo', name: 'Gizmondo', shortName: 'Gizmondo', manufacturer: 'Tiger Telematics', yearStart: 2005, yearEnd: 2006, type: 'handheld', generation: 7, family: 'gizmondo', file: 'Gizmondo.jpg' }),
  make({ id: 'Q523532', slug: 'tapwave-zodiac', name: 'Tapwave Zodiac', shortName: 'Zodiac', manufacturer: 'Tapwave', yearStart: 2003, yearEnd: 2005, type: 'handheld', generation: 6, family: 'zodiac', file: 'Tapwave-Zodiac2-FL.jpg' }),
  make({ id: 'Q15015195', slug: 'pippin', name: 'Apple Pippin', shortName: 'Pippin', manufacturer: 'Apple', yearStart: 1996, yearEnd: 1997, type: 'home', generation: 5, family: 'pippin', file: 'Bandai-Apple-Pippin-wController-FL.jpg' }),
  make({ id: 'Q661952', slug: 'casio-loopy', name: 'Casio Loopy', shortName: 'Loopy', manufacturer: 'Casio', yearStart: 1995, yearEnd: 1996, type: 'home', generation: 5, family: 'loopy', file: 'Casio-Loopy-Console-Set.jpg' }),
  make({ id: 'Q2475188', slug: 'super-acan', name: 'Super A\'Can', shortName: 'A\'Can', manufacturer: 'Funtech', yearStart: 1995, yearEnd: 1996, type: 'home', generation: 5, family: 'acan', file: 'Super-ACan-Console-set-h.jpg' }),
  make({ id: 'Q981935', slug: 'gx4000', name: 'Amstrad GX4000', shortName: 'GX4000', manufacturer: 'Amstrad', yearStart: 1990, yearEnd: 1991, type: 'home', generation: 4, family: 'gx4000', file: 'Amstrad-GX4000-Console-Set.jpg' }),
  make({ id: 'Q184372', slug: 'zeebo', name: 'Zeebo', shortName: 'Zeebo', manufacturer: 'Zeebo Inc.', yearStart: 2009, yearEnd: 2011, type: 'home', generation: 7, family: 'zeebo', file: 'Zeebo-Real_Console.jpg' }),
  make({ id: 'Q1391641', slug: 'ouya', name: 'Ouya', shortName: 'Ouya', manufacturer: 'Ouya Inc.', yearStart: 2013, yearEnd: 2015, type: 'home', generation: 8, family: 'ouya', file: 'OUYA-Console-set-h.jpg' }),

  // Arcade, mobile, VR, cloud
  make({ id: 'Q192851', slug: 'arcade', name: 'Arcade', shortName: 'Arcade', manufacturer: 'Varios', yearStart: 1971, type: 'arcade', family: 'arcade', file: 'Daikeien_amusement_arcade_2018-05-10.jpg' }),
  make({ id: 'Q48493', slug: 'ios', name: 'iOS', shortName: 'iOS', manufacturer: 'Apple', yearStart: 2007, type: 'mobile', family: 'ios', file: 'IOS_wordmark_(2017).svg' }),
  make({ id: 'Q94', slug: 'android', name: 'Android', shortName: 'Android', manufacturer: 'Google', yearStart: 2008, type: 'mobile', family: 'android', file: 'Android_robot.svg' }),
  make({ id: 'Q15761415', slug: 'oculus-rift', name: 'Oculus Rift', shortName: 'Rift', manufacturer: 'Meta', yearStart: 2016, yearEnd: 2019, type: 'vr', family: 'quest', variant: 'Rift CV1', file: 'Oculus-Rift-CV1-Headset-Front.jpg' }),
  make({ id: 'Q85784573', slug: 'quest-2', name: 'Meta Quest 2', shortName: 'Quest 2', manufacturer: 'Meta', yearStart: 2020, type: 'vr', family: 'quest', variant: 'Quest 2', file: 'Meta_Quest_2.png', gamesId: 'Q63777286' }),
  make({ id: 'Q122209145', slug: 'quest-3', name: 'Meta Quest 3', shortName: 'Quest 3', manufacturer: 'Meta', yearStart: 2023, type: 'vr', family: 'quest', variant: 'Quest 3', file: 'Meta_Quest_3_display_unit.jpg', gamesId: 'Q63777286' }),
  make({ id: 'Q60309635', slug: 'stadia', name: 'Google Stadia', shortName: 'Stadia', manufacturer: 'Google', yearStart: 2019, yearEnd: 2023, type: 'cloud', family: 'stadia', file: 'Stadia_logo.svg' }),
  make({ id: 'Q28133964', slug: 'geforce-now', name: 'GeForce Now', shortName: 'GFN', manufacturer: 'NVIDIA', yearStart: 2015, type: 'cloud', family: 'gfn', file: 'Nvidia_logo.svg' }),
  make({ id: 'Q99582374', slug: 'luna', name: 'Amazon Luna', shortName: 'Luna', manufacturer: 'Amazon', yearStart: 2020, type: 'cloud', family: 'luna', file: 'Amazon_Luna_logo.svg' }),
]

export const MANUFACTURER_ORDER = [
  'Nintendo', 'Sony', 'Microsoft', 'Sega', 'Atari', 'NEC', 'SNK', 'Commodore',
  'Apple', 'Valve', 'Google', 'Meta', 'Bandai', 'Philips', 'Mattel', 'Coleco',
  'Magnavox', 'Varios',
]

export const TYPE_LABEL: Record<PlatformType, string> = {
  home: 'Sobremesa',
  handheld: 'Portátil',
  hybrid: 'Híbrida',
  computer: 'Ordenador',
  mobile: 'Móvil',
  vr: 'VR',
  arcade: 'Arcade',
  cloud: 'Nube',
}

export function platformById(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id || p.gamesId === id)
}

export function platformBySlug(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug)
}

export function familyOf(platform: Platform): Platform[] {
  return PLATFORMS.filter((p) => p.family === platform.family)
}

export function catalogPlatforms(): Platform[] {
  const seen = new Set<string>()
  return PLATFORMS.filter((p) => {
    if (seen.has(p.gamesId)) return false
    seen.add(p.gamesId)
    return true
  })
}

export function platformsByManufacturer(): { manufacturer: string; families: Platform[][] }[] {
  const groups = new Map<string, Platform[]>()
  for (const p of PLATFORMS) {
    const list = groups.get(p.manufacturer) ?? []
    list.push(p)
    groups.set(p.manufacturer, list)
  }

  function families(list: Platform[]): Platform[][] {
    const map = new Map<string, Platform[]>()
    for (const p of list) {
      const pack = map.get(p.family) ?? []
      pack.push(p)
      map.set(p.family, pack)
    }
    return [...map.values()]
  }

  const known = MANUFACTURER_ORDER.filter((m) => groups.has(m)).map((m) => ({
    manufacturer: m,
    families: families(groups.get(m)!),
  }))
  const extra = [...groups.keys()]
    .filter((m) => !MANUFACTURER_ORDER.includes(m))
    .sort()
    .map((m) => ({ manufacturer: m, families: families(groups.get(m)!) }))
  return [...known, ...extra]
}
