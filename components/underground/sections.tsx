import { Download } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { PhotoSlot, VideoSlot } from "@/components/elite/media-slot";
import { siteConfig } from "@/config/site";
import { journeyYears } from "@/data/journey";
import { media } from "@/data/media";
import { nextChallenge, type ExpenseKey } from "@/data/next-challenge";
import { hasSocialMetrics, socialChannels } from "@/data/social";
import { creator, players, type PlayerProfile } from "@/data/team";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getHighlights, getResults } from "@/lib/results/repository";
import { bracketBeaten, formatTopPercent, isEvo } from "@/lib/results/stats";
import type { Result } from "@/lib/results/types";
import { cn } from "@/lib/utils";
import { UgTitle } from "./hero";

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10";

/* ───────────────────────── Manifesto ───────────────────────── */
export function UgManifesto() {
  const t = useTranslations("manifesto");
  const lines = t.raw("lines") as string[];
  return (
    <section aria-labelledby="manifesto-title" className="border-y-2 border-line py-20 lg:py-28">
      <div className={container}>
        <h2 id="manifesto-title" className="text-[11px] font-bold uppercase tracking-widest text-muted">
          {"//"} {t("eyebrow")}
        </h2>
        <p className="mt-8 max-w-5xl text-[clamp(1.4rem,3.4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em]">
          {lines.map((line, i) => (
            <span key={i} className={cn("block", i === lines.length - 1 ? "text-cyan" : i % 2 ? "text-snow/55" : "text-snow")}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Select your player ───────────────────────── */
export function UgRoster() {
  const t = useTranslations();
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-14 py-20 lg:py-28">
      <div className={container}>
        <UgTitle id="team-title" title={t("ugHome.select")} lead={t("eliteHome.rosterLead")} cursor />
      </div>
      <div className={cn(container, "mt-12 grid gap-4 lg:grid-cols-[1.15fr_1fr]")}>
        {players.map((p, i) => (
          <PlayerPanel key={p.id} player={p} side={i === 0 ? "p1" : "p2"} className={i === 1 ? "lg:mt-20" : undefined} />
        ))}
      </div>
      {/* P3 */}
      <div className={cn(container, "mt-4")}>
        <div className="flex flex-col gap-4 border-2 border-dashed border-snow/25 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-5">
            <span className="font-display text-4xl text-snow/30">P3</span>
            <div>
              <p className="font-display text-2xl uppercase">
                {creator.name ?? t("ugHome.creator")} {!creator.name && <span className="text-snow/30">???</span>}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted">{t("ugHome.creatorRole")}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t("teamPage.bios.creator")}</p>
            </div>
          </div>
          {!creator.name && (
            <span className="self-start bg-snow/10 px-2 py-1 text-[10px] uppercase tracking-widest text-cyan sm:self-auto">{t("common.pending")}</span>
          )}
        </div>
      </div>
    </section>
  );
}

function PlayerPanel({ player: p, side, className }: { player: PlayerProfile; side: "p1" | "p2"; className?: string }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const p1 = side === "p1";
  const results = getHighlights(p.id).slice(0, 4);
  const photo = media.players[p.id];

  return (
    <article id={p.id} className={cn("relative overflow-hidden border-2", p1 ? "border-magenta" : "border-cyan", className)}>
      <div className={cn("flex items-center justify-between px-5 py-2 text-xs font-bold uppercase tracking-widest text-ink", p1 ? "bg-magenta" : "bg-cyan")}>
        <span>{p1 ? "P1" : "P2"}</span>
        <span>Barcelona</span>
      </div>
      <div className="grid sm:grid-cols-[minmax(0,13rem)_1fr]">
        <PhotoSlot
          photo={photo}
          locale={locale}
          monogram={p.handle.slice(0, 2)}
          accent={p1 ? "magenta" : "cyan"}
          soonLabel={t("media.photoSoon")}
          sizes="(min-width: 640px) 13rem, 100vw"
          monogramClassName="text-[clamp(4rem,10vw,6rem)]"
          className="aspect-[16/9] sm:aspect-auto sm:min-h-full"
        />
        <div className="relative p-5 sm:p-7">
          <div aria-hidden className={cn("bg-halftone absolute right-0 top-0 h-full w-1/2 opacity-20 [mask-image:linear-gradient(to_left,black,transparent)]", p1 ? "text-magenta" : "text-cyan")} />
          <h3 className="relative font-display text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-none">{p.handle}</h3>
          <p className="relative mt-4 text-sm leading-relaxed text-muted">{t(`teamPage.bios.${p.id}`)}</p>
          <div className="relative mt-6 grid gap-6 xl:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-snow/45">{t("ugHome.games")}</p>
              <ul className="mt-3 space-y-1.5 text-xs">
                {p.games.map((g, i) => (
                  <li key={g} className="flex gap-2">
                    <span className="text-snow/35">{String(i + 1).padStart(2, "0")}</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-snow/45">{t("ugHome.best")}</p>
              <table className="mt-3 w-full text-xs">
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id} className="border-b border-snow/10">
                      <td className="py-1.5 pr-2">
                        <span className="block">{r.game}</span>
                        <span className="text-snow/40">{r.event}</span>
                      </td>
                      <td className={cn("whitespace-nowrap py-1.5 text-right font-bold", p1 ? "text-magenta" : "text-cyan")}>
                        {r.placement}/{r.entrants.toLocaleString(locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-widest">
            <Link href={`/team#${p.id}`} className="text-snow hover:text-cyan">{t("ugHome.profile")} ▶</Link>
            <a href={p.startggUser} target="_blank" rel="noopener noreferrer" className="text-snow/50 hover:text-snow">start.gg ↗</a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ───────────────────────── Health bars — Evo results ───────────────────────── */
function HealthBar({ r, locale }: { r: Result; locale: string }) {
  const t = useTranslations("criterion");
  const pct = bracketBeaten(r.placement, r.entrants);
  const p1 = r.player === "kazukun";
  return (
    <li>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm">
          <span className={cn("mr-2 px-1.5 py-0.5 text-[10px] font-bold uppercase", p1 ? "bg-magenta text-ink" : "bg-ink text-cyan")}>
            {p1 ? "P1 Kazukun" : "P2 BlueKen"}
          </span>
          <span className="font-bold">{r.game}</span> <span className="text-ink/55">· {r.event}</span>
        </p>
        <p className="text-sm">
          <span className="font-display text-2xl">{r.placement}</span>
          <span className="text-ink/55">/{r.entrants.toLocaleString(locale)}</span>
          <span className="ml-3 text-xs font-bold">TOP {formatTopPercent(r.placement, r.entrants)}</span>
        </p>
      </div>
      <div role="img" aria-label={t("short", { pct: Math.floor(pct) })} className="mt-2 h-5 -skew-x-[20deg] border-2 border-ink bg-ink/5 p-0.5">
        <div className={cn("h-full", p1 ? "bg-magenta" : "bg-ink")} style={{ width: `${pct}%` }} />
      </div>
      <p aria-hidden className="mt-1 text-[10px] uppercase tracking-widest text-ink/50">
        {Math.floor(pct)}% · {t("label")}
      </p>
    </li>
  );
}

export function UgResults() {
  const t = useTranslations();
  const locale = useLocale();
  const evo = getResults({ sort: "best" }).filter((r) => isEvo(r) && r.format === "singles").slice(0, 7);

  return (
    <section id="results" aria-labelledby="results-title" className="scroll-mt-14 bg-snow py-20 text-ink lg:py-28">
      <div className={container}>
        <UgTitle id="results-title" title={t("ugHome.healthTitle")} lead={t("ugHome.healthLead")} tone="light" />
        <ol className="mt-14 space-y-7">
          {evo.map((r) => <HealthBar key={r.id} r={r} locale={locale} />)}
        </ol>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <aside className="border-l-4 border-magenta bg-ink/5 p-4 text-xs leading-relaxed text-ink/70">
            <p className="font-bold uppercase tracking-widest text-ink">{t("criterion.title")}</p>
            <p className="mt-2">{t("criterion.note")}</p>
          </aside>
          <Link href="/results" className="bg-ink px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-cyan shadow-[5px_5px_0_var(--color-magenta)] transition-shadow hover:shadow-[2px_2px_0_var(--color-magenta)]">
            {t("highlights.cta")} ▶
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Stage select — journey ───────────────────────── */
export function UgStages() {
  const t = useTranslations();
  const all = getResults({ sort: "date-asc" });

  return (
    <section id="journey" aria-labelledby="journey-title" className="scroll-mt-14 py-20 lg:py-28">
      <div className={container}>
        <UgTitle id="journey-title" title={t("ugHome.stageSelect")} lead={t("timeline.title")} />
        <ol className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {journeyYears.map((y, i) => {
            const big = y.year === 2022 || y.year === 2025;
            const pending = y.status === "pending";
            const count = all.filter((r) => r.year === y.year).length;
            return (
              <li
                key={y.year}
                className={cn(
                  "group relative flex min-h-56 flex-col justify-between overflow-hidden border-2 p-4 transition-colors",
                  big && "col-span-2 md:min-h-72",
                  pending ? "border-dashed border-snow/20 text-snow/45" : "border-line hover:border-cyan",
                )}
              >
                {!pending && (
                  <div aria-hidden className={cn("bg-halftone absolute -bottom-10 -right-10 size-48 opacity-[0.12] transition-opacity group-hover:opacity-30", i % 2 ? "text-cyan" : "text-magenta")} />
                )}
                <div className="relative flex items-start justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-snow/50">
                    {t("ugHome.stage")} {String(i + 1).padStart(2, "0")}
                  </span>
                  {count > 0 && <span className="bg-cyan px-1.5 text-[10px] font-bold text-ink">×{count}</span>}
                </div>
                <div className="relative">
                  <p className={cn("font-display leading-none", big ? "text-6xl sm:text-8xl" : "text-[2rem] sm:text-5xl")}>{y.year}</p>
                  <p className="mt-3 text-sm font-bold uppercase tracking-wide">{t(`timeline.years.${y.year}.title`)}</p>
                  <p className={cn("mt-2 text-xs leading-relaxed text-snow/60", !big && "line-clamp-4")}>
                    {pending ? t("timeline.noRecords") : t(`timeline.years.${y.year}.body`)}
                  </p>
                </div>
              </li>
            );
          })}
          <li className="col-span-2 md:col-span-3">
            <a href="#next-challenge" className="group flex h-full min-h-56 flex-col justify-between border-2 border-cyan bg-cyan p-4 text-ink transition-colors hover:bg-snow">
              <span className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>{t("ugHome.stage")} {String(journeyYears.length + 1).padStart(2, "0")}</span>
                <span>{t("common.proposal")}</span>
              </span>
              <span>
                <span className="block font-display text-5xl leading-none sm:text-7xl">{nextChallenge.season}</span>
                <span className="mt-3 block text-sm font-bold uppercase tracking-wide">{t("ugHome.nextStage")}</span>
                <span className="mt-1 block text-xs">
                  {t("timeline.nextBody")} <span className="inline-block transition-transform group-hover:translate-x-1">▶</span>
                </span>
              </span>
            </a>
          </li>
        </ol>
        <Link href="/journey" className="mt-8 inline-block text-xs font-bold uppercase tracking-widest text-snow/70 hover:text-cyan">
          {t("timeline.cta")} ▶
        </Link>
      </div>
    </section>
  );
}

/* ───────────────────────── Channels ───────────────────────── */
export function UgAudience() {
  const t = useTranslations("social");
  const format = useFormatter();
  const channels = socialChannels.filter((c) => c.url);
  const soon = socialChannels.filter((c) => !c.url);

  return (
    <section aria-labelledby="audience-title" className="border-t-2 border-line py-20 lg:py-28">
      <div className={container}>
        <UgTitle id="audience-title" title={t("title")} lead={t("lead")} />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <li key={c.platform}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col border-2 border-line p-5 transition-colors hover:border-cyan">
                <span className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted">
                  {c.label} <span aria-hidden className="transition-colors group-hover:text-cyan">↗</span>
                </span>
                <span className="mt-2 break-all text-xs text-snow/80">{c.handle}</span>
                <dl className="mt-6 space-y-3">
                  {c.followers !== null && (
                    <div className="flex flex-col-reverse">
                      <dt className="text-[11px] text-muted">{c.platform === "youtube" ? t("subscribers") : t("followers")}</dt>
                      <dd className="font-display text-4xl leading-none">{format.number(c.followers)}</dd>
                    </div>
                  )}
                  {c.contentCount !== null && (
                    <div className="flex flex-col-reverse">
                      <dt className="text-[11px] text-muted">{t("videos")}</dt>
                      <dd className="font-display text-4xl leading-none">{format.number(c.contentCount)}</dd>
                    </div>
                  )}
                  {c.avgViews !== null && (
                    <div className="flex flex-col-reverse">
                      <dt className="text-[11px] text-muted">{t("avgViews")}</dt>
                      <dd className="font-display text-4xl leading-none">{format.number(c.avgViews)}</dd>
                    </div>
                  )}
                  {c.followers === null && c.contentCount === null && c.avgViews === null && (
                    <dd className="font-display text-2xl uppercase leading-none text-snow/80">{t("follow")} ▶</dd>
                  )}
                </dl>
                {c.updatedAt && (
                  <span className="mt-auto pt-6 text-[10px] text-muted/80">
                    {t("publicSource")} · {t("updated", { date: format.dateTime(new Date(c.updatedAt), { dateStyle: "medium" }) })}
                  </span>
                )}
              </a>
            </li>
          ))}
          {soon.map((c) => (
            <li key={c.platform} className="flex flex-col justify-between border-2 border-dashed border-snow/15 p-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{c.label}</span>
              <span className="mt-8 font-display text-xl uppercase text-snow/30">{t("soon")}</span>
            </li>
          ))}
        </ul>
        {!hasSocialMetrics() && <p className="mt-6 max-w-2xl text-sm text-muted">{t("none")}</p>}
      </div>
    </section>
  );
}

/* ───────────────────────── Replays — content ───────────────────────── */
export function UgContent() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const youtube = socialChannels.find((c) => c.platform === "youtube" && c.url);

  return (
    <section id="content" aria-labelledby="content-title" className="scroll-mt-14 border-y-2 border-line py-20 lg:py-28">
      <div className={cn(container, "grid gap-12 lg:grid-cols-12")}>
        <div className="lg:col-span-5">
          <h2 id="content-title" className="font-display text-[clamp(2rem,3.7vw,3.4rem)] uppercase leading-[0.95]">{t("ugHome.replayTitle")}</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted">{t("production.body")}</p>
          <ul className="mt-8">
            {(["vertical", "vlog", "photo", "interviews", "bts", "branded"] as const).map((k, i) => (
              <li key={k} className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-snow/10 py-4">
                <span className="text-xs text-magenta">
                  <span aria-hidden className="inline-block size-2 rounded-full bg-magenta group-hover:animate-pulse" /> REC.{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl uppercase transition-transform group-hover:translate-x-2 sm:text-2xl">{t(`production.formats.${k}.title`)}</span>
                <span className="col-start-2 mt-1 text-xs text-snow/55">{t(`production.formats.${k}.body`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-7">
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
                monogramClassName="text-[clamp(1.6rem,4vw,3rem)]"
                className="aspect-[4/5]"
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {youtube && (
              <a href={youtube.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-snow hover:text-cyan">
                YouTube · {youtube.handle} ↗
              </a>
            )}
            {media.gallery.length === 0 && (
              <span className="border border-cyan px-2 py-1 text-[10px] uppercase tracking-widest text-cyan">{t("ugHome.portfolioPending")}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Next stage — 2027 ───────────────────────── */
export function UgNextChallenge() {
  const t = useTranslations("nextChallenge");
  const format = useFormatter();
  const { season, targets, expenses, currency } = nextChallenge;
  const keys = Object.keys(expenses) as ExpenseKey[];
  const total = keys.every((k) => expenses[k] !== null) ? keys.reduce((s, k) => s + (expenses[k] ?? 0), 0) : null;

  return (
    <section id="next-challenge" aria-labelledby="next-title" className="relative isolate scroll-mt-14 overflow-hidden py-20 lg:py-28">
      <div aria-hidden className="bg-halftone absolute -right-16 top-0 -z-10 size-[32rem] text-cyan opacity-15 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div className={container}>
        <p className="inline-block -rotate-1 bg-cyan px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">{t("eyebrow")}</p>
        <h2 id="next-title" className="mt-5 font-display text-[clamp(2.6rem,9vw,7rem)] uppercase leading-[0.88]">{t("title", { season })}</h2>
        <p className="mt-6 max-w-2xl text-muted">{t("lead")}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <ul className="space-y-3 self-start lg:col-span-5">
            {targets.map((target) => (
              <li key={target.id} className="border-2 border-line p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-2xl uppercase leading-none sm:text-3xl">
                    {target.id === "europe-circuit" ? t("names.europe-circuit") : target.name}
                  </h3>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                      target.status === "confirmed" ? "bg-cyan text-ink" : "border border-warn text-warn",
                    )}
                  >
                    {target.status === "confirmed" ? t("confirmed") : t("target")}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted">{[target.when, target.where].filter(Boolean).join(" · ") || t("tbd")}</p>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-7">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan">{t("expensesTitle")}</h3>
            <dl className="mt-4 border-t-2 border-line">
              {keys.map((k) => (
                <div key={k} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-4">
                  <dt>
                    <span className="block text-sm font-bold uppercase tracking-wide">{t(`expenses.${k}.title`)}</span>
                    <span className="text-xs text-muted">{t(`expenses.${k}.body`)}</span>
                  </dt>
                  <dd className={cn("text-right", expenses[k] === null ? "text-[10px] uppercase tracking-widest text-muted" : "font-display text-2xl")}>
                    {expenses[k] === null ? t("budgetPending") : format.number(expenses[k]!, { style: "currency", currency, maximumFractionDigits: 0 })}
                  </dd>
                </div>
              ))}
              {total !== null && (
                <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4">
                  <dt className="text-xs font-bold uppercase tracking-widest">Total</dt>
                  <dd className="font-display text-3xl text-cyan">{format.number(total, { style: "currency", currency, maximumFractionDigits: 0 })}</dd>
                </div>
              )}
            </dl>
            <Link
              href={{ pathname: "/contact", query: { type: "main" } }}
              className="mt-8 inline-block bg-cyan px-6 py-4 text-sm font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_var(--color-magenta)] transition-shadow hover:shadow-[2px_2px_0_var(--color-magenta)]"
            >
              {t("cta", { season })} ▶
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Choose your level + media kit ───────────────────────── */
export function UgTiers() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const tiers = ["supporter", "event", "main"] as const;

  return (
    <section id="partners" aria-labelledby="partners-title" className="scroll-mt-14 border-t-2 border-line py-20 lg:py-28">
      <div className={container}>
        <p className="text-xs font-bold uppercase tracking-widest text-cyan">{siteConfig.partnerClaim}</p>
        <h2 id="partners-title" className="mt-3 font-display text-[clamp(2.4rem,7vw,6rem)] uppercase leading-none">{t("ugHome.tiersTitle")}</h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{t("benefits.body")}</p>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const lvl = i + 1;
            const max = tier === "main";
            return (
              <article
                key={tier}
                className={cn("flex flex-col border-2 p-6 transition-transform hover:-translate-y-1", max ? "border-cyan bg-cyan text-ink lg:-rotate-1" : "border-snow/20")}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest">
                  <span>{t("ugHome.level")} {lvl}</span>
                  <span className={max ? "font-bold" : "text-snow/50"}>{t("common.proposal")}</span>
                </div>
                {/* super meter */}
                <div aria-hidden className="mt-4 grid grid-cols-3 gap-1">
                  {[1, 2, 3].map((s) => (
                    <span key={s} className={cn("h-2.5 -skew-x-[25deg]", s <= lvl ? (max ? "bg-ink" : "bg-magenta") : max ? "bg-ink/15" : "bg-snow/10")} />
                  ))}
                </div>
                <h3 className="mt-8 font-display text-[clamp(1.8rem,8.5vw,2.4rem)] uppercase leading-none">{t(`packages.tiers.${tier}.name`)}</h3>
                <p className={cn("mt-2 text-sm", max ? "text-ink/70" : "text-snow/60")}>{t(`packages.tiers.${tier}.tagline`)}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {(t.raw(`packages.tiers.${tier}.items`) as string[]).map((item) => (
                    <li key={item} className="flex gap-2"><span aria-hidden>+</span>{item}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <p className={cn("text-[10px] uppercase tracking-widest", max ? "text-ink/60" : "text-snow/45")}>{t("packages.price")}</p>
                  <Link
                    href={{ pathname: "/contact", query: { type: tier } }}
                    className={cn("mt-3 block py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors", max ? "bg-ink text-cyan hover:bg-magenta hover:text-ink" : "bg-snow text-ink hover:bg-cyan")}
                  >
                    {t("packages.cta")} ▶
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Media kit */}
        <div className="mt-10 grid gap-6 border-2 border-dashed border-snow/25 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan">{t("mediaKit.eyebrow")}</p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-none">{t("mediaKit.title")}</h3>
            <p className="mt-3 max-w-xl text-sm text-muted">{t("mediaKit.body")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <TrackedAnchor
              event="media_kit_download"
              props={{ source: "home" }}
              href={`/media-kit/beyond-the-fight-media-kit-${locale}.pdf`}
              download
              className="inline-flex items-center justify-center gap-2 bg-snow px-6 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-cyan"
            >
              <Download aria-hidden className="size-4" /> {t("mediaKit.download")}
            </TrackedAnchor>
            <Link href="/media-kit" className="text-center text-xs text-muted underline underline-offset-4 hover:text-snow">
              {t("mediaKit.view")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Continue? ───────────────────────── */
export function UgContinue() {
  const t = useTranslations();
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-magenta py-24 text-ink lg:py-32">
      <div aria-hidden className="bg-halftone absolute inset-0 -z-10 text-ink opacity-15" />
      <div className={container}>
        <h2 id="cta-title" className="font-display text-[clamp(2.6rem,9vw,8rem)] uppercase leading-[0.9]">{t("ugHome.continue")}</h2>
        <div className="mt-10 flex flex-col gap-8 border-t-2 border-ink pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-ink/80">{t("contactCta.body")}</p>
          <div className="flex items-end gap-6">
            <span aria-hidden className="font-display text-7xl leading-[0.75] text-ink/85 sm:text-8xl">9</span>
            <Link href="/contact" className="bg-ink px-6 py-4 text-sm font-bold uppercase tracking-wider text-cyan shadow-[5px_5px_0_var(--color-snow)] transition-shadow hover:shadow-[2px_2px_0_var(--color-snow)]">
              Let&apos;s collaborate ▶
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
