/**
 * Appointment Reminder System Configuration & Templates
 * 
 * Integration Instructions:
 * -------------------------
 * 1. Integration with BookingForm:
 *    When a booking is successfully submitted in `BookingForm` component or backend booking API,
 *    trigger reminder scheduling via an authenticated POST request to `/api/reminders`
 *    (passing `x-api-key` or `Authorization: Bearer`):
 * 
 *    ```ts
 *    const response = await fetch('/api/reminders', {
 *      method: 'POST',
 *      headers: {
 *        'Content-Type': 'application/json',
 *        'x-api-key': process.env.REMINDERS_API_KEY!,
 *      },
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
 * 2. Linux Cron Setup (GCP VM):
 *    To automate reminder delivery on the VM, add a daily crontab entry (`crontab -e`):
 * 
 *    ```cron
 *    0 8 * * * curl -sf -H "x-api-key: $REMINDERS_API_KEY" "http://127.0.0.1:3000/api/reminders?date=$(date +\%F)" >/dev/null 2>&1
 *    ```
 * 
 *    The cron job queries `/api/reminders?date=YYYY-MM-DD` each morning at 8:00 AM,
 *    and dispatches reminders via `/api/reminders/send` for SMS, Email, or WhatsApp channels.
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
