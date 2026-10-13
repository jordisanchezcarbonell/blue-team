import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ContentEmbed } from "@/components/content/content-embed";
import { ContactCta } from "@/components/home/contact-cta";
import { contentFormats } from "@/components/home/content-production";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PendingState } from "@/components/ui/pending-state";
import { contentByEvent, contentChannel, contentItems } from "@/data/content";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/content">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "content");
}

export default function ContentPage() {
  const t = useTranslations("contentPage");
  const p = useTranslations("production");
  const nav = useTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <Container className="space-y-20">
        {contentItems.length > 0 ? (
          <div className="space-y-16">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-2 border-line p-4 sm:p-5">
              <p className="text-sm text-snow">
                <span className="font-bold uppercase tracking-widest text-cyan">{t("channelBy")}</span> · {contentChannel.name}
                <span className="mt-1 block text-xs text-muted">{t("channelNote")}</span>
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 sm:ml-auto">
                {[
                  { href: contentChannel.url, label: t("channel") },
                  { href: contentChannel.playlist, label: t("playlist") },
                ].map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-snow hover:text-cyan">
                    {l.label} <ExternalLink aria-hidden className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
            {contentByEvent().map((group) => (
              <section key={group.event} id={`event-${group.year}`} aria-labelledby={`event-${group.year}-title`} className="scroll-mt-28">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-snow pb-3">
                  <h2 id={`event-${group.year}-title`} className="font-display text-3xl uppercase text-snow sm:text-4xl">{group.event}</h2>
                  <span className="text-xs uppercase tracking-widest text-muted">{t("pieces", { count: group.items.length })}</span>
                </div>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <li key={item.id}><ContentEmbed item={item} /></li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <PendingState title={t("empty")} body={t("emptyBody")} className="py-16">
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span className="sr-only">{t("platforms")}:</span>
              {["YouTube", "TikTok", "Instagram"].map((pl) => <Badge key={pl}>{pl}</Badge>)}
            </div>
            <ButtonLink href="/contact" variant="ghost" className="mt-3 text-sm">{t("ask")}</ButtonLink>
          </PendingState>
        )}

        <section aria-labelledby="formats-title">
          <h2 id="formats-title" className="font-display text-3xl uppercase text-snow sm:text-4xl">{p("title")}</h2>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {contentFormats.map(({ key, icon: Icon }) => (
              <li key={key} className="bg-ink p-6 sm:p-8">
                <Icon aria-hidden className="size-6 text-cyan" />
                <h3 className="mt-5 font-heading text-lg font-semibold text-snow">{p(`formats.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p(`formats.${key}.body`)}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/partners" className="mt-10">{nav("cta")}</ButtonLink>
        </section>
      </Container>
      <ContactCta />
    </>
  );
}
