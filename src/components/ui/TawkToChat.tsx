'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Widget — Henotic Diagnostics
 * Property: 6a492d5fb271bd1d477eafc0
 * Widget: 1jsmtig1n
 */
export default function TawkToChat() {
  useEffect(() => {
    // Prevent duplicate loading
    if ((window as any).Tawk_API) return;

    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();

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
