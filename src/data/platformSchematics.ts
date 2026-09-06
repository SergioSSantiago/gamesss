import type { Platform, PlatformType } from '../types'

export type SchemaKind =
  | 'cpu'
  | 'gpu'
  | 'apu'
  | 'mem'
  | 'media'
  | 'io'
  | 'power'
  | 'bus'
  | 'display'
  | 'storage'
  | 'net'

export type SchemaBlock = {
  id: string
  label: string
  detail?: string
  kind: SchemaKind
}

/** Esquema técnico simplificado (arquitectura / bloques). */
export type PlatformSchematic = {
  title: string
  subtitle?: string
  blocks: SchemaBlock[]
  /** [from, to, etiqueta opcional] */
  edges: [string, string, string?][]
}

function s(
  title: string,
  blocks: SchemaBlock[],
  edges: [string, string, string?][],
  subtitle?: string,
): PlatformSchematic {
  return { title, subtitle, blocks, edges }
}

/** Diagramas por familia (`platform.family`). */
export const PLATFORM_SCHEMATICS: Record<string, PlatformSchematic> = {
  nes: s(
    'Arquitectura NES / Famicom',
    [
      { id: 'cart', label: 'Game Pak', detail: 'PRG + CHR ROM', kind: 'media' },
      { id: 'cpu', label: 'CPU', detail: 'Ricoh 2A03 (6502)', kind: 'cpu' },
      { id: 'ppu', label: 'PPU', detail: 'Ricoh 2C02', kind: 'gpu' },
      { id: 'wram', label: 'WRAM', detail: '2 KB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '2 KB', kind: 'mem' },
      { id: 'cic', label: 'CIC', detail: 'lockout', kind: 'io' },
      { id: 'ctrl', label: 'Mandos', detail: 'serie 4021', kind: 'io' },
      { id: 'av', label: 'AV / RF', detail: 'NTSC/PAL', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V AC', kind: 'power' },
    ],
    [
      ['cart', 'cpu', 'bus'],
      ['cart', 'ppu', 'CHR'],
      ['cpu', 'wram'],
      ['ppu', 'vram'],
      ['cpu', 'ppu', 'PPUREGS'],
      ['cpu', 'ctrl'],
      ['cic', 'cart'],
      ['ppu', 'av', 'vídeo'],
      ['cpu', 'av', 'audio'],
      ['psu', 'cpu'],
    ],
    'Bloques principales · no es un esquemático de pistas',
  ),

  snes: s(
    'Arquitectura SNES / Super Famicom',
    [
      { id: 'cart', label: 'Game Pak', detail: 'ROM + chips', kind: 'media' },
      { id: 'cpu', label: 'S-CPU', detail: 'Ricoh 5A22', kind: 'cpu' },
      { id: 'ppu1', label: 'S-PPU1', detail: '5C77', kind: 'gpu' },
      { id: 'ppu2', label: 'S-PPU2', detail: '5C78', kind: 'gpu' },
      { id: 'apu', label: 'S-APU', detail: 'SPC700 + DSP', kind: 'apu' },
      { id: 'wram', label: 'WRAM', detail: '128 KB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '64 KB', kind: 'mem' },
      { id: 'aram', label: 'ARAM', detail: '64 KB audio', kind: 'mem' },
      { id: 'ctrl', label: 'Mandos', detail: '2× puertos', kind: 'io' },
      { id: 'av', label: 'MultiAV', detail: 'RGB / S-Video', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '10 V DC', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'wram'],
      ['cpu', 'ppu1'],
      ['ppu1', 'ppu2'],
      ['ppu2', 'vram'],
      ['cpu', 'apu'],
      ['apu', 'aram'],
      ['cpu', 'ctrl'],
      ['ppu2', 'av', 'vídeo'],
      ['apu', 'av', 'audio'],
      ['psu', 'cpu'],
    ],
  ),

  n64: s(
    'Arquitectura Nintendo 64',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM + CIC', kind: 'media' },
      { id: 'cpu', label: 'CPU', detail: 'NEC VR4300', kind: 'cpu' },
      { id: 'rcp', label: 'RCP', detail: 'Reality Coprocessor', kind: 'gpu' },
      { id: 'rdam', label: 'RDRAM', detail: '4 MB (+Expansion)', kind: 'mem' },
      { id: 'pif', label: 'PIF', detail: 'joybus / boot', kind: 'io' },
      { id: 'ctrl', label: 'Mandos', detail: '4× Joybus', kind: 'io' },
      { id: 'av', label: 'MultiAV', detail: 'vídeo + audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '12 V / 3.3 V', kind: 'power' },
    ],
    [
      ['cart', 'rcp'],
      ['cpu', 'rcp', 'bus'],
      ['rcp', 'rdam'],
      ['rcp', 'pif'],
      ['pif', 'ctrl'],
      ['rcp', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  gamecube: s(
    'Arquitectura GameCube',
    [
      { id: 'disc', label: 'Mini-DVD', detail: '1.5 GB', kind: 'media' },
      { id: 'cpu', label: 'Gekko', detail: 'IBM PowerPC', kind: 'cpu' },
      { id: 'gpu', label: 'Flipper', detail: 'ATI', kind: 'gpu' },
      { id: 'ram', label: 'Splash / 1T-SRAM', detail: '24+3 MB', kind: 'mem' },
      { id: 'dsp', label: 'DSP audio', detail: 'Macronix', kind: 'apu' },
      { id: 'io', label: 'I/O', detail: 'EXI / SI', kind: 'io' },
      { id: 'av', label: 'Digital AV', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '12 V', kind: 'power' },
    ],
    [
      ['disc', 'io'],
      ['cpu', 'gpu'],
      ['gpu', 'ram'],
      ['cpu', 'ram'],
      ['gpu', 'dsp'],
      ['io', 'cpu'],
      ['gpu', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  wii: s(
    'Arquitectura Wii',
    [
      { id: 'disc', label: 'DVD', detail: 'Wii / GC', kind: 'media' },
      { id: 'cpu', label: 'Broadway', detail: 'PowerPC', kind: 'cpu' },
      { id: 'gpu', label: 'Hollywood', detail: 'ATI', kind: 'gpu' },
      { id: 'ram', label: 'GDDR3 / MEM1', detail: '88 MB total', kind: 'mem' },
      { id: 'starlet', label: 'Starlet', detail: 'ARM IOS', kind: 'io' },
      { id: 'wifi', label: 'Wi‑Fi / BT', detail: '802.11 + Wiimote', kind: 'net' },
      { id: 'av', label: 'AV Multi', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '12 V', kind: 'power' },
    ],
    [
      ['disc', 'starlet'],
      ['cpu', 'gpu'],
      ['gpu', 'ram'],
      ['starlet', 'wifi'],
      ['starlet', 'cpu'],
      ['gpu', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  'wii-u': s(
    'Arquitectura Wii U',
    [
      { id: 'disc', label: 'DVD', detail: 'Wii U / Wii', kind: 'media' },
      { id: 'cpu', label: 'Espresso', detail: '3× PowerPC', kind: 'cpu' },
      { id: 'gpu', label: 'Latte', detail: 'AMD Radeon', kind: 'gpu' },
      { id: 'ram', label: 'DDR3', detail: '2 GB', kind: 'mem' },
      { id: 'emmc', label: 'eMMC', detail: 'NAND 8–32 GB', kind: 'storage' },
      { id: 'pad', label: 'GamePad', detail: 'Wi‑Fi U', kind: 'io' },
      { id: 'hdmi', label: 'HDMI', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'externa', kind: 'power' },
    ],
    [
      ['disc', 'cpu'],
      ['cpu', 'gpu'],
      ['gpu', 'ram'],
      ['cpu', 'emmc'],
      ['cpu', 'pad'],
      ['gpu', 'hdmi'],
      ['psu', 'cpu'],
    ],
  ),

  switch: s(
    'Arquitectura Nintendo Switch',
    [
      { id: 'cart', label: 'Game Card', detail: 'ROM NAND', kind: 'media' },
      { id: 'soc', label: 'Tegra X1', detail: 'NVIDIA SoC', kind: 'cpu' },
      { id: 'ram', label: 'LPDDR4', detail: '4 GB', kind: 'mem' },
      { id: 'emmc', label: 'eMMC', detail: '32 GB', kind: 'storage' },
      { id: 'joy', label: 'Joy‑Con rail', detail: 'UART / rail', kind: 'io' },
      { id: 'dock', label: 'USB‑C / Dock', detail: 'HDMI out', kind: 'io' },
      { id: 'lcd', label: 'LCD', detail: '6.2″', kind: 'display' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['cart', 'soc'],
      ['soc', 'ram'],
      ['soc', 'emmc'],
      ['soc', 'joy'],
      ['soc', 'dock'],
      ['soc', 'lcd'],
      ['bat', 'soc'],
    ],
  ),

  'switch-2': s(
    'Arquitectura Nintendo Switch 2',
    [
      { id: 'cart', label: 'Game Card', detail: 'nueva gen', kind: 'media' },
      { id: 'soc', label: 'T239', detail: 'NVIDIA custom', kind: 'cpu' },
      { id: 'ram', label: 'LPDDR5X', detail: '12 GB', kind: 'mem' },
      { id: 'ufs', label: 'UFS', detail: '256 GB', kind: 'storage' },
      { id: 'joy', label: 'Joy‑Con 2', detail: 'magnético', kind: 'io' },
      { id: 'dock', label: 'Dock / USB‑C', detail: '4K dock', kind: 'io' },
      { id: 'lcd', label: 'LCD', detail: '7.9″ 1080p', kind: 'display' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['cart', 'soc'],
      ['soc', 'ram'],
      ['soc', 'ufs'],
      ['soc', 'joy'],
      ['soc', 'dock'],
      ['soc', 'lcd'],
      ['bat', 'soc'],
    ],
  ),

  'game-boy': s(
    'Arquitectura Game Boy (DMG)',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM + MBC', kind: 'media' },
      { id: 'cpu', label: 'CPU', detail: 'Sharp LR35902', kind: 'cpu' },
      { id: 'ppu', label: 'PPU', detail: 'integrada', kind: 'gpu' },
      { id: 'wram', label: 'WRAM', detail: '8 KB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '8 KB', kind: 'mem' },
      { id: 'lcd', label: 'LCD', detail: '160×144', kind: 'display' },
      { id: 'apu', label: 'APU', detail: '4 canales', kind: 'apu' },
      { id: 'bat', label: '4×AA', detail: '6 V', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'wram'],
      ['cpu', 'ppu'],
      ['ppu', 'vram'],
      ['ppu', 'lcd'],
      ['cpu', 'apu'],
      ['bat', 'cpu'],
    ],
  ),

  gbc: s(
    'Arquitectura Game Boy Color',
    [
      { id: 'cart', label: 'Cartucho', detail: 'CGB ROM', kind: 'media' },
      { id: 'cpu', label: 'CPU', detail: 'LR35902 ×2 clock', kind: 'cpu' },
      { id: 'ppu', label: 'PPU color', detail: '56 colores', kind: 'gpu' },
      { id: 'wram', label: 'WRAM', detail: '32 KB', kind: 'mem' },
      { id: 'lcd', label: 'LCD color', detail: '160×144', kind: 'display' },
      { id: 'bat', label: '2×AA', detail: '3 V', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'wram'],
      ['cpu', 'ppu'],
      ['ppu', 'lcd'],
      ['bat', 'cpu'],
    ],
  ),

  gba: s(
    'Arquitectura Game Boy Advance',
    [
      { id: 'cart', label: 'Cartucho', detail: 'AGB ROM', kind: 'media' },
      { id: 'cpu', label: 'CPU', detail: 'ARM7TDMI', kind: 'cpu' },
      { id: 'gpu', label: 'PPU', detail: 'modos 0–5', kind: 'gpu' },
      { id: 'wram', label: 'IWRAM / EWRAM', detail: '32+256 KB', kind: 'mem' },
      { id: 'lcd', label: 'LCD', detail: '240×160', kind: 'display' },
      { id: 'apu', label: 'APU', detail: 'GB + DMA', kind: 'apu' },
      { id: 'bat', label: 'Batería', detail: '2×AA / Li‑ion SP', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'wram'],
      ['cpu', 'gpu'],
      ['gpu', 'lcd'],
      ['cpu', 'apu'],
      ['bat', 'cpu'],
    ],
  ),

  ds: s(
    'Arquitectura Nintendo DS',
    [
      { id: 'cart', label: 'Slot-1 / Slot-2', detail: 'NDS + GBA', kind: 'media' },
      { id: 'arm9', label: 'ARM9', detail: '67 MHz', kind: 'cpu' },
      { id: 'arm7', label: 'ARM7', detail: '33 MHz', kind: 'cpu' },
      { id: 'gpu', label: '2D/3D GPU', detail: 'dual screen', kind: 'gpu' },
      { id: 'ram', label: 'Main RAM', detail: '4 MB', kind: 'mem' },
      { id: 'lcd', label: '2× LCD', detail: '256×192', kind: 'display' },
      { id: 'wifi', label: 'Wi‑Fi', detail: '802.11', kind: 'net' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['cart', 'arm9'],
      ['arm9', 'arm7'],
      ['arm9', 'gpu'],
      ['arm9', 'ram'],
      ['gpu', 'lcd'],
      ['arm7', 'wifi'],
      ['bat', 'arm9'],
    ],
  ),

  '3ds': s(
    'Arquitectura Nintendo 3DS',
    [
      { id: 'cart', label: 'Game Card', detail: '3DS ROM', kind: 'media' },
      { id: 'arm11', label: 'ARM11 MPCore', detail: '2–4 cores', kind: 'cpu' },
      { id: 'arm9', label: 'ARM9', detail: 'security', kind: 'cpu' },
      { id: 'gpu', label: 'PICA200', detail: 'DMP GPU', kind: 'gpu' },
      { id: 'ram', label: 'FCRAM', detail: '128 MB', kind: 'mem' },
      { id: 'nand', label: 'NAND', detail: 'eMMC', kind: 'storage' },
      { id: 'lcd', label: '3D LCD + touch', detail: 'estereoscópico', kind: 'display' },
      { id: 'wifi', label: 'Wi‑Fi / NFC*', detail: '*New 3DS', kind: 'net' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['cart', 'arm11'],
      ['arm11', 'arm9'],
      ['arm11', 'gpu'],
      ['arm11', 'ram'],
      ['arm11', 'nand'],
      ['gpu', 'lcd'],
      ['arm11', 'wifi'],
      ['bat', 'arm11'],
    ],
  ),

  'virtual-boy': s(
    'Arquitectura Virtual Boy',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: 'CPU', detail: 'NEC V810', kind: 'cpu' },
      { id: 'vip', label: 'VIP', detail: 'Virtual Image PPU', kind: 'gpu' },
      { id: 'led', label: 'LED arrays', detail: '2× displays', kind: 'display' },
      { id: 'wram', label: 'WRAM', detail: '64 KB', kind: 'mem' },
      { id: 'psu', label: '6×AA / AC', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'vip'],
      ['cpu', 'wram'],
      ['vip', 'led'],
      ['psu', 'cpu'],
    ],
  ),

  ps1: s(
    'Arquitectura PlayStation',
    [
      { id: 'disc', label: 'CD-ROM', detail: 'LDP + DSP', kind: 'media' },
      { id: 'cpu', label: 'CPU', detail: 'MIPS R3000A', kind: 'cpu' },
      { id: 'gpu', label: 'GPU', detail: 'Sony', kind: 'gpu' },
      { id: 'spu', label: 'SPU', detail: '24 canales', kind: 'apu' },
      { id: 'ram', label: 'Main RAM', detail: '2 MB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '1 MB', kind: 'mem' },
      { id: 'ctrl', label: 'Mandos / MC', detail: 'puertos serie', kind: 'io' },
      { id: 'av', label: 'AV Multi', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'cpu'],
      ['cpu', 'ram'],
      ['cpu', 'gpu'],
      ['gpu', 'vram'],
      ['cpu', 'spu'],
      ['cpu', 'ctrl'],
      ['gpu', 'av'],
      ['spu', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  ps2: s(
    'Arquitectura PlayStation 2',
    [
      { id: 'disc', label: 'DVD / CD', detail: 'drive', kind: 'media' },
      { id: 'ee', label: 'Emotion Engine', detail: 'MIPS + VU', kind: 'cpu' },
      { id: 'gs', label: 'Graphics Synth', detail: 'GPU', kind: 'gpu' },
      { id: 'iop', label: 'IOP', detail: 'I/O Processor', kind: 'io' },
      { id: 'ram', label: 'RDRAM', detail: '32 MB', kind: 'mem' },
      { id: 'vram', label: 'eDRAM', detail: '4 MB GS', kind: 'mem' },
      { id: 'spu2', label: 'SPU2', detail: 'audio', kind: 'apu' },
      { id: 'av', label: 'AV / Digital', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'iop'],
      ['iop', 'ee'],
      ['ee', 'ram'],
      ['ee', 'gs'],
      ['gs', 'vram'],
      ['iop', 'spu2'],
      ['gs', 'av'],
      ['psu', 'ee'],
    ],
  ),

  ps3: s(
    'Arquitectura PlayStation 3',
    [
      { id: 'disc', label: 'Blu-ray', detail: 'BD drive', kind: 'media' },
      { id: 'cell', label: 'Cell BE', detail: 'PPE + 7 SPE', kind: 'cpu' },
      { id: 'rsx', label: 'RSX', detail: 'NVIDIA GPU', kind: 'gpu' },
      { id: 'xdr', label: 'XDR RAM', detail: '256 MB', kind: 'mem' },
      { id: 'gddr', label: 'GDDR3', detail: '256 MB', kind: 'mem' },
      { id: 'hdd', label: 'HDD', detail: 'SATA', kind: 'storage' },
      { id: 'hdmi', label: 'HDMI', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'cell'],
      ['cell', 'xdr'],
      ['cell', 'rsx'],
      ['rsx', 'gddr'],
      ['cell', 'hdd'],
      ['rsx', 'hdmi'],
      ['psu', 'cell'],
    ],
  ),

  ps4: s(
    'Arquitectura PlayStation 4',
    [
      { id: 'disc', label: 'Blu-ray', detail: 'drive', kind: 'media' },
      { id: 'apu', label: 'APU', detail: 'AMD Jaguar + GCN', kind: 'cpu' },
      { id: 'ram', label: 'GDDR5', detail: '8 GB unificado', kind: 'mem' },
      { id: 'hdd', label: 'HDD / SSD*', detail: '*Slim/Pro upgrades', kind: 'storage' },
      { id: 'hdmi', label: 'HDMI', detail: 'vídeo / audio', kind: 'display' },
      { id: 'net', label: 'GbE / Wi‑Fi', detail: 'red', kind: 'net' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'apu'],
      ['apu', 'ram'],
      ['apu', 'hdd'],
      ['apu', 'hdmi'],
      ['apu', 'net'],
      ['psu', 'apu'],
    ],
  ),

  ps5: s(
    'Arquitectura PlayStation 5',
    [
      { id: 'disc', label: 'Ultra HD BD*', detail: '*modelos con drive', kind: 'media' },
      { id: 'apu', label: 'APU', detail: 'Zen 2 + RDNA 2', kind: 'cpu' },
      { id: 'ram', label: 'GDDR6', detail: '16 GB', kind: 'mem' },
      { id: 'ssd', label: 'SSD custom', detail: 'NVMe + I/O', kind: 'storage' },
      { id: 'hdmi', label: 'HDMI 2.1', detail: '4K / VRR', kind: 'display' },
      { id: 'temp', label: 'Liquid metal', detail: 'TIM', kind: 'power' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'apu'],
      ['ssd', 'apu'],
      ['apu', 'ram'],
      ['apu', 'hdmi'],
      ['temp', 'apu'],
      ['psu', 'apu'],
    ],
  ),

  psp: s(
    'Arquitectura PSP',
    [
      { id: 'umd', label: 'UMD', detail: 'óptico', kind: 'media' },
      { id: 'cpu', label: 'Allegrex', detail: 'MIPS', kind: 'cpu' },
      { id: 'gpu', label: 'GPU', detail: 'Render Engine', kind: 'gpu' },
      { id: 'ram', label: 'eDRAM / DDR', detail: '32+4 MB', kind: 'mem' },
      { id: 'ms', label: 'Memory Stick', detail: 'almacenamiento', kind: 'storage' },
      { id: 'lcd', label: 'LCD', detail: '480×272', kind: 'display' },
      { id: 'wifi', label: 'Wi‑Fi', detail: '802.11b', kind: 'net' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['umd', 'cpu'],
      ['cpu', 'gpu'],
      ['cpu', 'ram'],
      ['cpu', 'ms'],
      ['gpu', 'lcd'],
      ['cpu', 'wifi'],
      ['bat', 'cpu'],
    ],
  ),

  vita: s(
    'Arquitectura PlayStation Vita',
    [
      { id: 'cart', label: 'Game Card', detail: 'cartucho', kind: 'media' },
      { id: 'cpu', label: 'Quad ARM', detail: 'Cortex-A9', kind: 'cpu' },
      { id: 'gpu', label: 'SGX543MP4+', detail: 'PowerVR', kind: 'gpu' },
      { id: 'ram', label: 'RAM', detail: '512 MB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '128 MB', kind: 'mem' },
      { id: 'lcd', label: 'OLED / LCD', detail: '960×544', kind: 'display' },
      { id: 'wifi', label: 'Wi‑Fi / 3G*', detail: '*modelos', kind: 'net' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'gpu'],
      ['cpu', 'ram'],
      ['gpu', 'vram'],
      ['gpu', 'lcd'],
      ['cpu', 'wifi'],
      ['bat', 'cpu'],
    ],
  ),

  xbox: s(
    'Arquitectura Xbox original',
    [
      { id: 'disc', label: 'DVD', detail: 'drive', kind: 'media' },
      { id: 'cpu', label: 'Pentium III', detail: '733 MHz', kind: 'cpu' },
      { id: 'gpu', label: 'NV2A', detail: 'NVIDIA', kind: 'gpu' },
      { id: 'ram', label: 'DDR', detail: '64 MB unificado', kind: 'mem' },
      { id: 'hdd', label: 'HDD', detail: 'IDE', kind: 'storage' },
      { id: 'mcpx', label: 'MCPX', detail: 'southbridge', kind: 'io' },
      { id: 'av', label: 'AV', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'mcpx'],
      ['cpu', 'gpu'],
      ['gpu', 'ram'],
      ['cpu', 'mcpx'],
      ['mcpx', 'hdd'],
      ['gpu', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  '360': s(
    'Arquitectura Xbox 360',
    [
      { id: 'disc', label: 'DVD', detail: 'drive', kind: 'media' },
      { id: 'cpu', label: 'Xenon', detail: '3× PowerPC', kind: 'cpu' },
      { id: 'gpu', label: 'Xenos', detail: 'ATI + eDRAM', kind: 'gpu' },
      { id: 'ram', label: 'GDDR3', detail: '512 MB', kind: 'mem' },
      { id: 'hdd', label: 'HDD', detail: 'SATA / USB', kind: 'storage' },
      { id: 'hdmi', label: 'AV / HDMI*', detail: '*Elite+', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'externa brick', kind: 'power' },
    ],
    [
      ['disc', 'cpu'],
      ['cpu', 'gpu'],
      ['gpu', 'ram'],
      ['cpu', 'hdd'],
      ['gpu', 'hdmi'],
      ['psu', 'cpu'],
    ],
  ),

  'xbox-one': s(
    'Arquitectura Xbox One',
    [
      { id: 'disc', label: 'Blu-ray', detail: 'drive', kind: 'media' },
      { id: 'apu', label: 'APU', detail: 'Jaguar + GCN', kind: 'cpu' },
      { id: 'ram', label: 'DDR3 / GDDR5*', detail: '*One X', kind: 'mem' },
      { id: 'hdd', label: 'HDD', detail: 'SATA', kind: 'storage' },
      { id: 'hdmi', label: 'HDMI', detail: 'in / out', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna / externa S', kind: 'power' },
    ],
    [
      ['disc', 'apu'],
      ['apu', 'ram'],
      ['apu', 'hdd'],
      ['apu', 'hdmi'],
      ['psu', 'apu'],
    ],
  ),

  'xbox-series': s(
    'Arquitectura Xbox Series X|S',
    [
      { id: 'disc', label: 'UHD BD*', detail: '*Series X', kind: 'media' },
      { id: 'apu', label: 'APU', detail: 'Zen 2 + RDNA 2', kind: 'cpu' },
      { id: 'ram', label: 'GDDR6', detail: '10–16 GB', kind: 'mem' },
      { id: 'ssd', label: 'NVMe SSD', detail: 'Velocity Arch', kind: 'storage' },
      { id: 'hdmi', label: 'HDMI 2.1', detail: '4K / 120', kind: 'display' },
      { id: 'exp', label: 'Storage Exp.', detail: 'tarjeta propietaria', kind: 'storage' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'apu'],
      ['ssd', 'apu'],
      ['exp', 'apu'],
      ['apu', 'ram'],
      ['apu', 'hdmi'],
      ['psu', 'apu'],
    ],
  ),

  genesis: s(
    'Arquitectura Mega Drive / Genesis',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: '68000', detail: 'Motorola / YM', kind: 'cpu' },
      { id: 'z80', label: 'Z80', detail: 'audio CPU', kind: 'cpu' },
      { id: 'vdp', label: 'VDP', detail: 'Yamaha YM7101', kind: 'gpu' },
      { id: 'fm', label: 'YM2612', detail: 'FM + PSG', kind: 'apu' },
      { id: 'wram', label: '68k RAM', detail: '64 KB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '64 KB', kind: 'mem' },
      { id: 'av', label: 'AV / RGB', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V DC', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'z80'],
      ['cpu', 'vdp'],
      ['cpu', 'wram'],
      ['vdp', 'vram'],
      ['z80', 'fm'],
      ['vdp', 'av'],
      ['fm', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  sms: s(
    'Arquitectura Master System',
    [
      { id: 'cart', label: 'Cartucho / Card', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: 'Z80', detail: '3.58 MHz', kind: 'cpu' },
      { id: 'vdp', label: 'VDP', detail: 'TMS9918 deriv.', kind: 'gpu' },
      { id: 'psg', label: 'PSG', detail: 'SN76489', kind: 'apu' },
      { id: 'wram', label: 'WRAM', detail: '8 KB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '16 KB', kind: 'mem' },
      { id: 'av', label: 'RF / AV', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V DC', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'vdp'],
      ['cpu', 'wram'],
      ['vdp', 'vram'],
      ['cpu', 'psg'],
      ['vdp', 'av'],
      ['psg', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  saturn: s(
    'Arquitectura Sega Saturn',
    [
      { id: 'disc', label: 'CD-ROM', detail: '2× drive', kind: 'media' },
      { id: 'sh2a', label: 'SH-2 A', detail: 'master', kind: 'cpu' },
      { id: 'sh2b', label: 'SH-2 B', detail: 'slave', kind: 'cpu' },
      { id: 'vdp1', label: 'VDP1', detail: 'sprites / 3D', kind: 'gpu' },
      { id: 'vdp2', label: 'VDP2', detail: 'backgrounds', kind: 'gpu' },
      { id: 'scsp', label: 'SCSP', detail: 'audio', kind: 'apu' },
      { id: 'ram', label: 'Work RAM', detail: '2 MB', kind: 'mem' },
      { id: 'av', label: 'AV', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['disc', 'sh2a'],
      ['sh2a', 'sh2b'],
      ['sh2a', 'vdp1'],
      ['sh2a', 'vdp2'],
      ['sh2a', 'ram'],
      ['sh2a', 'scsp'],
      ['vdp2', 'av'],
      ['scsp', 'av'],
      ['psu', 'sh2a'],
    ],
  ),

  dreamcast: s(
    'Arquitectura Dreamcast',
    [
      { id: 'gdi', label: 'GD-ROM', detail: 'óptico', kind: 'media' },
      { id: 'cpu', label: 'SH-4', detail: 'Hitachi 200 MHz', kind: 'cpu' },
      { id: 'gpu', label: 'PowerVR2', detail: 'CLX2', kind: 'gpu' },
      { id: 'ram', label: 'SDRAM', detail: '16 MB', kind: 'mem' },
      { id: 'vram', label: 'VRAM', detail: '8 MB', kind: 'mem' },
      { id: 'aica', label: 'AICA', detail: 'audio ARM', kind: 'apu' },
      { id: 'modem', label: 'Modem / BBA', detail: 'red', kind: 'net' },
      { id: 'av', label: 'AV / VGA*', detail: '*cable', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'externa', kind: 'power' },
    ],
    [
      ['gdi', 'cpu'],
      ['cpu', 'gpu'],
      ['cpu', 'ram'],
      ['gpu', 'vram'],
      ['cpu', 'aica'],
      ['cpu', 'modem'],
      ['gpu', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  'game-gear': s(
    'Arquitectura Game Gear',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: 'Z80', detail: '3.5 MHz', kind: 'cpu' },
      { id: 'vdp', label: 'VDP', detail: 'SMS-like', kind: 'gpu' },
      { id: 'psg', label: 'PSG', detail: 'SN76489', kind: 'apu' },
      { id: 'lcd', label: 'LCD', detail: '160×144', kind: 'display' },
      { id: 'bat', label: '6×AA', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'vdp'],
      ['cpu', 'psg'],
      ['vdp', 'lcd'],
      ['bat', 'cpu'],
    ],
  ),

  'sega-cd': s(
    'Arquitectura Mega-CD / Sega CD',
    [
      { id: 'cd', label: 'CD-ROM', detail: 'add-on', kind: 'media' },
      { id: 'asic', label: 'ASIC CD', detail: 'decoder', kind: 'io' },
      { id: 'cdc', label: 'CDC/CDD', detail: 'servo', kind: 'io' },
      { id: 'ram', label: 'Program RAM', detail: '512 KB–1 MB', kind: 'mem' },
      { id: 'md', label: 'Mega Drive', detail: 'host 68k/VDP', kind: 'bus' },
      { id: 'psu', label: 'PSU', detail: 'add-on', kind: 'power' },
    ],
    [
      ['cd', 'cdc'],
      ['cdc', 'asic'],
      ['asic', 'ram'],
      ['asic', 'md'],
      ['psu', 'asic'],
    ],
  ),

  '32x': s(
    'Arquitectura 32X',
    [
      { id: 'cart', label: 'Cart 32X', detail: 'ROM', kind: 'media' },
      { id: 'sh2a', label: 'SH-2 A', detail: '23 MHz', kind: 'cpu' },
      { id: 'sh2b', label: 'SH-2 B', detail: '23 MHz', kind: 'cpu' },
      { id: 'vdp', label: '32X VDP', detail: 'framebuffer', kind: 'gpu' },
      { id: 'md', label: 'Mega Drive', detail: 'host', kind: 'bus' },
      { id: 'psu', label: 'PSU', detail: 'extra', kind: 'power' },
    ],
    [
      ['cart', 'sh2a'],
      ['sh2a', 'sh2b'],
      ['sh2a', 'vdp'],
      ['vdp', 'md'],
      ['psu', 'sh2a'],
    ],
  ),

  'sg-1000': s(
    'Arquitectura SG-1000',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: 'Z80', detail: '3.58 MHz', kind: 'cpu' },
      { id: 'vdp', label: 'TMS9918A', detail: 'VDP', kind: 'gpu' },
      { id: 'psg', label: 'SN76489', detail: 'PSG', kind: 'apu' },
      { id: 'av', label: 'RF', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'vdp'],
      ['cpu', 'psg'],
      ['vdp', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  '2600': s(
    'Arquitectura Atari 2600',
    [
      { id: 'cart', label: 'Cartucho', detail: '4 KB typ.', kind: 'media' },
      { id: 'cpu', label: '6507', detail: 'MOS', kind: 'cpu' },
      { id: 'tia', label: 'TIA', detail: 'vídeo + audio', kind: 'gpu' },
      { id: 'riot', label: 'RIOT', detail: '6532 I/O + RAM', kind: 'io' },
      { id: 'av', label: 'RF', detail: 'NTSC/PAL', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'tia'],
      ['cpu', 'riot'],
      ['tia', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  '5200': s(
    'Arquitectura Atari 5200',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: '6502C', detail: 'CPU', kind: 'cpu' },
      { id: 'gtia', label: 'GTIA', detail: 'gráficos', kind: 'gpu' },
      { id: 'antic', label: 'ANTIC', detail: 'DMA display', kind: 'gpu' },
      { id: 'pokey', label: 'POKEY', detail: 'audio / I/O', kind: 'apu' },
      { id: 'av', label: 'RF / AV', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'externa', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'antic'],
      ['antic', 'gtia'],
      ['cpu', 'pokey'],
      ['gtia', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  '7800': s(
    'Arquitectura Atari 7800',
    [
      { id: 'cart', label: 'Cartucho', detail: '7800 / 2600', kind: 'media' },
      { id: 'cpu', label: '6502C', detail: 'CPU', kind: 'cpu' },
      { id: 'maria', label: 'MARIA', detail: 'GPU', kind: 'gpu' },
      { id: 'tia', label: 'TIA', detail: 'modo 2600', kind: 'gpu' },
      { id: 'riot', label: 'RIOT', detail: 'I/O', kind: 'io' },
      { id: 'av', label: 'RF / AV', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'maria'],
      ['cpu', 'tia'],
      ['cpu', 'riot'],
      ['maria', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  jaguar: s(
    'Arquitectura Atari Jaguar',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'tom', label: 'TOM', detail: 'GPU / Object', kind: 'gpu' },
      { id: 'jerry', label: 'JERRY', detail: 'DSP audio', kind: 'apu' },
      { id: 'cpu', label: '68000', detail: 'manager', kind: 'cpu' },
      { id: 'ram', label: 'DRAM', detail: '2 MB', kind: 'mem' },
      { id: 'av', label: 'AV', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'externa', kind: 'power' },
    ],
    [
      ['cart', 'tom'],
      ['tom', 'jerry'],
      ['cpu', 'tom'],
      ['tom', 'ram'],
      ['tom', 'av'],
      ['psu', 'tom'],
    ],
  ),

  lynx: s(
    'Arquitectura Atari Lynx',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'mikey', label: 'Mikey', detail: 'CPU + audio + LCD', kind: 'cpu' },
      { id: 'suzy', label: 'Suzy', detail: 'blitter GPU', kind: 'gpu' },
      { id: 'ram', label: 'DRAM', detail: '64 KB', kind: 'mem' },
      { id: 'lcd', label: 'LCD color', detail: '160×102', kind: 'display' },
      { id: 'bat', label: '6×AA', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['cart', 'mikey'],
      ['mikey', 'suzy'],
      ['mikey', 'ram'],
      ['suzy', 'lcd'],
      ['bat', 'mikey'],
    ],
  ),

  neogeo: s(
    'Arquitectura Neo Geo AES / MVS',
    [
      { id: 'cart', label: 'Cartucho', detail: 'P + C + V + M', kind: 'media' },
      { id: 'cpu', label: '68000', detail: '12 MHz', kind: 'cpu' },
      { id: 'z80', label: 'Z80', detail: 'audio CPU', kind: 'cpu' },
      { id: 'lspc', label: 'LSPC / GPU', detail: 'sprites', kind: 'gpu' },
      { id: 'ym', label: 'YM2610', detail: 'FM + ADPCM', kind: 'apu' },
      { id: 'av', label: 'JAMMA / AV', detail: 'vídeo RGB', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'AES / cabina', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cart', 'z80'],
      ['cpu', 'lspc'],
      ['z80', 'ym'],
      ['lspc', 'av'],
      ['ym', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  ngp: s(
    'Arquitectura Neo Geo Pocket',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: 'TLCS-900H', detail: 'Toshiba', kind: 'cpu' },
      { id: 'z80', label: 'Z80', detail: 'audio', kind: 'cpu' },
      { id: 'lcd', label: 'LCD', detail: 'mono / color', kind: 'display' },
      { id: 'bat', label: '2×AA', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'z80'],
      ['cpu', 'lcd'],
      ['bat', 'cpu'],
    ],
  ),

  pce: s(
    'Arquitectura PC Engine / TG-16',
    [
      { id: 'card', label: 'HuCard / CD*', detail: '*Duo / CD-ROM²', kind: 'media' },
      { id: 'cpu', label: 'HuC6280', detail: '65C02 + PSG', kind: 'cpu' },
      { id: 'vdc', label: 'HuC6270', detail: 'VDC', kind: 'gpu' },
      { id: 'vce', label: 'HuC6260', detail: 'VCE color', kind: 'gpu' },
      { id: 'av', label: 'AV', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9–10 V', kind: 'power' },
    ],
    [
      ['card', 'cpu'],
      ['cpu', 'vdc'],
      ['vdc', 'vce'],
      ['vce', 'av'],
      ['cpu', 'av', 'PSG'],
      ['psu', 'cpu'],
    ],
  ),

  'pc-fx': s(
    'Arquitectura PC-FX',
    [
      { id: 'cd', label: 'CD-ROM', detail: 'torre', kind: 'media' },
      { id: 'cpu', label: 'V810', detail: 'NEC', kind: 'cpu' },
      { id: 'gpu', label: 'HuC6271+', detail: 'backgrounds', kind: 'gpu' },
      { id: 'ram', label: 'RAM', detail: '2 MB+', kind: 'mem' },
      { id: 'av', label: 'AV', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['cd', 'cpu'],
      ['cpu', 'gpu'],
      ['cpu', 'ram'],
      ['gpu', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  '3do': s(
    'Arquitectura 3DO',
    [
      { id: 'cd', label: 'CD-ROM', detail: 'doble velocidad', kind: 'media' },
      { id: 'cpu', label: 'ARM60', detail: '12.5 MHz', kind: 'cpu' },
      { id: 'gpu', label: '2× cel engines', detail: 'gráficos', kind: 'gpu' },
      { id: 'dsp', label: 'DSP', detail: 'audio', kind: 'apu' },
      { id: 'ram', label: 'DRAM', detail: '2 MB', kind: 'mem' },
      { id: 'av', label: 'AV', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'externa', kind: 'power' },
    ],
    [
      ['cd', 'cpu'],
      ['cpu', 'gpu'],
      ['cpu', 'dsp'],
      ['cpu', 'ram'],
      ['gpu', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  cdi: s(
    'Arquitectura CD-i',
    [
      { id: 'cd', label: 'CD-i drive', detail: 'óptico', kind: 'media' },
      { id: 'cpu', label: '68070 / CLIO', detail: 'según modelo', kind: 'cpu' },
      { id: 'video', label: 'Video chips', detail: 'VDSC', kind: 'gpu' },
      { id: 'ram', label: 'RAM', detail: '1 MB typ.', kind: 'mem' },
      { id: 'av', label: 'AV', detail: 'vídeo / audio', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'interna', kind: 'power' },
    ],
    [
      ['cd', 'cpu'],
      ['cpu', 'video'],
      ['cpu', 'ram'],
      ['video', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  amiga: s(
    'Arquitectura Amiga (A500 tip.)',
    [
      { id: 'floppy', label: 'Floppy DF0', detail: '880 KB', kind: 'media' },
      { id: 'cpu', label: '68000', detail: '7.14 MHz', kind: 'cpu' },
      { id: 'agnus', label: 'Agnus', detail: 'DMA / blitter', kind: 'gpu' },
      { id: 'denise', label: 'Denise', detail: 'vídeo', kind: 'gpu' },
      { id: 'paula', label: 'Paula', detail: 'audio 4 ch', kind: 'apu' },
      { id: 'ram', label: 'Chip RAM', detail: '512 KB–1 MB', kind: 'mem' },
      { id: 'av', label: 'RGB / AV', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'externa', kind: 'power' },
    ],
    [
      ['floppy', 'cpu'],
      ['cpu', 'agnus'],
      ['agnus', 'denise'],
      ['agnus', 'paula'],
      ['agnus', 'ram'],
      ['denise', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  c64: s(
    'Arquitectura Commodore 64',
    [
      { id: 'cart', label: 'Cart / Tape / Disk', detail: 'IEC', kind: 'media' },
      { id: 'cpu', label: '6510', detail: 'MOS', kind: 'cpu' },
      { id: 'vic', label: 'VIC-II', detail: 'gráficos', kind: 'gpu' },
      { id: 'sid', label: 'SID', detail: '6581/8580', kind: 'apu' },
      { id: 'ram', label: 'RAM', detail: '64 KB', kind: 'mem' },
      { id: 'pla', label: 'PLA', detail: 'bankswitch', kind: 'bus' },
      { id: 'av', label: 'RF / AV', detail: 'vídeo', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V AC + 5 V', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'pla'],
      ['pla', 'ram'],
      ['cpu', 'vic'],
      ['cpu', 'sid'],
      ['vic', 'av'],
      ['sid', 'av'],
      ['psu', 'cpu'],
    ],
  ),

  spectrum: s(
    'Arquitectura ZX Spectrum',
    [
      { id: 'tape', label: 'Cassette', detail: 'EAR/MIC', kind: 'media' },
      { id: 'cpu', label: 'Z80A', detail: '3.5 MHz', kind: 'cpu' },
      { id: 'ula', label: 'ULA', detail: 'vídeo + I/O', kind: 'gpu' },
      { id: 'ram', label: 'RAM', detail: '16/48 KB', kind: 'mem' },
      { id: 'rom', label: 'ROM', detail: 'BASIC', kind: 'mem' },
      { id: 'rf', label: 'RF', detail: 'TV out', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: '9 V DC', kind: 'power' },
    ],
    [
      ['tape', 'ula'],
      ['cpu', 'ula'],
      ['cpu', 'ram'],
      ['cpu', 'rom'],
      ['ula', 'rf'],
      ['psu', 'cpu'],
    ],
  ),

  'steam-deck': s(
    'Arquitectura Steam Deck',
    [
      { id: 'ssd', label: 'NVMe SSD', detail: '64–512 GB+', kind: 'storage' },
      { id: 'apu', label: 'Van Gogh APU', detail: 'Zen 2 + RDNA 2', kind: 'cpu' },
      { id: 'ram', label: 'LPDDR5', detail: '16 GB', kind: 'mem' },
      { id: 'lcd', label: 'LCD / OLED', detail: '1280×800', kind: 'display' },
      { id: 'ctrl', label: 'Controles', detail: 'sticks / pads', kind: 'io' },
      { id: 'wifi', label: 'Wi‑Fi / BT', detail: 'red', kind: 'net' },
      { id: 'bat', label: 'Batería', detail: '40–50 Wh', kind: 'power' },
    ],
    [
      ['ssd', 'apu'],
      ['apu', 'ram'],
      ['apu', 'lcd'],
      ['apu', 'ctrl'],
      ['apu', 'wifi'],
      ['bat', 'apu'],
    ],
  ),

  arcade: s(
    'Arquitectura borne arcade (JAMMA tip.)',
    [
      { id: 'pcb', label: 'PCB juego', detail: 'ROM + CPU', kind: 'cpu' },
      { id: 'jamma', label: 'JAMMA', detail: 'edge 56 pines', kind: 'bus' },
      { id: 'psu', label: 'PSU cabina', detail: '+5 / +12 / −5', kind: 'power' },
      { id: 'crt', label: 'Monitor CRT', detail: '15/25 kHz', kind: 'display' },
      { id: 'ctrl', label: 'Panel', detail: 'sticks / botones', kind: 'io' },
      { id: 'spk', label: 'Altavoces', detail: 'audio amp', kind: 'apu' },
    ],
    [
      ['pcb', 'jamma'],
      ['jamma', 'crt', 'RGB sync'],
      ['jamma', 'ctrl'],
      ['jamma', 'spk'],
      ['psu', 'jamma'],
      ['psu', 'pcb'],
    ],
  ),

  wonderswan: s(
    'Arquitectura WonderSwan',
    [
      { id: 'cart', label: 'Cartucho', detail: 'ROM', kind: 'media' },
      { id: 'cpu', label: 'V30MZ', detail: 'NEC 8086-like', kind: 'cpu' },
      { id: 'lcd', label: 'LCD', detail: '224×144', kind: 'display' },
      { id: 'apu', label: 'APU', detail: 'canales', kind: 'apu' },
      { id: 'bat', label: '1×AA', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['cart', 'cpu'],
      ['cpu', 'lcd'],
      ['cpu', 'apu'],
      ['bat', 'cpu'],
    ],
  ),

  'game-watch': s(
    'Arquitectura Game & Watch',
    [
      { id: 'lcd', label: 'LCD segmentado', detail: 'custom', kind: 'display' },
      { id: 'mcu', label: 'MCU Sharp', detail: 'SM remates', kind: 'cpu' },
      { id: 'btn', label: 'Botones', detail: 'membrana', kind: 'io' },
      { id: 'bat', label: 'Pilas botón', detail: 'SR / LR', kind: 'power' },
    ],
    [
      ['mcu', 'lcd'],
      ['btn', 'mcu'],
      ['bat', 'mcu'],
    ],
  ),

  psvr: s(
    'Arquitectura PSVR',
    [
      { id: 'ps4', label: 'PS4 / PS5*', detail: 'host', kind: 'bus' },
      { id: 'box', label: 'Breakout box', detail: 'proceso vídeo', kind: 'io' },
      { id: 'hmd', label: 'HMD', detail: 'OLED + IMU', kind: 'display' },
      { id: 'cam', label: 'Cámara', detail: 'tracking', kind: 'io' },
      { id: 'psu', label: 'PSU box', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['ps4', 'box'],
      ['box', 'hmd'],
      ['cam', 'ps4'],
      ['psu', 'box'],
    ],
  ),

  psvr2: s(
    'Arquitectura PSVR2',
    [
      { id: 'ps5', label: 'PS5', detail: 'host USB‑C', kind: 'bus' },
      { id: 'hmd', label: 'HMD', detail: 'OLED 4K HDR', kind: 'display' },
      { id: 'track', label: 'Inside-out', detail: 'cámaras', kind: 'io' },
      { id: 'haptic', label: 'Haptics / eye', detail: 'sensores', kind: 'io' },
      { id: 'psu', label: 'Alim. PS5', detail: 'vía cable', kind: 'power' },
    ],
    [
      ['ps5', 'hmd'],
      ['track', 'hmd'],
      ['haptic', 'hmd'],
      ['psu', 'ps5'],
    ],
  ),

  quest: s(
    'Arquitectura Quest / Rift',
    [
      { id: 'soc', label: 'XR SoC', detail: 'Snapdragon XR', kind: 'cpu' },
      { id: 'ram', label: 'LPDDR', detail: 'RAM', kind: 'mem' },
      { id: 'stor', label: 'UFS', detail: 'almacenamiento', kind: 'storage' },
      { id: 'disp', label: 'LCDs', detail: 'lentes Fresnel', kind: 'display' },
      { id: 'cam', label: 'Tracking cams', detail: 'inside-out', kind: 'io' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['soc', 'ram'],
      ['soc', 'stor'],
      ['soc', 'disp'],
      ['cam', 'soc'],
      ['bat', 'soc'],
    ],
  ),
}

const TYPE_FALLBACK: Record<PlatformType, PlatformSchematic> = {
  home: s(
    'Arquitectura genérica · sobremesa',
    [
      { id: 'media', label: 'Soporte', detail: 'cart / disc', kind: 'media' },
      { id: 'cpu', label: 'CPU / SoC', detail: 'proceso', kind: 'cpu' },
      { id: 'gpu', label: 'GPU', detail: 'gráficos', kind: 'gpu' },
      { id: 'ram', label: 'RAM', detail: 'memoria', kind: 'mem' },
      { id: 'av', label: 'AV / HDMI', detail: 'salida', kind: 'display' },
      { id: 'psu', label: 'PSU', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['media', 'cpu'],
      ['cpu', 'gpu'],
      ['cpu', 'ram'],
      ['gpu', 'av'],
      ['psu', 'cpu'],
    ],
  ),
  handheld: s(
    'Arquitectura genérica · portátil',
    [
      { id: 'media', label: 'Cartucho / NAND', detail: 'juego', kind: 'media' },
      { id: 'soc', label: 'SoC', detail: 'CPU+GPU', kind: 'cpu' },
      { id: 'ram', label: 'RAM', detail: 'memoria', kind: 'mem' },
      { id: 'lcd', label: 'Pantalla', detail: 'LCD/OLED', kind: 'display' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion / AA', kind: 'power' },
    ],
    [
      ['media', 'soc'],
      ['soc', 'ram'],
      ['soc', 'lcd'],
      ['bat', 'soc'],
    ],
  ),
  hybrid: s(
    'Arquitectura genérica · híbrida',
    [
      { id: 'media', label: 'Cartucho / SSD', detail: 'juego', kind: 'media' },
      { id: 'soc', label: 'SoC', detail: 'APU', kind: 'cpu' },
      { id: 'ram', label: 'RAM', detail: 'LPDDR', kind: 'mem' },
      { id: 'dock', label: 'Dock / USB‑C', detail: 'TV out', kind: 'io' },
      { id: 'lcd', label: 'Pantalla', detail: 'portátil', kind: 'display' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['media', 'soc'],
      ['soc', 'ram'],
      ['soc', 'dock'],
      ['soc', 'lcd'],
      ['bat', 'soc'],
    ],
  ),
  computer: s(
    'Arquitectura genérica · ordenador',
    [
      { id: 'stor', label: 'Disco / floppy', detail: 'almacenamiento', kind: 'storage' },
      { id: 'cpu', label: 'CPU', detail: 'proceso', kind: 'cpu' },
      { id: 'ram', label: 'RAM', detail: 'memoria', kind: 'mem' },
      { id: 'gpu', label: 'Vídeo', detail: 'chip / GPU', kind: 'gpu' },
      { id: 'io', label: 'I/O', detail: 'teclado / puertos', kind: 'io' },
      { id: 'psu', label: 'PSU', detail: 'alimentación', kind: 'power' },
    ],
    [
      ['stor', 'cpu'],
      ['cpu', 'ram'],
      ['cpu', 'gpu'],
      ['cpu', 'io'],
      ['psu', 'cpu'],
    ],
  ),
  mobile: s(
    'Arquitectura genérica · móvil',
    [
      { id: 'soc', label: 'SoC', detail: 'CPU+GPU', kind: 'cpu' },
      { id: 'ram', label: 'RAM', detail: 'LPDDR', kind: 'mem' },
      { id: 'stor', label: 'UFS / eMMC', detail: 'almacenamiento', kind: 'storage' },
      { id: 'lcd', label: 'Pantalla táctil', detail: 'UI', kind: 'display' },
      { id: 'net', label: 'Radio', detail: 'LTE / Wi‑Fi', kind: 'net' },
      { id: 'bat', label: 'Batería', detail: 'Li‑ion', kind: 'power' },
    ],
    [
      ['soc', 'ram'],
      ['soc', 'stor'],
      ['soc', 'lcd'],
      ['soc', 'net'],
      ['bat', 'soc'],
    ],
  ),
  vr: s(
    'Arquitectura genérica · VR',
    [
      { id: 'host', label: 'Host / SoC', detail: 'PC o standalone', kind: 'cpu' },
      { id: 'hmd', label: 'HMD', detail: 'displays + IMU', kind: 'display' },
      { id: 'track', label: 'Tracking', detail: 'cámaras / bases', kind: 'io' },
      { id: 'ctrl', label: 'Mandos', detail: '6DoF', kind: 'io' },
      { id: 'psu', label: 'Alimentación', detail: 'cable / batería', kind: 'power' },
    ],
    [
      ['host', 'hmd'],
      ['track', 'host'],
      ['ctrl', 'host'],
      ['psu', 'host'],
    ],
  ),
  arcade: PLATFORM_SCHEMATICS.arcade,
  cloud: s(
    'Arquitectura genérica · nube',
    [
      { id: 'client', label: 'Cliente', detail: 'app / TV', kind: 'io' },
      { id: 'net', label: 'Red', detail: 'Internet', kind: 'net' },
      { id: 'edge', label: 'Edge / CDN', detail: 'streaming', kind: 'bus' },
      { id: 'gpu', label: 'GPU farm', detail: 'servidores', kind: 'gpu' },
      { id: 'auth', label: 'Cuenta / DRM', detail: 'servicio', kind: 'io' },
    ],
    [
      ['client', 'net'],
      ['net', 'edge'],
      ['edge', 'gpu'],
      ['auth', 'edge'],
    ],
  ),
}

export function schematicForPlatform(platform: Platform): PlatformSchematic {
  return PLATFORM_SCHEMATICS[platform.family] ?? TYPE_FALLBACK[platform.type]
}
