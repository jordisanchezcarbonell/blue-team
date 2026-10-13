import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { ResultCard } from "@/components/results/result-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBalancedHighlights } from "@/lib/results/repository";

export function HighlightResults() {
  const t = useTranslations("highlights");
  const highlights = getBalancedHighlights(3);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          <ButtonLink href="/results" variant="secondary" className="shrink-0 self-start lg:self-auto">
            {t("cta")} <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((r, i) => (
            <li key={r.id}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <ResultCard result={r} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
