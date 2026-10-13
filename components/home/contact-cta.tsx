import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

export function ContactCta() {
  const t = useTranslations("contactCta");

  return (
    <section className="py-16">
      <Container>
        <div className="clip-corner relative isolate overflow-hidden bg-surface px-6 py-16 ring-1 ring-inset ring-line sm:px-14 sm:py-20">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]" />
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-cyan/20 blur-[100px]" />
          <div aria-hidden className="absolute -bottom-24 right-40 -z-10 size-80 rounded-full bg-magenta/20 blur-[100px]" />
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-5xl uppercase leading-[0.9] text-snow sm:text-7xl">{t("title")}</h2>
          <p className="mt-6 max-w-xl text-lg text-muted">{t("body")}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              {t("cta")} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/partners" size="lg" variant="secondary">
              {t("secondary")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
