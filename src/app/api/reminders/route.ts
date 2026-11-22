import { NextRequest, NextResponse } from 'next/server';
import { AppointmentReminder } from '@/config/reminders';
import { rateLimitDistributed, getClientIP } from '@/lib/rate-limit';
import { verifyRemindersAuth } from '@/lib/reminders/auth';
import {
  createReminderRecord,
  listReminders,
  updateReminderStatus,
} from '@/lib/reminders/reminder-store';

/** Verify header-only API key consistently across GET, POST, and DELETE reminder endpoints */
function requireRemindersAuth(request: NextRequest): NextResponse | null {
  const auth = verifyRemindersAuth(request.headers);
  if (!auth.configured) {
    return NextResponse.json({ error: 'Reminder service not configured' }, { status: 503 });
  }
  if (!auth.authorized) {
    return NextResponse.json(
      { error: 'Unauthorized. Valid API key required.' },
      { status: 401 }
    );
  }
  return null;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authError = requireRemindersAuth(request);
  if (authError) return authError;

  const dateFilter = request.nextUrl.searchParams.get('date') || undefined;
  const reminders = await listReminders(dateFilter);

  return NextResponse.json({
    success: true,
    count: reminders.length,
    reminders,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authError = requireRemindersAuth(request);
    if (authError) return authError;

    // Rate limit: 10 reminder requests per minute per IP
    const ip = getClientIP(request);
    const limiter = await rateLimitDistributed(`reminders:${ip}`, 10, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetTime - Date.now()) / 1000)) } }
      );
    }
    const body = await request.json();
    const {
      patientName,
      patientPhone,
      patientEmail,
      serviceName,
      appointmentDate,
      appointmentTime,
      location,
    } = body;

    if (!patientName || !patientPhone || !serviceName || !appointmentDate || !appointmentTime || !location) {
      return NextResponse.json(
        { error: 'Missing required appointment reminder fields' },
        { status: 400 }
      );
    }

    if (
      typeof patientName !== 'string' ||
      typeof patientPhone !== 'string' ||
      typeof serviceName !== 'string' ||
      typeof appointmentDate !== 'string' ||
      typeof appointmentTime !== 'string' ||
      typeof location !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Invalid data types for appointment reminder fields' },
        { status: 400 }
      );
    }

    const newReminder: AppointmentReminder = {
      id: crypto.randomUUID(),
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail ? String(patientEmail).trim() : undefined,
      serviceName: serviceName.trim(),
      appointmentDate,
      appointmentTime,
      location: location.trim(),
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    await createReminderRecord(newReminder);

    return NextResponse.json(
      {
        success: true,
        reminder: newReminder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Reminder API Error:", error.message);
    return NextResponse.json(
      { error: 'Failed to process request or invalid JSON' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const authError = requireRemindersAuth(request);
    if (authError) return authError;
    let id: string | null = null;
    
    // Check searchParams first
    const searchParams = request.nextUrl.searchParams;
    id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id || null;
      } catch {
        // body parsing optional
      }
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Reminder ID is required' },
        { status: 400 }
      );
    }

    const reminder = await updateReminderStatus(id, 'cancelled');

    if (!reminder) {
      return NextResponse.json(
        { error: 'Reminder not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Reminder cancelled successfully',
      reminder,
    });
  } catch (error: any) {
    console.error("❌ Reminder API DELETE Error:", error.message);
    return NextResponse.json(
      { error: 'Failed to process cancellation request' },
      { status: 500 }
    );
  }
}
