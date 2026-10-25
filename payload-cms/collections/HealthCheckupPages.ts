/**
 * Payload CMS collection: `health-checkup-pages`
 *
 * One document per authority slug (26 total). Every field is optional except
 * `slug`: empty fields fall back to the static copy in
 * `src/config/health-checkup/pages-*.ts`, so editors can override just the
 * parts they need (e.g. a single FAQ list or the hero image).
 *
 * Supported copy tokens (resolved from live package data at render time):
 *   {minPrice}  {packageCount}  {maxDiscount}
 *
 * Consumed by: src/lib/payload/health-checkups.ts (mergePage)
 * Revalidation: webhook maps `health-checkup-pages` → CACHE_TAGS.service(slug).
 */
export const HealthCheckupPages = {
  slug: 'health-checkup-pages',
  admin: {
    useAsTitle: 'keyword',
    defaultColumns: ['keyword', 'slug', 'metaTitle', 'lastReviewed', 'isActive'],
    group: 'Health Checkups',
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
      admin: { description: 'Must match one of the 26 /services/<slug> authority URLs, e.g. full-body-check-up.' },
    },
    { name: 'keyword', type: 'text', admin: { description: 'Primary target keyword, e.g. "Full Body Check Up".' } },
    { name: 'secondaryKeywords', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    {
      type: 'collapsible',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', maxLength: 70, admin: { description: 'Aim for ≤ 60 characters. Rendered as an absolute <title>.' } },
        { name: 'metaDescription', type: 'textarea', maxLength: 180, admin: { description: 'Aim for 140–160 characters.' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Hero',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'intro', type: 'textarea' },
        { name: 'quickAnswer', type: 'textarea', admin: { description: '40–60 word direct answer (AEO / featured snippet).' } },
        {
          name: 'primaryImage',
          type: 'group',
          admin: { description: 'Representative image: visible in hero, og:image, JSON-LD primaryImageOfPage and image sitemap.' },
          fields: [
            { name: 'media', type: 'upload', relationTo: 'media' },
            { name: 'url', type: 'text', admin: { description: 'External CDN URL (used if no upload).' } },
            { name: 'alt', type: 'text', admin: { description: 'Describe what is actually in the image + the topic.' } },
            { name: 'caption', type: 'text' },
            { name: 'width', type: 'number' },
            { name: 'height', type: 'number' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Packages',
      fields: [
        { name: 'defaultFilter', type: 'select', options: ['ALL', 'Men', 'Women', 'Seniors'], defaultValue: 'ALL' },
        { name: 'featuredPackages', type: 'relationship', relationTo: 'health-packages', hasMany: true, admin: { description: 'Shown first, in this order.' } },
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
        { name: 'preparation', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
        {
          name: 'faqs',
          type: 'array',
          admin: { description: 'Rendered visibly and as FAQPage JSON-LD — keep answers factual.' },
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
        { name: 'relatedSlugs', type: 'array', maxRows: 6, fields: [{ name: 'text', type: 'text', required: true }] },
      ],
    },
    { name: 'lastReviewed', type: 'date', admin: { position: 'sidebar', description: 'Date of last medical review.' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
} as const;

export default HealthCheckupPages;
