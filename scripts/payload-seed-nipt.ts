/**
 * Seed / sync Payload CMS with the NIPT Test authority content.
 *
 * Upserts:
 *   - 3 NIPT panels       -> collection `nipt-panels` (matched by `code`)
 *   - 20 NIPT pages       -> collection `nipt-pages`  (matched by `slug`)
 *   - NIPT trust content  -> global `nipt-trust`
 *
 * SAFE BY DEFAULT: runs as a dry run and only prints the planned operations.
 * Pass `--apply` to write to Payload.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/payload-seed-nipt.ts          # dry run
 *   npx tsx --env-file=.env.local scripts/payload-seed-nipt.ts --apply  # write
 */
import {
  STATIC_NIPT_PAGES,
  STATIC_NIPT_PANELS,
  STATIC_NIPT_TRUST_CONTENT,
} from '../src/config/nipt-test';

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
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${await res.text()}`);
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

  console.log('\n▸ nipt-panels');
  const idByCode = new Map<string, string>();
  for (const [i, p] of STATIC_NIPT_PANELS.entries()) {
    const id = await upsert('nipt-panels', 'code', p.code, {
      code: p.code,
      badgeNumber: p.badgeNumber,
      topPillLabel: p.topPillLabel,
      title: p.title,
      subtitle: p.subtitle,
      shortTag: p.shortTag,
      tags: rows(p.tags),
      testsCountNumber: p.testsCountNumber,
      testsCountUnit: p.testsCountUnit,
      totalTestsLabel: p.totalTestsLabel,
      totalTestsCount: p.totalTestsCount,
      tat: p.tat,
      sampleType: p.sampleType,
      gestation: p.gestation,
      ribbonText: p.ribbonText,
      colHeaders: rows(p.colHeaders),
      pricing: { mrp: p.mrp, sellingPrice: p.offerPrice, currency: 'INR' },
      discountLabel: p.discountBadge,
      imageUrl: p.imageUrl,
      imageAlt: p.imageAlt,
      imageWidth: p.imageWidth,
      imageHeight: p.imageHeight,
      theme: p.archTheme,
      popular: p.popular,
      parameters: p.parameters,
      sortOrder: (i + 1) * 10,
      isActive: true,
    });
    if (id) idByCode.set(p.code, id);
  }

  console.log('\n▸ nipt-pages');
  for (const page of STATIC_NIPT_PAGES) {
    await upsert('nipt-pages', 'slug', page.slug, {
      slug: page.slug,
      keyword: page.keyword,
      secondaryKeywords: rows(page.secondaryKeywords),
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      eyebrow: page.eyebrow,
      h1: page.h1,
      heroSubtitle: page.heroSubtitle,
      intro: page.intro,
      quickAnswer: page.quickAnswer,
      primaryImage: { ...page.primaryImage },
      featuredPanels: page.featuredPanelCodes.map((c) => idByCode.get(c)).filter(Boolean),
      whoShouldBook: rows(page.whoShouldBook),
      sections: page.sections,
      faqs: page.faqs,
      relatedSlugs: rows(page.relatedSlugs),
      lastReviewed: page.lastReviewed,
      isActive: true,
    });
  }

  console.log('\n▸ global nipt-trust');
  const t = STATIC_NIPT_TRUST_CONTENT;
  const trustDoc = {
    googleRating: t.googleRating,
    infrastructure: t.infrastructure.map(({ image, ...rest }) => ({ ...rest, imageUrl: image })),
    doctors: t.doctors.map(({ image, focus, ...rest }) => ({ ...rest, focus: rows(focus), imageUrl: image })),
    certificates: t.certificates.map(({ id, logo, certImage, ...rest }) => ({ ...rest, certId: id, logoUrl: logo, certImageUrl: certImage })),
    awards: t.awards.map(({ id, image, ...rest }) => ({ ...rest, awardId: id, imageUrl: image })),
    testimonials: t.testimonials.map(({ id: _id, image, ...rest }) => ({ ...rest, imageUrl: image })),
  };
  if (APPLY) {
    await api('POST', '/api/globals/nipt-trust', trustDoc);
    console.log('  ✔ updated global nipt-trust');
  } else {
    console.log('  [dry-run] POST /api/globals/nipt-trust');
  }

  console.log(`\nDone. ${APPLY ? '' : 'Re-run with --apply to write changes.'}`);
}

main().catch((err) => {
  console.error('✖ Seed failed:', err);
  process.exit(1);
});
