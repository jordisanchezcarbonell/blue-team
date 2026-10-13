import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Anton, Inter_Tight } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";
import { getDesignCopy } from "@/components/designs/copy";
import { getDesignData } from "@/components/designs/data";
import { DesignSwitcher } from "@/components/designs/design-switcher";
import { evoFacts } from "@/data/evo";
import { Link } from "@/i18n/navigation";
import { formatTopPercent } from "@/lib/results/stats";
import { cn } from "@/lib/utils";

const anton = Anton({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-anton", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-inter-tight", display: "swap" });

export const metadata: Metadata = { title: "B · Sports Editorial" };

const display = "font-[family-name:var(--font-anton)] uppercase";
const ACCENT = "text-[#FF4A1C]";
const ACCENT_BG = "bg-[#FF4A1C]";


export default function EditorialDesign() {
  const locale = useLocale();
  const c = getDesignCopy(locale);
  const e = c.editorial;
  const t = useTranslations();
  const data = getDesignData();
  const { site, stats } = data;

  return (
    <div className={cn(anton.variable, interTight.variable, "min-h-dvh bg-[#F6F5F1] font-[family-name:var(--font-inter-tight)] text-[#0B0B0B] antialiased selection:bg-[#FF4A1C] selection:text-white")}>
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F6F5F1]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 sm:px-10">
          <a href="#top" className="text-sm font-bold tracking-tight">
            {site.name}
          </a>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-7 text-[13px]">
              {(["team", "journey", "results", "content", "partners"] as const).map((k) => (
                <li key={k}>
                  <a href={`#${k}`} className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
                    {c.nav[k]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className="rounded-full bg-[#0B0B0B] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#FF4A1C]">
            {c.cta}
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="top" className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-10 sm:pt-16">
          <div className="flex items-center justify-between border-b border-black pb-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span>{e.chapter} 01</span>
            <span>Barcelona — Las Vegas — Nice</span>
            <span className="hidden sm:inline">{site.activeSince}–{site.recordsUntil}</span>
          </div>
          <h1 className={cn(display, "mt-6 text-[clamp(4.2rem,15.5vw,15.5rem)] leading-[0.9] tracking-[-0.01em]")}>
            From Barcelona
            <br />
            to <span className={ACCENT}>EVO.</span>
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <figure className="lg:col-span-8">
              <div className="relative aspect-[21/10] overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_10%,#3a3a3a,#0d0d0d)]" />
                <div className={cn(display, "absolute bottom-[-0.12em] right-4 text-[clamp(5rem,16vw,16rem)] leading-none text-white/[0.06]")}>EVO</div>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-black">
                  {c.photoPending}
                </span>
              </div>
              <figcaption className="mt-3 text-xs text-black/55">{e.heroCaption}</figcaption>
            </figure>
            <div className="flex flex-col justify-between gap-8 lg:col-span-4">
              <p className="text-xl leading-snug sm:text-2xl">{t("hero.subtitle")}</p>
              <div className="flex flex-col gap-3">
                <a href="#contact" className="group flex items-center justify-between bg-[#0B0B0B] px-6 py-5 text-sm font-semibold text-white transition-colors hover:bg-[#FF4A1C]">
                  {c.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
                <a href="#journey" className="group flex items-center justify-between border border-black px-6 py-5 text-sm font-semibold transition-colors hover:bg-black hover:text-white">
                  {c.ctaSecondary} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="mx-auto max-w-[1440px] px-5 py-28 sm:px-10 lg:py-40">
          <p className="max-w-5xl text-[clamp(1.8rem,4vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            {e.manifesto.split(". ").map((sentence, i, arr) => (
              <span key={i} className={i === 0 ? "" : "text-black/40"}>
                {sentence}
                {i < arr.length - 1 ? ". " : ""}
              </span>
            ))}
          </p>
        </section>

        {/* PLAYERS — editorial spreads */}
        <section id="team" className="scroll-mt-14 border-t border-black">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
            <div className="flex items-baseline justify-between py-4 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <span>{e.chapter} 02</span>
              <span>{c.nav.team}</span>
            </div>
            <h2 className={cn(display, "text-[clamp(3.5rem,10vw,9rem)] leading-[0.92]")}>
              {e.playersTitle}
              <br />
              <span className="text-black/25">{e.playersSub}</span>
            </h2>
          </div>

          {data.players.map((p, i) => {
            const best = data.byPlayer[p.id][0];
            return (
              <article key={p.id} className="mx-auto mt-20 grid max-w-[1440px] gap-8 px-5 sm:px-10 lg:grid-cols-12 lg:gap-10">
                <div className={cn("relative aspect-[4/5] bg-[#e6e4de] lg:col-span-5", i === 1 && "lg:order-2 lg:col-start-8")}>
                  <span className={cn(display, "absolute bottom-4 left-4 text-6xl text-black/10")}>{p.handle}</span>
                  <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                    {c.photoPending}
                  </span>
                </div>
                <div className={cn("flex flex-col justify-end lg:col-span-6", i === 0 ? "lg:col-start-7" : "lg:col-start-1 lg:row-start-1")}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">0{i + 1} — Player</p>
                  <h3 className={cn(display, "mt-2 text-[clamp(4rem,9vw,8rem)] leading-[0.92]")}>{p.handle}</h3>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/70">{t(`teamPage.bios.${p.id}`)}</p>
                  {best && (
                    <div className="mt-10 border-t border-black pt-5">
                      <p className={cn(display, "text-[clamp(4rem,8vw,7rem)] leading-none", ACCENT)}>
                        <span className="text-black/25">#</span>{best.placement}
                        <span className="ml-3 align-top text-2xl text-black/40">/ {best.entrants.toLocaleString(locale)}</span>
                      </p>
                      <p className="mt-2 text-sm text-black/60">
                        {best.game} — {best.event}
                      </p>
                    </div>
                  )}
                  <a href={p.startggUser} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:text-[#FF4A1C]">
                    start.gg <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        {/* NUMBERS */}
        <section id="results" className="mt-32 scroll-mt-14 bg-[#0B0B0B] py-24 text-white lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
            <div className="flex items-baseline justify-between border-b border-white/20 pb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              <span>{e.chapter} 03</span>
              <span>{e.numbersTitle}</span>
            </div>
            <dl className="mt-12 grid gap-y-12 sm:grid-cols-3">
              {[
                [String(site.documentedRecords.total), c.records],
                [String(stats.evoEditions.length), c.evoEditions],
                [`${formatTopPercent(stats.best!.placement, stats.best!.entrants)}`, `Top · ${c.bestRelative}`],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-2 max-w-[14rem] text-sm text-white/60">{l}</dt>
                  <dd className={cn(display, "text-[clamp(5rem,12vw,11rem)] leading-[0.92]")}>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-md text-sm text-white/50">{e.numbersLead}</p>

            <table className="mt-20 w-full border-collapse text-left text-sm">
              <caption className="sr-only">EVO</caption>
              <thead className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                <tr className="border-b border-white/20">
                  <th scope="col" className="py-3 font-semibold">{c.nav.results}</th>
                  <th scope="col" className="hidden py-3 font-semibold sm:table-cell">Event</th>
                  <th scope="col" className="py-3 text-right font-semibold">Top</th>
                </tr>
              </thead>
              <tbody>
                {data.evoBest.map((r) => (
                  <tr key={r.id} className="group border-b border-white/10">
                    <td className="py-5 pr-4">
                      <span className={cn(display, "mr-4 text-3xl")}>
                        {r.placement}
                        <span className="text-base text-white/40">/{r.entrants.toLocaleString(locale)}</span>
                      </span>
                      <span className="block sm:inline">
                        {r.game} <span className="text-white/50">— {r.player === "kazukun" ? "Kazukun" : "BlueKen"}</span>
                      </span>
                    </td>
                    <td className="hidden py-5 text-white/60 sm:table-cell">{r.event}</td>
                    <td className={cn(display, "py-5 text-right text-2xl transition-colors group-hover:text-[#FF4A1C]")}>
                      {formatTopPercent(r.placement, r.entrants)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-white/40">{c.selectionNote}</p>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="mx-auto max-w-[1440px] scroll-mt-14 px-5 py-28 sm:px-10 lg:py-36">
          <div className="flex items-baseline justify-between border-b border-black pb-4 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span>{e.chapter} 04</span>
            <span>{e.journeyTitle}</span>
          </div>
          <ol>
            {data.timeline.map((y) => (
              <li key={y.year} className="group grid gap-4 border-b border-black/15 py-8 sm:grid-cols-12 sm:items-baseline">
                <span
                  className={cn(
                    display,
                    "text-[clamp(3.5rem,8vw,7rem)] leading-none transition-colors sm:col-span-4",
                    y.status === "pending" ? "text-black/15" : "text-black group-hover:text-[#FF4A1C]",
                  )}
                >
                  {y.year}
                </span>
                <div className="sm:col-span-5">
                  <h3 className="text-xl font-semibold">{t(`timeline.years.${y.year}.title`)}</h3>
                  <p className="mt-2 leading-relaxed text-black/65">{t(`timeline.years.${y.year}.body`)}</p>
                </div>
                <p className="text-sm text-black/50 sm:col-span-3 sm:text-right">
                  {y.status === "pending" ? c.pending : [...new Set(y.results.map((r) => r.event))].join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* CONTENT */}
        <section id="content" className="mx-auto grid max-w-[1440px] scroll-mt-14 gap-10 px-5 pb-28 sm:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">{e.chapter} 05</p>
            <h2 className={cn(display, "mt-3 text-[clamp(3rem,7vw,6rem)] leading-[0.88]")}>{e.contentTitle}</h2>
            <p className="mt-6 max-w-sm text-black/65">{e.contentLead}</p>
            <p className="mt-6 inline-block rounded-full border border-black/20 px-3 py-1 text-xs text-black/60">{c.portfolioPending}</p>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {(["vertical", "vlog", "photo", "interviews", "bts", "branded"] as const).map((k, i) => (
              <li key={k} className="group flex gap-6 border-t border-black/15 py-6 last:border-b">
                <span className="w-8 text-sm tabular-nums text-black/40">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-[#FF4A1C]">{t(`production.formats.${k}.title`)}</h3>
                  <p className="mt-1 text-black/60">{t(`production.formats.${k}.body`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* EVO context strip */}
        <section className="border-y border-black">
          <div className="mx-auto grid max-w-[1440px] divide-y divide-black/15 px-5 sm:px-10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {evoFacts.map((f) => (
              <a key={f.id} href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className="group block py-8 md:px-8 md:first:pl-0">
                <p className={cn(display, "text-5xl")}>{f.figure[locale]}</p>
                <p className="mt-2 text-sm text-black/65">{f.label[locale]}</p>
                <p className="mt-3 text-xs text-black/40 group-hover:text-[#FF4A1C]">{f.sourceName} ↗</p>
              </a>
            ))}
          </div>
          <p className="mx-auto max-w-[1440px] px-5 pb-6 text-xs text-black/50 sm:px-10">{t("evo.audienceTitle")} — {t("evo.audienceBody")}</p>
        </section>

        {/* PARTNERS */}
        <section id="partners" className="mx-auto max-w-[1440px] scroll-mt-14 px-5 py-28 sm:px-10 lg:py-36">
          <div className="flex items-baseline justify-between border-b border-black pb-4 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span>{e.chapter} 06</span>
            <span>{c.nav.partners}</span>
          </div>
          <h2 className={cn(display, "mt-8 text-[clamp(3.5rem,10vw,9rem)] leading-[0.92]")}>{e.partnersTitle}</h2>
          <div className="mt-16">
            {(["supporter", "event", "main"] as const).map((tier, i) => (
              <Link
                key={tier}
                href={{ pathname: "/contact", query: { type: tier } }}
                className="group grid gap-4 border-t border-black py-10 transition-colors last:border-b hover:bg-black hover:text-white sm:grid-cols-12 sm:px-4"
              >
                <span className="text-sm tabular-nums text-black/40 group-hover:text-white/50 sm:col-span-1">0{i + 1}</span>
                <span className="sm:col-span-4">
                  <span className={cn(display, "block text-5xl leading-none sm:text-6xl")}>{t(`packages.tiers.${tier}.name`)}</span>
                  <span className="mt-2 block text-black/60 group-hover:text-white/60">{t(`packages.tiers.${tier}.tagline`)}</span>
                </span>
                <span className="text-sm leading-relaxed text-black/70 group-hover:text-white/80 sm:col-span-5">
                  {(t.raw(`packages.tiers.${tier}.items`) as string[]).join(" · ")}
                </span>
                <span className="flex items-center justify-between gap-4 sm:col-span-2 sm:flex-col sm:items-end sm:justify-between">
                  <span className="text-xs uppercase tracking-[0.15em] text-black/40 group-hover:text-white/50">{c.customQuote}</span>
                  <ArrowRight className="size-6 transition-transform group-hover:translate-x-1 group-hover:text-[#FF4A1C]" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-14 bg-[#0B0B0B] text-white">
          <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-10 lg:py-40">
            <h2 className={cn(display, "text-[clamp(4rem,13vw,13rem)] leading-[0.9]")}>
              {e.ctaTitle.split(". ")[0]}.
              <br />
              <span className={ACCENT}>{e.ctaTitle.split(". ")[1]}</span>
            </h2>
            <div className="mt-12 flex flex-col gap-6 border-t border-white/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-lg text-white/70">{c.contactLine}</p>
              <Link href="/contact" className={cn("group inline-flex items-center gap-3 rounded-full px-8 py-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]", ACCENT_BG)}>
                Let&apos;s collaborate <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
          <footer className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-white/10 px-5 py-6 pb-24 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-10">
            <span>© {site.recordsUntil} {site.name}</span>
            <span>{c.disclaimer}</span>
          </footer>
        </section>
      </main>
      <DesignSwitcher current="editorial" />
    </div>
  );
}
