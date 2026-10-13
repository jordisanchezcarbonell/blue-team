import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { formatTopPercent } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";
import { PlacementBar } from "./result-card";

export function ResultsTable({ results, caption }: { results: Result[]; caption: string }) {
  const t = useTranslations("resultsPage");
  const c = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="overflow-x-auto ring-1 ring-inset ring-line">
      <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface font-heading text-[11px] uppercase tracking-[0.15em] text-muted">
          <tr>
            {(["year", "event", "game", "player", "placement", "relative", "location", "source"] as const).map((col) => (
              <th
                key={col}
                scope="col"
                className={cn("px-4 py-3 font-semibold", (col === "placement" || col === "relative") && "text-right")}
              >
                {t(`cols.${col}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((r) => {
            const accent = r.player === "kazukun" ? "text-magenta" : "text-cyan";
            return (
              <tr key={r.id} className="border-t border-line transition-colors hover:bg-surface/60">
                <td className="px-4 py-3.5 font-heading font-semibold text-muted">{r.year}</td>
                <td className="px-4 py-3.5">
                  <span className="text-snow">{r.event}</span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    <Badge tone={r.series.startsWith("evo") ? "cyan" : "muted"}>{c(`series.${r.series}`)}</Badge>
                    {r.format === "teams" && <Badge>{c("format.teams")}</Badge>}
                    {r.needsReview && <Badge tone="warn">{c("needsReview")}</Badge>}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-snow">{r.game}</td>
                <td className={cn("px-4 py-3.5 font-heading font-bold uppercase tracking-wide", accent)}>
                  {c(`players.${r.player}`)}
                </td>
                <td className="px-4 py-3.5 text-right font-display text-base text-snow">
                  {r.placement}
                  <span className="text-xs text-muted">/{r.entrants.toLocaleString(locale)}</span>
                </td>
                <td className="w-32 px-4 py-3.5 text-right">
                  <span className={cn("font-heading text-xs font-bold", accent)}>
                    {c("top", { pct: formatTopPercent(r.placement, r.entrants) })}
                  </span>
                  <PlacementBar result={r} className="mt-1.5" />
                </td>
                <td className="px-4 py-3.5 text-muted">{r.location ?? <span className="text-warn/80">{t("locationPending")}</span>}</td>
                <td className="px-4 py-3.5">
                  <a
                    href={r.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-snow underline-offset-4 hover:text-cyan hover:underline"
                  >
                    start.gg <ExternalLink aria-hidden className="size-3" />
                    <span className="sr-only">— {c("viewOnStartgg")}</span>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
