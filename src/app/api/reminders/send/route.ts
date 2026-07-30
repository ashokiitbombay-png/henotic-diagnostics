import { NextRequest, NextResponse } from 'next/server';
import { getRemindersStore, REMINDER_TEMPLATES, ReminderChannel } from '@/config/reminders';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
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
