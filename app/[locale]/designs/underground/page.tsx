import type { Metadata } from "next";
import { Dela_Gothic_One, JetBrains_Mono } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";
import { getDesignCopy } from "@/components/designs/copy";
import { getDesignData } from "@/components/designs/data";
import { DesignSwitcher } from "@/components/designs/design-switcher";
import { Link } from "@/i18n/navigation";
import { formatTopPercent } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";

const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-dela", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-jbmono", display: "swap" });

export const metadata: Metadata = { title: "C · FGC Underground" };

const display = "font-[family-name:var(--font-dela)] uppercase";
const monoCls = "font-[family-name:var(--font-jbmono)]";
// Palette: asphalt, paper, acid, signal red.
const ACID = "#D7FF3C";
const RED = "#FF3355";

const halftone = {
  backgroundImage: "radial-gradient(currentColor 1px, transparent 1.4px)",
  backgroundSize: "7px 7px",
};

export default function UndergroundDesign() {
  const locale = useLocale();
  const c = getDesignCopy(locale);
  const u = c.underground;
  const t = useTranslations();
  const data = getDesignData();
  const { site } = data;
  const [kazu, blue] = data.players;

  return (
    <div className={cn(dela.variable, mono.variable, monoCls, "min-h-dvh overflow-x-clip bg-[#0E0E0D] text-[#EFEAE0] antialiased")} style={{ ["--acid" as string]: ACID, ["--red" as string]: RED }}>
      {/* HUD header */}
      <header className="sticky top-0 z-50 border-b-2 border-[#EFEAE0]/10 bg-[#0E0E0D]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
          <a href="#top" className={cn(display, "text-sm tracking-wide")}>
            BTF<span className="text-[var(--acid)]">{"//"}</span>
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-1 text-xs">
              {(["team", "journey", "results", "content", "partners"] as const).map((k, i) => (
                <li key={k}>
                  <a href={`#${k}`} className="block px-3 py-1.5 uppercase tracking-wider text-[#EFEAE0]/60 transition-colors hover:bg-[var(--acid)] hover:text-black">
                    [{String(i + 1).padStart(2, "0")}] {c.nav[k]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className="group flex items-center gap-2 bg-[var(--acid)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black">
            {u.pressStart}
            <span className="inline-block transition-transform group-hover:translate-x-1">▶</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="top" className="relative isolate overflow-hidden">
          {/* Health-bar HUD (decorative): both players at full, 18→26 on the clock */}
          <div aria-hidden className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 pt-6 text-[10px] uppercase tracking-widest sm:gap-6 sm:px-8">
            <div className="flex-1">
              <div className="mb-1 flex justify-between"><span>P1 {kazu.handle}</span><span className="text-[#EFEAE0]/40">BCN</span></div>
              <div className="h-3 -skew-x-[20deg] bg-[#EFEAE0]/10 p-0.5"><div className="h-full w-full bg-[var(--red)]" /></div>
            </div>
            <div className={cn(display, "border-2 border-[#EFEAE0] px-2 py-1 text-lg leading-none sm:text-2xl")}>{String(site.activeSince).slice(2)}<span className="text-[var(--acid)]">→</span>{String(site.recordsUntil).slice(2)}</div>
            <div className="flex-1">
              <div className="mb-1 flex justify-between"><span className="text-[#EFEAE0]/40">BCN</span><span>{blue.handle} P2</span></div>
              <div className="h-3 skew-x-[20deg] bg-[#EFEAE0]/10 p-0.5"><div className="ml-auto h-full w-full bg-[var(--acid)]" /></div>
            </div>
          </div>

          <div className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
            <div aria-hidden className="pointer-events-none absolute -right-10 top-0 size-[28rem] text-[var(--red)] opacity-30 [mask-image:radial-gradient(circle,black,transparent_70%)]" style={halftone} />
            <p className="inline-block -rotate-2 bg-[#EFEAE0] px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
              Est. {site.activeSince} · Barcelona · FGC
            </p>
            <h1 className={cn(display, "relative mt-6 text-[clamp(2.3rem,9.6vw,9.5rem)] leading-[0.88] tracking-[-0.02em]")}>
              <span className="block">From</span>
              <span className="block sm:pl-[5vw]">Barcelona</span>
              <span className="block">
                to{" "}
                <span className="relative inline-block -skew-x-6 bg-[var(--acid)] px-3 text-black">EVO.</span>
              </span>
            </h1>
            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              <p className="text-base leading-relaxed text-[#EFEAE0]/75 lg:col-span-5 lg:col-start-1">{t("hero.subtitle")}</p>
              <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
                <a href="#contact" className="bg-[var(--acid)] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-black shadow-[5px_5px_0_var(--red)] transition-shadow hover:shadow-[2px_2px_0_var(--red)]">
                  {c.cta} ▶
                </a>
                <a href="#journey" className="border-2 border-[#EFEAE0] px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-[#EFEAE0] hover:text-black">
                  {c.ctaSecondary}
                </a>
              </div>
            </div>
            <p aria-hidden className="mt-14 overflow-hidden whitespace-nowrap text-sm tracking-[0.4em] text-[#EFEAE0]/25">
              ↓ ↘ → + P &nbsp; → ↓ ↘ + K &nbsp; ↓ ↙ ← + P &nbsp; ↓ ↘ → ↓ ↘ → + P &nbsp; ← [ 2s ] → + P &nbsp; ↓ ↘ → + P
            </p>
          </div>
        </section>

        {/* SELECT YOUR PLAYER */}
        <section id="team" className="scroll-mt-14 border-t-2 border-[#EFEAE0]/10 py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <h2 className={cn(display, "text-[clamp(2.2rem,6vw,5rem)] leading-none")}>
              {u.select}<span className="animate-pulse text-[var(--acid)]">_</span>
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-[1440px] gap-4 px-4 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
            <PlayerPanel side="p1" handle={kazu.handle} id="kazukun" games={kazu.games} url={kazu.startggUser} results={data.byPlayer.kazukun.slice(0, 4)} locale={locale} />
            <PlayerPanel side="p2" handle={blue.handle} id="blueken" games={blue.games} url={blue.startggUser} results={data.byPlayer.blueken.slice(0, 4)} locale={locale} className="lg:mt-20" />
          </div>
          {/* P3 */}
          <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-8">
            <div className="flex flex-col gap-4 border-2 border-dashed border-[#EFEAE0]/25 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <span className={cn(display, "text-4xl text-[#EFEAE0]/30")}>{u.p3}</span>
                <div>
                  <p className={cn(display, "text-2xl")}>{u.creator} <span className="text-[#EFEAE0]/30">???</span></p>
                  <p className="text-xs uppercase tracking-widest text-[#EFEAE0]/50">{u.creatorRole}</p>
                </div>
              </div>
              <span className="self-start bg-[#EFEAE0]/10 px-2 py-1 text-[10px] uppercase tracking-widest text-[var(--acid)] sm:self-auto">{c.pending}</span>
            </div>
          </div>
        </section>

        {/* HEALTH BARS — EVO results */}
        <section id="results" className="scroll-mt-14 bg-[#EFEAE0] py-20 text-black lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2 className={cn(display, "text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] lg:col-span-7")}>{u.healthTitle}</h2>
              <p className="text-sm leading-relaxed text-black/65 lg:col-span-4 lg:col-start-9">{u.healthLead}</p>
            </div>
            <ol className="mt-14 space-y-7">
              {data.evoBest.map((r) => (
                <HealthBar key={r.id} r={r} locale={locale} label={u.leftBehind} />
              ))}
            </ol>
            <p className="mt-10 text-xs text-black/50">{c.selectionNote} {c.source}.</p>
          </div>
        </section>

        {/* STAGE SELECT — journey */}
        <section id="journey" className="scroll-mt-14 py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <h2 className={cn(display, "text-[clamp(2.6rem,7vw,6rem)] leading-none")}>{u.stageSelect}</h2>
            <ol className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
              {data.timeline.map((y, i) => {
                const big = y.year === 2022 || y.year === 2025;
                const pending = y.status === "pending";
                return (
                  <li
                    key={y.year}
                    className={cn(
                      "group relative flex min-h-56 flex-col justify-between overflow-hidden border-2 p-4 transition-colors",
                      big ? "col-span-2 md:min-h-72" : "",
                      pending
                        ? "border-dashed border-[#EFEAE0]/20 text-[#EFEAE0]/40"
                        : "border-[#EFEAE0]/15 hover:border-[var(--acid)]",
                    )}
                  >
                    {!pending && (
                      <div aria-hidden className={cn("absolute -bottom-10 -right-10 size-48 opacity-[0.12] transition-opacity group-hover:opacity-30", i % 2 ? "text-[var(--acid)]" : "text-[var(--red)]")} style={halftone} />
                    )}
                    <div className="relative flex items-start justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#EFEAE0]/50">Stage {String(i + 1).padStart(2, "0")}</span>
                      {y.results.length > 0 && <span className="bg-[var(--acid)] px-1.5 text-[10px] font-bold text-black">×{y.results.length}</span>}
                    </div>
                    <div className="relative">
                      <p className={cn(display, big ? "text-6xl sm:text-8xl" : "text-[2rem] sm:text-5xl", "leading-none")}>{y.year}</p>
                      <p className="mt-3 text-sm font-bold uppercase tracking-wide">{t(`timeline.years.${y.year}.title`)}</p>
                      <p className={cn("mt-2 text-xs leading-relaxed text-[#EFEAE0]/60", !big && "line-clamp-4")}>
                        {pending ? u.noRecords : t(`timeline.years.${y.year}.body`)}
                      </p>
                    </div>
                  </li>
                );
              })}
              <li className="col-span-2 md:col-span-3">
                <a href="#partners" className="group flex h-full min-h-56 flex-col justify-between border-2 border-[var(--acid)] bg-[var(--acid)] p-4 text-black transition-colors hover:bg-[#EFEAE0]">
                  <span className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>Stage {String(data.timeline.length + 1).padStart(2, "0")}</span>
                    <span>{c.proposal}</span>
                  </span>
                  <span>
                    <span className={cn(display, "block text-5xl leading-none sm:text-7xl")}>???</span>
                    <span className="mt-3 block text-sm font-bold uppercase tracking-wide">{t("timeline.next")}</span>
                    <span className="mt-1 block text-xs">{t("timeline.nextBody")} <span className="inline-block transition-transform group-hover:translate-x-1">▶</span></span>
                  </span>
                </a>
              </li>
            </ol>
          </div>
        </section>

        {/* REPLAYS — content */}
        <section id="content" className="scroll-mt-14 border-y-2 border-[#EFEAE0]/10 py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className={cn(display, "text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95]")}>{u.replayTitle}</h2>
              <p className="mt-6 text-sm leading-relaxed text-[#EFEAE0]/65">{t("production.body")}</p>
              <p className="mt-6 inline-block border border-[var(--acid)] px-2 py-1 text-[10px] uppercase tracking-widest text-[var(--acid)]">{c.portfolioPending}</p>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {(["vertical", "vlog", "photo", "interviews", "bts", "branded"] as const).map((k, i) => (
                <li key={k} className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-[#EFEAE0]/10 py-5">
                  <span className="text-xs text-[var(--red)]">
                    <span className="inline-block size-2 rounded-full bg-[var(--red)] group-hover:animate-pulse" /> REC.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn(display, "text-2xl transition-transform group-hover:translate-x-2 sm:text-3xl")}>{t(`production.formats.${k}.title`)}</span>
                  <span className="col-start-2 mt-1 text-xs text-[#EFEAE0]/55">{t(`production.formats.${k}.body`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CHOOSE YOUR LEVEL */}
        <section id="partners" className="scroll-mt-14 py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <p className="text-xs uppercase tracking-widest text-[var(--acid)]">{site.partnerClaim}</p>
            <h2 className={cn(display, "mt-3 text-[clamp(2.6rem,7vw,6rem)] leading-none")}>{u.tiersTitle}</h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {(["supporter", "event", "main"] as const).map((tier, i) => {
                const lvl = i + 1;
                const max = tier === "main";
                return (
                  <article
                    key={tier}
                    className={cn(
                      "flex flex-col border-2 p-6 transition-transform hover:-translate-y-1",
                      max ? "border-[var(--acid)] bg-[var(--acid)] text-black lg:-rotate-1" : "border-[#EFEAE0]/20",
                    )}
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-widest">
                      <span>{u.level} {lvl}</span>
                      <span className={max ? "font-bold" : "text-[#EFEAE0]/50"}>{c.proposal}</span>
                    </div>
                    {/* super meter */}
                    <div aria-hidden className="mt-4 grid grid-cols-3 gap-1">
                      {[1, 2, 3].map((s) => (
                        <span key={s} className={cn("h-2.5 -skew-x-[25deg]", s <= lvl ? (max ? "bg-black" : "bg-[var(--red)]") : max ? "bg-black/15" : "bg-[#EFEAE0]/10")} />
                      ))}
                    </div>
                    <h3 className={cn(display, "mt-8 text-4xl leading-none")}>{t(`packages.tiers.${tier}.name`)}</h3>
                    <p className={cn("mt-2 text-sm", max ? "text-black/70" : "text-[#EFEAE0]/60")}>{t(`packages.tiers.${tier}.tagline`)}</p>
                    <ul className="mt-6 space-y-2 text-sm">
                      {(t.raw(`packages.tiers.${tier}.items`) as string[]).map((item) => (
                        <li key={item} className="flex gap-2"><span aria-hidden>+</span>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <p className={cn("text-[10px] uppercase tracking-widest", max ? "text-black/60" : "text-[#EFEAE0]/45")}>{c.customQuote}</p>
                      <Link
                        href={{ pathname: "/contact", query: { type: tier } }}
                        className={cn("mt-3 block py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors", max ? "bg-black text-[var(--acid)] hover:bg-[var(--red)] hover:text-black" : "bg-[#EFEAE0] text-black hover:bg-[var(--acid)]")}
                      >
                        {t("packages.cta")} ▶
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTINUE? */}
        <section id="contact" className="relative isolate scroll-mt-14 overflow-hidden bg-[var(--red)] py-24 text-black lg:py-32">
          <div aria-hidden className="absolute inset-0 -z-10 text-black opacity-15" style={halftone} />
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <p className={cn(display, "text-[clamp(2.6rem,9vw,8.5rem)] leading-[0.9]")}>{u.continue}</p>
            <div className="mt-10 flex flex-col gap-8 border-t-2 border-black pt-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base text-black/80">{c.contactLine}</p>
              <div className="flex items-end gap-6">
                <span aria-hidden className={cn(display, "text-7xl leading-[0.75] text-black/85 sm:text-8xl")}>9</span>
                <Link href="/contact" className="bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-[var(--acid)] shadow-[5px_5px_0_#EFEAE0] transition-shadow hover:shadow-[2px_2px_0_#EFEAE0]">
                  Let&apos;s collaborate ▶
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 py-8 pb-24 text-[10px] uppercase tracking-widest text-[#EFEAE0]/40 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:justify-between">
          <span>© {site.recordsUntil} {site.name}</span>
          <span>{c.disclaimer}</span>
        </div>
      </footer>
      <DesignSwitcher current="underground" />
    </div>
  );
}

function PlayerPanel({
  side,
  handle,
  id,
  games,
  url,
  results,
  locale,
  className,
}: {
  side: "p1" | "p2";
  handle: string;
  id: string;
  games: string[];
  url: string;
  results: Result[];
  locale: string;
  className?: string;
}) {
  const p1 = side === "p1";
  const c = getDesignCopy(locale as "es" | "en");
  return (
    <article id={id} className={cn("relative overflow-hidden border-2", p1 ? "border-[var(--red)]" : "border-[var(--acid)]", className)}>
      <div className={cn("flex items-center justify-between px-5 py-2 text-xs font-bold uppercase tracking-widest text-black", p1 ? "bg-[var(--red)]" : "bg-[var(--acid)]")}>
        <span>{p1 ? c.underground.p1 : c.underground.p2}</span>
        <span>{c.photoPending}</span>
      </div>
      <div className="relative p-5 sm:p-8">
        <div aria-hidden className={cn("absolute right-0 top-0 h-full w-1/2 opacity-20 [mask-image:linear-gradient(to_left,black,transparent)]", p1 ? "text-[var(--red)]" : "text-[var(--acid)]")} style={halftone} />
        <h3 className={cn(display, "relative text-[clamp(2.3rem,7vw,6rem)] leading-none")}>{handle}</h3>
        <div className="relative mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#EFEAE0]/45">{c.underground.moveList}</p>
            <ul className="mt-3 space-y-1.5 text-xs">
              {games.map((g, i) => (
                <li key={g} className="flex gap-2">
                  <span className="text-[#EFEAE0]/35">{String(i + 1).padStart(2, "0")}</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#EFEAE0]/45">{c.underground.frameData}</p>
            <table className="mt-3 w-full text-xs">
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className="border-b border-[#EFEAE0]/10">
                    <td className="py-1.5 pr-2">
                      <span className="block truncate">{r.game}</span>
                      <span className="text-[#EFEAE0]/40">{r.event}</span>
                    </td>
                    <td className={cn("py-1.5 text-right font-bold", p1 ? "text-[var(--red)]" : "text-[var(--acid)]")}>
                      {r.placement}/{r.entrants.toLocaleString(locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[10px] uppercase tracking-widest text-[#EFEAE0]/50 hover:text-[#EFEAE0]">
              start.gg ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function HealthBar({ r, locale, label }: { r: Result; locale: string; label: string }) {
  const behind = ((r.entrants - r.placement) / r.entrants) * 100;
  const p1 = r.player === "kazukun";
  return (
    <li className="group">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm">
          <span className={cn("mr-2 px-1.5 py-0.5 text-[10px] font-bold uppercase", p1 ? "bg-[var(--red)] text-black" : "bg-black text-[var(--acid)]")}>
            {p1 ? "P1" : "P2"} {p1 ? "Kazukun" : "BlueKen"}
          </span>
          <span className="font-bold">{r.game}</span> <span className="text-black/50">· {r.event}</span>
        </p>
        <p className="text-sm">
          <span className={cn(display, "text-2xl")}>{r.placement}</span>
          <span className="text-black/50">/{r.entrants.toLocaleString(locale)}</span>
          <span className="ml-3 text-xs font-bold">TOP {formatTopPercent(r.placement, r.entrants)}</span>
        </p>
      </div>
      <div className="mt-2 h-5 -skew-x-[20deg] border-2 border-black bg-black/5 p-0.5">
        <div
          className={cn("h-full transition-[width] duration-700", p1 ? "bg-[var(--red)]" : "bg-black")}
          style={{ width: `${behind}%` }}
        />
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-black/45">
        {Math.floor(behind)}% {label}
      </p>
    </li>
  );
}
