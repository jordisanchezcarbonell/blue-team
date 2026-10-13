import { BadgeCheck, Film, MapPin, SlidersHorizontal, Swords, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const items = [
  { key: "authentic", icon: Swords },
  { key: "content", icon: Film },
  { key: "community", icon: Users },
  { key: "transparency", icon: BadgeCheck },
  { key: "local", icon: MapPin },
  { key: "flexible", icon: SlidersHorizontal },
] as const;

export function SponsorBenefits() {
  const t = useTranslations("benefits");

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-magenta/10 blur-[120px]" />
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={<span className="text-gradient">{t("title")}</span>} body={t("body")} />
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon }) => (
            <li key={key} className="border-t border-line pt-6">
              <Icon aria-hidden className="size-5 text-magenta" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-snow">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(`items.${key}.body`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
