// Viakasa website — Home page sections
const { useState } = React;
const { SectionHeading, ServiceCard, PropertyCard, Button, Input, Badge } = window.ViakasaDesignSystem_53b05d;
const Ico = ({ n, s = 16, c }) => <i data-lucide={n} style={{ width: s, height: s, color: c }}></i>;

function Hero({ onNav }) {
  return (
    <section id="inicio" style={{ position: 'relative', minHeight: 660, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,22,38,0.92) 0%, rgba(12,26,46,0.78) 48%, rgba(12,26,46,0.35) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 32px 80px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>
          <span style={{ fontFamily: 'var(--font-brand)', fontSize: 13, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-400)', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 2, background: 'var(--gold-500)' }}></span>Madrid · Tenerife · Toda España
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'clamp(40px,5.5vw,68px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: '#fff', margin: '20px 0 18px', textWrap: 'balance' }}>
            La vía directa a tu casa
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(243,241,235,0.85)', maxWidth: 540, marginBottom: 34 }}>
            Asesoría inmobiliaria integral: compra, venta, gestión legal y financiera con un único interlocutor de confianza.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant="accent" size="lg" iconRight={<Ico n="arrow-right" />} onClick={() => onNav('propiedades')}>Ver propiedades</Button>
            <Button variant="outline" size="lg" onClick={() => onNav('contacto')}
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>Valoración gratuita</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [['+15', 'Años de experiencia'], ['+850', 'Operaciones cerradas'], ['98%', 'Clientes satisfechos'], ['2', 'Sedes · Madrid y Tenerife']];
  return (
    <section style={{ background: 'var(--navy-800)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '38px 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {stats.map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 40, color: 'var(--gold-400)', lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: 'var(--font-brand)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--navy-200)', marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const svcs = [
    ['home', 'Compra y venta', 'Valoración realista, negociación firme y cierre sin sorpresas. Tú decides, nosotros ejecutamos.', true],
    ['scale', 'Asesoría legal', 'Revisión de contratos, notaría, registro y due diligence con respaldo jurídico propio.', false],
    ['landmark', 'Financiación', 'Estudio hipotecario y acceso a las mejores condiciones del mercado para tu perfil.', false],
    ['key', 'Gestión integral', 'Alquiler, administración y puesta a punto de tu inmueble. Tranquilidad total.', false],
  ];
  return (
    <section id="servicios" style={{ background: 'var(--paper)', padding: '90px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <SectionHeading align="center" eyebrow="Nuestros servicios"
          title="Acompañamiento integral, de principio a fin"
          intro="Un único interlocutor de confianza para cada decisión sobre tu vivienda." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22, marginTop: 48 }}>
          {svcs.map(([icon, title, desc, accent]) => (
            <ServiceCard key={title} accent={accent} icon={<Ico n={icon} s={24} />} title={title} description={desc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Listings({ listings, onOpen }) {
  const [filter, setFilter] = useState('Todas');
  const tabs = ['Todas', 'Madrid', 'Tenerife'];
  const shown = listings.filter(l => filter === 'Todas' || l.city === filter);
  return (
    <section id="propiedades" style={{ background: 'var(--surface-sunken)', padding: '90px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <SectionHeading eyebrow="Propiedades destacadas" title="Una selección que merece tu atención" />
          <div style={{ display: 'flex', gap: 8 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                fontFamily: 'var(--font-brand)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '9px 18px', borderRadius: 999, cursor: 'pointer',
                border: '1.5px solid ' + (filter === t ? 'var(--navy-800)' : 'var(--border-default)'),
                background: filter === t ? 'var(--navy-800)' : 'transparent',
                color: filter === t ? '#fff' : 'var(--navy-700)', transition: 'all var(--dur-fast)',
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26, marginTop: 44 }}>
          {shown.map(l => (
            <PropertyCard key={l.id} image={l.image} status={l.status} statusVariant={l.statusVariant}
              location={l.location} title={l.title} price={l.price} priceNote={l.priceNote}
              onClick={() => onOpen(l.id)}
              features={[
                { icon: <Ico n="bed-double" c="var(--gold-600)" />, value: l.beds, label: 'Hab.' },
                { icon: <Ico n="bath" c="var(--gold-600)" />, value: l.baths, label: 'Baños' },
                { icon: <Ico n="maximize-2" c="var(--gold-600)" />, value: l.area, label: 'Sup.' },
              ]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" style={{ background: 'var(--paper)', padding: '90px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80" alt=""
            style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: -24, right: -24, background: 'var(--navy-800)', color: '#fff', padding: '24px 28px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 34, color: 'var(--gold-400)', lineHeight: 1 }}>+15</div>
            <div style={{ fontFamily: 'var(--font-brand)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--navy-200)', marginTop: 6 }}>años a tu lado</div>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Quiénes somos"
            title="Confianza, cercanía y rigor en cada operación"
            intro="En Viakasa entendemos que comprar o vender una vivienda es una de las decisiones más importantes de tu vida. Por eso te acompañamos con transparencia y conocimiento real del mercado." />
          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['Asesoramiento personalizado, sin prisas', 'Equipo legal y financiero propio', 'Conocimiento profundo de Madrid y Canarias'].map(t => (
              <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 16, color: 'var(--ink)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, background: 'var(--gold-100)', flexShrink: 0 }}>
                  <Ico n="check" s={15} c="var(--gold-700)" />
                </span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ onToast }) {
  const [sent, setSent] = useState(false);
  return (
    <section id="contacto" style={{ background: 'var(--navy-900)', padding: '90px 0', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <SectionHeading invert eyebrow="Hablemos"
            title="Solicita tu valoración gratuita"
            intro="Cuéntanos qué necesitas y un asesor te contactará en menos de 24 horas. Sin compromiso." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
            {[['phone', '600 123 450'], ['mail', 'info@viakasa.es'], ['map-pin', 'Madrid · Santa Cruz de Tenerife']].map(([i, t]) => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--navy-200)', fontSize: 15 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 8, background: 'rgba(193,154,75,0.16)' }}>
                  <Ico n={i} s={17} c="var(--gold-400)" />
                </span>{t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Nombre" placeholder="Tu nombre" />
            <Input label="Email" type="email" placeholder="tu@email.com" iconLeft={<Ico n="mail" c="var(--gray-500)" />} />
            <Input label="Teléfono" placeholder="600 000 000" iconLeft={<Ico n="phone" c="var(--gray-500)" />} />
            <Button variant="accent" size="lg" fullWidth onClick={() => { setSent(true); onToast(); }}>
              {sent ? 'Solicitud enviada ✓' : 'Solicitar valoración'}
            </Button>
            <p style={{ fontSize: 12, color: 'var(--gray-500)', textAlign: 'center', margin: 0 }}>Al enviar aceptas nuestra política de privacidad.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, TrustStrip, Services, Listings, About, Contact });
