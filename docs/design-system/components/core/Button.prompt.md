Primary action control — navy for primary actions, gold for the single high-emphasis CTA per view; outline/ghost for secondary. Uppercase brand face with wide tracking.

```jsx
<Button variant="accent" size="lg" iconRight={<i data-lucide="arrow-right" />}>Solicitar valoración</Button>
<Button variant="primary">Ver propiedades</Button>
<Button variant="outline">Contactar</Button>
<Button variant="link">Más información</Button>
```

Variants: `primary` (navy), `accent` (gold), `outline`, `ghost`, `link`. Sizes: `sm | md | lg`. Use at most one `accent` button per view to keep gold meaningful.
