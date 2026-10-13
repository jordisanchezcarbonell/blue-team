export type PlayerId = "kazukun" | "blueken";

/** Competition circuit the record belongs to. Used for the "competition" filter. */
export type Series =
  | "evo-las-vegas"
  | "evo-france"
  | "evo-online"
  | "hfsplay"
  | "other";

export type ResultFormat = "singles" | "teams";

export interface Result {
  /** Stable slug: `${player}-${year}-${series}-${game}` */
  id: string;
  player: PlayerId;
  year: number;
  /** ISO date (YYYY-MM-DD) when known. `null` until verified. */
  date: string | null;
  /** Event name as it appears on start.gg (may be abbreviated). */
  event: string;
  series: Series;
  game: string;
  /** Final placement (start.gg uses tied placements in double elimination, e.g. 25, 49, 97…). */
  placement: number;
  entrants: number;
  format: ResultFormat;
  /** City / country, or "Online". `null` when not yet verified. */
  location: string | null;
  /** Link to the original source (start.gg results page). Always preserved. */
  sourceUrl: string;
  /** Some event / game names come from abbreviated screenshots and must be checked before treating them as final. */
  needsReview: boolean;
  /** Featured in the commercial landing. */
  highlight: boolean;
}

export interface ResultFilters {
  player?: PlayerId;
  year?: number;
  game?: string;
  series?: Series;
  query?: string;
  sort?: "date-desc" | "date-asc" | "best";
}
