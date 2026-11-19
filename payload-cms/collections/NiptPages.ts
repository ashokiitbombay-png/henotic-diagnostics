/**
 * Payload CMS collection: `nipt-pages`
 *
 * One document per NIPT authority keyword slug (20 total). Every field is optional
 * except `slug`: empty fields fall back to the static copy in
 * `src/config/nipt-test/pages-*.ts`, so editors can override any SEO, hero,
 * clinical section, or FAQ block independently.
 *
 * Supported copy tokens (resolved from live panel data at render time):
 *   {minPrice}  {panelCount}  {maxDiscount}
 *
 * Consumed by: src/lib/payload/nipt-tests.ts (mergePage)
 * Revalidation: webhook maps `nipt-pages` -> CACHE_TAGS.service(slug) + CACHE_TAGS.niptTests.
 */
export const NiptPages = {
  slug: 'nipt-pages',
  admin: {
    useAsTitle: 'keyword',
    defaultColumns: ['keyword', 'slug', 'metaTitle', 'lastReviewed', 'isActive'],
    group: 'Genetic Testing (NIPT)',
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Must match one of the 20 /services/<slug> NIPT authority URLs, e.g. nipt-test.' },
    },
    { name: 'keyword', type: 'text', admin: { description: 'Primary target keyword, e.g. "NIPT Test".' } },
    { name: 'secondaryKeywords', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    {
      type: 'collapsible',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', maxLength: 70, admin: { description: 'Aim for <= 60 characters. Rendered as an absolute <title>.' } },
        { name: 'metaDescription', type: 'textarea', maxLength: 180, admin: { description: 'Aim for 140-160 characters.' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Hero',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'heroSubtitle', type: 'textarea' },
        { name: 'intro', type: 'textarea' },
        { name: 'quickAnswer', type: 'textarea', admin: { description: '40-65 word direct clinical summary (AEO / featured snippet).' } },
        {
          name: 'primaryImage',
          type: 'group',
          admin: { description: 'Representative SERP thumbnail: visible hero card, og:image, JSON-LD primaryImageOfPage and image sitemap.' },
          fields: [
            { name: 'media', type: 'upload', relationTo: 'media' },
            { name: 'url', type: 'text', admin: { description: 'External CDN/GCS URL (used if no upload).' } },
            { name: 'alt', type: 'text' },
            { name: 'caption', type: 'text' },
            { name: 'width', type: 'number' },
            { name: 'height', type: 'number' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Panels',
      fields: [
        { name: 'featuredPanels', type: 'relationship', relationTo: 'nipt-panels', hasMany: true, admin: { description: 'Shown first, in this order.' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Authority content',
      fields: [
        { name: 'whoShouldBook', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
        {
          name: 'sections',
          type: 'array',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'body', type: 'textarea', required: true },
          ],
        },
        {
          name: 'faqs',
          type: 'array',
          admin: { description: 'Rendered visibly and as FAQPage JSON-LD - keep answers factual.' },
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
        { name: 'relatedSlugs', type: 'array', maxRows: 8, fields: [{ name: 'text', type: 'text', required: true }] },
      ],
    },
    { name: 'lastReviewed', type: 'date', admin: { position: 'sidebar', description: 'Date of last medical review.' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
} as const;

export default NiptPages;
