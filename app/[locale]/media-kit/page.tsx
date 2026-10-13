import type { Metadata } from "next";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { nextChallenge, type ExpenseKey } from "@/data/next-challenge";
import { socialChannels } from "@/data/social";
import { creator, players } from "@/data/team";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { env } from "@/lib/env";
import { getHighlights, getResults, getStats } from "@/lib/results/repository";
import { bracketBeaten, formatTopPercent, isEvo } from "@/lib/results/stats";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Media kit",
  robots: { index: false, follow: true },
};

/**
 * Printable media kit (A4). The downloadable PDF in /public/media-kit is
 * generated from this page with `npm run media-kit` (see README).
 * Only confirmed information: real results, public channel figures, proposals marked as such.
 */
export default function MediaKitPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const format = useFormatter();
  const stats = getStats();
  const best = stats.best!;
  const evo = getResults({ sort: "best" }).filter((r) => isEvo(r) && r.format === "singles").slice(0, 8);
  const channels = socialChannels.filter((c) => c.url);
  const site = siteConfig;
  const contact = env.contactEmail;
  const url = env.siteUrl.replace(/^https?:\/\//, "");

  return (
    <div className="min-h-dvh bg-[#26251f] py-10 print:bg-white print:py-0">
      <style>{`
        @page { size: A4; margin: 0; }
        @media print { html, body { background: #0E0E0D !important; } .mk-page { break-after: page; box-shadow: none !important; margin: 0 !important; } }
        .mk-page, .mk-page * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>

      <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-2 text-sm text-white/70 print:hidden">
        <Link href="/" className="hover:text-white">← {site.name}</Link>
        <a href={`/media-kit/beyond-the-fight-media-kit-${locale}.pdf`} download className="bg-cyan px-4 py-2 font-display uppercase text-ink">
          {t("mediaKit.download")}
        </a>
      </div>

      {/* PAGE 1 — Cover + who */}
      <Page>
        <Head n="01" />
        <div className="mt-8">
          <p className="font-heading text-[9pt] font-semibold uppercase tracking-[0.3em] text-cyan">Barcelona · FGC · {site.activeSince}–{site.recordsUntil}</p>
          <h1 className="mt-4 font-display text-[64pt] uppercase leading-[0.84]">
            From
            <br />
            Barcelona
            <br />
            <span className="text-cyan">to EVO.</span>
          </h1>
          <p className="mt-5 font-heading text-[9pt] font-semibold uppercase tracking-[0.2em]">{site.subClaim}</p>
          <p className="mt-3 max-w-[120mm] text-[11pt] leading-relaxed text-muted">{t("hero.subtitle")}</p>
        </div>

        <dl className="mt-10 grid grid-cols-4 border-y border-line">
          {[
            [String(site.activeSince), t("stats.since")],
            [String(site.documentedRecords.total), t("stats.records")],
            [String(stats.evoEditions.length), t("stats.editions")],
            [`Top ${formatTopPercent(best.placement, best.entrants)}`, t("stats.best")],
          ].map(([v, l], i) => (
            <div key={l} className={cn("flex flex-col-reverse justify-end p-4", i > 0 && "border-l border-line")}>
              <dt className="mt-1 text-[8pt] leading-tight text-muted">{l}</dt>
              <dd className="font-display text-[28pt] uppercase leading-none">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 font-display text-[22pt] uppercase leading-none">{t("pitch.who.title")}</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {players.map((p) => {
            const top = getHighlights(p.id)[0];
            return (
              <div key={p.id} className="border-t-2 pt-3" style={{ borderColor: `var(--color-${p.accent})` }}>
                <p className="font-display text-[20pt] uppercase leading-none">{p.handle}</p>
                <p className="mt-1 text-[8pt] text-muted">{t("eliteHome.player")}</p>
                <p className="mt-2 text-[8.5pt] leading-snug text-snow/85">{p.games.slice(0, 4).join(" · ")}</p>
                {top && (
                  <p className="mt-2 text-[8.5pt]">
                    {t("eliteHome.bestLabel")}: <strong>{top.placement}/{top.entrants.toLocaleString(locale)}</strong> — {top.game}, {top.event}
                  </p>
                )}
                <p className="mt-1 text-[7.5pt] text-muted">{p.startggUser.replace("https://www.", "")}</p>
              </div>
            );
          })}
          <div className="border-t-2 border-white/40 pt-3">
            <p className="font-display text-[20pt] uppercase leading-none">{creator.name ?? "P3"}</p>
            <p className="mt-1 text-[8pt] text-muted">{t("teamIntro.creator")}</p>
            <p className="mt-2 text-[8.5pt] leading-snug text-snow/85">{t("teamPage.bios.creator")}</p>
          </div>
        </div>

        <p className="mt-10 max-w-[160mm] text-[13pt] font-semibold leading-snug">
          {(t.raw("manifesto.lines") as string[]).join(" ")}
        </p>
        <Foot contact={contact} url={url} />
      </Page>

      {/* PAGE 2 — Results + audience */}
      <Page>
        <Head n="02" />
        <h2 className="mt-8 font-display text-[34pt] uppercase leading-none">{t("eliteHome.leaderboardTitle")}</h2>
        <p className="mt-2 text-[9pt] text-muted">{t("eliteHome.leaderboardLead")}</p>
        <ol className="mt-5 border-t border-line">
          {evo.map((r) => {
            const pct = bracketBeaten(r.placement, r.entrants);
            const k = r.player === "kazukun";
            return (
              <li key={r.id} className="grid grid-cols-[30mm_1fr_22mm] items-center gap-3 border-b border-line py-2.5">
                <span className="font-display text-[20pt] leading-none">
                  {r.placement}
                  <span className="text-[10pt] text-muted">/{r.entrants.toLocaleString(locale)}</span>
                </span>
                <span>
                  <span className="block text-[9.5pt] font-semibold">{r.game}</span>
                  <span className="block text-[8pt] text-muted">{r.event} · <span style={{ color: k ? "var(--color-magenta)" : "var(--color-cyan)" }}>{k ? "Kazukun" : "BlueKen"}</span></span>
                  <span className="mt-1.5 block h-[2.2mm] bg-white/10">
                    <span className="block h-full" style={{ width: `${pct}%`, background: k ? "var(--color-magenta)" : "var(--color-cyan)" }} />
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-display text-[13pt] uppercase" style={{ color: k ? "var(--color-magenta)" : "var(--color-cyan)" }}>Top {formatTopPercent(r.placement, r.entrants)}</span>
                  <span className="block text-[7.5pt] text-muted">{Math.floor(pct)}%</span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-[7.5pt] leading-snug text-muted">
          <strong className="text-snow">{t("criterion.title")}:</strong> {t("criterion.note")}
        </p>
        <p className="mt-2 text-[7.5pt] text-muted">{t("resultsPage.lead", { shown: stats.records, total: site.documentedRecords.total })}</p>

        <h2 className="mt-8 font-display text-[22pt] uppercase leading-none">{t("social.title")}</h2>
        <div className="mt-3 grid grid-cols-2 gap-4">
          {channels.map((c) => (
            <div key={c.platform} className="border-t border-line pt-3">
              <p className="font-heading text-[8pt] font-semibold uppercase tracking-[0.2em] text-muted">{c.label} · {c.handle}</p>
              <div className="mt-2 flex gap-6">
                {c.followers !== null && (
                  <p>
                    <span className="block font-display text-[22pt] leading-none">{format.number(c.followers)}</span>
                    <span className="text-[7.5pt] text-muted">{c.platform === "youtube" ? t("social.subscribers") : t("social.followers")}</span>
                  </p>
                )}
                {c.contentCount !== null && (
                  <p>
                    <span className="block font-display text-[22pt] leading-none">{format.number(c.contentCount)}</span>
                    <span className="text-[7.5pt] text-muted">{t("social.videos")}</span>
                  </p>
                )}
                {c.followers === null && c.contentCount === null && <p className="text-[8.5pt] text-muted">{c.url.replace("https://www.", "")}</p>}
              </div>
              {c.updatedAt && (
                <p className="mt-1 text-[7pt] text-muted">
                  {t("social.publicSource")} · {t("social.updated", { date: format.dateTime(new Date(c.updatedAt), { dateStyle: "medium" }) })}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[7.5pt] text-muted">{t("evo.audienceTitle")}. {t("evo.audienceBody")}</p>
        <Foot contact={contact} url={url} />
      </Page>

      {/* PAGE 3 — Offer */}
      <Page light>
        <Head n="03" light />
        <h2 className="mt-8 font-display text-[44pt] uppercase leading-[0.86]">{site.partnerClaim}</h2>
        <p className="mt-3 max-w-[150mm] text-[10pt] text-ink/70">{t("benefits.body")}</p>

        <div className="mt-6 grid grid-cols-3 border-t-2 border-ink">
          {(["supporter", "event", "main"] as const).map((tier, i) => (
            <div key={tier} className={cn("p-4", i > 0 && "border-l border-ink/15", tier === "main" && "bg-ink text-snow")}>
              <p className="text-[7pt] uppercase tracking-[0.2em] opacity-60">0{i + 1} · {t("common.proposal")}</p>
              <p className="mt-2 font-display text-[20pt] uppercase leading-none">{t(`packages.tiers.${tier}.name`)}</p>
              <p className="mt-1 text-[8pt] opacity-70">{t(`packages.tiers.${tier}.tagline`)}</p>
              <ul className="mt-3 space-y-1 text-[8.5pt]">
                {(t.raw(`packages.tiers.${tier}.items`) as string[]).map((item) => <li key={item}>+ {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[8pt] text-ink/60">{t("packages.price")}</p>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-[20pt] uppercase leading-none">{t("nextChallenge.title", { season: nextChallenge.season })}</h3>
            <ul className="mt-3 space-y-2 text-[9pt]">
              {nextChallenge.targets.map((target) => (
                <li key={target.id} className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-1.5">
                  <span className="font-semibold">{target.id === "europe-circuit" ? t("nextChallenge.names.europe-circuit") : target.name}</span>
                  <span className="text-[7.5pt] uppercase text-ink/60">{target.status === "confirmed" ? t("nextChallenge.confirmed") : t("nextChallenge.target")}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-[20pt] uppercase leading-none">{t("nextChallenge.expensesTitle")}</h3>
            <ul className="mt-3 space-y-2 text-[9pt]">
              {(Object.keys(nextChallenge.expenses) as ExpenseKey[]).map((k) => (
                <li key={k} className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-1.5">
                  <span>{t(`nextChallenge.expenses.${k}.title`)}</span>
                  <span className="text-[7.5pt] text-ink/60">
                    {nextChallenge.expenses[k] === null
                      ? t("nextChallenge.budgetPending")
                      : format.number(nextChallenge.expenses[k]!, { style: "currency", currency: nextChallenge.currency, maximumFractionDigits: 0 })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto bg-ink p-6 text-snow">
          <p className="font-display text-[30pt] uppercase leading-none">{t("eliteHome.ctaTitle")}</p>
          <p className="mt-2 text-[10pt] text-muted">{t("contactCta.body")}</p>
          <p className="mt-3 font-display text-[16pt] text-cyan">{contact || url}</p>
          <p className="mt-1 text-[9pt] text-snow/80">{channels.map((c) => c.url.replace("https://www.", "")).join("  ·  ")}</p>
        </div>
        <p className="mt-3 text-[7pt] text-ink/50">{t("footer.disclaimer")}</p>
      </Page>
    </div>
  );
}

function Page({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <section
      className={cn(
        "mk-page mx-auto mb-8 flex h-[297mm] w-[210mm] flex-col overflow-hidden p-[14mm] shadow-2xl",
        light ? "bg-snow text-ink" : "bg-ink text-snow",
      )}
    >
      {children}
    </section>
  );
}

function Head({ n, light }: { n: string; light?: boolean }) {
  return (
    <header className={cn("flex items-center justify-between border-b pb-3", light ? "border-ink/20" : "border-line")}>
      <span className="font-display text-[14pt] uppercase tracking-wide">
        {siteConfig.name.split(" ")[0]}
        <span className="text-cyan">/</span>
        {siteConfig.name.split(" ").slice(1).join(" ")}
      </span>
      <span className={cn("font-heading text-[8pt] font-semibold uppercase tracking-[0.25em]", light ? "text-ink/50" : "text-muted")}>Media kit · {n}</span>
    </header>
  );
}

function Foot({ contact, url }: { contact: string; url: string }) {
  return (
    <footer className="mt-auto flex items-center justify-between border-t border-line pt-3 text-[7.5pt] text-muted">
      <span>{contact || url}</span>
      <span>{siteConfig.claim}</span>
    </footer>
  );
}
