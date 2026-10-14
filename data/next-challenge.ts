/**
 * "Next Challenge": goals for the upcoming season.
 * Nothing here is a confirmed participation. Set `status` to "confirmed" only
 * once registration is done; amounts stay `null` until the budget is decided.
 */
export type ChallengeStatus = "target" | "confirmed";

export interface ChallengeTarget {
  id: string;
  name: string;
  /** Free text; leave null if the organiser hasn't announced it. */
  when: string | null;
  where: string | null;
  status: ChallengeStatus;
  players: string | null;
  objective: string;
  plannedContent: string;
  sponsorshipAvailable: boolean;
}

export type ExpenseKey = "travel" | "hotels" | "fees" | "gear" | "production";

export const nextChallenge: {
  season: string;
  targets: ChallengeTarget[];
  currency: "EUR";
  /** Estimated cost per concept. null = budget in preparation. */
  expenses: Record<ExpenseKey, number | null>;
} = {
  season: "2027",
  targets: [
    { id: "evo-japan", name: "EVO Japan", when: null, where: "Japan", status: "target", players: "Kazukun + BlueKen", objective: "International competition", plannedContent: "Travel, tournament and recap content", sponsorshipAvailable: true },
    { id: "evo-france-next", name: "EVO France", when: null, where: "France", status: "target", players: "Kazukun + BlueKen", objective: "European EVO activation", plannedContent: "Tournament coverage and short-form content", sponsorshipAvailable: true },
    { id: "evo-las-vegas", name: "EVO Las Vegas", when: null, where: "Las Vegas, USA", status: "target", players: "Kazukun + BlueKen", objective: "Flagship international event", plannedContent: "Vlog, player stories and brand recap", sponsorshipAvailable: true },
    { id: "europe-circuit", name: "Other FGC events", when: null, where: null, status: "target", players: "TBD", objective: "Relevant European and Spanish competitions", plannedContent: "Defined per activation", sponsorshipAvailable: true },
  ],
  currency: "EUR",
  expenses: { travel: null, hotels: null, fees: null, gear: null, production: null },
};
