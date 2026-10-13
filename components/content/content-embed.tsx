import { ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { youtubeId, type ContentItem } from "@/data/content";

/**
 * Renders a published piece. YouTube embeds lazily via youtube-nocookie;
 * TikTok and Instagram link out (their embed scripts add third-party tracking —
 * enable them only after deciding on a cookie policy).
 */
export function ContentEmbed({ item }: { item: ContentItem }) {
  const locale = useLocale();
  const title = item.title[locale];
  const yt = item.platform === "youtube" ? youtubeId(item.url) : null;

  return (
    <article className="clip-corner overflow-hidden bg-surface ring-1 ring-inset ring-line">
      {yt ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}`}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full"
        />
      ) : (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="grid aspect-[9/16] max-h-96 w-full place-items-center bg-surface-2 text-muted hover:text-cyan">
          <ExternalLink aria-hidden className="size-8" />
          <span className="sr-only">{title}</span>
        </a>
      )}
      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="font-heading text-sm font-semibold text-snow">{title}</h3>
        <Badge>{item.platform}</Badge>
      </div>
    </article>
  );
}
