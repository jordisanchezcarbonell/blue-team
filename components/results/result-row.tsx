import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { formatTopPercent } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";
import { PlacementBar } from "./result-card";

/** Compact one-line result used in the journey timeline. */
export function ResultRow({ result }: { result: Result }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const accent = result.player === "kazukun" ? "text-magenta" : "text-cyan";
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-line py-3 last:border-0">
      <div className="min-w-0">
        <p className="truncate font-heading text-sm font-semibold text-snow">
          <span className={cn("mr-2 uppercase", accent)}>{t(`players.${result.player}`)}</span>
          {result.game}
        </p>
        <p className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {result.event}
          {result.format === "teams" && <Badge>{t("format.teams")}</Badge>}
        </p>
      </div>
      <div className="flex items-center gap-3 text-right">
        <span>
          <span className="block font-display text-lg leading-none text-snow">
            {result.placement}
            <span className="text-sm text-muted">/{result.entrants.toLocaleString(locale)}</span>
          </span>
          <span className={cn("text-[11px] font-semibold uppercase", accent)}>
            {t("top", { pct: formatTopPercent(result.placement, result.entrants) })}
          </span>
        </span>
        <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-cyan">
          <ExternalLink className="size-4" aria-hidden />
          <span className="sr-only">{t("viewOnStartgg")}</span>
        </a>
      </div>
      <PlacementBar result={result} className="col-span-2" />
    </li>
  );
}
