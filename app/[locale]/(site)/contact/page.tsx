import type { Metadata } from "next";
import { Check, Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Suspense } from "react";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { ComposeEmail, ComposeEmailFromQuery } from "@/components/contact/compose-email";
import { EmailActions } from "@/components/contact/email-actions";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";
import { missingConfig } from "@/lib/env";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "contact");
}

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const pk = useTranslations("packages");
  const locale = useLocale();

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={<span className="text-gradient">{t("title")}</span>} lead={t("lead")} />
      {process.env.NODE_ENV !== "production" && missingConfig.length > 0 && (
        <Container className="mb-10">
          <div role="note" className="border border-dashed border-warn/50 bg-warn/[0.06] p-5 text-sm">
            <p className="font-heading font-semibold text-warn">{t("setup.title")}</p>
            <p className="mt-1 text-muted">{t("setup.body")}</p>
            <ul className="mt-3 space-y-1.5">
              {missingConfig.map((m) => (
                <li key={m.key}>
                  <code className="bg-ink px-1.5 py-0.5 text-snow">{m.key}</code> <span className="text-muted">— {m.why}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      )}
      <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative bg-surface/50 p-6 ring-1 ring-inset ring-line sm:p-10">
          <h2 className="font-display text-3xl uppercase text-snow sm:text-4xl">{t("write")}</h2>
          <Suspense fallback={<ComposeEmail source="contact" className="mt-6" />}>
            <ComposeEmailFromQuery source="contact" className="mt-6" />
          </Suspense>
          <h3 className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-snow">{t("include")}</h3>
          <ul className="mt-4 space-y-3">
            {(t.raw("includeItems") as string[]).map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" /> {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-l-4 border-magenta pl-3 text-xs text-muted">{t("templateNote")}</p>
        </div>
        <aside className="space-y-10">
          <div>
            <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("direct")}</h2>
            <EmailActions source="contact" className="mt-3" />
            <p className="mt-3 text-sm text-muted">{t("response")}</p>
            <TrackedAnchor
              href={`/media-kit/beyond-the-fight-media-kit-${locale}.pdf`}
              download
              event="media_kit_download"
              props={{ source: "contact" }}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-snow hover:text-cyan"
            >
              <Download aria-hidden className="size-4" /> {t("mediaKit")}
            </TrackedAnchor>
          </div>
          <div>
            <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{pk("eyebrow")}</h2>
            <ul className="mt-4 space-y-4">
              {(["supporter", "event", "main"] as const).map((tier) => (
                <li key={tier} className="border-l-2 border-line pl-4">
                  <p className="font-heading font-semibold text-snow">{pk(`tiers.${tier}.name`)}</p>
                  <p className="text-sm text-muted">{pk(`tiers.${tier}.tagline`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </>
  );
}
