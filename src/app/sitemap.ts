import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Enforcing strict canonical URL matching the layout.tsx metadataBase
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.henoticdiagnostics.com';

  // 1. Core Static Pages
  const staticRoutes = [
    '',
    '/about-us',
    '/contact',
    '/services',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Programmatic SEO Database
  const services = [
    "mri-scan", "ct-scan", "pet-scan", "ultrasound", "blood-test", 
    "full-body-check-up", "dexa-bone-scan", "2d-echo", "health-checkup", 
    "sonography", "spect-scan", "dtpa-scan", "tmt-test", "stress-test", 
    "holter-monitoring", "angiography", "angioplasty", "pregnancy-sonography", 
    "anomaly-scan", "nt-scan", "color-doppler", "liver-fibroscan", 
    "mammography", "nipt-test"
  ];

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

  // 3. Generate Dynamic Combinations (Pyramid Structure)
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  services.forEach((service) => {
    // A. Top Level Service Hubs (Priority: 0.9)
    dynamicRoutes.push({
      url: `${baseUrl}/services/${service}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    });

    regionData.forEach(({ region, locations }) => {
      // B. Mid Level Regional Hubs (Priority: 0.8)
      dynamicRoutes.push({
        url: `${baseUrl}/services/${service}/${region}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });

      // C. Deep Local Hubs (Priority: 0.6)
      locations.forEach((location) => {
        dynamicRoutes.push({
          url: `${baseUrl}/services/${service}/${region}/${location}`,
          lastModified: new Date().toISOString().split('T')[0],
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        });
      });
    });
  });

  // Return the master array combining static and dynamic routes
  return [...staticRoutes, ...dynamicRoutes];
}