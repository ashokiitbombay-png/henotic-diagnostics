import React from 'react';
import ShortcodeParser from './ShortcodeParser';
import BlockRenderer from './BlockRenderer';
import { isValidServiceSlug } from '@/lib/seo/slug-validator';

interface WordPressRendererProps {
  content: string | any[];
  context?: Record<string, any>;
}

/**
 * Normalizes WordPress HTML body content before rendering:
 * 1. Strips embedded JSON-LD scripts (handled by Next.js schema components).
 * 2. Strips stray <title> and <meta> tags accidentally embedded in WP body blocks.
 * 3. Downgrades embedded <h1> headings to <h2> so ServiceHero retains the sole page <h1>.
 * 4. Converts embedded <main> containers to <div> so layout.tsx retains the sole <main id="main-content"> landmark.
 * 5. Rewrites root-relative service links (/<valid-service-slug>/) to /services/<slug>.
 */
export function normalizeWordPressHtml(html: string): string {
  return html
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<h1(\b[^>]*)>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>')
    .replace(/<main(\b[^>]*)>/gi, '<div$1>')
    .replace(/<\/main>/gi, '</div>')
    .replace(
      /href=(["'])\/([a-z0-9-]+)\/?([?#][^"']*)?\1/gi,
      (fullMatch: string, quote: string, slug: string, suffix?: string) => {
        const normalizedSlug = slug.toLowerCase();
        if (isValidServiceSlug(normalizedSlug)) {
          return `href=${quote}/services/${normalizedSlug}${suffix || ''}${quote}`;
        }
        return fullMatch;
      }
    );
}

export default function WordPressRenderer({ content, context }: WordPressRendererProps) {
  if (!content) return null;

  if (typeof content === 'string') {
    const sanitized = normalizeWordPressHtml(content);
    return <ShortcodeParser html={sanitized} context={context} />;
  }

  if (Array.isArray(content)) {
    return <BlockRenderer blocks={content} context={context} />;
  }

  return null;
}
