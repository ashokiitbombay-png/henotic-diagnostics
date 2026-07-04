'use client';

import { useEffect } from 'react';

/**
 * Microsoft Clarity — Heatmaps & Session Recordings
 * Project ID: xh9b7w1rv6
 * Dashboard: https://clarity.microsoft.com
 */
export default function ClarityScript() {
  useEffect(() => {
    if ((window as any).clarity) return;

    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0];
      y?.parentNode?.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'xh9b7w1rv6');
  }, []);

  return null;
}
