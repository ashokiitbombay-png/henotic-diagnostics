import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { GET_SERVICE_BY_SLUG } from "@/lib/wordpress/queries";
import type { WordPressService, GetServiceResponse } from "@/types/cms";
import { getFailsafeData, saveFailsafeData } from "@/lib/wordpress/failsafeStore";
import { wpCacheThrough } from "@/lib/cache/wp-cache";

/**
 * Fetches dynamic service custom post type content from WordPress by its slug.
 * Uses Redis cache-through to prevent redundant GraphQL calls across
 * serverless function invocations.
 * 
 * @param slug The service slug (e.g. "mri-scan", "ct-scan")
 */
async function _getService(slug: string): Promise<WordPressService | null> {
  try {
    const service = await wpCacheThrough<WordPressService | null>(
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
