'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Widget — Henotic Diagnostics
 * Property: 6a492d5fb271bd1d477eafc0
 * Widget: 1jsmtig1n
 * Position: Bottom-LEFT (WhatsApp + Call are bottom-right)
 */
export default function TawkToChat() {
  useEffect(() => {
    // Prevent duplicate loading
    if ((window as any).__tawk_loaded) return;
    (window as any).__tawk_loaded = true;

    const Tawk_API: any = ((window as any).Tawk_API = (window as any).Tawk_API || {});
    (window as any).Tawk_LoadStart = new Date();

    // Position widget on the LEFT side to avoid overlap with WhatsApp/Call (right side)
    Tawk_API.customStyle = {
      visibility: {
        desktop: { position: 'bl', xOffset: 20, yOffset: 20 },   // bottom-left
        mobile:  { position: 'bl', xOffset: 10, yOffset: 70 },   // above StickyMobileCTA
      },
    };

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6a492d5fb271bd1d477eafc0/1jsmtig1n';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    const s0 = document.getElementsByTagName('script')[0];
    s0?.parentNode?.insertBefore(s1, s0);
  }, []);

  return null;
}
