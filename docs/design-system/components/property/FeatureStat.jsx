import React from 'react';

/**
 * Small feature stat for properties — icon + value + label (e.g. 3 hab · 2 baños · 95 m²).
 */
export function FeatureStat({ icon = null, value, label, style = {}, ...rest }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...style }} {...rest}>
      {icon && <span style={{ color: 'var(--gold-600)', display: 'flex' }}>{icon}</span>}
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '15px', color: 'var(--navy-800)' }}>{value}</span>
        {label && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--gray-500)', letterSpacing: '0.02em' }}>{label}</span>}
      </span>
    </div>
  );
}
