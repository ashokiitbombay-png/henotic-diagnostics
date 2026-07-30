/**
 * Appointment Reminder System Configuration & Templates
 * 
 * Integration Instructions:
 * -------------------------
 * 1. Integration with BookingForm:
 *    When a booking is successfully submitted in `BookingForm` component or booking API endpoint,
 *    trigger reminder scheduling by making a POST request to `/api/reminders`:
 * 
 *    ```ts
 *    const response = await fetch('/api/reminders', {
 *      method: 'POST',
 *      headers: { 'Content-Type': 'application/json' },
 *      body: JSON.stringify({
 *        patientName: formData.name,
 *        patientPhone: formData.phone,
 *        patientEmail: formData.email,
 *        serviceName: formData.serviceName,
 *        appointmentDate: formData.date,
 *        appointmentTime: formData.time,
 *        location: formData.location || 'Henotic Diagnostics Main Center',
 *      }),
 *    });
 *    const data = await response.json();
 *    ```
 * 
 * 2. Vercel Cron Setup:
 *    To automate reminder delivery, configure Vercel Cron in `vercel.json` at your repository root:
 * 
 *    ```json
 *    {
 *      "crons": [
 *        {
 *          "path": "/api/reminders/cron",
 *          "schedule": "0 8 * * *"
 *        }
 *      ]
 *    }
 *    ```
 * 
 *    The cron handler can query `/api/reminders?date=YYYY-MM-DD` each morning at 8:00 AM,
 *    and dispatch reminders via `/api/reminders/send` for SMS, Email, or WhatsApp channels.
 */

export interface AppointmentReminder {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  status: 'scheduled' | 'sent' | 'cancelled';
  createdAt: string;
}

export type ReminderChannel = 'sms' | 'email' | 'whatsapp';

export type TemplateFunction = (reminder: AppointmentReminder) => string | { subject: string; body: string };

export const REMINDER_TEMPLATES: Record<ReminderChannel, TemplateFunction> = {
  sms: (reminder: AppointmentReminder): string =>
    `Hello ${reminder.patientName}, this is a reminder for your upcoming appointment for ${reminder.serviceName} at ${reminder.location} on ${reminder.appointmentDate} at ${reminder.appointmentTime}. Please arrive 10 minutes prior.`,

  email: (reminder: AppointmentReminder): { subject: string; body: string } => ({
    subject: `Appointment Reminder: ${reminder.serviceName} - Henotic Diagnostics`,
    body: `Dear ${reminder.patientName},\n\nThis is a friendly reminder of your scheduled appointment at Henotic Diagnostics.\n\nAppointment Details:\n- Service: ${reminder.serviceName}\n- Date: ${reminder.appointmentDate}\n- Time: ${reminder.appointmentTime}\n- Location: ${reminder.location}\n\nIf you need to reschedule or have any questions, please contact our support team.\n\nBest regards,\nHenotic Diagnostics Team`,
  }),

  whatsapp: (reminder: AppointmentReminder): string =>
    `🏥 *Henotic Diagnostics Appointment Reminder*\n\nDear *${reminder.patientName}*,\nYour appointment for *${reminder.serviceName}* is confirmed.\n📅 *Date:* ${reminder.appointmentDate}\n⏰ *Time:* ${reminder.appointmentTime}\n📍 *Location:* ${reminder.location}\n\nPlease reply YES to confirm or call us to reschedule.`,
};

// Initial mock reminders data for testing and demonstration
const initialReminders: AppointmentReminder[] = [
  {
    id: 'rem-101',
    patientName: 'Sarah Jenkins',
    patientPhone: '+1-555-0192',
    patientEmail: 'sarah.j@example.com',
    serviceName: 'Full Body Diagnostic Suite',
    appointmentDate: '2026-08-01',
    appointmentTime: '09:00 AM',
    location: 'Henotic Diagnostics Main Branch',
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rem-102',
    patientName: 'David Chen',
    patientPhone: '+1-555-0184',
    patientEmail: 'david.chen@example.com',
    serviceName: 'Comprehensive Lipid & Blood Panel',
    appointmentDate: '2026-08-01',
    appointmentTime: '10:30 AM',
    location: 'Henotic Diagnostics West Wing',
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rem-103',
    patientName: 'Emma Watson',
    patientPhone: '+1-555-0177',
    patientEmail: 'emma.w@example.com',
    serviceName: 'Thyroid & Cardiac Screening',
    appointmentDate: '2026-08-02',
    appointmentTime: '02:00 PM',
    location: 'Henotic Diagnostics Main Branch',
    status: 'sent',
    createdAt: new Date().toISOString(),
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __remindersStore: AppointmentReminder[] | undefined;
}

export const getRemindersStore = (): AppointmentReminder[] => {
  if (!globalThis.__remindersStore) {
    globalThis.__remindersStore = [...initialReminders];
  }
  return globalThis.__remindersStore;
};
