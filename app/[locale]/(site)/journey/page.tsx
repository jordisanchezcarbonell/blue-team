import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ResultRow } from "@/components/results/result-row";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { journeyYears } from "@/data/journey";
import type { Locale } from "@/i18n/routing";
import { getResults } from "@/lib/results/repository";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/journey">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "journey");
}

export default function JourneyPage() {
  const t = useTranslations("journeyPage");
  const tl = useTranslations("timeline");
  const c = useTranslations("common");
  const nav = useTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={<span className="text-gradient">{t("title")}</span>} lead={t("lead")} />

      <nav aria-label={t("jump")} className="sticky top-16 z-30 border-y border-line bg-ink/85 backdrop-blur-xl">
        <Container>
          <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
            {journeyYears.map(({ year, status }) => (
              <li key={year}>
                <a
                  href={`#y${year}`}
                  className={cn(
                    "block px-3 py-1.5 font-heading text-sm font-semibold transition-colors hover:text-cyan",
                    status === "pending" ? "text-muted/60" : "text-snow",
                  )}
                >
                  {year}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container className="py-16">
        <ol className="relative">
          <div aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-cyan via-[#a7a0ff] to-magenta md:left-[calc(9rem+7px)]" />
          {journeyYears.map(({ year, status }) => {
            const results = getResults({ year, sort: "best" });
            return (
              <li key={year} id={`y${year}`} className="relative scroll-mt-32 pb-16 pl-10 md:grid md:grid-cols-[9rem_1fr] md:gap-10 md:pl-0">
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-3 size-[15px] rotate-45 md:left-[9rem]",
                    status === "pending" ? "border-2 border-warn bg-ink" : "bg-cyan shadow-[0_0_20px_var(--color-cyan)]",
                  )}
                />
                <h2 className={cn("font-display text-5xl leading-none md:text-right", status === "pending" ? "text-outline" : "text-snow")}>
                  {year}
                </h2>
                <Reveal className="mt-4 md:mt-0 md:pl-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-2xl font-semibold text-snow">{tl(`years.${year}.title`)}</h3>
                    {status === "pending" && <Badge tone="warn">{c("pending")}</Badge>}
                  </div>
                  <p className="mt-2 max-w-2xl text-muted">{tl(`years.${year}.body`)}</p>
                  {results.length > 0 && (
                    <div className="clip-corner mt-6 max-w-3xl bg-surface px-5 py-2 ring-1 ring-inset ring-line">
                      <p className="pt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                        {t("resultsIn")}
                      </p>
                      <ul>
                        {results.map((r) => <ResultRow key={r.id} result={r} />)}
                      </ul>
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
          <li className="relative pl-10 md:grid md:grid-cols-[9rem_1fr] md:gap-10 md:pl-0">
            <span aria-hidden className="absolute left-0 top-3 size-[15px] rotate-45 bg-magenta shadow-[0_0_20px_var(--color-magenta)] md:left-[9rem]" />
            <p className="font-display text-5xl leading-none text-magenta md:text-right">→</p>
            <div className="mt-4 md:mt-0 md:pl-10">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-2xl font-semibold text-snow">{tl("next")}</h2>
                <Badge tone="magenta">{c("proposal")}</Badge>
              </div>
              <p className="mt-2 max-w-2xl text-muted">{tl("nextBody")}</p>
              <ButtonLink href="/partners" className="mt-6">{nav("cta")}</ButtonLink>
            </div>
          </li>
        </ol>
      </Container>
    </>
  );
}
