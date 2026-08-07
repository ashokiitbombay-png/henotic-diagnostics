import type {
  PayloadCollectionMap,
  PayloadCollectionSlug,
  PayloadListResponse,
  PayloadFindByIDResponse,
} from '@/types/payload';
import { wpCacheThrough } from '@/lib/cache/wp-cache';

// ── Configuration ────────────────────────────────────────────────────────────

const PAYLOAD_URL = process.env.PAYLOAD_CMS_URL || '';
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY || '';

/** Maximum retry attempts for transient failures */
const MAX_RETRIES = 3;
/** Initial retry delay in milliseconds (doubles each attempt) */
const INITIAL_RETRY_DELAY = 300;

// ── Types ────────────────────────────────────────────────────────────────────

interface PayloadQueryParams {
  /** MongoDB-style where clause */
  where?: Record<string, unknown>;
  /** Number of documents per page */
  limit?: number;
  /** Page number (1-indexed) */
  page?: number;
  /** Sort field with optional minus for descending */
  sort?: string;
  /** Depth of relationship population */
  depth?: number;
}

// ── Retry Logic ──────────────────────────────────────────────────────────────

/**
 * Executes a fetch with exponential backoff retry.
 * Only retries on network errors and 5xx status codes.
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number = MAX_RETRIES
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);

      // Don't retry client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        return response;
      }

      // Retry server errors (5xx)
      if (response.status >= 500 && attempt < retries) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        console.warn(
          `[Payload] ${response.status} on attempt ${attempt + 1}/${retries + 1}. ` +
          `Retrying in ${delay}ms...`
        );
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retries) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        console.warn(
          `[Payload] Network error on attempt ${attempt + 1}/${retries + 1}: ${lastError.message}. ` +
          `Retrying in ${delay}ms...`
        );
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('[Payload] All retry attempts exhausted');
}

// ── Core Client ──────────────────────────────────────────────────────────────

/**
 * Build the full URL for a Payload REST API endpoint.
 */
function buildUrl(collection: string, id?: string, params?: PayloadQueryParams): string {
  const base = `${PAYLOAD_URL}/api/${collection}${id ? `/${id}` : ''}`;
  const url = new URL(base);

  if (params?.limit) url.searchParams.set('limit', String(params.limit));
  if (params?.page) url.searchParams.set('page', String(params.page));
  if (params?.sort) url.searchParams.set('sort', params.sort);
  if (params?.depth !== undefined) url.searchParams.set('depth', String(params.depth));
  if (params?.where) {
    url.searchParams.set('where', JSON.stringify(params.where));
  }

  return url.toString();
}

/**
 * Build common request headers for Payload API.
 */
function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (PAYLOAD_API_KEY) {
    headers['Authorization'] = `Bearer ${PAYLOAD_API_KEY}`;
  }

  return headers;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetches a paginated list of documents from a Payload CMS collection.
 *
 * Uses Redis cache-through for cross-invocation caching.
 * Results are typed based on the collection slug.
 *
 * @param collection The Payload collection slug
 * @param params     Optional query parameters (where, limit, page, sort, depth)
 * @param cacheTtl   Cache TTL in seconds (default: 3600)
 *
 * @example
 *   const services = await payloadFind('services', {
 *     where: { 'regions.slug': { equals: 'navi-mumbai' } },
 *     limit: 50,
 *     sort: '-updatedAt',
 *     depth: 2,
 *   });
 */
export async function payloadFind<T extends PayloadCollectionSlug>(
  collection: T,
  params?: PayloadQueryParams,
  cacheTtl: number = 3600
): Promise<PayloadListResponse<PayloadCollectionMap[T]> | null> {
  if (!PAYLOAD_URL) {
    console.warn('[Payload] PAYLOAD_CMS_URL not configured. Skipping fetch.');
    return null;
  }

  const cacheKey = `${collection}:${JSON.stringify(params || {})}`;

  return wpCacheThrough<PayloadListResponse<PayloadCollectionMap[T]> | null>(
    `payload:${collection}`,
    cacheKey,
    async () => {
      const url = buildUrl(collection, undefined, params);
      const response = await fetchWithRetry(url, {
        method: 'GET',
        headers: buildHeaders(),
        next: { revalidate: cacheTtl },
      });

      if (!response.ok) {
        console.error(`[Payload] ${collection} list failed: ${response.status} ${response.statusText}`);
        return null;
      }

      return await response.json() as PayloadListResponse<PayloadCollectionMap[T]>;
    },
    cacheTtl
  );
}

/**
 * Fetches a single document by ID from a Payload CMS collection.
 *
 * @param collection The Payload collection slug
 * @param id         The document ID
 * @param depth      Relationship population depth (default: 1)
 * @param cacheTtl   Cache TTL in seconds (default: 86400)
 */
export async function payloadFindByID<T extends PayloadCollectionSlug>(
  collection: T,
  id: string,
  depth: number = 1,
  cacheTtl: number = 86400
): Promise<PayloadCollectionMap[T] | null> {
  if (!PAYLOAD_URL) {
    console.warn('[Payload] PAYLOAD_CMS_URL not configured. Skipping fetch.');
    return null;
  }

  return wpCacheThrough<PayloadCollectionMap[T] | null>(
    `payload:${collection}`,
    id,
    async () => {
      const url = buildUrl(collection, id, { depth });
      const response = await fetchWithRetry(url, {
        method: 'GET',
        headers: buildHeaders(),
        next: { revalidate: cacheTtl },
      });

      if (!response.ok) {
        console.error(`[Payload] ${collection}/${id} fetch failed: ${response.status}`);
        return null;
      }

      return await response.json() as PayloadCollectionMap[T];
    },
    cacheTtl
  );
}

/**
 * Fetches a single document by slug from a Payload CMS collection.
 *
 * Convenience wrapper around `payloadFind` with `where: { slug: { equals } }`.
 *
 * @param collection The Payload collection slug
 * @param slug       The document slug
 * @param depth      Relationship population depth (default: 1)
 * @param cacheTtl   Cache TTL in seconds (default: 86400)
 */
export async function payloadFindBySlug<T extends PayloadCollectionSlug>(
  collection: T,
  slug: string,
  depth: number = 1,
  cacheTtl: number = 86400
): Promise<PayloadCollectionMap[T] | null> {
  if (!PAYLOAD_URL) return null;

  return wpCacheThrough<PayloadCollectionMap[T] | null>(
    `payload:${collection}`,
    `slug:${slug}`,
    async () => {
      const url = buildUrl(collection, undefined, {
        where: { slug: { equals: slug } },
        limit: 1,
        depth,
      });

      const response = await fetchWithRetry(url, {
        method: 'GET',
        headers: buildHeaders(),
        next: { revalidate: cacheTtl },
      });

      if (!response.ok) return null;

      const result = await response.json() as PayloadListResponse<PayloadCollectionMap[T]>;
      return result.docs[0] ?? null;
    },
    cacheTtl
  );
}
