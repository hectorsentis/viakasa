import { del } from '@vercel/blob'
import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: request.headers })
    if (!user || !['owner', 'editor'].includes(String((user as { role?: string }).role))) {
      return NextResponse.json({ message: 'No tienes permiso para eliminar esta imagen.' }, { status: 403 })
    }

    const body = await request.json().catch(() => ({})) as { url?: string }
    if (!body.url || !process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ message: 'No se pudo validar la imagen o falta la configuración de Blob.' }, { status: 400 })
    }
    const url = new URL(body.url)
    if (!url.hostname.endsWith('.public.blob.vercel-storage.com') || !url.pathname.startsWith('/propiedades/')) {
      return NextResponse.json({ message: 'La URL no pertenece al almacenamiento de imágenes de propiedades.' }, { status: 400 })
    }

    const filename = decodeURIComponent(url.pathname.split('/').pop() || '')
    const existing = await payload.find({
      collection: 'media',
      limit: 1,
      overrideAccess: true,
      where: { filename: { equals: filename } }
    })
    if (existing.docs.length) {
      return NextResponse.json({ message: 'La imagen ya está registrada en Media; se conserva el archivo.' }, { status: 409 })
    }

    await del(url.toString(), { token: process.env.BLOB_READ_WRITE_TOKEN })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error limpiando una imagen de Blob sin registro Media', error)
    return NextResponse.json({ message: 'Falló la limpieza del archivo de Blob.' }, { status: 500 })
  }
}
