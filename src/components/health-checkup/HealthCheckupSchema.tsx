import type { HealthCheckupPageData } from '@/config/health-checkup';

const BASE_URL = 'https://www.henoticdiagnostics.com';
const ORG_ID = `${BASE_URL}/#organization`;
const CLINIC_ID = `${BASE_URL}/#clinic`;

/** Serialise JSON-LD safely (prevents `</script>` breakouts from CMS content). */
function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Single consolidated JSON-LD @graph for a health checkup authority page.
 *
 * Replaces (for these 26 slugs only) the generic MedicalPseoSchema +
 * ServiceHero breadcrumb, which previously produced two BreadcrumbList
 * blocks. Entities reference the global Organization / DiagnosticLab
 * emitted by the root layout via @id instead of redefining them.
 *
 * Every value here mirrors visible on-page content (title, H1 image, FAQs,
 * prices) — structured data must never describe content users can't see.
 */
export default function HealthCheckupSchema({ data }: { data: HealthCheckupPageData }) {
  const { page, packages, trust } = data;
  const url = `${BASE_URL}/services/${page.slug}`;
  const reviewer = trust.doctors[0];

  const crumbs = [
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Services', item: `${BASE_URL}/services` },
    { name: 'Health Checkups', item: `${BASE_URL}/services/health-checkup` },
    ...(page.slug !== 'health-checkup' ? [{ name: page.keyword, item: url }] : []),
  ];

  const graph = [
    {
      '@type': 'MedicalWebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.metaTitle,
      headline: page.h1,
      description: page.metaDescription,
      inLanguage: 'en-IN',
      isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'Henotic Diagnostics' },
      publisher: { '@id': ORG_ID },
      primaryImageOfPage: { '@id': `${url}#primaryimage` },
      image: { '@id': `${url}#primaryimage` },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      about: { '@type': 'MedicalTest', name: page.keyword },
      keywords: [page.keyword, ...page.secondaryKeywords].join(', '),
      audience: { '@type': 'MedicalAudience', audienceType: 'Patient', geographicArea: { '@type': 'AdministrativeArea', name: 'Navi Mumbai, Maharashtra, India' } },
      specialty: 'https://schema.org/Pathology',
      lastReviewed: page.lastReviewed,
      ...(reviewer
        ? { reviewedBy: { '@type': 'Person', name: reviewer.name, jobTitle: 'Pathologist', description: reviewer.degrees, worksFor: { '@id': ORG_ID } } }
        : {}),
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hc-h1', '#quick-answer'] },
      mainEntity: { '@id': `${url}#packages` },
    },
    {
      '@type': 'ImageObject',
      '@id': `${url}#primaryimage`,
      url: page.primaryImage.url,
      contentUrl: page.primaryImage.url,
      width: page.primaryImage.width,
      height: page.primaryImage.height,
      caption: page.primaryImage.caption,
      description: page.primaryImage.alt,
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
    },
    {
      '@type': 'ItemList',
      '@id': `${url}#packages`,
      name: `${page.keyword} packages at Henotic Diagnostics`,
      numberOfItems: packages.length,
      itemListElement: packages.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          '@id': `${url}#package-${p.code.toLowerCase()}`,
          name: `${p.title} – ${p.totalTests} Tests`,
          description: `${p.subtitle}. Includes ${p.highlights.join(', ')}.`,
          sku: p.code,
          image: p.imageUrl,
          category: 'Health Checkup Package',
          brand: { '@id': ORG_ID },
          offers: {
            '@type': 'Offer',
            url: `${url}#package-${p.code.toLowerCase()}`,
            price: p.offerPrice,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            seller: { '@id': CLINIC_ID },
            priceSpecification: [
              { '@type': 'UnitPriceSpecification', price: p.offerPrice, priceCurrency: 'INR' },
              { '@type': 'UnitPriceSpecification', priceType: 'https://schema.org/ListPrice', price: p.mrp, priceCurrency: 'INR' },
            ],
          },
        },
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd({ '@context': 'https://schema.org', '@graph': graph }) }} />;
}
