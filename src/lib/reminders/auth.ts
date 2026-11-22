import { timingSafeCompare } from '@/lib/webhook/security';

/**
 * Extract reminder API token from request headers only (`x-api-key` or `Authorization: Bearer`).
 * Query string tokens (e.g. `?apiKey=...`) are strictly ignored so secrets never leak in access logs.
 */
export function extractRemindersHeaderToken(headers: Headers): string | null {
  const headerKey = headers.get('x-api-key')?.trim();
  if (headerKey) return headerKey;

  const authHeader = headers.get('authorization')?.trim();
  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match?.[1]) return match[1].trim();
  }

  return null;
}

/**
 * Constant-time authentication verification for reminder management/dispatch endpoints.
 */
export function verifyRemindersAuth(headers: Headers): { configured: boolean; authorized: boolean } {
  const expectedKey = process.env.REMINDERS_API_KEY;
  if (!expectedKey) {
    return { configured: false, authorized: false };
  }

  const provided = extractRemindersHeaderToken(headers);
  if (!provided) {
    return { configured: true, authorized: false };
  }

  return {
    configured: true,
    authorized: timingSafeCompare(provided, expectedKey),
  };
}
