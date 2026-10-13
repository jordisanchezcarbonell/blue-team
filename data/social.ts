/**
 * Social channels and audience metrics.
 * Fill in ONLY real, verifiable numbers taken from each platform's analytics.
 * - `followers` / `avgViews`: number or null (null = not published, nothing is shown).
 * - `updatedAt`: ISO date when the numbers were read (shown next to the metric).
 * Channels with an empty `url` are listed as "coming soon".
 */
export type SocialPlatform = "instagram" | "tiktok" | "youtube" | "twitch" | "x";

export interface SocialChannel {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
  followers: number | null;
  avgViews: number | null;
  /** Published videos/posts, when the platform shows it publicly. */
  contentCount: number | null;
  updatedAt: string | null;
}

export const socialChannels: SocialChannel[] = [
  {
    platform: "youtube",
    label: "YouTube",
    handle: "@ElMovimentOndulatori",
    url: "https://www.youtube.com/@ElMovimentOndulatori",
    // Public figures shown on the channel page, read on 2026-10-13.
    followers: 497,
    avgViews: null,
    contentCount: 827,
    updatedAt: "2026-10-13",
  },
  {
    platform: "twitch",
    label: "Twitch",
    handle: "elmovimentondulatori",
    url: "https://www.twitch.tv/elmovimentondulatori",
    // Twitch doesn't show followers publicly: copy them from the creator dashboard.
    followers: null,
    avgViews: null,
    contentCount: null,
    updatedAt: null,
  },
  { platform: "instagram", label: "Instagram", handle: "", url: "", followers: null, avgViews: null, contentCount: null, updatedAt: null },
  { platform: "tiktok", label: "TikTok", handle: "", url: "", followers: null, avgViews: null, contentCount: null, updatedAt: null },
];

export const hasSocialMetrics = () =>
  socialChannels.some((c) => c.followers !== null || c.avgViews !== null || c.contentCount !== null);
