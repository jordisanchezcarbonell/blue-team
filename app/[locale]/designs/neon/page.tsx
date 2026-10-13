import type { Metadata } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";
import { DesignSwitcher } from "@/components/designs/design-switcher";
import { Bracket, Globe, Rings, Sparkles, Squiggle, Star, Waves } from "@/components/designs/neon/line-art";
import { CursorDot, NeonRail } from "@/components/designs/neon/rail";
import { siteConfig } from "@/config/site";
import { players } from "@/data/team";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getHighlights, getResults } from "@/lib/results/repository";
import { formatTopPercent } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-archivo-wide", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-inter-tight", display: "swap" });

export const metadata: Metadata = { title: "D · Neon Chapters" };

/** Extended grotesk: Archivo at its widest. */
const wide = "font-[family-name:var(--font-archivo-wide)] [font-stretch:125%] font-extrabold uppercase";
const KANJI = ["一", "二", "三", "四", "五", "六", "七"];

type Tone = "red" | "cyan" | "violet" | "amber";
const toneColor: Record<Tone, string> = { red: "#FF2A55", cyan: "#4FE3FF", violet: "#9B6BFF", amber: "#FF9A3C" };

const copy = {
  es: {
    kana: "ビヨンド・ザ・ファイト",
    tagline: "Una historia competitiva sobre dos hermanos, una cámara y los brackets más grandes de los juegos de lucha.",
    chapters: "Capítulos 01—07",
    drag: "Arrastra o desplaza en horizontal",
    chapter: "Capítulo",
    open: "Abrir capítulo",
    photo: "Foto real pendiente",
    photoHint: "Espacio para fotografía nocturna del equipo en el evento",
    more: "Ver historial completo",
    collab: "Let's collaborate",
    collabBody: "Tu marca dentro de la historia: viajes, inscripciones, equipamiento y contenido producido desde dentro del bracket.",
    contact: "Contactar",
    disclaimer: "Jugadores independientes. Sin relación oficial con Evolution Championship Series.",
    creator: "Creadora de contenido",
    pending: "Pendiente",
    best: "Mejor resultado",
    teams: "Equipos",
    rail: "Capítulos de la historia",
  },
  en: {
    kana: "ビヨンド・ザ・ファイト",
    tagline: "A competitive tale about two brothers, one camera and the biggest brackets in fighting games.",
    chapters: "Chapters 01—07",
    drag: "Drag or scroll sideways",
    chapter: "Chapter",
    open: "Open chapter",
    photo: "Real photo pending",
    photoHint: "Space for night photography of the team at the event",
    more: "See full history",
    collab: "Let's collaborate",
    collabBody: "Your brand inside the story: travel, entry fees, equipment and content produced from inside the bracket.",
    contact: "Get in touch",
    disclaimer: "Independent players. No official relationship with the Evolution Championship Series.",
    creator: "Content creator",
    pending: "Pending",
    best: "Best result",
    teams: "Teams",
    rail: "Story chapters",
  },
} as const;

export default function NeonDesign() {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const t = useTranslations();

  const vegas = getResults({ series: "evo-las-vegas", sort: "best" });
  const nice = getResults({ series: "evo-france", sort: "best" });
  const online = getResults({ series: "evo-online" });
  const other = [...getResults({ series: "hfsplay" }), ...getResults({ series: "other" })];

  const chapters: {
    id: string;
    title: string;
    kana: string;
    years: string;
    tone: Tone;
    art: React.ReactNode;
    body: React.ReactNode;
  }[] = [
    {
      id: "barcelona",
      title: "Barcelona",
      kana: "バルセロナ",
      years: `${siteConfig.activeSince}`,
      tone: "violet",
      art: <Sparkles />,
      body: (
        <>
          <p>{t("timeline.years.2018.body")}</p>
          <p>{t("teamIntro.body")}</p>
        </>
      ),
    },
    {
      id: "online",
      title: "EVO Online",
      kana: "オンライン",
      years: "2021",
      tone: "cyan",
      art: <Globe />,
      body: (
        <>
          <p>{t("timeline.years.2021.body")}</p>
          <ResultList results={online} locale={locale} teamsLabel={c.teams} />
        </>
      ),
    },
    {
      id: "las-vegas",
      title: "Las Vegas",
      kana: "ラスベガス",
      years: "2022 — 2023",
      tone: "red",
      art: <Rings />,
      body: (
        <>
          <p>{t("timeline.years.2022.body")} {t("timeline.years.2023.body")}</p>
          <ResultList results={vegas} locale={locale} teamsLabel={c.teams} />
        </>
      ),
    },
    {
      id: "nice",
      title: "Nice",
      kana: "ニース",
      years: "2025 — 2026",
      tone: "amber",
      art: <Bracket />,
      body: (
        <>
          <p>{t("timeline.years.2025.body")} {t("timeline.years.2026.body")}</p>
          <ResultList results={[...nice.slice(0, 5), ...other]} locale={locale} teamsLabel={c.teams} />
          <Link href="/results" className="inline-block text-xs font-semibold uppercase tracking-wider underline underline-offset-4">
            {c.more} ({nice.length + other.length + vegas.length + online.length}) →
          </Link>
        </>
      ),
    },
    {
      id: "roster",
      title: "The Roster",
      kana: "ロスター",
      years: "P1 · P2 · P3",
      tone: "cyan",
      art: <Star />,
      body: (
        <div className="space-y-6">
          {players.map((p) => {
            const best = getHighlights(p.id)[0];
            return (
              <div key={p.id} className="border-t border-current/20 pt-4">
                <p className={cn(wide, "text-3xl")}>{p.handle}</p>
                <p className="mt-1 text-sm opacity-70">{p.games.slice(0, 4).join(" · ")}</p>
                {best && (
                  <p className="mt-2 text-sm">
                    {c.best}: <strong>{best.placement}/{best.entrants.toLocaleString(locale)}</strong> — {best.game}, {best.event}
                  </p>
                )}
              </div>
            );
          })}
          <div className="border-t border-current/20 pt-4">
            <p className={cn(wide, "text-3xl opacity-40")}>???</p>
            <p className="mt-1 text-sm opacity-70">{c.creator} · {c.pending}</p>
          </div>
        </div>
      ),
    },
    {
      id: "content",
      title: "Content",
      kana: "コンテンツ",
      years: "Reels · TikTok · Shorts",
      tone: "violet",
      art: <Waves />,
      body: (
        <>
          <p>{t("production.body")}</p>
          <ol className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {(["vertical", "vlog", "photo", "interviews", "bts", "branded"] as const).map((k, i) => (
              <li key={k} className="flex gap-3 border-t border-current/15 pt-3 text-sm">
                <span className="opacity-40">{String(i + 1).padStart(2, "0")}</span>
                <span>{t(`production.formats.${k}.title`)}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs uppercase tracking-wider opacity-60">{t("production.status")}</p>
        </>
      ),
    },
    {
      id: "partners",
      title: "Partners",
      kana: "パートナー",
      years: siteConfig.partnerClaim,
      tone: "red",
      art: <Sparkles />,
      body: (
        <>
          <p>{t("benefits.body")}</p>
          <div className="space-y-3">
            {(["supporter", "event", "main"] as const).map((tier) => (
              <Link
                key={tier}
                href={{ pathname: "/contact", query: { type: tier } }}
                className={cn(
                  "group flex items-center justify-between gap-4 border border-current/20 px-4 py-3 transition-colors hover:border-current",
                  tier === "main" && "bg-[#0A0A0C] text-white",
                )}
              >
                <span>
                  <span className={cn(wide, "block text-lg")}>{t(`packages.tiers.${tier}.name`)}</span>
                  <span className="block text-xs opacity-70">{(t.raw(`packages.tiers.${tier}.items`) as string[]).slice(0, 3).join(" · ")}</span>
                </span>
                <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            ))}
          </div>
          <p className="text-xs uppercase tracking-wider opacity-60">{t("packages.price")}</p>
        </>
      ),
    },
  ];

  return (
    <div className={cn(archivo.variable, interTight.variable, "min-h-dvh bg-[#0A0A0C] font-[family-name:var(--font-inter-tight)] text-white antialiased lg:h-dvh lg:overflow-hidden")}>
      <CursorDot />

      {/* Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-6 border-b border-white/10 bg-[#0A0A0C] px-4 sm:px-6">
        <a href="#cover" className="flex items-baseline gap-3">
          <span className={cn(wide, "text-sm")}>BTF</span>
          <span className="hidden text-[11px] text-white/60 sm:inline">{c.kana} ©{siteConfig.activeSince}</span>
        </a>
        <nav aria-label={c.chapters} className="hidden lg:block">
          <ol className="flex gap-1 text-[11px] uppercase tracking-wider">
            {chapters.map((ch, i) => (
              <li key={ch.id}>
                <a href={`#chapter-${ch.id}`} className="block px-2.5 py-1.5 text-white/55 transition-colors hover:bg-white hover:text-black">
                  {String(i + 1).padStart(2, "0")} {ch.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <a href="#contact" className="bg-[#B8FF2C] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-white">
          {t("nav.cta")}
        </a>
      </header>

      <main id="main">
        <NeonRail label={c.rail}>
          {/* COVER */}
          <section id="cover" className="relative flex shrink-0 flex-col justify-between bg-[#E7E6E1] p-6 text-[#0A0A0C] sm:p-10 lg:h-full lg:w-[36rem]">
            <div className="flex items-start justify-between gap-6 lg:block">
              <h1 className={cn(wide, "text-[clamp(3rem,14vw,6rem)] leading-[0.82] tracking-[-0.02em] lg:hidden")}>
                From BCN
                <br />
                to EVO.
              </h1>
              {/* Vertical title, desktop */}
              <div aria-hidden className="hidden h-[calc(100dvh-16rem)] gap-1 lg:flex">
                {["From BCN", "to EVO."].map((line) => (
                  <span
                    key={line}
                    className={cn(wide, "block whitespace-nowrap text-[min(8.5rem,11vh)] leading-[0.82] tracking-[-0.02em] [writing-mode:vertical-rl] rotate-180")}
                  >
                    {line}
                  </span>
                ))}
              </div>
              <p className="hidden shrink-0 text-xs leading-snug sm:block lg:absolute lg:right-10 lg:top-10">
                {c.kana}
                <br />©{siteConfig.activeSince}
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="sr-only lg:not-sr-only">{siteConfig.claim}</p>
              <p className="max-w-sm text-lg font-medium uppercase leading-tight lg:mt-4">{c.tagline}</p>
              <div className="mt-8 flex items-center justify-between border-t border-black/20 pt-4 text-sm">
                <span>{c.chapters}</span>
                <span aria-hidden>→</span>
              </div>
              <p className="mt-3 hidden text-sm italic opacity-70 lg:block">{c.drag}</p>
            </div>
          </section>

          {chapters.map((ch, i) => (
            <Chapter key={ch.id} index={i} chapter={ch} labels={c} />
          ))}

          {/* CONTACT */}
          <section id="contact" className="flex shrink-0 flex-col justify-between bg-[#B8FF2C] p-6 text-black sm:p-10 lg:h-full lg:min-w-[48rem] lg:flex-1">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider">
              <span>{c.chapter} 08</span>
              <span>第八章</span>
            </div>
            <div className="py-16 lg:py-0">
              <h2 className={cn(wide, "text-[clamp(2.2rem,8.5vw,4.25rem)] italic leading-[0.88]")}>{c.collab}</h2>
              <p className="mt-6 max-w-md text-lg">{c.collabBody}</p>
              <Link href="/contact" className="group mt-8 inline-flex items-center gap-4 bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[#B8FF2C]">
                {c.contact} <span className="transition-transform group-hover:translate-x-1">↘↘↘</span>
              </Link>
            </div>
            <p className="pb-10 text-[11px] uppercase tracking-wider opacity-70 lg:pb-6">
              © {siteConfig.recordsUntil} {siteConfig.name} — {c.disclaimer}
            </p>
          </section>
        </NeonRail>
      </main>
      <DesignSwitcher current="neon" />
    </div>
  );
}

function Chapter({
  index,
  chapter,
  labels,
}: {
  index: number;
  chapter: { id: string; title: string; kana: string; years: string; tone: Tone; art: React.ReactNode; body: React.ReactNode };
  labels: (typeof copy)[Locale];
}) {
  const n = String(index + 1).padStart(2, "0");
  const color = toneColor[chapter.tone];
  const light = index % 2 === 1;

  return (
    <>
      {/* Atmosphere panel — abstract neon, explicitly not a photo */}
      <section
        aria-label={`${labels.chapter} ${n} — ${chapter.title}`}
        className="relative isolate flex min-h-[78svh] shrink-0 flex-col justify-end overflow-hidden bg-[#08080B] p-6 sm:p-8 lg:h-full lg:min-h-0 lg:w-[30rem]"
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -right-24 top-10 size-[28rem] rounded-full opacity-40 blur-[90px]" style={{ background: color }} />
          <div className="absolute -left-20 bottom-0 size-80 rounded-full opacity-20 blur-[80px]" style={{ background: color }} />
          {/* neon tubes */}
          <div className="absolute inset-y-0 left-[22%] w-[3px] bg-white/90" style={{ boxShadow: `0 0 18px 4px ${color}, 0 0 60px 10px ${color}` }} />
          <div className="absolute inset-y-0 left-[26%] w-px bg-white/40" style={{ boxShadow: `0 0 10px 2px ${color}` }} />
          {/* neon kana sign */}
          <span
            className="absolute right-6 top-8 text-[clamp(3rem,6vw,5rem)] font-bold leading-[1.05] [writing-mode:vertical-rl]"
            style={{ color: "transparent", WebkitTextStroke: `2px ${color}`, filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 24px ${color})` }}
          >
            {chapter.kana}
          </span>
          <div className="bg-noise absolute inset-0 opacity-[0.12] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        <span className="absolute left-6 top-6 bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FFC857] sm:left-8 sm:top-8" title={labels.photoHint}>
          {labels.photo}
        </span>

        {/* player card */}
        <div className="w-full max-w-[17rem]">
          <div className="border border-white/70 bg-black/40 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span aria-hidden className="flex gap-0.5">
                  {[0, 1, 2].map((b) => <span key={b} className="h-4 w-1.5 bg-white" />)}
                  <span className="h-4 w-0.5 bg-white" />
                </span>
                第{KANJI[index]}章
              </span>
              <span className="font-[family-name:var(--font-archivo-wide)] text-base font-extrabold [font-stretch:125%]">{n}</span>
            </div>
            <div aria-hidden className="my-3 px-2 text-white">{chapter.art}</div>
            <div aria-hidden className="flex justify-between text-[10px]">
              <span>⏮</span>
              <span>⏭</span>
            </div>
          </div>
          <a
            href={`#chapter-${chapter.id}`}
            className="group mt-2 flex items-end justify-between bg-[#B8FF2C] px-3 py-2.5 text-black"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-wider">
                {labels.open} {n}
              </span>
              <span className="block text-xl font-medium italic uppercase leading-tight">{chapter.title}</span>
            </span>
            <span aria-hidden className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5">↘↘↘</span>
          </a>
          <p className="mt-3 flex items-center justify-end gap-3 text-[11px] uppercase tracking-wider text-white/80">
            {chapter.years}
          </p>
        </div>
      </section>

      {/* Text panel */}
      <section
        id={`chapter-${chapter.id}`}
        className={cn(
          "flex shrink-0 scroll-mt-14 flex-col gap-8 overflow-y-auto p-6 py-14 sm:p-10 lg:h-full lg:w-[38rem] lg:py-10",
          light ? "bg-[#E7E6E1] text-[#0A0A0C]" : "bg-[#121216] text-white",
        )}
      >
        <header>
          <h2 className={cn(wide, "text-[clamp(2.2rem,9vw,3.6rem)] leading-[0.9] tracking-[-0.02em]")}>{chapter.title}</h2>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="shrink-0 uppercase">{labels.chapter} {n}</span>
            <Squiggle className="h-3 flex-1 text-[#B8FF2C] [filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.4))]" />
            <span className="shrink-0">{chapter.kana}</span>
          </div>
        </header>
        <div className="space-y-5 text-[1.05rem] leading-relaxed [&>p]:max-w-prose">{chapter.body}</div>
        <footer aria-hidden className="mt-auto flex items-end justify-between gap-4 pt-6">
          <span className={cn(wide, "text-[7rem] leading-[0.75] opacity-25 lg:text-[9rem]")} style={{ color: "transparent", WebkitTextStroke: `1.5px ${light ? "#0A0A0C" : "#FFFFFF"}` }}>{n}</span>
          <span className="pb-2 text-right text-xs uppercase tracking-wider opacity-60">{chapter.years}</span>
        </footer>
      </section>
    </>
  );
}

function ResultList({ results, locale, teamsLabel }: { results: Result[]; locale: string; teamsLabel: string }) {
  return (
    <ul className="divide-y divide-current/15 border-y border-current/15 text-sm">
      {results.map((r) => (
        <li key={r.id} className="grid grid-cols-[6.25rem_1fr_auto] items-baseline gap-3 py-2.5">
          <span className="font-[family-name:var(--font-archivo-wide)] text-base font-extrabold [font-stretch:125%]">
            {r.placement}
            <span className="text-xs font-normal opacity-50">/{r.entrants.toLocaleString(locale)}</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate">{r.game}</span>
            <span className="block text-xs opacity-60">
              {r.player === "kazukun" ? "Kazukun" : "BlueKen"} · {r.event}
              {r.format === "teams" && ` · ${teamsLabel}`}
            </span>
          </span>
          <span className="text-xs font-semibold">Top {formatTopPercent(r.placement, r.entrants)}</span>
        </li>
      ))}
    </ul>
  );
}
