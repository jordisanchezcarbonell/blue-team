import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

export type PageKey = "home" | "team" | "journey" | "results" | "content" | "partners" | "contact";

export const pagePaths: Record<PageKey, string> = {
  home: "",
  team: "/team",
  journey: "/journey",
  results: "/results",
  content: "/content",
  partners: "/partners",
  contact: "/contact",
};

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}

export function localizedUrl(locale: Locale, page: PageKey) {
  return absoluteUrl(`/${locale}${pagePaths[page]}`);
}

/**
 * The generated OG card (app/[locale]/opengraph-image.tsx). Listed explicitly because a
 * page that sets `openGraph` replaces the file-based image inherited from the layout.
 */
export function ogImage(locale: Locale) {
  return { url: absoluteUrl(`/${locale}/opengraph-image`), width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.claim}` };
}

export async function buildMetadata(locale: Locale, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = page === "home" ? `${siteConfig.name} — ${t("home")}` : t(page);
  const descKey = page === "home" ? "description" : (`${page}Description` as const);
  const description = t(descKey);
  const url = localizedUrl(locale, page);

  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([
        ...routing.locales.map((l) => [l, localizedUrl(l, page)]),
        ["x-default", localizedUrl(routing.defaultLocale, page)],
      ]),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [ogImage(locale)],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage(locale).url] },
  };
}

/** Escapes `<` so JSON-LD can't break out of the script tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
