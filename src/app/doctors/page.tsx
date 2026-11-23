import React from 'react';
import { Metadata } from 'next';
import DoctorsDirectoryClient from '@/components/doctors/DoctorsDirectoryClient';
import { DOCTORS } from '@/config/doctors';

const BASE_URL = 'https://www.henoticdiagnostics.com';
const DOCTORS_URL = `${BASE_URL}/doctors`;

export const metadata: Metadata = {
  title: 'Senior Radiologists & Pathologists | Henotic Diagnostics',
  description:
    'Meet Henotic Diagnostics MD Radiologists, Pathologists & Fetal Medicine specialists serving Mumbai & Navi Mumbai with NABL-accredited same-day reports.',
  keywords:
    'Henotic Diagnostics doctors, MD radiologist Navi Mumbai, pathologist Kharghar, fetal medicine specialist Mumbai, NABL diagnostic team',
  alternates: {
    canonical: DOCTORS_URL,
  },
  openGraph: {
    title: 'Senior Radiologists & Pathologists | Henotic Diagnostics',
    description:
      'Fellowship-trained MD Radiologists, Pathologists, and Fetal Medicine specialists signing every report at Henotic Diagnostics.',
    url: DOCTORS_URL,
    type: 'website',
    siteName: 'Henotic Diagnostics',
    images: [
      {
        url: 'https://cdn.henoticdiagnostics.com/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp',
        width: 1200,
        height: 630,
        alt: 'Senior Medical Specialists at Henotic Diagnostics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Radiologists & Pathologists | Henotic Diagnostics',
    description:
      'Meet our NABL-accredited MD Radiologists & Pathologists in Navi Mumbai & Mumbai.',
    images: ['https://cdn.henoticdiagnostics.com/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp'],
  },
};

export default function DoctorsPage() {
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${DOCTORS_URL}#webpage`,
        url: DOCTORS_URL,
        name: 'Consultant Radiologists & Medical Specialists | Henotic Diagnostics',
        description:
          'Directory of MD Radiologists, Pathologists, Cardiologists, and Fetal Medicine specialists at Henotic Diagnostics.',
        publisher: { '@id': `${BASE_URL}/#organization` },
        breadcrumb: { '@id': `${DOCTORS_URL}#breadcrumb` },
        mainEntity: { '@id': `${DOCTORS_URL}#doctors-list` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${DOCTORS_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Doctors', item: DOCTORS_URL },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${DOCTORS_URL}#doctors-list`,
        name: 'Senior Medical Specialists at Henotic Diagnostics',
        numberOfItems: DOCTORS.length,
        itemListElement: DOCTORS.map((doc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Physician',
            '@id': `${BASE_URL}/doctors/${doc.id}#doctor`,
            name: doc.name,
            jobTitle: doc.designation,
            description: doc.credentials,
            url: `${BASE_URL}/doctors/${doc.id}`,
            worksFor: { '@id': `${BASE_URL}/#organization` },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph).replace(/</g, '\\u003c'),
        }}
      />
      <DoctorsDirectoryClient />
    </>
  );
}
