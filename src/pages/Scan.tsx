import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BarcodeScanner } from '../components/BarcodeScanner'
import { CoverPhotoCapture } from '../components/CoverPhotoCapture'
import { GamePoster, PosterSkeleton } from '../components/GamePoster'
import { isLikelyBarcode, lookupBarcode, type BarcodeLookupResult } from '../lib/barcode'
import { identifyCoverPhoto, type CoverOcrResult } from '../lib/coverOcr'
import { searchGames } from '../lib/wikidata'
import type { GameSummary } from '../types'

type Mode = 'barcode' | 'photo'

export function Scan() {
  const [mode, setMode] = useState<Mode>('barcode')
  const [cameraOn, setCameraOn] = useState(true)
  const [manual, setManual] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<BarcodeLookupResult | null>(null)
  const [photo, setPhoto] = useState<CoverOcrResult | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [titleEdit, setTitleEdit] = useState('')
  const [fallbackQ, setFallbackQ] = useState('')
  const [games, setGames] = useState<GameSummary[] | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function resetResults() {
    setResult(null)
    setPhoto(null)
    setGames(null)
    setError('')
    setStatus('')
    setFallbackQ('')
    setTitleEdit('')
  }

  function switchMode(next: Mode) {
    setMode(next)
    setCameraOn(true)
    resetResults()
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
    }
  }

  const resolveBarcode = useCallback(async (code: string) => {
    const digits = code.replace(/\D/g, '')
    if (!isLikelyBarcode(digits)) {
      setError('Código no válido (hace falta un UPC/EAN de 8–14 dígitos).')
      return
    }
    setBusy(true)
    setError('')
    setStatus('Consultando ScanDex y el catálogo…')
    setResult(null)
    setPhoto(null)
    setGames(null)
    setFallbackQ('')
    setCameraOn(false)
    try {
      const found = await lookupBarcode(digits)
      setResult(found)
      setGames(found.games)
      if (found.hit) {
        setFallbackQ(found.query || found.hit.productName)
      }
      if (!found.hit) {
        setError(
          `No hay ficha para ${digits} en ScanDex / Wikidata / Open Products Facts. Escribe el título a mano.`,
        )
      } else if (found.games.length === 0) {
        setError(
          `Encontrado: “${found.hit.productName}”${found.hit.platform ? ` (${found.hit.platform})` : ''}, pero no hubo match en el catálogo. Corrige el título.`,
        )
      }
    } catch {
      setError('No se pudo resolver el código ahora. Reintenta o busca por título.')
    } finally {
      setBusy(false)
      setStatus('')
    }
  }, [])

  async function onPhotoCapture(blob: Blob, url: string) {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(url)
    setCameraOn(false)
    setBusy(true)
    setError('')
    setStatus('Leyendo texto de la carátula (OCR)…')
    setResult(null)
    setGames(null)
    try {
      const found = await identifyCoverPhoto(blob)
      setPhoto(found)
      setTitleEdit(found.best)
      setGames(found.games)
      if (!found.best) {
        setError('No se pudo leer un título. Escribe lo que ves en la caja.')
        setFallbackQ('')
      } else if (found.games.length === 0) {
        setError(`OCR: “${found.best}”, sin match. Corrige el título y busca de nuevo.`)
        setFallbackQ(found.best)
      }
    } catch {
      setError('Falló el OCR. Prueba otra foto con más luz o escribe el título.')
    } finally {
      setBusy(false)
      setStatus('')
    }
  }

  function submitManualBarcode(e: FormEvent) {
    e.preventDefault()
    void resolveBarcode(manual.trim())
  }

  async function searchByTitle(e: FormEvent) {
    e.preventDefault()
    const q = (titleEdit.trim() || fallbackQ.trim())
    if (!q) return
    setBusy(true)
    setError('')
    setStatus('Buscando en el catálogo…')
    try {
      const list = await searchGames(q, 24)
      setGames(list)
      setPhoto((prev) =>
        prev ? { ...prev, best: q, games: list } : prev,
      )
      setResult((prev) =>
        prev
          ? { ...prev, query: q, games: list }
          : null,
      )
      if (list.length === 0) setError(`Nada con “${q}”.`)
    } catch {
      setError('Búsqueda fallida.')
    } finally {
      setBusy(false)
      setStatus('')
    }
  }

  const showTitleForm =
    mode === 'photo' ||
    (result && result.games.length === 0) ||
    (!result?.hit && mode === 'barcode' && !cameraOn && !busy)

  return (
    <div className="page">
      <div className="hero">
        <h1>Añadir desde la caja</h1>
        <p>
          Escanea el código de barras (ScanDex → catálogo) o haz una foto de la carátula: te
          devolvemos el juego para abrirlo y registrarlo.
        </p>
      </div>

      <div className="status-pills" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className={mode === 'barcode' ? 'on' : ''}
          onClick={() => switchMode('barcode')}
        >
          Código de barras
        </button>
        <button
          type="button"
          className={mode === 'photo' ? 'on' : ''}
          onClick={() => switchMode('photo')}
        >
          Foto carátula
        </button>
      </div>

      {mode === 'barcode' && (
        <>
          <div className="scan-toolbar">
            <button
              type="button"
              className={`btn ${cameraOn ? '' : 'ghost'}`}
              onClick={() => {
                resetResults()
                setCameraOn(true)
              }}
              disabled={busy}
            >
              Cámara
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setCameraOn(false)}
              disabled={busy}
            >
              Pausar
            </button>
            <Link className="btn ghost" to="/games">
              Buscar por título
            </Link>
          </div>

          {cameraOn && !busy && (
            <BarcodeScanner active={cameraOn} onDetected={(c) => void resolveBarcode(c)} />
          )}

          <form onSubmit={submitManualBarcode} className="filters scan-manual">
            <div className="field" style={{ flex: 1, minWidth: 220 }}>
              <label>O escribe el código</label>
              <input
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                inputMode="numeric"
                placeholder="045496420246…"
                autoComplete="off"
              />
            </div>
            <div className="field" style={{ justifyContent: 'end' }}>
              <label>&nbsp;</label>
              <button className="btn" type="submit" disabled={busy}>
                Buscar código
              </button>
            </div>
          </form>
        </>
      )}

      {mode === 'photo' && (
        <>
          <div className="scan-toolbar">
            <button
              type="button"
              className={`btn ${cameraOn ? '' : 'ghost'}`}
              onClick={() => {
                resetResults()
                if (previewUrl) {
                  URL.revokeObjectURL(previewUrl)
                  setPreviewUrl('')
                }
                setCameraOn(true)
              }}
              disabled={busy}
            >
              Nueva foto
            </button>
            <Link className="btn ghost" to="/games">
              Buscar por título
            </Link>
          </div>

          {cameraOn && !busy && !previewUrl && (
            <CoverPhotoCapture active={cameraOn} onCapture={(b, u) => void onPhotoCapture(b, u)} />
          )}

          {previewUrl && (
            <figure className="cover-preview">
              <img src={previewUrl} alt="Foto de la carátula" />
              <figcaption>Foto capturada · OCR en curso o listo abajo</figcaption>
            </figure>
          )}
        </>
      )}

      {busy && (
        <>
          <p className="empty">{status || 'Trabajando…'}</p>
          <PosterSkeleton count={6} />
        </>
      )}

      {error && <p className="empty">{error}</p>}

      {result?.hit && (
        <div className="scan-result-meta">
          <span className="chip">{result.barcode}</span>
          <span className="chip">{result.hit.source}</span>
          {result.hit.platform && <span className="chip">{result.hit.platform}</span>}
          <strong>{result.hit.productName}</strong>
          {result.hit.igdbId != null && (
            <span className="scan-query">IGDB #{result.hit.igdbId}</span>
          )}
          {result.query && result.query !== result.hit.productName && (
            <span className="scan-query">→ búsqueda: {result.query}</span>
          )}
        </div>
      )}

      {photo && (
        <div className="scan-result-meta">
          <span className="chip">OCR</span>
          {photo.candidates.slice(0, 4).map((c) => (
            <button
              key={c}
              type="button"
              className={`chip chip-btn ${c === titleEdit ? 'on' : ''}`}
              onClick={() => setTitleEdit(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {(showTitleForm || (photo && photo.candidates.length > 0)) && (
        <form onSubmit={searchByTitle} className="filters">
          <div className="field" style={{ flex: 1, minWidth: 220 }}>
            <label>{mode === 'photo' ? 'Título leído (editable)' : 'Buscar título en el catálogo'}</label>
            <input
              value={mode === 'photo' ? titleEdit : fallbackQ}
              onChange={(e) =>
                mode === 'photo' ? setTitleEdit(e.target.value) : setFallbackQ(e.target.value)
              }
              placeholder="Mario Kart 8 Deluxe…"
            />
          </div>
          <div className="field" style={{ justifyContent: 'end' }}>
            <label>&nbsp;</label>
            <button
              className="btn"
              type="submit"
              disabled={busy || !(mode === 'photo' ? titleEdit.trim() : fallbackQ.trim())}
            >
              Buscar
            </button>
          </div>
        </form>
      )}

      {games && games.length > 0 && (
        <>
          <div className="section-head">
            <h2>Elige el juego para abrirlo y registrarlo</h2>
          </div>
          <div className="grid-posters">
            {games.map((game) => (
              <GamePoster key={game.id} game={game} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
