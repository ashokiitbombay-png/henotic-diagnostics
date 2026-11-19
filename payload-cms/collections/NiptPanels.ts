/**
 * Payload CMS collection: `nipt-panels`
 *
 * Register in `payload.config.ts` -> `collections: [NiptPanels, ...]`.
 * Typed loosely so this file compiles in the Next.js app without the
 * `payload` package installed.
 *
 * Consumed by: src/lib/payload/nipt-tests.ts (mapPanel)
 * Revalidation: webhook maps `nipt-panels` -> CACHE_TAGS.niptTests.
 */
export const NiptPanels = {
  slug: 'nipt-panels',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['code', 'title', 'totalTestsCount', 'pricing.sellingPrice', 'isActive', 'sortOrder'],
    group: 'Genetic Testing (NIPT)',
  },
  access: { read: () => true },
  defaultSort: 'sortOrder',
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true, admin: { description: 'Stable panel code, e.g. NIPT-BASIC, NIPT-COMP, NIPT-ADV.' } },
    { name: 'badgeNumber', type: 'text', defaultValue: '1' },
    { name: 'topPillLabel', type: 'text', defaultValue: 'ESSENTIAL' },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'shortTag', type: 'text' },
    { name: 'tags', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'testsCountNumber', type: 'text' },
    { name: 'testsCountUnit', type: 'text' },
    { name: 'totalTestsLabel', type: 'text' },
    { name: 'totalTestsCount', type: 'text' },
    { name: 'tat', type: 'text', defaultValue: '7-10 Days Turnaround' },
    { name: 'sampleType', type: 'text', defaultValue: 'Maternal Blood (cfDNA)' },
    { name: 'gestation', type: 'text', defaultValue: '10+ Weeks Onwards' },
    { name: 'ribbonText', type: 'text' },
    { name: 'colHeaders', type: 'array', maxRows: 2, fields: [{ name: 'text', type: 'text', required: true }] },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        { name: 'mrp', type: 'number', required: true, min: 0 },
        { name: 'sellingPrice', type: 'number', required: true, min: 0 },
        { name: 'currency', type: 'select', options: ['INR'], defaultValue: 'INR' },
      ],
    },
    { name: 'discountLabel', type: 'text', admin: { description: 'Optional override, e.g. "20% OFF". Auto-calculated when empty.' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    { name: 'imageAlt', type: 'text' },
    { name: 'imageWidth', type: 'number' },
    { name: 'imageHeight', type: 'number' },
    {
      name: 'theme',
      type: 'group',
      fields: [
        { name: 'archBg', type: 'text' },
        { name: 'accentBorder', type: 'text' },
        { name: 'glow', type: 'text' },
        { name: 'lineColor', type: 'text' },
        { name: 'gradientBelowImage', type: 'text' },
        { name: 'cardHeaderTint', type: 'text' },
        { name: 'badgeBg', type: 'text' },
        { name: 'ctaGradient', type: 'text' },
      ],
    },
    { name: 'popular', type: 'checkbox', defaultValue: false },
    {
      name: 'parameters',
      type: 'array',
      fields: [
        { name: 'param', type: 'text', required: true },
        { name: 'detail', type: 'text', required: true },
      ],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
} as const;

export default NiptPanels;
