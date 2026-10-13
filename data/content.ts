/**
 * Published content portfolio. Empty on purpose: add real pieces only.
 * Example:
 * { id: "evo-france-2026-vlog", platform: "youtube", url: "https://www.youtube.com/watch?v=…", title: { es: "…", en: "…" }, date: "2026-10-12" }
 */
export type Platform = "youtube" | "tiktok" | "instagram";

export interface ContentItem {
  id: string;
  platform: Platform;
  url: string;
  title: { es: string; en: string };
  date: string;
  /** Local thumbnail under /public, optional. */
  thumbnail?: string;
}

export const contentItems: ContentItem[] = [];

/** Extracts the YouTube video id for privacy-friendly embeds (youtube-nocookie). */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m?.[1] ?? null;
}
