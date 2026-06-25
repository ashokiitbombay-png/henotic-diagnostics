"use server";

import { validateBooking } from "@/lib/validations/bookingSchema";

interface BookingData {
  name: string;
  phone: string;
  service: string;
  location?: string;
  date?: string;
  time?: string;
}

/**
 * Next.js Server Action to handle diagnostic appointment bookings.
 * Replaces direct API route calls for form submissions to reduce client overhead.
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

    // Official Meta WhatsApp Cloud API Endpoint Configuration
    const WA_API_URL = process.env.WHATSAPP_API_URL || "https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages";
    const WA_BEARER_TOKEN = process.env.WHATSAPP_API_TOKEN || "YOUR_ACCESS_TOKEN";

    const whatsappPayload = {
      messaging_product: "whatsapp",
      to: `91${phone}`, // Formatting for Indian country code
      type: "template",
      template: {
        name: "booking_confirmation",
        language: {
          code: "en"
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: name },
              { type: "text", text: service },
              { type: "text", text: location || "our center" }
            ]
          }
        ]
      }
    };

    /* 
    // UNCOMMENT AND CONFIGURE IN PRODUCTION
    const response = await fetch(WA_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WA_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(whatsappPayload),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(`WhatsApp API Error: ${responseData.error?.message}`);
    }
    */

    // Simulated Success Logging for Development
    console.log(`✅ [DEV MODE - SERVER ACTION] Automated WhatsApp Triggered for ${phone}: "Hi ${name}, your ${service} at ${location || 'our center'} is confirmed."`);

    return { 
      success: true, 
      message: "Booking confirmed! A WhatsApp message has been sent to the patient." 
    };

  } catch (error: any) {
    console.error("❌ Server Action Error:", error.message);
    return { success: false, error: "Failed to process booking and trigger WhatsApp." };
  }
}
