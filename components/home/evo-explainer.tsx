import { AlertTriangle, ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { evoEvents, evoFacts, evoMilestones } from "@/data/evo";

export function EvoExplainer({ full = false }: { full?: boolean }) {
  const t = useTranslations("evo");
  const locale = useLocale();
  const why = t.raw("why") as string[];

  return (
    <section id="evo" className="relative isolate scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-surface/0 via-surface/60 to-surface/0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-10 -z-10 select-none font-display text-[22vw] leading-none text-snow/[0.025] lg:text-[16rem]"
      >
        EVO
      </div>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("lead")} />

        <dl className="mt-14 grid gap-px bg-line sm:grid-cols-3">
          {evoFacts.map((f) => (
            <div key={f.id} className="flex flex-col bg-ink p-6 sm:p-8">
              <dd className="font-display text-5xl leading-none text-snow">{f.figure[locale]}</dd>
              <dt className="mt-3 text-sm leading-relaxed text-muted">{f.label[locale]}</dt>
              <dd className="mt-auto pt-4">
                <a
                  href={f.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted/80 underline-offset-4 hover:text-cyan hover:underline"
                >
                  {f.sourceName} <ExternalLink aria-hidden className="size-3" />
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="border-l-2 border-cyan pl-5">
              <h3 className="font-heading text-lg font-semibold text-snow">EVO Las Vegas</h3>
              <p className="mt-2 text-muted">{evoEvents.lasVegas[locale]}</p>
            </div>
            <div className="border-l-2 border-magenta pl-5">
              <h3 className="font-heading text-lg font-semibold text-snow">EVO France</h3>
              <p className="mt-2 text-muted">{evoEvents.france[locale]}</p>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-snow">{t("whyTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {why.map((item, i) => (
                <li key={i} className="flex gap-3 text-muted">
                  <span className="mt-1 font-heading text-xs font-bold text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {full && (
          <ol className="mt-16 grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {evoMilestones.map((m) => (
              <li key={m.year}>
                <p className="font-display text-2xl text-cyan">{m.year}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text[locale]}</p>
                <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-muted/70 hover:text-cyan">
                  {t("sourcesTitle")} <ExternalLink aria-hidden className="size-3" />
                </a>
              </li>
            ))}
          </ol>
        )}

        <aside className="mt-14 flex flex-col gap-4 bg-warn/[0.06] p-6 ring-1 ring-inset ring-warn/30 sm:flex-row sm:p-8">
          <AlertTriangle aria-hidden className="size-6 shrink-0 text-warn" />
          <div>
            <h3 className="font-heading font-semibold text-snow">{t("audienceTitle")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t("audienceBody")}</p>
            <p className="mt-3 text-xs text-muted/80">{t("disclaimer")}</p>
          </div>
        </aside>
      </Container>
    </section>
  );
}
