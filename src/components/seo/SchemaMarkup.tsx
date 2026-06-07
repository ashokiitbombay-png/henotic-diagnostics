import React from 'react';

interface SchemaMarkupProps {
  service?: string;
  location?: string;
}

export default function SchemaMarkup({ service, location }: SchemaMarkupProps) {
  // --- 1. THE GLOBAL LOCAL BUSINESS SCHEMA ---
  const baseClinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Henotic Diagnostics",
    "image": "https://lh3.googleusercontent.com/p/AF1QipNNi77McpTFT3ksGjloBcqV3he235QDZfbaYiCv=w200-h200-p-k-no",
    "@id": "https://www.henoticdiagnostics.com/#medicalclinic",
    "url": "https://share.google/IcBtvtVjwozCBFMPp",
    "telephone": "08879327184",
    "priceRange": "500-15000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd",
      "addressLocality": "Sector 15, Kharghar, Panvel, Maharashtra",
      "postalCode": "410210",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0445195,
      "longitude": 73.0787376
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/henoticdiagnostics2019/",
      "https://x.com/henoticservices",
      "https://www.instagram.com/henoticdiagnostics2019/",
      "https://www.youtube.com/@HenoticDiagnostics",
      "https://www.linkedin.com/company/14610097/admin/page-posts/published/",
      "https://in.pinterest.com/henoticdiagnostics2019/",
      "https://github.com/ashokiitbombay-png/headless-henotics",
      "https://www.tumblr.com/henotichealthcare",
      "https://www.henoticdiagnostics.com/"
    ]
  };

  // --- 2. DYNAMIC ROUTING INTEGRATION ---
  // If the component is called from a programmatic page (e.g., /services/mri-scan/panvel), 
  // it injects BOTH the clinic schema AND the specific test schema as an array.
  const schemas = [baseClinicSchema];

  if (service && location) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "MedicalTest",
      "name": `${service} in ${location}`,
      "provider": {
        "@id": "https://www.henoticdiagnostics.com/#medicalclinic"
      }
    } as any);
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas) }}
    />
  );
}