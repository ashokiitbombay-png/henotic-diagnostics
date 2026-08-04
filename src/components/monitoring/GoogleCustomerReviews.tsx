"use client";

import { useEffect } from "react";

/**
 * Google Customer Reviews — Badge + Opt-In Survey
 * Merchant Center ID: 5502255117
 *
 * Two separate Google scripts:
 * 1. merchantwidget.js  → Renders the store rating badge (always visible)
 * 2. platform.js        → Powers the opt-in survey popup (triggered after booking)
 *
 * Usage:
 *   Badge:  Include <GoogleCustomerReviews /> in layout (auto-renders badge)
 *   Survey: Call triggerGCRSurvey() after booking confirmation
 *
 * @see https://support.google.com/merchants/answer/7124319
 * @see https://support.google.com/merchants/answer/7105655
 */

/* ─── Global type declarations ─── */
declare global {
  interface Window {
    renderOptIn?: () => void;
    merchantwidget?: {
      start: (config: Record<string, unknown>) => void;
    };
    gapi?: {
      load: (module: string, callback: () => void) => void;
      surveyoptin?: {
        render: (config: Record<string, unknown>) => void;
      };
    };
  }
}

const MERCHANT_ID = 5502255117;

/* ─── Opt-In Survey Trigger (exported for BookingForm) ─── */

/**
 * Call this function after a successful booking to trigger
 * the Google Customer Reviews opt-in survey popup.
 *
 * The survey asks the patient if they'd like to receive a
 * follow-up email from Google to rate their experience.
 * This is what powers store ratings in Merchant Center.
 */
export function triggerGCRSurvey(options: {
  orderId: string;
  email: string;
  estimatedDeliveryDate?: string;
}) {
  // Default delivery date = tomorrow (report delivery)
  const deliveryDate =
    options.estimatedDeliveryDate ||
    new Date(Date.now() + 86400000).toISOString().split("T")[0];

  if (typeof window === "undefined") return;

  // If platform.js is already loaded, render immediately
  if (window.gapi?.surveyoptin) {
    window.gapi.surveyoptin.render({
      merchant_id: MERCHANT_ID,
      order_id: options.orderId,
      email: options.email,
      delivery_country: "IN",
      estimated_delivery_date: deliveryDate,
    });
    return;
  }

  // Otherwise, set up renderOptIn so platform.js triggers it on load
  window.renderOptIn = function () {
    window.gapi?.load("surveyoptin", function () {
      window.gapi?.surveyoptin?.render({
        merchant_id: MERCHANT_ID,
        order_id: options.orderId,
        email: options.email,
        delivery_country: "IN",
        estimated_delivery_date: deliveryDate,
      });
    });
  };

  // Load platform.js if not already present
  if (!document.getElementById("gcr-optin-js")) {
    const script = document.createElement("script");
    script.id = "gcr-optin-js";
    script.src =
      "https://apis.google.com/js/platform.js?onload=renderOptIn";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}

/* ─── Component: Badge + Script Loader ─── */

/**
 * GoogleCustomerReviews component
 *
 * Loads TWO scripts:
 * 1. merchantwidget.js — renders the Google store rating badge
 * 2. platform.js       — pre-loads the opt-in survey library
 *
 * Place this in root layout for site-wide presence.
 */
export default function GoogleCustomerReviews() {
  useEffect(() => {
    // ━━━ SCRIPT 1: Merchant Widget Badge ━━━
    // This renders the floating Google Customer Reviews badge
    if (!document.getElementById("gcr-merchant-widget-js")) {
      const widgetScript = document.createElement("script");
      widgetScript.id = "gcr-merchant-widget-js";
      widgetScript.src =
        "https://www.gstatic.com/shopping/merchant/merchantwidget.js";
      widgetScript.defer = true;

      widgetScript.addEventListener("load", () => {
        if (window.merchantwidget) {
          window.merchantwidget.start({
            merchant_id: MERCHANT_ID,
            position: "BOTTOM_LEFT",
            region: "IN",
          });
        }
      });

      document.head.appendChild(widgetScript);
    }

    // ━━━ SCRIPT 2: Platform.js (Opt-In Survey Library Pre-load) ━━━
    // Pre-load so triggerGCRSurvey() can fire instantly after booking
    if (!document.getElementById("gcr-optin-js")) {
      window.renderOptIn = function () {
        // Just pre-load the surveyoptin module — actual render
        // happens when triggerGCRSurvey() is called from BookingForm
        window.gapi?.load("surveyoptin", function () {
          console.log("✅ [GCR] surveyoptin module pre-loaded");
        });
      };

      const platformScript = document.createElement("script");
      platformScript.id = "gcr-optin-js";
      platformScript.src =
        "https://apis.google.com/js/platform.js?onload=renderOptIn";
      platformScript.async = true;
      platformScript.defer = true;
      document.head.appendChild(platformScript);
    }

    return () => {
      delete window.renderOptIn;
    };
  }, []);

  // No DOM element needed — merchantwidget.js injects its own badge
  return null;
}
