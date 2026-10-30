import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { recordInquiry } from '@/lib/leads/lead-service';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const limiter = rateLimit(`newsletter:${ip}`, 5, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { success: false, error: 'Too many subscription attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 });
    }

    await recordInquiry(email.trim().toLowerCase(), 'newsletter_subscription');

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to process subscription' }, { status: 500 });
  }
}
