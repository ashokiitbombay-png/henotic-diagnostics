/**
 * Global analytics and event tracking utilities.
 * Handles Google Tag Manager (GTM) dataLayer events and custom script integrations.
 */

interface GTMEvent {
  event: string;
  [key: string]: any;
}

/**
 * Pushes a tracking event to the Google Tag Manager dataLayer.
 * Safely checks if window and dataLayer exist to prevent server-side crashes.
 */
export function trackGTMEvent(payload: GTMEvent): void {
  if (typeof window === "undefined") return;

  try {
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push(payload);
    (window as any).dataLayer = dataLayer;
  } catch (error) {
    console.error("Failed to push GTM event:", error);
  }
}

/**
 * Tracks a custom Lead Conversion event (e.g. for Google Ads or Facebook Pixels).
 * 
 * @param service The name of the booked test or scan
 * @param location The city/center location selected
 */
export function trackLeadSubmission(service: string, location: string): void {
  trackGTMEvent({
    event: "generate_lead",
    service,
    location,
    timestamp: new Date().toISOString()
  });
}
