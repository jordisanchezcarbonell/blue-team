import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";

/** Closing call to action on inner pages — the "Continue?" screen from C · Underground. */
export function ContactCta() {
  const t = useTranslations("contactCta");

  return (
    <section className="py-16">
      <Container>
        <div className="relative isolate overflow-hidden bg-magenta px-6 py-14 text-ink sm:px-12 sm:py-16">
          <div aria-hidden className="bg-halftone absolute inset-0 -z-10 opacity-15" />
          <p className="font-heading text-[11px] font-bold uppercase tracking-widest">{t("eyebrow")}</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] uppercase leading-[0.9]">{t("title")}</h2>
          <div className="mt-8 flex flex-col gap-6 border-t-2 border-ink pt-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-ink/80">{t("body")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="bg-ink px-6 py-4 text-center font-heading text-sm font-bold uppercase tracking-wider text-cyan shadow-[5px_5px_0_var(--color-snow)] transition-shadow hover:shadow-[2px_2px_0_var(--color-snow)]"
              >
                {t("cta")} ▶
              </Link>
              <Link
                href="/partners"
                className="border-2 border-ink px-6 py-3.5 text-center font-heading text-sm font-bold uppercase tracking-wider transition-colors hover:bg-ink hover:text-snow"
              >
                {t("secondary")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
