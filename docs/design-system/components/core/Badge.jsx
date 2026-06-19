import React from 'react';

/**
 * Small status / category label. Solid, soft, or outline.
 */
export function Badge({ children, variant = 'neutral', tone = 'soft', style = {}, ...rest }) {
  const palettes = {
    gold:    { solid: ['var(--gold-500)', 'var(--navy-900)'], soft: ['var(--gold-100)', 'var(--gold-800)'], line: ['var(--gold-500)', 'var(--gold-800)'] },
    navy:    { solid: ['var(--navy-800)', 'var(--text-on-navy)'], soft: ['var(--navy-100)', 'var(--navy-700)'], line: ['var(--navy-300)', 'var(--navy-700)'] },
    neutral: { solid: ['var(--gray-700)', '#fff'], soft: ['var(--gray-100)', 'var(--gray-700)'], line: ['var(--gray-300)', 'var(--gray-700)'] },
    success: { solid: ['var(--success)', '#fff'], soft: ['var(--success-bg)', 'var(--success)'], line: ['var(--success)', 'var(--success)'] },
    warning: { solid: ['var(--warning)', '#fff'], soft: ['var(--warning-bg)', 'var(--warning)'], line: ['var(--warning)', 'var(--warning)'] },
    danger:  { solid: ['var(--danger)', '#fff'], soft: ['var(--danger-bg)', 'var(--danger)'], line: ['var(--danger)', 'var(--danger)'] },
  };
  const p = palettes[variant] || palettes.neutral;
  const [bg, fg] = p[tone] || p.soft;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: 'var(--font-brand)',
        fontWeight: 600,
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        lineHeight: 1,
        padding: '5px 10px',
        borderRadius: 'var(--radius-sm)',
        background: tone === 'line' ? 'transparent' : bg,
        color: fg,
        border: tone === 'line' ? `1px solid ${bg}` : '1px solid transparent',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
