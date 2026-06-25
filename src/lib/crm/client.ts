import "server-only";
import { CrmSlot, CrmAppointmentPayload, CrmAppointmentResponse } from "./types";

export async function fetchAvailableSlots(date: string, locationId: string, serviceId: string): Promise<CrmSlot[]> {
  const CRM_API_KEY = process.env.CRM_API_KEY;
  const CRM_API_URL = process.env.CRM_API_URL;

  // Fallback to mock slot generator in development or if environment variables are not configured
  if (!CRM_API_KEY || !CRM_API_URL) {
    console.log(`ℹ️ [CRM CLIENT] Mocking slots for date "${date}", location "${locationId}", service "${serviceId}"`);
    return [
      { id: "slot_09_00", time: "09:00 AM", available: true },
      { id: "slot_11_00", time: "11:00 AM", available: true },
      { id: "slot_14_00", time: "02:00 PM", available: true },
      { id: "slot_16_00", time: "04:00 PM", available: true }
    ];
  }

  try {
    const res = await fetch(`${CRM_API_URL}/v1/slots?date=${date}&location=${locationId}&service=${serviceId}`, {
      headers: {
        "Authorization": `Bearer ${CRM_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 } // Fetch fresh slots, bypass Next.js data cache
    });

    if (!res.ok) {
      throw new Error(`CRM responded with status ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("❌ fetchAvailableSlots CRM API Error:", error.message);
    throw error;
  }
}

export async function createCrmAppointment(payload: CrmAppointmentPayload): Promise<CrmAppointmentResponse> {
  const CRM_API_KEY = process.env.CRM_API_KEY;
  const CRM_API_URL = process.env.CRM_API_URL;

  // Fallback to mock appointment booking in development
  if (!CRM_API_KEY || !CRM_API_URL) {
    console.log("ℹ️ [CRM CLIENT] Mocking appointment booking payload:", payload);
    return {
      success: true,
      appointmentId: `apt_mock_${Math.random().toString(36).substr(2, 9)}`,
      message: "Mock appointment successfully created."
    };
  }

  try {
    const res = await fetch(`${CRM_API_URL}/v1/appointments`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CRM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`CRM booking responded with status ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      appointmentId: data.appointmentId || data.id,
      message: "Appointment booked successfully in CRM."
    };
  } catch (error: any) {
    console.error("❌ createCrmAppointment CRM API Error:", error.message);
    throw error;
  }
}
