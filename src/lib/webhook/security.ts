import { createHmac, timingSafeEqual } from 'crypto';

// ── HMAC-SHA256 Signature Verification ───────────────────────────────────

/**
 * Verify an HMAC-SHA256 signature over a raw request body.
 *
 * WordPress (via WP Webhooks) sends:
 *   X-Webhook-Signature: sha256=<hex-encoded HMAC>
 *
 * We recompute the HMAC over the raw body using our signing secret
 * and compare in constant time to prevent timing attacks.
 *
 * @param rawBody  The raw request body as a string
 * @param signature  The signature header value (with or without "sha256=" prefix)
 * @param secret  The HMAC signing secret
 * @returns true if signature is valid
 */
export function verifyHMAC(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!rawBody || !signature || !secret) return false;

  // Strip "sha256=" prefix if present
  const providedSig = signature.startsWith('sha256=')
    ? signature.slice(7)
    : signature;

  const expectedSig = createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  return timingSafeCompare(providedSig, expectedSig);
}

// ── Timing-Safe String Comparison ────────────────────────────────────────

/**
 * Constant-time string comparison to prevent timing attacks.
 * Falls back to a length-padded comparison if strings differ in length.
 *
 * @param a First string
 * @param b Second string
 * @returns true if strings are equal
 */
export function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;

  // Pad shorter string to prevent length-based timing leaks
  const maxLen = Math.max(a.length, b.length);
  const bufA = Buffer.alloc(maxLen, 0);
  const bufB = Buffer.alloc(maxLen, 0);
  bufA.write(a);
  bufB.write(b);

  // Use Node.js built-in constant-time comparison
  return a.length === b.length && timingSafeEqual(bufA, bufB);
}

// ── Timestamp Validation (Replay Prevention) ─────────────────────────────

/**
 * Validate a webhook timestamp to prevent replay attacks.
 * Rejects requests older than `maxAgeMs` (default: 5 minutes).
 *
 * @param timestamp  Unix timestamp in seconds (from X-Webhook-Timestamp header)
 * @param maxAgeMs   Maximum acceptable age in milliseconds (default: 300,000 = 5 min)
 * @returns { valid: boolean, age: number } — age in seconds
 */
export function verifyTimestamp(
  timestamp: string | number | null,
  maxAgeMs: number = 300_000
): { valid: boolean; ageSeconds: number } {
  if (!timestamp) {
    return { valid: false, ageSeconds: -1 };
  }

  const ts = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  if (isNaN(ts) || ts <= 0) {
    return { valid: false, ageSeconds: -1 };
  }

  const nowMs = Date.now();
  const timestampMs = ts * 1000; // Convert seconds to milliseconds
  const ageMs = nowMs - timestampMs;

  // Reject if too old OR too far in the future (clock skew protection)
  const valid = ageMs >= -30_000 && ageMs <= maxAgeMs;

  return { valid, ageSeconds: Math.round(ageMs / 1000) };
}

// ── Nonce Deduplication (via Redis) ──────────────────────────────────────

/**
 * Check if a webhook nonce has been seen before using Redis.
 * Uses SET NX EX pattern: set-if-not-exists with TTL.
 *
 * @param redis  Upstash Redis client
 * @param nonce  Unique webhook delivery ID
 * @param ttlSeconds  How long to remember the nonce (default: 10 min)
 * @returns true if this is a NEW nonce (first time seen), false if replay
 */
export async function checkNonce(
  redis: import('@upstash/redis').Redis,
  nonce: string,
  ttlSeconds: number = 600
): Promise<boolean> {
  if (!nonce) return true; // No nonce provided → allow (backward compat)

  try {
    // SET NX: returns "OK" if key was set (new nonce), null if already exists (replay)
    const result = await redis.set(`webhook:nonce:${nonce}`, '1', {
      nx: true,
      ex: ttlSeconds,
    });
    return result !== null;
  } catch {
    // Redis error → allow the request (fail-open for availability)
    console.warn('[Webhook Security] Nonce check failed — allowing request');
    return true;
  }
}
