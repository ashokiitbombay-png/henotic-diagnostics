import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Henotic Diagnostics';
  const subtitle = searchParams.get('subtitle') || 'Premier Diagnostic Center';
  const price = searchParams.get('price') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1e40af 100%)',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            H
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
            }}
          >
            HENOTIC DIAGNOSTICS
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: 'white',
            fontSize: title.length > 40 ? '48px' : '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '16px',
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: price ? '24px' : '0',
            maxWidth: '700px',
          }}
        >
          {subtitle}
        </p>

        {/* Price badge */}
        {price && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '12px 24px',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <span style={{ color: '#4ade80', fontSize: '28px', fontWeight: 900 }}>
              ₹{price}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: 600 }}>
              onwards
            </span>
          </div>
        )}

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            {['NABL Certified', '24/7 Available', 'Same-Day Reports'].map((badge) => (
              <span
                key={badge}
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                }}
              >
                ✓ {badge}
              </span>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ color: '#facc15', fontSize: '18px' }}>★ 4.9</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 600 }}>
              (1,030+ reviews)
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
