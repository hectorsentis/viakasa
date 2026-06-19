// Viakasa website — Property detail view
const { useState } = React;
const { Button: VKButton, Badge: VKBadge, FeatureStat, SectionHeading: VKHeading } = window.ViakasaDesignSystem_53b05d;
const DIco = ({ n, s = 16, c }) => <i data-lucide={n} style={{ width: s, height: s, color: c }}></i>;

function PropertyDetail({ listing, onBack, onToast }) {
  const [mainImg, setMainImg] = useState(listing.gallery[0]);
  React.useEffect(() => { setMainImg(listing.gallery[0]); }, [listing.id]);
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100%' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '110px 32px 80px' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-brand)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--navy-700)', marginBottom: 24,
        }}><DIco n="arrow-left" s={15} /> Volver a propiedades</button>

        {/* Gallery */}
        <div style={{ display: 'grid', gridTemplateColumns: listing.gallery.length > 1 ? '1fr 280px' : '1fr', gap: 14, marginBottom: 40 }}>
          <img src={mainImg} alt={listing.title}
            style={{ width: '100%', height: 460, objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} />
          {listing.gallery.length > 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {listing.gallery.map((g, i) => (
                <img key={i} src={g} alt="" onClick={() => setMainImg(g)}
                  style={{ width: '100%', height: 144, objectFit: 'cover', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    outline: mainImg === g ? '2.5px solid var(--gold-500)' : '2.5px solid transparent', outlineOffset: 2, flex: 1 }} />
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}>
          {/* Main */}
          <div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <VKBadge variant={listing.statusVariant} tone="solid">{listing.status}</VKBadge>
              <VKBadge variant="neutral" tone="line">{listing.type}</VKBadge>
            </div>
            <span style={{ fontFamily: 'var(--font-brand)', fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-700)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <DIco n="map-pin" s={14} /> {listing.location}
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 40, lineHeight: 1.12, color: 'var(--navy-800)', margin: '12px 0 24px' }}>{listing.title}</h1>

            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', padding: '22px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
              <FeatureStat icon={<DIco n="bed-double" c="var(--gold-600)" />} value={listing.beds} label="Habitaciones" />
              <FeatureStat icon={<DIco n="bath" c="var(--gold-600)" />} value={listing.baths} label="Baños" />
              <FeatureStat icon={<DIco n="maximize-2" c="var(--gold-600)" />} value={listing.area} label="Superficie" />
              <FeatureStat icon={<DIco n="calendar" c="var(--gold-600)" />} value={listing.year} label="Año" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 22, color: 'var(--navy-800)', margin: '32px 0 12px' }}>Descripción</h3>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-soft)', maxWidth: 640 }}>{listing.desc}</p>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 22, color: 'var(--navy-800)', margin: '32px 0 14px' }}>Características</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, maxWidth: 560 }}>
              {['Aire acondicionado', 'Plaza de garaje', 'Trastero', 'Exterior', 'Ascensor', 'Cocina equipada'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 15, color: 'var(--ink)' }}>
                  <DIco n="check" s={15} c="var(--gold-700)" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Sticky contact card */}
          <aside style={{ position: 'sticky', top: 100, background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-brand)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Precio</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '4px 0 22px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 36, color: 'var(--navy-900)' }}>{listing.price}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderTop: '1px solid var(--border-subtle)', marginBottom: 18 }}>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&q=80" alt="" style={{ width: 48, height: 48, borderRadius: 999, objectFit: 'cover' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 16, color: 'var(--navy-800)' }}>Carlos Méndez</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Asesor inmobiliario</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <VKButton variant="accent" size="lg" fullWidth iconLeft={<DIco n="calendar-check" />} onClick={onToast}>Agendar visita</VKButton>
              <VKButton variant="outline" size="lg" fullWidth iconLeft={<DIco n="phone" />} onClick={onToast}>Llamar al asesor</VKButton>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PropertyDetail });
