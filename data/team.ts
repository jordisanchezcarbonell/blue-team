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
}

export interface CreatorProfile {
  id: "creator";
  /** Unknown until the team provides it. */
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
    accent: "cyan",
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
    accent: "magenta",
  },
];

export const creator: CreatorProfile = {
  id: "creator",
  name: null,
  role: "creator",
  photo: null,
  social: {},
  accent: "snow",
};

export const getPlayer = (id: PlayerId) => players.find((p) => p.id === id)!;
