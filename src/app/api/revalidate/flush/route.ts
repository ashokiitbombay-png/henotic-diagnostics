import { NextRequest, NextResponse } from 'next/server';
import { flushAndProcess } from '@/lib/webhook/queue';
import { timingSafeCompare } from '@/lib/webhook/security';

/**
 * Internal Batch Flush Endpoint
 *
 * Called by the webhook handler after the debounce window expires.
 * NOT exposed to WordPress — protected by an internal secret.
 *
 * POST /api/revalidate/flush
 * Body: { type: "service" | "post" | "page" | "condition", internalSecret: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, internalSecret } = body;

    // Verify internal secret (prevents external abuse)
    const expected = process.env.REVALIDATION_SECRET;
    if (!expected || !internalSecret || !timingSafeCompare(internalSecret, expected)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!type || !['service', 'post', 'page', 'condition'].includes(type)) {
      return NextResponse.json(
        { message: 'Invalid type. Must be: service, post, page, or condition' },
        { status: 400 }
      );
    }

    const result = await flushAndProcess(type);

    console.log(`🔄 [Flush] ${type}: ${result.mode} — ${result.processed} slugs processed`);

    return NextResponse.json({
      ok: true,
      ...result,
      now: Date.now(),
    });
  } catch (error) {
    console.error('[Flush] Error:', error);
    return NextResponse.json({ message: 'Flush processing error' }, { status: 500 });
  }
}
