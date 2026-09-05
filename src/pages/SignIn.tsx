import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'

export function SignIn() {
  const { signIn, users } = useLibrary()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    try {
      const user = signIn(username, displayName)
      navigate(`/u/${user.username}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo entrar')
    }
  }

  return (
    <div className="page">
      <form className="sign-box" onSubmit={submit}>
        <h1 style={{ marginTop: 0 }}>Entra en gamesss</h1>
        <p style={{ color: 'var(--muted)' }}>
          Un perfil local en este navegador. Sin contraseña: es tu diario.
        </p>
        <div className="field" style={{ marginBottom: 12 }}>
          <label>Usuario</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="neskid" autoFocus />
        </div>
        <div className="field" style={{ marginBottom: 16 }}>
          <label>Nombre (opcional)</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Cómo te llamamos" />
        </div>
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        <button className="btn" type="submit">Crear o entrar</button>
        {users.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <p className="game-kicker">En este dispositivo</p>
            {users.map((u) => (
              <button
                key={u.id}
                type="button"
                className="btn ghost"
                style={{ margin: '6px 6px 0 0' }}
                onClick={() => {
                  signIn(u.username)
                  navigate(`/u/${u.username}`)
                }}
              >
                {u.username}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}
