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
    { id: "evo-2027", name: "EVO 2027", when: null, where: null, status: "target" },
    { id: "evo-france-next", name: "EVO France", when: null, where: null, status: "target" },
    { id: "europe-circuit", name: "European & Spanish circuit", when: null, where: null, status: "target" },
  ],
  currency: "EUR",
  expenses: { travel: null, hotels: null, fees: null, gear: null, production: null },
};
