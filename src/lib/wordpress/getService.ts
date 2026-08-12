import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { GET_SERVICE_BY_SLUG } from "@/lib/wordpress/queries";
import type { WordPressService, GetServiceResponse } from "@/types/cms";
import { getFailsafeData, saveFailsafeData } from "@/lib/wordpress/failsafeStore";
import { wpCacheThrough } from "@/lib/cache/wp-cache";
import { CACHE_TAGS } from "@/lib/cache/tags";

/**
 * Fetches dynamic service custom post type content from WordPress by its slug.
 *
 * Cache Architecture (3-layer):
 * 1. Next.js Data Cache (via `unstable_cache` with tags) — enables O(1)
 *    invalidation via `revalidateTag(CACHE_TAGS.service('mri-scan'), 'max')`
 * 2. Redis Cache-Through (via `wpCacheThrough`) — cross-invocation L1 cache
 *    that survives serverless cold starts
 * 3. Failsafe Store — JSON-based last-known-good fallback for total failure
 *
 * @param slug The service slug (e.g. "mri-scan", "ct-scan")
 */
async function _getService(slug: string): Promise<WordPressService | null> {
  try {
    // Wrap in unstable_cache with CACHE_TAGS so revalidateTag() works
    const fetchWithTags = unstable_cache(
      async () => {
        return wpCacheThrough<WordPressService | null>(
          'service',
          slug,
          async () => {
            const client = getClient();
            const { data } = await client.query<GetServiceResponse>({
              query: GET_SERVICE_BY_SLUG,
              variables: { slug },
              fetchPolicy: "no-cache"
            });
            return data?.service ?? null;
          }
        );
      },
      // Cache key segments
      ['wp-service', slug],
      {
        tags: [CACHE_TAGS.service(slug), CACHE_TAGS.servicesList],
        revalidate: 86400, // 24 hours — matches ISR period
      }
    );

    let service = await fetchWithTags();

    // If cache returned null, attempt direct query before falling back to failsafe
    if (!service) {
      try {
        const client = getClient();
        const { data } = await client.query<GetServiceResponse>({
          query: GET_SERVICE_BY_SLUG,
          variables: { slug },
          fetchPolicy: "no-cache"
        });
        if (data?.service) {
          service = data.service;
        }
      } catch (directErr) {
        console.warn(`[getService] Direct fetch retry failed for slug ${slug}:`, directErr);
      }
    }

    if (service) {
      saveFailsafeData(slug, { title: service.title, content: service.content });
      return service;
    }

    // Check fallback if service data is missing
    const fallback = getFailsafeData(slug);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored service content for slug "${slug}".`);
      return fallback;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch service data for slug ${slug}:`, error);
    const fallback = getFailsafeData(slug);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored service content for slug "${slug}" after error.`);
      return fallback;
    }
    return null;
  }
}

export const getService = cache(_getService);
