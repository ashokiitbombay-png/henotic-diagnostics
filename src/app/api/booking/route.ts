import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, location } = body;

    if (!name || !phone || !service) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // ==========================================
    // WHATSAPP API CONFIGURATION
    // In production, store these in your .env.local file
    // ==========================================
    const WA_API_URL = process.env.WHATSAPP_API_URL || "https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages";
    const WA_BEARER_TOKEN = process.env.WHATSAPP_API_TOKEN || "YOUR_ACCESS_TOKEN";

    // This payload is structured for the Official Meta WhatsApp Cloud API
    // It triggers a pre-approved template message: "Hi {{1}}, your {{2}} at {{3}} is confirmed."
    const whatsappPayload = {
      messaging_product: "whatsapp",
      to: `91${phone}`, // Formatting for Indian numbers
      type: "template",
      template: {
        name: "booking_confirmation", // The exact name of your approved template in Meta/Interakt
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
    // UNCOMMENT THIS BLOCK ONCE YOUR META/INTERAKT API KEYS ARE READY
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
    console.log(`✅ [DEV MODE] Automated WhatsApp Triggered for ${phone}: "Hi ${name}, your ${service} at ${location || 'our center'} is confirmed."`);

    return NextResponse.json({ 
      success: true, 
      message: "Booking confirmed! A WhatsApp message has been sent to the patient." 
    });

  } catch (error: any) {
    console.error("❌ API Route Error:", error.message);
    return NextResponse.json({ success: false, error: "Failed to process booking and trigger WhatsApp." }, { status: 500 });
  }
}