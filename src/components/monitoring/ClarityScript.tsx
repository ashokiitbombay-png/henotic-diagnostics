'use client';

import { useEffect } from 'react';

/**
 * Microsoft Clarity Heatmaps & Session Recordings
 * Set NEXT_PUBLIC_CLARITY_ID in .env.local to enable.
 * Get your ID from https://clarity.microsoft.com → Settings → Setup
 */
export default function ClarityScript() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    if (!clarityId) return;

    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0];
      y?.parentNode?.insertBefore(t, y);
    })(window, document, 'clarity', 'script', clarityId);
  }, [clarityId]);

  if (!clarityId) return null;
  return null;
}
