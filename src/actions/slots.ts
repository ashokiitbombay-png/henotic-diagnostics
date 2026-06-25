"use server";

import { fetchAvailableSlots } from "@/lib/crm/client";
import { CrmSlot } from "@/lib/crm/types";

export async function getSlotsForDate(
  date: string,
  locationId: string,
  serviceId: string
): Promise<{ success: boolean; slots?: CrmSlot[]; error?: string }> {
  try {
    if (!date) {
      return { success: false, error: "Date is required." };
    }
    const slots = await fetchAvailableSlots(date, locationId || "general", serviceId || "general");
    return { success: true, slots };
  } catch (error: any) {
    console.error("❌ getSlotsForDate Server Action Error:", error.message);
    return { success: false, error: "Unable to load availability slots from CRM." };
  }
}
