export const fallbackSettings = {
  siteName: 'Viakasa',
  tagline: 'La vía directa a tu casa',
  taglineEn: 'The direct route to your home',
  heroTitle: 'La vía directa a tu casa',
  heroTitleEn: 'The direct route to your home',
  heroText:
    'Asesoría inmobiliaria integral: compra, venta, gestión legal y financiera con un único interlocutor de confianza.',
  heroTextEn:
    'Complete property advisory for buying, selling, legal services and finance, with one trusted point of contact.',
  phone: '600 123 450',
  email: 'info@viakasa.es',
  offices: 'Madrid · Santa Cruz de Tenerife',
  officesEn: 'Madrid · Santa Cruz de Tenerife',
  footerText: 'Tu asesoría inmobiliaria de confianza en Madrid, Tenerife y toda España.',
  footerTextEn: 'Your trusted property advisers in Madrid, Tenerife and across Spain.',
  primaryCta: 'Ver propiedades',
  primaryCtaEn: 'View properties',
  secondaryCta: 'Valoración gratuita',
  secondaryCtaEn: 'Free valuation'
}

export const fallbackServices = [
  {
    title: 'Compra y venta',
    titleEn: 'Buying and selling',
    description: 'Valoración realista, negociación firme y cierre sin sorpresas. Tú decides, nosotros ejecutamos.',
    descriptionEn: 'Realistic valuations, firm negotiation and a smooth completion. You decide; we make it happen.',
    icon: 'Home',
    highlighted: true
  },
  {
    title: 'Asesoría legal',
    titleEn: 'Legal advice',
    description: 'Revisión de contratos, notaría, registro y due diligence con respaldo jurídico propio.',
    descriptionEn: 'Contract review, notary, land registry and due diligence with in-house legal support.',
    icon: 'Scale',
    highlighted: false
  },
  {
    title: 'Financiación',
    titleEn: 'Finance',
    description: 'Estudio hipotecario y acceso a condiciones adaptadas a tu perfil.',
    descriptionEn: 'Mortgage assessment and access to terms suited to your circumstances.',
    icon: 'Landmark',
    highlighted: false
  },
  {
    title: 'Gestión integral',
    titleEn: 'Full management',
    description: 'Alquiler, administración y puesta a punto de tu inmueble con tranquilidad total.',
    descriptionEn: 'Letting, administration and property preparation, handled from start to finish.',
    icon: 'Key',
    highlighted: false
  }
]

export const fallbackProperties = [
  {
    id: 'demo-1',
    slug: 'piso-reformado-con-terraza',
    title: 'Piso reformado con terraza',
    titleEn: 'Renovated apartment with terrace',
    location: 'Barrio de Salamanca · Madrid',
    locationEn: 'Salamanca district · Madrid',
    city: 'Madrid',
    price: 485000,
    priceNote: '5.105 €/m²',
    operation: 'sale',
    propertyType: 'Piso',
    propertyTypeEn: 'Apartment',
    rooms: 3,
    bathrooms: 2,
    area: 95,
    year: 2019,
    description:
      'Vivienda exterior completamente reformada en una de las zonas más exclusivas de Madrid. Salón luminoso con salida a terraza, cocina office y tres dormitorios.',
    descriptionEn:
      'Fully renovated exterior apartment in one of Madrid’s most exclusive areas, with a bright living room opening onto a terrace, eat-in kitchen and three bedrooms.',
    features: [{ label: 'Aire acondicionado', labelEn: 'Air conditioning' }, { label: 'Ascensor', labelEn: 'Lift' }, { label: 'Terraza', labelEn: 'Terrace' }],
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
    titleEn: 'Villa with ocean views',
    location: 'Costa Adeje · Tenerife',
    locationEn: 'Costa Adeje · Tenerife',
    city: 'Tenerife',
    price: 1250000,
    priceNote: '',
    operation: 'sale',
    propertyType: 'Villa',
    propertyTypeEn: 'Villa',
    rooms: 5,
    bathrooms: 4,
    area: 320,
    year: 2021,
    description:
      'Villa de obra reciente con piscina infinity y vistas despejadas al Atlántico. Acabados de alta gama, domótica integral y amplias zonas exteriores.',
    descriptionEn:
      'Recently built villa with an infinity pool and uninterrupted Atlantic views, high-end finishes, smart-home technology and generous outdoor spaces.',
    features: [{ label: 'Piscina', labelEn: 'Swimming pool' }, { label: 'Vistas al mar', labelEn: 'Ocean views' }, { label: 'Garaje', labelEn: 'Garage' }],
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
    titleEn: 'Duplex penthouse with private roof terrace',
    location: 'Chamberí · Madrid',
    locationEn: 'Chamberí · Madrid',
    city: 'Madrid',
    price: 720000,
    priceNote: '6.000 €/m²',
    operation: 'sale',
    propertyType: 'Ático',
    propertyTypeEn: 'Penthouse',
    rooms: 4,
    bathrooms: 3,
    area: 120,
    year: 2018,
    description:
      'Dúplex en planta alta con azotea privada de 40 m². Distribución diáfana, mucha luz natural y materiales nobles.',
    descriptionEn:
      'Upper-floor duplex with a 40 m² private roof terrace, open-plan layout, abundant natural light and quality materials.',
    features: [{ label: 'Azotea privada', labelEn: 'Private roof terrace' }, { label: 'Exterior', labelEn: 'Exterior-facing' }, { label: 'Cocina equipada', labelEn: 'Fitted kitchen' }],
    mainImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=82',
    galleryUrls: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=82',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=82'
    ],
    featured: true
  }
]
