'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Widget
 * Set NEXT_PUBLIC_TAWKTO_ID in .env.local to enable.
 * Get your ID from https://dashboard.tawk.to → Administration → Chat Widget
 */
export default function TawkToChat() {
  const tawkToId = process.env.NEXT_PUBLIC_TAWKTO_ID;

  useEffect(() => {
    if (!tawkToId) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${tawkToId}/default`;
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [tawkToId]);

  if (!tawkToId) return null;
  return null;
}
