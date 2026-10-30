/**
 * Payload CMS collection: `regions`
 *
 * Regional hub collection for Henotic Diagnostics PSEO matrix.
 */
export const Regions = {
  slug: 'regions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'cityCount', 'isActive'],
    group: 'Geographic Directory',
  },
  access: { read: () => true },
  defaultSort: 'name',
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'Region name, e.g. "Navi Mumbai", "South Mumbai".' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea' },
    { name: 'hubCenterAddress', type: 'text' },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } }
  ]
} as const;

export default Regions;
