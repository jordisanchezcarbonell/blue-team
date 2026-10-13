import type { Result, Series } from "./types";

/** Share of the bracket finishing at or above this placement, as a percentage. */
export function topPercent(placement: number, entrants: number): number {
  if (entrants <= 0) return 100;
  return (placement / entrants) * 100;
}

/**
 * Share of the bracket that did NOT finish ahead of this placement, as a percentage.
 * Criterion: (entrants − placement) ÷ entrants. start.gg publishes tied
 * placements (e.g. "25th" = tied 25th–32nd), so the figure includes players who
 * finished level with us; it is labelled "level or behind", never "beaten".
 */
export function bracketBeaten(placement: number, entrants: number): number {
  if (entrants <= 0) return 0;
  return Math.max(0, ((entrants - placement) / entrants) * 100);
}

/** Human label: "Top 6.1%" under 10%, otherwise rounded up to an integer ("Top 22%"). */
export function formatTopPercent(placement: number, entrants: number): string {
  const pct = topPercent(placement, entrants);
  if (pct < 10) return `${(Math.ceil(pct * 10) / 10).toFixed(1)}%`;
  return `${Math.ceil(pct)}%`;
}

const EVO_SERIES: Series[] = ["evo-las-vegas", "evo-france", "evo-online"];

export const isEvo = (r: Result) => EVO_SERIES.includes(r.series);

/** Ranks by placement relative to bracket size (lower is better). Team events are excluded from "best" comparisons. */
export function bestResults(results: Result[], limit = 3): Result[] {
  return [...results]
    .filter((r) => r.format === "singles")
    .sort(
      (a, b) =>
        topPercent(a.placement, a.entrants) - topPercent(b.placement, b.entrants),
    )
    .slice(0, limit);
}

export interface ResultStats {
  records: number;
  /** Distinct EVO editions (event name + year) represented. */
  evoEditions: string[];
  evoRecords: number;
  games: string[];
  years: number[];
  best: Result | undefined;
  byGame: { game: string; count: number; best: Result }[];
  byYear: { year: number; count: number }[];
}

export function computeStats(results: Result[]): ResultStats {
  const evo = results.filter(isEvo);
  // "EVO France 2025 – USF4" is a side event of the same edition → normalise by series + year.
  const evoEditions = [...new Set(evo.map((r) => `${r.series}:${r.year}`))].sort();

  const gameMap = new Map<string, Result[]>();
  for (const r of results) {
    gameMap.set(r.game, [...(gameMap.get(r.game) ?? []), r]);
  }
  const byGame = [...gameMap.entries()]
    .map(([game, rs]) => ({
      game,
      count: rs.length,
      best: bestResults(rs, 1)[0] ?? rs[0],
    }))
    .sort((a, b) => b.count - a.count || a.game.localeCompare(b.game));

  const yearMap = new Map<number, number>();
  for (const r of results) yearMap.set(r.year, (yearMap.get(r.year) ?? 0) + 1);
  const byYear = [...yearMap.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  return {
    records: results.length,
    evoEditions,
    evoRecords: evo.length,
    games: [...gameMap.keys()].sort(),
    years: byYear.map((y) => y.year),
    best: bestResults(results, 1)[0],
    byGame,
    byYear,
  };
}
