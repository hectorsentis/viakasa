---
name: viakasa-design
description: Use this skill to generate well-branded interfaces and assets for Viakasa (asesoría inmobiliaria — real estate advisory, Madrid & Tenerife), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** Viakasa · Asesoría Inmobiliaria — "La vía directa a tu casa." Formal, confident, trustworthy. Spanish (Spain), "tú" voice, no emoji.
- **Colors:** gold `#C19A4B` (accent, one CTA per view), navy `#0F2138` (trust, large surfaces), ivory paper `#FAF8F3`. Full token set in `tokens/colors.css`.
- **Type:** League Spartan (brand caps — eyebrows/labels/numerals, UPPERCASE wide tracking) · Lora (serif headings) · Mulish (body/UI). See `tokens/typography.css`.
- **Icons:** Lucide (thin line). No emoji, no hand-drawn SVG. Brand mark is the gold diamond-roof PNG in `assets/`.
- **Components:** link `styles.css`, load `_ds_bundle.js`, then `const { Button, Badge, Input, PropertyCard, FeatureStat, SectionHeading, ServiceCard } = window.ViakasaDesignSystem_53b05d`.
- **Full UI reference:** `ui_kits/website/` (homepage + property detail).

Always start from the tokens and existing components. Use real property photography (warm, bright), modest radii, soft navy-tinted shadows, calm motion (no bounce).
