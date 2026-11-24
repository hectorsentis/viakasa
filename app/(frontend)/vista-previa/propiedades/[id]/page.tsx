import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { publicationStatusOptions } from '@/src/collections/Properties'
import { toPublicProperty } from '@/src/lib/content'
import { getPayloadClient } from '@/src/lib/payload'
import { PropertyDetail } from '@/src/ui/PropertyDetail'

// Vista previa de cualquier propiedad (borrador, despublicada, archivada) para
// el equipo. Se autentica en servidor con la cookie de Payload: sin sesión de
// owner/editor responde 404, igual que una ficha inexistente.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Vista previa', robots: { index: false, follow: false } }

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ lang?: string }> }

export default async function PropertyPreviewPage({ params, searchParams }: Props) {
  const [{ id }, { lang }] = await Promise.all([params, searchParams])
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  const role = (user as { role?: string } | null)?.role
  if (!user || (role !== 'owner' && role !== 'editor')) notFound()

  const raw = await payload.findByID({ collection: 'properties', id, depth: 2, user, overrideAccess: false, disableErrors: true })
  if (!raw) notFound()

  const locale = lang === 'en' ? 'en' : 'es'
  const property = toPublicProperty(raw, locale)
  const status = publicationStatusOptions.find((option) => option.value === raw.status)?.label || raw.status
  const isPublic = raw.status === 'published'

  const banner = (
    <div
      role="status"
      style={{
        alignItems: 'center', background: 'var(--navy-900)', border: '1px solid var(--gold-600)', borderRadius: 10, color: '#fff',
        display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', marginBottom: 24, padding: '14px 18px'
      }}
    >
      <span>
        <strong style={{ color: 'var(--gold-400)' }}>Vista previa</strong> · Estado: {status}
        {isPublic ? ' (visible en la web)' : ' (no visible en la web)'} · Se muestran los últimos cambios guardados.
      </span>
      <span style={{ display: 'flex', gap: 16 }}>
        <Link href={`/vista-previa/propiedades/${id}${locale === 'en' ? '' : '?lang=en'}`} style={{ color: 'var(--gold-400)' }}>
          {locale === 'en' ? 'Ver en español' : 'Ver en inglés'}
        </Link>
        <Link href={`/admin/collections/properties/${id}`} style={{ color: 'var(--gold-400)' }}>Volver a editar</Link>
      </span>
    </div>
  )

  return <section className="detail-hero"><PropertyDetail property={property} locale={locale} banner={banner} /></section>
}
