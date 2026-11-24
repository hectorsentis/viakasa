import type { CollectionConfig, FieldAccess } from 'payload'

import { isOwnerOrEditor, publishedOrEditor } from '../access'
import { revalidatePublicSite } from '../lib/revalidate'
import { slugify } from '../utils/slugify'

const isEditor: FieldAccess = ({ req }) => Boolean(req.user)
// La dirección exacta y las coordenadas sólo salen en la API pública si el
// equipo lo autoriza expresamente en la ficha.
const exactLocationAccess: FieldAccess = ({ req, siblingData, doc }) =>
  Boolean(req.user) || Boolean((siblingData as { showExactLocation?: boolean } | undefined)?.showExactLocation ?? doc?.showExactLocation)

export const publicationStatusOptions = [
  { label: 'Borrador', value: 'draft' },
  { label: 'Publicado', value: 'published' },
  { label: 'Despublicado', value: 'unpublished' },
  { label: 'Archivado', value: 'archived' }
]

export const commercialStatusOptions = [
  { label: 'Disponible', value: 'available' },
  { label: 'Reservado', value: 'reserved' },
  { label: 'Vendido', value: 'sold' },
  { label: 'Alquilado', value: 'rented' }
]

const energyRatings = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((value) => ({ label: value, value }))

function generateReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5)
  const random = Math.random().toString(36).toUpperCase().slice(2, 4)
  return `VK-${stamp}${random}`
}

function computePricePerSqm(price?: number | null, area?: number | null, usableArea?: number | null) {
  const surface = area && area > 0 ? area : usableArea && usableArea > 0 ? usableArea : null
  if (!price || price <= 0 || !surface) return null
  return Math.round(price / surface)
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: {
    singular: 'Propiedad',
    plural: 'Propiedades'
  },
  defaultSort: '-updatedAt',
  admin: {
    defaultColumns: ['mainImage', 'reference', 'title', 'location', 'price', 'commercialStatus', 'status', 'updatedAt', 'quickActions'],
    description:
      'Cartera inmobiliaria. Sólo las propiedades en estado «Publicado» aparecen en la web, el sitemap y la API pública. Despublicar o archivar conserva los datos y las fotografías.',
    listSearchableFields: ['title', 'titleEn', 'reference', 'location', 'address', 'slug'],
    pagination: { defaultLimit: 25 },
    preview: (doc) => (doc?.id ? `/vista-previa/propiedades/${doc.id}` : null),
    useAsTitle: 'title'
  },
  access: {
    create: isOwnerOrEditor,
    delete: isOwnerOrEditor,
    read: publishedOrEditor,
    update: isOwnerOrEditor
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req, originalDoc }) => {
        if (!data) return data
        const autoSlug = Boolean(data.title && !data.slug && !originalDoc?.slug)
        if (autoSlug) {
          // Slug generado desde el título: si ya existe (p. ej. una ficha archivada
          // con el mismo título), se añade un sufijo para no bloquear el alta.
          const base = slugify(data.title)
          let candidate = base
          for (let attempt = 2; attempt < 50; attempt++) {
            const clash = await req.payload.count({ collection: 'properties', where: { slug: { equals: candidate } }, overrideAccess: true, req })
            if (!clash.totalDocs) break
            candidate = `${base}-${attempt}`
          }
          data.slug = candidate
        }
        if (typeof data.slug === 'string') data.slug = slugify(data.slug)
        if (typeof data.reference === 'string') data.reference = data.reference.trim().toUpperCase()
        if (operation === 'create' && !data.reference) data.reference = generateReference()
        return data
      }
    ],
    beforeChange: [
      ({ data, originalDoc }) => {
        const merged = { ...originalDoc, ...data }
        data.pricePerSqm = computePricePerSqm(merged.price, merged.area, merged.usableArea)
        if (merged.status === 'published' && !merged.publishedAt) data.publishedAt = new Date().toISOString()
        if (!merged.featured) data.featuredOrder = null
        return data
      }
    ],
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidatePublicSite([doc?.slug, previousDoc?.slug])
        return doc
      }
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePublicSite([doc?.slug])
        return doc
      }
    ]
  },
  fields: [
    // ── Barra lateral: estado y organización ─────────────────────────────
    {
      name: 'status',
      type: 'select',
      label: 'Estado de publicación',
      defaultValue: 'draft',
      required: true,
      index: true,
      options: publicationStatusOptions,
      admin: {
        position: 'sidebar',
        description: 'Sólo «Publicado» es visible en la web. Despublicar la retira al instante sin borrar nada.'
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, any> }) => {
        if (value !== 'published') return true
        const hasImage = Boolean(siblingData?.mainImage || siblingData?.externalImageUrl || siblingData?.gallery?.length)
        if (!hasImage) return 'Añade al menos una fotografía antes de publicar.'
        if (!siblingData?.description) return 'Añade una descripción antes de publicar.'
        return true
      },
      hooks: { beforeDuplicate: [() => 'draft'] }
    },
    {
      name: 'commercialStatus',
      type: 'select',
      label: 'Estado comercial',
      defaultValue: 'available',
      required: true,
      index: true,
      options: commercialStatusOptions,
      admin: { position: 'sidebar' }
    },
    {
      name: 'reference',
      type: 'text',
      label: 'Referencia interna',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Se genera automáticamente si se deja vacía (VK-…).' },
      hooks: { beforeDuplicate: [() => generateReference()] }
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'Se genera a partir del título. Cambiarlo modifica la URL pública.' },
      hooks: { beforeDuplicate: [({ value }) => `${value || 'propiedad'}-copia-${Date.now().toString(36)}`] }
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacada en la página principal',
      admin: { position: 'sidebar' },
      hooks: { beforeDuplicate: [() => false] }
    },
    {
      name: 'featuredOrder',
      type: 'number',
      label: 'Orden en destacadas',
      min: 0,
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.featured),
        description: 'Menor número = aparece antes. Se muestran hasta 6.'
      }
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Primera publicación',
      admin: { position: 'sidebar', readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
      hooks: { beforeDuplicate: [() => null] }
    },
    {
      name: 'isDemo',
      type: 'checkbox',
      label: 'Propiedad de demostración',
      access: { read: isEditor },
      admin: {
        position: 'sidebar',
        description: 'Marca de contenido de ejemplo para localizarlo y despublicarlo. No tiene efecto en la web.'
      }
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Notas internas',
      access: { read: isEditor },
      admin: { position: 'sidebar', description: 'Nunca se muestran en la web ni en la API pública.' }
    },
    {
      name: 'quickActions',
      type: 'ui',
      label: 'Acciones',
      admin: {
        components: { Cell: '/src/payload/components/PropertyQuickActions#PropertyQuickActions' }
      }
    },

    // ── Contenido principal ───────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', label: 'Título', required: true, admin: { width: '50%' } },
                { name: 'titleEn', type: 'text', label: 'Title (English)', admin: { width: '50%' } }
              ]
            },
            {
              type: 'row',
              fields: [
                { name: 'description', type: 'textarea', label: 'Descripción', required: true, admin: { width: '50%', rows: 10 } },
                { name: 'descriptionEn', type: 'textarea', label: 'Description (English)', admin: { width: '50%', rows: 10 } }
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'operation',
                  type: 'select',
                  label: 'Tipo de operación',
                  defaultValue: 'sale',
                  required: true,
                  options: [
                    { label: 'Venta', value: 'sale' },
                    { label: 'Alquiler', value: 'rent' }
                  ],
                  admin: { width: '33%' }
                },
                { name: 'propertyType', type: 'text', label: 'Tipo de inmueble', required: true, admin: { width: '33%', placeholder: 'Piso, ático, villa…' } },
                { name: 'propertyTypeEn', type: 'text', label: 'Property type (English)', admin: { width: '33%' } }
              ]
            },
            {
              type: 'row',
              fields: [
                { name: 'price', type: 'number', label: 'Precio (€)', min: 0, admin: { width: '33%', description: 'En alquiler, importe mensual. Vacío = «Precio a consultar».' } },
                {
                  name: 'pricePerSqm',
                  type: 'number',
                  label: 'Precio por m² (calculado)',
                  admin: {
                    width: '33%',
                    readOnly: true,
                    description: 'Precio ÷ superficie construida (o útil si no hay construida). Se recalcula al guardar.'
                  }
                },
                { name: 'year', type: 'number', label: 'Año de construcción', min: 1800, admin: { width: '33%' } }
              ]
            },
            {
              type: 'row',
              fields: [
                { name: 'priceNote', type: 'text', label: 'Nota de precio', admin: { width: '50%', placeholder: 'Gastos de comunidad incluidos…' } },
                { name: 'priceNoteEn', type: 'text', label: 'Price note (English)', admin: { width: '50%' } }
              ]
            }
          ]
        },
        {
          label: 'Ubicación',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'city', type: 'select', label: 'Ciudad', required: true, options: ['Madrid', 'Tenerife', 'Otra'], admin: { width: '33%' } },
                { name: 'location', type: 'text', label: 'Zona visible en la web', required: true, admin: { width: '33%', placeholder: 'Chamberí · Madrid' } },
                { name: 'locationEn', type: 'text', label: 'Area shown on the website (English)', admin: { width: '33%' } }
              ]
            },
            {
              type: 'row',
              fields: [
                { name: 'address', type: 'text', label: 'Dirección', access: { read: exactLocationAccess }, admin: { width: '66%' } },
                { name: 'postalCode', type: 'text', label: 'Código postal', access: { read: exactLocationAccess }, admin: { width: '33%' } }
              ]
            },
            {
              type: 'row',
              fields: [
                { name: 'latitude', type: 'number', label: 'Latitud', min: -90, max: 90, access: { read: exactLocationAccess }, admin: { width: '33%', step: 0.000001 } },
                { name: 'longitude', type: 'number', label: 'Longitud', min: -180, max: 180, access: { read: exactLocationAccess }, admin: { width: '33%', step: 0.000001 } },
                {
                  name: 'showExactLocation',
                  type: 'checkbox',
                  label: 'Mostrar ubicación exacta en la web',
                  admin: { width: '33%', description: 'Si está desactivado, la dirección y las coordenadas sólo son visibles en el panel.' }
                }
              ]
            }
          ]
        },
        {
          label: 'Superficies y distribución',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'area', type: 'number', label: 'Superficie construida (m²)', min: 0, admin: { width: '25%' } },
                { name: 'usableArea', type: 'number', label: 'Superficie útil (m²)', min: 0, admin: { width: '25%' } },
                { name: 'rooms', type: 'number', label: 'Habitaciones', min: 0, admin: { width: '25%' } },
                { name: 'bathrooms', type: 'number', label: 'Baños', min: 0, admin: { width: '25%' } }
              ]
            }
          ]
        },
        {
          label: 'Características',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Características y equipamiento',
              labels: { singular: 'Característica', plural: 'Características' },
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', label: 'Característica', required: true, admin: { width: '50%' } },
                    { name: 'labelEn', type: 'text', label: 'Feature (English)', admin: { width: '50%' } }
                  ]
                }
              ]
            },
            {
              name: 'energy',
              type: 'group',
              label: 'Certificación energética',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'status',
                      type: 'select',
                      label: 'Situación del certificado',
                      defaultValue: 'pending',
                      options: [
                        { label: 'Disponible', value: 'available' },
                        { label: 'En trámite', value: 'pending' },
                        { label: 'Exento', value: 'exempt' }
                      ],
                      admin: { width: '33%' }
                    },
                    {
                      name: 'consumptionRating',
                      type: 'select',
                      label: 'Calificación de consumo',
                      options: energyRatings,
                      admin: { width: '33%', condition: (_, sibling) => sibling?.status === 'available' }
                    },
                    {
                      name: 'consumption',
                      type: 'number',
                      label: 'Consumo (kWh/m² año)',
                      min: 0,
                      admin: { width: '33%', condition: (_, sibling) => sibling?.status === 'available' }
                    }
                  ]
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'emissionsRating',
                      type: 'select',
                      label: 'Calificación de emisiones',
                      options: energyRatings,
                      admin: { width: '33%', condition: (_, sibling) => sibling?.status === 'available' }
                    },
                    {
                      name: 'emissions',
                      type: 'number',
                      label: 'Emisiones (kg CO₂/m² año)',
                      min: 0,
                      admin: { width: '33%', condition: (_, sibling) => sibling?.status === 'available' }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Fotografías',
          fields: [
            {
              name: 'mainImage',
              type: 'upload',
              label: 'Fotografía principal',
              relationTo: 'media',
              admin: { components: { Field: '/src/payload/fields/PropertyImageFields#MainImageField' } }
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galería',
              admin: { components: { Field: '/src/payload/fields/PropertyImageFields#GalleryField' } },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Imagen',
                  relationTo: 'media',
                  required: true
                }
              ]
            },
            {
              name: 'externalImageUrl',
              type: 'text',
              label: 'URL externa de imagen (heredado)',
              admin: {
                description:
                  'Sólo para contenido importado. Si hay fotografía principal o galería, se usan éstas. Las propiedades con imágenes de bancos genéricos (Unsplash) se marcaron como demostración.'
              }
            }
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO',
              admin: { description: 'Opcional. Si se deja vacío se usan el título y la descripción de la propiedad.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'title', type: 'text', label: 'Título SEO', admin: { width: '50%', description: 'Recomendado: hasta 60–70 caracteres.' } },
                    { name: 'titleEn', type: 'text', label: 'SEO title (English)', admin: { width: '50%', description: 'Recomendado: hasta 60–70 caracteres.' } }
                  ]
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'description', type: 'textarea', label: 'Descripción SEO', admin: { width: '50%', description: 'Recomendado: hasta 155–160 caracteres.' } },
                    { name: 'descriptionEn', type: 'textarea', label: 'SEO description (English)', admin: { width: '50%', description: 'Recomendado: hasta 155–160 caracteres.' } }
                  ]
                },
                { name: 'noIndex', type: 'checkbox', label: 'Pedir a los buscadores que no indexen esta ficha' }
              ]
            }
          ]
        }
      ]
    }
  ]
}
