import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { getStats } from "@/lib/results/repository";
import { formatTopPercent } from "@/lib/results/stats";

export function StatsBand() {
  const t = useTranslations("stats");
  const stats = getStats();
  const best = stats.best;
  const { documentedRecords: rec } = siteConfig;

  const tiles = [
    { value: String(siteConfig.activeSince), label: t("since"), detail: "start.gg" },
    { value: String(rec.total), label: t("records"), detail: t("recordsDetail", { k: rec.kazukun, b: rec.blueken }) },
    { value: String(stats.evoEditions.length), label: t("editions"), detail: t("editionsDetail") },
    best && {
      value: `Top ${formatTopPercent(best.placement, best.entrants)}`,
      label: t("best"),
      detail: t("bestDetail", { placement: best.placement, entrants: best.entrants, game: best.game }),
    },
  ].filter(Boolean) as { value: string; label: string; detail: string }[];

  return (
    <section className="relative border-y border-line bg-surface/40 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <p className="max-w-sm text-sm text-muted">{t("note")}</p>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden bg-line lg:grid-cols-4">
          {tiles.map((tile) => (
            <div key={tile.label} className="flex flex-col bg-ink p-5 sm:p-8">
              <dt className="order-2 mt-3 font-heading text-sm font-semibold text-snow">{tile.label}</dt>
              <dd className="order-1 font-display text-4xl leading-none text-snow sm:text-6xl">
                <span className="text-gradient">{tile.value}</span>
              </dd>
              <dd className="order-3 mt-1 text-xs text-muted">{tile.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
