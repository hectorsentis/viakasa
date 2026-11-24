import { revalidatePath } from 'next/cache'

/**
 * Invalida la caché de las páginas públicas que muestran propiedades.
 *
 * Se llama desde los hooks de Payload. Fuera de una petición de Next (seed,
 * migraciones) `revalidatePath` lanza porque no hay store de caché: se ignora,
 * ya que en esos casos el despliegue reconstruye las páginas.
 */
export function revalidatePublicSite(slugs: Array<string | null | undefined> = []) {
  const paths = new Set(['/', '/en', '/propiedades', '/en/properties', '/sitemap.xml', '/llms.txt', '/llms-full.txt'])
  for (const slug of slugs) {
    if (!slug) continue
    paths.add(`/propiedades/${slug}`)
    paths.add(`/en/properties/${slug}`)
  }
  try {
    for (const path of paths) revalidatePath(path)
    // Las fichas son una ruta dinámica: se invalida también el patrón completo.
    // Con grupos de rutas, el patrón debe incluir el nombre del grupo.
    revalidatePath('/(frontend)/propiedades/[slug]', 'page')
    revalidatePath('/(english)/en/properties/[slug]', 'page')
  } catch {
    // Sin contexto de petición de Next.js.
  }
}
