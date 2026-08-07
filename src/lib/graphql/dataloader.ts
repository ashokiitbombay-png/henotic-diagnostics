import DataLoader from 'dataloader';
import { getClient } from '@/lib/apollo-client';
import { GET_SERVICES_BY_SLUGS, GET_PAGES_BY_URIS } from '@/lib/wordpress/queries';
import type { WordPressService, WordPressPage, GetServicesBySlugResponse, GetPagesByUriResponse } from '@/types/cms';

/**
 * Request-scoped DataLoader factory for WordPress content.
 * 
 * Prevents N+1 GraphQL queries during Googlebot crawl storms
 * by batching concurrent requests within the same event loop tick
 * into a single batch GraphQL query.
 * 
 * Usage:
 *   const loaders = createLoaders();
 *   const service = await loaders.service.load('mri-scan');
 */

// ── Service Batch Loader ─────────────────────────────────────────────────

async function batchServicesBySlug(
  slugs: readonly string[]
): Promise<(WordPressService | null)[]> {
  const client = getClient();
  
  try {
    const { data } = await client.query<GetServicesBySlugResponse>({
      query: GET_SERVICES_BY_SLUGS,
      variables: { slugs: [...slugs] },
      fetchPolicy: 'no-cache',
    });

    const serviceMap = new Map<string, WordPressService>();
    (data?.services?.nodes ?? []).forEach((node: { slug: string; title: string; content: string }) => {
      serviceMap.set(node.slug, { title: node.title, content: node.content });
    });

    // DataLoader requires results in the SAME ORDER as input keys
    return slugs.map(slug => serviceMap.get(slug) ?? null);
  } catch (error) {
    console.error('[DataLoader] Batch service fetch failed:', error);
    return slugs.map(() => null);
  }
}

// ── Page Batch Loader ────────────────────────────────────────────────────

async function batchPagesByUri(
  uris: readonly string[]
): Promise<(WordPressPage | null)[]> {
  const client = getClient();

  try {
    const { data } = await client.query<GetPagesByUriResponse>({
      query: GET_PAGES_BY_URIS,
      variables: { uris: [...uris] },
      fetchPolicy: 'no-cache',
    });

    const pageMap = new Map<string, WordPressPage>();
    (data?.pages?.nodes ?? []).forEach((node: { uri: string; title: string; content: string }) => {
      pageMap.set(node.uri, { title: node.title, content: node.content });
    });

    return uris.map(uri => pageMap.get(uri) ?? null);
  } catch (error) {
    console.error('[DataLoader] Batch page fetch failed:', error);
    return uris.map(() => null);
  }
}

// ── Loader Factory ───────────────────────────────────────────────────────

export interface ContentLoaders {
  service: DataLoader<string, WordPressService | null>;
  page: DataLoader<string, WordPressPage | null>;
}

/**
 * Creates a new set of request-scoped DataLoaders.
 * 
 * Call once per request (e.g., in a React Server Component or API route).
 * Each loader batches concurrent `.load()` calls into a single GraphQL query.
 * 
 * The `maxBatchSize` is capped at 50 to prevent oversized WPGraphQL queries.
 */
export function createLoaders(): ContentLoaders {
  return {
    service: new DataLoader<string, WordPressService | null>(batchServicesBySlug, {
      maxBatchSize: 50,
      cache: true, // Per-request dedup
    }),
    page: new DataLoader<string, WordPressPage | null>(batchPagesByUri, {
      maxBatchSize: 50,
      cache: true,
    }),
  };
}

// ── Singleton for build-time usage ───────────────────────────────────────

let _buildLoaders: ContentLoaders | null = null;

/**
 * Returns a shared DataLoader instance for build-time static generation.
 * During `generateStaticParams` or build-time rendering, requests are
 * sequential but we still benefit from deduplication.
 */
export function getBuildLoaders(): ContentLoaders {
  if (!_buildLoaders) {
    _buildLoaders = createLoaders();
  }
  return _buildLoaders;
}
