export const seoConfig = {
  defaultTitle: "Henotic Diagnostics | Premier Diagnostic Center",
  titleTemplate: "%s | Henotic Diagnostics",
  defaultDescription: "Mumbai & Navi Mumbai's premier diagnostic center featuring advanced 3.0T MRI, low-dose CT, and automated pathology. NABH Accredited.",
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.henoticdiagnostics.com',
    siteName: 'Henotic Diagnostics',
    images: [
      {
        url: 'https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp',
        width: 1200,
        height: 630,
        alt: 'Henotic Diagnostics Premier Facility',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henotic Diagnostics',
    description: "Advanced diagnostic imaging and pathology in Mumbai.",
    images: ['https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp'],
  }
};
