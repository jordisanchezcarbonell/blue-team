import { Camera, Clapperboard, Eye, Handshake, Mic, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const contentFormats = [
  { key: "vertical", icon: Smartphone },
  { key: "vlog", icon: Clapperboard },
  { key: "photo", icon: Camera },
  { key: "interviews", icon: Mic },
  { key: "bts", icon: Eye },
  { key: "branded", icon: Handshake },
] as const;

export function ContentProduction() {
  const t = useTranslations("production");

  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          <Badge tone="warn" className="mt-6">{t("status")}</Badge>
        </div>
        <ul className="grid gap-px bg-line sm:grid-cols-2">
          {contentFormats.map(({ key, icon: Icon }) => (
            <li key={key} className="group bg-ink p-6 transition-colors hover:bg-surface sm:p-8">
              <Icon aria-hidden className="size-6 text-cyan transition-colors group-hover:text-magenta" />
              <h3 className="mt-5 font-heading text-lg font-semibold text-snow">{t(`formats.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(`formats.${key}.body`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
