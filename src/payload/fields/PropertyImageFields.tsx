'use client'

import { upload } from '@vercel/blob/client'
import { Button, useConfig, useField } from '@payloadcms/ui'
import Image from 'next/image'
import { formatAdminURL } from 'payload/shared'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const MAX_SIZE = 20 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

type MediaRecord = { id: string | number; filename?: string; url?: string; alt?: string; altEn?: string }
type QueuedImage = { key: string; file: File; preview: string; alt: string; altEn: string; progress: number; status: string }

function useAdminURLs() {
  const { config: { routes: { api: apiRoute }, serverURL } } = useConfig()
  return useCallback((path: string) => formatAdminURL({ apiRoute, path: path as `/${string}`, serverURL }), [apiRoute, serverURL])
}

function messageFrom(response: Response, body: any) {
  return body?.errors?.[0]?.message || body?.message || `No se pudo guardar la imagen (${response.status}).`
}

function useQueue() {
  const [files, setFiles] = useState<QueuedImage[]>([])
  const filesRef = useRef(files)
  const [error, setError] = useState('')
  useEffect(() => { filesRef.current = files }, [files])
  const add = (list: FileList | null, replace = false) => {
    setError('')
    const incoming = Array.from(list || [])
    const additions: QueuedImage[] = []
    for (const file of incoming) {
      if (!ALLOWED_TYPES.includes(file.type)) { setError('Formato no permitido. Usa JPG, PNG, WebP o AVIF.'); continue }
      if (file.size > MAX_SIZE) { setError(`${file.name} supera el límite de 20 MB.`); continue }
      const key = `${file.name}:${file.size}:${file.lastModified}`
      if ((!replace && files.some((item) => item.key === key)) || additions.some((item) => item.key === key)) continue
      const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
      additions.push({ key, file, preview: URL.createObjectURL(file), alt, altEn: alt, progress: 0, status: 'Pendiente de guardar' })
    }
    if (additions.length) {
      if (replace) files.forEach((item) => URL.revokeObjectURL(item.preview))
      setFiles((current) => replace ? additions : [...current, ...additions])
    }
  }
  const remove = (key: string) => setFiles((current) => {
    const removed = current.find((item) => item.key === key)
    if (removed) URL.revokeObjectURL(removed.preview)
    return current.filter((item) => item.key !== key)
  })
  useEffect(() => () => filesRef.current.forEach((item) => URL.revokeObjectURL(item.preview)), [])
  return { files, setFiles, error, setError, add, remove }
}

async function saveOne(item: QueuedImage, urls: (path: string) => string, setStatus: (status: string, progress: number) => void) {
  const endpoint = urls('/vercel-blob-client-upload-route')
  setStatus('Subiendo a Blob…', 0)
  const blob = await upload(item.file.name, item.file, {
    access: 'public', clientPayload: 'media', contentType: item.file.type, handleUploadUrl: endpoint,
    onUploadProgress: ({ percentage }) => setStatus(`Subiendo a Blob… ${Math.round(percentage)}%`, percentage)
  })
  const filename = decodeURIComponent(blob.pathname.split('/').pop() || item.file.name)
  setStatus('Creando registro Media…', 100)
  const form = new FormData()
  form.append('_payload', JSON.stringify({ alt: item.alt.trim() || filename, altEn: item.altEn.trim() || filename, blobUrl: blob.url, blobPathname: blob.pathname }))
  form.append('file', JSON.stringify({ clientUploadContext: { prefix: '' }, collectionSlug: 'media', filename, mimeType: item.file.type, size: item.file.size }))
  let response: Response | null = null
  let body: any = {}
  try {
    response = await fetch(urls('/media'), { method: 'POST', body: form, credentials: 'include' })
    body = await response.json().catch(() => ({}))
  } catch {
    // A network failure may happen after Payload committed the Media record.
  }
  if (!response?.ok) {
    const registered = await fetch(`${urls('/media')}?where[filename][equals]=${encodeURIComponent(filename)}&limit=1&depth=0`, { credentials: 'include' }).then((res) => res.ok ? res.json() : null).catch(() => null)
    if (registered?.docs?.[0]) return registered.docs[0] as MediaRecord
    const cleanup = await fetch('/api/blob-cleanup', {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: blob.url })
    }).catch(() => null)
    const cleanupBody = cleanup ? await cleanup.json().catch(() => ({})) : {}
    const cleanupWarning = cleanup?.ok ? '' : ` La limpieza de Blob no se confirmó: ${cleanupBody?.message || 'reintenta o contacta con soporte.'}`
    throw new Error(`${response ? messageFrom(response, body) : 'No se pudo confirmar el registro de la imagen.'}${cleanupWarning}`)
  }
  return body.doc as MediaRecord
}

function ImageQueue({ queue, disabled, onAdd, onRemove, onAlt, onAltEn }: {
  queue: ReturnType<typeof useQueue>; disabled: boolean; onAdd: (files: FileList | null) => void;
  onRemove: (key: string) => void; onAlt?: (key: string, alt: string) => void; onAltEn?: (key: string, alt: string) => void
}) {
  return <div className="property-image-manager">
    <label className="property-image-picker">Seleccionar {onAlt ? 'una o varias imágenes' : 'una imagen'}
      <input type="file" accept={ALLOWED_TYPES.join(',')} multiple={Boolean(onAlt)} disabled={disabled} onChange={(event) => { onAdd(event.currentTarget.files); event.currentTarget.value = '' }} />
    </label>
    <p className="property-image-hint">JPG, PNG, WebP o AVIF. Máximo 20 MB por imagen.</p>
    {queue.error && <p className="property-image-error" role="alert">{queue.error}</p>}
    {!!queue.files.length && <ul className="property-image-queue">{queue.files.map((item) => <li className="property-image-item" key={item.key}>
      {/* Local preview only; Blob URL is shown after Media has been created. */}
      <Image src={item.preview} alt="Vista previa de imagen" width={92} height={68} unoptimized />
      <div className="property-image-item-body">
        {onAlt && <label>Texto alternativo<input value={item.alt} onChange={(event) => onAlt(item.key, event.target.value)} disabled={disabled} /></label>}
        {onAlt && <label>Alternative text (English)<input value={item.altEn} onChange={(event) => onAltEn?.(item.key, event.target.value)} disabled={disabled} /></label>}
        <span>{item.file.name}</span>
        <span aria-live="polite">{item.status}</span>
        {item.status.startsWith('Subiendo') && <progress max={100} value={item.progress} aria-label={`Subida ${item.progress}%`} />}
      </div>
      <Button buttonStyle="secondary" size="small" type="button" disabled={disabled || item.status.startsWith('Subiendo') || item.status.startsWith('Creando')} onClick={() => onRemove(item.key)}>Quitar</Button>
    </li>)}</ul>}
  </div>
}

function SavedPreview({ record, label }: { record: MediaRecord | null; label: string }) {
  if (!record) return <p className="property-image-hint">Aún no hay imagen guardada.</p>
  return <div className="property-image-saved"><Image src={record.url || ''} alt={record.alt || label} width={92} height={68} unoptimized /><span>{record.filename || label}</span></div>
}

export function MainImageField({ path }: { path: string }) {
  const { value, setValue } = useField<string | number | MediaRecord | null>({ path })
  const urls = useAdminURLs()
  const queue = useQueue()
  const [savedRecord, setSavedRecord] = useState<MediaRecord | null>(null)
  const saved = (typeof value === 'object' && value ? value : savedRecord) as MediaRecord | null
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  useEffect(() => {
    if (!value || typeof value === 'object') return
    let active = true
    fetch(urls(`/media/${value}?depth=0`), { credentials: 'include' }).then((res) => res.ok ? res.json() : null).then((doc) => { if (active && doc) setSavedRecord(doc) }).catch(() => undefined)
    return () => { active = false }
  }, [value, urls])
  const setQueued = (key: string, changes: Partial<QueuedImage>) => queue.setFiles((items) => items.map((item) => item.key === key ? { ...item, ...changes } : item))
  const save = async () => {
    const item = queue.files[0]
    if (!item) return
    setBusy(true); setStatus('')
    try {
      const record = await saveOne(item, urls, (label, progress) => setQueued(item.key, { status: label, progress }))
      setValue(record.id); setSavedRecord(record); setStatus('Imagen principal guardada. Guarda la propiedad para publicar el cambio.')
      queue.remove(item.key)
    } catch (cause) {
      const error = cause instanceof Error ? cause.message : 'No se pudo guardar la imagen.'
      setQueued(item.key, { status: 'Error. Puedes reintentar.' }); queue.setError(error)
    } finally { setBusy(false) }
  }
  return <section className="property-image-section" aria-labelledby={`${path}-heading`}>
    <h3 id={`${path}-heading`}>Imagen principal</h3>
    <SavedPreview record={saved} label="Imagen principal" />
    <ImageQueue queue={queue} disabled={busy} onAdd={(files) => queue.add(files, true)} onRemove={queue.remove} onAlt={(key, alt) => setQueued(key, { alt })} onAltEn={(key, altEn) => setQueued(key, { altEn })} />
    <div className="property-image-actions"><Button type="button" buttonStyle="primary" disabled={busy || queue.files.length !== 1} onClick={save}>{busy ? 'Guardando imagen…' : 'Guardar imagen principal'}</Button><span aria-live="polite">{status}</span></div>
  </section>
}

export function GalleryField({ path }: { path: string }) {
  const { value, setValue } = useField<Array<{ image: string | number | MediaRecord }> | null>({ path })
  const urls = useAdminURLs()
  const queue = useQueue()
  const [busy, setBusy] = useState(false)
  const [pending, setPending] = useState(false)
  const [saved, setSaved] = useState<MediaRecord[]>([])
  const rows = useMemo(() => Array.isArray(value) ? value : [], [value])
  const ids = rows.map((row) => typeof row.image === 'object' && row.image ? row.image.id : row.image).filter(Boolean)
  const idsKey = ids.join(',')
  useEffect(() => {
    let active = true
    Promise.all(idsKey ? idsKey.split(',').map(async (id) => {
      const response = await fetch(urls(`/media/${id}?depth=0`), { credentials: 'include' })
      return response.ok ? response.json() : null
    }) : []).then((docs) => { if (active) setSaved(docs.filter(Boolean) as MediaRecord[]) }).catch(() => undefined)
    return () => { active = false }
  }, [idsKey, urls])
  const updateItem = (key: string, changes: Partial<QueuedImage>) => queue.setFiles((items) => items.map((item) => item.key === key ? { ...item, ...changes } : item))
  const save = async () => {
    if (!queue.files.length) return
    setBusy(true); queue.setError('')
    const created: MediaRecord[] = []
    try {
      for (const item of queue.files) {
        let record: MediaRecord
        try {
          record = await saveOne(item, urls, (status, progress) => updateItem(item.key, { status, progress }))
        } catch (error) {
          updateItem(item.key, { status: 'Error. Puedes reintentar.' })
          throw error
        }
        created.push(record)
        setValue([...rows, ...created.map((media) => ({ image: media.id }))])
        setPending(true)
        setSaved((current) => [...current.filter((media) => !created.some((newMedia) => newMedia.id === media.id)), ...created])
        queue.remove(item.key)
      }
    } catch (cause) {
      const error = cause instanceof Error ? cause.message : 'No se pudo guardar una imagen.'
      const failed = queue.files.find((item) => item.status.startsWith('Error'))
      if (failed) updateItem(failed.key, { status: 'Error. Puedes reintentar.' })
      queue.setError(error)
    } finally { setBusy(false) }
  }
  const removeSaved = (id: string | number) => {
    const next = rows.filter((row) => (typeof row.image === 'object' && row.image ? row.image.id : row.image) !== id)
    setValue(next); setSaved((current) => current.filter((item) => item.id !== id)); setPending(true)
  }
  return <section className="property-image-section" aria-labelledby={`${path}-heading`}>
    <h3 id={`${path}-heading`}>Galería</h3>
    {saved.length > 0 && <ul className="property-image-saved-list">{saved.map((record) => <li key={record.id} className="property-image-saved"><Image src={record.url || ''} alt={record.alt || ''} width={92} height={68} unoptimized /><span>{record.filename}</span><Button type="button" buttonStyle="secondary" size="small" disabled={busy} onClick={() => removeSaved(record.id)}>Quitar de galería</Button></li>)}</ul>}
    {!saved.length && <p className="property-image-hint">Aún no hay imágenes guardadas en la galería.</p>}
    <ImageQueue queue={queue} disabled={busy} onAdd={(files) => queue.add(files)} onRemove={queue.remove} onAlt={(key, alt) => updateItem(key, { alt })} onAltEn={(key, altEn) => updateItem(key, { altEn })} />
    <div className="property-image-actions"><Button type="button" buttonStyle="primary" disabled={busy || queue.files.length === 0} onClick={save}>{busy ? 'Guardando galería…' : 'Guardar imágenes en galería'}</Button><span aria-live="polite">{pending ? 'Cambios pendientes: guarda la propiedad para persistir la galería.' : busy ? 'Cada imagen guardada queda asociada al formulario.' : ''}</span></div>
  </section>
}
