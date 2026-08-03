import { NextRequest, NextResponse } from 'next/server';
import { AppointmentReminder, getRemindersStore, addReminder } from '@/config/reminders';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.warn('⚠️ [WARNING] Reminders are currently stored in-memory. This should be replaced with a database (e.g., PostgreSQL or MongoDB) for production.');
  const store = getRemindersStore();
  const searchParams = request.nextUrl.searchParams;
  const dateFilter = searchParams.get('date');

  let reminders = store;
  if (dateFilter) {
    reminders = store.filter((r) => r.appointmentDate === dateFilter);
  }

  return NextResponse.json({
    success: true,
    count: reminders.length,
    reminders,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limit: 10 reminder requests per minute per IP
    const ip = getClientIP(request);
    const limiter = rateLimit(`reminders:${ip}`, 10, 60_000);
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

    addReminder(newReminder);

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

    const store = getRemindersStore();
    const reminder = store.find((r) => r.id === id);

    if (!reminder) {
      return NextResponse.json(
        { error: 'Reminder not found' },
        { status: 404 }
      );
    }

    reminder.status = 'cancelled';

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
