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
      console.log('ℹ️ [Sentry] No DSN configured. Error tracking disabled.');
      return;
    }

    // Dynamic import to avoid bundling Sentry when not configured
    // @ts-ignore — @sentry/nextjs may not be installed; catch() handles this
    import('@sentry/nextjs')
      .then((Sentry) => {
        if (!Sentry.isInitialized()) {
          Sentry.init({
            dsn,
            tracesSampleRate: 0.1, // 10% of transactions
            replaysSessionSampleRate: 0.05, // 5% of sessions
            replaysOnErrorSampleRate: 1.0, // 100% of error sessions
            environment: process.env.NODE_ENV,
          });
          console.log('✅ [Sentry] Error tracking initialized.');
        }
      })
      .catch(() => {
        // @sentry/nextjs not installed — that's fine
        console.log('ℹ️ [Sentry] Package not installed. Run: npm install @sentry/nextjs');
      });
  }, [dsn]);

  return null;
}
