"use client";

import { useEffect } from "react";

/**
 * Google Customer Reviews Opt-In Badge + Survey Trigger
 * Merchant Center ID: 5502255117
 *
 * Usage:
 * 1. Badge: Include <GoogleCustomerReviews /> in layout for the floating badge
 * 2. Survey: Call triggerGCRSurvey() after booking confirmation
 *
 * @see https://support.google.com/merchants/answer/7124319
 */

declare global {
  interface Window {
    renderOptIn?: () => void;
    renderBadge?: () => void;
    gapi?: {
      load: (module: string, callback: () => void) => void;
      surveyoptin?: {
        render: (config: Record<string, unknown>) => void;
      };
      siteverification?: {
        render: (containerId: string, config: Record<string, unknown>) => void;
      };
    };
  }
}

const MERCHANT_ID = 5502255117;

/**
 * Call this function after a successful booking to trigger
 * the Google Customer Reviews opt-in survey popup.
 */
export function triggerGCRSurvey(options: {
  orderId: string;
  email: string;
  estimatedDeliveryDate?: string;
}) {
  const deliveryDate = options.estimatedDeliveryDate ||
    new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Default: tomorrow

  if (typeof window !== 'undefined' && window.gapi?.surveyoptin) {
    window.gapi.surveyoptin.render({
      merchant_id: MERCHANT_ID,
      order_id: options.orderId,
      email: options.email,
      delivery_country: 'IN',
      estimated_delivery_date: deliveryDate,
    });
  }
}

/**
 * GoogleCustomerReviews component
 * Renders the GCR badge and loads the platform.js script.
 * Place this in the root layout or on pages where you want the badge.
 */
export default function GoogleCustomerReviews() {
  useEffect(() => {
    // Define the badge renderer
    window.renderBadge = function () {
      if (window.gapi?.siteverification) {
        window.gapi.siteverification.render('gcr-badge', {
          merchant_id: MERCHANT_ID,
          position: 'BOTTOM_RIGHT',
        });
      }
    };

    // Define the opt-in renderer (called by booking flow)
    window.renderOptIn = function () {
      // The opt-in is triggered manually via triggerGCRSurvey()
      // This callback is just for the platform.js onload
      if (window.gapi) {
        window.gapi.load('siteverification', function () {
          window.renderBadge?.();
        });
      }
    };

    // Load the Google Platform JS if not already loaded
    if (!document.getElementById('gcr-platform-js')) {
      const script = document.createElement('script');
      script.id = 'gcr-platform-js';
      script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup globals on unmount
      delete window.renderOptIn;
      delete window.renderBadge;
    };
  }, []);

  return (
    <>
      {/* Google Customer Reviews Badge Container */}
      <div
        id="gcr-badge"
        className="fixed bottom-4 right-4 z-40"
        style={{ minWidth: '100px', minHeight: '42px' }}
      />
    </>
  );
}
