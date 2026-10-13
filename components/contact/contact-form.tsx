"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const TYPES = ["supporter", "event", "main", "other"] as const;
type PartnershipType = (typeof TYPES)[number];
type Field = "company" | "name" | "email" | "type" | "message";
type Errors = Partial<Record<Field | "form", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 20;
/** Bots usually submit instantly; humans take a few seconds. */
const MIN_FILL_MS = 3000;

export function ContactForm() {
  const t = useTranslations("contactPage");
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const [type, setType] = useState<PartnershipType | "">(
    TYPES.includes(initialType as PartnershipType) ? (initialType as PartnershipType) : "",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened" | "unconfigured">("idle");
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [mountedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (!get("company")) e.company = t("errors.required");
    if (!get("name")) e.name = t("errors.required");
    if (!get("email")) e.email = t("errors.required");
    else if (!EMAIL_RE.test(get("email"))) e.email = t("errors.email");
    if (!get("type")) e.type = t("errors.required");
    if (!get("message")) e.message = t("errors.required");
    else if (get("message").length < MIN_MESSAGE) e.message = t("errors.min", { min: MIN_MESSAGE });
    // Honeypot + timing check.
    if (get("website") || Date.now() - mountedAt < MIN_FILL_MS) e.form = t("errors.spam");
    return e;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(found) as (Field | "form")[]).find((k) => k !== "form");
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const get = (k: string) => String(data.get(k) ?? "").trim();
    const typeLabel = t(`types.${get("type") as PartnershipType}`);
    const subject = t("subject", { type: typeLabel.split(" — ")[0], company: get("company") });
    const body = [
      `${t("company")}: ${get("company")}`,
      `${t("name")}: ${get("name")}`,
      `${t("email")}: ${get("email")}`,
      `${t("type")}: ${typeLabel}`,
      "",
      get("message"),
    ].join("\n");
    setDraft(`${subject}\n\n${body}`);

    if (!siteConfig.contactEmail) {
      setStatus("unconfigured");
      return;
    }
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <TextField name="company" label={t("company")} autoComplete="organization" error={errors.company} />
      <TextField name="name" label={t("name")} autoComplete="name" error={errors.name} />
      <TextField name="email" type="email" label={t("email")} autoComplete="email" error={errors.email} className="sm:col-span-2" />

      <fieldset className="sm:col-span-2">
        <legend className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{t("type")}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-invalid={Boolean(errors.type)} aria-describedby={errors.type ? "type-error" : undefined}>
          {TYPES.map((value) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer items-center gap-3 bg-surface px-4 py-3.5 text-sm ring-1 ring-inset transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan",
                type === value ? "text-snow ring-cyan" : "text-muted ring-line hover:text-snow",
              )}
            >
              <input
                type="radio"
                name="type"
                value={value}
                checked={type === value}
                onChange={() => setType(value)}
                className="size-4 accent-cyan"
              />
              {t(`types.${value}`)}
            </label>
          ))}
        </div>
        {errors.type && <p id="type-error" className="mt-1.5 text-xs text-magenta">{errors.type}</p>}
      </fieldset>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="message" className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={MIN_MESSAGE}
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass(Boolean(errors.message), "py-3")}
        />
        {errors.message && <p id="message-error" className="text-xs text-magenta">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from humans and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        {errors.form && <p role="alert" className="text-sm text-magenta">{errors.form}</p>}
        <Button type="submit" size="lg" className="w-full sm:w-auto sm:self-start">
          <Mail aria-hidden className="size-4" />
          {t("submit")}
        </Button>
        <p className="text-xs leading-relaxed text-muted">{t("how")}</p>

        <div role="status" aria-live="polite">
          {status === "opened" && (
            <p className="bg-cyan/10 p-4 text-sm text-snow ring-1 ring-inset ring-cyan/30">
              {t("opened", { email: siteConfig.contactEmail })}
            </p>
          )}
          {status === "unconfigured" && (
            <div className="space-y-3 bg-warn/10 p-4 text-sm text-snow ring-1 ring-inset ring-warn/30">
              <p>{t("notConfigured")}</p>
              <Button type="button" variant="secondary" onClick={copyDraft}>
                {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                {copied ? t("copied") : t("copy")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean, extra = "") {
  return cn(
    "w-full bg-surface px-3.5 text-snow ring-1 ring-inset placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-cyan",
    invalid ? "ring-magenta" : "ring-line",
    extra,
  );
}

function TextField({
  name,
  label,
  error,
  type = "text",
  autoComplete,
  className,
}: {
  name: Field;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={name} className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass(Boolean(error), "h-12")}
      />
      {error && <p id={`${name}-error`} className="text-xs text-magenta">{error}</p>}
    </div>
  );
}
