import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import { players } from "@/data/team";
import type { Locale } from "@/i18n/routing";
import { getStats } from "@/lib/results/repository";
import { formatTopPercent } from "@/lib/results/stats";
import { cn } from "@/lib/utils";
import { PhotoSlot } from "./media-slot";

const TICKER = ["EVO Online 2021", "EVO Las Vegas 2022", "EVO Las Vegas 2023", "EVO France 2025", "EVO France 2026"];

export function Ticker() {
  return (
    <div className="overflow-hidden bg-cyan text-ink" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 py-1.5">
        {[0, 1, 2, 3].flatMap((k) =>
          TICKER.map((item) => (
            <span key={`${k}-${item}`} className="flex items-center gap-10 font-display text-xs uppercase tracking-[0.2em]">
              {item} <span className="size-1.5 rotate-45 bg-ink" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}

export function EliteHero() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const stats = getStats();
  const best = stats.best!;
  const { documentedRecords: rec } = siteConfig;

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
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[40rem] rounded-full bg-magenta/10 blur-[140px]" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-cyan/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pt-8 sm:px-6 lg:grid-cols-12 lg:px-10 lg:pt-12">
        <div className="flex flex-col justify-end pb-4 lg:col-span-6 lg:pb-14">
          <p className="mb-6 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
            <span aria-hidden className="h-px w-10 bg-cyan" /> Barcelona · FGC · {siteConfig.activeSince}–{siteConfig.recordsUntil}
          </p>
          <h1 id="hero-title" className="font-display text-[clamp(3.4rem,7.6vw,7.75rem)] uppercase leading-[0.86] tracking-[-0.01em]">
            From
            <br />
            Barcelona
            <br />
            <span className="text-cyan">to EVO.</span>
          </h1>
          <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-snow/90">{siteConfig.subClaim}</p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{t("hero.subtitle")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/partners" size="lg">
              {t("hero.ctaPartner")} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/journey" size="lg" variant="secondary">
              {t("hero.ctaJourney")}
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-6">
          {players.map((p, i) => (
            <div key={p.id} className={cn("relative", i === 1 && "lg:mt-16")}>
              <PhotoSlot
                photo={media.players[p.id]}
                locale={locale}
                monogram={p.handle.slice(0, 2)}
                accent={p.accent}
                soonLabel={t("media.photoSoon")}
                priority
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="aspect-[3/4.2] lg:aspect-auto lg:h-[min(70vh,680px)]"
              />
              <p className={cn("pointer-events-none absolute bottom-3 left-3 font-display text-2xl uppercase sm:text-3xl", p.accent === "cyan" ? "text-cyan" : "text-magenta")}>
                {p.handle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Big numbers (editorial) */}
      <dl className="mx-auto mt-10 grid max-w-7xl grid-cols-2 border-y border-line sm:px-6 lg:grid-cols-4 lg:px-10">
        {numbers.map((n, i) => (
          <div key={n.label} className={cn("flex flex-col px-4 py-6 sm:px-6", i % 2 === 1 && "border-l border-line", i === 2 && "lg:border-l")}>
            <dt className="order-2 mt-2 font-heading text-sm font-semibold text-snow">{n.label}</dt>
            <dd className="order-1 whitespace-nowrap font-display text-[clamp(2.25rem,5.2vw,4.5rem)] uppercase leading-none">{n.value}</dd>
            <dd className="order-3 mt-1 text-xs text-muted">{n.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** "In 30 seconds": who / results / offer — the conversion summary right under the hero. */
export function Pitch() {
  const t = useTranslations("pitch");
  const nav = useTranslations("nav");
  const stats = getStats();
  const best = stats.best!;
  const items = [
    { key: "who", href: "/team", body: t("who.body", { since: siteConfig.activeSince }) },
    {
      key: "results",
      href: "/results",
      body: t("results.body", { editions: stats.evoEditions.length, placement: best.placement, entrants: best.entrants, game: best.game, event: best.event }),
    },
    { key: "offer", href: "/partners", body: t("offer.body") },
  ] as const;

  return (
    <section aria-labelledby="pitch-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <h2 id="pitch-title" className="flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
        <span aria-hidden className="h-px w-10 bg-cyan" /> {t("eyebrow")}
      </h2>
      <ol className="mt-8 grid gap-px bg-line md:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.key} className="bg-ink">
            <a href={item.href === "/partners" ? "#partners" : item.href === "/results" ? "#results" : "#team"} className="group flex h-full flex-col p-6 transition-colors hover:bg-surface sm:p-8">
              <span className="font-display text-5xl leading-none text-cyan/80">0{i + 1}</span>
              <span className="mt-4 font-display text-3xl uppercase leading-none">{t(`${item.key}.title`)}</span>
              <span className="mt-3 text-muted">{item.body}</span>
              <span className="mt-auto pt-6 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-snow/70 transition-colors group-hover:text-cyan">
                {item.key === "offer" ? nav("cta") : item.key === "who" ? `${nav("team")} ↓` : `${nav("results")} ↓`}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
