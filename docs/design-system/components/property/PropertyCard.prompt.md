The signature listing card. Composes Badge + FeatureStat. Hover lifts and zooms the image.

```jsx
<PropertyCard
  image="/assets/piso.jpg"
  status="En venta" statusVariant="success"
  location="Salamanca, Madrid"
  title="Piso reformado con terraza"
  price="485.000 €" priceNote="· 5.105 €/m²"
  features={[
    { icon: <i data-lucide="bed-double" />, value: '3', label: 'Hab.' },
    { icon: <i data-lucide="bath" />, value: '2', label: 'Baños' },
    { icon: <i data-lucide="maximize-2" />, value: '95 m²', label: 'Superficie' },
  ]}
  onClick={() => {}}
/>
```

Always provide `title` and `price`. `status` is optional (En venta / Vendido / Destacado).
