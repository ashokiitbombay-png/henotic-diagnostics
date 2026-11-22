import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  computeNginxCachePath,
  resolvePathsForContent,
  purgeNginxAndEdgeCache,
} from '@/lib/cache/nginx-purge';

describe('Nginx & Edge Cache Purge Helper', () => {
  const originalEnv = { ...process.env };
  let tempCacheDir: string;

  beforeEach(() => {
    tempCacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'henotic-nginx-cache-'));
    delete process.env.NGINX_INTERNAL_URL;
    delete process.env.CLOUDFLARE_ZONE_ID;
    delete process.env.CLOUDFLARE_API_TOKEN;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...originalEnv };
    fs.rmSync(tempCacheDir, { recursive: true, force: true });
  });

  it('computes standard Nginx levels=1:2 MD5 directory layout', () => {
    const cacheKey = 'httpsGETwww.henoticdiagnostics.com/services/mri-scan';
    const fullPath = computeNginxCachePath('/var/cache/nginx/henotic', cacheKey);
    const fileName = path.basename(fullPath);
    expect(fileName).toMatch(/^[0-9a-f]{32}$/);
    expect(fullPath).toBe(
      path.join('/var/cache/nginx/henotic', fileName.slice(-1), fileName.slice(-3, -1), fileName)
    );
  });

  it('resolves affected public URL paths across CMS content types', () => {
    expect(resolvePathsForContent('service', 'mri-scan')).toEqual(['/services/mri-scan']);
    expect(resolvePathsForContent('health-checkup-page', 'full-body-check-up')).toEqual([
      '/services/full-body-check-up',
    ]);
    expect(resolvePathsForContent('nipt-page', 'nipt-test')).toEqual(['/services/nipt-test']);
    expect(resolvePathsForContent('health-packages', '')).toEqual([
      '/services/health-checkup',
      '/services/full-body-check-up',
      '/services/master-health-checkup',
    ]);
    expect(resolvePathsForContent('nipt-tests', '')).toEqual([
      '/services/nipt-test',
      '/services/nips-test',
    ]);
    expect(resolvePathsForContent('post', 'mri-guide')).toEqual(['/blog/mri-guide', '/blog']);
    expect(resolvePathsForContent('page', '/about-us')).toEqual(['/about-us']);
    expect(resolvePathsForContent('condition', 'back-pain')).toEqual([
      '/conditions/back-pain',
      '/conditions',
    ]);
  });

  it('unlinks target Nginx cache files on disk while leaving unrelated entries intact', async () => {
    const targetFileHttps = computeNginxCachePath(
      tempCacheDir,
      'httpsGETwww.henoticdiagnostics.com/services/mri-scan'
    );
    const targetFileHttp = computeNginxCachePath(
      tempCacheDir,
      'httpGETwww.henoticdiagnostics.com/services/mri-scan'
    );
    const unrelatedFile = computeNginxCachePath(
      tempCacheDir,
      'httpsGETwww.henoticdiagnostics.com/services/ct-scan'
    );

    for (const file of [targetFileHttps, targetFileHttp, unrelatedFile]) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, 'cached-response');
    }

    const result = await purgeNginxAndEdgeCache(['/services/mri-scan/'], {
      cacheDir: tempCacheDir,
      siteUrl: 'https://www.henoticdiagnostics.com',
    });

    expect(result.nginxFilesDeleted).toBe(2);
    expect(fs.existsSync(targetFileHttps)).toBe(false);
    expect(fs.existsSync(targetFileHttp)).toBe(false);
    expect(fs.existsSync(unrelatedFile)).toBe(true);
  });

  it('removes all MD5 cache files when purgeAll is true', async () => {
    const fileA = computeNginxCachePath(tempCacheDir, 'httpsGETwww.henoticdiagnostics.com/services/mri-scan');
    const fileB = computeNginxCachePath(tempCacheDir, 'httpsGETwww.henoticdiagnostics.com/services/ct-scan');
    const nonCacheFile = path.join(tempCacheDir, 'readme.txt');

    for (const file of [fileA, fileB]) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, 'cached-response');
    }
    fs.writeFileSync(nonCacheFile, 'keep');

    const result = await purgeNginxAndEdgeCache([], { purgeAll: true, cacheDir: tempCacheDir });
    expect(result.nginxFilesDeleted).toBe(2);
    expect(fs.existsSync(fileA)).toBe(false);
    expect(fs.existsSync(fileB)).toBe(false);
    expect(fs.existsSync(nonCacheFile)).toBe(true);
  });

  it('calls Cloudflare purge_cache API with expected file list when configured', async () => {
    process.env.CLOUDFLARE_ZONE_ID = 'zone_123';
    process.env.CLOUDFLARE_API_TOKEN = 'cf_token_abc';

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );
    vi.stubGlobal('fetch', mockFetch);

    const result = await purgeNginxAndEdgeCache(['/services/mri-scan', '/blog/mri-guide'], {
      cacheDir: tempCacheDir,
      siteUrl: 'https://www.henoticdiagnostics.com',
    });

    expect(result.cloudflarePurged).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.cloudflare.com/client/v4/zones/zone_123/purge_cache'
    );
    const reqInit = mockFetch.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(reqInit.body))).toEqual({
      files: [
        'https://www.henoticdiagnostics.com/services/mri-scan',
        'https://www.henoticdiagnostics.com/blog/mri-guide',
      ],
    });
  });
});
