import { getClient } from '@/lib/apollo-client';
import { GET_ALL_SERVICE_SLUGS } from '@/lib/wordpress/queries';
import type { GetServiceSlugsResponse } from '@/types/cms';

/**
 * Fetches ALL published service slugs from WordPress using cursor-based pagination.
 * 
 * Architecture:
 * - Pages through results 100 at a time using `after: cursor`
 * - Automatically follows `hasNextPage` until all slugs are collected
 * - Used by build scripts to regenerate build-priorities.json
 * - Prevents stale slug lists during ISR
 * 
 * @param pageSize Number of slugs per GraphQL request (default: 100)
 * @returns Array of all published service slugs
 */
export async function getAllServiceSlugs(pageSize: number = 100): Promise<string[]> {
  const client = getClient();
  const allSlugs: string[] = [];
  let cursor: string | null = null;
  let hasNextPage = true;
  let pageCount = 0;

  while (hasNextPage) {
    pageCount++;
    
    try {
      const result: { data: GetServiceSlugsResponse | undefined } = await client.query<GetServiceSlugsResponse>({
        query: GET_ALL_SERVICE_SLUGS,
        variables: {
          first: pageSize,
          after: cursor,
        },
        fetchPolicy: 'no-cache',
      });

      const services: GetServiceSlugsResponse['services'] | undefined = result.data?.services;
      if (!services) break;

      const slugs = services.nodes.map((n: { slug: string }) => n.slug);
      allSlugs.push(...slugs);

      hasNextPage = services.pageInfo.hasNextPage;
      cursor = services.pageInfo.endCursor;

      console.log(
        `[ServiceSlugs] Page ${pageCount}: fetched ${slugs.length} slugs ` +
        `(total: ${allSlugs.length}, hasNext: ${hasNextPage})`
      );
    } catch (error) {
      console.error(`[ServiceSlugs] Failed on page ${pageCount}:`, error);
      break;
    }

    // Safety: prevent infinite loops (max 50 pages = 5,000 services)
    if (pageCount >= 50) {
      console.warn('[ServiceSlugs] Hit max page limit (50). Stopping pagination.');
      break;
    }
  }

  console.log(`[ServiceSlugs] Complete: ${allSlugs.length} slugs across ${pageCount} pages`);
  return allSlugs;
}
