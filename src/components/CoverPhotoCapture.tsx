import { useEffect, useRef, useState } from 'react'

type Props = {
  onCapture: (blob: Blob, previewUrl: string) => void
  active: boolean
}

/** Vista previa de cámara + disparo / galería para fotos de carátula. */
export function CoverPhotoCapture({ onCapture, active }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!active) return
    let stream: MediaStream | null = null
    let cancelled = false

    ;(async () => {
      setError('')
      setReady(false)
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setError('Este navegador no permite usar la cámara. Sube una foto de la galería.')
          return
        }
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1600 },
            height: { ideal: 1200 },
          },
        })
        if (cancelled || !videoRef.current) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setReady(true)
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'No se pudo abrir la cámara'
        setError(
          /Permission|NotAllowed|denied/i.test(msg)
            ? 'Permiso de cámara denegado. Puedes subir una foto de la galería.'
            : msg,
        )
      }
    })()

    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
      if (videoRef.current) videoRef.current.srcObject = null
      setReady(false)
    }
  }, [active])

  async function shoot() {
    const video = videoRef.current
    if (!video || video.readyState < 2) return
    const w = video.videoWidth
    const h = video.videoHeight
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, w, h)
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92),
    )
    if (!blob) return
    onCapture(blob, URL.createObjectURL(blob))
  }

  function onFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    onCapture(file, URL.createObjectURL(file))
  }

  return (
    <div className="scan-stage">
      <div className="scan-video-wrap cover-photo-wrap">
        <video ref={videoRef} className="scan-video" playsInline muted autoPlay />
        <div className="cover-photo-guide" aria-hidden />
      </div>
      <p className="scan-engine">Encuadra la carátula entera, con buena luz. Evita reflejos.</p>
      {error && <p className="empty">{error}</p>}
      <div className="scan-toolbar">
        <button type="button" className="btn" onClick={() => void shoot()} disabled={!ready}>
          Hacer foto
        </button>
        <button type="button" className="btn ghost" onClick={() => fileRef.current?.click()}>
          Galería
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>
    </div>
  )
}
