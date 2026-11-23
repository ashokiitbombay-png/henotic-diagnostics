'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry?: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError] Unhandled root application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <title>Something Went Wrong | Henotic Diagnostics</title>
        <div
          style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
            border: '1px solid #e2e8f0',
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#dc2626',
            }}
          >
            Temporary Service Interruption
          </p>
          <h1 style={{ margin: '0 0 12px', fontSize: '26px', fontWeight: 900, lineHeight: 1.2 }}>
            Something went wrong
          </h1>
          <p style={{ margin: '0 0 24px', fontSize: '15px', color: '#475569', lineHeight: 1.6 }}>
            We could not load this page right now. Please try refreshing, or contact our 24/7 diagnostic desk for immediate assistance.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => {
                if (typeof retry === 'function') retry();
                else if (typeof window !== 'undefined') window.location.reload();
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                color: '#0f172a',
                fontWeight: 800,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              Go Home
            </a>
          </div>

          <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
            24/7 Patient Helpline:{' '}
            <a href="tel:+918879327184" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 800 }}>
              +91 88793 27184
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
