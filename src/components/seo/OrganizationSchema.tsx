import React from 'react';

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.henoticdiagnostics.com/#organization",
    "name": "Henotic Diagnostics",
    "alternateName": [
      "Henotic Diagnostics Centre",
      "Henotic Diagnostic Center Kharghar"
    ],
    "url": "https://www.henoticdiagnostics.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.henoticdiagnostics.com/icon-512.png",
      "width": 512,
      "height": 512
    },
    "description": "Henotic Diagnostics is a NABL-accredited medical diagnostic and imaging center in Kharghar, Navi Mumbai, offering advanced 3.0T MRI, 128-slice CT, PET-CT, ultrasound, pathology, and cardiac diagnostics with same-day reports.",
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
    "sameAs": [
      "https://www.facebook.com/henoticdiagnostics2019/",
      "https://www.instagram.com/henoticdiagnostics2019/",
      "https://x.com/henoticservices",
      "https://www.youtube.com/@HenoticDiagnostics",
      "https://www.linkedin.com/company/14610097/",
      "https://in.pinterest.com/henoticdiagnostics2019/",
      "https://maps.app.goo.gl/w5sBPF89Pf4nYQW97"
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
    "knowsAbout": [
      "MRI Scan",
      "CT Scan",
      "PET-CT Scan",
      "Ultrasound",
      "Blood Tests",
      "Full Body Checkup",
      "Mammography",
      "DEXA Bone Scan",
      "2D Echo",
      "ECG",
      "Pathology",
      "Cardiac Diagnostics"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Accreditation",
        "name": "NABL Accredited Laboratory",
        "recognizedBy": {
          "@type": "Organization",
          "name": "National Accreditation Board for Testing and Calibration Laboratories"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "name": "AERB Accredited",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Atomic Energy Regulatory Board"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Registration",
        "name": "PCPNDT Registered"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "name": "ISO Certified Facility"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
