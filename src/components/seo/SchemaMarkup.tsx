import React from 'react';

interface SchemaMarkupProps {
  service?: string;
  location?: string;
}

export default function SchemaMarkup({ service, location }: SchemaMarkupProps) {
  if (!service || !location) {
    return null;
  }

  const medicalTestSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": `${service} in ${location}`,
    "offers": {
      "@type": "Offer",
      "price": "1500",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `https://www.henoticdiagnostics.com/services`,
      "seller": {
        "@type": "MedicalOrganization",
        "name": "Henotic Diagnostics"
      }
    },
    "provider": {
      "@id": "https://www.henoticdiagnostics.com/#clinic"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalTestSchema) }}
    />
  );
}