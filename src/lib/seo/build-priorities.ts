/**
 * ⚡ Build Priority Manifest Reader for ISR Pre-Rendering
 * 
 * Reads from src/config/build-priorities.json to determine which
 * URLs to pre-render at build time via generateStaticParams().
 * 
 * The manifest is organized by route level (service, region, location)
 * and sorted by priority tier (T1 revenue-critical → T7 backfill).
 * 
 * Updated weekly via GSC sync script or manually.
 */
import buildManifest from '@/config/build-priorities.json';
import { filterShardParams } from '@/lib/seo/shard-helper';

export interface PriorityEntry {
  service: string;
  region?: string;
  location?: string;
  tier: number;
}

interface BuildManifest {
  version: string;
  generatedAt: string;
  service: PriorityEntry[];
  region: PriorityEntry[];
  location: PriorityEntry[];
  condition: { condition: string; tier: number }[];
}

/**
 * Returns the top N pre-build paths for a given route level,
 * already filtered through the build shard helper for parallel CI.
 */
export function getServicePriorities(maxPaths: number = 200) {
  const manifest = buildManifest as BuildManifest;
  return filterShardParams(
    manifest.service.slice(0, maxPaths).map(p => ({ service: p.service }))
  );
}

export function getRegionPriorities(maxPaths: number = 3000) {
  const manifest = buildManifest as BuildManifest;
  return filterShardParams(
    manifest.region.slice(0, maxPaths).map(p => ({
      service: p.service,
      region: p.region!,
    }))
  );
}

export function getLocationPriorities(maxPaths: number = 5000) {
  const manifest = buildManifest as BuildManifest;
  return filterShardParams(
    manifest.location.slice(0, maxPaths).map(p => ({
      service: p.service,
      region: p.region!,
      location: p.location!,
    }))
  );
}

export function getConditionPriorities(maxPaths: number = 100) {
  const manifest = buildManifest as BuildManifest;
  return filterShardParams(
    manifest.condition.slice(0, maxPaths).map(p => ({
      condition: p.condition,
    }))
  );
}
