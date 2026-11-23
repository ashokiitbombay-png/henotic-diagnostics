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
import {
  getL1IndexingDirective,
  getL2IndexingDirective,
  getL3IndexingDirective,
} from '@/lib/seo/indexing-policy';

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
 * Returns the top N indexable pre-build paths for a given route level,
 * already filtered through indexing-policy + the build shard helper for parallel CI.
 */
export function getServicePriorities(maxPaths: number = 60) {
  const manifest = buildManifest as BuildManifest;
  const indexable = manifest.service
    .filter((p) => getL1IndexingDirective(p.service).includeInSitemap)
    .slice(0, maxPaths)
    .map((p) => ({ service: p.service }));
  return filterShardParams(indexable);
}

export function getRegionPriorities(maxPaths: number = 150) {
  const manifest = buildManifest as BuildManifest;
  const indexable = manifest.region
    .filter((p) => Boolean(p.region) && getL2IndexingDirective(p.service, p.region!).includeInSitemap)
    .slice(0, maxPaths)
    .map((p) => ({
      service: p.service,
      region: p.region!,
    }));
  return filterShardParams(indexable);
}

export function getLocationPriorities(maxPaths: number = 250) {
  const manifest = buildManifest as BuildManifest;
  const indexable = manifest.location
    .filter(
      (p) =>
        Boolean(p.region && p.location) &&
        getL3IndexingDirective(p.service, p.region!, p.location!).includeInSitemap
    )
    .slice(0, maxPaths)
    .map((p) => ({
      service: p.service,
      region: p.region!,
      location: p.location!,
    }));
  return filterShardParams(indexable);
}

export function getConditionPriorities(maxPaths: number = 30) {
  const manifest = buildManifest as BuildManifest;
  return filterShardParams(
    manifest.condition.slice(0, maxPaths).map(p => ({
      condition: p.condition,
    }))
  );
}
