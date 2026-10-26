export type Locale = 'es' | 'en'

export const copy = {
  es: {
    nav: { properties: 'Propiedades', services: 'Servicios', about: 'Nosotros', contact: 'Contacto' },
    menu: { open: 'Abrir menú', close: 'Cerrar menú', label: 'Menú principal' },
    footer: { company: 'Empresa', legal: 'Legal', legalNotice: 'Aviso legal', privacy: 'Privacidad', cookies: 'Cookies', contact: 'Contacto', rights: 'Todos los derechos reservados.' },
    language: 'Idioma'
  },
  en: {
    nav: { properties: 'Properties', services: 'Services', about: 'About us', contact: 'Contact' },
    menu: { open: 'Open menu', close: 'Close menu', label: 'Main menu' },
    footer: { company: 'Company', legal: 'Legal', legalNotice: 'Legal notice', privacy: 'Privacy', cookies: 'Cookies', contact: 'Contact', rights: 'All rights reserved.' },
    language: 'Language'
  }
} as const

const routeMap: Record<Locale, Record<string, string>> = {
  es: { home: '/', properties: '/propiedades', services: '/servicios', about: '/nosotros', contact: '/contacto', legal: '/aviso-legal', privacy: '/privacidad', cookies: '/cookies' },
  en: { home: '/en', properties: '/en/properties', services: '/en/services', about: '/en/about', contact: '/en/contact', legal: '/en/legal-notice', privacy: '/en/privacy', cookies: '/en/cookies' }
}

export function route(locale: Locale, key: keyof (typeof routeMap)['es']) {
  return routeMap[locale][key]
}

export function translatePath(pathname: string, target: Locale) {
  const propertyMatch = pathname.match(/^\/(?:en\/properties|propiedades)\/([^/]+)$/)
  if (propertyMatch) return `${route(target, 'properties')}/${propertyMatch[1]}`

  for (const key of Object.keys(routeMap.es) as Array<keyof (typeof routeMap)['es']>) {
    if (pathname === routeMap.es[key] || pathname === routeMap.en[key]) return routeMap[target][key]
  }
  return route(target, 'home')
}

export function localized<T extends Record<string, unknown>>(doc: T, locale: Locale): T {
  if (locale === 'es') return doc
  const result = { ...doc }
  for (const key of Object.keys(doc)) {
    if (!key.endsWith('En')) continue
    const base = key.slice(0, -2)
    const value = doc[key]
    if (value != null && value !== '') (result as Record<string, unknown>)[base] = value
  }
  return result
}
