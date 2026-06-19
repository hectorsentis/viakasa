export const fallbackSettings = {
  siteName: 'Viakasa',
  tagline: 'La vía directa a tu casa',
  heroTitle: 'La vía directa a tu casa',
  heroText:
    'Asesoría inmobiliaria integral: compra, venta, gestión legal y financiera con un único interlocutor de confianza.',
  phone: '600 123 450',
  email: 'info@viakasa.es',
  offices: 'Madrid · Santa Cruz de Tenerife',
  footerText: 'Tu asesoría inmobiliaria de confianza en Madrid, Tenerife y toda España.',
  primaryCta: 'Ver propiedades',
  secondaryCta: 'Valoración gratuita'
}

export const fallbackServices = [
  {
    title: 'Compra y venta',
    description: 'Valoración realista, negociación firme y cierre sin sorpresas. Tú decides, nosotros ejecutamos.',
    icon: 'Home',
    highlighted: true
  },
  {
    title: 'Asesoría legal',
    description: 'Revisión de contratos, notaría, registro y due diligence con respaldo jurídico propio.',
    icon: 'Scale',
    highlighted: false
  },
  {
    title: 'Financiación',
    description: 'Estudio hipotecario y acceso a condiciones adaptadas a tu perfil.',
    icon: 'Landmark',
    highlighted: false
  },
  {
    title: 'Gestión integral',
    description: 'Alquiler, administración y puesta a punto de tu inmueble con tranquilidad total.',
    icon: 'Key',
    highlighted: false
  }
]

export const fallbackProperties = [
  {
    id: 'demo-1',
    slug: 'piso-reformado-con-terraza',
    title: 'Piso reformado con terraza',
    location: 'Barrio de Salamanca · Madrid',
    city: 'Madrid',
    price: 485000,
    priceNote: '5.105 €/m²',
    operation: 'sale',
    propertyType: 'Piso',
    rooms: 3,
    bathrooms: 2,
    area: 95,
    year: 2019,
    description:
      'Vivienda exterior completamente reformada en una de las zonas más exclusivas de Madrid. Salón luminoso con salida a terraza, cocina office y tres dormitorios.',
    features: [{ label: 'Aire acondicionado' }, { label: 'Ascensor' }, { label: 'Terraza' }],
    mainImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=82',
    galleryUrls: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=82',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=900&q=82'
    ],
    featured: true
  },
  {
    id: 'demo-2',
    slug: 'villa-con-vistas-al-oceano',
    title: 'Villa con vistas al océano',
    location: 'Costa Adeje · Tenerife',
    city: 'Tenerife',
    price: 1250000,
    priceNote: '',
    operation: 'sale',
    propertyType: 'Villa',
    rooms: 5,
    bathrooms: 4,
    area: 320,
    year: 2021,
    description:
      'Villa de obra reciente con piscina infinity y vistas despejadas al Atlántico. Acabados de alta gama, domótica integral y amplias zonas exteriores.',
    features: [{ label: 'Piscina' }, { label: 'Vistas al mar' }, { label: 'Garaje' }],
    mainImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=82',
    galleryUrls: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=82',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=82'
    ],
    featured: true
  },
  {
    id: 'demo-3',
    slug: 'atico-duplex-con-azotea-privada',
    title: 'Ático dúplex con azotea privada',
    location: 'Chamberí · Madrid',
    city: 'Madrid',
    price: 720000,
    priceNote: '6.000 €/m²',
    operation: 'sale',
    propertyType: 'Ático',
    rooms: 4,
    bathrooms: 3,
    area: 120,
    year: 2018,
    description:
      'Dúplex en planta alta con azotea privada de 40 m². Distribución diáfana, mucha luz natural y materiales nobles.',
    features: [{ label: 'Azotea privada' }, { label: 'Exterior' }, { label: 'Cocina equipada' }],
    mainImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=82',
    galleryUrls: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=82',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=82'
    ],
    featured: true
  }
]
