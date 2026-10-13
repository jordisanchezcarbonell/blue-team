import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { journeyYears } from "@/data/journey";
import { cn } from "@/lib/utils";

export function TimelinePreview() {
  const t = useTranslations("timeline");

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <ButtonLink href="/journey" variant="secondary" className="shrink-0 self-start lg:self-auto">
            {t("cta")} <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Container>

      <div className="relative mt-14">
        <div aria-hidden className="absolute inset-x-0 top-[2.15rem] h-px bg-gradient-to-r from-cyan via-[#a7a0ff] to-magenta opacity-60" />
        <ol className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-7 lg:overflow-visible lg:px-10 [scrollbar-width:thin]">
          {journeyYears.map(({ year, status }) => (
            <li key={year} className="w-64 shrink-0 snap-start lg:w-auto">
              <Link href={`/journey#y${year}`} className="group block">
                <span
                  className={cn(
                    "block font-display text-3xl leading-none transition-colors",
                    status === "pending" ? "text-outline" : "text-snow group-hover:text-cyan",
                  )}
                >
                  {year}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-3 block size-3 rotate-45",
                    status === "pending" ? "border border-warn bg-ink" : "bg-cyan group-hover:bg-magenta",
                  )}
                />
                <span className="mt-5 block font-heading text-sm font-semibold text-snow">
                  {t(`years.${year}.title`)}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted">{t(`years.${year}.body`)}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
