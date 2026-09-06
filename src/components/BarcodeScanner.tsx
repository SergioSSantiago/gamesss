import { useEffect, useRef, useState } from 'react'

type Props = {
  onDetected: (code: string) => void
  active: boolean
}

type BarcodeDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<{ rawValue: string; format: string }[]>
}

type ZxingControls = { stop: () => void }

function getNativeDetector(): BarcodeDetectorLike | null {
  const BD = (window as unknown as { BarcodeDetector?: new (opts?: { formats: string[] }) => BarcodeDetectorLike })
    .BarcodeDetector
  if (!BD) return null
  try {
    return new BD({
      formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'],
    })
  } catch {
    return null
  }
}

/** Cámara + BarcodeDetector nativo, con fallback ZXing (import dinámico). */
export function BarcodeScanner({ onDetected, active }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const onDetectedRef = useRef(onDetected)
  const [error, setError] = useState('')
  const [engine, setEngine] = useState<'native' | 'zxing' | ''>('')
  const lastRef = useRef('')
  const cooldownRef = useRef(0)

  useEffect(() => {
    onDetectedRef.current = onDetected
  }, [onDetected])

  useEffect(() => {
    if (!active) return

    let stream: MediaStream | null = null
    let raf = 0
    let controls: ZxingControls | null = null
    let cancelled = false

    function emit(code: string) {
      const digits = code.replace(/\D/g, '')
      if (digits.length < 8) return
      const now = Date.now()
      if (digits === lastRef.current && now - cooldownRef.current < 2500) return
      lastRef.current = digits
      cooldownRef.current = now
      onDetectedRef.current(digits)
    }

    async function startNative(detector: BarcodeDetectorLike) {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      if (cancelled || !videoRef.current) {
        stream.getTracks().forEach((t) => t.stop())
        return
      }
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setEngine('native')

      const tick = async () => {
        if (cancelled || !videoRef.current) return
        try {
          if (videoRef.current.readyState >= 2) {
            const codes = await detector.detect(videoRef.current)
            if (codes[0]?.rawValue) emit(codes[0].rawValue)
          }
        } catch {
          /* frame skip */
        }
        raf = requestAnimationFrame(() => {
          void tick()
        })
      }
      void tick()
    }

    async function startZxing() {
      const [{ BrowserMultiFormatReader }, { BarcodeFormat, DecodeHintType }] = await Promise.all([
        import('@zxing/browser'),
        import('@zxing/library'),
      ])
      if (cancelled || !videoRef.current) return

      const hints = new Map()
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.CODE_128,
      ])
      hints.set(DecodeHintType.TRY_HARDER, true)
      const reader = new BrowserMultiFormatReader(hints)
      setEngine('zxing')
      controls = await reader.decodeFromConstraints(
        {
          audio: false,
          video: { facingMode: { ideal: 'environment' } },
        },
        videoRef.current,
        (result) => {
          if (result) emit(result.getText())
        },
      )
    }

    ;(async () => {
      setError('')
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setError('Este navegador no permite usar la cámara.')
          return
        }
        const native = getNativeDetector()
        if (native) await startNative(native)
        else await startZxing()
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'No se pudo abrir la cámara'
        setError(
          /Permission|NotAllowed|denied/i.test(msg)
            ? 'Permiso de cámara denegado. Puedes escribir el código a mano.'
            : msg,
        )
      }
    })()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      controls?.stop()
      stream?.getTracks().forEach((t) => t.stop())
      if (videoRef.current) videoRef.current.srcObject = null
      setEngine('')
    }
  }, [active])

  return (
    <div className="scan-stage">
      <div className="scan-video-wrap">
        <video ref={videoRef} className="scan-video" playsInline muted autoPlay />
        <div className="scan-frame" aria-hidden />
      </div>
      {engine && (
        <p className="scan-engine">
          Lector: {engine === 'native' ? 'BarcodeDetector' : 'ZXing'} · acerca el código de la caja
        </p>
      )}
      {error && <p className="empty">{error}</p>}
    </div>
  )
}
