import React from 'react';
import { HEALTH_PACKAGES } from '@/config/health-packages';

interface HealthPackagesSchemaProps {
  serviceSlug: string;
  heading: string;
  regionName?: string;
  locationName?: string;
}

export default function HealthPackagesSchema({
  serviceSlug,
  heading,
  regionName,
  locationName,
}: HealthPackagesSchemaProps) {
  const pageUrl = [
    'https://www.henoticdiagnostics.com/services',
    serviceSlug,
    regionName,
    locationName,
  ].filter(Boolean).join('/');

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: heading,
    url: pageUrl,
    numberOfItems: HEALTH_PACKAGES.length,
    itemListElement: HEALTH_PACKAGES.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: pkg.title,
        description: `${pkg.subtitle} — ${pkg.totalTests} tests included. ${pkg.highlights.join(', ')}.`,
        image: pkg.imageUrl,
        sku: pkg.code,
        offers: {
          '@type': 'Offer',
          price: pkg.offerPrice,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: pageUrl,
          priceValidUntil: '2027-12-31',
          seller: {
            '@type': 'DiagnosticLab',
            name: 'Henotic Diagnostics',
            telephone: '+918879327184',
            url: 'https://www.henoticdiagnostics.com',
          },
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
