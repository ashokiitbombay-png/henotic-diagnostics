import { describe, it, expect } from 'vitest';
import { CACHE_TAGS } from '@/lib/cache/tags';

describe('Cache Tags Registry', () => {
  describe('Tag Format Consistency', () => {
    it('generates correct service tags', () => {
      expect(CACHE_TAGS.service('mri-scan')).toBe('wp:service:mri-scan');
      expect(CACHE_TAGS.service('ct-scan')).toBe('wp:service:ct-scan');
      expect(CACHE_TAGS.service('full-body-check-up')).toBe('wp:service:full-body-check-up');
    });

    it('generates correct post tags', () => {
      expect(CACHE_TAGS.post('understanding-mri')).toBe('wp:post:understanding-mri');
    });

    it('generates correct page tags', () => {
      expect(CACHE_TAGS.page('/about-us')).toBe('wp:page:/about-us');
      expect(CACHE_TAGS.page('/privacy')).toBe('wp:page:/privacy');
    });

    it('generates correct condition tags', () => {
      expect(CACHE_TAGS.condition('brain-tumor')).toBe('wp:condition:brain-tumor');
    });

    it('generates correct city tags', () => {
      expect(CACHE_TAGS.city('mumbai')).toBe('wp:city:mumbai');
    });

    it('has correct static tag values', () => {
      expect(CACHE_TAGS.servicesList).toBe('wp:services-list');
      expect(CACHE_TAGS.postsList).toBe('wp:posts-list');
      expect(CACHE_TAGS.conditionsList).toBe('wp:conditions-list');
      expect(CACHE_TAGS.siteConfig).toBe('wp:site-config');
    });
  });

  describe('Tag Uniqueness', () => {
    it('different content types produce different tag prefixes', () => {
      const slug = 'mri-scan';
      const serviceTag = CACHE_TAGS.service(slug);
      const postTag = CACHE_TAGS.post(slug);
      const conditionTag = CACHE_TAGS.condition(slug);

      // No collisions between content types for the same slug
      expect(serviceTag).not.toBe(postTag);
      expect(serviceTag).not.toBe(conditionTag);
      expect(postTag).not.toBe(conditionTag);
    });

    it('same slug produces identical tags (deterministic)', () => {
      expect(CACHE_TAGS.service('mri-scan')).toBe(CACHE_TAGS.service('mri-scan'));
      expect(CACHE_TAGS.post('test')).toBe(CACHE_TAGS.post('test'));
    });
  });

  describe('Tag-Webhook Alignment', () => {
    it('revalidation webhook would use matching tag format', () => {
      // Simulate what the webhook handler does
      const slug = 'mri-scan';
      const tagFromFetcher = CACHE_TAGS.service(slug);
      const tagFromWebhook = `wp:service:${slug}`;

      // These MUST match for cache invalidation to work
      expect(tagFromFetcher).toBe(tagFromWebhook);
    });

    it('all tags follow wp: prefix convention', () => {
      expect(CACHE_TAGS.service('x')).toMatch(/^wp:/);
      expect(CACHE_TAGS.post('x')).toMatch(/^wp:/);
      expect(CACHE_TAGS.page('/x')).toMatch(/^wp:/);
      expect(CACHE_TAGS.condition('x')).toMatch(/^wp:/);
      expect(CACHE_TAGS.city('x')).toMatch(/^wp:/);
      expect(CACHE_TAGS.servicesList).toMatch(/^wp:/);
      expect(CACHE_TAGS.postsList).toMatch(/^wp:/);
      expect(CACHE_TAGS.conditionsList).toMatch(/^wp:/);
      expect(CACHE_TAGS.siteConfig).toMatch(/^wp:/);
    });
  });
});
