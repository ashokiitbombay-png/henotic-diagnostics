export interface BookingInput {
  name: string;
  phone: string;
  service: string;
  location?: string;
  date?: string;
  time?: string;
}

export interface ValidationResult {
  success: boolean;
  errors?: Record<string, string>;
  data?: BookingInput;
}

/**
 * Shared form validation function.
 * Validates booking inputs on both the Client side (forms) and Server side (Actions).
 */
export function validateBooking(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const service = typeof data.service === 'string' ? data.service.trim() : '';
  const location = typeof data.location === 'string' ? data.location.trim() : '';
  const date = typeof data.date === 'string' ? data.date.trim() : '';
  const time = typeof data.time === 'string' ? data.time.trim() : '';

  // 1. Patient Name Validation
  if (!name) {
    errors.name = "Patient name is required.";
  } else if (name.length < 2) {
    errors.name = "Patient name must be at least 2 characters.";
  } else if (name.length > 50) {
    errors.name = "Patient name cannot exceed 50 characters.";
  }

  // 2. Mobile Phone Number Validation
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers (10 digits starting with 6, 7, 8, or 9)
  if (!phone) {
    errors.phone = "Mobile number is required.";
  } else if (!phoneRegex.test(phone)) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  }

  // 3. Test Service Selection Validation
  if (!service) {
    errors.service = "Please select a diagnostic test/scan.";
  }

  // 4. Booking Date Validation (if provided)
  if (date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = "Booking date cannot be in the past.";
    }
  }

  // 5. Booking Time Validation (if provided)
  if (time) {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 7 || hour > 21) {
      errors.time = "Bookings are only available between 07:00 AM and 09:00 PM.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      phone,
      service,
      location: location || undefined,
      date: date || undefined,
      time: time || undefined
    }
  };
}
