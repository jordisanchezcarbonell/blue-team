import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl, pagePaths, type PageKey } from "@/lib/seo";

const priority: Record<PageKey, number> = {
  home: 1,
  partners: 0.9,
  results: 0.8,
  team: 0.8,
  journey: 0.7,
  contact: 0.7,
  content: 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(pagePaths) as PageKey[]).flatMap((page) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, page),
      changeFrequency: "monthly" as const,
      priority: priority[page],
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, page)])),
      },
    })),
  );
}
