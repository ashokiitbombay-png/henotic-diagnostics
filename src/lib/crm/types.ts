export interface CrmSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface CrmAppointmentPayload {
  patientName: string;
  phone: string;
  serviceId: string;
  locationId: string;
  date: string;
  slotId: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface CrmAppointmentResponse {
  success: boolean;
  appointmentId?: string;
  message?: string;
}
