import { NextRequest, NextResponse } from 'next/server';
import { getRemindersStore, REMINDER_TEMPLATES, ReminderChannel } from '@/config/reminders';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authentication check
    const apiKey = process.env.REMINDERS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Reminder service not configured' }, { status: 503 });
    }
    const provided = request.headers.get('x-api-key');
    if (provided !== apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: 5 sends per minute per IP
    const ip = getClientIP(request);
    const limiter = rateLimit(`reminder-send:${ip}`, 5, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetTime - Date.now()) / 1000)) } }
      );
    }

    const body = await request.json();
    const { reminderId, channel } = body as { reminderId?: string; channel?: ReminderChannel };

    if (!reminderId || !channel) {
      return NextResponse.json(
        { error: 'Missing required parameters: reminderId and channel' },
        { status: 400 }
      );
    }

    if (!['sms', 'email', 'whatsapp'].includes(channel)) {
      return NextResponse.json(
        { error: 'Invalid channel. Must be one of: sms, email, whatsapp' },
        { status: 400 }
      );
    }

    const store = getRemindersStore();
    const reminder = store.find((r) => r.id === reminderId);

    if (!reminder) {
      return NextResponse.json(
        { error: 'Reminder not found' },
        { status: 404 }
      );
    }

    const templateFn = REMINDER_TEMPLATES[channel];
    const message = templateFn(reminder);

    reminder.status = 'sent';

    return NextResponse.json({
      sent: true,
      message,
      channel,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body' },
      { status: 400 }
    );
  }
}
