import React from 'react';

interface ProductSchemaProps {
  serviceName: string;
  serviceSlug: string;
  price?: number;
  marketPrice?: number;
  category?: string;
}

/**
 * 🛒 Product + Offer + AggregateRating Schema Markup (Server Component)
 * Generates Product JSON-LD compliant with Google Merchant Center healthcare guidelines.
 * Includes: AggregateRating, MerchantReturnPolicy, OfferShippingDetails
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
    description: `${serviceName} by Henotic Diagnostics — NABL & ISO accredited medical test kit & diagnostic report package in Navi Mumbai. Same-day digital reports included.`,
    brand: {
      '@type': 'Brand',
      name: 'Henotic Diagnostics',
    },
    ...(category && { category }),

    // Store Rating / Aggregate Rating
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '523',
      reviewCount: '489',
    },

    // Offer with eligible region
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      ...(price != null && { price: price.toString() }),
      ...(marketPrice != null && price != null && {
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: price.toString(),
          priceCurrency: 'INR',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: '1',
          },
        },
      }),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Henotic Diagnostics',
      },
      eligibleRegion: {
        '@type': 'Country',
        name: 'IN',
      },
      // Shipping details — free digital report delivery
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: '0',
            maxValue: '0',
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: '0',
            maxValue: '1',
            unitCode: 'DAY',
          },
        },
      },
      // Return/Refund policy
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        merchantReturnDays: '0',
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        refundType: 'https://schema.org/FullRefund',
        url: `${baseUrl}/refund-returns`,
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
