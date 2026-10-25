/**
 * Seed / sync Payload CMS with the health checkup authority content.
 *
 * Upserts:
 *   - 17 packages        → collection `health-packages`      (matched by `code`)
 *   - 26 authority pages → collection `health-checkup-pages` (matched by `slug`)
 *   - trust content      → global `health-checkup-trust`
 *
 * SAFE BY DEFAULT: runs as a dry run and only prints the planned operations.
 * Pass `--apply` to write to Payload. Existing documents are updated
 * (PATCH) — never deleted.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/payload-seed-health-checkups.ts            # dry run
 *   npx tsx --env-file=.env.local scripts/payload-seed-health-checkups.ts --apply    # write
 *
 * Requires: PAYLOAD_CMS_URL and PAYLOAD_API_KEY (same auth as src/lib/payload/client.ts).
 */
import {
  STATIC_HEALTH_CHECKUP_PAGES,
  STATIC_HEALTH_PACKAGES,
  STATIC_TRUST_CONTENT,
} from '../src/config/health-checkup';

const APPLY = process.argv.includes('--apply');
const BASE = process.env.PAYLOAD_CMS_URL?.replace(/\/+$/, '');
const API_KEY = process.env.PAYLOAD_API_KEY;

if (!BASE) {
  console.error('✖ PAYLOAD_CMS_URL is not set. Aborting.');
  process.exit(1);
}

const headers: Record<string, string> = { 'Content-Type': 'application/json' };
if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;

const rows = (items: string[]) => items.map((text) => ({ text }));

async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  return (await res.json()) as T;
}

async function findOne(collection: string, field: string, value: string): Promise<{ id: string } | null> {
  const where = encodeURIComponent(JSON.stringify({ [field]: { equals: value } }));
  const out = await api<{ docs: Array<{ id: string }> }>('GET', `/api/${collection}?where=${where}&limit=1&depth=0`);
  return out.docs[0] ?? null;
}

async function upsert(collection: string, field: string, value: string, data: Record<string, unknown>): Promise<string | null> {
  const existing = await findOne(collection, field, value);
  if (!APPLY) {
    console.log(`  [dry-run] ${existing ? 'PATCH' : 'POST '} ${collection} ${field}=${value}`);
    return existing?.id ?? null;
  }
  if (existing) {
    await api('PATCH', `/api/${collection}/${existing.id}`, data);
    console.log(`  ✔ updated ${collection} ${field}=${value}`);
    return existing.id;
  }
  const created = await api<{ doc: { id: string } }>('POST', `/api/${collection}`, data);
  console.log(`  ✔ created ${collection} ${field}=${value}`);
  return created.doc.id;
}

async function main() {
  console.log(`Payload: ${BASE}  mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

  console.log('\n▸ health-packages');
  const idByCode = new Map<string, string>();
  for (const [i, p] of STATIC_HEALTH_PACKAGES.entries()) {
    const id = await upsert('health-packages', 'code', p.code, {
      code: p.code,
      title: p.title,
      subtitle: p.subtitle,
      target: p.target,
      totalTests: p.totalTests,
      pricing: { mrp: p.mrp, sellingPrice: p.offerPrice, currency: 'INR' },
      discountLabel: p.discount,
      imageUrl: p.imageUrl,
      imageWidth: p.imageWidth,
      imageHeight: p.imageHeight,
      theme: p.archTheme,
      popular: p.popular,
      fastingRequired: p.fastingRequired,
      highlights: rows(p.highlights),
      notes: rows(p.notes),
      categories: p.categories.map((c) => ({ name: c.name, count: c.count, tests: rows(c.tests) })),
      sortOrder: (i + 1) * 10,
      isActive: true,
    });
    if (id) idByCode.set(p.code, id);
  }

  console.log('\n▸ health-checkup-pages');
  for (const page of STATIC_HEALTH_CHECKUP_PAGES) {
    await upsert('health-checkup-pages', 'slug', page.slug, {
      slug: page.slug,
      keyword: page.keyword,
      secondaryKeywords: rows(page.secondaryKeywords),
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      eyebrow: page.eyebrow,
      h1: page.h1,
      intro: page.intro,
      quickAnswer: page.quickAnswer,
      primaryImage: { ...page.primaryImage },
      defaultFilter: page.defaultFilter,
      featuredPackages: page.featuredPackageCodes.map((c) => idByCode.get(c)).filter(Boolean),
      whoShouldBook: rows(page.whoShouldBook),
      sections: page.sections,
      preparation: rows(page.preparation),
      faqs: page.faqs,
      relatedSlugs: rows(page.relatedSlugs),
      lastReviewed: page.lastReviewed,
      isActive: true,
    });
  }

  console.log('\n▸ global health-checkup-trust');
  const t = STATIC_TRUST_CONTENT;
  const trustDoc = {
    googleRating: t.googleRating,
    infrastructure: t.infrastructure.map(({ image, ...rest }) => ({ ...rest, imageUrl: image })),
    doctors: t.doctors.map(({ image, focus, ...rest }) => ({ ...rest, focus: rows(focus), imageUrl: image })),
    certificates: t.certificates.map(({ id, logo, certImage, ...rest }) => ({ ...rest, certId: id, logoUrl: logo, certImageUrl: certImage })),
    awards: t.awards.map(({ id, image, ...rest }) => ({ ...rest, awardId: id, imageUrl: image })),
    testimonials: t.testimonials.map(({ id: _id, image, ...rest }) => ({ ...rest, imageUrl: image })),
  };
  if (APPLY) {
    await api('POST', '/api/globals/health-checkup-trust', trustDoc);
    console.log('  ✔ updated global health-checkup-trust');
  } else {
    console.log('  [dry-run] POST /api/globals/health-checkup-trust');
  }

  console.log(`\nDone. ${APPLY ? '' : 'Re-run with --apply to write changes.'}`);
}

main().catch((err) => {
  console.error('✖ Seed failed:', err);
  process.exit(1);
});
