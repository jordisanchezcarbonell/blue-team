import { ExternalLink, MapPin, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { bracketBeaten, formatTopPercent } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";

/** Visual bar: share of the bracket that finished behind (fuller = better). See `bracketBeaten`. */
export function PlacementBar({ result, className }: { result: Result; className?: string }) {
  const pct = Math.max(1.5, bracketBeaten(result.placement, result.entrants));
  return (
    <div aria-hidden className={cn("h-1 w-full overflow-hidden bg-line", className)}>
      <div
        className={cn(
          "h-full",
          result.player === "kazukun" ? "bg-cyan" : "bg-magenta",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ResultCard({ result, showPlayer = true }: { result: Result; showPlayer?: boolean }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const accent = result.player === "kazukun" ? "text-cyan" : "text-magenta";

  return (
    <article className="clip-corner group relative flex h-full flex-col bg-surface p-5 ring-1 ring-inset ring-line transition-colors hover:bg-surface-2">
      <header className="flex flex-wrap items-center gap-2">
        <span className="font-heading text-xs font-semibold text-muted">{result.year}</span>
        <Badge tone={result.series.startsWith("evo") ? "cyan" : "muted"}>{t(`series.${result.series}`)}</Badge>
        {result.format === "teams" && <Badge>{t("format.teams")}</Badge>}
        {result.needsReview && <Badge tone="warn">{t("needsReview")}</Badge>}
      </header>

      <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-snow">{result.game}</h3>
      <p className="text-sm text-muted">{result.event}</p>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="font-display text-4xl leading-none text-snow">
          {result.placement}
          <span className="text-xl text-muted">/{result.entrants.toLocaleString(locale)}</span>
        </p>
        <p className={cn("text-right font-heading text-sm font-bold uppercase tracking-wider", accent)}>
          {t("top", { pct: formatTopPercent(result.placement, result.entrants) })}
        </p>
      </div>
      <PlacementBar result={result} className="mt-3" />

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-xs text-muted">
        <span className="flex items-center gap-3">
          {showPlayer && <span className={cn("font-heading font-bold uppercase tracking-wider", accent)}>{t(`players.${result.player}`)}</span>}
          <span className="inline-flex items-center gap-1">
            <Users aria-hidden className="size-3.5" />
            {t("entrants", { count: result.entrants })}
          </span>
          {result.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden className="size-3.5" />
              {result.location}
            </span>
          )}
        </span>
        <a
          href={result.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-snow underline-offset-4 hover:text-cyan hover:underline"
        >
          start.gg <ExternalLink aria-hidden className="size-3" />
          <span className="sr-only">— {t("viewOnStartgg")}</span>
        </a>
      </footer>
    </article>
  );
}
