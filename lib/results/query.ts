import { topPercent } from "./stats";
import type { Result, ResultFilters, Series } from "./types";

/** Pure filtering/sorting — safe to use in Client Components. */
export const SERIES_ORDER: Record<Series, number> = {
  "evo-online": 0,
  "evo-las-vegas": 1,
  "evo-france": 2,
  hfsplay: 3,
  other: 4,
};

/** Chronological key: real date if known, else year + circuit order. */
function chronoKey(r: Result): string {
  return r.date ?? `${r.year}-99-${SERIES_ORDER[r.series]}`;
}

export function filterResults(all: Result[], f: ResultFilters = {}): Result[] {
  const q = f.query?.trim().toLowerCase();
  const filtered = all.filter(
    (r) =>
      (!f.player || r.player === f.player) &&
      (!f.year || r.year === f.year) &&
      (!f.game || r.game === f.game) &&
      (!f.series || r.series === f.series) &&
      (!q ||
        [r.event, r.game, r.player, r.location ?? "", String(r.year)]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );
  const sort = f.sort ?? "date-desc";
  return filtered.sort((a, b) => {
    if (sort === "best")
      return topPercent(a.placement, a.entrants) - topPercent(b.placement, b.entrants);
    const cmp = chronoKey(a).localeCompare(chronoKey(b));
    return sort === "date-asc" ? cmp : -cmp;
  });
}

