import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { Saira_Condensed } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";
import { getDesignCopy } from "@/components/designs/copy";
import { getDesignData } from "@/components/designs/data";
import { DesignSwitcher } from "@/components/designs/design-switcher";
import { Link } from "@/i18n/navigation";
import { formatTopPercent, topPercent } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";

const saira = Saira_Condensed({
  weight: ["500", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-saira",
  display: "swap",
});

export const metadata: Metadata = { title: "A · Esports Elite" };

const display = "font-[family-name:var(--font-saira)] uppercase";

export default function EsportsDesign() {
  const locale = useLocale();
  const c = getDesignCopy(locale);
  const t = useTranslations();
  const data = getDesignData();
  const { stats, site } = data;
  const best = stats.best!;

  return (
    <div className={cn(saira.variable, "min-h-dvh bg-[#05070d] text-snow antialiased")}>
      {/* Ticker */}
      <div className="overflow-hidden border-b border-white/5 bg-cyan text-ink">
        <div className="flex w-max animate-marquee gap-10 py-1.5" aria-hidden>
          {[0, 1, 2, 3].flatMap((k) =>
            c.elite.ticker.map((item) => (
              <span key={`${k}-${item}`} className={cn(display, "flex items-center gap-10 text-xs font-bold tracking-[0.2em]")}>
                {item} <span className="size-1.5 rotate-45 bg-ink" />
              </span>
            )),
          )}
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
          <a href="#top" className={cn(display, "text-xl font-black tracking-wide")}>
            Beyond<span className="text-cyan">/</span>The Fight
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-8 text-[13px] font-medium text-muted">
              {(["team", "journey", "results", "content", "partners"] as const).map((k) => (
                <li key={k}>
                  <a href={`#${k}`} className="transition-colors hover:text-snow">{c.nav[k]}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className={cn(display, "bg-snow px-4 py-2 text-sm font-bold tracking-wider text-ink transition-colors hover:bg-cyan")}>
            {c.cta}
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO — two roster frames + headline */}
        <section id="top" className="relative isolate overflow-hidden">
          <div className="mx-auto grid max-w-[1400px] gap-3 px-4 pt-6 sm:px-8 lg:grid-cols-12 lg:pt-10">
            <div className="relative z-10 flex flex-col justify-end pb-6 lg:col-span-6 lg:pb-16">
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
                <span className="h-px w-10 bg-cyan" /> Barcelona · FGC · {site.activeSince}–{site.recordsUntil}
              </p>
              <h1 className={cn(display, "text-[clamp(4rem,11vw,10.5rem)] font-black leading-[0.82] tracking-[-0.01em]")}>
                From
                <br />
                Barcelona
                <br />
                <span className="text-cyan">to EVO.</span>
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{t("hero.subtitle")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className={cn(display, "group inline-flex items-center gap-3 bg-cyan px-6 py-4 text-base font-bold tracking-wider text-ink transition-shadow hover:shadow-[0_0_50px_-10px_var(--color-cyan)]")}>
                  {c.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
                <a href="#journey" className={cn(display, "inline-flex items-center px-6 py-4 text-base font-bold tracking-wider ring-1 ring-inset ring-white/20 transition-colors hover:ring-snow")}>
                  {c.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:col-span-6">
              {data.players.map((p, i) => (
                <RosterFrame key={p.id} handle={p.handle} accent={p.accent} label={c.photoPending} offset={i === 1} />
              ))}
            </div>
          </div>

          {/* Stat strip */}
          <dl className="mx-auto mt-10 grid max-w-[1400px] grid-cols-2 border-y border-white/10 sm:px-8 lg:grid-cols-4">
            {[
              [String(site.activeSince), c.since],
              [String(site.documentedRecords.total), c.records],
              [String(stats.evoEditions.length), c.evoEditions],
              [`Top ${formatTopPercent(best.placement, best.entrants)}`, c.bestRelative],
            ].map(([v, l], i) => (
              <div key={l} className={cn("flex flex-col-reverse gap-1 px-4 py-6 sm:px-6", i > 0 && "lg:border-l lg:border-white/10", i % 2 === 1 && "border-l border-white/10 lg:border-l")}>
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">{l}</dt>
                <dd className={cn(display, "text-4xl font-extrabold sm:text-5xl")}>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ROSTER */}
        <section id="team" className="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-24 sm:px-8 lg:py-32">
          <SectionLabel index="01" title={c.elite.rosterTitle} lead={c.elite.rosterLead} />
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {data.players.map((p) => {
              const top = data.byPlayer[p.id][0];
              return (
                <article key={p.id} className="group grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:py-14">
                  <div className="lg:col-span-5">
                    <p className={cn("text-xs font-semibold uppercase tracking-[0.3em]", p.accent === "cyan" ? "text-cyan" : "text-magenta")}>
                      Player · Barcelona
                    </p>
                    <h3 className={cn(display, "mt-2 text-7xl font-black leading-none transition-transform duration-500 group-hover:translate-x-2 sm:text-8xl")}>
                      {p.handle}
                    </h3>
                    <a href={p.startggUser} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-muted hover:text-snow">
                      start.gg <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-sm leading-relaxed text-muted">{t(`teamPage.bios.${p.id}`)}</p>
                    <p className="mt-4 text-sm text-snow/80">{p.games.slice(0, 5).join(" · ")}</p>
                  </div>
                  {top && (
                    <div className="lg:col-span-3 lg:text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">{c.elite.bestLabel}</p>
                      <p className={cn(display, "mt-1 text-6xl font-black leading-none")}>
                        {top.placement}
                        <span className="text-2xl text-muted">/{top.entrants.toLocaleString(locale)}</span>
                      </p>
                      <p className="mt-1 text-sm text-snow/80">{top.game} · {top.event}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* LEADERBOARD */}
        <section id="results" className="scroll-mt-20 bg-[#0b0f1a] py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
            <SectionLabel index="02" title={c.elite.leaderboardTitle} lead={c.elite.leaderboardLead} />
            <ol className="mt-14">
              {data.evoBest.map((r, i) => (
                <LeaderRow key={r.id} r={r} rank={i + 1} locale={locale} />
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted">{c.selectionNote} {c.source}.</p>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="journey" className="scroll-mt-20 py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
            <SectionLabel index="03" title={c.elite.timelineTitle} />
          </div>
          <ol className="mt-14 flex snap-x snap-mandatory gap-px overflow-x-auto bg-white/10 [scrollbar-width:none] lg:mx-auto lg:max-w-[1400px] lg:grid lg:grid-cols-7">
            {data.timeline.map((y) => (
              <li key={y.year} className="group relative w-[78vw] shrink-0 snap-start bg-[#05070d] p-6 transition-colors hover:bg-[#0b0f1a] sm:w-80 lg:w-auto">
                <span className={cn("absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100", y.status === "pending" ? "bg-warn" : "bg-cyan")} />
                <p className={cn(display, "text-5xl font-black", y.status === "pending" ? "text-white/25" : "text-snow")}>{y.year}</p>
                <p className="mt-6 text-sm font-semibold">{t(`timeline.years.${y.year}.title`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`timeline.years.${y.year}.body`)}</p>
                {y.results.length > 0 && (
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-cyan">
                    {y.results.length} × start.gg
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* CONTENT */}
        <section id="content" className="mx-auto grid max-w-[1400px] scroll-mt-20 gap-12 px-4 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-5">
            <SectionLabel index="04" title={c.elite.contentTitle} lead={c.elite.contentLead} stack />
            <ol className="mt-10 space-y-0 border-t border-white/10">
              {(["vertical", "vlog", "photo", "interviews", "bts", "branded"] as const).map((k, i) => (
                <li key={k} className="group flex items-baseline gap-5 border-b border-white/10 py-4">
                  <span className="text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn(display, "text-2xl font-bold transition-colors group-hover:text-cyan")}>{t(`production.formats.${k}.title`)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:col-span-7">
            {["9:16", "9:16", "9:16"].map((ratio, i) => (
              <div key={i} className={cn("relative aspect-[9/16] overflow-hidden bg-[#0b0f1a] ring-1 ring-inset ring-white/10", i === 1 && "translate-y-10")}>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgba(255,255,255,0.025)_14px_15px)]" />
                <span className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{["TikTok", "Reels", "Shorts"][i]}</span>
                <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-warn">{c.portfolioPending}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TIERS — comparison table, not cards */}
        <section id="partners" className="scroll-mt-20 bg-snow py-24 text-ink lg:py-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">05 — {c.elite.tiersTitle}</p>
            <h2 className={cn(display, "mt-4 max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.85]")}>
              {site.partnerClaim}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink/70">{t("benefits.body")}</p>
            <TierTable locale={locale} />
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative isolate scroll-mt-20 overflow-hidden py-28 lg:py-40">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(86,215,255,0.18),transparent),radial-gradient(50%_70%_at_10%_90%,rgba(253,75,157,0.14),transparent)]" />
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
            <h2 className={cn(display, "text-[clamp(3.5rem,12vw,12rem)] font-black leading-[0.8]")}>
              {c.elite.ctaTitle}
            </h2>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-lg text-muted">{c.contactLine}</p>
              <Link href="/contact" className={cn(display, "group inline-flex items-center gap-3 bg-cyan px-8 py-5 text-lg font-bold tracking-wider text-ink")}>
                Let&apos;s collaborate <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 pb-24 text-xs text-muted sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 sm:flex-row sm:justify-between">
          <span>© {site.recordsUntil} {site.name}</span>
          <span>{c.disclaimer}</span>
        </div>
      </footer>
      <DesignSwitcher current="esports" />
    </div>
  );
}

function SectionLabel({ index, title, lead, stack }: { index: string; title: string; lead?: string; stack?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-4", !stack && "lg:flex-row lg:items-end lg:justify-between")}>
      <h2 className={cn(display, "text-5xl font-black leading-[0.9] sm:text-7xl")}>
        <span className="mr-4 align-top text-base font-semibold text-cyan">{index}</span>
        {title}
      </h2>
      {lead && <p className="max-w-sm text-muted">{lead}</p>}
    </div>
  );
}

function RosterFrame({ handle, accent, label, offset }: { handle: string; accent: "cyan" | "magenta"; label: string; offset: boolean }) {
  return (
    <figure
      className={cn(
        "group relative aspect-[3/4.4] overflow-hidden bg-[#0b0f1a] lg:aspect-auto lg:h-[min(78vh,760px)]",
        offset && "lg:mt-16",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-700 group-hover:opacity-100",
          accent === "cyan"
            ? "bg-[linear-gradient(180deg,transparent_30%,rgba(86,215,255,0.35))] opacity-70"
            : "bg-[linear-gradient(180deg,transparent_30%,rgba(253,75,157,0.35))] opacity-70",
        )}
      />
      <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(255,255,255,0.03)_3px_4px)]" />
      <span
        aria-hidden
        className={cn(
          display,
          "absolute -bottom-2 left-1/2 origin-bottom-left -rotate-90 whitespace-nowrap text-[clamp(4rem,9vw,8.5rem)] font-black leading-none text-white/[0.07]",
        )}
        style={{ transform: "translateX(-50%) rotate(-90deg) translateX(50%)" }}
      >
        {handle}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <span className={cn(display, "text-2xl font-black sm:text-3xl", accent === "cyan" ? "text-cyan" : "text-magenta")}>{handle}</span>
        <span className="bg-black/60 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-warn">{label}</span>
      </figcaption>
    </figure>
  );
}

function LeaderRow({ r, rank, locale }: { r: Result; rank: number; locale: string }) {
  const pct = topPercent(r.placement, r.entrants);
  const accent = r.player === "kazukun" ? "bg-cyan" : "bg-magenta";
  const text = r.player === "kazukun" ? "text-cyan" : "text-magenta";
  return (
    <li className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-2 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[3rem_9rem_1fr_9rem_7rem] sm:gap-6">
      <span className="text-sm tabular-nums text-muted">{String(rank).padStart(2, "0")}</span>
      <span className={cn(display, "row-span-2 text-4xl font-black leading-none sm:row-span-1 sm:text-5xl")}>
        {r.placement}
        <span className="text-lg text-muted">/{r.entrants.toLocaleString(locale)}</span>
      </span>
      <span className="col-start-2 min-w-0 sm:col-start-auto">
        <span className="block font-semibold sm:truncate">{r.game}</span>
        <span className="block text-sm text-muted">{r.event} · <span className={text}>{r.player === "kazukun" ? "Kazukun" : "BlueKen"}</span></span>
      </span>
      <span className="col-span-3 sm:col-span-1">
        <span aria-hidden className="block h-1.5 w-full bg-white/10">
          <span className={cn("block h-full transition-[width] duration-700", accent)} style={{ width: `${Math.max(2, pct)}%` }} />
        </span>
      </span>
      <span className={cn(display, "col-start-3 row-start-1 text-right text-xl font-bold sm:col-start-auto sm:row-start-auto", text)}>
        Top {formatTopPercent(r.placement, r.entrants)}
      </span>
    </li>
  );
}

function TierTable({ locale }: { locale: string }) {
  const t = useTranslations("packages");
  const c = getDesignCopy(locale as "es" | "en");
  const tiers = ["supporter", "event", "main"] as const;

  return (
    <div className="mt-14 grid border-t-2 border-ink lg:grid-cols-3">
      {tiers.map((tier, i) => {
        const main = tier === "main";
        return (
          <div
            key={tier}
            className={cn(
              "flex flex-col p-6 sm:p-8",
              i > 0 && "border-t border-ink/15 lg:border-l lg:border-t-0",
              main && "bg-ink text-snow",
            )}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold tabular-nums opacity-60">0{i + 1}</span>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", main ? "text-cyan" : "text-ink/50")}>{c.proposal}</span>
            </div>
            <h3 className={cn(display, "mt-6 text-5xl font-black leading-none")}>{t(`tiers.${tier}.name`)}</h3>
            <p className="mt-2 text-sm opacity-70">{t(`tiers.${tier}.tagline`)}</p>
            <ul className="mt-8 space-y-2.5 text-sm">
              {(t.raw(`tiers.${tier}.items`) as string[]).map((item) => (
                <li key={item} className="flex gap-3">
                  <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", main ? "text-cyan" : "text-ink/40")} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-end justify-between gap-4 pt-10">
              <span className="text-[11px] uppercase tracking-[0.18em] opacity-60">{c.customQuote}</span>
              <Link
                href={{ pathname: "/contact", query: { type: tier } }}
                className={cn(display, "group inline-flex items-center gap-2 text-base font-bold tracking-wider", main ? "text-cyan" : "text-ink")}
              >
                {t("cta")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
