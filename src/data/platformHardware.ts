import { commons } from '../lib/commons'
import type { Platform } from '../types'

export type PlatformInternal = {
  name: string
  image: string
  note?: string
}

export type PlatformFailure = {
  title: string
  summary: string
}

export type PlatformHardware = {
  /** Fotos de PCB / piezas internas (Commons). */
  internals: PlatformInternal[]
  /** Averías típicas de la familia. */
  failures: PlatformFailure[]
  notes?: string
}

const C = (file: string, w = 900) => commons(file, w)

function hw(
  internals: PlatformInternal[],
  failures: PlatformFailure[],
  notes?: string,
): PlatformHardware {
  return { internals, failures, notes }
}

const ageCaps: PlatformFailure = {
  title: 'Condensadores electrolíticos',
  summary:
    'Con el tiempo se secan o gotean: vídeo inestable, no enciende, audio distorsionado o reinicios. Sustitución preventiva habitual en máquinas de los 80–90.',
}

const dirtyCart: PlatformFailure = {
  title: 'Contactos sucios / oxidación',
  summary:
    'Cartuchos o ranuras oxidados provocan pantallas negras, glitches o “insert cartridge”. Limpieza con alcohol isopropílico (evitar abrasivos agresivos).',
}

const laserFail: PlatformFailure = {
  title: 'Láser / unidad óptica',
  summary:
    'No lee discos, tartamudea o pide el disco. Desgaste del pickup, engrase o lente sucia; a veces hay que ajustar potenciómetros o cambiar la unidad.',
}

const hddFail: PlatformFailure = {
  title: 'Disco duro / almacenamiento',
  summary:
    'Ruidos, corrupción de datos o no arranca el SO. En consolas con HDD interno (PS3, Xbox 360, etc.) el disco es pieza de desgaste.',
}

const overheat: PlatformFailure = {
  title: 'Sobrecalentamiento / pasta térmica',
  summary:
    'Apagados térmicos, artefactos o YLOD/RROD. Ventiladores sucios, pasta seca o pads degradados; requiere apertura y limpieza.',
}

const joyRail: PlatformFailure = {
  title: 'Drift / sticks analógicos',
  summary:
    'El personaje se mueve solo. Potenciómetros desgastados (Joy-Con, DualShock, etc.); limpieza temporal o cambio del módulo.',
}

const batterySave: PlatformFailure = {
  title: 'Pila de salvado / RTC',
  summary:
    'Partidas borradas o reloj incorrecto. Pilas CR2032 u otras agotadas en cartuchos o placa; hay que soldar o sustituir el soporte.',
}

const ribbon: PlatformFailure = {
  title: 'Flex / flat cables',
  summary:
    'Pantalla a medias, sin tactil o sin imagen tras un golpe. Cables flex sueltos o rotos en portátiles y clamshell.',
}

/** Datos por familia (`platform.family`). */
export const PLATFORM_HARDWARE: Record<string, PlatformHardware> = {
  nes: hw(
    [
      { name: 'Placa NES (top loader)', image: C('Nintendo-NES-TL-Motherboard-BR.jpg'), note: 'Revisión TL' },
      { name: 'Placa NES · cara inferior', image: C('Nintendo-Entertainment-System-NES-Motherboard-Bottom.jpg') },
      { name: 'Placa NES Mk2 · inferior', image: C('Nintendo-NES-Mk2-Motherboard-Bottom.jpg') },
    ],
    [
      dirtyCart,
      {
        title: 'Ciclador / bloqueo 72 pines',
        summary:
          'El mecanismo de 72 pines se debilita: hay que “soplar” o forzar. Sustitución del conector o conversión a carga directa.',
      },
      ageCaps,
      {
        title: 'Fuente / RF',
        summary: 'Adaptadores originales fallan; RF ruidoso. Muchos usan mods AV o fuentes modernas reguladas.',
      },
    ],
  ),

  snes: hw(
    [
      { name: 'Placa SNES SNS-CPU-GPM-02', image: C('Nintendo SNS-CPU-GPM-02 SNES Motherboard (23997897605).jpg') },
      { name: 'Placa SNES CPU-RGB-01', image: C('SNES-CPU-RGB-01 motherboard.jpg') },
      { name: 'Placa 1CHIP (detalle)', image: C('Super-Nintendo-1Chip-Motherboard-Top-Flat.jpg'), note: 'Revisiones 1CHIP con vídeo distinto' },
    ],
    [
      dirtyCart,
      {
        title: 'Condensadores de audio / vídeo',
        summary: 'Zumbido, colores lavados o sin sonido estereo. Recap de la zona de AV muy frecuente.',
      },
      {
        title: 'CIC / región',
        summary: 'Bloqueo por región o CIC dañado. Mods de región o bypass en reparaciones avanzadas.',
      },
      batterySave,
    ],
  ),

  n64: hw(
    [
      { name: 'Placa N64 · superior', image: C('Nintendo-N64-Motherboard-Top.jpg') },
      { name: 'Placa N64 · inferior', image: C('Nintendo-N64-Motherboard-Bottom.jpg') },
      { name: 'Placa mando N64', image: C('Nintendo-N64-Controller-Motherboard-Flat-Top.jpg'), note: 'Stick analógico = pieza de desgaste' },
    ],
    [
      dirtyCart,
      {
        title: 'Stick del mando',
        summary: 'El stick hexagonal se desgasta: drift y “deadzone”. Kits de reparación o mando nuevo.',
      },
      {
        title: 'Expansion Pak / Jumper Pak',
        summary: 'Mal contacto: pantallas negras o juegos Expansion-only que no arrancan.',
      },
      ageCaps,
    ],
  ),

  gamecube: hw(
    [
      { name: 'Placa + unidad óptica (inferior)', image: C('GameCube motherboard and disc drive bottom.jpg') },
      { name: 'Adaptador módem · PCB', image: C('Nintendo-GameCube-Modem-Motherboard.jpg') },
      { name: 'Broadband Adapter · PCB', image: C('Nintendo-GameCube-Broadband-Adapter-Motherboard.jpg') },
    ],
    [
      laserFail,
      {
        title: 'Engranajes de la bandeja',
        summary: 'La tapa o el sled no mueve el disco. Piñones de plástico rotos o correas flojas.',
      },
      {
        title: 'Puerto de mandos / memoria',
        summary: 'Contactos oxidados: mandos intermitentes o tarjetas no detectadas.',
      },
      overheat,
    ],
  ),

  wii: hw(
    [
      { name: 'Restos GC en Wii Family Edition', image: C('The Remains of the Nintendo GameCube Controller Ports and Memory Card Slots in the Wii Family Edition 2.jpg'), note: 'Algunas revisiones eliminan puertos GC' },
    ],
    [
      {
        title: 'Lector de discos (D2x / D3x / D4x)',
        summary: 'Errores de lectura discos Wii/GC. Lentes, engranajes o PCB del drive; modelo de drive importa para piezas.',
      },
      {
        title: 'Bluetooth / Wi‑Fi',
        summary: 'Mandos no sincronizan o Wi‑Fi muerto. Módulos internos o antenas dañadas.',
      },
      {
        title: 'Bloqueo / brick por softmod',
        summary: 'Instalaciones mal hechas pueden dejar la consola inutilizable. Backups y precauciones.',
      },
      overheat,
    ],
    'Pocas fotos Commons de la placa Wii completa; las averías sí están muy documentadas.',
  ),

  'wii-u': hw(
    [
      { name: 'Wii U · cara inferior abierta', image: C('Naked Wii U underside.jpg') },
    ],
    [
      {
        title: 'eMMC / NAND corrupta',
        summary: 'Error 160-0103 y similares: memoria eMMC fallando. Backup urgente y, en casos graves, sustitución.',
      },
      laserFail,
      {
        title: 'GamePad (batería / stick / pantalla)',
        summary: 'Batería hinchada, drift o LCD dañado. Piezas de recambio cada vez más escasas.',
      },
      overheat,
    ],
  ),

  switch: hw(
    [
      { name: 'Comparativa placas Switch', image: C('Switch motherboard comparison.jpg') },
      { name: 'Interior Switch (teardown)', image: C('Innenleben der Nintendo Switch 20230405 HOF09142 RAW-Export.png') },
    ],
    [
      joyRail,
      {
        title: 'Ranura de cartuchos',
        summary: 'No lee juegos o los “come”. Pins doblados o suciedad; a veces hay que cambiar el socket.',
      },
      {
        title: 'Pantalla / digitizer',
        summary: 'Roturas por caídas. El LCD pegado complica la reparación.',
      },
      {
        title: 'Conector USB‑C / dock',
        summary: 'No carga o no sale imagen al dock. Puerto flojo o IC de carga.',
      },
      ribbon,
    ],
  ),

  'switch-2': hw(
    [
      { name: 'Placa Switch 2', image: C('Nintendo Switch 2 motherboard.jpg') },
      { name: 'Placa + SoC NVIDIA', image: C('Nintendo Switch 2 motherboard and NVIDIA SoC.jpg') },
    ],
    [
      joyRail,
      {
        title: 'Ranura / dock / USB‑C',
        summary: 'Fallos tempranos típicos de híbridas: contactos, polvo y estrés mecánico del puerto.',
      },
      overheat,
    ],
  ),

  'game-boy': hw(
    [
      { name: 'Placa Game Boy DMG · superior', image: C('Nintendo-Game-Boy-Original-Motherboard-1-Top.jpg') },
      { name: 'Placa Game Boy DMG · inferior', image: C('Nintendo-Game-Boy-Original-Motherboard-1-Bottom.jpg') },
      { name: 'Placa Game Boy Light · superior', image: C('Game-Boy-Light-Motherboard-Top.jpg') },
      { name: 'Placa Game Boy Light · inferior', image: C('Game-Boy-Light-Motherboard-Bottom.jpg') },
    ],
    [
      {
        title: 'Pantalla “vertical lines”',
        summary: 'Líneas verticales por el ribbon del LCD. Reflow del flat o cambio de pantalla.',
      },
      {
        title: 'Regulador / DC-DC',
        summary: 'No enciende o se apaga con vibración. Condensadores y reguladores envejecidos.',
      },
      dirtyCart,
      ageCaps,
    ],
  ),

  gbc: hw(
    [
      { name: 'Game Boy Color desmontada', image: C('Gameboy Color front disassembled 01-02-2012.jpg') },
    ],
    [
      {
        title: 'Pantalla / polarizer',
        summary: 'Pantalla oscura o manchas. Polarizadores degradados; mods IPS populares.',
      },
      dirtyCart,
      ageCaps,
    ],
  ),

  gba: hw(
    [
      { name: 'Placa GBA · frontal', image: C('Game Boy Advance motherboard front.jpg') },
      { name: 'CPU GBA', image: C('Game Boy Advance CPU.jpg') },
      { name: 'PCB Start/Select', image: C('Gameboy Advance PCB Start-Select.jpg') },
    ],
    [
      {
        title: 'Pantalla sin backlight (AGB)',
        summary: 'Difícil de ver sin luz. Mods IPS/backlight habituales.',
      },
      {
        title: 'Bisagra GBA SP',
        summary: 'Pantalla floja o cable flex roto en SP. Pieza clásica de reparación.',
      },
      {
        title: 'Batería SP hinchada',
        summary: 'Riesgo de dañar la carcasa. Sustituir por baterías de calidad.',
      },
      dirtyCart,
    ],
  ),

  ds: hw(
    [
      { name: 'Placa DS original · superior', image: C('Nintendo-DS-Mk1-Motherboard-Top.jpg') },
      { name: 'Placa DS original · inferior', image: C('Nintendo-DS-Mk1-Motherboard-Bottom.jpg') },
      { name: 'Placa DS Lite · superior', image: C('Nintendo-DS-Lite-Motherboard-Top.jpg') },
      { name: 'Placa DS Lite · inferior', image: C('Nintendo-DS-Lite-Motherboard-Bottom.jpg') },
    ],
    [
      {
        title: 'Bisagra / pantallas',
        summary: 'Dobles LCD y bisagra: pantallas rotas o con manchas de presión.',
      },
      ribbon,
      {
        title: 'Slot-1 / Slot-2',
        summary: 'No lee cartuchos DS o GBA. Suciedad o pines doblados.',
      },
      {
        title: 'Wi‑Fi (DS phat)',
        summary: 'Módulo Wi‑Fi defectuoso en primeros DS: error de conexión.',
      },
    ],
  ),

  '3ds': hw(
    [
      { name: 'Placa Nintendo 3DS', image: C('Nintendo 3DS Motherboard.png') },
      { name: 'NAND 3DS', image: C('Nintendo 3DS nand.png'), note: 'Almacenamiento interno' },
    ],
    [
      {
        title: 'Bisagra / 3D stereoscópico',
        summary: 'Pantallas o cámara 3D desalineadas tras caídas. El efecto 3D puede fallar.',
      },
      {
        title: 'Circle Pad',
        summary: 'Desgaste y drift del pad analógico.',
      },
      ribbon,
      {
        title: 'Wi‑Fi / NFC (New 3DS)',
        summary: 'Módulos que dejan de emparejar o leer amiibo.',
      },
    ],
  ),

  'virtual-boy': hw(
    [],
    [
      {
        title: 'Displays LED / mirrors',
        summary: 'Imagen oscura o muerta: paneles y óptica delicados y caros de reemplazar.',
      },
      {
        title: 'Stand / cable',
        summary: 'El soporte y el cableado fallan con el uso; piezas raras.',
      },
      ageCaps,
    ],
    'Pocas fotos públicas de PCB; hardware óptico muy específico.',
  ),

  ps1: hw(
    [
      { name: 'Placa SCPH-1000 · superior', image: C('Sony-PlayStation-SCPH-1000-Motherboard-Top.jpg') },
      { name: 'Placa SCPH-5502 · superior', image: C('Sony Playstation 1 SCPH-5502 motherboard top.jpg') },
      { name: 'Placa SCPH-7002 · inferior', image: C('Sony Playstation 1 SCPH-7002 motherboard bottom.jpg') },
      { name: 'Placa SCPH-9002 · superior', image: C('Sony Playstation 1 SCPH-9002 motherboard top.jpg') },
    ],
    [
      laserFail,
      {
        title: 'Engranajes blancos del laser',
        summary: 'Clásico: dientes rotos → el sled no enfoca. Kit de engranajes o drive completo.',
      },
      ageCaps,
      {
        title: 'Memoria / DualShock puertos',
        summary: 'Contactos sucios: memory cards no detectadas.',
      },
    ],
  ),

  ps2: hw(
    [
      { name: 'Placa PS2 slim · superior', image: C("PlayStation 2 slim's motherboard (top).png") },
      { name: 'Placa PS2 slim · inferior', image: C("PlayStation 2 slim's motherboard (bottom).png") },
      { name: 'Placa fat GH-019', image: C('SCPH-39001 Motherboard (PS2 GH-019).png') },
      { name: 'Placa GH-001', image: C('PS2 GH-001 Motherboard.png') },
    ],
    [
      laserFail,
      {
        title: 'Versiones de laser (fat vs slim)',
        summary: 'Cada chasis usa lasers distintos (KHS, etc.). Identificar modelo antes de pedir pieza.',
      },
      {
        title: 'Reloj / CMOS (algunos fat)',
        summary: 'Fecha incorrecta o problemas de arranque tras años aparcada.',
      },
      ageCaps,
    ],
  ),

  ps3: hw(
    [
      { name: 'Fuente PS3 APS-226', image: C('PS3-PSU-APS226-3.jpg'), note: 'PSU = punto caliente de fallos' },
    ],
    [
      {
        title: 'YLOD (Yellow Light of Death)',
        summary: 'Sobrecalentamiento / BGA de GPU-CPU (sobre todo fat 90/65 nm). Reball riesgoso; pasta y pads ayudan a prevenir.',
      },
      hddFail,
      laserFail,
      {
        title: 'NEC Tokin / condensadores',
        summary: 'En algunos modelos, fallos de alimentación ligados a módulos NEC Tokin.',
      },
      overheat,
    ],
  ),

  ps4: hw(
    [],
    [
      hddFail,
      overheat,
      {
        title: 'HDMI / puerto',
        summary: 'Sin imagen pero consola encendida: IC HDMI o puerto dañado (muy común).',
      },
      laserFail,
      joyRail,
    ],
    'Fotos Commons de PCB PS4 escasas; averías bien conocidas en talleres.',
  ),

  ps5: hw(
    [],
    [
      overheat,
      {
        title: 'Líquido de metal / disipación',
        summary: 'Fugas o aplicación irregular del liquid metal en reparaciones: cortos o mal contacto térmico.',
      },
      {
        title: 'Lector de discos (modelos con drive)',
        summary: 'Drive modular en Slim: fallos de lectura o conexión del cable.',
      },
      joyRail,
    ],
  ),

  psp: hw(
    [],
    [
      {
        title: 'Pantalla / flex UMD',
        summary: 'Pantallas rotas y lectores UMD caprichosos (suciedad, laser).',
      },
      {
        title: 'Joystick analógico',
        summary: 'Drift o stick hundido; módulo reemplazable.',
      },
      {
        title: 'Batería hinchada',
        summary: 'Hinchazón típica tras años guardada.',
      },
      ribbon,
    ],
  ),

  vita: hw(
    [],
    [
      {
        title: 'Pantalla OLED (PCH-1000)',
        summary: 'Quemados / burn-in y roturas caras.',
      },
      {
        title: 'Botones traseros / DualShock touch',
        summary: 'Fallos de flex en Slim y fat.',
      },
      {
        title: 'Ranura cartuchos / memoria',
        summary: 'Pins delicados; tarjetas propietarias caras.',
      },
    ],
  ),

  xbox: hw(
    [
      { name: 'CPU Xbox original', image: C('Xbox (Original) CPU (39452841025).jpg') },
    ],
    [
      hddFail,
      {
        title: 'Reloj / CMOS / EEPROM',
        summary: 'Errores de reloj y arranque; pilas y configuración de HDD.',
      },
      {
        title: 'Fuente / condensadores',
        summary: 'No enciende o reinicios: PSU y caps en placa.',
      },
      laserFail,
    ],
  ),

  '360': hw(
    [
      { name: 'Placa Xbox 360 S', image: C('Xbox 360 S, model 1439 - motherboard-0325.jpg') },
      { name: 'Detalle On Semi NCP4202', image: C('Xbox 360 S, model 1439 - motherboard - On Semiconductor NCP4202-0334.jpg') },
      { name: 'Detalle ISD chip', image: C('Xbox 360 S, model 1439 - motherboard - ISD 2115AYYI-0335.jpg') },
    ],
    [
      {
        title: 'RROD (Red Rings of Death)',
        summary: 'GPU/CPU BGA y estrés térmico en Xenon/Zephyr. Modelos posteriores (S/E) mucho más fiables.',
      },
      overheat,
      hddFail,
      {
        title: 'RF board / Wi‑Fi',
        summary: 'Mandos inalámbricos no vinculan; módulo RF suelto o muerto.',
      },
    ],
  ),

  'xbox-one': hw(
    [
      { name: 'Placa Xbox One · vista 1', image: C('Microsoft-Xbox-One-Motherboard-01.jpg') },
      { name: 'Placa Xbox One · vista 2', image: C('Microsoft-Xbox-One-Motherboard-02.jpg') },
      { name: 'Placa Xbox One · vista 3', image: C('Microsoft-Xbox-One-Motherboard-03.jpg') },
      { name: 'Placa Xbox One X', image: C('XBOX ONE X Motherboard.jpg') },
    ],
    [
      hddFail,
      overheat,
      {
        title: 'HDMI / Southbridge',
        summary: 'Sin señal de vídeo: fallos HDMI frecuentes, similares a PS4.',
      },
      {
        title: 'Kinect / fuente (modelo original)',
        summary: 'Fuente propietaria y Kinect con problemas de alimentación.',
      },
    ],
  ),

  'xbox-series': hw(
    [],
    [
      overheat,
      {
        title: 'Almacenamiento expansible',
        summary: 'Tarjetas Seagate/WD: fallos de contacto o firmware.',
      },
      {
        title: 'HDMI 2.1 / VRR',
        summary: 'Problemas de handshake con TVs antiguos o cables deficientes.',
      },
    ],
  ),

  genesis: hw(
    [
      { name: 'Placa Mega Drive / Genesis Mk2', image: C('Sega-Genesis-Mk2-Motherboard-01.jpg') },
      { name: 'Placa Mk2 · detalle', image: C('Sega-Genesis-Mk2-Motherboard-05.jpg') },
      { name: 'Placa Mk2 · zona cartucho', image: C('Sega-Genesis-Mk2-Motherboard-03.jpg') },
    ],
    [
      dirtyCart,
      ageCaps,
      {
        title: 'Región / TMSS',
        summary: 'Pantalla “Produced by or under license…” infinita o bloqueo regional.',
      },
      {
        title: 'Audio YM2612 / chips',
        summary: 'Canales de FM mudos o ruidosos: chips o condensadores de audio.',
      },
    ],
  ),

  sms: hw(
    [
      { name: 'Placa Master System Mk1 · flat', image: C('Sega-Master-System-Mk1-Motherboard-Flat-Top.jpg') },
      { name: 'Placa Master System Mk1 · FR', image: C('Sega-Master-System-Mk1-Motherboard-FR.jpg') },
      { name: 'Placa Master System Mk1 · FL', image: C('Sega-Master-System-Mk1-Motherboard-FL.jpg') },
    ],
    [
      dirtyCart,
      ageCaps,
      {
        title: 'RF / vídeo compuesto',
        summary: 'Señal pobre en TVs modernos; mods AV recomendados.',
      },
    ],
  ),

  saturn: hw(
    [
      { name: 'Placa Saturn VA-SG · superior', image: C('Sega-Saturn-Motherboard-Model-VASG-Top.jpg') },
      { name: 'Placa Saturn VA-SG · inferior', image: C('Sega-Saturn-Motherboard-Model-VASG-Bottom.jpg') },
      { name: 'Placa Saturn VA8 · inferior', image: C('Sega-Saturn-Motherboard-Model-VA8-Bottom.jpg') },
      { name: 'Placa Saturn US M2', image: C('Sega-Saturn-US-Motherboard-M2-01.jpg') },
    ],
    [
      laserFail,
      {
        title: 'Engranajes / bandeja',
        summary: 'Mecanismo CD frágil; plásticos quebradizos con la edad.',
      },
      ageCaps,
      {
        title: 'Fuente interna',
        summary: 'Fusibles y caps de la PSU: no enciende o se reinicia.',
      },
    ],
  ),

  dreamcast: hw(
    [
      { name: 'Placa Dreamcast · superior', image: C('Sega-Dreamcast-Motherboard-Top.jpg') },
      { name: 'Placa Dreamcast · inferior', image: C('Sega-Dreamcast-Motherboard-Bottom.jpg') },
      { name: 'Broadband Adapter · PCB', image: C('Sega-Dreamcast-Broadband-Adapter-Motherboard-B.jpg') },
      { name: 'Modem dial-up · PCB', image: C('Sega-Dreamcast-Modem-Dialup-Motherboard-B.jpg') },
    ],
    [
      laserFail,
      {
        title: 'Reloj de tiempo real / pila',
        summary: 'Fecha incorrecta y problemas con VMU/hora.',
      },
      {
        title: 'Fuente “brick”',
        summary: 'Fuentes originales fallan; hay clones modernos.',
      },
      ageCaps,
    ],
  ),

  'game-gear': hw(
    [],
    [
      {
        title: 'Condensadores (recap obligatorio)',
        summary: 'Casi todas las Game Gear necesitan recap: no imagen, colores raros o no enciende.',
      },
      {
        title: 'Pantalla LCD',
        summary: 'Pantallas originales fallan; kits IPS muy usados.',
      },
      {
        title: 'Consumo de baterías',
        summary: '6×AA: contactos oxidados y alto consumo.',
      },
    ],
  ),

  'sega-cd': hw(
    [],
    [
      laserFail,
      {
        title: 'Conexión con Mega Drive',
        summary: 'Bus/expansión sucio: no detecta el add-on.',
      },
      ageCaps,
    ],
  ),

  '32x': hw(
    [],
    [
      {
        title: 'Conexión cartucho / apilado',
        summary: 'Mal asiento con MD+CD: pantallas negras.',
      },
      ageCaps,
      overheat,
    ],
  ),

  '2600': hw(
    [],
    [
      dirtyCart,
      ageCaps,
      {
        title: 'Switches / RF',
        summary: 'Selectores oxidados y modulador RF débil en TVs LCD.',
      },
      {
        title: 'Joysticks CX-40',
        summary: 'Contactos de fuego/dirección gastados.',
      },
    ],
  ),

  '5200': hw(
    [],
    [
      {
        title: 'Mandos analógicos',
        summary: 'Potenciómetros y cables helicoidales: fallos crónicos.',
      },
      dirtyCart,
      ageCaps,
    ],
  ),

  '7800': hw(
    [],
    [
      dirtyCart,
      ageCaps,
      {
        title: 'Compatibilidad 2600',
        summary: 'Algunos carts 2600 fallan por suciedad o revisiones.',
      },
    ],
  ),

  jaguar: hw(
    [],
    [
      dirtyCart,
      ageCaps,
      {
        title: 'Fuente / calor',
        summary: 'Consola grande que se calienta; PSU externa crítica.',
      },
    ],
  ),

  lynx: hw(
    [],
    [
      {
        title: 'Pantalla / backlight',
        summary: 'CCFL y LCD frágiles; contrastes muertos.',
      },
      {
        title: 'Compartment de baterías',
        summary: 'Ácido de pilas corroe contactos y PCB.',
      },
      ageCaps,
    ],
  ),

  neogeo: hw(
    [],
    [
      dirtyCart,
      {
        title: 'Cartuchos pesados / slots',
        summary: 'AES/MVS: pines doblados por carts enormes.',
      },
      {
        title: 'Backup battery (carts)',
        summary: 'Muchos carts pierden saves al morir la pila.',
      },
      ageCaps,
    ],
  ),

  ngp: hw(
    [],
    [
      {
        title: 'Pantalla / carcasa',
        summary: 'LCD frágil y bisagras/carcasas quebradizas.',
      },
      dirtyCart,
      {
        title: 'Batería',
        summary: 'Contactos y autonomía; pilas AAA.',
      },
    ],
  ),

  pce: hw(
    [],
    [
      dirtyCart,
      ageCaps,
      {
        title: 'Fuente HuCard / CD add-ons',
        summary: 'Fuentes raras y unidades CD delicadas (Duo, CD-ROM²).',
      },
      laserFail,
    ],
  ),

  'pc-fx': hw(
    [],
    [
      laserFail,
      ageCaps,
      {
        title: 'Mecanismo de torre CD',
        summary: 'Bandeja vertical propensa a fallos mecánicos.',
      },
    ],
  ),

  '3do': hw(
    [],
    [
      laserFail,
      ageCaps,
      {
        title: 'Mandos / expansión',
        summary: 'Cadenas de mandos y puertos flojos.',
      },
    ],
  ),

  cdi: hw(
    [],
    [
      laserFail,
      ageCaps,
      {
        title: 'Firmware / discos propietarios',
        summary: 'Lectura caprichosa y piezas difíciles.',
      },
    ],
  ),

  amiga: hw(
    [],
    [
      ageCaps,
      {
        title: 'Floppy / heads',
        summary: 'DF0 sucia o desalineada: no lee Workbench ni juegos.',
      },
      {
        title: 'CIA / Paula / Denise',
        summary: 'Chips custom fallidos: sin audio, sin floppy o vídeo muerto.',
      },
      batterySave,
    ],
  ),

  c64: hw(
    [],
    [
      ageCaps,
      {
        title: 'PLA / SID / VIC-II',
        summary: 'Chips propietarios que fallan: pantalla negra, audio SID malo.',
      },
      {
        title: 'Fuente de 9V AC',
        summary: 'Fuentes originales peligrosas al fallar; usar modernas reguladas.',
      },
      dirtyCart,
    ],
  ),

  spectrum: hw(
    [],
    [
      ageCaps,
      {
        title: 'Membrana del teclado',
        summary: 'Teclas muertas: membranas nuevas o reparación.',
      },
      {
        title: 'Modulador RF / ULA',
        summary: 'Vídeo pobre; ULA defectuosa = colores o sync rotos.',
      },
    ],
  ),

  'steam-deck': hw(
    [],
    [
      joyRail,
      {
        title: 'Desgaste APU / vapor chamber',
        summary: 'Throttling si pasta/pads secos; limpieza periódica.',
      },
      {
        title: 'Botones / tracks / pantalla',
        summary: 'Desgaste mecánico de portátil gaming intensivo.',
      },
    ],
  ),

  arcade: hw(
    [],
    [
      {
        title: 'Condensadores PSU / monitores CRT',
        summary: 'Fuentes arcade y CRT: alto voltaje y caps hinchados. Solo personal cualificado.',
      },
      {
        title: 'Edge connector JAMMA',
        summary: 'Óxido en el edge: juegos que no arrancan o mandos locos.',
      },
      {
        title: 'Baterías SRAM / settings',
        summary: 'Pérdida de high scores y calibración.',
      },
    ],
  ),
}

/** Averías genéricas si la familia no tiene ficha dedicada. */
const FALLBACK_BY_TYPE: Record<string, PlatformFailure[]> = {
  home: [ageCaps, dirtyCart, laserFail, overheat],
  handheld: [ageCaps, dirtyCart, ribbon, batterySave],
  hybrid: [joyRail, ribbon, overheat],
  computer: [ageCaps, { title: 'Almacenamiento / PSU', summary: 'Discos, fuentes y condensadores son los fallos más comunes en PCs retro.' }],
  mobile: [{ title: 'Batería / pantalla', summary: 'Piezas de desgaste típicas; software y cuentas también limitan el uso a largo plazo.' }],
  vr: [{ title: 'Lentes / tracking / cableado', summary: 'Arañazos en lentes, tracking perdido y cables/breakout boxes frágiles.' }],
  arcade: PLATFORM_HARDWARE.arcade.failures,
  cloud: [{ title: 'Servicio / cuenta / red', summary: 'No hay PCB local: caídas de servidor, DRM y requisitos de red.' }],
}

export function hardwareForPlatform(platform: Platform): PlatformHardware {
  const specific = PLATFORM_HARDWARE[platform.family]
  if (specific) return specific
  return {
    internals: [],
    failures: FALLBACK_BY_TYPE[platform.type] ?? [ageCaps],
    notes:
      platform.type === 'cloud' || platform.type === 'mobile'
        ? 'Plataforma sin hardware de consola clásico que documentar en PCB.'
        : 'Aún no hay fotos de PCB indexadas para esta familia; se listan averías típicas del tipo de máquina.',
  }
}
