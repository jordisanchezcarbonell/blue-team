"use client";

import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { useId, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { filterResults } from "@/lib/results/query";
import type { PlayerId, Result, ResultFilters, Series } from "@/lib/results/types";
import { cn } from "@/lib/utils";
import { ResultCard } from "./result-card";
import { ResultsTable } from "./results-table";

type Facets = { years: number[]; games: string[]; series: Series[] };

const PLAYERS: PlayerId[] = ["kazukun", "blueken"];
const SORTS = ["date-desc", "date-asc", "best"] as const;
type Sort = (typeof SORTS)[number];

function parseFilters(params: URLSearchParams, facets: Facets): ResultFilters {
  const player = params.get("player");
  const year = Number(params.get("year"));
  const game = params.get("game");
  const series = params.get("series");
  const sort = params.get("sort");
  return {
    player: PLAYERS.includes(player as PlayerId) ? (player as PlayerId) : undefined,
    year: facets.years.includes(year) ? year : undefined,
    game: game && facets.games.includes(game) ? game : undefined,
    series: facets.series.includes(series as Series) ? (series as Series) : undefined,
    query: params.get("q") ?? undefined,
    sort: SORTS.includes(sort as Sort) ? (sort as Sort) : "date-desc",
  };
}

export function ResultsExplorer({ results, facets }: { results: Result[]; facets: Facets }) {
  const t = useTranslations("resultsPage");
  const c = useTranslations("common");
  const nav = useTranslations("nav");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filters = useMemo(() => parseFilters(new URLSearchParams(searchParams.toString()), facets), [searchParams, facets]);
  const filtered = useMemo(() => filterResults(results, filters), [results, filters]);
  const active = Boolean(filters.player || filters.year || filters.game || filters.series || filters.query);

  // Shallow URL update: keeps filters shareable without a server round-trip.
  function update(key: string, value: string | undefined) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  function reset() {
    window.history.replaceState(null, "", pathname);
  }

  const controls = (
    <FilterControls t={t} c={c} filters={filters} facets={facets} update={update} />
  );

  return (
    <div>
      {/* Search + sort — always visible */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <label className="relative flex-1">
          <span className="sr-only">{t("searchLabel")}</span>
          <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={filters.query ?? ""}
            onChange={(e) => update("q", e.target.value || undefined)}
            placeholder={t("search")}
            className="h-12 w-full bg-surface pl-10 pr-4 text-snow ring-1 ring-inset ring-line placeholder:text-muted/70 focus:outline-none focus:ring-cyan"
          />
        </label>
        <div className="flex gap-3">
          <SelectField
            label={t("sort")}
            value={filters.sort ?? "date-desc"}
            onChange={(v) => update("sort", v === "date-desc" ? undefined : v)}
            options={[
              { value: "date-desc", label: t("sortDateDesc") },
              { value: "date-asc", label: t("sortDateAsc") },
              { value: "best", label: t("sortBest") },
            ]}
            className="flex-1 md:w-56"
          />
          <Button
            type="button"
            variant="secondary"
            className="h-12 self-end md:hidden"
            onClick={() => dialogRef.current?.showModal()}
            aria-haspopup="dialog"
          >
            <SlidersHorizontal aria-hidden className="size-4" />
            {t("filters")}
            {active && <span className="size-1.5 rounded-full bg-magenta" aria-hidden />}
          </Button>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="mt-3 hidden gap-3 md:grid md:grid-cols-4">{controls}</div>

      {/* Mobile filters: bottom sheet */}
      <dialog
        ref={dialogRef}
        aria-labelledby="filters-title"
        className="m-0 mt-auto max-h-[85dvh] w-full max-w-none bg-ink p-0 text-snow ring-1 ring-line backdrop:bg-ink/70 backdrop:backdrop-blur-sm open:flex open:flex-col md:hidden"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-4">
          <h2 id="filters-title" className="font-heading text-lg font-semibold">{t("filters")}</h2>
          <button type="button" onClick={() => dialogRef.current?.close()} className="grid size-10 place-items-center" aria-label={nav("closeMenu")}>
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="grid gap-4 overflow-y-auto p-4">{controls}</div>
        <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
          <Button type="button" variant="secondary" onClick={reset} disabled={!active}>
            {t("reset")}
          </Button>
          <Button type="button" onClick={() => dialogRef.current?.close()}>
            {t("applyFilters", { count: filtered.length })}
          </Button>
        </div>
      </dialog>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="font-heading text-sm font-semibold text-snow" role="status" aria-live="polite">
          {t("count", { count: filtered.length })}
        </p>
        {active && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan">
            <X aria-hidden className="size-3.5" />
            {t("reset")}
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 border border-dashed border-line p-10 text-center text-muted">{t("empty")}</p>
      ) : (
        <>
          <div className="mt-4 hidden lg:block">
            <ResultsTable results={filtered} caption={t("title")} />
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:hidden">
            {filtered.map((r) => (
              <li key={r.id}>
                <ResultCard result={r} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function FilterControls({
  t,
  c,
  filters,
  facets,
  update,
}: {
  t: ReturnType<typeof useTranslations<"resultsPage">>;
  c: ReturnType<typeof useTranslations<"common">>;
  filters: ResultFilters;
  facets: Facets;
  update: (key: string, value: string | undefined) => void;
}) {
  const all = { value: "", label: t("all") };
  return (
    <>
      <SelectField
        label={t("player")}
        value={filters.player ?? ""}
        onChange={(v) => update("player", v || undefined)}
        options={[all, ...PLAYERS.map((p) => ({ value: p, label: c(`players.${p}`) }))]}
      />
      <SelectField
        label={t("year")}
        value={filters.year ? String(filters.year) : ""}
        onChange={(v) => update("year", v || undefined)}
        options={[all, ...facets.years.map((y) => ({ value: String(y), label: String(y) }))]}
      />
      <SelectField
        label={t("game")}
        value={filters.game ?? ""}
        onChange={(v) => update("game", v || undefined)}
        options={[all, ...facets.games.map((g) => ({ value: g, label: g }))]}
      />
      <SelectField
        label={t("competition")}
        value={filters.series ?? ""}
        onChange={(v) => update("series", v || undefined)}
        options={[all, ...facets.series.map((s) => ({ value: s, label: c(`series.${s}`) }))]}
      />
    </>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-12 w-full appearance-none bg-surface pl-3.5 pr-10 text-sm ring-1 ring-inset focus:outline-none focus:ring-cyan",
            value ? "text-snow ring-cyan/50" : "text-snow/80 ring-line",
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}
