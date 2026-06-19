/* @ds-bundle: {"format":3,"namespace":"ViakasaDesignSystem_53b05d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SectionHeading","sourcePath":"components/marketing/SectionHeading.jsx"},{"name":"ServiceCard","sourcePath":"components/marketing/ServiceCard.jsx"},{"name":"FeatureStat","sourcePath":"components/property/FeatureStat.jsx"},{"name":"PropertyCard","sourcePath":"components/property/PropertyCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"3043818eee7c","components/core/Button.jsx":"956263de854f","components/core/Input.jsx":"4f722c37303d","components/marketing/SectionHeading.jsx":"a86db090692e","components/marketing/ServiceCard.jsx":"d2bcc24568fd","components/property/FeatureStat.jsx":"9cd44e88c240","components/property/PropertyCard.jsx":"6e1c21c019af","ui_kits/website/Chrome.jsx":"9c2f6f59ad84","ui_kits/website/Home.jsx":"ac27c05b93d7","ui_kits/website/PropertyDetail.jsx":"9d920c9312f3","ui_kits/website/data.js":"c782589d1a9b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ViakasaDesignSystem_53b05d = window.ViakasaDesignSystem_53b05d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status / category label. Solid, soft, or outline.
 */
function Badge({
  children,
  variant = 'neutral',
  tone = 'soft',
  style = {},
  ...rest
}) {
  const palettes = {
    gold: {
      solid: ['var(--gold-500)', 'var(--navy-900)'],
      soft: ['var(--gold-100)', 'var(--gold-800)'],
      line: ['var(--gold-500)', 'var(--gold-800)']
    },
    navy: {
      solid: ['var(--navy-800)', 'var(--text-on-navy)'],
      soft: ['var(--navy-100)', 'var(--navy-700)'],
      line: ['var(--navy-300)', 'var(--navy-700)']
    },
    neutral: {
      solid: ['var(--gray-700)', '#fff'],
      soft: ['var(--gray-100)', 'var(--gray-700)'],
      line: ['var(--gray-300)', 'var(--gray-700)']
    },
    success: {
      solid: ['var(--success)', '#fff'],
      soft: ['var(--success-bg)', 'var(--success)'],
      line: ['var(--success)', 'var(--success)']
    },
    warning: {
      solid: ['var(--warning)', '#fff'],
      soft: ['var(--warning-bg)', 'var(--warning)'],
      line: ['var(--warning)', 'var(--warning)']
    },
    danger: {
      solid: ['var(--danger)', '#fff'],
      soft: ['var(--danger-bg)', 'var(--danger)'],
      line: ['var(--danger)', 'var(--danger)']
    }
  };
  const p = palettes[variant] || palettes.neutral;
  const [bg, fg] = p[tone] || p.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Viakasa primary action button.
 * Variants: primary (navy), accent (gold), outline, ghost, link.
 */
function Button({
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
    sm: {
      padding: '8px 16px',
      fontSize: '13px',
      height: 36,
      gap: 7
    },
    md: {
      padding: '11px 22px',
      fontSize: '14px',
      height: 44,
      gap: 8
    },
    lg: {
      padding: '15px 30px',
      fontSize: '15px',
      height: 54,
      gap: 10
    }
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
    lineHeight: 1
  };
  const variants = {
    primary: {
      background: 'var(--navy-800)',
      color: 'var(--text-on-navy)',
      borderColor: 'var(--navy-800)'
    },
    accent: {
      background: 'var(--gold-500)',
      color: 'var(--navy-900)',
      borderColor: 'var(--gold-500)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--navy-800)',
      borderColor: 'var(--navy-300)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--navy-800)',
      borderColor: 'transparent'
    },
    link: {
      background: 'transparent',
      color: 'var(--gold-700)',
      borderColor: 'transparent',
      textTransform: 'none',
      fontFamily: 'var(--font-sans)',
      letterSpacing: 0,
      padding: '4px 2px',
      minHeight: 'auto',
      textDecoration: 'underline',
      textUnderlineOffset: '3px'
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyles = {
    primary: {
      background: 'var(--navy-700)',
      borderColor: 'var(--navy-700)'
    },
    accent: {
      background: 'var(--gold-600)',
      borderColor: 'var(--gold-600)'
    },
    outline: {
      background: 'var(--navy-800)',
      color: 'var(--text-on-navy)',
      borderColor: 'var(--navy-800)'
    },
    ghost: {
      background: 'var(--paper-warm)'
    },
    link: {
      color: 'var(--gold-800)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      ...(hover && !disabled ? hoverStyles[variant] : {}),
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Labeled text/email/tel input with optional leading icon. Calm, formal styling.
 */
function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  iconLeft = null,
  hint = '',
  error = '',
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `vk-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--gold-500)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--navy-700)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: disabled ? 'var(--gray-100)' : 'var(--white)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      padding: '0 14px',
      minHeight: 46,
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-500)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      color: 'var(--ink)',
      padding: '12px 0',
      minWidth: 0
    }
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      color: 'var(--danger)'
    }
  }, error) : hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      color: 'var(--gray-500)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Section heading block: gold eyebrow + serif title + optional intro.
 * The recurring rhythm device across Viakasa marketing surfaces.
 */
function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  invert = false,
  rule = true,
  style = {},
  ...rest
}) {
  const headingColor = invert ? 'var(--text-on-navy)' : 'var(--navy-800)';
  const introColor = invert ? 'var(--navy-200)' : 'var(--ink-soft)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      maxWidth: align === 'center' ? 660 : 720,
      marginInline: align === 'center' ? 'auto' : 0,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-brand)',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--gold-600)'
    }
  }, rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 2,
      background: 'var(--gold-500)'
    }
  }), eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 'clamp(28px, 4vw, 44px)',
      lineHeight: 1.12,
      letterSpacing: '-0.01em',
      color: headingColor,
      margin: 0,
      textWrap: 'balance'
    }
  }, title), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '17px',
      lineHeight: 1.65,
      color: introColor,
      margin: 0,
      textWrap: 'pretty'
    }
  }, intro));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Service / value card: framed icon, title, description. Optional gold top accent.
 */
function ServiceCard({
  icon,
  title,
  description,
  accent = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderTop: accent ? '3px solid var(--gold-500)' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 26px',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      transform: hover ? 'translateY(-3px)' : 'none',
      transition: 'box-shadow var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-md)',
      background: 'var(--navy-800)',
      color: 'var(--gold-400)'
    }
  }, icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: '20px',
      color: 'var(--navy-800)',
      margin: 0,
      lineHeight: 1.25
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      lineHeight: 1.6,
      color: 'var(--ink-soft)',
      margin: 0
    }
  }, description));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/property/FeatureStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small feature stat for properties — icon + value + label (e.g. 3 hab · 2 baños · 95 m²).
 */
function FeatureStat({
  icon = null,
  value,
  label,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-600)',
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontWeight: 700,
      fontSize: '15px',
      color: 'var(--navy-800)'
    }
  }, value), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '11px',
      color: 'var(--gray-500)',
      letterSpacing: '0.02em'
    }
  }, label)));
}
Object.assign(__ds_scope, { FeatureStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/property/FeatureStat.jsx", error: String((e && e.message) || e) }); }

// components/property/PropertyCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Signature property listing card: image with status badge, location eyebrow,
 * title, price, and a feature row. Hover lifts with a navy-tinted shadow.
 */
function PropertyCard({
  image,
  title,
  location,
  price,
  priceNote = '',
  status = null,
  statusVariant = 'gold',
  features = [],
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'box-shadow var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out)',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      overflow: 'hidden',
      background: 'var(--navy-100)'
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: hover ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), status && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: statusVariant,
    tone: "solid"
  }, status))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, location && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--gold-700)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, location), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: 1.2,
      color: 'var(--navy-800)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: '24px',
      color: 'var(--navy-900)'
    }
  }, price), priceNote && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      color: 'var(--gray-500)'
    }
  }, priceNote)), features.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      flexWrap: 'wrap',
      marginTop: 'auto',
      paddingTop: 16,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement(__ds_scope.FeatureStat, {
    key: i,
    icon: f.icon,
    value: f.value,
    label: f.label
  })))));
}
Object.assign(__ds_scope, { PropertyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/property/PropertyCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
// Viakasa website — Header + Footer
const {
  useState
} = React;
function Header({
  onNav,
  onLogo,
  active
}) {
  const [scrolled, setScrolled] = useState(false);
  React.useEffect(() => {
    const el = document.getElementById('vk-scroll');
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 30);
    el.addEventListener('scroll', fn);
    return () => el.removeEventListener('scroll', fn);
  }, []);
  const links = [['inicio', 'Inicio'], ['propiedades', 'Propiedades'], ['servicios', 'Servicios'], ['nosotros', 'Nosotros'], ['contacto', 'Contacto']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(12,26,46,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(8px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      transition: 'background var(--dur-normal) var(--ease-standard), border-color var(--dur-normal)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      height: 76,
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onLogo,
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/viakasa-icon.png",
    alt: "Viakasa",
    style: {
      width: 40,
      height: 40,
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: '0.14em',
      color: '#fff'
    }
  }, "VIAKASA")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 34
    }
  }, links.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => onNav(id),
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-brand)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: active === id ? 'var(--gold-400)' : 'rgba(243,241,235,0.82)',
      transition: 'color var(--dur-fast)'
    }
  }, label)), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('contacto'),
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      background: 'var(--gold-500)',
      color: 'var(--navy-900)',
      border: 0,
      borderRadius: 4,
      padding: '11px 20px',
      cursor: 'pointer'
    }
  }, "Valoraci\xF3n gratuita"))));
}
function Footer({
  onNav
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--navy-900)',
      color: 'var(--navy-200)',
      paddingTop: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 32px 48px',
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/viakasa-logo.png",
    alt: "Viakasa",
    style: {
      height: 64,
      marginBottom: 18,
      marginLeft: -6
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.7,
      color: 'var(--navy-300)',
      maxWidth: 320
    }
  }, "Tu asesor\xEDa inmobiliaria de confianza. La v\xEDa directa a tu casa, en Madrid, Tenerife y toda Espa\xF1a.")), [['Empresa', ['Nosotros', 'Servicios', 'Propiedades', 'Blog']], ['Servicios', ['Compra y venta', 'Asesoría legal', 'Financiación', 'Gestión']]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginBottom: 16
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--navy-200)',
      fontSize: 14,
      textDecoration: 'none'
    },
    href: "#",
    onClick: e => e.preventDefault()
  }, i)))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginBottom: 16
    }
  }, "Contacto"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "phone",
    style: {
      width: 15,
      height: 15,
      color: 'var(--gold-400)'
    }
  }), " 600 123 450"), /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "mail",
    style: {
      width: 15,
      height: 15,
      color: 'var(--gold-400)'
    }
  }), " info@viakasa.es"), /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "globe",
    style: {
      width: 15,
      height: 15,
      color: 'var(--gold-400)'
    }
  }), " www.viakasa.es")))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      color: 'var(--navy-400)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Viakasa Asesor\xEDa Inmobiliaria"), /*#__PURE__*/React.createElement("span", null, "Aviso legal \xB7 Privacidad \xB7 Cookies"))));
}
Object.assign(window, {
  Header,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
// Viakasa website — Home page sections
const {
  useState
} = React;
const {
  SectionHeading,
  ServiceCard,
  PropertyCard,
  Button,
  Input,
  Badge
} = window.ViakasaDesignSystem_53b05d;
const Ico = ({
  n,
  s = 16,
  c
}) => /*#__PURE__*/React.createElement("i", {
  "data-lucide": n,
  style: {
    width: s,
    height: s,
    color: c
  }
});
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "inicio",
    style: {
      position: 'relative',
      minHeight: 660,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(105deg, rgba(10,22,38,0.92) 0%, rgba(12,26,46,0.78) 48%, rgba(12,26,46,0.35) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1280,
      margin: '0 auto',
      padding: '120px 32px 80px',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 2,
      background: 'var(--gold-500)'
    }
  }), "Madrid \xB7 Tenerife \xB7 Toda Espa\xF1a"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 'clamp(40px,5.5vw,68px)',
      lineHeight: 1.05,
      letterSpacing: '-0.015em',
      color: '#fff',
      margin: '20px 0 18px',
      textWrap: 'balance'
    }
  }, "La v\xEDa directa a tu casa"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'rgba(243,241,235,0.85)',
      maxWidth: 540,
      marginBottom: 34
    }
  }, "Asesor\xEDa inmobiliaria integral: compra, venta, gesti\xF3n legal y financiera con un \xFAnico interlocutor de confianza."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      n: "arrow-right"
    }),
    onClick: () => onNav('propiedades')
  }, "Ver propiedades"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    onClick: () => onNav('contacto'),
    style: {
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.5)'
    }
  }, "Valoraci\xF3n gratuita")))));
}
function TrustStrip() {
  const stats = [['+15', 'Años de experiencia'], ['+850', 'Operaciones cerradas'], ['98%', 'Clientes satisfechos'], ['2', 'Sedes · Madrid y Tenerife']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--navy-800)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '38px 32px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24
    }
  }, stats.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: 40,
      color: 'var(--gold-400)',
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--navy-200)',
      marginTop: 8
    }
  }, l)))));
}
function Services() {
  const svcs = [['home', 'Compra y venta', 'Valoración realista, negociación firme y cierre sin sorpresas. Tú decides, nosotros ejecutamos.', true], ['scale', 'Asesoría legal', 'Revisión de contratos, notaría, registro y due diligence con respaldo jurídico propio.', false], ['landmark', 'Financiación', 'Estudio hipotecario y acceso a las mejores condiciones del mercado para tu perfil.', false], ['key', 'Gestión integral', 'Alquiler, administración y puesta a punto de tu inmueble. Tranquilidad total.', false]];
  return /*#__PURE__*/React.createElement("section", {
    id: "servicios",
    style: {
      background: 'var(--paper)',
      padding: '90px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 32px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Nuestros servicios",
    title: "Acompa\xF1amiento integral, de principio a fin",
    intro: "Un \xFAnico interlocutor de confianza para cada decisi\xF3n sobre tu vivienda."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 22,
      marginTop: 48
    }
  }, svcs.map(([icon, title, desc, accent]) => /*#__PURE__*/React.createElement(ServiceCard, {
    key: title,
    accent: accent,
    icon: /*#__PURE__*/React.createElement(Ico, {
      n: icon,
      s: 24
    }),
    title: title,
    description: desc
  })))));
}
function Listings({
  listings,
  onOpen
}) {
  const [filter, setFilter] = useState('Todas');
  const tabs = ['Todas', 'Madrid', 'Tenerife'];
  const shown = listings.filter(l => filter === 'Todas' || l.city === filter);
  return /*#__PURE__*/React.createElement("section", {
    id: "propiedades",
    style: {
      background: 'var(--surface-sunken)',
      padding: '90px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Propiedades destacadas",
    title: "Una selecci\xF3n que merece tu atenci\xF3n"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setFilter(t),
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '9px 18px',
      borderRadius: 999,
      cursor: 'pointer',
      border: '1.5px solid ' + (filter === t ? 'var(--navy-800)' : 'var(--border-default)'),
      background: filter === t ? 'var(--navy-800)' : 'transparent',
      color: filter === t ? '#fff' : 'var(--navy-700)',
      transition: 'all var(--dur-fast)'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 26,
      marginTop: 44
    }
  }, shown.map(l => /*#__PURE__*/React.createElement(PropertyCard, {
    key: l.id,
    image: l.image,
    status: l.status,
    statusVariant: l.statusVariant,
    location: l.location,
    title: l.title,
    price: l.price,
    priceNote: l.priceNote,
    onClick: () => onOpen(l.id),
    features: [{
      icon: /*#__PURE__*/React.createElement(Ico, {
        n: "bed-double",
        c: "var(--gold-600)"
      }),
      value: l.beds,
      label: 'Hab.'
    }, {
      icon: /*#__PURE__*/React.createElement(Ico, {
        n: "bath",
        c: "var(--gold-600)"
      }),
      value: l.baths,
      label: 'Baños'
    }, {
      icon: /*#__PURE__*/React.createElement(Ico, {
        n: "maximize-2",
        c: "var(--gold-600)"
      }),
      value: l.area,
      label: 'Sup.'
    }]
  })))));
}
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "nosotros",
    style: {
      background: 'var(--paper)',
      padding: '90px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
    alt: "",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -24,
      right: -24,
      background: 'var(--navy-800)',
      color: '#fff',
      padding: '24px 28px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: 34,
      color: 'var(--gold-400)',
      lineHeight: 1
    }
  }, "+15"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--navy-200)',
      marginTop: 6
    }
  }, "a\xF1os a tu lado"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Qui\xE9nes somos",
    title: "Confianza, cercan\xEDa y rigor en cada operaci\xF3n",
    intro: "En Viakasa entendemos que comprar o vender una vivienda es una de las decisiones m\xE1s importantes de tu vida. Por eso te acompa\xF1amos con transparencia y conocimiento real del mercado."
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '28px 0 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, ['Asesoramiento personalizado, sin prisas', 'Equipo legal y financiero propio', 'Conocimiento profundo de Madrid y Canarias'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      fontSize: 16,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      borderRadius: 999,
      background: 'var(--gold-100)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: "check",
    s: 15,
    c: "var(--gold-700)"
  })), t))))));
}
function Contact({
  onToast
}) {
  const [sent, setSent] = useState(false);
  return /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    style: {
      background: 'var(--navy-900)',
      padding: '90px 0',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    invert: true,
    eyebrow: "Hablemos",
    title: "Solicita tu valoraci\xF3n gratuita",
    intro: "Cu\xE9ntanos qu\xE9 necesitas y un asesor te contactar\xE1 en menos de 24 horas. Sin compromiso."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 32
    }
  }, [['phone', '600 123 450'], ['mail', 'info@viakasa.es'], ['map-pin', 'Madrid · Santa Cruz de Tenerife']].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      color: 'var(--navy-200)',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 38,
      height: 38,
      borderRadius: 8,
      background: 'rgba(193,154,75,0.16)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: i,
    s: 17,
    c: "var(--gold-400)"
  })), t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--white)',
      borderRadius: 'var(--radius-lg)',
      padding: 32,
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre",
    placeholder: "Tu nombre"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "tu@email.com",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "mail",
      c: "var(--gray-500)"
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Tel\xE9fono",
    placeholder: "600 000 000",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "phone",
      c: "var(--gray-500)"
    })
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    onClick: () => {
      setSent(true);
      onToast();
    }
  }, sent ? 'Solicitud enviada ✓' : 'Solicitar valoración'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--gray-500)',
      textAlign: 'center',
      margin: 0
    }
  }, "Al enviar aceptas nuestra pol\xEDtica de privacidad.")))));
}
Object.assign(window, {
  Hero,
  TrustStrip,
  Services,
  Listings,
  About,
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PropertyDetail.jsx
try { (() => {
// Viakasa website — Property detail view
const {
  useState
} = React;
const {
  Button: VKButton,
  Badge: VKBadge,
  FeatureStat,
  SectionHeading: VKHeading
} = window.ViakasaDesignSystem_53b05d;
const DIco = ({
  n,
  s = 16,
  c
}) => /*#__PURE__*/React.createElement("i", {
  "data-lucide": n,
  style: {
    width: s,
    height: s,
    color: c
  }
});
function PropertyDetail({
  listing,
  onBack,
  onToast
}) {
  const [mainImg, setMainImg] = useState(listing.gallery[0]);
  React.useEffect(() => {
    setMainImg(listing.gallery[0]);
  }, [listing.id]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '110px 32px 80px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-brand)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--navy-700)',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(DIco, {
    n: "arrow-left",
    s: 15
  }), " Volver a propiedades"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: listing.gallery.length > 1 ? '1fr 280px' : '1fr',
      gap: 14,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: mainImg,
    alt: listing.title,
    style: {
      width: '100%',
      height: 460,
      objectFit: 'cover',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)'
    }
  }), listing.gallery.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, listing.gallery.map((g, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: g,
    alt: "",
    onClick: () => setMainImg(g),
    style: {
      width: '100%',
      height: 144,
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      outline: mainImg === g ? '2.5px solid var(--gold-500)' : '2.5px solid transparent',
      outlineOffset: 2,
      flex: 1
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(VKBadge, {
    variant: listing.statusVariant,
    tone: "solid"
  }, listing.status), /*#__PURE__*/React.createElement(VKBadge, {
    variant: "neutral",
    tone: "line"
  }, listing.type)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--gold-700)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(DIco, {
    n: "map-pin",
    s: 14
  }), " ", listing.location), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 40,
      lineHeight: 1.12,
      color: 'var(--navy-800)',
      margin: '12px 0 24px'
    }
  }, listing.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      flexWrap: 'wrap',
      padding: '22px 0',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(FeatureStat, {
    icon: /*#__PURE__*/React.createElement(DIco, {
      n: "bed-double",
      c: "var(--gold-600)"
    }),
    value: listing.beds,
    label: "Habitaciones"
  }), /*#__PURE__*/React.createElement(FeatureStat, {
    icon: /*#__PURE__*/React.createElement(DIco, {
      n: "bath",
      c: "var(--gold-600)"
    }),
    value: listing.baths,
    label: "Ba\xF1os"
  }), /*#__PURE__*/React.createElement(FeatureStat, {
    icon: /*#__PURE__*/React.createElement(DIco, {
      n: "maximize-2",
      c: "var(--gold-600)"
    }),
    value: listing.area,
    label: "Superficie"
  }), /*#__PURE__*/React.createElement(FeatureStat, {
    icon: /*#__PURE__*/React.createElement(DIco, {
      n: "calendar",
      c: "var(--gold-600)"
    }),
    value: listing.year,
    label: "A\xF1o"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 22,
      color: 'var(--navy-800)',
      margin: '32px 0 12px'
    }
  }, "Descripci\xF3n"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.75,
      color: 'var(--ink-soft)',
      maxWidth: 640
    }
  }, listing.desc), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 22,
      color: 'var(--navy-800)',
      margin: '32px 0 14px'
    }
  }, "Caracter\xEDsticas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 12,
      maxWidth: 560
    }
  }, ['Aire acondicionado', 'Plaza de garaje', 'Trastero', 'Exterior', 'Ascensor', 'Cocina equipada'].map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'center',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement(DIco, {
    n: "check",
    s: 15,
    c: "var(--gold-700)"
  }), " ", f)))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 100,
      background: 'var(--white)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--gray-500)'
    }
  }, "Precio"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      margin: '4px 0 22px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: 36,
      color: 'var(--navy-900)'
    }
  }, listing.price)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 0',
      borderTop: '1px solid var(--border-subtle)',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&q=80",
    alt: "",
    style: {
      width: 48,
      height: 48,
      borderRadius: 999,
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 16,
      color: 'var(--navy-800)'
    }
  }, "Carlos M\xE9ndez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--gray-500)'
    }
  }, "Asesor inmobiliario"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(VKButton, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(DIco, {
      n: "calendar-check"
    }),
    onClick: onToast
  }, "Agendar visita"), /*#__PURE__*/React.createElement(VKButton, {
    variant: "outline",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(DIco, {
      n: "phone"
    }),
    onClick: onToast
  }, "Llamar al asesor"))))));
}
Object.assign(window, {
  PropertyDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PropertyDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Viakasa — demo listing data for the website UI kit
window.VK_LISTINGS = [{
  id: 'p1',
  title: 'Piso reformado con terraza',
  location: 'Barrio de Salamanca · Madrid',
  city: 'Madrid',
  price: '485.000 €',
  priceNote: '· 5.105 €/m²',
  status: 'En venta',
  statusVariant: 'success',
  beds: 3,
  baths: 2,
  area: '95 m²',
  year: 2019,
  type: 'Piso',
  image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80',
  gallery: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80', 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80'],
  desc: 'Vivienda exterior completamente reformada en una de las zonas más exclusivas de Madrid. Salón luminoso con salida a terraza, cocina office y tres dormitorios. Edificio con portero físico y ascensor.'
}, {
  id: 'p2',
  title: 'Villa con vistas al océano',
  location: 'Costa Adeje · Tenerife',
  city: 'Tenerife',
  price: '1.250.000 €',
  priceNote: '',
  status: 'Destacado',
  statusVariant: 'gold',
  beds: 5,
  baths: 4,
  area: '320 m²',
  year: 2021,
  type: 'Villa',
  image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
  gallery: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'],
  desc: 'Villa de obra reciente con piscina infinity y vistas despejadas al Atlántico. Acabados de alta gama, domótica integral y amplias zonas exteriores. Una oportunidad única en el sur de Tenerife.'
}, {
  id: 'p3',
  title: 'Ático dúplex con azotea privada',
  location: 'Chamberí · Madrid',
  city: 'Madrid',
  price: '720.000 €',
  priceNote: '· 6.000 €/m²',
  status: 'En venta',
  statusVariant: 'success',
  beds: 4,
  baths: 3,
  area: '120 m²',
  year: 2018,
  type: 'Ático',
  image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&q=80',
  gallery: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&q=80', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80'],
  desc: 'Espectacular dúplex en planta alta con azotea privada de 40 m². Distribución diáfana, mucha luz natural y materiales nobles. A pasos de la zona comercial de Chamberí.'
}, {
  id: 'p4',
  title: 'Adosado familiar con jardín',
  location: 'La Laguna · Tenerife',
  city: 'Tenerife',
  price: '395.000 €',
  priceNote: '',
  status: 'Nuevo',
  statusVariant: 'navy',
  beds: 4,
  baths: 3,
  area: '180 m²',
  year: 2016,
  type: 'Adosado',
  image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1000&q=80',
  gallery: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1000&q=80', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'],
  desc: 'Casa adosada en urbanización tranquila con jardín privado y plaza de garaje doble. Cuatro dormitorios, salón con chimenea y cocina equipada. Ideal para familias.'
}, {
  id: 'p5',
  title: 'Estudio de inversión céntrico',
  location: 'Centro · Madrid',
  city: 'Madrid',
  price: '218.000 €',
  priceNote: '· alta rentabilidad',
  status: 'En venta',
  statusVariant: 'success',
  beds: 1,
  baths: 1,
  area: '42 m²',
  year: 2015,
  type: 'Estudio',
  image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=80',
  gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=80', 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&q=80'],
  desc: 'Estudio reformado en pleno centro, perfecto para inversión en alquiler turístico o residencial. Totalmente amueblado y listo para entrar. Rentabilidad estimada del 6%.'
}, {
  id: 'p6',
  title: 'Apartamento primera línea de playa',
  location: 'Los Cristianos · Tenerife',
  city: 'Tenerife',
  price: '560.000 €',
  priceNote: '',
  status: 'Vendido',
  statusVariant: 'danger',
  beds: 2,
  baths: 2,
  area: '88 m²',
  year: 2020,
  type: 'Apartamento',
  image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=80',
  gallery: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=80'],
  desc: 'Apartamento en primera línea con acceso directo al paseo marítimo. Terraza con vistas al mar, dos dormitorios en suite y piscina comunitaria. Vendido en menos de 3 semanas.'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.FeatureStat = __ds_scope.FeatureStat;

__ds_ns.PropertyCard = __ds_scope.PropertyCard;

})();
