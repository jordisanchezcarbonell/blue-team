import type { PlayerId } from "@/lib/results/types";

export interface PlayerProfile {
  id: PlayerId;
  handle: string;
  role: "player";
  startggUser: string;
  startggResults: string;
  games: string[];
  events: string[];
  /** Path under /public. `null` until a real photo is provided — never use stock or AI images. */
  photo: string | null;
  accent: "cyan" | "magenta";
  /** Own YouTube channel, if any. */
  youtube?: { name: string; url: string };
}

export interface CreatorProfile {
  id: "creator";
  /** Alias shown on the site. `null` = not provided yet. */
  name: string | null;
  role: "creator";
  photo: string | null;
  social: { instagram?: string; tiktok?: string; youtube?: string };
  accent: "snow";
}

export const players: PlayerProfile[] = [
  {
    id: "kazukun",
    handle: "Kazukun",
    role: "player",
    startggUser: "https://www.start.gg/user/94aefdae",
    startggResults: "https://www.start.gg/user/94aefdae/results",
    games: [
      "Street Fighter 6",
      "Street Fighter V",
      "Ultra Street Fighter IV",
      "Fatal Fury: City of the Wolves",
      "Marvel Tōkon",
      "Avatar Legends",
      "Guilty Gear",
    ],
    events: ["EVO Las Vegas", "EVO France", "HFSPlay"],
    photo: null,
    accent: "magenta",
  },
  {
    id: "blueken",
    handle: "BlueKen",
    role: "player",
    startggUser: "https://www.start.gg/user/ec511a2a",
    startggResults: "https://www.start.gg/user/ec511a2a/results",
    games: [
      "Melty Blood: Type Lumina",
      "Fatal Fury: City of the Wolves",
      "Hunter × Hunter: Nen × Impact",
      "Street Fighter",
      "Guilty Gear",
      "2XKO",
      "Dragon Ball FighterZ",
      "Power Rangers",
    ],
    events: [
      "EVO Online",
      "EVO Las Vegas",
      "EVO France",
      "HFSPlay",
      "Fighting Holidays",
      "Barcelona locals",
    ],
    photo: null,
    accent: "cyan",
    youtube: { name: "El Moviment Ondulatori", url: "https://www.youtube.com/@ElMovimentOndulatori" },
  },
];

export const creator: CreatorProfile = {
  id: "creator",
  name: "Gise",
  role: "creator",
  photo: null,
  social: {},
  accent: "snow",
};

export const getPlayer = (id: PlayerId) => players.find((p) => p.id === id)!;
