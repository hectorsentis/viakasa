# Viakasa — Design System

**Viakasa · Asesoría Inmobiliaria** — *"La vía directa a tu casa."*

Viakasa is a full-service real-estate advisory (asesoría inmobiliaria), not a high-volume listings portal. It guides clients through **buying, selling, and managing property**, backed by in-house **legal and financial advisory**. Headquartered in **Madrid and Tenerife (Santa Cruz)**, it serves all of Spain. The brand promise is **formality, confidence, and trust** — a single, expert interlocutor at your side for one of life's biggest decisions.

This design system encodes that promise into reusable tokens, components, and full-screen recreations so any agent or developer can produce on-brand Viakasa material — production code or throwaway mockups.

---

## Sources used to build this system

| Source | What it gave us | Access note |
|---|---|---|
| Brand assets (uploaded) | Logo lockups, icon/app mark, business-card mockup | `assets/` (copied in) |
| `Viakasa/Public/Assets/` (mounted codebase) | Same brand PNGs — **no application code present** | read-only mount |
| GitHub `hectorsentis/viakasa` | **Empty repository** at time of build — no code to import | https://github.com/hectorsentis/viakasa |
| `viakasa.es` | Stated live site | not fetchable from this environment |

> **Reader note:** there was **no existing website/app codebase or Figma file** to recreate from. The visual system below is **derived directly from the brand assets** (the gold + navy logo, the business-card mockup) and from real-estate-advisory conventions. If you have access to the live `viakasa.es` site or a Figma, share it — we can tighten the UI kit to match exactly. Explore the GitHub repo (https://github.com/hectorsentis/viakasa) for any future code.

---

## CONTENT FUNDAMENTALS — how Viakasa writes

- **Language:** Spanish (Spain). Professional but warm, never corporate-cold.
- **Voice — "te / tu", not "usted":** Viakasa speaks to *you* directly and closely. *"La vía directa a **tu** casa"*, *"Solicita **tu** valoración"*, *"Te acompañamos en cada paso."* First-person plural for the firm (*"En Viakasa entendemos…"*, *"Te ofrecemos…"*).
- **Tone:** confident, reassuring, plainspoken. Sells trust and accompaniment over hype. Avoid exclamation-heavy salesy copy and avoid jargon dumps. One clear promise per block.
- **Casing:** Sentence case for headings and body. **UPPERCASE only** for the brand face — eyebrows, button labels, nav, small section kickers (always with wide letter-spacing). Never all-caps a full sentence.
- **Headlines:** short, human, benefit-led — *"Acompañamiento integral, de principio a fin."*, *"Confianza, cercanía y rigor en cada operación."*
- **Eyebrows / kickers:** 1–3 words, uppercase, gold — *"Nuestros servicios"*, *"Quiénes somos"*, *"Propiedades destacadas."*
- **CTAs:** verb-first, concrete — *"Ver propiedades"*, *"Solicitar valoración"*, *"Agendar visita"*, *"Valoración gratuita."* "Gratuita / sin compromiso" reduces friction and is on-brand.
- **Numbers & units:** Spanish formatting — **485.000 €** (dot thousands, € after with a space), **95 m²**, **3 hab. · 2 baños.** Use the middot **·** as a separator.
- **Emoji:** **none.** Status is communicated with Badges and Lucide icons, never emoji.
- **Vibe:** a trusted family advisor with institutional rigor — premium, calm, certain.

---

## VISUAL FOUNDATIONS

**Two-pillar palette.** Warm **gold** (`--gold-500 #C19A4B`, sampled from the wordmark) signals value, premium, and the single most important action. Deep **navy** (`--navy-800 #0F2138`) signals trust, formality, and depth — it is the brand's "ink." Everything sits on **warm ivory paper** (`--paper #FAF8F3`), never stark white, to feel considered and premium. Gold is used **sparingly** — accents, one CTA per view, eyebrows, rules, stat numerals — so it stays meaningful. Navy carries large surfaces (hero, footer, contact, trust strip).

**Typography — a three-voice system.**
- **Brand face — League Spartan** (geometric caps): the wordmark, eyebrows, button/nav labels, badges, and stat numerals. Always **uppercase**, wide tracking (0.1–0.2em). *Substitute for the unknown brand font — see Caveats.*
- **Headings — Lora** (formal transitional serif): all editorial headlines and pull-quotes. Conveys confidence and institutional weight. Roman for headings, italic for soft asides.
- **Body / UI — Mulish** (humanist sans): paragraphs, form fields, captions. Clean and friendly, echoing the rounded tagline lettering.

**Backgrounds & imagery.** Real **photography** of homes and interiors, warm and bright (not cold or grainy, not black & white). Hero and section imagery is **full-bleed**, darkened with a **navy gradient scrim** (left-dark → right-light, ~92%→35% opacity) so white text holds. No abstract gradients, no patterns, no hand-drawn illustration. Decorative blocks (stat callouts) use solid navy.

**Layout.** Centered max-width containers (`--container 1200px`, wide `1360`). Generous vertical rhythm — sections breathe at `~90px` top/bottom padding. 3-up grids for listings and 4-up for services. Sticky transparent header that fills to translucent navy on scroll. Sticky contact card on detail pages.

**Corners & cards.** Modest radii — cards `--radius-lg (10px)`, controls `--radius-sm (4px)`, pills only for filter chips. Cards are **white, 1px hairline border (`--gray-200`), soft shadow** — never colored left-border accents, never heavy rounding. The signature **PropertyCard** adds a status Badge over the image and a feature row divided by a hairline.

**Shadows / elevation.** Cool, **navy-tinted**, soft — `rgba(15,33,56,…)`. Five steps (`sm → xl`) plus a warm **`--shadow-gold`** for gold CTAs. Premium and quiet; never harsh black drop-shadows.

**Borders & rules.** Hairlines in `--gray-200`. The recurring brand motif is a short **2px × 28–56px gold rule** preceding eyebrows and under headings.

**Motion.** Calm and confident — **no bounce.** Standard ease `cubic-bezier(0.4,0,0.2,1)`, entrance ease-out `cubic-bezier(0.16,1,0.3,1)`. Durations 140 / 240 / 420ms. Cards **lift `-4px` and image zooms to 1.05** on hover; header background fades on scroll; toast slides up.

**Interaction states.**
- *Hover:* buttons darken one step (navy→navy-700, gold→gold-600); outline buttons **fill navy**; cards lift + shadow grows; links go gold-800.
- *Focus:* 2px gold outline, 2px offset; inputs get a gold border + 3px soft gold ring.
- *Press / active:* color deepens (no scale-down on buttons; keep it formal).
- *Selected:* navy pill (filters), gold outline (gallery thumbnail).

**Transparency & blur.** Used only for the scrolled header (`backdrop-filter: blur(8px)` over translucent navy) and image scrims. Not a general decorative device.

---

## ICONOGRAPHY

- **System:** [**Lucide**](https://lucide.dev) — thin, even-stroke (≈1.75px), rounded-cap line icons. The restrained, modern line style matches the formal-but-warm brand. Loaded from CDN (`https://unpkg.com/lucide@latest`); render with `<i data-lucide="name"></i>` then `lucide.createIcons()`.
- **Common glyphs:** `home`, `key`, `building-2` (property/type); `scale`, `landmark` (legal/finance); `bed-double`, `bath`, `maximize-2`, `calendar` (property stats); `map-pin`, `phone`, `mail`, `globe` (contact); `arrow-right`, `arrow-left`, `check`, `check-circle`, `calendar-check` (actions/UI).
- **Color:** icons take **gold** as an accent on light surfaces (e.g. inside cards/stats), **gold-400** on navy, or inherit muted gray in form fields. Icon tiles (ServiceCard) are **navy squares with a gold glyph**.
- **No emoji. No custom hand-drawn SVG.** The only bespoke vector art is the **brand mark** (the gold diamond-roof monogram), shipped as PNG in `assets/` — use that asset, never redraw it.
- **Substitution flag:** the original site's icon set is unknown (no codebase); Lucide is our chosen standard. Swap if the live site uses something else.

---

## Index / manifest

**Root**
- `styles.css` — single entry point; `@import`s everything below. Consumers link only this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `assets/` — `viakasa-logo.png` (reversed/gold on dark), `viakasa-logo-tagline.png` (full lockup), `viakasa-icon.png`, `viakasa-icon-dark.png`, `viakasa-mockup.jpg`
- `readme.md` — this guide · `SKILL.md` — Agent Skill wrapper

**Components** (`window.ViakasaDesignSystem_53b05d.*`)
- `components/core/` — **Button**, **Badge**, **Input**
- `components/property/` — **PropertyCard**, **FeatureStat**
- `components/marketing/` — **SectionHeading**, **ServiceCard**

**UI kits**
- `ui_kits/website/` — interactive marketing site: homepage (hero, trust strip, services, listings w/ city filter, about, contact form) → **property detail** view. Entry `index.html`.

**Foundation cards** (Design System tab) — `guidelines/`: color (gold/navy/neutral/semantic), type (brand/serif/body/scale), spacing (scale/radii/shadows), brand (logo/logo-on-navy/icon).

---

## Caveats

- **Font substitution.** We do not have Viakasa's exact wordmark font (a wide geometric sans with a flat-apex "A"). **League Spartan** is the closest free match and is used as the brand face. Lora + Mulish are our chosen pairing for headings/body. *Send the real brand fonts and we'll swap them in.*
- **No source UI.** The GitHub repo was empty and the live site wasn't reachable, so the UI kit is a **plausible, on-brand reconstruction**, not a 1:1 copy of viakasa.es. Share the site/Figma to align pixel-for-pixel.
- **Photography** in the UI kit uses Unsplash placeholders — replace with real Viakasa property photos.
