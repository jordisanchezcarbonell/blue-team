/**
 * Real photos and videos of the team. Leave `null` until real material exists:
 * the site then renders a designed fallback instead of an empty frame.
 * Photos go in /public/media/… (e.g. "/media/kazukun.jpg").
 * Never use stock or AI-generated images presented as the team.
 */
export interface Photo {
  src: string;
  alt: { es: string; en: string };
  credit?: string;
}

export interface Video {
  /** YouTube video id (11 chars). Embedded via youtube-nocookie. */
  youtubeId: string;
  title: { es: string; en: string };
}

export const media: {
  players: Record<"kazukun" | "blueken" | "creator", Photo | null>;
  hero: Photo | null;
  showreel: Video | null;
  gallery: Photo[];
} = {
  players: { kazukun: null, blueken: null, creator: null },
  hero: null,
  // Latest vlog from BlueKen's channel (in Catalan). Replace with a real showreel when there is one.
  showreel: {
    youtubeId: "UJiUW4MYCdE",
    title: { es: "EVO France 2025 · Vlog del primer día (en catalán)", en: "Evo France 2025 · Day 1 vlog (in Catalan)" },
  },
  gallery: [],
};
