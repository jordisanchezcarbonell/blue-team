import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export const tiers = ["supporter", "event", "main"] as const;
export type Tier = (typeof tiers)[number];

export function Packages({ headingLevel = "h2" }: { headingLevel?: "h2" | "h1" }) {
  const t = useTranslations("packages");
  const c = useTranslations("common");

  return (
    <section id="packages" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading as={headingLevel} eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const featured = tier === "main";
            const items = t.raw(`tiers.${tier}.items`) as string[];
            return (
              <li
                key={tier}
                className={cn(
                  "relative flex flex-col p-7 ring-1 ring-inset sm:p-8",
                  featured ? "bg-surface-2 ring-2 ring-cyan" : "bg-surface ring-line",
                )}
              >
                {featured && (
                  <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-cyan" />
                )}
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading text-xs font-bold text-muted">0{i + 1}</span>
                  <span className="flex gap-2">
                    {featured && <Badge tone="cyan">{t("featured")}</Badge>}
                    <Badge tone="magenta">{c("proposal")}</Badge>
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl uppercase text-snow">{t(`tiers.${tier}.name`)}</h3>
                <p className="mt-1 text-muted">{t(`tiers.${tier}.tagline`)}</p>
                <ul className="mt-8 space-y-3 text-sm">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 text-snow/90">
                      <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", featured ? "text-cyan" : "text-magenta")} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted">{t("price")}</p>
                  <ButtonLink
                    href={{ pathname: "/contact", query: { type: tier } }}
                    variant={featured ? "primary" : "secondary"}
                    className="mt-4 w-full"
                  >
                    {t("cta")}
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
