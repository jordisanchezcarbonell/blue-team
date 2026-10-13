import { siteConfig } from "@/config/site";
import { journeyYears } from "@/data/journey";
import { players } from "@/data/team";
import { getBalancedHighlights, getHighlights, getResults, getStats } from "@/lib/results/repository";
import { isEvo } from "@/lib/results/stats";

/** Real project data shared by the three design proposals. Nothing here is invented. */
export function getDesignData() {
  const all = getResults({ sort: "date-asc" });
  const evo = getResults({ sort: "best" }).filter(isEvo);
  return {
    site: siteConfig,
    players,
    stats: getStats(),
    highlights: getBalancedHighlights(3),
    evoBest: evo.filter((r) => r.format === "singles").slice(0, 6),
    byPlayer: {
      kazukun: getHighlights("kazukun"),
      blueken: getHighlights("blueken"),
    },
    timeline: journeyYears.map((y) => ({
      ...y,
      results: all.filter((r) => r.year === y.year),
    })),
  };
}

export const designs = [
  { slug: "esports", name: "Esports Elite", tag: "A" },
  { slug: "editorial", name: "Sports Editorial", tag: "B" },
  { slug: "underground", name: "FGC Underground", tag: "C" },
  { slug: "neon", name: "Neon Chapters", tag: "D" },
] as const;

export type DesignSlug = (typeof designs)[number]["slug"];
