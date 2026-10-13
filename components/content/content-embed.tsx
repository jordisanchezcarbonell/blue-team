import { ExternalLink } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { youtubeId, type ContentItem } from "@/data/content";
import { YouTubeLite } from "./youtube-lite";

/**
 * Renders a published piece. YouTube loads on click via youtube-nocookie;
 * TikTok and Instagram link out (their embed scripts add third-party tracking —
 * enable them only after deciding on a cookie policy).
 */
export function ContentEmbed({ item }: { item: ContentItem }) {
  const t = useTranslations("contentPage");
  const format = useFormatter();
  const yt = item.platform === "youtube" ? youtubeId(item.url) : null;

  return (
    <article className="flex h-full flex-col bg-surface ring-1 ring-inset ring-line">
      {yt ? (
        <YouTubeLite id={yt} title={item.title} playLabel={t("play")} />
      ) : (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="grid aspect-[9/16] max-h-96 w-full place-items-center bg-surface-2 text-muted hover:text-cyan">
          <ExternalLink aria-hidden className="size-8" />
          <span className="sr-only">{item.title}</span>
        </a>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 lang={item.lang} className="font-heading text-sm font-semibold leading-snug text-snow">{item.title}</h3>
        <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-muted">
          <time dateTime={item.date}>{format.dateTime(new Date(item.date), { year: "numeric", month: "short", day: "numeric" })}</time>
          <Badge>{t(`lang.${item.lang}`)}</Badge>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 hover:text-cyan">
            {item.platform === "youtube" ? "YouTube" : item.platform} <ExternalLink aria-hidden className="size-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
