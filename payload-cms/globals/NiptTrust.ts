/**
 * Payload CMS global: `nipt-trust`
 *
 * Shared E-E-A-T content for all 20 NIPT authority pages (and all regional/city hubs):
 * NGS facility photos, reporting Molecular Genetics & Pathology doctors,
 * accreditations, awards, testimonials and Google rating.
 *
 * Consumed by: src/lib/payload/nipt-tests.ts (mergeTrust)
 * Revalidation: webhook maps `global:nipt-trust` -> CACHE_TAGS.niptTests.
 */
const imageFields = [
  { name: 'image', type: 'upload', relationTo: 'media' },
  { name: 'imageUrl', type: 'text', admin: { description: 'External CDN/GCS URL (used if no upload).' } },
] as const;

export const NiptTrust = {
  slug: 'nipt-trust',
  admin: { group: 'Genetic Testing (NIPT)' },
  access: { read: () => true },
  fields: [
    {
      name: 'googleRating',
      type: 'group',
      fields: [
        { name: 'rating', type: 'number', min: 1, max: 5 },
        { name: 'reviewCount', type: 'number', min: 0 },
        { name: 'profileUrl', type: 'text' },
        { name: 'mapsUrl', type: 'text' },
      ],
    },
    {
      name: 'infrastructure',
      type: 'array',
      fields: [{ name: 'title', type: 'text', required: true }, { name: 'subtitle', type: 'text' }, { name: 'tag', type: 'text' }, ...imageFields],
    },
    {
      name: 'doctors',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'degrees', type: 'text' },
        { name: 'registration', type: 'text' },
        { name: 'bio', type: 'textarea' },
        { name: 'focus', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
        ...imageFields,
      ],
    },
    {
      name: 'certificates',
      type: 'array',
      fields: [
        { name: 'certId', type: 'text' },
        { name: 'name', type: 'text', required: true },
        { name: 'authority', type: 'text' },
        { name: 'desc', type: 'textarea' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'logoUrl', type: 'text' },
        { name: 'certImage', type: 'upload', relationTo: 'media' },
        { name: 'certImageUrl', type: 'text' },
      ],
    },
    {
      name: 'awards',
      type: 'array',
      fields: [
        { name: 'awardId', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'category', type: 'text' },
        { name: 'year', type: 'text' },
        { name: 'organization', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'badgeLabel', type: 'text' },
        { name: 'accentGlow', type: 'text' },
        ...imageFields,
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'service', type: 'text' },
        { name: 'quote', type: 'textarea', required: true },
        { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
        ...imageFields,
      ],
    },
  ],
} as const;

export default NiptTrust;
