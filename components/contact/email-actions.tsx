"use client";

import { CalendarDays, Check, Copy, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

/**
 * Direct contact without relying on the visitor's mail app: visible address,
 * one-click copy, mailto and (optional) a booking link for a 15-minute call.
 */
export function EmailActions({ source, tone = "dark", className }: { source: string; tone?: "dark" | "light"; className?: string }) {
  const t = useTranslations("emailActions");
  const [copied, setCopied] = useState(false);
  const email = siteConfig.contactEmail;
  const light = tone === "light";

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      track("email_copy", { source });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {email ? (
        <div className={cn("flex flex-wrap items-stretch border-2", light ? "border-ink" : "border-line")}>
          <a
            href={`mailto:${email}`}
            onClick={() => track("email_open", { source })}
            className={cn("flex min-w-0 flex-1 items-center gap-2 px-4 py-3 text-sm font-bold break-all", light ? "hover:bg-ink/5" : "hover:bg-surface")}
          >
            <Mail aria-hidden className="size-4 shrink-0" /> {email}
          </a>
          <button
            type="button"
            onClick={copy}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors",
              light ? "bg-ink text-cyan hover:bg-ink/85" : "bg-cyan text-ink hover:bg-snow",
            )}
          >
            {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
            {copied ? t("copied") : t("copy")}
          </button>
        </div>
      ) : (
        <p className={cn("border-2 border-dashed px-4 py-3 text-xs uppercase tracking-widest", light ? "border-ink/30 text-ink/60" : "border-warn/50 text-warn")}>
          {t("pending")}
        </p>
      )}
      <span role="status" aria-live="polite" className="sr-only">{copied ? t("copied") : ""}</span>
      {env.bookingUrl && (
        <a
          href={env.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("booking_click", { source })}
          className={cn("inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest underline-offset-4 hover:underline", light ? "text-ink" : "text-cyan")}
        >
          <CalendarDays aria-hidden className="size-4" /> {t("book")} ↗
        </a>
      )}
    </div>
  );
}
