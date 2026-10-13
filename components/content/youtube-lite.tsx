"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Lightweight YouTube player: shows the thumbnail and only loads the
 * youtube-nocookie iframe on click, so a page with many videos stays fast
 * and no YouTube request is made until the visitor asks for it.
 */
export function YouTubeLite({
  id,
  title,
  playLabel,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
  className,
}: {
  id: string;
  title: string;
  playLabel: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={cn("aspect-video w-full bg-black", className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setPlaying(true);
        track("video_play", { id });
      }}
      className={cn("group relative block aspect-video w-full overflow-hidden bg-black", className)}
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover opacity-85 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-14 place-items-center bg-cyan text-ink shadow-[4px_4px_0_var(--color-ink)] transition-transform group-hover:scale-110">
          <Play aria-hidden className="size-5 translate-x-0.5 fill-current" />
        </span>
      </span>
      <span className="sr-only">{playLabel}: {title}</span>
    </button>
  );
}
