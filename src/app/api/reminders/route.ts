import { NextRequest, NextResponse } from 'next/server';
import { AppointmentReminder, getRemindersStore } from '@/config/reminders';

export async function GET(request: NextRequest): Promise<NextResponse> {
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

    const store = getRemindersStore();
    const newReminder: AppointmentReminder = {
      id: crypto.randomUUID(),
      patientName,
      patientPhone,
      patientEmail: patientEmail || undefined,
      serviceName,
      appointmentDate,
      appointmentTime,
      location,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    store.push(newReminder);

    return NextResponse.json(
      {
        success: true,
        reminder: newReminder,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body' },
      { status: 400 }
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
  } catch {
    return NextResponse.json(
      { error: 'Failed to process cancellation request' },
      { status: 500 }
    );
  }
}
