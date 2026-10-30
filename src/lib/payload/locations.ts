import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { payloadFind, payloadFindBySlug } from '@/lib/payload/client';
import { CACHE_TAGS } from '@/lib/cache/tags';
import type { PayloadLocation } from '@/types/payload';
import {
  getLocationBySlug,
  getLocationsByRegion,
  LOCATION_DATABASE,
  type LocationItem
} from '@/config/locations';

const REVALIDATE_SECONDS = 86400;

/**
 * Merge a static LocationItem with any dynamic overrides from Payload CMS
 */
export function mergeLocation(
  staticLoc: LocationItem | undefined,
  payloadLoc: PayloadLocation | null | undefined
): LocationItem | null {
  if (!staticLoc && !payloadLoc) return null;
  if (!payloadLoc) return staticLoc ?? null;

  return {
    id: staticLoc ? staticLoc.id : 9999,
    name: payloadLoc.name || staticLoc?.name || '',
    slug: payloadLoc.slug || staticLoc?.slug || '',
    city: payloadLoc.city || staticLoc?.city || '',
    region: payloadLoc.region || staticLoc?.region || '',
    regionName: payloadLoc.regionName || staticLoc?.regionName || '',
    pincode: payloadLoc.pincode || staticLoc?.pincode || '',
    latitude: payloadLoc.coordinates?.latitude ?? payloadLoc.latitude ?? staticLoc?.latitude ?? 19.033,
    longitude: payloadLoc.coordinates?.longitude ?? payloadLoc.longitude ?? staticLoc?.longitude ?? 73.067,
    section: payloadLoc.section || staticLoc?.section || '',
    formattedAddress: payloadLoc.formattedAddress || payloadLoc.address || staticLoc?.formattedAddress || '',
    serviceTier: payloadLoc.serviceTier || staticLoc?.serviceTier || 'Tier 1 - Immediate Diagnostic Hub',
    hasHomeCollection: payloadLoc.hasHomeCollection ?? staticLoc?.hasHomeCollection ?? true,
    homeCollectionTurnaround: payloadLoc.homeCollectionTurnaround || staticLoc?.homeCollectionTurnaround || '30–60 mins',
    sameDayReportDelivery: payloadLoc.sameDayReportDelivery ?? staticLoc?.sameDayReportDelivery ?? true,
    nearestPartnerHub: payloadLoc.nearestPartnerHub || staticLoc?.nearestPartnerHub || 'Henotic Diagnostics Flagship Hub',
  };
}

/**
 * Fetch a single location with ISR caching + React per-request memoization.
 * Fallback to static config when Payload CMS is offline or unset.
 */
export const getPayloadLocation = cache(async (
  slug: string,
  regionSlug?: string
): Promise<LocationItem | null> => {
  const staticLoc = getLocationBySlug(slug, regionSlug);

  const fetcher = unstable_cache(
    async (): Promise<LocationItem | null> => {
      try {
        const payloadDoc = await payloadFindBySlug<'locations'>('locations', slug, 0);
        if (payloadDoc && payloadDoc.isActive !== false) {
          return mergeLocation(staticLoc, payloadDoc);
        }
      } catch (err) {
        // Silent fallback to static config on network/CMS downtime
      }
      return staticLoc ?? null;
    },
    ['payload-location', slug, regionSlug || 'all'],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.location(slug), CACHE_TAGS.locationsList],
    }
  );

  return fetcher();
});

/**
 * Fetch all locations for a region, falling back to static config.
 */
export const getPayloadLocationsForRegion = cache(async (
  regionSlug: string
): Promise<LocationItem[]> => {
  const staticLocs = getLocationsByRegion(regionSlug);

  const fetcher = unstable_cache(
    async (): Promise<LocationItem[]> => {
      try {
        const res = await payloadFind<'locations'>('locations', {
          where: { region: { equals: regionSlug }, isActive: { not_equals: false } },
          limit: 100,
          depth: 0,
        });

        if (res && res.docs.length > 0) {
          const payloadBySlug = new Map(res.docs.map(d => [d.slug, d]));
          return staticLocs.map(staticLoc => mergeLocation(staticLoc, payloadBySlug.get(staticLoc.slug))!);
        }
      } catch (err) {
        // Fallback to static
      }
      return staticLocs;
    },
    ['payload-locations-region', regionSlug],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.locationsList],
    }
  );

  return fetcher();
});
