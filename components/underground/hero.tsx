import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { players } from "@/data/team";
import { Link } from "@/i18n/navigation";
import { getStats } from "@/lib/results/repository";
import { formatTopPercent } from "@/lib/results/stats";
import { cn } from "@/lib/utils";

/** Section title shared by the home sections: big Dela Gothic heading + optional lead. */
export function UgTitle({
  id,
  title,
  lead,
  tone = "dark",
  cursor,
}: {
  id: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  cursor?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <h2 id={id} className="font-display text-[clamp(2.2rem,7vw,6rem)] uppercase leading-[0.9] lg:col-span-7">
        {title}
        {cursor && <span aria-hidden className="animate-pulse text-cyan">_</span>}
      </h2>
      {lead && <p className={cn("text-sm leading-relaxed lg:col-span-4 lg:col-start-9", tone === "dark" ? "text-muted" : "text-ink/65")}>{lead}</p>}
    </div>
  );
}

export function UgHero() {
  const t = useTranslations();
  const stats = getStats();
  const best = stats.best!;
  const { documentedRecords: rec } = siteConfig;
  const [p1, p2] = players;

  const numbers = [
    { value: String(siteConfig.activeSince), label: t("stats.since"), detail: "start.gg" },
    { value: String(rec.total), label: t("stats.records"), detail: t("stats.recordsDetail", { k: rec.kazukun, b: rec.blueken }) },
    { value: String(stats.evoEditions.length), label: t("stats.editions"), detail: t("stats.editionsDetail") },
    {
      value: `Top ${formatTopPercent(best.placement, best.entrants)}`,
      label: t("stats.best"),
      detail: t("stats.bestDetail", { placement: best.placement, entrants: best.entrants, game: best.game }),
    },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Health-bar HUD (decorative): both players at full, first season → current on the clock */}
      <div aria-hidden className="mx-auto flex max-w-7xl items-center gap-3 px-4 pt-6 text-[10px] uppercase tracking-widest sm:gap-6 sm:px-6 lg:px-10">
        <div className="flex-1">
          <div className="mb-1 flex justify-between"><span>P1 {p1.handle}</span><span className="text-snow/40">BCN</span></div>
          <div className="h-3 -skew-x-[20deg] bg-snow/10 p-0.5"><div className="h-full w-full bg-magenta" /></div>
        </div>
        <div className="border-2 border-snow px-2 py-1 font-display text-lg leading-none sm:text-2xl">
          {String(siteConfig.activeSince).slice(2)}<span className="text-cyan">→</span>{String(siteConfig.recordsUntil).slice(2)}
        </div>
        <div className="flex-1">
          <div className="mb-1 flex justify-between"><span className="text-snow/40">BCN</span><span>{p2.handle} P2</span></div>
          <div className="h-3 skew-x-[20deg] bg-snow/10 p-0.5"><div className="ml-auto h-full w-full bg-cyan" /></div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-10 lg:pb-20 lg:pt-16">
        <div aria-hidden className="bg-halftone pointer-events-none absolute -right-10 top-0 size-[28rem] text-magenta opacity-30 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        <p className="inline-block -rotate-2 bg-snow px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
          Est. {siteConfig.activeSince} · Barcelona · FGC
        </p>
        <h1 id="hero-title" className="relative mt-6 font-display text-[clamp(2.3rem,9.6vw,8.5rem)] uppercase leading-[0.88] tracking-[-0.02em]">
          <span className="block">From</span>
          <span className="block sm:pl-[5vw]">Barcelona</span>
          <span className="block">
            to <span className="inline-block -skew-x-6 bg-cyan px-3 text-ink">EVO.</span>
          </span>
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-widest text-snow/90">{siteConfig.subClaim}</p>
            <p className="mt-3 leading-relaxed text-muted">{t("hero.subtitle")}</p>
          </div>
          <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <Link
              href="/partners"
              className="bg-cyan px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_var(--color-magenta)] transition-shadow hover:shadow-[2px_2px_0_var(--color-magenta)]"
            >
              {t("hero.ctaPartner")} ▶
            </Link>
            <Link href="/journey" className="border-2 border-snow px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-snow hover:text-ink">
              {t("hero.ctaJourney")}
            </Link>
          </div>
        </div>
        <p aria-hidden className="mt-12 overflow-hidden whitespace-nowrap text-sm tracking-[0.4em] text-snow/25">
          ↓ ↘ → + P &nbsp; → ↓ ↘ + K &nbsp; ↓ ↙ ← + P &nbsp; ↓ ↘ → ↓ ↘ → + P &nbsp; ← [ 2s ] → + P &nbsp; ↓ ↘ → + P
        </p>
      </div>

      {/* Big numbers */}
      <dl className="mx-auto grid max-w-7xl grid-cols-2 border-y-2 border-line sm:px-6 lg:grid-cols-4 lg:px-10">
        {numbers.map((n, i) => (
          <div key={n.label} className={cn("flex flex-col px-4 py-6 sm:px-6", i % 2 === 1 && "border-l-2 border-line", i === 2 && "lg:border-l-2")}>
            <dt className="order-2 mt-3 text-xs font-bold uppercase tracking-wider text-snow">{n.label}</dt>
            <dd className={cn("order-1 whitespace-nowrap font-display text-[clamp(1.7rem,3.6vw,3.4rem)] uppercase leading-none", i === 3 && "text-cyan")}>{n.value}</dd>
            <dd className="order-3 mt-1 text-[11px] text-muted">{n.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** "In 30 seconds": who / results / offer, as three rounds. */
export function UgPitch() {
  const t = useTranslations();
  const stats = getStats();
  const best = stats.best!;
  const items = [
    { key: "who", href: "#team", cta: `${t("nav.team")} ↓`, body: t("pitch.who.body", { since: siteConfig.activeSince }) },
    {
      key: "results",
      href: "#results",
      cta: `${t("nav.results")} ↓`,
      body: t("pitch.results.body", { editions: stats.evoEditions.length, placement: best.placement, entrants: best.entrants, game: best.game, event: best.event }),
    },
    { key: "offer", href: "#partners", cta: `${t("nav.cta")} ↓`, body: t("pitch.offer.body") },
  ] as const;

  return (
    <section aria-labelledby="pitch-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <h2 id="pitch-title" className="inline-block -rotate-1 bg-magenta px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
        {t("pitch.eyebrow")}
      </h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.key}>
            <a href={item.href} className="group flex h-full flex-col border-2 border-line p-6 transition-colors hover:border-cyan sm:p-7">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan">
                {t("ugHome.round")} {i + 1}
              </span>
              <span className="mt-4 font-display text-[1.75rem] uppercase leading-none">{t(`pitch.${item.key}.title`)}</span>
              <span className="mt-3 text-sm leading-relaxed text-muted">{item.body}</span>
              <span className="mt-auto pt-6 text-xs font-bold uppercase tracking-wider text-snow/70 transition-colors group-hover:text-cyan">{item.cta}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
