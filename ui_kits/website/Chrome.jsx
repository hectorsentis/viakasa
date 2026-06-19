// Viakasa website — Header + Footer
const { useState } = React;

function Header({ onNav, onLogo, active }) {
  const [scrolled, setScrolled] = useState(false);
  React.useEffect(() => {
    const el = document.getElementById('vk-scroll');
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 30);
    el.addEventListener('scroll', fn);
    return () => el.removeEventListener('scroll', fn);
  }, []);
  const links = [
    ['inicio', 'Inicio'], ['propiedades', 'Propiedades'],
    ['servicios', 'Servicios'], ['nosotros', 'Nosotros'], ['contacto', 'Contacto'],
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(12,26,46,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(8px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      transition: 'background var(--dur-normal) var(--ease-standard), border-color var(--dur-normal)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', height: 76, padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={onLogo} style={{ background: 'none', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="../../assets/viakasa-icon.png" alt="Viakasa" style={{ width: 40, height: 40, borderRadius: 9 }} />
          <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 800, fontSize: 22, letterSpacing: '0.14em', color: '#fff' }}>VIAKASA</span>
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => onNav(id)} style={{
              background: 'none', border: 0, cursor: 'pointer',
              fontFamily: 'var(--font-brand)', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: active === id ? 'var(--gold-400)' : 'rgba(243,241,235,0.82)',
              transition: 'color var(--dur-fast)',
            }}>{label}</button>
          ))}
          <button onClick={() => onNav('contacto')} style={{
            fontFamily: 'var(--font-brand)', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'var(--gold-500)', color: 'var(--navy-900)',
            border: 0, borderRadius: 4, padding: '11px 20px', cursor: 'pointer',
          }}>Valoración gratuita</button>
        </nav>
      </div>
    </header>
  );
}

function Footer({ onNav }) {
  return (
    <footer style={{ background: 'var(--navy-900)', color: 'var(--navy-200)', paddingTop: 64 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 48px', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr', gap: 40 }}>
        <div>
          <img src="../../assets/viakasa-logo.png" alt="Viakasa" style={{ height: 64, marginBottom: 18, marginLeft: -6 }} />
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--navy-300)', maxWidth: 320 }}>
            Tu asesoría inmobiliaria de confianza. La vía directa a tu casa, en Madrid, Tenerife y toda España.
          </p>
        </div>
        {[['Empresa', ['Nosotros', 'Servicios', 'Propiedades', 'Blog']],
          ['Servicios', ['Compra y venta', 'Asesoría legal', 'Financiación', 'Gestión']]].map(([h, items]) => (
          <div key={h}>
            <h4 style={{ fontFamily: 'var(--font-brand)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 16 }}>{h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {items.map(i => <li key={i}><a style={{ color: 'var(--navy-200)', fontSize: 14, textDecoration: 'none' }} href="#" onClick={e => e.preventDefault()}>{i}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h4 style={{ fontFamily: 'var(--font-brand)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 16 }}>Contacto</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}>
            <li style={{ display: 'flex', gap: 9, alignItems: 'center' }}><i data-lucide="phone" style={{ width: 15, height: 15, color: 'var(--gold-400)' }}></i> 600 123 450</li>
            <li style={{ display: 'flex', gap: 9, alignItems: 'center' }}><i data-lucide="mail" style={{ width: 15, height: 15, color: 'var(--gold-400)' }}></i> info@viakasa.es</li>
            <li style={{ display: 'flex', gap: 9, alignItems: 'center' }}><i data-lucide="globe" style={{ width: 15, height: 15, color: 'var(--gold-400)' }}></i> www.viakasa.es</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--navy-400)', fontFamily: 'var(--font-sans)' }}>
          <span>© 2026 Viakasa Asesoría Inmobiliaria</span>
          <span>Aviso legal · Privacidad · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Footer });
