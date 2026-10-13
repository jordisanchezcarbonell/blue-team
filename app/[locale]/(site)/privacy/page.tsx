import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

/** Date of the last change to this notice (update when the text changes). */
const UPDATED = "2026-10-13";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "privacy" });
  return { title: t("title"), robots: { index: false, follow: true } };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "privacy" });
  const sections = t.raw("sections") as { title: string; body: string }[];
  const email = siteConfig.contactEmail || "—";
  const fill = (s: string) => s.replaceAll("{name}", siteConfig.name).replaceAll("{email}", email);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(UPDATED));

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("title")} lead={t("lead")} />
      <Container className="max-w-3xl pb-16">
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-snow/85">{fill(s.body)}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted">{t("updated", { date })}</p>
      </Container>
    </>
  );
}
