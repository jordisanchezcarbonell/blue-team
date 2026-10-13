import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { ResultsExplorer } from "@/components/results/results-explorer";
import { ResultsTable } from "@/components/results/results-table";
import { Container } from "@/components/ui/container";
import { ContactCta } from "@/components/home/contact-cta";
import { CriterionNote } from "@/components/elite/sections";
import { siteConfig } from "@/config/site";
import { players } from "@/data/team";
import type { Locale } from "@/i18n/routing";
import { getFacets, getResults, getStats } from "@/lib/results/repository";
import { formatTopPercent } from "@/lib/results/stats";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/results">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "results");
}

export default function ResultsPage() {
  const t = useTranslations("resultsPage");
  const ts = useTranslations("stats");
  const results = getResults();
  const stats = getStats();
  const facets = getFacets();
  const maxGame = Math.max(...stats.byGame.map((g) => g.count));
  const maxYear = Math.max(...stats.byYear.map((y) => y.count));

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead", { shown: results.length, total: siteConfig.documentedRecords.total })}
      >
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {players.map((p) => (
            <li key={p.id}>
              <a
                href={p.startggResults}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-snow underline-offset-4 hover:text-cyan hover:underline"
              >
                {t("fullHistory")} · {p.handle} <ExternalLink aria-hidden className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Container>
        <section aria-labelledby="stats-title" className="grid gap-px bg-line md:grid-cols-[1fr_1.4fr_1fr]">
          <h2 id="stats-title" className="sr-only">{t("statsTitle")}</h2>
          <div className="bg-ink p-6">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{t("statsTitle")}</p>
            <dl className="mt-4 grid grid-cols-2 gap-5">
              <Stat value={stats.records} label={t("recordsShown")} />
              <Stat value={stats.evoEditions.length} label={ts("editions")} />
              <Stat value={stats.games.length} label={ts("games")} />
              {stats.best && (
                <Stat value={`Top ${formatTopPercent(stats.best.placement, stats.best.entrants)}`} label={ts("best")} />
              )}
            </dl>
          </div>
          <div className="bg-ink p-6">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{t("byGame")}</p>
            <ul className="mt-4 space-y-2">
              {stats.byGame.map((g) => (
                <li key={g.game} className="grid grid-cols-[1fr_auto] items-center gap-x-3 text-sm">
                  <span className="truncate text-snow/90">{g.game}</span>
                  <span className="font-heading text-xs font-bold text-muted">{g.count}</span>
                  <span aria-hidden className="col-span-2 h-1 bg-line">
                    <span className="block h-full bg-gradient-to-r from-cyan to-magenta" style={{ width: `${(g.count / maxGame) * 100}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-6">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{t("byYear")}</p>
            <ul className="mt-4 flex h-40 items-end gap-2">
              {stats.byYear.map((y) => (
                <li key={y.year} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="font-heading text-xs font-bold text-snow">{y.count}</span>
                  <span aria-hidden className="w-full bg-cyan/80" style={{ height: `${(y.count / maxYear) * 96}px` }} />
                  <span className="font-heading text-[10px] text-muted">’{String(y.year).slice(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CriterionNote className="mt-6" />

        <div className="mt-14">
          <Suspense fallback={<ResultsTable results={results} caption={t("title")} />}>
            <ResultsExplorer results={results} facets={facets} />
          </Suspense>
        </div>
      </Container>
      <ContactCta />
    </>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1.5 text-xs text-muted">{label}</dt>
      <dd className="font-display text-3xl leading-none text-snow">{value}</dd>
    </div>
  );
}
