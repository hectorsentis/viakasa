import React from 'react';

/**
 * Viakasa primary action button.
 * Variants: primary (navy), accent (gold), outline, ghost, link.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', fontSize: '13px', height: 36, gap: 7 },
    md: { padding: '11px 22px', fontSize: '14px', height: 44, gap: 8 },
    lg: { padding: '15px 30px', fontSize: '15px', height: 54, gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontFamily: 'var(--font-brand)',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontSize: s.fontSize,
    padding: s.padding,
    minHeight: s.height,
    width: fullWidth ? '100%' : 'auto',
    border: '1.5px solid transparent',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  };

  const variants = {
    primary: { background: 'var(--navy-800)', color: 'var(--text-on-navy)', borderColor: 'var(--navy-800)' },
    accent:  { background: 'var(--gold-500)', color: 'var(--navy-900)', borderColor: 'var(--gold-500)' },
    outline: { background: 'transparent', color: 'var(--navy-800)', borderColor: 'var(--navy-300)' },
    ghost:   { background: 'transparent', color: 'var(--navy-800)', borderColor: 'transparent' },
    link:    { background: 'transparent', color: 'var(--gold-700)', borderColor: 'transparent', textTransform: 'none', fontFamily: 'var(--font-sans)', letterSpacing: 0, padding: '4px 2px', minHeight: 'auto', textDecoration: 'underline', textUnderlineOffset: '3px' },
  };

  const [hover, setHover] = React.useState(false);
  const hoverStyles = {
    primary: { background: 'var(--navy-700)', borderColor: 'var(--navy-700)' },
    accent:  { background: 'var(--gold-600)', borderColor: 'var(--gold-600)' },
    outline: { background: 'var(--navy-800)', color: 'var(--text-on-navy)', borderColor: 'var(--navy-800)' },
    ghost:   { background: 'var(--paper-warm)' },
    link:    { color: 'var(--gold-800)' },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        ...variants[variant],
        ...(hover && !disabled ? hoverStyles[variant] : {}),
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
