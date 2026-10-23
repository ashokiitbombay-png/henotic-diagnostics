import { describe, it, expect } from 'vitest';
import { getPricingForService, getSavingsAmount, SERVICE_PRICING } from '../pricing';

describe('Bone Health Pricing Configuration', () => {
  const boneSlugs = [
    'dexa-bone-scan',
    'bone-density-test',
    'bmd-test',
    'osteoporosis-screening',
  ];

  it('contains all 4 bone health slugs in SERVICE_PRICING', () => {
    for (const slug of boneSlugs) {
      const pricing = getPricingForService(slug);
      expect(pricing).toBeDefined();
      expect(pricing?.serviceSlug).toBe(slug);
    }
  });

  it('has Our Price ₹4,000, Market Avg ₹6,500, and 38% savings for all 4 bone health slugs', () => {
    for (const slug of boneSlugs) {
      const pricing = getPricingForService(slug);
      expect(pricing?.henoticPrice).toBe(4000);
      expect(pricing?.marketPrice).toBe(6500);
      expect(pricing?.savings).toBe(38);
      expect(pricing?.category).toBe('Bone Health');
      expect(pricing?.currency).toBe('INR');
      
      // Verify savings amount
      expect(getSavingsAmount(pricing!)).toBe(2500);

      // Verify mathematical savings calculation
      const calculatedSavings = Math.round(
        ((pricing!.marketPrice - pricing!.henoticPrice) / pricing!.marketPrice) * 100
      );
      expect(pricing?.savings).toBe(calculatedSavings);
    }
  });
});
