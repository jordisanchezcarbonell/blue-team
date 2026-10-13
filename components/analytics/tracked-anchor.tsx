"use client";

import { track, type ConversionEvent } from "@/lib/analytics";

/** Plain <a> that records a conversion event on click (no-op when analytics is off). */
export function TrackedAnchor({
  event,
  props,
  onClick,
  ...rest
}: React.ComponentProps<"a"> & { event: ConversionEvent; props?: Record<string, string> }) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, props);
        onClick?.(e);
      }}
    />
  );
}
