import data from "@/data/results.json";
import { filterResults, SERIES_ORDER } from "./query";
import { computeStats } from "./stats";
import type { PlayerId, Result, ResultFilters } from "./types";

/**
 * Data-access layer for competitive results.
 * v1 reads the local, typed `data/results.json`. To migrate to PostgreSQL or
 * Strapi, replace `loadAll()` with a query — every consumer goes through the
 * functions below, so no component needs to change.
 */
const ALL = data as Result[];

function loadAll(): Result[] {
  return ALL;
}

export function getResults(filters?: ResultFilters): Result[] {
  return filterResults(loadAll(), filters);
}

export function getPlayerResults(player: PlayerId): Result[] {
  return getResults({ player });
}

export function getHighlights(player?: PlayerId): Result[] {
  return getResults({ player, sort: "best" }).filter((r) => r.highlight);
}

/** Featured results interleaved by player, so both players are represented. */
export function getBalancedHighlights(perPlayer = 3): Result[] {
  const k = getHighlights("kazukun").slice(0, perPlayer);
  const b = getHighlights("blueken").slice(0, perPlayer);
  return Array.from({ length: perPlayer }, (_, i) => [b[i], k[i]]).flat().filter(Boolean);
}

export function getStats(player?: PlayerId) {
  return computeStats(getResults({ player }));
}

export function getFacets() {
  const all = loadAll();
  return {
    years: [...new Set(all.map((r) => r.year))].sort((a, b) => b - a),
    games: [...new Set(all.map((r) => r.game))].sort(),
    series: [...new Set(all.map((r) => r.series))].sort(
      (a, b) => SERIES_ORDER[a] - SERIES_ORDER[b],
    ),
  };
}
