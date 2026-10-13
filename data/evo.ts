import type { Locale } from "@/i18n/routing";

/**
 * Editorial facts about EVO. Every item carries its source.
 * Researched and checked on 2026-10-13. Event audience/figures describe EVO,
 * never the team's own reach.
 */
export interface EvoFact {
  id: string;
  /** Short big-number or label shown prominently. */
  figure: Record<Locale, string>;
  label: Record<Locale, string>;
  sourceName: string;
  sourceUrl: string;
}

export interface EvoMilestone {
  year: string;
  text: Record<Locale, string>;
  sourceUrl: string;
}

export const evoFacts: EvoFact[] = [
  {
    id: "sf6-2023",
    figure: { es: "7.083", en: "7,083" },
    label: {
      es: "jugadores en el bracket de Street Fighter 6 de EVO 2023: el mayor bracket abierto de la historia de EVO",
      en: "players in the Street Fighter 6 bracket at Evo 2023 — the largest open bracket in Evo history",
    },
    sourceName: "evo.gg",
    sourceUrl: "https://www2.evo.gg/news/evo-2024-record",
  },
  {
    id: "unique-2024",
    figure: { es: "10.000+", en: "10,000+" },
    label: {
      es: "competidores únicos en EVO 2024 (Las Vegas)",
      en: "unique competitors at Evo 2024 (Las Vegas)",
    },
    sourceName: "Shacknews",
    sourceUrl: "https://shacknews.com/article/140397/evo-2024-competitor-record-10000",
  },
  {
    id: "since-1996",
    figure: { es: "1996", en: "1996" },
    label: {
      es: "año de origen, como Battle by the Bay en Sunnyvale (California)",
      en: "year it began, as Battle by the Bay in Sunnyvale, California",
    },
    sourceName: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Evolution_Championship_Series",
  },
];

export const evoMilestones: EvoMilestone[] = [
  {
    year: "1996",
    text: {
      es: "Nace como Battle by the Bay, un torneo de Street Fighter en el área de la bahía de San Francisco.",
      en: "Starts as Battle by the Bay, a Street Fighter tournament in the San Francisco Bay Area.",
    },
    sourceUrl: "https://en.wikipedia.org/wiki/Evolution_Championship_Series",
  },
  {
    year: "2002",
    text: {
      es: "Adopta el nombre Evolution Championship Series (EVO).",
      en: "Becomes the Evolution Championship Series (Evo).",
    },
    sourceUrl: "https://en.wikipedia.org/wiki/Evolution_Championship_Series",
  },
  {
    year: "2004",
    text: {
      es: "“Evo Moment 37”: Daigo Umehara vs. Justin Wong en Street Fighter III: 3rd Strike, uno de los momentos más famosos de los esports, reconocido por Guinness World Records.",
      en: "“Evo Moment 37”: Daigo Umehara vs. Justin Wong in Street Fighter III: 3rd Strike — one of esports' most famous moments, recognised by Guinness World Records.",
    },
    sourceUrl: "https://www.guinnessworldrecords.com/world-records/most-viewed-competitive-videogame-match",
  },
  {
    year: "2021",
    text: {
      es: "EVO Online: edición online con brackets regionales, incluida Europa.",
      en: "Evo Online: an online edition with regional brackets, including Europe.",
    },
    sourceUrl: "https://www.oneesports.gg/gaming/evo-2021-online-schedule-and-registration/",
  },
  {
    year: "2023",
    text: {
      es: "Street Fighter 6 reúne 7.083 jugadores en Las Vegas: récord de bracket abierto en EVO.",
      en: "Street Fighter 6 draws 7,083 players in Las Vegas — Evo's open-bracket record.",
    },
    sourceUrl: "https://www2.evo.gg/news/evo-2024-record",
  },
  {
    year: "2025",
    text: {
      es: "Primera EVO en Europa: EVO France, del 10 al 12 de octubre en el Palais des Expositions de Niza.",
      en: "First Evo in Europe: Evo France, 10–12 October at the Palais des Expositions in Nice.",
    },
    sourceUrl: "https://webedia-group.com/news/corporate/evo-the-biggest-fighting-video-game-competition-is-coming-to-nice-in-october-2025/",
  },
  {
    year: "2026",
    text: {
      es: "Segunda edición de EVO France en Niza, del 9 al 11 de octubre.",
      en: "Second Evo France in Nice, 9–11 October.",
    },
    sourceUrl: "https://www.invenglobal.com/articles/24221/evo-france-2026-early-bird-registration-closes-event-set-for-october-9",
  },
];

export const evoEvents = {
  lasVegas: {
    es: "El evento principal, celebrado cada verano en Las Vegas. Es donde se reúnen la élite mundial y miles de jugadores de todos los niveles.",
    en: "The flagship event, held every summer in Las Vegas, where the world's best meet thousands of players of every level.",
  },
  france: {
    es: "La edición europea de EVO, en Niza desde 2025. Acerca el formato EVO a la comunidad europea y española.",
    en: "Evo's European edition, in Nice since 2025, bringing the Evo format closer to the European and Spanish community.",
  },
} as const;
