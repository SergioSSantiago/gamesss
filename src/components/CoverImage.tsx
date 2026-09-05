import { useState } from 'react'

export function CoverImage({
  name,
  image,
  covers,
}: {
  name: string
  image: string | null
  covers?: string[]
}) {
  const urls = covers?.length ? covers : image ? [image] : []
  const [index, setIndex] = useState(0)
  const src = urls[index]

  if (!src) {
    return <div className="poster-fallback">{name}</div>
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setIndex((i) => i + 1)}
    />
  )
}
