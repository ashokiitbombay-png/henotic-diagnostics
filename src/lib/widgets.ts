import dynamic from 'next/dynamic';

export const registry: Record<string, React.ComponentType<any>> = {
  "hero-block": dynamic(() => import('@/components/blocks/HeroBlock'), { ssr: true }),
  "trust-badges": dynamic(() => import('@/components/blocks/TrustBadges'), { ssr: true }),
  "faq-accordion": dynamic(() => import('@/components/blocks/FAQAccordion'), { ssr: true }),
  "rate-cards": dynamic(() => import('@/components/blocks/RateCards'), { ssr: true }),
  "services-grid": dynamic(() => import('@/components/blocks/ServicesGrid'), { ssr: true }),
  "appointment-section": dynamic(() => import('@/components/blocks/AppointmentSection'), { ssr: true }),
};
