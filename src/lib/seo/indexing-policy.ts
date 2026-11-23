import type { Metadata } from 'next';
import { REGION_LOCATIONS, getLocationBySlug } from '../../config/locations';
import { services } from '../../config/services';
import { calculateHaversineKm, getDistanceFromHubKm } from './geo-utils';

export const BASE_URL = 'https://www.henoticdiagnostics.com';

/**
 * Deterministic sitemap lastmod date updated only on structural content/catalog releases
 * (never computed per request via `new Date()`).
 */
export const SITEMAP_LASTMOD = '2026-11-23';

export type LocationTier = '1A' | '1B' | '2' | '3';

export interface IndexingDirective {
  index: boolean;
  follow: boolean;
  canonicalUrl: string;
  includeInSitemap: boolean;
}

export interface L3IndexingDirective extends IndexingDirective {
  tier: LocationTier;
}

/**
 * Legacy 308 synonym redirects already enforced in next.config.js.
 */
export const REDIRECTED_SYNONYM_SERVICES: Record<string, string> = {
  'ecg-test': 'ecg',
  'electrocardiogram': 'ecg',
  '2d-echo-test': '2d-echo',
  'echo-test': '2d-echo',
  'echocardiography': '2d-echo',
  'fetal-echo': 'fetal-echocardiography',
  'whole-body-pet-scan': 'whole-body-pet-ct',
  'pet-scan': 'pet-ct',
};

/**
 * Pure typo / broken-token NIPT slugs 301-redirected in next.config.js (preserving query params).
 */
export const TYPO_REDIRECT_SLUGS: Record<string, string> = {
  'nippt': 'nipt-test',
  'nip-t-test': 'nipt-test',
  'npt-test-pregnancy': 'nipt-test',
};

/**
 * Union of all service slugs that issue permanent HTTP redirects (301/308).
 */
export const ALL_REDIRECTED_SERVICE_SLUGS: Record<string, string> = {
  ...REDIRECTED_SYNONYM_SERVICES,
  ...TYPO_REDIRECT_SLUGS,
};

/**
 * Inpatient hospital surgical procedures that do not have L2/L3 neighborhood pages.
 */
export const HOSPITAL_SURGICAL_SERVICES = new Set<string>([
  'angioplasty',
  'tavr',
  'cardiac-catheterization',
]);

/**
 * Raigad location slugs that already redirect to canonical Navi Mumbai nodes.
 */
export const DUPLICATE_RAIGAD_LOCATIONS = new Set<string>([
  'old-panvel',
  'khandeshwar',
  'karanjade',
]);

/**
 * Deprecated synthetic region key redirected in next.config.js.
 */
export const DEPRECATED_REGIONS = new Set<string>(['mumbai-suburban']);

/**
 * Intentional keyword/pricing variants and exact word-order permutations:
 * L1 guide pages remain live; L2/L3 trees consolidate canonical -> primary slug
 * and are excluded from XML sitemaps and internal links.
 */
export const CANONICAL_VARIANT_TO_PRIMARY: Record<string, string> = {
  // 18 intentional NIPT keyword/pricing variants -> nipt-test
  'nips-test': 'nipt-test',
  'nips': 'nipt-test',
  'nipt-non-invasive-prenatal-testing': 'nipt-test',
  'blood-test-nipt': 'nipt-test',
  'non-invasive-prenatal-diagnosis': 'nipt-test',
  'price-of-nipt-test': 'nipt-test',
  'nipt-lab-test': 'nipt-test',
  'down-syndrome-prenatal-diagnosis': 'nipt-test',
  'nipt-test-in-pregnancy-cost': 'nipt-test',
  'non-invasive-prenatal-screening-nipt': 'nipt-test',
  'non-invasive-prenatal-test-nipt': 'nipt-test',
  'prenatal-down-syndrome': 'nipt-test',
  'nipt-testing-cost': 'nipt-test',
  'nipt-test-pregnancy': 'nipt-test',
  'nipt-test-for-pregnancy': 'nipt-test',
  'non-invasive-prenatal-screening-test': 'nipt-test',
  'cost-for-nipt-test': 'nipt-test',
  'pregnancy-test-nipt': 'nipt-test',
  // MRI exact permutations & suffix duplicates (6)
  'brain-mri': 'mri-brain',
  'spine-mri': 'mri-spine',
  'shoulder-mri': 'mri-shoulder',
  'knee-mri': 'mri-knee',
  'mrcp-scan': 'mri-mrcp',
  'mr-angiography': 'mri-angiography',
  // CT exact permutations & suffix duplicates (2)
  'brain-ct-scan': 'ct-brain',
  'ct-coronary-angiography': 'coronary-ct-angiography',
  // PET-CT & Nuclear Medicine duplicates (6)
  'fapi-pet-scan': 'fapi-pet-ct',
  'dota-pet-scan': 'dota-pet-ct',
  'dopa-scan': 'dopa-pet-ct',
  'bone-scintigraphy': 'bone-scan',
  'thyroid-scintigraphy': 'thyroid-scan',
  'ec-renal-scan': 'ec-scan',
  // Ultrasound & Pregnancy duplicates (11)
  'usg-scan': 'ultrasound',
  'whole-abdomen-sonography': 'whole-abdomen-ultrasound',
  'neck-sonography': 'neck-ultrasound',
  'pregnancy-dating-scan': 'dating-scan',
  'target-scan': 'anomaly-scan',
  'targeted-anomaly-scan': 'anomaly-scan',
  'level-2-scan': 'anomaly-scan',
  'fetal-growth-scan': 'growth-scan',
  'fetal-doppler-study': 'fetal-doppler',
  'bpp-scan': 'biophysical-profile',
  'fetal-bpp': 'biophysical-profile',
  // Doppler duplicates (5)
  'doppler-scan': 'color-doppler',
  'vascular-color-doppler': 'vascular-doppler',
  'carotid-artery-doppler': 'carotid-doppler',
  'uterine-doppler': 'uterine-artery-doppler',
  'dvt-doppler': 'deep-vein-thrombosis-scan',
  // Bone / DEXA duplicates (2)
  'bmd-test': 'dexa-bone-scan',
  'bone-density-test': 'dexa-bone-scan',
  // Liver / FibroScan duplicates (3)
  'fibroscan-test': 'fibroscan',
  'liver-fibroscan': 'fibroscan',
  'hepatic-elastography': 'liver-elastography',
  // Health Checkups & Pathology duplicates (9)
  'cancer-screening-package': 'cancer-screening',
  'senior-health-checkup': 'senior-citizen-health-checkup',
  'cardiac-health-checkup': 'heart-health-checkup',
  'thyroid-profile': 'thyroid-test',
  'executive-health-screening': 'executive-health-checkup',
  'preventive-health-screening': 'preventive-health-checkup',
  'women-health-screening': 'women-health-checkup',
  'men-health-screening': 'men-health-checkup',
  'diabetes-health-screening': 'diabetes-health-checkup',
  // Genetics duplicates (5)
  'genetic-counselling-service': 'genetic-counselling',
  'chromosomal-testing': 'chromosomal-analysis',
  'chromosome-analysis': 'chromosomal-analysis',
  'carrier-testing': 'carrier-screening',
  'fertility-genetic-screening': 'fertility-genetic-test',
};

/**
 * Exact 49 core high-intent services kept indexable across Tier 2 metro catchments
 * and Pune regional L2 hubs.
 */
export const TIER2_CORE_SERVICES = new Set<string>([
  // Diagnostic Center & Checkups (7)
  'diagnostic-center',
  'pathology-lab',
  'health-checkup',
  'full-body-check-up',
  'master-health-checkup',
  'executive-health-checkup',
  'senior-citizen-health-checkup',
  // Pathology & Blood (8)
  'blood-test',
  'home-blood-collection',
  'cbc-test',
  'thyroid-test',
  'lipid-profile',
  'liver-function-test',
  'kidney-function-test',
  'hba1c-test',
  // MRI (6)
  'mri-scan',
  'mri-brain',
  'mri-spine',
  'mri-knee',
  'mri-shoulder',
  'whole-body-mri',
  // CT (6)
  'ct-scan',
  'hrct-chest',
  'ct-brain',
  'ct-angiography',
  'coronary-ct-angiography',
  'abdomen-ct-scan',
  // PET-CT & Nuclear (4)
  'pet-ct',
  'whole-body-pet-ct',
  'fdg-pet-ct',
  'psma-pet-scan',
  // Ultrasound & Pregnancy (7)
  'ultrasound',
  'sonography',
  'abdominal-ultrasound',
  'pregnancy-sonography',
  'nt-scan',
  'anomaly-scan',
  'color-doppler',
  // Breast, Women, Bone & Liver (5)
  'mammography',
  '3d-mammography',
  'dexa-bone-scan',
  'fibroscan',
  'follicular-study',
  // Cardiology (4)
  '2d-echo',
  'ecg',
  'tmt-test',
  'holter-monitoring',
  // Genetics & Genomics (2)
  'nipt-test',
  'whole-exome-sequencing',
]);

/**
 * Exact 120 clinical services kept indexable across Tier 1B (10.0–24.1 km from Kharghar).
 */
export const TIER1B_CLINICAL_SERVICES = new Set<string>([
  ...TIER2_CORE_SERVICES,
  // Diagnostic & Preventive Checkups (10)
  'radiology-center',
  'medical-imaging-center',
  'preventive-health-checkup',
  'annual-health-checkup',
  'corporate-health-checkup',
  'pre-employment-health-checkup',
  'women-health-checkup',
  'men-health-checkup',
  'heart-health-checkup',
  'cancer-screening',
  // Pathology & Blood (10)
  'diabetes-test',
  'vitamin-d-test',
  'vitamin-b12-test',
  'iron-profile',
  'hormone-test',
  'allergy-test',
  'tumor-marker-test',
  'dengue-test',
  'urine-test',
  'infection-test',
  // Ultrasound & Small Parts (10)
  'pelvic-ultrasound',
  'abdomen-pelvis-ultrasound',
  'whole-abdomen-ultrasound',
  'kub-ultrasound',
  'kidney-ultrasound',
  'thyroid-ultrasound',
  'breast-ultrasound',
  'neck-ultrasound',
  'transvaginal-ultrasound',
  'scrotal-ultrasound',
  // Pregnancy, Fetal & Fertility (10)
  'early-pregnancy-scan',
  'dating-scan',
  'first-trimester-scan',
  'growth-scan',
  'fetal-doppler',
  'fetal-echocardiography',
  'biophysical-profile',
  'cervical-length-scan',
  'hsg-test',
  'fertility-scan',
  // Doppler & Breast (7)
  'arterial-doppler',
  'venous-doppler',
  'carotid-doppler',
  'renal-doppler',
  'lower-limb-doppler',
  'digital-mammography',
  'sonomammography',
  // MRI Specialties (8)
  'cervical-spine-mri',
  'lumbar-spine-mri',
  'whole-spine-mri',
  'pelvis-mri',
  'cardiac-mri',
  'breast-mri',
  'mri-mrcp',
  'mri-angiography',
  // CT Specialties (6)
  'hrct-scan',
  'chest-ct-scan',
  'ct-abdomen-pelvis',
  'ct-kub',
  'ct-pns',
  'cardiac-ct-scan',
  // PET-CT, Nuclear & Cardiology (6)
  'oncology-pet-ct',
  'dtpa-scan',
  'bone-scan',
  'stress-echo',
  'ambulatory-bp-monitoring',
  '24-hour-holter',
  // Liver, Genetics, Microbiome, Urology (4)
  'fatty-liver-scan',
  'karyotype-test',
  'gut-microbiome-test',
  'uroflowmetry',
]);

const URAN_BELT_LOCATIONS = new Set<string>(['uran', 'jnpt-township', 'jasai', 'chirner']);
const RAIGAD_INNER_TIER2 = new Set<string>(['neral', 'karjat', 'pen', 'khopoli']);
const THANE_RURAL_TIER3 = new Set<string>(['shahapur', 'wada', 'palghar']);

const ALL_SERVICE_SET = new Set<string>(services);

export const CANONICAL_PRIMARY_SERVICES: string[] = services.filter(
  (slug) =>
    !(slug in ALL_REDIRECTED_SERVICE_SLUGS) &&
    !HOSPITAL_SURGICAL_SERVICES.has(slug) &&
    !(slug in CANONICAL_VARIANT_TO_PRIMARY)
);

const CANONICAL_PRIMARY_SET = new Set<string>(CANONICAL_PRIMARY_SERVICES);

/**
 * Resolves redirected synonyms/typos or duplicate variants to their primary service slug.
 */
export function getCanonicalServiceSlug(serviceSlug: string): string {
  const s = serviceSlug.toLowerCase();
  if (s in ALL_REDIRECTED_SERVICE_SLUGS) return ALL_REDIRECTED_SERVICE_SLUGS[s];
  if (s in CANONICAL_VARIANT_TO_PRIMARY) return CANONICAL_VARIANT_TO_PRIMARY[s];
  return s;
}

export function isRedirectedServiceSlug(serviceSlug: string): boolean {
  return serviceSlug.toLowerCase() in ALL_REDIRECTED_SERVICE_SLUGS;
}

export function isCanonicalPrimaryService(serviceSlug: string): boolean {
  return CANONICAL_PRIMARY_SET.has(serviceSlug.toLowerCase());
}

/**
 * Classifies a region+location into Tier 1A (<=10km), 1B (10-24.1km), Tier 2 (metro), or Tier 3 (outstation).
 */
export function getLocationTier(regionSlug: string, locationSlug: string): LocationTier {
  const region = regionSlug.toLowerCase();
  const location = locationSlug.toLowerCase();

  if (region === 'navi-mumbai') {
    const dist = getDistanceFromHubKm(location, region);
    if (dist !== null && dist <= 10.0) return '1A';
    return '1B';
  }
  if (region === 'raigad' && URAN_BELT_LOCATIONS.has(location)) {
    return '1B';
  }
  if (region === 'pune') {
    return '3';
  }
  if (region === 'thane' && THANE_RURAL_TIER3.has(location)) {
    return '3';
  }
  if (region === 'raigad' && !RAIGAD_INNER_TIER2.has(location)) {
    return '3';
  }
  if (DEPRECATED_REGIONS.has(region)) {
    return '3';
  }
  return '2';
}

function isPrimaryAllowedForTier(primarySlug: string, tier: LocationTier): boolean {
  if (!isCanonicalPrimaryService(primarySlug)) return false;
  if (tier === '1A') return true;
  if (tier === '1B') return TIER1B_CLINICAL_SERVICES.has(primarySlug);
  if (tier === '2') return TIER2_CORE_SERVICES.has(primarySlug);
  return false;
}

/**
 * Returns indexing directive and canonical URL for L1 `/services/[service]`.
 */
export function getL1IndexingDirective(serviceSlug: string): IndexingDirective {
  const s = serviceSlug.toLowerCase();
  if (s in ALL_REDIRECTED_SERVICE_SLUGS) {
    return {
      index: false,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/${ALL_REDIRECTED_SERVICE_SLUGS[s]}`,
      includeInSitemap: false,
    };
  }
  const exists = ALL_SERVICE_SET.has(s);
  return {
    index: exists,
    follow: true,
    canonicalUrl: `${BASE_URL}/services/${s}`,
    includeInSitemap: exists,
  };
}

/**
 * Returns indexing directive and canonical URL for L2 `/services/[service]/[region]`.
 */
export function getL2IndexingDirective(serviceSlug: string, regionSlug: string): IndexingDirective {
  const s = serviceSlug.toLowerCase();
  const r = regionSlug.toLowerCase();
  const primary = getCanonicalServiceSlug(s);

  if (DEPRECATED_REGIONS.has(r) || s in ALL_REDIRECTED_SERVICE_SLUGS || HOSPITAL_SURGICAL_SERVICES.has(s)) {
    return {
      index: false,
      follow: true,
      canonicalUrl: HOSPITAL_SURGICAL_SERVICES.has(s)
        ? `${BASE_URL}/services/${s}`
        : `${BASE_URL}/services/${primary}`,
      includeInSitemap: false,
    };
  }

  const primaryIndexable =
    isCanonicalPrimaryService(primary) && (r !== 'pune' || TIER2_CORE_SERVICES.has(primary));

  if (s in CANONICAL_VARIANT_TO_PRIMARY) {
    if (primaryIndexable) {
      // Clean canonical consolidation signal without mixed noindex + cross-canonical
      return {
        index: true,
        follow: true,
        canonicalUrl: `${BASE_URL}/services/${primary}/${r}`,
        includeInSitemap: false,
      };
    }
    return {
      index: false,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/${primary}`,
      includeInSitemap: false,
    };
  }

  if (!primaryIndexable) {
    return {
      index: false,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/${s}/${r}`,
      includeInSitemap: false,
    };
  }

  return {
    index: true,
    follow: true,
    canonicalUrl: `${BASE_URL}/services/${s}/${r}`,
    includeInSitemap: true,
  };
}

/**
 * Returns indexing directive, canonical URL, and tier for L3 `/services/[service]/[region]/[location]`.
 */
export function getL3IndexingDirective(
  serviceSlug: string,
  regionSlug: string,
  locationSlug: string
): L3IndexingDirective {
  const s = serviceSlug.toLowerCase();
  const r = regionSlug.toLowerCase();
  const l = locationSlug.toLowerCase();
  const tier = getLocationTier(r, l);
  const primary = getCanonicalServiceSlug(s);

  if (
    DEPRECATED_REGIONS.has(r) ||
    (r === 'raigad' && DUPLICATE_RAIGAD_LOCATIONS.has(l)) ||
    s in ALL_REDIRECTED_SERVICE_SLUGS ||
    HOSPITAL_SURGICAL_SERVICES.has(s)
  ) {
    return {
      index: false,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/${primary}`,
      includeInSitemap: false,
      tier,
    };
  }

  const primaryAllowed = isPrimaryAllowedForTier(primary, tier);

  if (s in CANONICAL_VARIANT_TO_PRIMARY) {
    if (primaryAllowed) {
      // Cross-canonical to matching indexable primary L3 page without conflicting noindex
      return {
        index: true,
        follow: true,
        canonicalUrl: `${BASE_URL}/services/${primary}/${r}/${l}`,
        includeInSitemap: false,
        tier,
      };
    }
    return {
      index: false,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/${primary}`,
      includeInSitemap: false,
      tier,
    };
  }

  if (isPrimaryAllowedForTier(s, tier)) {
    return {
      index: true,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/${s}/${r}/${l}`,
      includeInSitemap: true,
      tier,
    };
  }

  return {
    index: false,
    follow: true,
    canonicalUrl: `${BASE_URL}/services/${s}/${r}/${l}`,
    includeInSitemap: false,
    tier,
  };
}

export function buildRobotsMetadata(index: boolean): NonNullable<Metadata['robots']> {
  return {
    index,
    follow: true,
    googleBot: {
      index,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export interface NearbyIndexableLocation {
  slug: string;
  name: string;
  distanceKm: number | null;
  href: string;
}

/**
 * Returns the nearest `limit` indexable L3 sibling locations in the same region,
 * sorted by Haversine distance from `currentLocationSlug`.
 * Automatically resolves variant services to canonical primary and skips noindex/duplicate nodes.
 */
export function getNearestIndexableLocations(
  serviceSlug: string,
  regionSlug: string,
  currentLocationSlug: string,
  limit: number = 8
): NearbyIndexableLocation[] {
  const primaryService = getCanonicalServiceSlug(serviceSlug);
  const region = regionSlug.toLowerCase();
  const currentSlug = currentLocationSlug.toLowerCase();
  const candidates = REGION_LOCATIONS[region] || [];
  const origin = getLocationBySlug(currentSlug, region);

  const valid: NearbyIndexableLocation[] = [];

  for (const candidateSlug of candidates) {
    if (candidateSlug === currentSlug) continue;
    if (region === 'raigad' && DUPLICATE_RAIGAD_LOCATIONS.has(candidateSlug)) continue;
    const directive = getL3IndexingDirective(primaryService, region, candidateSlug);
    if (!directive.includeInSitemap) continue;

    const candidateLoc = getLocationBySlug(candidateSlug, region);
    const distanceKm =
      origin && candidateLoc
        ? calculateHaversineKm(
            origin.latitude,
            origin.longitude,
            candidateLoc.latitude,
            candidateLoc.longitude
          )
        : null;

    valid.push({
      slug: candidateSlug,
      name:
        candidateLoc?.name ||
        candidateSlug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      distanceKm,
      href: `/services/${primaryService}/${region}/${candidateSlug}`,
    });
  }

  valid.sort((a, b) => {
    if (a.distanceKm !== null && b.distanceKm !== null) {
      return a.distanceKm - b.distanceKm;
    }
    if (a.distanceKm !== null) return -1;
    if (b.distanceKm !== null) return 1;
    return a.name.localeCompare(b.name);
  });

  return valid.slice(0, limit);
}
