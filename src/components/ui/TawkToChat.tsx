'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Widget — Henotic Diagnostics
 * Property: 6a492d5fb271bd1d477eafc0
 * Widget: 1jsmtig1n
 * Position: Bottom-RIGHT, stacked ABOVE WhatsApp + Call buttons
 *
 * Layout (right side):
 *   ┌─────────┐
 *   │  Tawk   │  ← yOffset pushes it above WhatsApp stack
 *   └─────────┘
 *       gap
 *   ┌─────────┐
 *   │  Call    │  ← 60px button
 *   └─────────┘
 *   ┌─────────┐
 *   │WhatsApp │  ← 60px button, bottom-6 desktop / bottom-[76px] mobile
 *   └─────────┘
 */
export default function TawkToChat() {
  const tawkId = process.env.NEXT_PUBLIC_TAWKTO_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID || '1jsmtig1n';

  useEffect(() => {
    if (!tawkId) {
      if (process.env.NODE_ENV === 'development') {
        console.info('ℹ️ [TawkToChat] NEXT_PUBLIC_TAWKTO_ID not set. Widget disabled.');
      }
      return;
    }

    // Prevent duplicate loading
    if ((window as any).__tawk_loaded) return;
    (window as any).__tawk_loaded = true;

    const Tawk_API: any = ((window as any).Tawk_API = (window as any).Tawk_API || {});
    (window as any).Tawk_LoadStart = new Date();

    // Position: bottom-RIGHT, above the WhatsApp + Call stack
    // Desktop: WhatsApp stack ends at ~156px from bottom → place Tawk at 170px
    // Mobile: WhatsApp stack ends at ~208px from bottom → place Tawk at 220px
    Tawk_API.customStyle = {
      visibility: {
        desktop: { position: 'br', xOffset: 20, yOffset: 170 },
        mobile:  { position: 'br', xOffset: 10, yOffset: 220 },
      },
    };

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://embed.tawk.to/${tawkId}/${widgetId}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    const s0 = document.getElementsByTagName('script')[0];
    s0?.parentNode?.insertBefore(s1, s0);
  }, []);

  return null;
}
