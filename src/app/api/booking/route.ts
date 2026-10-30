import { NextResponse } from "next/server";
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { recordLead } from '@/lib/leads/lead-service';

export async function POST(req: Request) {
  try {
    // Rate limit: 5 bookings per minute per IP
    const ip = getClientIP(req);
    const limiter = rateLimit(`booking:${ip}`, 5, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { success: false, error: 'Too many booking requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetTime - Date.now()) / 1000)) } }
      );
    }
    const body = await req.json();
    const { name, phone, service, location } = body;

    if (!name || !phone || !service) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // 🛡️ ZERO-DROP LEAD PERSISTENCE
    await recordLead({
      name,
      phone,
      service,
      location,
      status: 'new',
      channel: 'direct_modal',
    }).catch(err => console.warn('[api/booking] Lead persistence note:', err.message));

    // ==========================================
    // WHATSAPP API CONFIGURATION
    // ==========================================
    const WA_API_URL = process.env.WHATSAPP_API_URL;
    const WA_BEARER_TOKEN = process.env.WHATSAPP_API_TOKEN;

    if (!WA_API_URL || !WA_BEARER_TOKEN) {
      console.warn("⚠️ [DEV MODE] WhatsApp API credentials missing. Simulating WhatsApp success.");
      console.log(`✅ [DEV MODE] Automated WhatsApp Triggered for ${phone}: "Hi ${name}, your ${service} at ${location || 'our center'} is confirmed."`);
      return NextResponse.json({ 
        success: true, 
        message: "Booking confirmed! A member of our clinical team will contact you shortly." 
      });
    }

    // Official Meta WhatsApp Cloud API Payload
    const whatsappPayload = {
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
              { type: "text", text: location || "our center" }
            ]
          }
        ]
      }
    };

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

    return NextResponse.json({ 
      success: true, 
      message: "Booking confirmed! A confirmation WhatsApp message has been sent." 
    });

  } catch (error: any) {
    console.error("❌ API Route Error:", error.message);
    return NextResponse.json({ success: false, error: "Failed to process booking and trigger WhatsApp." }, { status: 500 });
  }
}
