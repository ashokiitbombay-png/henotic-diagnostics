// ─────────────────────────────────────────────────────────────────────────────
// 🏙️ CITY HUB CONFIG — Maps major cities to regions & popular services
// Used by /city/[city] pages targeting "[service] in [city]" search queries
// ─────────────────────────────────────────────────────────────────────────────

export interface City {
  slug: string;
  name: string;
  regions: string[];            // region slugs from locations.ts
  locationSlugs?: string[];     // optional explicit list of location slugs for focused hubs
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
  },
  {
    slug: 'kalyan-dombivli',
    name: 'Kalyan-Dombivli',
    regions: ['thane'],
    locationSlugs: [
      'kalyan',
      'kalyan-east',
      'kalyan-west',
      'khadakpada',
      'dombivli',
      'dombivli-east',
      'dombivli-west',
      'ulhasnagar',
      'ambernath',
      'badlapur',
      'diva',
      'mumbra'
    ],
    description: 'Comprehensive diagnostic & pathology services in Kalyan-Dombivli — NABL accredited MRI, CT, Ultrasound, Blood Tests with same-day reports & doorstep sample collection.',
    popularServices: ['mri-scan', 'ct-scan', 'ultrasound', 'blood-test', 'health-checkup', '2d-echo', 'sonography', 'thyroid-test', 'lipid-profile', 'hrct-chest']
  },
  {
    slug: 'mira-bhayandar',
    name: 'Mira-Bhayandar',
    regions: ['mumbai-suburban', 'thane'],
    locationSlugs: [
      'mira-road',
      'bhayandar',
      'mira-bhayandar-east',
      'shanti-park',
      'beverly-park',
      'vasai',
      'vasai-east',
      'vasai-west',
      'nalasopara',
      'virar'
    ],
    description: 'Advanced diagnostic scans and pathology testing in Mira-Bhayandar — Mira Road, Bhayandar East & West. NABL certified testing with home sample collection.',
    popularServices: ['mri-scan', 'ct-scan', 'ultrasound', 'blood-test', 'health-checkup', '2d-echo', 'pregnancy-sonography', 'thyroid-test', 'mammography', 'color-doppler']
  },
  {
    slug: 'pimpri-chinchwad',
    name: 'Pimpri-Chinchwad',
    regions: ['pune'],
    locationSlugs: [
      'pimpri-chinchwad',
      'pimpri',
      'chinchwad',
      'akurdi',
      'nigdi',
      'pradhikaran',
      'bhosari',
      'moshi',
      'chikhali',
      'talawade',
      'thergaon',
      'punawale',
      'tathawade',
      'ravet',
      'dehu-road',
      'kasarwadi',
      'charholi',
      'alandi',
      'indrayani-nagar',
      'spine-road'
    ],
    description: 'Accredited diagnostic imaging & pathology services across PCMC (Pimpri-Chinchwad, Nigdi, Akurdi, Bhosari, Moshi, Ravet). MRI, 32-slice CT, and home sample collection.',
    popularServices: ['mri-scan', 'ct-scan', 'pet-ct', 'ultrasound', 'blood-test', 'health-checkup', '2d-echo', 'sonography', 'hrct-chest', 'thyroid-test']
  },
  {
    slug: 'raigad',
    name: 'Raigad',
    regions: ['raigad', 'navi-mumbai'],
    locationSlugs: [
      'alibag',
      'nagaon',
      'revdanda',
      'uran',
      'jnpt-township',
      'jasai',
      'chirner',
      'pen',
      'nagothane',
      'karjat',
      'neral',
      'khopoli',
      'pali',
      'roha',
      'mangaon',
      'murud',
      'old-panvel',
      'khandeshwar',
      'karanjade'
    ],
    description: 'NABL accredited diagnostic network serving Raigad district — Alibag, Pen, Karjat, Khopoli, Uran & Panvel. Same-day reports, 3T MRI, CT & complete pathology.',
    popularServices: ['mri-scan', 'ct-scan', 'pet-ct', 'ultrasound', 'blood-test', 'health-checkup', 'sonography', '2d-echo', 'dexa-bone-scan', 'color-doppler']
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
