'use client';

import { useEffect } from 'react';

/**
 * Meta (Facebook) Pixel for retargeting and conversion tracking.
 * Set NEXT_PUBLIC_FB_PIXEL_ID in .env.local to enable.
 * Get your Pixel ID from https://business.facebook.com → Events Manager
 */
export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) {
      if (process.env.NODE_ENV === 'development') {
        console.info('ℹ️ [MetaPixel] NEXT_PUBLIC_FB_PIXEL_ID not set. Tracking disabled.');
      }
      return;
    }
    if (typeof window === 'undefined') return;

    // Load Meta Pixel base code
    const f = window as any;
    if (f.fbq) return;

    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    f.fbq('init', pixelId);
    f.fbq('track', 'PageView');
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
