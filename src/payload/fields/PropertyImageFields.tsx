'use client'

import { upload } from '@vercel/blob/client'
import { Button, toast, useConfig, useField, useForm, useFormFields } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Gestión de fotografías de una propiedad.
 *
 * - Las imágenes se suben directamente del navegador a Vercel Blob (la
 *   infraestructura existente) y después se registra un documento en «Medios».
 * - Antes de subir, se optimizan en el navegador: lado largo máximo 2560 px y
 *   recompresión a WebP (o JPEG si el navegador no codifica WebP).
 * - La galería se edita con las APIs de filas del formulario de Payload, de modo
 *   que los cambios quedan pendientes hasta pulsar «Guardar» en la propiedad.
 */

const MAX_UPLOAD_SIZE = 20 * 1024 * 1024
const MAX_INPUT_SIZE = 60 * 1024 * 1024
const MAX_EDGE = 2560
const RECOMPRESS_ABOVE = 1.5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const GALLERY_PATH = 'gallery'
const MAIN_PATH = 'mainImage'

type MediaRecord = { id: string | number; filename?: string; url?: string; blobUrl?: string; thumbnailURL?: string; alt?: string; altEn?: string; width?: number; height?: number }
type QueuedImage = { key: string; file: File; preview: string; alt: string; altEn: string; progress: number; status: string }
type ID = string | number

const idOf = (value: unknown): ID | null => {
  if (value == null || value === '') return null
  if (typeof value === 'object') return ((value as { id?: ID }).id ?? null)
  return value as ID
}
const srcOf = (record?: MediaRecord | null) => record?.blobUrl || record?.url || record?.thumbnailURL || ''
const sameID = (a: unknown, b: unknown) => a != null && b != null && String(a) === String(b)
// Los IDs se serializan como texto para el selector del formulario; Postgres usa IDs numéricos.
const toID = (value: string): ID => (/^\d+$/.test(value) ? Number(value) : value)

function useAdminURLs() {
  const { config: { routes: { api: apiRoute }, serverURL } } = useConfig()
  return useCallback((path: string) => formatAdminURL({ apiRoute, path: path as `/${string}`, serverURL }), [apiRoute, serverURL])
}

// ── Optimización en el navegador ──────────────────────────────────────────

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))
}

export async function optimizeImage(file: File): Promise<File> {
  // AVIF ya es un formato muy eficiente y no todos los navegadores lo decodifican en canvas.
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return file
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return file
  }
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size <= RECOMPRESS_ABOVE) {
    bitmap.close()
    return file
  }
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    return file
  }
  context.imageSmoothingQuality = 'high'
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  let blob = await canvasToBlob(canvas, 'image/webp', 0.85)
  if (!blob || blob.type !== 'image/webp') blob = await canvasToBlob(canvas, 'image/jpeg', 0.86)
  if (!blob || (scale === 1 && blob.size >= file.size)) return file
  const extension = blob.type === 'image/webp' ? 'webp' : 'jpg'
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.${extension}`, { type: blob.type, lastModified: file.lastModified })
}

// ── Subida a Blob + registro en Medios ────────────────────────────────────

function messageFrom(response: Response, body: any) {
  return body?.errors?.[0]?.message || body?.message || `No se pudo guardar la imagen (${response.status}).`
}

async function uploadImage(
  original: File,
  alt: { alt: string; altEn: string },
  urls: (path: string) => string,
  setStatus: (status: string, progress: number) => void
): Promise<MediaRecord> {
  setStatus('Optimizando…', 0)
  const file = await optimizeImage(original)
  if (file.size > MAX_UPLOAD_SIZE) throw new Error(`${original.name} supera los 20 MB incluso tras optimizarla.`)
  const endpoint = urls('/vercel-blob-client-upload-route')
  setStatus('Subiendo…', 0)
  const blob = await upload(file.name, file, {
    access: 'public', clientPayload: 'media', contentType: file.type, handleUploadUrl: endpoint,
    onUploadProgress: ({ percentage }) => setStatus(`Subiendo… ${Math.round(percentage)}%`, percentage)
  })
  const filename = decodeURIComponent(blob.pathname.split('/').pop() || file.name)
  setStatus('Registrando…', 100)
  const form = new FormData()
  form.append('_payload', JSON.stringify({ alt: alt.alt.trim() || filename, altEn: alt.altEn.trim() || alt.alt.trim() || filename, blobUrl: blob.url, blobPathname: blob.pathname }))
  form.append('file', JSON.stringify({ clientUploadContext: { prefix: '' }, collectionSlug: 'media', filename, mimeType: file.type, size: file.size }))
  let response: Response | null = null
  let body: any = {}
  try {
    response = await fetch(urls('/media'), { method: 'POST', body: form, credentials: 'include' })
    body = await response.json().catch(() => ({}))
  } catch {
    // Un fallo de red puede ocurrir después de que Payload haya creado el registro.
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
  return { ...body.doc, blobUrl: body.doc?.blobUrl || blob.url } as MediaRecord
}

// ── Caché de registros de Medios ──────────────────────────────────────────

function useMediaRecords(ids: ID[]) {
  const urls = useAdminURLs()
  const [records, setRecords] = useState<Record<string, MediaRecord>>({})
  const requested = useRef(new Set<string>())
  const missingKey = ids.map(String).filter((id) => !records[id]).join(',')
  useEffect(() => {
    if (!missingKey) return
    const list = missingKey.split(',').filter((id) => !requested.current.has(id))
    if (!list.length) return
    list.forEach((id) => requested.current.add(id))
    fetch(`${urls('/media')}?where[id][in]=${encodeURIComponent(list.join(','))}&depth=0&limit=${list.length}`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((result) => {
        if (!result?.docs) return
        setRecords((current) => ({ ...current, ...Object.fromEntries(result.docs.map((doc: MediaRecord) => [String(doc.id), doc])) }))
      })
      .catch(() => list.forEach((id) => requested.current.delete(id)))
  }, [missingKey, urls])
  const remember = useCallback((record: MediaRecord) => setRecords((current) => ({ ...current, [String(record.id)]: record })), [])
  return { records, remember }
}

// ── Componentes de interfaz ───────────────────────────────────────────────

function Lightbox({ record, onClose }: { record: MediaRecord | null; onClose: () => void }) {
  useEffect(() => {
    if (!record) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [record, onClose])
  if (!record) return null
  return (
    <div className="vk-lightbox" role="dialog" aria-modal="true" aria-label="Vista previa de la fotografía" onClick={onClose}>
      {/* eslint-disable-next-line @next/next/no-img-element -- vista previa del panel con URL de Blob arbitraria */}
      <img src={srcOf(record)} alt={record.alt || ''} onClick={(event) => event.stopPropagation()} />
      <p>{record.alt}{record.width && record.height ? ` · ${record.width}×${record.height}px` : ''}</p>
      <Button type="button" buttonStyle="secondary" size="small" onClick={onClose}>Cerrar</Button>
    </div>
  )
}

function useQueue(defaultAlt: string) {
  const [files, setFiles] = useState<QueuedImage[]>([])
  const filesRef = useRef(files)
  const [error, setError] = useState('')
  useEffect(() => { filesRef.current = files }, [files])
  useEffect(() => () => filesRef.current.forEach((item) => URL.revokeObjectURL(item.preview)), [])
  const add = (list: FileList | null, single = false) => {
    setError('')
    const additions: QueuedImage[] = []
    for (const file of Array.from(list || [])) {
      if (!ALLOWED_TYPES.includes(file.type)) { setError('Formato no permitido. Usa JPG, PNG, WebP o AVIF.'); continue }
      if (file.size > MAX_INPUT_SIZE) { setError(`${file.name} es demasiado grande (máximo 60 MB antes de optimizar).`); continue }
      const key = `${file.name}:${file.size}:${file.lastModified}`
      if (filesRef.current.some((item) => item.key === key) || additions.some((item) => item.key === key)) continue
      const alt = defaultAlt || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
      additions.push({ key, file, preview: URL.createObjectURL(file), alt, altEn: '', progress: 0, status: 'Pendiente de subir' })
    }
    if (!additions.length) return
    setFiles((current) => {
      if (single) current.forEach((item) => URL.revokeObjectURL(item.preview))
      return single ? additions.slice(0, 1) : [...current, ...additions]
    })
  }
  const update = (key: string, changes: Partial<QueuedImage>) => setFiles((items) => items.map((item) => (item.key === key ? { ...item, ...changes } : item)))
  const remove = (key: string) => setFiles((current) => {
    const removed = current.find((item) => item.key === key)
    if (removed) URL.revokeObjectURL(removed.preview)
    return current.filter((item) => item.key !== key)
  })
  return { files, error, setError, add, update, remove }
}

function UploadQueue({ queue, busy, multiple, onSubmit, submitLabel }: {
  queue: ReturnType<typeof useQueue>; busy: boolean; multiple: boolean; onSubmit: () => void; submitLabel: string
}) {
  return (
    <div className="property-image-manager">
      <label
        className="property-image-picker vk-dropzone"
        onDragOver={(event) => { if (event.dataTransfer.types.includes('Files')) event.preventDefault() }}
        onDrop={(event) => { if (event.dataTransfer.files.length) { event.preventDefault(); queue.add(event.dataTransfer.files, !multiple) } }}
      >
        {multiple ? 'Añadir fotografías (selección múltiple o arrastrar aquí)' : 'Seleccionar fotografía'}
        <input type="file" accept={ALLOWED_TYPES.join(',')} multiple={multiple} disabled={busy} onChange={(event) => { queue.add(event.currentTarget.files, !multiple); event.currentTarget.value = '' }} />
      </label>
      <p className="property-image-hint">JPG, PNG, WebP o AVIF. Se optimizan automáticamente (máx. 2560 px de lado largo) antes de subir.</p>
      {queue.error && <p className="property-image-error" role="alert">{queue.error}</p>}
      {!!queue.files.length && (
        <>
          <ul className="property-image-queue">
            {queue.files.map((item) => (
              <li className="property-image-item" key={item.key}>
                {/* eslint-disable-next-line @next/next/no-img-element -- vista previa local (blob:) */}
                <img src={item.preview} alt="" />
                <div className="property-image-item-body">
                  <label>Texto alternativo<input value={item.alt} onChange={(event) => queue.update(item.key, { alt: event.target.value })} disabled={busy} /></label>
                  <label>Alternative text (English)<input value={item.altEn} onChange={(event) => queue.update(item.key, { altEn: event.target.value })} disabled={busy} /></label>
                  <span>{item.file.name} · {(item.file.size / 1024 / 1024).toFixed(1)} MB</span>
                  <span aria-live="polite">{item.status}</span>
                  {item.status.startsWith('Subiendo') && <progress max={100} value={item.progress} aria-label={`Subida ${Math.round(item.progress)}%`} />}
                </div>
                <Button buttonStyle="secondary" size="small" type="button" disabled={busy} onClick={() => queue.remove(item.key)}>Quitar</Button>
              </li>
            ))}
          </ul>
          <div className="property-image-actions">
            <Button type="button" buttonStyle="primary" disabled={busy} onClick={onSubmit}>{busy ? 'Subiendo…' : submitLabel}</Button>
          </div>
        </>
      )}
    </div>
  )
}

function ReplaceButton({ disabled, onFile }: { disabled: boolean; onFile: (file: File) => void }) {
  return (
    <label className={`vk-photo-action${disabled ? ' is-disabled' : ''}`}>
      Sustituir
      <input
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        disabled={disabled}
        onChange={(event) => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ''; if (file) onFile(file) }}
      />
    </label>
  )
}

function usePropertyTitle() {
  return useFormFields(([fields]) => String(fields?.title?.value || ''))
}

// ── Fotografía principal ──────────────────────────────────────────────────

export function MainImageField({ path = MAIN_PATH }: { path?: string }) {
  const { value, setValue } = useField<ID | MediaRecord | null>({ path })
  const urls = useAdminURLs()
  const title = usePropertyTitle()
  const mainID = idOf(value)
  const { records, remember } = useMediaRecords(mainID != null ? [mainID] : [])
  const record = mainID != null ? records[String(mainID)] : null
  const queue = useQueue(title)
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState<MediaRecord | null>(null)

  const uploadAndSet = async (file: File, alt: { alt: string; altEn: string }, key?: string) => {
    setBusy(true); queue.setError('')
    try {
      const created = await uploadImage(file, alt, urls, (status, progress) => key && queue.update(key, { status, progress }))
      remember(created)
      setValue(created.id)
      if (key) queue.remove(key)
      toast.success('Fotografía principal preparada. Guarda la propiedad para aplicar el cambio.')
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'No se pudo subir la imagen.'
      if (key) queue.update(key, { status: 'Error. Puedes reintentar.' })
      queue.setError(message)
    } finally { setBusy(false) }
  }

  return (
    <section className="property-image-section" aria-labelledby={`${path}-heading`}>
      <h3 id={`${path}-heading`}>Fotografía principal</h3>
      <p className="property-image-hint">Es la imagen de las tarjetas y la primera de la ficha. También puedes elegirla desde la galería con «Hacer principal».</p>
      {mainID != null ? (
        <div className="vk-main-photo">
          {record ? (
            <button type="button" className="vk-thumb-button" onClick={() => setPreview(record)} aria-label="Ampliar fotografía principal">
              {/* eslint-disable-next-line @next/next/no-img-element -- miniatura del panel */}
              <img src={srcOf(record)} alt={record.alt || ''} />
            </button>
          ) : <div className="vk-thumb-placeholder">Cargando…</div>}
          <div className="vk-photo-meta">
            <strong>{record?.alt || record?.filename || `Imagen ${mainID}`}</strong>
            <div className="vk-photo-actions">
              <button type="button" className="vk-photo-action" disabled={!record} onClick={() => setPreview(record)}>Ver</button>
              <ReplaceButton disabled={busy} onFile={(file) => uploadAndSet(file, { alt: record?.alt || title, altEn: record?.altEn || '' })} />
              <button type="button" className="vk-photo-action is-danger" disabled={busy} onClick={() => { if (window.confirm('¿Quitar la fotografía principal? La imagen seguirá disponible en Medios.')) setValue(null) }}>Quitar</button>
            </div>
          </div>
        </div>
      ) : (
        <UploadQueue
          queue={queue}
          busy={busy}
          multiple={false}
          submitLabel="Subir fotografía principal"
          onSubmit={() => { const item = queue.files[0]; if (item) uploadAndSet(item.file, item, item.key) }}
        />
      )}
      <Lightbox record={preview} onClose={() => setPreview(null)} />
    </section>
  )
}

// ── Galería ───────────────────────────────────────────────────────────────

export function GalleryField({ path = GALLERY_PATH }: { path?: string }) {
  const urls = useAdminURLs()
  const title = usePropertyTitle()
  const { addFieldRow, moveFieldRow, removeFieldRow, dispatchFields, setModified } = useForm()
  // Estado serializado («idFila:idImagen|…») para no re-renderizar en cada pulsación del formulario.
  const serialized = useFormFields(([fields]) => {
    const rows = (fields?.[path]?.rows || []) as Array<{ id: string }>
    return rows.map((row, index) => `${row.id}:${idOf(fields?.[`${path}.${index}.image`]?.value) ?? ''}`).join('|')
  })
  const mainValue = useFormFields(([fields]) => idOf(fields?.[MAIN_PATH]?.value))
  const { setValue: setMain } = useField<ID | null>({ path: MAIN_PATH })
  const rows = serialized ? serialized.split('|').map((entry) => { const [rowID, imageID] = entry.split(':'); return { rowID, imageID } }) : []
  const { records, remember } = useMediaRecords(rows.map((row) => row.imageID).filter(Boolean))
  const queue = useQueue(title)
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState<MediaRecord | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= rows.length) return
    moveFieldRow({ path, moveFromIndex: from, moveToIndex: to })
  }

  const remove = (index: number) => {
    const record = records[rows[index]?.imageID]
    if (!window.confirm(`¿Eliminar «${record?.alt || 'esta fotografía'}» de la galería? La imagen seguirá disponible en Medios.`)) return
    removeFieldRow({ path, rowIndex: index })
  }

  const uploadAll = async () => {
    if (!queue.files.length) return
    setBusy(true); queue.setError('')
    let added = 0
    for (const item of [...queue.files]) {
      try {
        const created = await uploadImage(item.file, item, urls, (status, progress) => queue.update(item.key, { status, progress }))
        remember(created)
        addFieldRow({ path, schemaPath: path, subFieldState: { image: { initialValue: created.id, valid: true, value: created.id } } })
        if (mainValue == null && added === 0 && rows.length === 0) setMain(created.id)
        added += 1
        queue.remove(item.key)
      } catch (cause) {
        queue.update(item.key, { status: 'Error. Puedes reintentar.' })
        queue.setError(cause instanceof Error ? cause.message : 'No se pudo subir una imagen.')
      }
    }
    setBusy(false)
    if (added) toast.success(`${added} ${added === 1 ? 'fotografía añadida' : 'fotografías añadidas'}. Guarda la propiedad para aplicar los cambios.`)
  }

  const replace = async (index: number, file: File) => {
    const row = rows[index]
    const old = records[row.imageID]
    setBusy(true); queue.setError('')
    try {
      const created = await uploadImage(file, { alt: old?.alt || title, altEn: old?.altEn || '' }, urls, () => undefined)
      remember(created)
      dispatchFields({ type: 'UPDATE', path: `${path}.${index}.image`, value: created.id })
      setModified(true)
      if (sameID(mainValue, row.imageID)) setMain(created.id)
      toast.success('Fotografía sustituida. Guarda la propiedad para aplicar el cambio.')
    } catch (cause) {
      queue.setError(cause instanceof Error ? cause.message : 'No se pudo sustituir la imagen.')
    } finally { setBusy(false) }
  }

  return (
    <section className="property-image-section" aria-labelledby={`${path}-heading`}>
      <h3 id={`${path}-heading`}>Galería ({rows.length})</h3>
      {rows.length > 0 ? (
        <>
          <p className="property-image-hint">Arrastra las fotografías para cambiar el orden (o usa ↑ ↓). Los cambios se aplican al guardar la propiedad.</p>
          <ol className="vk-gallery-grid">
            {rows.map((row, index) => {
              const record = records[row.imageID]
              const isMain = sameID(mainValue, row.imageID)
              return (
                <li
                  key={row.rowID}
                  className={`vk-gallery-item${dragIndex === index ? ' is-dragging' : ''}${overIndex === index && dragIndex !== index ? ' is-over' : ''}`}
                  draggable={!busy}
                  onDragStart={(event) => { setDragIndex(index); event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', String(index)) }}
                  onDragOver={(event) => { if (dragIndex !== null) { event.preventDefault(); setOverIndex(index) } }}
                  onDragLeave={() => setOverIndex((current) => (current === index ? null : current))}
                  onDrop={(event) => { event.preventDefault(); if (dragIndex !== null) move(dragIndex, index); setDragIndex(null); setOverIndex(null) }}
                  onDragEnd={() => { setDragIndex(null); setOverIndex(null) }}
                >
                  <button type="button" className="vk-thumb-button" onClick={() => record && setPreview(record)} aria-label={`Ampliar fotografía ${index + 1}`}>
                    {record ? (
                      // eslint-disable-next-line @next/next/no-img-element -- miniatura del panel
                      <img src={srcOf(record)} alt={record.alt || ''} draggable={false} />
                    ) : <span className="vk-thumb-placeholder">{row.imageID ? 'Cargando…' : 'Sin imagen'}</span>}
                    <span className="vk-gallery-index">{index + 1}</span>
                    {isMain && <span className="vk-main-badge">Principal</span>}
                  </button>
                  <span className="vk-photo-caption" title={record?.alt}>{record?.alt || record?.filename || ''}</span>
                  <div className="vk-photo-actions">
                    <button type="button" className="vk-photo-action" disabled={busy || index === 0} onClick={() => move(index, index - 1)} aria-label="Mover antes">↑</button>
                    <button type="button" className="vk-photo-action" disabled={busy || index === rows.length - 1} onClick={() => move(index, index + 1)} aria-label="Mover después">↓</button>
                    <button type="button" className="vk-photo-action" disabled={busy || isMain || !row.imageID} onClick={() => setMain(toID(row.imageID))}>{isMain ? 'Es principal' : 'Hacer principal'}</button>
                    <ReplaceButton disabled={busy} onFile={(file) => replace(index, file)} />
                    <button type="button" className="vk-photo-action is-danger" disabled={busy} onClick={() => remove(index)}>Eliminar</button>
                  </div>
                </li>
              )
            })}
          </ol>
        </>
      ) : <p className="property-image-hint">Aún no hay fotografías en la galería.</p>}
      <UploadQueue queue={queue} busy={busy} multiple submitLabel={`Subir ${queue.files.length || ''} ${queue.files.length === 1 ? 'fotografía' : 'fotografías'}`.replace('  ', ' ')} onSubmit={uploadAll} />
      <Lightbox record={preview} onClose={() => setPreview(null)} />
    </section>
  )
}
