import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/layout/page-hero";
import { ResultCard } from "@/components/results/result-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PendingState, PhotoPlaceholder } from "@/components/ui/pending-state";
import { ContactCta } from "@/components/home/contact-cta";
import { players, type PlayerProfile } from "@/data/team";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { getPlayerResults } from "@/lib/results/repository";
import { bestResults } from "@/lib/results/stats";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/team">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "team");
}

export default function TeamPage() {
  const t = useTranslations("teamPage");
  const c = useTranslations("common");
  const ti = useTranslations("teamIntro");

  const persons = players.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    alternateName: p.handle,
    sameAs: [p.startggUser],
    homeLocation: { "@type": "Place", name: "Barcelona, Spain" },
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(persons)} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <Container className="space-y-24 pb-12">
        {players.map((p, i) => (
          <PlayerSection key={p.id} player={p} reverse={i % 2 === 1} />
        ))}

        <section id="creator" aria-labelledby="creator-title" className="scroll-mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <PhotoPlaceholder label={c("pendingPhoto")} initials="C" accent="snow" className="aspect-[4/5]" />
          <div className="self-center">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-muted">{c("pending")}</p>
            <h2 id="creator-title" className="mt-2 font-display text-[clamp(2.2rem,10vw,3.75rem)] uppercase leading-none text-snow">
              {ti("creator")}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t("bios.creator")}</p>
            <h3 className="mt-8 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("responsibilities")}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {(t.raw("creatorTasks") as string[]).map((task) => (
                <li key={task}><Badge>{task}</Badge></li>
              ))}
            </ul>
            <PendingState title={t("creatorPending")} className="mt-8 items-start p-5 text-left" />
          </div>
        </section>
      </Container>
      <ContactCta />
    </>
  );
}

function PlayerSection({ player, reverse }: { player: PlayerProfile; reverse: boolean }) {
  const t = useTranslations("teamPage");
  const c = useTranslations("common");
  const ti = useTranslations("teamIntro");
  const results = getPlayerResults(player.id);
  const best = bestResults(results, 3);
  const accent = player.accent === "cyan" ? "text-cyan" : "text-magenta";

  return (
    <section id={player.id} aria-labelledby={`${player.id}-title`} className="scroll-mt-24">
      <div className={cn("grid gap-10 lg:grid-cols-[0.8fr_1.2fr]", reverse && "lg:grid-cols-[1.2fr_0.8fr]")}>
        <PhotoPlaceholder
          label={c("pendingPhoto")}
          initials={player.handle.slice(0, 2).toUpperCase()}
          accent={player.accent}
          className={cn("aspect-[4/5]", reverse && "lg:order-2")}
        />
        <div className="self-center">
          <p className={cn("font-heading text-xs font-semibold uppercase tracking-[0.25em]", accent)}>
            {ti("player")} · Barcelona
          </p>
          <h2 id={`${player.id}-title`} className="mt-2 font-display text-[clamp(2.4rem,11vw,4.5rem)] uppercase leading-none text-snow">
            {player.handle}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t(`bios.${player.id}`)}</p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("games")}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {player.games.map((g) => <Badge key={g}>{g}</Badge>)}
              </dd>
            </div>
            <div>
              <dt className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("events")}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {player.events.map((e) => <Badge key={e} tone={e.startsWith("EVO") ? "cyan" : "muted"}>{e}</Badge>)}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={player.startggUser}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-snow underline-offset-4 hover:text-cyan hover:underline"
            >
              {c("startggProfile")} <ExternalLink aria-hidden className="size-3.5" />
            </a>
            <span className="text-sm text-muted">
              {t("records", { count: siteConfig.documentedRecords[player.id] })}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("bestResults")}</h3>
          <ButtonLink href={{ pathname: "/results", query: { player: player.id } }} variant="ghost" className="text-sm">
            {t("allResults")} →
          </ButtonLink>
        </div>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {best.map((r) => (
            <li key={r.id}><ResultCard result={r} showPlayer={false} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
