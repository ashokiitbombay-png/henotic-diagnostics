// ─────────────────────────────────────────────────────────────────────────────
// 🏙️ CITY HUB CONFIG — Maps major cities to regions & popular services
// Used by /city/[city] pages targeting "[service] in [city]" search queries
// ─────────────────────────────────────────────────────────────────────────────

export interface City {
  slug: string;
  name: string;
  regions: string[];            // region slugs from locations.ts
  description: string;
  popularServices: string[];    // top 10 service slugs for this city
  mapEmbed?: string;            // optional Google Maps embed URL
}

export const CITIES: City[] = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    regions: ['south-mumbai', 'central-suburbs', 'western-suburbs', 'eastern-suburbs', 'mumbai-suburban'],
    description: 'Premier diagnostic services across Mumbai — from South Mumbai to the suburbs. NABL accredited MRI, CT, PET-CT, Ultrasound, Pathology & more.',
    popularServices: ['mri-scan', 'ct-scan', 'pet-ct', 'ultrasound', 'blood-test', '2d-echo', 'mammography', 'dexa-bone-scan', 'health-checkup', 'pregnancy-sonography']
  },
  {
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    regions: ['navi-mumbai'],
    description: 'Advanced diagnostic center in Navi Mumbai — MRI, CT, PET-CT, Pathology. Located in Kharghar with access across Vashi, Nerul, Belapur & Panvel.',
    popularServices: ['mri-scan', 'ct-scan', 'pet-ct', 'ultrasound', 'blood-test', '2d-echo', 'mammography', 'sonography', 'health-checkup', 'pregnancy-sonography']
  },
  {
    slug: 'thane',
    name: 'Thane',
    regions: ['thane'],
    description: 'Comprehensive diagnostic services for Thane district — Dombivli, Kalyan, Mira Road, Bhiwandi & more. Walk-in & appointment available.',
    popularServices: ['mri-scan', 'ct-scan', 'ultrasound', 'blood-test', 'health-checkup', 'sonography', '2d-echo', 'hrct-chest', 'thyroid-test', 'lipid-profile']
  },
  {
    slug: 'pune',
    name: 'Pune',
    regions: ['pune'],
    description: 'NABL accredited diagnostic services in Pune — Kothrud, Baner, Hinjewadi, Pimpri-Chinchwad, Hadapsar. Advanced imaging & pathology.',
    popularServices: ['mri-scan', 'ct-scan', 'pet-ct', 'ultrasound', 'blood-test', 'health-checkup', '2d-echo', 'mammography', 'hrct-chest', 'thyroid-test']
  },
  {
    slug: 'panvel',
    name: 'Panvel',
    regions: ['navi-mumbai', 'raigad'],
    description: 'Walk-in diagnostics near Panvel — MRI, CT, PET-CT, all pathology tests. NABL certified center serving Panvel, New Panvel & Raigad district.',
    popularServices: ['mri-scan', 'ct-scan', 'pet-ct', 'ultrasound', 'blood-test', 'health-checkup', 'sonography', 'dexa-bone-scan', 'fibroscan', 'color-doppler']
  }
];

/** Lookup a city by slug */
export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug);
}

/** Service icon mapping for popular service cards */
export const SERVICE_ICONS: Record<string, string> = {
  'mri-scan':              '🧲',
  'ct-scan':               '🩻',
  'pet-ct':                '☢️',
  'ultrasound':            '🔬',
  'blood-test':            '🩸',
  '2d-echo':               '🫀',
  'mammography':           '🩺',
  'dexa-bone-scan':        '🦴',
  'health-checkup':        '✅',
  'pregnancy-sonography':  '🤰',
  'sonography':            '📡',
  'hrct-chest':            '🫁',
  'thyroid-test':          '🧪',
  'lipid-profile':         '📊',
  'fibroscan':             '🫁',
  'color-doppler':         '🔴',
};
