import { services } from '../../src/config/services';
import { REGION_LOCATIONS } from '../../src/config/locations';
import { CITIES } from '../../src/config/cities';
import { COMPARISONS } from '../../src/config/comparisons';
import { CONDITIONS } from '../../src/config/conditions';
import { DOCTORS } from '../../src/config/doctors';
import { SERVICE_CATEGORIES } from '../../src/config/categories';

export interface PseoTestUrl {
  url: string;
  category: 'static' | 'service' | 'category' | 'region' | 'location' | 'condition' | 'doctor' | 'compare' | 'city' | 'gmc';
}

/**
 * 🎲 Generate a statistical, representative sample of 500 diverse PSEO page URLs
 */
export function generatePseoTestSample(targetCount: number = 500): PseoTestUrl[] {
  const sample: PseoTestUrl[] = [];

  // 1. Static Core & Legal Pages (~17)
  const staticPaths = [
    '/', '/about-us', '/contact', '/services', '/doctors', '/conditions',
    '/blog', '/privacy', '/terms', '/cancellation-policy', '/delivery-policy',
    '/disclaimers', '/grievance-policy', '/medical-disclaimer', '/refund-returns',
    '/refund-policy', '/return-policy'
  ];
  staticPaths.forEach(p => sample.push({ url: p, category: 'static' }));

  // 2. Base Services (top 30 services)
  services.slice(0, 30).forEach(s => sample.push({ url: `/services/${s}`, category: 'service' }));

  // 3. Category Hubs (all 19 categories)
  SERVICE_CATEGORIES.forEach(c => sample.push({ url: `/services/category/${c.id}`, category: 'category' }));

  // 4. City Hubs (all 5 cities + directory)
  sample.push({ url: '/city', category: 'city' });
  CITIES.forEach(c => sample.push({ url: `/city/${c.slug}`, category: 'city' }));

  // 5. Comparisons (all 12 comparisons + directory)
  sample.push({ url: '/compare', category: 'compare' });
  COMPARISONS.forEach(c => sample.push({ url: `/compare/${c.slug}`, category: 'compare' }));

  // 6. Conditions (all 58 conditions)
  CONDITIONS.forEach(c => sample.push({ url: `/conditions/${c.id}`, category: 'condition' }));

  // 7. Doctors (all 11 doctors)
  DOCTORS.forEach(d => sample.push({ url: `/doctors/${d.id}`, category: 'doctor' }));

  // 8. GMC Products (13 products)
  const gmcSlugs = [
    'mri-brain-plain', 'ct-brain-plain', 'pet-ct-whole-body',
    'cbc-test', 'hba1c-test', 'crp-test', 'digital-mammography',
    'bmd-dexa-scan', 'nt-scan', 'anomaly-scan', 'abdomen-ultrasound',
    'fetal-2d-echo', '2d-echo-test'
  ];
  gmcSlugs.forEach(g => sample.push({ url: `/gmc/${g}`, category: 'gmc' }));

  // 9. Regional Hubs (~150 regional URLs)
  const topServices = services.slice(0, 20);
  const regions = Object.keys(REGION_LOCATIONS);

  topServices.forEach(s => {
    regions.forEach(r => {
      sample.push({ url: `/services/${s}/${r}`, category: 'region' });
    });
  });

  // 10. Hyper-local Location Pages (fill up remaining to reach 500)
  for (const s of topServices) {
    for (const [r, locs] of Object.entries(REGION_LOCATIONS)) {
      for (const loc of locs) {
        if (sample.length >= targetCount) break;
        sample.push({ url: `/services/${s}/${r}/${loc}`, category: 'location' });
      }
      if (sample.length >= targetCount) break;
    }
    if (sample.length >= targetCount) break;
  }

  return sample.slice(0, targetCount);
}
