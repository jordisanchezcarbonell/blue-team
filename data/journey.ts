/**
 * Timeline years. Copy lives in messages (`timeline.years.<year>`); featured
 * results are pulled from the results repository by year.
 * `pending` = the team has records that year but they aren't imported yet.
 */
export const journeyYears = [
  { year: 2018, status: "milestone" },
  { year: 2021, status: "records" },
  { year: 2022, status: "records" },
  { year: 2023, status: "records" },
  { year: 2024, status: "pending" },
  { year: 2025, status: "records" },
  { year: 2026, status: "records" },
] as const;

export type JourneyYear = (typeof journeyYears)[number]["year"];
