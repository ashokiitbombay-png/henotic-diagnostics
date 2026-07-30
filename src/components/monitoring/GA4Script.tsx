'use client';

import { useEffect } from 'react';

/**
 * Google Analytics 4 (GA4) — Direct integration
 * 
 * NOTE: If you're already using GTM (GTM-WKF28JPK), GA4 can be configured
 * inside GTM instead. Use this component ONLY if you want standalone GA4
 * without GTM dependency.
 * 
 * Set NEXT_PUBLIC_GA4_ID in your .env.local file:
 * NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
 */
export default function GA4Script() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    if (!measurementId) return;
    // Skip GA4 if GTM is configured to avoid duplicate tracking
    if (gtmId) return;
    if ((window as any).gtag) return;

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      send_page_view: true,
    });
  }, [measurementId]);

  return null;
}
