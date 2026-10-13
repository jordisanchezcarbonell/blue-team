import { ArrowDown, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { RouteMap } from "./route-map";

export function Hero() {
  const t = useTranslations("hero");
  const [line1, line2] = splitClaim(siteConfig.claim);

  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16">
      {/* Atmosphere */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-magenta/20 blur-[140px]" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[36rem] rounded-full bg-cyan/15 blur-[140px]" />
      <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay" />

      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:py-24">
        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cyan">{t("eyebrow")}</p>
          <h1 className="mt-6 font-display uppercase leading-[0.86] tracking-tight">
            <span className="block text-[clamp(3rem,6vw,6.25rem)] text-snow">{line1}</span>
            <span className="text-gradient block text-[clamp(3rem,6vw,6.25rem)]">{line2}</span>
          </h1>
          <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-snow/90">
            {siteConfig.subClaim}
          </p>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">{t("subtitle")}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/partners" size="lg">
              {t("ctaPartner")}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/journey" size="lg" variant="secondary">
              {t("ctaJourney")}
            </ButtonLink>
          </div>
        </div>

        <RouteMap label={t("routeLabel")} />
      </Container>

      <a
        href="#team"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-heading text-[10px] uppercase tracking-[0.3em] text-muted hover:text-snow md:flex"
      >
        {t("scroll")}
        <ArrowDown aria-hidden className="size-4 animate-bounce" />
      </a>
    </section>
  );
}

/** "FROM BARCELONA TO EVO." → ["FROM BARCELONA", "TO EVO."] so the brand line gets the gradient. */
function splitClaim(claim: string): [string, string] {
  const i = claim.lastIndexOf(" TO ");
  return i === -1 ? [claim, ""] : [claim.slice(0, i), claim.slice(i + 1)];
}
