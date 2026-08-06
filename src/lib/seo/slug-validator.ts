/**
 * ⚡ O(1) Slug Validation for ISR Cache Pollution Prevention
 * 
 * Uses pre-computed Sets for constant-time lookups. Prevents attackers
 * from generating millions of invalid 200-status pages in the CDN cache.
 * Invalid slugs return notFound() which produces a 404 that is NOT cached.
 * 
 * Memory footprint: ~50 KB for 800 services + 250 locations
 */
import { services } from '@/config/services';
import { REGION_LOCATIONS } from '@/config/locations';
import { CONDITIONS } from '@/config/conditions';

// Pre-computed Sets for O(1) lookups (created once at module load)
const SERVICE_SET = new Set(services);
const REGION_SET = new Set(Object.keys(REGION_LOCATIONS));
const LOCATION_SET = new Set(
  Object.values(REGION_LOCATIONS).flat()
);
const CONDITION_SET = new Set(
  CONDITIONS.map(c => c.id)
);

// Region → Location mapping for cross-validation
const REGION_LOCATION_MAP = new Map<string, Set<string>>(
  Object.entries(REGION_LOCATIONS).map(
    ([region, locs]) => [region, new Set(locs)]
  )
);

export function isValidServiceSlug(slug: string): boolean {
  return SERVICE_SET.has(slug);
}

export function isValidRegionSlug(slug: string): boolean {
  return REGION_SET.has(slug);
}

export function isValidLocationSlug(slug: string): boolean {
  return LOCATION_SET.has(slug);
}

export function isValidConditionSlug(slug: string): boolean {
  return CONDITION_SET.has(slug);
}

/**
 * Validates that a location actually belongs to the given region.
 * Prevents cross-region URL injection (e.g., /services/mri/pune/kharghar).
 */
export function isValidLocationForRegion(
  region: string,
  location: string
): boolean {
  const regionLocs = REGION_LOCATION_MAP.get(region);
  return regionLocs?.has(location) ?? false;
}
