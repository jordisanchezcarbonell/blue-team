import Image from "next/image";
import { Play } from "lucide-react";
import type { Photo, Video } from "@/data/media";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "magenta" | "snow";

// Theme-aware: follows the current palette tokens.
const glow: Record<Accent, string> = {
  cyan: "color-mix(in oklab, var(--color-cyan) 30%, transparent)",
  magenta: "color-mix(in oklab, var(--color-magenta) 35%, transparent)",
  snow: "color-mix(in oklab, var(--color-snow) 15%, transparent)",
};

/**
 * Real photo when available; otherwise a designed, intentional frame
 * (gradient + scanlines + monogram) with a discreet "coming soon" tag.
 */
export function PhotoSlot({
  photo,
  locale,
  monogram,
  accent = "cyan",
  soonLabel,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  monogramClassName = "text-[clamp(5rem,14vw,11rem)]",
}: {
  photo: Photo | null;
  locale: "es" | "en";
  monogram: string;
  accent?: Accent;
  soonLabel: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  monogramClassName?: string;
}) {
  return (
    <figure className={cn("group relative isolate overflow-hidden bg-surface", className)}>
      {photo ? (
        <>
          <Image src={photo.src} alt={photo.alt[locale]} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          {photo.credit && <figcaption className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 text-[10px] text-white/70">© {photo.credit}</figcaption>}
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `linear-gradient(180deg, transparent 25%, ${glow[accent]})`, opacity: 0.75 }} />
          <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(255,255,255,0.03)_3px_4px)]" />
          <span aria-hidden className={cn("absolute inset-0 grid place-items-center font-display uppercase leading-none text-white/[0.06]", monogramClassName)}>
            {monogram}
          </span>
          <span className="absolute right-3 top-3 max-w-[calc(100%-1.5rem)] text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{soonLabel}</span>
        </>
      )}
    </figure>
  );
}

/** Showreel: lazy YouTube (nocookie) when configured, otherwise a designed placeholder. */
export function VideoSlot({ video, locale, soonLabel, className }: { video: Video | null; locale: "es" | "en"; soonLabel: string; className?: string }) {
  if (video) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
        title={video.title[locale]}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={cn("aspect-video w-full bg-black", className)}
      />
    );
  }
  return (
    <div className={cn("relative isolate grid aspect-video w-full place-items-center overflow-hidden bg-surface ring-2 ring-inset ring-line", className)}>
      <div aria-hidden className="bg-halftone absolute -right-10 -top-10 size-72 text-magenta opacity-25 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgba(255,255,255,0.025)_14px_15px)]" />
      <span className="flex flex-col items-center gap-3 text-white/50">
        <span className="grid size-14 place-items-center bg-cyan text-ink">
          <Play aria-hidden className="size-5 translate-x-0.5" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{soonLabel}</span>
      </span>
    </div>
  );
}
