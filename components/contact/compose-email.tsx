"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const PARTNERSHIP_TYPES = ["supporter", "event", "main", "other"] as const;
export type PartnershipType = (typeof PARTNERSHIP_TYPES)[number];

const isType = (v: string | null | undefined): v is PartnershipType => PARTNERSHIP_TYPES.includes(v as PartnershipType);

/**
 * "Write us" button: opens the visitor's mail app with subject and a short
 * template already filled in. No form, no server — they send it from their own inbox.
 */
export function ComposeEmail({
  type,
  company,
  source,
  tone = "dark",
  className,
}: {
  type?: string | null;
  company?: string | null;
  source: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const t = useTranslations("compose");
  const email = siteConfig.contactEmail;
  if (!email) return null;

  const kind = isType(type) ? type : null;
  const typeLabel = kind ? t(`types.${kind}`) : "";
  const subject = kind && company
    ? t("subjectFull", { type: typeLabel, company })
    : kind
      ? t("subjectType", { type: typeLabel, name: siteConfig.name })
      : t("subjectGeneric", { name: siteConfig.name });
  const body = t("body", { company: company ?? "", type: typeLabel });
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <a
      href={href}
      onClick={() => track("email_open", { source, ...(kind ? { type: kind } : {}) })}
      className={cn(
        "flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-shadow",
        tone === "light"
          ? "bg-ink text-cyan shadow-[5px_5px_0_var(--color-snow)] hover:shadow-[2px_2px_0_var(--color-snow)]"
          : "bg-cyan text-ink shadow-[5px_5px_0_var(--color-magenta)] hover:shadow-[2px_2px_0_var(--color-magenta)]",
        className,
      )}
    >
      <Mail aria-hidden className="size-5" /> {t("cta")} ▶
    </a>
  );
}

/** Contact page variant: reads ?type= and ?company= from links on /partners and proposals. */
export function ComposeEmailFromQuery({ source, className }: { source: string; className?: string }) {
  const params = useSearchParams();
  const t = useTranslations("compose");
  const type = params.get("type");
  return (
    <div className={className}>
      {isType(type) && type !== "other" && (
        <p className="mb-4 text-xs uppercase tracking-widest text-muted">
          {t("interest")}: <span className="font-bold text-cyan">{t(`types.${type}`)}</span>
        </p>
      )}
      <ComposeEmail type={type} company={params.get("company")} source={source} />
    </div>
  );
}
