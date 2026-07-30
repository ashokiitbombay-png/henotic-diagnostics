import { describe, it, expect } from 'vitest';
import { cn, optimizeWordPressHTML } from '../utils';

describe('cn (className merge)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('deduplicates tailwind classes', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});

describe('optimizeWordPressHTML', () => {
  it('returns empty string for falsy input', () => {
    expect(optimizeWordPressHTML('')).toBe('');
  });

  it('returns same HTML when no img tags', () => {
    const input = '<p>Hello world</p>';
    expect(optimizeWordPressHTML(input)).toBe(input);
  });

  it('adds width/height to images missing dimensions', () => {
    const input = '<img src="https://example.com/photo.webp" alt="Test">';
    const result = optimizeWordPressHTML(input);
    expect(result).toContain('width="800"');
    expect(result).toContain('height="450"');
  });

  it('adds decoding="async" to images', () => {
    const input = '<img src="https://example.com/photo.webp">';
    const result = optimizeWordPressHTML(input);
    expect(result).toContain('decoding="async"');
  });

  it('rewrites GCS bucket URLs to CDN path', () => {
    const input = '<img src="https://storage.googleapis.com/wp-media-henoticbucket/MRI/test.webp" alt="MRI">';
    const result = optimizeWordPressHTML(input);
    expect(result).toContain('/media-cdn/MRI/test.webp');
  });

  it('preserves existing width/height attributes', () => {
    const input = '<img src="https://example.com/photo.webp" width="400" height="300">';
    const result = optimizeWordPressHTML(input);
    expect(result).not.toContain('width="800"');
    expect(result).toContain('width="400"');
  });
});
