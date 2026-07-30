"use server";

import { validateBooking } from "@/lib/validations/bookingSchema";
import { createCrmAppointment } from "@/lib/crm/client";
import nodemailer from "nodemailer";

interface BookingData {
  name: string;
  phone: string;
  service: string;
  location?: string;
  date?: string;
  time?: string;
  slotId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

/**
 * Sends a notification email to the clinic administration with patient details.
 */
async function sendBookingEmail(data: BookingData, appointmentId: string) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  const emailSubject = `🚨 NEW PRIORITY BOOKING - ${data.name} (${data.service})`;
  // HTML template omitted for brevity in variables below, kept in the file
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-2xl;">
      <h2 style="color: #0f172a; margin-bottom: 20px;">New Appointment Booking Details</h2>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; border-color: #cbd5e1;">
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; width: 35%; color: #334155;">Patient Name</td>
          <td style="color: #0f172a;">${data.name}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">Mobile Phone</td>
          <td style="color: #0f172a;">${data.phone}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">Selected Scan/Test</td>
          <td style="color: #0f172a;">${data.service}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">Clinic Location</td>
          <td style="color: #0f172a;">${data.location || "General / Not Specified"}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">Date</td>
          <td style="color: #0f172a;">${data.date || "Not Specified"}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">Time Slot</td>
          <td style="color: #0f172a;">${data.time || "Not Specified"}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">Appointment ID</td>
          <td style="color: #0f172a;"><strong>${appointmentId}</strong></td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">UTM Source</td>
          <td style="color: #0f172a;">${data.utmSource || "Organic / Direct"}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">UTM Medium</td>
          <td style="color: #0f172a;">${data.utmMedium || "Organic / Direct"}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold; color: #334155;">UTM Campaign</td>
          <td style="color: #0f172a;">${data.utmCampaign || "Organic / Direct"}</td>
        </tr>
      </table>
      <p style="color: #64748b; font-size: 12px; margin-top: 25px; text-align: center;">Sent from Henotic Diagnostics Portal Booking Server Action.</p>
    </div>
  `;

  if (!host || !user || !pass) {
    console.warn(`⚠️ [EMAIL SERVICE] SMTP credentials not fully configured in .env.local. Skipping email sending.`);
    return { success: true, mocked: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `"Henotic Diagnostics" <${user}>`,
      to: "ashokiitbombay@gmail.com",
      subject: emailSubject,
      html: emailHtml
    });

    console.log(`✅ [EMAIL SUCCESS] Booking alert email successfully sent to "ashokiitbombay@gmail.com".`);
    return { success: true };
  } catch (error: any) {
    console.error("❌ [EMAIL ERROR] Failed sending SMTP email:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Sends an auto-confirmation message back to the patient's mobile number (via WhatsApp Template or Twilio SMS).
 */
async function sendPatientConfirmation(data: BookingData, appointmentId: string) {
  const phone = data.phone;
  const name = data.name;
  const service = data.service;
  const location = data.location || "our center";
  const date = data.date || "Not Specified";
  const time = data.time || "Not Specified";

  const messageText = `Dear ${name}, your booking for ${service} at ${location} on ${date} at ${time} is confirmed! Appointment ID: ${appointmentId}. Thank you for choosing Henotic Diagnostics.`;

  // 1. Try Meta WhatsApp Cloud API if configured
  const WA_API_URL = process.env.WHATSAPP_API_URL;
  const WA_BEARER_TOKEN = process.env.WHATSAPP_API_TOKEN;

  if (WA_API_URL && WA_BEARER_TOKEN) {
    try {
      const payload = {
        messaging_product: "whatsapp",
        to: `91${phone}`,
        type: "template",
        template: {
          name: "booking_confirmation",
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: name },
                { type: "text", text: service },
                { type: "text", text: location }
              ]
            }
          ]
        }
      };

      const response = await fetch(WA_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${WA_BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`✅ [WHATSAPP AUTO-CONFIRM SUCCESS] Sent WhatsApp confirmation template to patient +91${phone}`);
        return { success: true, channel: "whatsapp" };
      } else {
        const errJson = await response.json();
        console.warn(`⚠️ [WHATSAPP AUTO-CONFIRM FAILED] Status ${response.status}:`, errJson);
      }
    } catch (waErr: any) {
      console.error(`❌ [WHATSAPP AUTO-CONFIRM EXCEPTION]:`, waErr.message);
    }
  }

  // 2. Try Twilio SMS if configured
  const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN;
  const TWILIO_NUMBER = process.env.TWILIO_FROM_NUMBER;

  if (TWILIO_SID && TWILIO_AUTH && TWILIO_NUMBER) {
    try {
      const authHeader = "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString("base64");
      const smsBody = new URLSearchParams({
        To: `+91${phone}`,
        From: TWILIO_NUMBER,
        Body: messageText
      });

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: smsBody.toString()
      });

      if (response.ok) {
        console.log(`✅ [SMS AUTO-CONFIRM SUCCESS] Sent SMS confirmation to patient +91${phone} via Twilio.`);
        return { success: true, channel: "sms" };
      } else {
        const errText = await response.text();
        console.warn(`⚠️ [SMS AUTO-CONFIRM FAILED] Twilio response:`, errText);
      }
    } catch (smsErr: any) {
      console.error(`❌ [SMS AUTO-CONFIRM EXCEPTION]:`, smsErr.message);
    }
  }

  // 3. Fallback mock log in dev
  console.log(`📱 [MOCK MESSAGE SERVICE] Sending auto-confirmation message back to patient phone +91${phone}:`);
  console.log(`   Message: "${messageText}"`);
  return { success: true, mocked: true };
}

/**
 * Next.js Server Action to handle diagnostic appointment bookings.
 */
export async function submitBookingAction(formData: BookingData) {
  try {
    const validation = validateBooking({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      location: formData.location,
      date: formData.date,
      time: formData.time
    });

    if (!validation.success) {
      const errorMsg = Object.values(validation.errors || {}).join(" ");
      return { success: false, error: errorMsg || "Validation failed." };
    }

    const { name, phone, service, location } = validation.data!;

    // 1. Attempt CRM Booking
    let crmSuccess = false;
    let appointmentId = `apt_mock_${Math.random().toString(36).substring(2, 11)}`;

    try {
      const crmResponse = await createCrmAppointment({
        patientName: name,
        phone: phone,
        serviceId: service,
        locationId: location || "general",
        date: formData.date || "",
        slotId: formData.slotId || "general_slot",
        utmSource: formData.utmSource,
        utmMedium: formData.utmMedium,
        utmCampaign: formData.utmCampaign,
        utmTerm: formData.utmTerm,
        utmContent: formData.utmContent
      });

      if (crmResponse.success) {
        crmSuccess = true;
        if (crmResponse.appointmentId) {
          appointmentId = crmResponse.appointmentId;
        }
        console.log(`✅ [CRM BOOKING SUCCESS] Appointment created in CRM. ID: ${appointmentId}`);
      }
    } catch (crmErr: any) {
      console.warn(`⚠️ [CRM BOOKING FAILED] CRM booking failed, falling back to mock ID:`, crmErr.message);
    }

    // 2. Send booking alert email to ashokiitbombay@gmail.com
    await sendBookingEmail(formData, appointmentId);

    // 3. Send auto-confirmation back to patient's phone
    await sendPatientConfirmation(formData, appointmentId);

    return { 
      success: true, 
      crmBooked: crmSuccess,
      appointmentId,
      message: `Appointment successfully registered! ID: ${appointmentId}` 
    };

  } catch (error: any) {
    console.error("❌ Server Action Error:", error.message);
    return { success: false, error: "Failed to process booking." };
  }
}
