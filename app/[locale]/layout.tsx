import type { Metadata, Viewport } from "next";
import { Inter, Saira_Condensed, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { jsonLd } from "@/lib/seo";
import { players } from "@/data/team";
import "../globals.css";

// Esports Elite display face. Single heavy weight so every `font-display` heading renders at 800.
const display = Saira_Condensed({ weight: "800", subsets: ["latin", "latin-ext"], variable: "--font-saira", display: "swap" });
const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await rootLocale();
  const t = await getTranslations({ locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale, namespace: "meta" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` },
    description: t("description"),
    applicationName: siteConfig.name,
  };
}

export const viewport: Viewport = {
  themeColor: "#070910",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "nav" });

  const organization = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: siteConfig.name,
    sport: "Fighting games (esports)",
    url: siteConfig.url,
    foundingLocation: { "@type": "Place", name: "Barcelona, Spain" },
    member: players.map((p) => ({
      "@type": "Person",
      alternateName: p.handle,
      sameAs: [p.startggUser],
    })),
  };

  return (
    <html lang={locale} className={`${display.variable} ${heading.variable} ${body.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] bg-cyan px-4 py-2 font-heading font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t("skip")}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
