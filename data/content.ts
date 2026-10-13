/**
 * Published content portfolio: real pieces only.
 * Vlogs from BlueKen's YouTube channel (El Moviment Ondulatori), in Catalan.
 * Titles are kept as published. Source playlist: "De Competicions!"
 * https://www.youtube.com/playlist?list=PLtIUGFALNiPnvcrZBfXF8k4pVBGAdm0Mu
 *
 * To add a piece: { id, platform, url, title, date, event, lang, author }.
 * `event` groups pieces on /content and links them from /journey (by year).
 */
import type { PlayerId } from "@/lib/results/types";

export type Platform = "youtube" | "tiktok" | "instagram";
export type ContentLang = "ca" | "es" | "en";

export interface ContentItem {
  id: string;
  platform: Platform;
  url: string;
  /** Original title, as published. */
  title: string;
  /** Upload date (ISO). */
  date: string;
  /** Event the piece documents, e.g. "EVO 2022". */
  event: string;
  /** Year of the event (links the piece from /journey). */
  year: number;
  lang: ContentLang;
  author: PlayerId | "creator";
  /** Local thumbnail under /public, optional (YouTube uses its own). */
  thumbnail?: string;
}

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const contentChannel = {
  owner: "blueken" as PlayerId,
  name: "El Moviment Ondulatori",
  url: "https://www.youtube.com/@ElMovimentOndulatori",
  playlist: "https://www.youtube.com/playlist?list=PLtIUGFALNiPnvcrZBfXF8k4pVBGAdm0Mu",
};

const base = { platform: "youtube", lang: "ca", author: "blueken" } as const;

export const contentItems: ContentItem[] = [
  // EVO France 2025 (Nice)
  { ...base, id: "evofr25-day1", url: yt("UJiUW4MYCdE"), title: "Ens llancem a la EVO França! 🔥 Primer dia ple de tornejos i bones sensacions!", date: "2025-10-24", event: "EVO France 2025", year: 2025 },
  { ...base, id: "evofr25-arrival", url: yt("tZ4YWY2434Q"), title: "Arribem a l’EVO França: comença la batalla! 🥊🔥", date: "2025-10-20", event: "EVO France 2025", year: 2025 },
  // EVO 2023 (Las Vegas)
  { ...base, id: "evo23-reaction", url: yt("GpUfv6M4IcU"), title: "REACCIÓ A LES MEVES MILLORS/PITJORS PARTIDES EN L'EVO | #evo2023 | Van ser un desastre?", date: "2023-10-20", event: "EVO 2023", year: 2023 },
  { ...base, id: "evo23-final", url: yt("LCTdCYApbc0"), title: "🌆 TIPS, TURISME I TORNADA 🌆 EVO 2023 Vlog | Final", date: "2023-09-04", event: "EVO 2023", year: 2023 },
  { ...base, id: "evo23-day2", url: yt("tM2fyjcO-rA"), title: "🎨 El de l'ART i les primeres FINALS 🎨 EVO 2023 Vlog | Dia 2", date: "2023-09-01", event: "EVO 2023", year: 2023 },
  { ...base, id: "evo23-day1", url: yt("JPU6rSRHxFA"), title: "😱 El de l'Entrada y les pools 😱 EVO 2023 Vlog | Dia 1", date: "2023-08-28", event: "EVO 2023", year: 2023 },
  { ...base, id: "evo23-day0", url: yt("ERxXSChpTPE"), title: "✈️ El del viatge i la cua de les acreditacions! ✈️ EVO 2023 Vlog | Dia 0", date: "2023-08-25", event: "EVO 2023", year: 2023 },
  { ...base, id: "evo23-rivals", url: yt("3GhrVjPROgE"), title: "INVESTIGANT ALS MEUS RIVALS!! - CAMÍ A LA EVO 2023", date: "2023-08-02", event: "EVO 2023", year: 2023 },
  // EVO 2022 (Las Vegas)
  { ...base, id: "evo22-day3", url: yt("EK56a41wnpQ"), title: "EVO 2022 Vlog | Dia 3 i Viatge FINAL!!!", date: "2022-10-19", event: "EVO 2022", year: 2022 },
  { ...base, id: "evo22-day2", url: yt("cPKleJBRDYE"), title: "EVO 2022 Vlog | Dia 2 | EVO MOMENT 2022!", date: "2022-09-06", event: "EVO 2022", year: 2022 },
  { ...base, id: "evo22-day1", url: yt("j8Q23oefIw0"), title: "EVO 2022 Vlog | Dia 1 | Un dia que recordaré tota la meva vida!", date: "2022-08-25", event: "EVO 2022", year: 2022 },
  { ...base, id: "evo22-stage", url: yt("mvhX9xVDQfo"), title: "REACCIONO A LA MEVA PARTIDA EN L'ESCENARI | #evo2022 | Va ser un desastre?", date: "2022-08-21", event: "EVO 2022", year: 2022 },
  { ...base, id: "evo22-day0", url: yt("Wir4Tdr8rg0"), title: "EVO 2022 Vlog | Dia 0 | El viatge a Las Vegas!", date: "2022-08-14", event: "EVO 2022", year: 2022 },
  { ...base, id: "evo22-thanks", url: yt("mNbiN4CHd08"), title: "MOLTES GRÀCIES A TOTS - EVO2022", date: "2022-08-10", event: "EVO 2022", year: 2022 },
  { ...base, id: "evo22-why", url: yt("TviHlxI1dj4"), title: "Per què m'apunto al MeltyBlood? - EVO 2022", date: "2022-08-04", event: "EVO 2022", year: 2022 },
];

/** Pieces grouped by event, newest event first (items keep their order). */
export function contentByEvent() {
  const groups = new Map<string, ContentItem[]>();
  for (const item of contentItems) groups.set(item.event, [...(groups.get(item.event) ?? []), item]);
  return [...groups.entries()].map(([event, items]) => ({ event, year: items[0].year, items }));
}

export const contentForYear = (year: number) => contentItems.filter((i) => i.year === year);

/** Extracts the YouTube video id for privacy-friendly embeds (youtube-nocookie). */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m?.[1] ?? null;
}
