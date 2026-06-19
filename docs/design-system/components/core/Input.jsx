import React from 'react';

/**
 * Labeled text/email/tel input with optional leading icon. Calm, formal styling.
 */
export function Input({
  label, type = 'text', placeholder = '', value, defaultValue, onChange,
  iconLeft = null, hint = '', error = '', disabled = false, id, style = {}, ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `vk-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--gold-500)' : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-brand)', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy-700)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: disabled ? 'var(--gray-100)' : 'var(--white)',
        border: `1.5px solid ${borderColor}`,
        borderRadius: 'var(--radius-sm)',
        padding: '0 14px', minHeight: 46,
        boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
        transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
      }}>
        {iconLeft && <span style={{ color: 'var(--gray-500)', display: 'flex' }}>{iconLeft}</span>}
        <input
          id={inputId} type={type} placeholder={placeholder} value={value}
          defaultValue={defaultValue} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--ink)',
            padding: '12px 0', minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {error
        ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--danger)' }}>{error}</span>
        : hint && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--gray-500)' }}>{hint}</span>}
    </div>
  );
}
