import { ArrowRight, BedDouble, Clapperboard, Gamepad2, Plane, Ticket, Trophy, Check, X, Plus } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ContactCta } from "@/components/home/contact-cta";
import { HighlightResults } from "@/components/home/highlight-results";
import { SponsorBenefits } from "@/components/home/sponsor-benefits";
import { StatsBand } from "@/components/home/stats-band";
import { PageHero } from "@/components/layout/page-hero";
import { ReportSample } from "@/components/partners/report-sample";
import { Packages } from "@/components/partners/packages";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/routing";
import { buildMetadata, jsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "partners");
}

const fund = [
  { key: "travel", icon: Plane },
  { key: "hotels", icon: BedDouble },
  { key: "fees", icon: Ticket },
  { key: "gear", icon: Gamepad2 },
  { key: "production", icon: Clapperboard },
  { key: "season", icon: Trophy },
] as const;

export default function PartnersPage() {
  const t = useTranslations("partnersPage");
  const nav = useTranslations("nav");
  const process = t.raw("process") as { title: string; body: string }[];
  const promise = t.raw("promise") as string[];
  const faq = t.raw("faq") as { q: string; a: string }[];
  const ideal = t.raw("ideal") as string[];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <PageHero eyebrow={t("eyebrow")} title={<span className="text-gradient">{t("title")}</span>} lead={t("lead")}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg">
            {nav("cta")} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="#packages" size="lg" variant="secondary">
            Sponsor Our Journey
          </ButtonLink>
        </div>
      </PageHero>

      <Container>
        <section aria-labelledby="fund-title" className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 id="fund-title" className="font-display text-3xl uppercase leading-tight text-snow sm:text-4xl">{t("fundTitle")}</h2>
            <h3 className="mt-8 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted">{t("idealTitle")}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ideal.map((i) => <li key={i}><Badge>{i}</Badge></li>)}
            </ul>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
            {fund.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col gap-4 bg-ink p-5 sm:p-7">
                <Icon aria-hidden className="size-6 text-magenta" />
                <span className="font-heading font-semibold text-snow">{t(`fund.${key}`)}</span>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <div className="mt-24">
        <StatsBand />
      </div>
      <HighlightResults />
      <SponsorBenefits />
      <Packages />
      <ReportSample className="border-t-2 border-line" />

      <Container className="space-y-24">
        <section aria-labelledby="process-title">
          <SectionHeading title={<span id="process-title">{t("processTitle")}</span>} />
          <ol className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="bg-ink p-6 sm:p-8">
                <span className="font-display text-4xl text-gradient">0{i + 1}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-snow">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="promise-title" className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="promise-title" className="font-display text-3xl uppercase leading-tight text-snow sm:text-4xl">{t("promiseTitle")}</h2>
            <ul className="mt-8 space-y-4">
              {promise.map((p, i) => {
                const negative = i === promise.length - 1;
                return (
                  <li key={p} className="flex gap-3 text-snow/90">
                    {negative ? (
                      <X aria-hidden className="mt-0.5 size-5 shrink-0 text-warn" />
                    ) : (
                      <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-cyan" />
                    )}
                    {p}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl uppercase leading-tight text-snow sm:text-4xl">{t("faqTitle")}</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faq.map((f) => (
                <details key={f.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading font-semibold text-snow [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus aria-hidden className="size-4 shrink-0 text-cyan transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Container>

      <div className="mt-12">
        <ContactCta />
      </div>
    </>
  );
}
