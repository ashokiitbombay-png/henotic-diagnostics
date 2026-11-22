import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface EdgePurgeResult {
  nginxFilesDeleted: number;
  nginxRefreshed: number;
  cloudflarePurged: number;
  paths: string[];
}

export interface EdgePurgeOptions {
  purgeAll?: boolean;
  cacheDir?: string;
  siteUrl?: string;
}

const CACHE_KEY_PREFIXES = ['httpsGET', 'httpGET', 'httpsHEAD', 'httpHEAD'] as const;
const MD5_FILENAME_RE = /^[0-9a-f]{32}$/i;

/**
 * Computes the Nginx `proxy_cache_path ... levels=1:2` file path for a cache key.
 */
export function computeNginxCachePath(cacheDir: string, cacheKey: string): string {
  const hash = crypto.createHash('md5').update(cacheKey).digest('hex');
  return path.join(cacheDir, hash.slice(-1), hash.slice(-3, -1), hash);
}

/**
 * Resolves public site URL paths affected by a CMS content update.
 */
export function resolvePathsForContent(contentType: string, slug: string): string[] {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');

  switch (contentType) {
    case 'service':
    case 'health-checkup-page':
    case 'nipt-page':
      return cleanSlug ? [`/services/${cleanSlug}`] : ['/services'];
    case 'health-packages':
      return [
        '/services/health-checkup',
        '/services/full-body-check-up',
        '/services/master-health-checkup',
      ];
    case 'nipt-tests':
      return ['/services/nipt-test', '/services/nips-test'];
    case 'post':
      return cleanSlug ? [`/blog/${cleanSlug}`, '/blog'] : ['/blog'];
    case 'page':
      return [slug.startsWith('/') ? slug : `/${cleanSlug}`];
    case 'condition':
      return cleanSlug ? [`/conditions/${cleanSlug}`, '/conditions'] : ['/conditions'];
    default:
      return [];
  }
}

function normalizeUrlPath(rawPath: string): string {
  const trimmed = rawPath.trim();
  if (!trimmed || trimmed === '/') return '/';
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '') || '/';
}

function deleteAllNginxCacheEntries(cacheDir: string): number {
  let deleted = 0;
  const stack = [cacheDir];

  while (stack.length > 0) {
    const dir = stack.pop()!;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(/*turbopackIgnore: true*/ dir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && MD5_FILENAME_RE.test(entry.name)) {
        try {
          fs.unlinkSync(/*turbopackIgnore: true*/ fullPath);
          deleted++;
        } catch (err) {
          const code = (err as NodeJS.ErrnoException)?.code;
          if (code !== 'ENOENT') {
            console.warn(`[NginxPurge] Failed to unlink ${fullPath}:`, code || err);
          }
        }
      }
    }
  }

  return deleted;
}

/**
 * Purges stale Nginx micro-cache files on disk, optionally refreshes entries via
 * loopback Nginx, and optionally purges Cloudflare Edge cache when credentials exist.
 * Never throws so webhook/revalidation calls remain resilient across all environments.
 */
export async function purgeNginxAndEdgeCache(
  paths: string[],
  options: EdgePurgeOptions = {}
): Promise<EdgePurgeResult> {
  const siteUrl = (options.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.henoticdiagnostics.com').replace(/\/+$/, '');
  let host = 'www.henoticdiagnostics.com';
  try {
    host = new URL(siteUrl).host;
  } catch {
    // Keep canonical host fallback
  }

  const uniquePaths = Array.from(new Set(paths.map(normalizeUrlPath)));
  const cacheDir = options.cacheDir ?? process.env.NGINX_CACHE_DIR ?? '/var/cache/nginx/henotic';

  let nginxFilesDeleted = 0;
  let nginxRefreshed = 0;
  let cloudflarePurged = 0;

  try {
    // Layer A: Direct Nginx proxy_cache disk unlink
    if (cacheDir && fs.existsSync(/*turbopackIgnore: true*/ cacheDir)) {
      if (options.purgeAll) {
        nginxFilesDeleted += deleteAllNginxCacheEntries(cacheDir);
      } else {
        for (const urlPath of uniquePaths) {
          for (const prefix of CACHE_KEY_PREFIXES) {
            const cacheFile = computeNginxCachePath(cacheDir, `${prefix}${host}${urlPath}`);
            try {
              fs.unlinkSync(/*turbopackIgnore: true*/ cacheFile);
              nginxFilesDeleted++;
            } catch (err) {
              const code = (err as NodeJS.ErrnoException)?.code;
              if (code && code !== 'ENOENT') {
                console.warn(`[NginxPurge] Unable to delete cache file ${cacheFile}:`, code);
              }
            }
          }
        }
      }
    }

    // Layer B: Loopback Nginx refresh bypass (overwrites cached HTML immediately)
    const internalBase = process.env.NGINX_INTERNAL_URL?.replace(/\/+$/, '');
    if (internalBase && !options.purgeAll && uniquePaths.length > 0) {
      const refreshResults = await Promise.allSettled(
        uniquePaths.map(async (urlPath) => {
          const res = await fetch(`${internalBase}${urlPath}`, {
            method: 'GET',
            redirect: 'manual',
            signal: AbortSignal.timeout(3000),
            headers: {
              Host: host,
              'X-Cache-Refresh': '1',
              'X-Cache-Refresh-Scheme': 'https',
              'User-Agent': 'HenoticRevalidator/1.0',
            },
          });
          return res.status < 400;
        })
      );

      for (const r of refreshResults) {
        if (r.status === 'fulfilled' && r.value) {
          nginxRefreshed++;
        } else if (r.status === 'rejected') {
          console.warn('[NginxPurge] Loopback refresh failed:', r.reason);
        }
      }
    }

    // Layer C: Optional Cloudflare Zone Cache Purge
    const cfZoneId = process.env.CLOUDFLARE_ZONE_ID;
    const cfToken = process.env.CLOUDFLARE_API_TOKEN;
    if (cfZoneId && cfToken) {
      const cfEndpoint = `https://api.cloudflare.com/client/v4/zones/${cfZoneId}/purge_cache`;
      const cfHeaders = {
        Authorization: `Bearer ${cfToken}`,
        'Content-Type': 'application/json',
      };

      if (options.purgeAll) {
        const res = await fetch(cfEndpoint, {
          method: 'POST',
          headers: cfHeaders,
          body: JSON.stringify({ purge_everything: true }),
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          cloudflarePurged = Math.max(uniquePaths.length, 1);
        } else {
          console.warn(`[CloudflarePurge] purge_everything failed with status ${res.status}`);
        }
      } else if (uniquePaths.length > 0) {
        const fullUrls = uniquePaths.map((p) => `${siteUrl}${p}`);
        for (let i = 0; i < fullUrls.length; i += 30) {
          const batch = fullUrls.slice(i, i + 30);
          const res = await fetch(cfEndpoint, {
            method: 'POST',
            headers: cfHeaders,
            body: JSON.stringify({ files: batch }),
            signal: AbortSignal.timeout(5000),
          });
          if (res.ok) {
            cloudflarePurged += batch.length;
          } else {
            console.warn(`[CloudflarePurge] batch purge failed with status ${res.status}`);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[NginxPurge] Edge purge encountered a non-fatal error:', err instanceof Error ? err.message : String(err));
  }

  return {
    nginxFilesDeleted,
    nginxRefreshed,
    cloudflarePurged,
    paths: uniquePaths,
  };
}
