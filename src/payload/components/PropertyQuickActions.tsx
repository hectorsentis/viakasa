'use client'

import { toast, useConfig } from '@payloadcms/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatAdminURL } from 'payload/shared'
import { useState } from 'react'

type Row = { id?: string | number; status?: string; title?: string }

/**
 * Columna «Acciones» del listado de propiedades: editar, previsualizar y
 * publicar/despublicar sin abrir la ficha. La petición pasa por la API REST de
 * Payload con la sesión del usuario, así que aplica el mismo control de acceso
 * y las mismas validaciones que el formulario.
 */
export function PropertyQuickActions({ rowData }: { rowData?: Row }) {
  const { config } = useConfig()
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const id = rowData?.id
  if (!id) return null

  const isPublished = rowData?.status === 'published'
  const editURL = formatAdminURL({ adminRoute: config.routes.admin, path: `/collections/properties/${id}` })
  const apiURL = formatAdminURL({ apiRoute: config.routes.api, path: `/properties/${id}`, serverURL: config.serverURL })

  const setStatus = async (status: string) => {
    const label = rowData?.title || 'la propiedad'
    if (status !== 'published' && !window.confirm(`¿Despublicar «${label}»? Dejará de verse en la web al instante. Los datos y las fotografías se conservan.`)) return
    setBusy(true)
    try {
      const response = await fetch(apiURL, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) {
        const detail = body?.errors?.[0]?.data?.errors?.[0]?.message || body?.errors?.[0]?.message || `Error ${response.status}`
        throw new Error(detail)
      }
      toast.success(status === 'published' ? 'Propiedad publicada.' : 'Propiedad despublicada.')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo cambiar el estado.')
    } finally {
      setBusy(false)
    }
  }

  const stop = (event: React.SyntheticEvent) => event.stopPropagation()

  return (
    <div className="vk-quick-actions" onClick={stop}>
      <Link href={editURL}>Editar</Link>
      <a href={`/vista-previa/propiedades/${id}`} target="_blank" rel="noopener noreferrer">Vista previa</a>
      <button type="button" disabled={busy} onClick={() => setStatus(isPublished ? 'unpublished' : 'published')}>
        {busy ? '…' : isPublished ? 'Despublicar' : 'Publicar'}
      </button>
    </div>
  )
}
