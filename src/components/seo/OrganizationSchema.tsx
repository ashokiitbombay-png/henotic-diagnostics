import React from 'react';

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.henoticdiagnostics.com/#organization",
    "name": "Henotic Diagnostics",
    "url": "https://www.henoticdiagnostics.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.henoticdiagnostics.com/icon-512.png",
      "width": 512,
      "height": 512
    },
    "description": "Henotic Diagnostics is a NABL-accredited medical diagnostic and imaging center in Kharghar, Navi Mumbai, offering 3.0T MRI, 128-slice CT, PET-CT, ultrasound, pathology, and cardiac diagnostics with same-day reports.",
    "foundingDate": "2012",
    "founder": {
      "@type": "Person",
      "name": "Dr. Ashok Kumar"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd",
      "addressLocality": "Kharghar, Panvel",
      "addressRegion": "Maharashtra",
      "postalCode": "410210",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8879327184",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9372853584",
        "contactType": "reservations"
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 19.0445195,
        "longitude": 73.0787376
      },
      "geoRadius": "50000"
    },
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "NABL Accredited Laboratory" },
      { "@type": "EducationalOccupationalCredential", "name": "AERB Accredited" },
      { "@type": "EducationalOccupationalCredential", "name": "PCPNDT Registered" },
      { "@type": "EducationalOccupationalCredential", "name": "ISO 9001:2015 Certified" }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
