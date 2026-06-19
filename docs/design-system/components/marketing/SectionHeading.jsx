import React from 'react';

/**
 * Section heading block: gold eyebrow + serif title + optional intro.
 * The recurring rhythm device across Viakasa marketing surfaces.
 */
export function SectionHeading({
  eyebrow, title, intro, align = 'left', invert = false, rule = true, style = {}, ...rest
}) {
  const headingColor = invert ? 'var(--text-on-navy)' : 'var(--navy-800)';
  const introColor = invert ? 'var(--navy-200)' : 'var(--ink-soft)';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align, maxWidth: align === 'center' ? 660 : 720,
      marginInline: align === 'center' ? 'auto' : 0, ...style,
    }} {...rest}>
      {eyebrow && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--font-brand)', fontSize: '13px', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-600)',
        }}>
          {rule && <span style={{ width: 28, height: 2, background: 'var(--gold-500)' }} />}
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 600,
          fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.12,
          letterSpacing: '-0.01em', color: headingColor, margin: 0, textWrap: 'balance',
        }}>{title}</h2>
      )}
      {intro && (
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '17px', lineHeight: 1.65,
          color: introColor, margin: 0, textWrap: 'pretty',
        }}>{intro}</p>
      )}
    </div>
  );
}
