import React from 'react';

interface ServiceSchemaProps {
  serviceName: string;
  serviceSlug: string;
  locationName?: string;
  regionName?: string;
  description?: string;
  price?: number;
  ratingValue?: string;
  reviewCount?: string;
}

/**
 * 🤖 Enhanced Medical Service Schema Markup
 * Generates MedicalTest + LocalBusiness + AggregateRating JSON-LD
 */
export default function ServiceSchema({
  serviceName,
  serviceSlug,
  locationName,
  regionName,
  description,
  price,
  ratingValue = "4.9",
  reviewCount = "1030"
}: ServiceSchemaProps) {
  const baseUrl = 'https://www.henoticdiagnostics.com';
  const url = locationName && regionName
    ? `${baseUrl}/services/${serviceSlug}/${regionName}/${locationName}`
    : regionName
      ? `${baseUrl}/services/${serviceSlug}/${regionName}`
      : `${baseUrl}/services/${serviceSlug}`;

  const schemas: object[] = [];

  // 1. MedicalTest Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": serviceName,
    "description": description || `${serviceName} diagnostic service at Henotic Diagnostics. NABL accredited with same-day reports.`,
    "url": url,
    "medicalSpecialty": "Radiology",
    "usesDevice": {
      "@type": "MedicalDevice",
      "name": serviceName.includes("MRI") ? "3.0 Tesla MRI Scanner" :
              serviceName.includes("CT") ? "128-Slice CT Scanner" :
              serviceName.includes("PET") ? "Digital PET-CT Scanner" :
              "Advanced Diagnostic Equipment"
    },
    "availableIn": {
      "@type": "MedicalClinic",
      "name": "Henotic Diagnostics",
      "url": baseUrl,
      "telephone": "+91-8879327184",
      "medicalSpecialty": "Diagnostic Radiology"
    },
    "offers": {
      "@type": "Offer",
      "name": serviceName,
      "price": price || 1500,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": url,
      "seller": {
        "@type": "MedicalOrganization",
        "name": "Henotic Diagnostics"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": "5"
    }
  });

  // 2. LocalBusiness Schema (per location)
  if (locationName && regionName) {
    const formatName = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    schemas.push({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": `Henotic Diagnostics - ${formatName(locationName)}`,
      "description": `${serviceName} center in ${formatName(locationName)}, ${formatName(regionName)}. NABL & ISO certified.`,
      "url": url,
      "telephone": "+91-8879327184",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": formatName(locationName),
        "addressRegion": formatName(regionName),
        "addressCountry": "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "reviewCount": reviewCount,
        "bestRating": "5"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "₹₹"
    });
  }

  // 3. Offer Schema (if price available)
  if (price) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": serviceName,
      "price": price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": url,
      "seller": {
        "@type": "MedicalOrganization",
        "name": "Henotic Diagnostics"
      }
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
