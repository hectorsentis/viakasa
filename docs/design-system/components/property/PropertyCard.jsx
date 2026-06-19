import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { FeatureStat } from './FeatureStat.jsx';

/**
 * Signature property listing card: image with status badge, location eyebrow,
 * title, price, and a feature row. Hover lifts with a navy-tinted shadow.
 */
export function PropertyCard({
  image, title, location, price, priceNote = '',
  status = null, statusVariant = 'gold', features = [], onClick, style = {}, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'box-shadow var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--navy-100)' }}>
        {image && (
          <img src={image} alt={title} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform var(--dur-slow) var(--ease-out)',
          }} />
        )}
        {status && (
          <div style={{ position: 'absolute', top: 14, left: 14 }}>
            <Badge variant={statusVariant} tone="solid">{status}</Badge>
          </div>
        )}
      </div>

      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {location && (
          <span style={{
            fontFamily: 'var(--font-brand)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-700)',
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>{location}</span>
        )}
        <h3 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '20px',
          lineHeight: 1.2, color: 'var(--navy-800)', margin: 0,
        }}>{title}</h3>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '24px', color: 'var(--navy-900)' }}>{price}</span>
          {priceNote && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--gray-500)' }}>{priceNote}</span>}
        </div>

        {features.length > 0 && (
          <div style={{
            display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 'auto',
            paddingTop: 16, borderTop: '1px solid var(--border-subtle)',
          }}>
            {features.map((f, i) => (
              <FeatureStat key={i} icon={f.icon} value={f.value} label={f.label} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
