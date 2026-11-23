import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeCompare } from '@/lib/webhook/security';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

function extractToken(headers: Headers): string {
  const adminToken = headers.get('x-admin-token')?.trim();
  if (adminToken) return adminToken;

  const apiKey = headers.get('x-api-key')?.trim();
  if (apiKey) return apiKey;

  const auth = headers.get('authorization')?.trim();
  if (auth) {
    const match = auth.match(/^Bearer\s+(.+)$/i);
    if (match?.[1]) return match[1].trim();
  }

  return '';
}

function checkDataDirWritable(): boolean {
  const dataDir = process.env.LEAD_DATA_DIR
    ? path.resolve(process.env.LEAD_DATA_DIR)
    : path.join(process.cwd(), 'data');

  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ dataDir, { recursive: true });
    }
    const probePath = path.join(dataDir, `.health-probe-${process.pid}-${Date.now()}.tmp`);
    fs.writeFileSync(/*turbopackIgnore: true*/ probePath, 'ok', 'utf8');
    fs.unlinkSync(/*turbopackIgnore: true*/ probePath);
    return true;
  } catch {
    return false;
  }
}

function countFailsafeCacheKeys(): number {
  const cachePath = path.join(process.cwd(), 'src', 'lib', 'wordpress', 'failsafe-cache.json');
  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ cachePath)) return 0;
    const raw = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ cachePath, 'utf8'));
    const target = raw?.pages || raw?.services || raw;
    return target && typeof target === 'object' ? Object.keys(target).length : 0;
  } catch {
    return 0;
  }
}

/**
 * Lightweight health check endpoint for GCP VM / Nginx / deploy verification.
 * Pass `?deep=1` with `x-admin-token` / `x-api-key` / `Authorization: Bearer`
 * to retrieve internal operational diagnostics.
 */
export async function GET(request?: NextRequest) {
  const isDeep = request?.nextUrl?.searchParams?.get('deep') === '1';

  if (!isDeep) {
    return NextResponse.json(
      {
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: NO_STORE_HEADERS }
    );
  }

  const configuredTokens = [
    process.env.ADMIN_EXPORT_TOKEN,
    process.env.REMINDERS_API_KEY,
    process.env.NODE_ENV === 'development' ? 'henotic_admin_lead_export' : undefined,
  ].filter((t): t is string => Boolean(t && t.length > 0));

  if (configuredTokens.length === 0) {
    return NextResponse.json(
      { error: 'Deep health authentication not configured' },
      { status: 503, headers: NO_STORE_HEADERS }
    );
  }

  const provided = request ? extractToken(request.headers) : '';
  const authorized =
    Boolean(provided) && configuredTokens.some((expected) => timingSafeCompare(provided, expected));

  if (!authorized) {
    return NextResponse.json(
      { error: 'Unauthorized deep health access' },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const dataDirWritable = checkDataDirWritable();
  const failsafeCacheKeys = countFailsafeCacheKeys();

  return NextResponse.json(
    {
      status: dataDirWritable ? 'ok' : 'degraded',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memoryRssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      dataDirWritable,
      failsafeCacheKeys,
      redisConfigured: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
      mongoConfigured: Boolean(process.env.MONGODB_URI),
      razorpayConfigured: Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
      webhookSecretConfigured: Boolean(process.env.RAZORPAY_WEBHOOK_SECRET),
    },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}
