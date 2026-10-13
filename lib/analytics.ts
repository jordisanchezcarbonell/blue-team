"use client";

import { track as vercelTrack } from "@vercel/analytics";
import { env } from "@/lib/env";

/** Conversion events. No personal data is ever sent — only the event name and coarse context. */
export type ConversionEvent = "email_copy" | "email_open" | "mailto_draft" | "booking_click" | "media_kit_download" | "proposal_cta";

export function track(event: ConversionEvent, props?: Record<string, string>) {
  if (!env.analytics) return;
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break the page.
  }
}
