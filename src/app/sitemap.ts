import { MetadataRoute } from 'next';
import { services, locations } from '@/lib/constants'; // Import your arrays here

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate URLs programmatically for Google
  services.forEach((service) => {
    locations.forEach((loc) => {
       sitemapEntries.push({
         url: `${baseUrl}/services/${service}/${loc.region}/${loc.city}`,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 0.8,
       });
    });
  });

  return sitemapEntries;
}
