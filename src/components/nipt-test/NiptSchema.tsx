import type { NiptPageData } from '@/config/nipt-test';
import {
  NIPT_GOOGLE_MAPS_URL,
  NIPT_HERO_BANNER_IMAGE,
  NIPT_PHONE_DISPLAY,
  NIPT_SAMPLE_REPORT_PDF_URL,
} from '@/config/nipt-test';
import { formatSlug } from '@/lib/utils';

const BASE_URL = 'https://www.henoticdiagnostics.com';
const ORG_ID = `${BASE_URL}/#organization`;
const CLINIC_ID = `${BASE_URL}/#clinic`;

function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Single consolidated Schema.org JSON-LD @graph for NIPT Test Tier 1, Tier 2, and Tier 3 pages.
 * Emits: MedicalWebPage, ImageObject (primary + banner), BreadcrumbList, PathologyTest,
 * ItemList (3 NIPT Panels with Product + Offer + ListPrice), DigitalDocument (Sample PDF),
 * FAQPage, and localized areaServed / geo metadata when rendered for regions or micro-cities.
 */
export default function NiptSchema({ data }: { data: NiptPageData }) {
  const { routeSlug, page, panels, trust, locationContext } = data;
  const regionSlug = locationContext?.regionSlug;
  const locationSlug = locationContext?.locationSlug;
  const regionName = locationContext?.regionName || (regionSlug ? formatSlug(regionSlug) : undefined);
  const locationName = locationContext?.locationName || (locationSlug ? formatSlug(locationSlug) : undefined);

  const pageUrl = locationSlug && regionSlug
    ? `${BASE_URL}/services/${routeSlug}/${regionSlug}/${locationSlug}`
    : regionSlug
    ? `${BASE_URL}/services/${routeSlug}/${regionSlug}`
    : `${BASE_URL}/services/${routeSlug}`;

  const crumbs = [
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Services', item: `${BASE_URL}/services` },
    { name: formatSlug(routeSlug), item: `${BASE_URL}/services/${routeSlug}` },
  ];
  if (regionSlug && regionName) {
    crumbs.push({ name: regionName, item: `${BASE_URL}/services/${routeSlug}/${regionSlug}` });
  }
  if (regionSlug && locationSlug && locationName) {
    crumbs.push({ name: locationName, item: pageUrl });
  }

  const areaLabel = locationName && regionName
    ? `${locationName}, ${regionName}, Maharashtra, India`
    : regionName
    ? `${regionName}, Maharashtra, India`
    : 'Kharghar, Panvel, Navi Mumbai, Thane & Mumbai, Maharashtra, India';

  const doctors = trust.doctors;
  const minPrice = panels.length ? Math.min(...panels.map((p) => p.offerPrice)) : 10000;
  const maxPrice = panels.length ? Math.max(...panels.map((p) => p.offerPrice)) : 15000;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'MedicalWebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.metaTitle,
      headline: page.h1,
      description: page.metaDescription,
      inLanguage: 'en-IN',
      isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'Henotic Diagnostics' },
      publisher: { '@id': ORG_ID },
      primaryImageOfPage: { '@id': `${pageUrl}#primaryimage` },
      image: [{ '@id': `${pageUrl}#primaryimage` }, NIPT_HERO_BANNER_IMAGE],
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      about: { '@id': `${pageUrl}#medicaltest` },
      mainEntity: { '@id': `${pageUrl}#nipt-panels` },
      significantLink: NIPT_SAMPLE_REPORT_PDF_URL,
      hasPart: [{ '@id': `${pageUrl}#sample-nipt-report-pdf` }],
      keywords: [page.keyword, ...page.secondaryKeywords].join(', '),
      specialty: 'https://schema.org/Genetic',
      lastReviewed: page.lastReviewed,
      audience: {
        '@type': 'MedicalAudience',
        audienceType: 'Expectant Mothers & Obstetric Patients',
        geographicArea: { '@type': 'AdministrativeArea', name: areaLabel },
      },
      reviewedBy: doctors.map((d) => ({
        '@type': 'Person',
        name: d.name,
        jobTitle: d.degrees,
        identifier: d.registration,
        worksFor: { '@id': ORG_ID },
      })),
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#nipt-h1', '#quick-answer'] },
    },
    {
      '@type': 'ImageObject',
      '@id': `${pageUrl}#primaryimage`,
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
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
    {
      '@type': 'PathologyTest',
      '@id': `${pageUrl}#medicaltest`,
      name: locationName ? `${page.keyword} in ${locationName}` : regionName ? `${page.keyword} in ${regionName}` : page.keyword,
      alternateName: [
        'Non-Invasive Prenatal Testing',
        'NIPS (Non-Invasive Prenatal Screening)',
        'Cell-Free Fetal DNA Test',
        'cfDNA Maternal Blood Screening',
      ],
      description: page.metaDescription,
      url: pageUrl,
      image: page.primaryImage.url,
      bodyLocation: 'Maternal Peripheral Blood (Cell-Free Fetal DNA)',
      usesDevice: {
        '@type': 'MedicalDevice',
        name: 'Next-Generation Sequencing (NGS) & SNP-Based Cell-Free DNA Platform',
      },
      usedToDiagnose: [
        { '@type': 'MedicalCondition', name: 'Down Syndrome (Trisomy 21)' },
        { '@type': 'MedicalCondition', name: 'Edwards Syndrome (Trisomy 18)' },
        { '@type': 'MedicalCondition', name: 'Patau Syndrome (Trisomy 13)' },
        { '@type': 'MedicalCondition', name: 'Sex Chromosome Aneuploidies (Turner, Klinefelter, Triple X, Jacobs)' },
        { '@type': 'MedicalCondition', name: 'DiGeorge Syndrome (22q11.2 Microdeletion)' },
      ],
      relevantSpecialty: { '@type': 'MedicalSpecialty', name: 'Molecular Genetics & Prenatal Pathology' },
      recognizingAuthority: {
        '@type': 'Organization',
        name: 'National Accreditation Board for Testing and Calibration Laboratories (NABL)',
        url: 'https://nabl-india.org/',
      },
      provider: { '@id': CLINIC_ID },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#nipt-panels`,
      name: `${page.keyword} Panels at Henotic Diagnostics`,
      numberOfItems: panels.length,
      itemListElement: panels.map((panel, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          '@id': `${pageUrl}#panel-${panel.id}`,
          name: panel.title,
          description: `${panel.subtitle} Coverage: ${panel.totalTestsCount}. ${panel.tat}.`,
          sku: panel.code,
          image: panel.imageUrl,
          category: 'Prenatal Genetic Screening (NIPT)',
          brand: { '@id': ORG_ID },
          offers: {
            '@type': 'Offer',
            url: `${pageUrl}#nipt-panels`,
            price: panel.offerPrice,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2027-12-31',
            seller: { '@id': CLINIC_ID },
            priceSpecification: [
              { '@type': 'UnitPriceSpecification', price: panel.offerPrice, priceCurrency: 'INR' },
              {
                '@type': 'UnitPriceSpecification',
                priceType: 'https://schema.org/ListPrice',
                price: panel.mrp,
                priceCurrency: 'INR',
              },
            ],
          },
        },
      })),
    },
    {
      '@type': 'DigitalDocument',
      '@id': `${pageUrl}#sample-nipt-report-pdf`,
      name: 'Sample NIPT Medical Report PDF – Non-Invasive Prenatal Testing',
      description:
        'Official sample NIPT prenatal cell-free DNA (cfDNA) screening report from Henotic Diagnostics (Sector 15, Kharghar, Navi Mumbai) showing Fetal Fraction %, Low Risk and High Risk chromosomal interpretation for Trisomy 21, 18, and 13, and MD Molecular Genetics specialist verification.',
      url: NIPT_SAMPLE_REPORT_PDF_URL,
      encodingFormat: 'application/pdf',
      inLanguage: 'en-IN',
      publisher: { '@id': ORG_ID },
      about: { '@id': `${pageUrl}#medicaltest` },
      spatialCoverage: { '@type': 'Place', name: areaLabel },
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  // Emit localized MedicalClinic entity node for hyper-local Tier 3 micro-city pages
  if (locationName && regionName) {
    graph.push({
      '@type': 'MedicalClinic',
      '@id': `${pageUrl}#local-service-clinic`,
      name: `Henotic Diagnostics – ${page.keyword} in ${locationName}`,
      parentOrganization: { '@id': CLINIC_ID },
      url: pageUrl,
      hasMap: NIPT_GOOGLE_MAPS_URL,
      telephone: NIPT_PHONE_DISPLAY,
      priceRange: `₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}`,
      areaServed: {
        '@type': 'Place',
        name: `${locationName}, ${regionName}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: locationName,
          addressRegion: regionName,
          postalCode: locationContext?.pincode || '410210',
          addressCountry: 'IN',
        },
        ...(locationContext?.latitude && locationContext?.longitude
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: locationContext.latitude,
                longitude: locationContext.longitude,
              },
            }
          : {}),
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(trust.googleRating.rating),
        reviewCount: String(trust.googleRating.reviewCount),
        bestRating: '5',
      },
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
