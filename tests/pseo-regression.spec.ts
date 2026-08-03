import { test, expect } from '@playwright/test';
import { generatePseoTestSample, PseoTestUrl } from './helpers/sample-generator';

const TEST_SAMPLES: PseoTestUrl[] = generatePseoTestSample(500);

test.describe('🛡️ PSEO Regression & Link Audit (500 Page Sample)', () => {
  // Batch URLs into test suites for high parallelism across workers
  TEST_SAMPLES.forEach((target, index) => {
    test(`[#${index + 1}] Audit ${target.category.toUpperCase()}: ${target.url}`, async ({ page }) => {
      const pageErrors: Error[] = [];
      const consoleErrors: string[] = [];

      // 1. Listen for uncaught JavaScript page exceptions & console errors
      page.on('pageerror', (exception) => {
        pageErrors.push(exception);
      });

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Filter out benign third-party network warnings if any
          if (!text.includes('favicon.ico') && !text.includes('Google Analytics')) {
            consoleErrors.push(text);
          }
        }
      });

      // 2. Navigate to target URL
      const response = await page.goto(target.url, { waitUntil: 'domcontentloaded' });

      // 3. HTTP 200 OK & Status Check
      expect(response, `Failed to load page: ${target.url}`).not.toBeNull();
      expect(response?.status(), `Page ${target.url} returned status ${response?.status()}`).toBe(200);

      // 4. React Hydration Failure Check
      const hydrationErrors = pageErrors.filter(err =>
        err.message.includes('Hydration') ||
        err.message.includes('Text content does not match') ||
        err.message.includes('Minified React error')
      );
      expect(hydrationErrors, `Hydration error detected on ${target.url}: ${hydrationErrors[0]?.message}`).toHaveLength(0);

      // 5. Canonical Tag Check
      const canonicalTag = await page.$('link[rel="canonical"]');
      expect(canonicalTag, `Missing <link rel="canonical"> tag on ${target.url}`).not.toBeNull();

      if (canonicalTag) {
        const canonicalHref = await canonicalTag.getAttribute('href');
        expect(canonicalHref, `Empty canonical href on ${target.url}`).toBeTruthy();
        expect(canonicalHref?.startsWith('https://'), `Invalid canonical protocol on ${target.url}`).toBe(true);
      }

      // 6. JSON-LD Schema Verification
      const jsonLdScript = await page.$('script[type="application/ld+json"]');
      expect(jsonLdScript, `Missing JSON-LD schema on ${target.url}`).not.toBeNull();

      // 7. Internal Link Integrity Check
      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => a.getAttribute('href')).filter(Boolean) as string[]
      );

      const brokenLinks = links.filter(href => href === '#' || href === 'undefined' || href === 'null');
      expect(brokenLinks, `Page ${target.url} contains ${brokenLinks.length} broken links`).toHaveLength(0);
    });
  });
});
