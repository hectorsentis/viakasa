import React from 'react';

/**
 * Service / value card: framed icon, title, description. Optional gold top accent.
 */
export function ServiceCard({ icon, title, description, accent = false, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', gap: 14,
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderTop: accent ? '3px solid var(--gold-500)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)', padding: '28px 26px',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'box-shadow var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out)',
        ...style,
      }} {...rest}>
      {icon && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 52, height: 52, borderRadius: 'var(--radius-md)',
          background: 'var(--navy-800)', color: 'var(--gold-400)',
        }}>{icon}</span>
      )}
      <h3 style={{
        fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '20px',
        color: 'var(--navy-800)', margin: 0, lineHeight: 1.25,
      }}>{title}</h3>
      {description && (
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.6,
          color: 'var(--ink-soft)', margin: 0,
        }}>{description}</p>
      )}
    </div>
  );
}
