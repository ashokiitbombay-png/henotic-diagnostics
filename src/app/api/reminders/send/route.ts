import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { AppointmentReminder, getRemindersStore, REMINDER_TEMPLATES, ReminderChannel } from '@/config/reminders';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { verifyRemindersAuth } from '@/lib/reminders/auth';

function formatWhatsAppRecipient(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function formatE164Phone(phone: string): string {
  const trimmed = phone.trim();
  if (/^\+\d{7,15}$/.test(trimmed)) return trimmed;
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  return digits ? `+${digits}` : '';
}

async function dispatchReminder(
  reminder: AppointmentReminder,
  channel: ReminderChannel,
  message: string | { subject: string; body: string }
): Promise<
  | { ok: true; dispatched: true; provider: 'smtp' | 'whatsapp' | 'twilio' }
  | { ok: true; dispatched: false; simulated: true }
  | { ok: false; status: number; error: string }
> {
  if (channel === 'email') {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    if (!host || !user || !pass) {
      return { ok: true, dispatched: false, simulated: true };
    }
    if (!reminder.patientEmail) {
      return { ok: false, status: 400, error: 'Reminder has no patientEmail for email dispatch' };
    }

    const emailContent = typeof message === 'string'
      ? { subject: `Appointment Reminder: ${reminder.serviceName} - Henotic Diagnostics`, body: message }
      : message;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const from = process.env.SMTP_FROM || user;

    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      await transporter.sendMail({
        from: `"Henotic Diagnostics" <${from}>`,
        to: reminder.patientEmail,
        subject: emailContent.subject,
        text: emailContent.body,
      });
      return { ok: true, dispatched: true, provider: 'smtp' };
    } catch (err) {
      console.error('[Reminders] SMTP dispatch failed:', err instanceof Error ? err.message : String(err));
      return { ok: false, status: 502, error: 'Failed to dispatch email reminder' };
    }
  }

  if (channel === 'whatsapp') {
    const waUrl = process.env.WHATSAPP_API_URL;
    const waToken = process.env.WHATSAPP_API_TOKEN;
    if (!waUrl || !waToken) {
      return { ok: true, dispatched: false, simulated: true };
    }

    const to = formatWhatsAppRecipient(reminder.patientPhone);
    if (!to) {
      return { ok: false, status: 400, error: 'Reminder has invalid patientPhone for WhatsApp dispatch' };
    }

    try {
      const res = await fetch(waUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${waToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: String(message) },
        }),
      });
      if (!res.ok) {
        console.error(`[Reminders] WhatsApp API failed with status ${res.status}`);
        return { ok: false, status: 502, error: 'WhatsApp provider rejected reminder dispatch' };
      }
      return { ok: true, dispatched: true, provider: 'whatsapp' };
    } catch (err) {
      console.error('[Reminders] WhatsApp dispatch failed:', err instanceof Error ? err.message : String(err));
      return { ok: false, status: 502, error: 'Failed to dispatch WhatsApp reminder' };
    }
  }

  // channel === 'sms'
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !authToken || !fromNumber) {
    return { ok: true, dispatched: false, simulated: true };
  }

  const to = formatE164Phone(reminder.patientPhone);
  if (!to) {
    return { ok: false, status: 400, error: 'Reminder has invalid patientPhone for SMS dispatch' };
  }

  try {
    const basicAuth = Buffer.from(`${sid}:${authToken}`).toString('base64');
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: to,
        From: fromNumber,
        Body: String(message),
      }),
    });
    if (!res.ok) {
      console.error(`[Reminders] Twilio SMS failed with status ${res.status}`);
      return { ok: false, status: 502, error: 'SMS provider rejected reminder dispatch' };
    }
    return { ok: true, dispatched: true, provider: 'twilio' };
  } catch (err) {
    console.error('[Reminders] Twilio SMS dispatch failed:', err instanceof Error ? err.message : String(err));
    return { ok: false, status: 502, error: 'Failed to dispatch SMS reminder' };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const auth = verifyRemindersAuth(request.headers);
    if (!auth.configured) {
      return NextResponse.json({ error: 'Reminder service not configured' }, { status: 503 });
    }
    if (!auth.authorized) {
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

    const message = REMINDER_TEMPLATES[channel](reminder);
    const result = await dispatchReminder(reminder, channel, message);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    reminder.status = 'sent';

    if (result.dispatched) {
      return NextResponse.json({
        sent: true,
        dispatched: true,
        provider: result.provider,
        channel,
        message,
      });
    }

    return NextResponse.json({
      sent: true,
      dispatched: false,
      simulated: true,
      channel,
      message,
      note: 'Channel provider credentials not configured; dispatch simulated.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body' },
      { status: 400 }
    );
  }
}
