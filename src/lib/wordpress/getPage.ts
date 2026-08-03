import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { GET_PAGE_BY_URI } from "@/lib/wordpress/queries";
import type { WordPressPage, GetPageResponse } from "@/types/cms";
import { getFailsafeData, saveFailsafeData } from "@/lib/wordpress/failsafeStore";
import { wpCacheThrough } from "@/lib/cache/wp-cache";

/**
 * Fetches generic static page content from WordPress by URI/slug.
 * Uses Redis cache-through to avoid redundant GraphQL calls.
 * 
 * @param uri The page path (e.g. "/about-us", "/privacy")
 */
async function _getPage(uri: string): Promise<WordPressPage | null> {
  try {
    const page = await wpCacheThrough<WordPressPage | null>(
      'page',
      uri,
      async () => {
        const client = getClient();
        const { data } = await client.query<GetPageResponse>({
          query: GET_PAGE_BY_URI,
          variables: { uri },
          fetchPolicy: "no-cache"
        });
        return data?.page ?? null;
      }
    );

    if (page) {
      saveFailsafeData(uri, { title: page.title, content: page.content });
      return page;
    }
    
    // Check fallback if page data is missing
    const fallback = getFailsafeData(uri);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored page content for URI "${uri}".`);
      return fallback;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch page data for URI ${uri}:`, error);
    const fallback = getFailsafeData(uri);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored page content for URI "${uri}" after error.`);
      return fallback;
    }
    return null;
  }
}

export const getPage = cache(_getPage);
