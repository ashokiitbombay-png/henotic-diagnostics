/**
 * Payload CMS collection: `locations`
 *
 * Micro-location database schema for hyper-local PSEO, service-area targeting,
 * and Google organic Knowledge Panel mapping.
 *
 * Consumed by: src/lib/payload/locations.ts
 * Revalidation: webhook maps `locations` → CACHE_TAGS.location(slug) and CACHE_TAGS.locationsList.
 */
export const Locations = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'city', 'pincode', 'region', 'serviceTier', 'isActive'],
    group: 'Geographic Directory',
  },
  access: { read: () => true },
  versions: { drafts: true },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Locality / Micro-neighbourhood / Sector name, e.g. "Kharghar Sector 10" or "Colaba".' }
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Canonical URL slug matching /services/<service>/<region>/<slug>.' }
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Parent municipality or city, e.g. "Mumbai", "Navi Mumbai", "Thane", "Pune".' }
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'South Mumbai', value: 'south-mumbai' },
        { label: 'Central Suburbs', value: 'central-suburbs' },
        { label: 'Western Suburbs', value: 'western-suburbs' },
        { label: 'Eastern Suburbs', value: 'eastern-suburbs' },
        { label: 'Navi Mumbai', value: 'navi-mumbai' },
        { label: 'Thane & Extended Suburbs', value: 'thane' },
        { label: 'Pune', value: 'pune' },
        { label: 'Raigad', value: 'raigad' },
        { label: 'Mumbai Suburban', value: 'mumbai-suburban' },
      ],
      admin: { description: 'Regional routing zone.' }
    },
    {
      name: 'pincode',
      type: 'text',
      required: true,
      index: true,
      admin: { description: '6-digit Indian Postal PIN code, e.g. 400005, 410210.' }
    },
    {
      type: 'collapsible',
      label: 'Geographical Coordinates',
      fields: [
        {
          name: 'coordinates',
          type: 'group',
          fields: [
            { name: 'latitude', type: 'number', required: true, admin: { description: 'Decimal latitude (WGS84).' } },
            { name: 'longitude', type: 'number', required: true, admin: { description: 'Decimal longitude (WGS84).' } },
          ]
        },
        {
          name: 'formattedAddress',
          type: 'text',
          admin: { description: 'Complete official address string for Schema.org PostalAddress.' }
        }
      ]
    },
    {
      type: 'collapsible',
      label: 'Service Area Targeting',
      fields: [
        {
          name: 'section',
          type: 'text',
          admin: { description: 'Broad classification, e.g. "South Mumbai", "Navi Mumbai", "Pune City & Western Pune".' }
        },
        {
          name: 'serviceTier',
          type: 'select',
          options: [
            'Tier 1 - Immediate Diagnostic Hub',
            'Tier 2 - Extended Service Area',
            'Tier 3 - Home Sample Collection Network'
          ],
          defaultValue: 'Tier 1 - Immediate Diagnostic Hub',
          admin: { description: 'Priority level for physical center proximity and sample dispatch.' }
        },
        {
          name: 'hasHomeCollection',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Whether doorstep blood & pathology sample collection is active.' }
        },
        {
          name: 'homeCollectionTurnaround',
          type: 'text',
          defaultValue: '30–60 mins',
          admin: { description: 'Typical arrival window for phlebotomist dispatch, e.g. "30–45 mins".' }
        },
        {
          name: 'sameDayReportDelivery',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Guaranteed same-day PDF report delivery via WhatsApp/portal.' }
        },
        {
          name: 'nearestPartnerHub',
          type: 'text',
          admin: { description: 'Nearest physical diagnostic scan center for MRI/CT/PET-CT.' }
        },
        {
          name: 'microNeighborhoods',
          type: 'array',
          admin: { description: 'Sub-sectors, landmarks, and streets served inside this PIN code zone.' },
          fields: [
            { name: 'text', type: 'text', required: true }
          ]
        }
      ]
    },
    {
      type: 'collapsible',
      label: 'Local SEO Overrides',
      fields: [
        { name: 'metaTitle', type: 'text', maxLength: 70, admin: { description: 'Custom SEO title override.' } },
        { name: 'metaDescription', type: 'textarea', maxLength: 180, admin: { description: 'Custom SEO description override.' } },
        { name: 'keywords', type: 'text', admin: { description: 'Comma-separated keywords.' } },
      ]
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Enable or disable this location across PSEO and directory.' }
    }
  ],
} as const;

export default Locations;
