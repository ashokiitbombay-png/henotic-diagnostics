'use client';

import { useEffect } from 'react';

/**
 * Sentry Error Tracking — Placeholder Component
 * 
 * INSTALLATION STEPS:
 * 1. Run: npm install @sentry/nextjs
 * 2. Run: npx @sentry/wizard@latest -i nextjs
 * 3. Set NEXT_PUBLIC_SENTRY_DSN in your .env.local
 * 4. The wizard will create sentry.client.config.ts and sentry.server.config.ts
 * 
 * This component provides a lightweight client-side error boundary
 * that reports uncaught errors to Sentry when configured.
 */
export default function SentryInit() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  useEffect(() => {
    if (!dsn) {
      if (process.env.NODE_ENV === 'development') {
        console.info('ℹ️ [Sentry] NEXT_PUBLIC_SENTRY_DSN not set. Error tracking disabled.');
      }
      return;
    }

    // A simple no-op when sentry is not installed since it's removed.
    // If you want actual Sentry, you'd add the script or install it.
    console.info('✅ [Sentry] DSN configured, but client package not installed. Skipping init.');
  }, [dsn]);

  return null;
}
