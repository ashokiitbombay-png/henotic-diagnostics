import { describe, it, expect } from 'vitest';
import { normalizeWordPressHtml } from '@/components/content/WordPressRenderer';

describe('normalizeWordPressHtml', () => {
  it('strips embedded JSON-LD script tags while preserving body HTML', () => {
    const input = `
      <p>Clinical summary</p>
      <script type="application/ld+json">{"@context":"https://schema.org"}</script>
      <p>More details</p>
    `;
    const result = normalizeWordPressHtml(input);
    expect(result).toContain('<p>Clinical summary</p>');
    expect(result).toContain('<p>More details</p>');
    expect(result).not.toContain('application/ld+json');
    expect(result).not.toContain('schema.org');
  });

  it('strips stray <title> and <meta> tags (including self-closing and OG tags)', () => {
    const input = `
      <title>Whole Transcriptome Sequencing | Henotic Diagnostics</title>
      <meta name="description" content="Book test online">
      <meta name="keywords" content="WTS, RNA" />
      <meta property="og:title" content="WTS" />
      <div class="wp-block"><p>Valid body content</p></div>
    `;
    const result = normalizeWordPressHtml(input);
    expect(result).not.toContain('<title');
    expect(result).not.toContain('</title>');
    expect(result).not.toContain('<meta');
    expect(result).toContain('<div class="wp-block"><p>Valid body content</p></div>');
  });

  it('rewrites valid root-relative service links to /services/<slug> without trailing slash', () => {
    const input = `
      <a href="/16s-rrna-sequencing/">16S rRNA</a>
      <a href="/2d-echo">2D Echo</a>
      <a href='/metagenomic-sequencing/?utm=1#faq'>Metagenomic</a>
      <a href="/MRI-Scan/">MRI Scan</a>
    `;
    const result = normalizeWordPressHtml(input);
    expect(result).toContain('href="/services/16s-rrna-sequencing"');
    expect(result).toContain('href="/services/2d-echo"');
    expect(result).toContain("href='/services/metagenomic-sequencing?utm=1#faq'");
    expect(result).toContain('href="/services/mri-scan"');
  });

  it('preserves non-service internal links, prefixed service links, and external URLs', () => {
    const input = `
      <a href="/services/mri-scan">Already Prefixed</a>
      <a href="/contact">Contact</a>
      <a href="/about-us/">About Us</a>
      <a href="/blog/test-post">Blog</a>
      <a href="/locations/kharghar-navi-mumbai">Kharghar</a>
      <a href="/unknown-not-a-service/">Unknown</a>
      <a href="https://maps.google.com/?cid=123">Maps</a>
      <a href="tel:08879327184">Call</a>
    `;
    const result = normalizeWordPressHtml(input);
    expect(result).toContain('href="/services/mri-scan"');
    expect(result).toContain('href="/contact"');
    expect(result).toContain('href="/about-us/"');
    expect(result).toContain('href="/blog/test-post"');
    expect(result).toContain('href="/locations/kharghar-navi-mumbai"');
    expect(result).toContain('href="/unknown-not-a-service/"');
    expect(result).toContain('href="https://maps.google.com/?cid=123"');
    expect(result).toContain('href="tel:08879327184"');
  });

  it('downgrades embedded WordPress <h1> tags to <h2> so pages keep a single hero <h1>', () => {
    const input = `
      <h1>CBC Test Overview</h1>
      <h1 class="wp-block-heading">Clinical Notes</h1>
      <p>Sample paragraph</p>
    `;
    const result = normalizeWordPressHtml(input);
    expect(result).not.toMatch(/<h1[\s>]/i);
    expect(result).not.toMatch(/<\/h1>/i);
    expect(result).toContain('<h2>CBC Test Overview</h2>');
    expect(result).toContain('<h2 class="wp-block-heading">Clinical Notes</h2>');
  });

  it('converts embedded <main> wrappers into <div> so layout.tsx keeps a single <main> landmark', () => {
    const result = normalizeWordPressHtml('<main class="wp-content"><p>Scan</p></main>');
    expect(result).toBe('<div class="wp-content"><p>Scan</p></div>');
    expect(result).not.toMatch(/<\/?main[\s>]/i);
  });
});
