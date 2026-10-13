/**
 * Central brand configuration.
 * "BEYOND THE FIGHT" is a provisional identity: change the name, claims and
 * links here and they propagate across the whole site (metadata, header,
 * footer, JSON-LD, OG image).
 */
export const siteConfig = {
  name: "BEYOND THE FIGHT",
  shortName: "BTF",
  claim: "FROM BARCELONA TO EVO.",
  subClaim: "TWO PLAYERS. ONE CREATOR. ONE JOURNEY.",
  partnerClaim: "Your brand. Our journey.",
  city: "Barcelona",
  country: "ES",
  /** First year with documented competitive activity (start.gg records). */
  activeSince: 2018,
  /** Last year covered by the documented records. */
  recordsUntil: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Commercial contact. Empty until configured via env (see .env.example). */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jordigw@gmail.com",
  /** Team social profiles. Add them here once they exist; empty = hidden. */
  social: {
    instagram: "",
    tiktok: "",
    youtube: "https://www.youtube.com/@ElMovimentOndulatori",
    x: "",
    twitch: "https://www.twitch.tv/elmovimentondulatori",
  },
  /** Total result records documented on start.gg (from profile screenshots). */
  documentedRecords: { total: 60, kazukun: 16, blueken: 44 },
} as const;

export type SiteConfig = typeof siteConfig;
