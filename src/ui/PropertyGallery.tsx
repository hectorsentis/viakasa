'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import type { PropertyImage } from '@/src/lib/content'

type Props = {
  mainImage: PropertyImage
  gallery: PropertyImage[]
  title: string
  locale?: 'es' | 'en'
}

export function PropertyGallery({ mainImage, gallery, title, locale = 'es' }: Props) {
  const images = useMemo(() => {
    const seen = new Set<string>()
    return [mainImage, ...gallery].filter((image) => {
      if (!image.url || seen.has(image.url)) return false
      seen.add(image.url)
      return true
    })
  }, [mainImage, gallery])
  const [selectedURL, setSelectedURL] = useState(mainImage.url)
  const selected = images.find((image) => image.url === selectedURL) || mainImage
  const label = locale === 'en' ? 'Property photos' : 'Fotos de la propiedad'
  const show = locale === 'en' ? 'Show photo' : 'Mostrar foto'

  return <div className="gallery" aria-label={label}>
    <div className="gallery-main-frame">
      <Image className="gallery-main" src={selected.url} alt={selected.alt || title} width={1200} height={760} priority />
    </div>
    <div className="gallery-thumbs" role="group" aria-label={label}>
      {images.map((image, index) => <button
        className={`gallery-thumb-button${selected.url === image.url ? ' is-selected' : ''}`}
        key={image.url}
        type="button"
        aria-label={`${show} ${index + 1}: ${image.alt || title}`}
        aria-pressed={selected.url === image.url}
        onClick={() => setSelectedURL(image.url)}
      >
        <Image className="gallery-thumb" src={image.url} alt="" width={360} height={220} />
      </button>)}
    </div>
  </div>
}
