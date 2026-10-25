/**
 * Payload CMS collection: `health-packages`
 *
 * Copy into the Payload server project (e.g. `src/collections/HealthPackages.ts`)
 * and register it in `payload.config.ts` → `collections: [HealthPackages, ...]`.
 * Typed loosely so this file compiles in the Next.js app without the
 * `payload` package installed; in the Payload project you may annotate it as
 * `CollectionConfig` from 'payload'.
 *
 * Consumed by: src/lib/payload/health-checkups.ts (mapPackage)
 * Revalidation: webhook maps `health-packages` → CACHE_TAGS.servicesList.
 */
export const HealthPackages = {
  slug: 'health-packages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['code', 'title', 'totalTests', 'pricing.sellingPrice', 'isActive', 'sortOrder'],
    group: 'Health Checkups',
  },
  access: { read: () => true },
  defaultSort: 'sortOrder',
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true, admin: { description: 'Stable package code, e.g. CHP-85. Used to link pages ↔ packages.' } },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'target',
      type: 'select',
      hasMany: true,
      options: ['Men', 'Women', 'Seniors'],
      defaultValue: ['Men', 'Women', 'Seniors'],
    },
    { name: 'totalTests', type: 'number', required: true, min: 1 },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        { name: 'mrp', type: 'number', required: true, min: 0 },
        { name: 'sellingPrice', type: 'number', required: true, min: 0, admin: { description: 'Special package price shown to patients.' } },
        { name: 'currency', type: 'select', options: ['INR'], defaultValue: 'INR' },
      ],
    },
    { name: 'discountLabel', type: 'text', admin: { description: 'Optional override, e.g. "62% OFF". Auto-calculated when empty.' } },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Transparent cut-out (WebP). Prefer CDN-hosted media.' } },
    { name: 'imageUrl', type: 'text', admin: { description: 'External CDN URL — used if no upload is attached.' } },
    { name: 'imageWidth', type: 'number' },
    { name: 'imageHeight', type: 'number' },
    {
      name: 'theme',
      type: 'group',
      admin: { description: 'Tailwind classes for the card arch. Only classes already used in the codebase are guaranteed to be generated.' },
      fields: [
        { name: 'archBg', type: 'text' },
        { name: 'accentBorder', type: 'text' },
        { name: 'badgeBg', type: 'text' },
        { name: 'gradientBottom', type: 'text' },
        { name: 'pillColor', type: 'text' },
        { name: 'glow', type: 'text' },
        { name: 'lineColor', type: 'text', admin: { description: 'CSS colour for SVG lines, e.g. rgba(147, 51, 234, 0.35)' } },
      ],
    },
    { name: 'popular', type: 'checkbox', defaultValue: false },
    { name: 'fastingRequired', type: 'checkbox', defaultValue: true },
    { name: 'highlights', type: 'array', maxRows: 4, fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'notes', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    {
      name: 'categories',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'count', type: 'number' },
        { name: 'tests', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
      ],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
} as const;

export default HealthPackages;
