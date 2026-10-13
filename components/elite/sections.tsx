import { ArrowRight, ArrowUpRight, Check, Download, ExternalLink } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import { nextChallenge, type ExpenseKey } from "@/data/next-challenge";
import { hasSocialMetrics, socialChannels } from "@/data/social";
import { creator, players } from "@/data/team";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getHighlights, getResults } from "@/lib/results/repository";
import { bracketBeaten, formatTopPercent, isEvo } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";
import { PhotoSlot, VideoSlot } from "./media-slot";

export function SectionTitle({
  index,
  title,
  lead,
  id,
  stack,
  tone = "dark",
}: {
  index: string;
  title: string;
  lead?: string;
  id?: string;
  stack?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("flex flex-col gap-4", !stack && "lg:flex-row lg:items-end lg:justify-between")}>
      <h2 id={id} className="font-display text-[clamp(2.75rem,7vw,5.5rem)] uppercase leading-[0.9]">
        <span className={cn("mr-3 align-top font-heading text-base font-semibold", tone === "dark" ? "text-cyan" : "text-ink/50")}>{index}</span>
        {title}
      </h2>
      {lead && <p className={cn("max-w-sm", tone === "dark" ? "text-muted" : "text-ink/70")}>{lead}</p>}
    </div>
  );
}

/* ───────────────────────── Manifesto (editorial) ───────────────────────── */
export function Manifesto() {
  const t = useTranslations("manifesto");
  const lines = t.raw("lines") as string[];
  const stops = t.raw("stops") as { year: string; place: string }[];

  return (
    <section aria-labelledby="manifesto-title" className="border-y border-line bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="manifesto-title" className="flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
          <span aria-hidden className="h-px w-10 bg-cyan" /> {t("eyebrow")}
        </h2>
        <p className="mt-10 max-w-5xl text-[clamp(1.75rem,4vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
          {lines.map((line, i) => (
            <span key={i} className={cn("block", i === lines.length - 1 ? "text-cyan" : i % 2 ? "text-snow/55" : "text-snow")}>
              {line}
            </span>
          ))}
        </p>
        <ol className="mt-16 grid grid-cols-2 gap-px bg-line sm:grid-cols-5">
          {stops.map((s, i) => {
            const next = i === stops.length - 1;
            return (
              <li key={s.year} className={cn("bg-ink p-5", next && "col-span-2 bg-cyan text-ink sm:col-span-1")}>
                <span className={cn("font-display text-5xl leading-none", next ? "text-ink" : "text-snow")}>{s.year}</span>
                <span className={cn("mt-2 block font-heading text-xs font-semibold uppercase tracking-[0.2em]", next ? "text-ink/70" : "text-muted")}>
                  {s.place}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── Roster ───────────────────────── */
export function Roster() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <section id="team" aria-labelledby="team-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <SectionTitle index="01" id="team-title" title={t("eliteHome.rosterTitle")} lead={t("eliteHome.rosterLead")} />
      <div className="mt-14 divide-y divide-line border-y border-line">
        {players.map((p) => {
          const top = getHighlights(p.id)[0];
          return (
            <article key={p.id} className="group grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:py-12">
              <div className="lg:col-span-5">
                <p className={cn("font-heading text-xs font-semibold uppercase tracking-[0.3em]", p.accent === "cyan" ? "text-cyan" : "text-magenta")}>
                  {t("eliteHome.player")}
                </p>
                <h3 className="mt-2 font-display text-7xl uppercase leading-none transition-transform duration-500 group-hover:translate-x-2 sm:text-8xl">{p.handle}</h3>
                <div className="mt-4 flex gap-5 text-sm">
                  <Link href={`/team#${p.id}`} className="text-snow underline-offset-4 hover:text-cyan hover:underline">
                    {t("teamIntro.profile")} →
                  </Link>
                  <a href={p.startggUser} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-snow">
                    start.gg <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm leading-relaxed text-muted">{t(`teamPage.bios.${p.id}`)}</p>
              </div>
              {top && (
                <div className="lg:col-span-3 lg:text-right">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-muted">{t("eliteHome.bestLabel")}</p>
                  <p className="mt-1 font-display text-6xl leading-none">
                    {top.placement}
                    <span className="text-2xl text-muted">/{top.entrants.toLocaleString(locale)}</span>
                  </p>
                  <p className="mt-1 text-sm text-snow/80">{top.game} · {top.event}</p>
                </div>
              )}
            </article>
          );
        })}
        <article className="grid gap-6 py-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted">{t("teamIntro.creator")}</p>
            <p className="mt-2 font-display text-5xl uppercase leading-none text-snow/40">{creator.name ?? "P3"}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted lg:col-span-7">{t("teamPage.bios.creator")}</p>
        </article>
      </div>
    </section>
  );
}

/* ───────────────────────── Results: leaderboard + bars (C) ───────────────────────── */
export function ResultBar({ r, locale, compact }: { r: Result; locale: string; compact?: boolean }) {
  const t = useTranslations("criterion");
  const pct = bracketBeaten(r.placement, r.entrants);
  const accent = r.player === "kazukun" ? "bg-cyan" : "bg-magenta";
  const text = r.player === "kazukun" ? "text-cyan" : "text-magenta";
  return (
    <li className="group border-b border-line py-5">
      <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1 sm:grid-cols-[8.5rem_1fr_auto]">
        <span className="font-display text-4xl leading-none sm:text-5xl">
          {r.placement}
          <span className="text-lg text-muted">/{r.entrants.toLocaleString(locale)}</span>
        </span>
        <span className="min-w-0">
          <span className="block font-semibold sm:truncate">{r.game}</span>
          <span className="block text-sm text-muted">
            {r.event} · <span className={text}>{r.player === "kazukun" ? "Kazukun" : "BlueKen"}</span>
          </span>
        </span>
        <span className={cn("font-display text-xl uppercase", text)}>Top {formatTopPercent(r.placement, r.entrants)}</span>
      </div>
      <div className={cn("mt-3 flex items-center gap-3", !compact && "sm:pl-[9.5rem]")}>
        <div
          role="img"
          aria-label={t("short", { pct: Math.floor(pct) })}
          className="h-3 flex-1 -skew-x-[20deg] bg-white/[0.06] p-[2px] ring-1 ring-inset ring-white/10"
        >
          <div className={cn("h-full", accent)} style={{ width: `${pct}%` }} />
        </div>
        <span className="w-12 text-right font-heading text-xs font-semibold tabular-nums text-snow/80">{Math.floor(pct)}%</span>
      </div>
    </li>
  );
}

export function CriterionNote({ className }: { className?: string }) {
  const t = useTranslations("criterion");
  return (
    <aside className={cn("border-l-2 border-cyan bg-surface/50 p-4 text-sm leading-relaxed text-muted", className)}>
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("title")}</p>
      <p className="mt-2">{t("note")}</p>
    </aside>
  );
}

export function Leaderboard() {
  const t = useTranslations();
  const locale = useLocale();
  const evo = getResults({ sort: "best" }).filter((r) => isEvo(r) && r.format === "singles").slice(0, 7);

  return (
    <section id="results" aria-labelledby="results-title" className="scroll-mt-20 bg-[#0b0f1a] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle index="02" id="results-title" title={t("eliteHome.leaderboardTitle")} lead={t("eliteHome.leaderboardLead")} />
        <p className="mt-8 flex items-center gap-3 text-xs text-muted">
          <span aria-hidden className="inline-block h-2.5 w-10 -skew-x-[20deg] bg-cyan" /> {t("criterion.label")}
        </p>
        <ol className="mt-4 border-t border-line">
          {evo.map((r) => <ResultBar key={r.id} r={r} locale={locale} />)}
        </ol>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <CriterionNote />
          <ButtonLink href="/results" variant="secondary">
            {t("highlights.cta")} <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Audience / social ───────────────────────── */
export function Audience() {
  const t = useTranslations("social");
  const format = useFormatter();
  const channels = socialChannels.filter((c) => c.url);
  const soon = socialChannels.filter((c) => !c.url);

  return (
    <section aria-labelledby="audience-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
      <SectionTitle index="03" id="audience-title" title={t("title")} lead={t("lead")} />
      <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c) => (
          <li key={c.platform} className="bg-ink">
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-6 transition-colors hover:bg-surface">
              <span className="flex items-center justify-between font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {c.label} <ExternalLink aria-hidden className="size-3.5 transition-colors group-hover:text-cyan" />
              </span>
              <span className="mt-2 text-sm text-snow/80">{c.handle}</span>
              <dl className="mt-6 space-y-3">
                {c.followers !== null && (
                  <div className="flex flex-col-reverse">
                    <dt className="text-xs text-muted">{c.platform === "youtube" ? t("subscribers") : t("followers")}</dt>
                    <dd className="font-display text-5xl leading-none">{format.number(c.followers)}</dd>
                  </div>
                )}
                {c.contentCount !== null && (
                  <div className="flex flex-col-reverse">
                    <dt className="text-xs text-muted">{t("videos")}</dt>
                    <dd className="font-display text-5xl leading-none">{format.number(c.contentCount)}</dd>
                  </div>
                )}
                {c.avgViews !== null && (
                  <div className="flex flex-col-reverse">
                    <dt className="text-xs text-muted">{t("avgViews")}</dt>
                    <dd className="font-display text-5xl leading-none">{format.number(c.avgViews)}</dd>
                  </div>
                )}
                {c.followers === null && c.contentCount === null && c.avgViews === null && (
                  <dd className="font-display text-3xl uppercase leading-none text-snow/80">{t("follow")} →</dd>
                )}
              </dl>
              {c.updatedAt && (
                <span className="mt-auto pt-6 text-[11px] text-muted/80">
                  {t("publicSource")} · {t("updated", { date: format.dateTime(new Date(c.updatedAt), { dateStyle: "medium" }) })}
                </span>
              )}
            </a>
          </li>
        ))}
        {soon.map((c) => (
          <li key={c.platform} className="flex flex-col justify-between bg-ink p-6">
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted">{c.label}</span>
            <span className="mt-8 font-display text-2xl uppercase text-snow/30">{t("soon")}</span>
          </li>
        ))}
      </ul>
      {!hasSocialMetrics() && <p className="mt-6 max-w-2xl text-sm text-muted">{t("none")}</p>}
    </section>
  );
}

/* ───────────────────────── Content ───────────────────────── */
export function ContentBlock() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const youtube = socialChannels.find((c) => c.platform === "youtube" && c.url);

  return (
    <section id="content" aria-labelledby="content-title" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-32">
      <div className="lg:col-span-5">
        <SectionTitle index="04" id="content-title" title={t("eliteHome.contentTitle")} lead={t("production.body")} stack />
        <ol className="mt-10 border-t border-line">
          {(["vertical", "vlog", "photo", "interviews", "bts", "branded"] as const).map((k, i) => (
            <li key={k} className="group flex items-baseline gap-5 border-b border-line py-4">
              <span className="text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl uppercase transition-colors group-hover:text-cyan">{t(`production.formats.${k}.title`)}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-4 lg:col-span-7">
        <VideoSlot video={media.showreel} locale={locale} soonLabel={t("media.videoSoon")} />
        <div className="grid grid-cols-3 gap-3">
          {(media.gallery.length ? media.gallery.slice(0, 3) : [null, null, null]).map((photo, i) => (
            <PhotoSlot
              key={i}
              photo={photo}
              locale={locale}
              monogram={["EVO", "BCN", "FGC"][i]}
              accent={(["cyan", "magenta", "snow"] as const)[i]}
              soonLabel={t("media.photoSoon")}
              sizes="(min-width: 1024px) 18vw, 33vw"
              monogramClassName="text-[clamp(2rem,5vw,4rem)]"
              className="aspect-[4/5]"
            />
          ))}
        </div>
        {youtube && (
          <a href={youtube.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start font-heading text-sm font-semibold text-snow underline-offset-4 hover:text-cyan hover:underline">
            YouTube · {youtube.handle} <ArrowUpRight aria-hidden className="size-4" />
          </a>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Next Challenge ───────────────────────── */
export function NextChallenge() {
  const t = useTranslations("nextChallenge");
  const format = useFormatter();
  const { season, targets, expenses, currency } = nextChallenge;
  const keys = Object.keys(expenses) as ExpenseKey[];
  const total = keys.every((k) => expenses[k] !== null) ? keys.reduce((s, k) => s + (expenses[k] ?? 0), 0) : null;

  return (
    <section id="next-challenge" aria-labelledby="next-title" className="relative isolate scroll-mt-20 overflow-hidden border-y border-line py-24 lg:py-32">
      <div aria-hidden className="absolute -right-32 top-0 -z-10 size-[36rem] rounded-full bg-cyan/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cyan">05 — {t("eyebrow")}</p>
        <h2 id="next-title" className="mt-4 font-display text-[clamp(3.5rem,10vw,8rem)] uppercase leading-[0.85]">
          {t("title", { season })}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t("lead")}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <ul className="space-y-px self-start bg-line lg:col-span-5">
            {targets.map((target) => {
              const name = target.id === "europe-circuit" ? t("names.europe-circuit") : target.name;
              return (
                <li key={target.id} className="bg-ink p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-4xl uppercase leading-none">{name}</h3>
                    <span
                      className={cn(
                        "rounded-sm px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset",
                        target.status === "confirmed" ? "bg-cyan/10 text-cyan ring-cyan/30" : "bg-warn/10 text-warn ring-warn/30",
                      )}
                    >
                      {target.status === "confirmed" ? t("confirmed") : t("target")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{[target.when, target.where].filter(Boolean).join(" · ") || t("tbd")}</p>
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-7">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("expensesTitle")}</h3>
            <dl className="mt-4 border-t border-line">
              {keys.map((k) => (
                <div key={k} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-4">
                  <dt>
                    <span className="block font-display text-2xl uppercase">{t(`expenses.${k}.title`)}</span>
                    <span className="text-sm text-muted">{t(`expenses.${k}.body`)}</span>
                  </dt>
                  <dd className={cn("text-right font-heading text-sm", expenses[k] === null ? "text-muted" : "font-display text-3xl")}>
                    {expenses[k] === null ? t("budgetPending") : format.number(expenses[k]!, { style: "currency", currency, maximumFractionDigits: 0 })}
                  </dd>
                </div>
              ))}
              {total !== null && (
                <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4">
                  <dt className="font-heading text-xs font-semibold uppercase tracking-[0.2em]">Total</dt>
                  <dd className="font-display text-4xl text-cyan">{format.number(total, { style: "currency", currency, maximumFractionDigits: 0 })}</dd>
                </div>
              )}
            </dl>
            <ButtonLink href={{ pathname: "/contact", query: { type: "main" } }} size="lg" className="mt-8">
              {t("cta", { season })} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Packages (white) + media kit ───────────────────────── */
export function EliteTiers() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const tiers = ["supporter", "event", "main"] as const;

  return (
    <section id="partners" aria-labelledby="partners-title" className="scroll-mt-20 bg-snow py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">06 — {t("eliteHome.tiersTitle")}</p>
        <h2 id="partners-title" className="mt-4 max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.86]">
          {siteConfig.partnerClaim}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ink/70">{t("benefits.body")}</p>

        <div className="mt-14 grid border-t-2 border-ink lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const main = tier === "main";
            return (
              <div key={tier} className={cn("flex flex-col p-6 sm:p-8", i > 0 && "border-t border-ink/15 lg:border-l lg:border-t-0", main && "bg-ink text-snow")}>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold tabular-nums opacity-60">0{i + 1}</span>
                  <span className={cn("font-heading text-[10px] font-semibold uppercase tracking-[0.2em]", main ? "text-cyan" : "text-ink/50")}>
                    {t("common.proposal")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-5xl uppercase leading-none">{t(`packages.tiers.${tier}.name`)}</h3>
                <p className="mt-2 text-sm opacity-70">{t(`packages.tiers.${tier}.tagline`)}</p>
                <ul className="mt-8 space-y-2.5 text-sm">
                  {(t.raw(`packages.tiers.${tier}.items`) as string[]).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", main ? "text-cyan" : "text-ink/40")} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col items-start gap-3 pt-10">
                  <span className="text-[11px] uppercase tracking-[0.18em] opacity-60">{t("packages.price")}</span>
                  <Link
                    href={{ pathname: "/contact", query: { type: tier } }}
                    className={cn("group inline-flex items-center gap-2 font-display text-lg uppercase", main ? "text-cyan" : "text-ink")}
                  >
                    {t("packages.cta")} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media kit */}
        <div className="mt-16 grid gap-6 border-2 border-ink p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">{t("mediaKit.eyebrow")}</p>
            <h3 className="mt-2 font-display text-4xl uppercase leading-none">{t("mediaKit.title")}</h3>
            <p className="mt-3 max-w-xl text-ink/70">{t("mediaKit.body")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={`/media-kit/beyond-the-fight-media-kit-${locale}.pdf`}
              download
              className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 font-display text-lg uppercase text-snow transition-colors hover:bg-cyan hover:text-ink"
            >
              <Download aria-hidden className="size-4" /> {t("mediaKit.download")}
            </a>
            <Link href="/media-kit" className="text-center text-sm text-ink/70 underline underline-offset-4 hover:text-ink">
              {t("mediaKit.view")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
export function EliteCta() {
  const t = useTranslations();
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(86,215,255,0.16),transparent),radial-gradient(50%_70%_at_10%_90%,rgba(253,75,157,0.12),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="cta-title" className="font-display text-[clamp(3.5rem,12vw,11rem)] uppercase leading-[0.82]">{t("eliteHome.ctaTitle")}</h2>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg text-muted">{t("contactCta.body")}</p>
          <ButtonLink href="/contact" size="lg">
            Let&apos;s collaborate <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
