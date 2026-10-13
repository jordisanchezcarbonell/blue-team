/**
 * Tailored sponsorship proposals, one page per brand at /[locale]/proposal/<slug>.
 *
 * Rules (same as the rest of the site):
 * - Only general, public facts about each brand (what they sell). No logos, no
 *   claims of an existing relationship, no audience figures we don't have.
 * - Everything here is a *proposal*: ideas to open a conversation, adjustable per brand.
 * - The slug is the tracking key: with analytics on, visits to each URL tell you
 *   whether a brand opened its proposal before you follow up.
 *
 * To add a brand: copy an entry, change slug/brand/copy, and send the new URL.
 */
import type { Locale } from "@/i18n/routing";

type L = Record<Locale, string>;
export type TierKey = "supporter" | "event" | "main";

export interface ProposalIdea {
  title: L;
  body: L;
  deliverables: L[];
}

export interface BrandProposal {
  slug: string;
  brand: string;
  sector: L;
  /** One-line hook under the title. */
  angle: L;
  /** Why the team fits this brand — 3 short reasons. */
  fit: L[];
  ideas: ProposalIdea[];
  /** Suggested starting point; the brand can scale up or down. */
  tier: TierKey;
  tierWhy: L;
  /** What the post-event report would measure for this brand. */
  kpis: L[];
}

export const proposals: BrandProposal[] = [
  {
    slug: "pccomponentes",
    brand: "PcComponentes",
    sector: { es: "Retail de tecnología", en: "Tech retail" },
    angle: {
      es: "El equipo con el que dos jugadores de Barcelona compiten en EVO, contado desde dentro.",
      en: "The gear two Barcelona players take to Evo, shown from the inside.",
    },
    fit: [
      {
        es: "Somos un equipo de Barcelona: la misma comunidad gamer española a la que habláis cada día.",
        en: "We're a Barcelona team: the same Spanish gaming community you talk to every day.",
      },
      {
        es: "Los juegos de lucha se juegan con monitor, consola o PC, arcade stick y auriculares: todo producto de catálogo.",
        en: "Fighting games are played on monitors, consoles or PCs, arcade sticks and headsets — all catalogue products.",
      },
      {
        es: "Contenido grabado en torneos internacionales que podéis reutilizar en vuestros canales.",
        en: "Content filmed at international tournaments that you can reuse on your own channels.",
      },
    ],
    ideas: [
      {
        title: { es: "Setup «Camino a EVO»", en: "“Road to Evo” setup" },
        body: {
          es: "Montamos y enseñamos el equipo con el que entrenamos y viajamos, con productos de vuestro catálogo.",
          en: "We build and show the setup we train and travel with, using products from your catalogue.",
        },
        deliverables: [
          { es: "1 vídeo de unboxing y montaje", en: "1 unboxing and setup video" },
          { es: "3 piezas en vertical (Reels/TikTok/Shorts)", en: "3 vertical clips (Reels/TikTok/Shorts)" },
        ],
      },
      {
        title: { es: "Código para la comunidad", en: "Community code" },
        body: {
          es: "Un código o enlace propio para la comunidad de juegos de lucha, con seguimiento de usos para medir el retorno real.",
          en: "A dedicated code or link for the fighting game community, with usage tracking to measure real return.",
        },
        deliverables: [
          { es: "Código/enlace en vídeos, bio y stream", en: "Code/link in videos, bio and stream" },
          { es: "Usos y clics en el informe", en: "Uses and clicks in the report" },
        ],
      },
      {
        title: { es: "Presencia en el torneo", en: "Tournament presence" },
        body: {
          es: "Vuestra marca en la ropa del equipo y en el contenido grabado durante el evento.",
          en: "Your brand on team apparel and in the content filmed during the event.",
        },
        deliverables: [
          { es: "Logo en camiseta durante el evento", en: "Logo on shirts during the event" },
          { es: "Fotos del equipo con la marca, con derechos de uso", en: "Team photos with the brand, usage rights included" },
        ],
      },
    ],
    tier: "event",
    tierWhy: {
      es: "Empezar con un evento (p. ej. EVO France 2027) permite medir el resultado antes de comprometer una temporada.",
      en: "Starting with one event (e.g. Evo France 2027) lets you measure results before committing to a season.",
    },
    kpis: [
      { es: "Visualizaciones e interacción de cada pieza", en: "Views and engagement per piece" },
      { es: "Clics y usos del código", en: "Clicks and code uses" },
      { es: "Fotos y minutos de presencia de marca", en: "Photos and minutes of brand presence" },
    ],
  },
  {
    slug: "razer",
    brand: "Razer",
    sector: { es: "Periféricos gaming", en: "Gaming peripherals" },
    angle: {
      es: "Periféricos en manos de jugadores que compiten en EVO, con contenido real de preparación y competición.",
      en: "Peripherals in the hands of players who compete at Evo, with real preparation and competition content.",
    },
    fit: [
      {
        es: "Competimos en EVO Las Vegas, EVO France y EVO Online desde 2021: brackets de cientos y miles de jugadores.",
        en: "We've competed at Evo Las Vegas, Evo France and Evo Online since 2021: brackets of hundreds and thousands of players.",
      },
      {
        es: "El público de los juegos de lucha valora el equipo de competición: mandos, arcade sticks y audio.",
        en: "Fighting game players care about competition gear: controllers, arcade sticks and audio.",
      },
      {
        es: "Contenido en español y en inglés para la comunidad europea.",
        en: "Content in Spanish and English for the European community.",
      },
    ],
    ideas: [
      {
        title: { es: "Equipo de competición", en: "Competition gear" },
        body: {
          es: "Usamos y enseñamos vuestros periféricos en entrenamiento y en torneo, siempre que encajen con el juego de cada jugador.",
          en: "We use and show your peripherals in training and at tournaments, as long as they suit each player's game.",
        },
        deliverables: [
          { es: "Review honesta de jugador de competición", en: "Honest review from a competitive player" },
          { es: "Presencia en el setup del stream", en: "Presence in the stream setup" },
        ],
      },
      {
        title: { es: "Serie de preparación", en: "Preparation series" },
        body: {
          es: "Vídeos cortos de las semanas previas a EVO: entrenamiento, viaje y competición.",
          en: "Short videos from the weeks before Evo: training, travel and competition.",
        },
        deliverables: [
          { es: "4–6 piezas en vertical", en: "4–6 vertical clips" },
          { es: "1 vlog del evento", en: "1 event vlog" },
        ],
      },
      {
        title: { es: "Activación con la comunidad", en: "Community activation" },
        body: {
          es: "Sorteo o reto en torneos locales de Barcelona, con vuestra marca como protagonista.",
          en: "Giveaway or challenge at Barcelona local tournaments, with your brand front and centre.",
        },
        deliverables: [
          { es: "1 acción en torneo local", en: "1 activation at a local tournament" },
          { es: "Cobertura en redes", en: "Social coverage" },
        ],
      },
    ],
    tier: "event",
    tierWhy: {
      es: "Un evento con serie de preparación da contenido suficiente para evaluar la colaboración.",
      en: "One event plus a preparation series gives enough content to evaluate the partnership.",
    },
    kpis: [
      { es: "Visualizaciones e interacción por pieza", en: "Views and engagement per piece" },
      { es: "Apariciones del producto en contenido y stream", en: "Product appearances in content and stream" },
      { es: "Participación en la activación local", en: "Participation in the local activation" },
    ],
  },
  {
    slug: "hori",
    brand: "HORI",
    sector: { es: "Mandos y arcade sticks", en: "Controllers and arcade sticks" },
    angle: {
      es: "Arcade sticks en un bracket de EVO, con jugadores que viven los juegos de lucha desde 2018.",
      en: "Arcade sticks in an Evo bracket, with players living fighting games since 2018.",
    },
    fit: [
      {
        es: "El arcade stick es la herramienta de trabajo de un jugador de juegos de lucha: encaje directo con vuestro producto.",
        en: "The arcade stick is a fighting game player's main tool: a direct fit with your products.",
      },
      {
        es: "Jugamos títulos de varias editoras (Street Fighter, Fatal Fury, Melty Blood, Guilty Gear…), en varias plataformas.",
        en: "We play titles from several publishers (Street Fighter, Fatal Fury, Melty Blood, Guilty Gear…) across platforms.",
      },
      {
        es: "Presencia en la escena europea: EVO France y torneos locales en Barcelona.",
        en: "Presence in the European scene: Evo France and local tournaments in Barcelona.",
      },
    ],
    ideas: [
      {
        title: { es: "Stick oficial del equipo", en: "Official team stick" },
        body: {
          es: "Competimos con vuestro arcade stick en EVO y en torneos locales, si se adapta al juego y estilo de cada jugador.",
          en: "We compete with your arcade stick at Evo and local tournaments, if it suits each player's game and style.",
        },
        deliverables: [
          { es: "Uso en torneo y fotos del setup", en: "Tournament use and setup photos" },
          { es: "Mención en cada pieza del evento", en: "Mention in every event piece" },
        ],
      },
      {
        title: { es: "Contenido técnico", en: "Technical content" },
        body: {
          es: "Configuración, mantenimiento y por qué un jugador de competición elige un stick: contenido útil que dura.",
          en: "Setup, maintenance and why a competitive player picks a stick: useful, evergreen content.",
        },
        deliverables: [
          { es: "1 vídeo largo + 3 piezas cortas", en: "1 long video + 3 short clips" },
        ],
      },
      {
        title: { es: "Feedback de competición", en: "Competition feedback" },
        body: {
          es: "Opinión estructurada de dos jugadores de competición sobre el producto, para vuestro equipo.",
          en: "Structured feedback from two competitive players on the product, for your team.",
        },
        deliverables: [
          { es: "Informe de uso tras el evento", en: "Usage report after the event" },
        ],
      },
    ],
    tier: "supporter",
    tierWhy: {
      es: "Una colaboración puntual con producto es una forma sencilla de empezar y ver cómo funciona.",
      en: "A one-off product collaboration is a simple way to start and see how it works.",
    },
    kpis: [
      { es: "Visualizaciones e interacción del contenido técnico", en: "Views and engagement on the technical content" },
      { es: "Apariciones del producto en torneo", en: "Product appearances at tournaments" },
      { es: "Feedback de uso", en: "Usage feedback" },
    ],
  },
];

export const getProposal = (slug: string) => proposals.find((p) => p.slug === slug);
