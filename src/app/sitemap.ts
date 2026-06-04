import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Uses the URL you defined in your .env.local file
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://henoticdiagnostics.com';

  // 1. Core Static Pages
  const staticRoutes = [
    '',
    '/about-us',
    '/contact',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Programmatic SEO Data (Expanded to match your previous components)
  const services = [
    "mri-scan", "ct-scan", "pet-scan", "ultrasound", "blood-test", 
    "full-body-check-up", "dexa-bone-scan", "2d-echo", "health-checkup", 
    "sonography", "spect-scan", "dtpa-scan", "tmt-test", "stress-test", 
    "holter-monitoring", "angiography", "angioplasty", "pregnancy-sonography", 
    "anomaly-scan", "nt-scan", "color-doppler", "liver-fibroscan", 
    "mammography", "nipt-test"
  ];

  // Intelligently mapping locations to their correct regions to avoid invalid URLs
  const regionData = [
    { 
      region: 'navi-mumbai', 
      locations: ['kharghar', 'panvel', 'vashi', 'nerul', 'seawoods', 'cbd-belapur', 'kamothe', 'kalamboli', 'taloja', 'ghansoli', 'kopar-khairane', 'airoli', 'turbhe', 'sanpada', 'juinagar'] 
    },
    { 
      region: 'south-mumbai', 
      locations: ['colaba', 'cuffe-parade', 'fort', 'churchgate', 'marine-lines', 'nariman-point', 'worli', 'parel', 'lower-parel', 'mahalaxmi', 'byculla', 'dadar', 'sion'] 
    },
    { 
      region: 'central-suburbs', 
      locations: ['kurla', 'chembur', 'ghatkopar', 'vikhroli', 'kanjurmarg', 'bhandup', 'mulund'] 
    },
    { 
      region: 'western-suburbs', 
      locations: ['bandra', 'khar', 'santacruz', 'vile-parle', 'andheri', 'jogeshwari', 'goregaon', 'malad', 'kandivali', 'borivali', 'dahisar'] 
    }
  ];

  // 3. Generate Dynamic Combinations (Service + Region + Location)
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  services.forEach((service) => {
    regionData.forEach(({ region, locations }) => {
      locations.forEach((location) => {
        dynamicRoutes.push({
          url: `${baseUrl}/services/${service}/${region}/${location}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        });
      });
    });
  });

  // Return the master array combining static and dynamic routes
  return [...staticRoutes, ...dynamicRoutes];
}