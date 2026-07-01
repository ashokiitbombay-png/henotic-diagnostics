import React from 'react';

interface ProductSchemaProps {
  serviceName: string;
  serviceSlug: string;
  price?: number;
  marketPrice?: number;
  category?: string;
}

/**
 * 🛒 Product + Offer Schema Markup (Server Component)
 * Generates Product JSON-LD with Offer for Google Merchant Center rich results
 */
export default function ProductSchema({
  serviceName,
  serviceSlug,
  price,
  marketPrice,
  category,
}: ProductSchemaProps) {
  const baseUrl = 'https://www.henoticdiagnostics.com';
  const url = `${baseUrl}/services/${serviceSlug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: serviceName,
    description: `${serviceName} at Henotic Diagnostics — NABL & ISO accredited diagnostic center in Navi Mumbai`,
    brand: {
      '@type': 'Brand',
      name: 'Henotic Diagnostics',
    },
    ...(category && { category }),
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      ...(price != null && { price: price.toString() }),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Henotic Diagnostics',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
