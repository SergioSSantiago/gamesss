import { useState } from 'react'

export function PlatformPhoto({
  src,
  name,
  className = '',
}: {
  src: string
  name: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`platform-photo fallback ${className}`} aria-hidden>
        <span>{name}</span>
      </div>
    )
  }
  return (
    <img
      className={`platform-photo ${className}`}
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
