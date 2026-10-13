import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { EmailActions } from "@/components/contact/email-actions";
import { ReportSample } from "@/components/partners/report-sample";
import { siteConfig } from "@/config/site";
import { nextChallenge } from "@/data/next-challenge";
import { getProposal, proposals } from "@/data/proposals";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getResults, getStats } from "@/lib/results/repository";
import { bracketBeaten, formatTopPercent, isEvo } from "@/lib/results/stats";
import { cn } from "@/lib/utils";

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10";

export function generateStaticParams() {
  return proposals.map((p) => ({ brand: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/proposal/[brand]">): Promise<Metadata> {
  const { locale, brand } = await params;
  const proposal = getProposal(brand);
  if (!proposal) return {};
  const t = await getTranslations({ locale: locale as Locale, namespace: "proposalPage" });
  return {
    title: t("eyebrow", { brand: proposal.brand }),
    description: proposal.angle[locale as Locale],
    // Private pitch: shared by link only.
    robots: { index: false, follow: false },
  };
}

/** Tailored proposal for one brand. Data in data/proposals.ts. */
export default async function ProposalPage({ params }: PageProps<"/[locale]/proposal/[brand]">) {
  const { locale: rawLocale, brand } = await params;
  const locale = rawLocale as Locale;
  const proposal = getProposal(brand);
  if (!proposal) notFound();

  const t = await getTranslations({ locale, namespace: "proposalPage" });
  const tr = await getTranslations({ locale });
  const stats = getStats();
  const best = stats.best!;
  const evoTop = getResults({ sort: "best" }).filter((r) => isEvo(r) && r.format === "singles").slice(0, 3);
  const { documentedRecords: rec } = siteConfig;
  const name = proposal.brand;

  const numbers = [
    { value: String(siteConfig.activeSince), label: tr("stats.since") },
    { value: String(rec.total), label: tr("stats.records") },
    { value: String(stats.evoEditions.length), label: tr("stats.editions") },
    { value: `Top ${formatTopPercent(best.placement, best.entrants)}`, label: tr("stats.best") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-14 pt-12 sm:pt-16">
        <div aria-hidden className="bg-halftone absolute -right-10 top-0 -z-10 size-[26rem] text-magenta opacity-25 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        <div className={container}>
          <p className="inline-block -rotate-1 bg-cyan px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
            {t("eyebrow", { brand: name })} · {proposal.sector[locale]}
          </p>
          {/* Our name leads; the brand only appears as the addressee, so it never reads as an existing co-brand. */}
          <h1 className="mt-6 font-display text-[clamp(1.9rem,7vw,6rem)] uppercase leading-[0.95]">
            <span className="block">{siteConfig.name}</span>
            <span className="block text-cyan">{tr("nextChallenge.title", { season: nextChallenge.season })}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-snow/85">{proposal.angle[locale]}</p>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">{t("disclaimer", { brand: name })}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="bg-cyan px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_var(--color-magenta)] transition-shadow hover:shadow-[2px_2px_0_var(--color-magenta)]">
              {t("ctaTitle")} ▶
            </a>
            <TrackedAnchor
              event="media_kit_download"
              props={{ source: `proposal:${proposal.slug}` }}
              href={`/media-kit/beyond-the-fight-media-kit-${locale}.pdf`}
              download
              className="border-2 border-snow px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-snow hover:text-ink"
            >
              {t("mediaKit")}
            </TrackedAnchor>
          </div>
        </div>
      </section>

      {/* Fit */}
      <section aria-labelledby="fit-title" className="border-t-2 border-line py-16 lg:py-20">
        <div className={container}>
          <h2 id="fit-title" className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] uppercase leading-none">{t("fitTitle")}</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {proposal.fit.map((f, i) => (
              <li key={i} className="border-2 border-line p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan">{tr("ugHome.round")} {i + 1}</span>
                <p className="mt-3 text-sm leading-relaxed">{f[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Numbers + best Evo results */}
      <section aria-labelledby="numbers-title" className="bg-snow py-16 text-ink lg:py-20">
        <div className={container}>
          <h2 id="numbers-title" className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] uppercase leading-none">{t("numbersTitle")}</h2>
          <dl className="mt-10 grid grid-cols-2 border-y-2 border-ink lg:grid-cols-4">
            {numbers.map((n, i) => (
              <div key={n.label} className={cn("flex flex-col py-5 pr-4", i % 2 === 1 && "border-l-2 border-ink pl-4", i === 2 && "lg:border-l-2 lg:pl-4")}>
                <dt className="order-2 mt-2 text-xs font-bold uppercase tracking-wider">{n.label}</dt>
                <dd className="order-1 whitespace-nowrap font-display text-[clamp(1.6rem,3.6vw,3rem)] uppercase leading-none">{n.value}</dd>
              </div>
            ))}
          </dl>
          <ol className="mt-10 space-y-5">
            {evoTop.map((r) => {
              const pct = bracketBeaten(r.placement, r.entrants);
              const p1 = r.player === "kazukun";
              return (
                <li key={r.id}>
                  <p className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
                    <span>
                      <span className="font-bold">{p1 ? "Kazukun" : "BlueKen"}</span> · {r.game} <span className="text-ink/55">· {r.event}</span>
                    </span>
                    <span>
                      <span className="font-display text-xl">{r.placement}</span>
                      <span className="text-ink/55">/{r.entrants.toLocaleString(locale)}</span>
                      <span className="ml-2 text-xs font-bold">TOP {formatTopPercent(r.placement, r.entrants)}</span>
                    </span>
                  </p>
                  <div role="img" aria-label={tr("criterion.short", { pct: Math.floor(pct) })} className="mt-1.5 h-4 -skew-x-[20deg] border-2 border-ink p-0.5">
                    <div className={cn("h-full", p1 ? "bg-magenta" : "bg-ink")} style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-xs text-ink/55">{tr("criterion.note")}</p>
        </div>
      </section>

      {/* Ideas */}
      <section aria-labelledby="ideas-title" className="py-16 lg:py-20">
        <div className={container}>
          <h2 id="ideas-title" className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] uppercase leading-none">{t("ideasTitle")}</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {proposal.ideas.map((idea, i) => (
              <article key={i} className="flex flex-col border-2 border-line p-6">
                <span className="text-xs text-magenta">
                  <span aria-hidden className="inline-block size-2 rounded-full bg-magenta" /> REC.{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase leading-none">{idea.title[locale]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{idea.body[locale]}</p>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-snow/50">{t("deliverables")}</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {idea.deliverables.map((d, j) => (
                    <li key={j} className="flex gap-2"><span aria-hidden className="text-cyan">+</span>{d[locale]}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended tier + KPIs + season */}
      <section aria-labelledby="tier-title" className="border-y-2 border-line py-16 lg:py-20">
        <div className={cn(container, "grid gap-10 lg:grid-cols-12")}>
          <div className="lg:col-span-5">
            <h2 id="tier-title" className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] uppercase leading-none">{t("tierTitle")}</h2>
            <article className="mt-8 border-2 border-cyan bg-cyan p-6 text-ink">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                <span>{t("tierBadge")}</span>
                <span>{tr("common.proposal")}</span>
              </div>
              <h3 className="mt-6 font-display text-[clamp(1.8rem,7vw,2.4rem)] uppercase leading-none">{tr(`packages.tiers.${proposal.tier}.name`)}</h3>
              <p className="mt-2 text-sm text-ink/70">{tr(`packages.tiers.${proposal.tier}.tagline`)}</p>
              <ul className="mt-5 space-y-1.5 text-sm">
                {(tr.raw(`packages.tiers.${proposal.tier}.items`) as string[]).map((item) => (
                  <li key={item} className="flex gap-2"><span aria-hidden>+</span>{item}</li>
                ))}
              </ul>
              <p className="mt-5 border-t-2 border-ink pt-4 text-sm">{proposal.tierWhy[locale]}</p>
              <p className="mt-3 text-[10px] uppercase tracking-widest text-ink/60">{tr("packages.price")}</p>
            </article>
          </div>
          <div className="space-y-10 lg:col-span-6 lg:col-start-7">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan">{t("kpisTitle", { brand: name })}</h3>
              <ul className="mt-4 border-t-2 border-line">
                {proposal.kpis.map((k, i) => (
                  <li key={i} className="flex gap-4 border-b border-line py-3 text-sm">
                    <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {k[locale]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan">{t("calendarTitle", { season: nextChallenge.season })}</h3>
              <ul className="mt-4 border-t-2 border-line">
                {nextChallenge.targets.map((target) => (
                  <li key={target.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
                    <span className="font-display text-xl uppercase">
                      {target.id === "europe-circuit" ? tr("nextChallenge.names.europe-circuit") : target.name}
                    </span>
                    <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest", target.status === "confirmed" ? "bg-cyan text-ink" : "border border-warn text-warn")}>
                      {target.status === "confirmed" ? tr("nextChallenge.confirmed") : tr("nextChallenge.target")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ReportSample brand={name} />

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-title" className="relative isolate scroll-mt-14 overflow-hidden bg-magenta py-20 text-ink lg:py-24">
        <div aria-hidden className="bg-halftone absolute inset-0 -z-10 opacity-15" />
        <div className={cn(container, "grid gap-10 lg:grid-cols-12 lg:items-end")}>
          <div className="lg:col-span-6">
            <h2 id="contact-title" className="font-display text-[clamp(2.4rem,8vw,6rem)] uppercase leading-[0.9]">{t("ctaTitle")}</h2>
            <p className="mt-6 max-w-md text-ink/80">{t("ctaBody", { brand: name })}</p>
          </div>
          <div className="space-y-5 lg:col-span-5 lg:col-start-8">
            <EmailActions source={`proposal:${proposal.slug}`} tone="light" />
            <Link
              href={{ pathname: "/contact", query: { type: proposal.tier, company: name } }}
              className="block bg-ink px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-cyan shadow-[5px_5px_0_var(--color-snow)] transition-shadow hover:shadow-[2px_2px_0_var(--color-snow)]"
            >
              {t("ctaForm")} ▶
            </Link>
            <Link href="/" className="block text-center text-xs font-bold uppercase tracking-widest underline underline-offset-4">
              {t("more")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
