"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { slug: string; name: string; tag: string; href: string };
type Device = "desktop" | "mobile";

const DEVICES = {
  desktop: { w: 1440, h: 900 },
  mobile: { w: 390, h: 844 },
} as const;

/** Renders a real page in an iframe at device size, scaled to fit its column. */
function DeviceFrame({ item, device }: { item: Item; device: Device }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { w, h } = DEVICES[device];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / w)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div ref={ref} className={cn("w-full", device === "mobile" && "mx-auto max-w-[390px]")}>
      <div
        className={cn("relative overflow-hidden bg-black ring-1 ring-white/15", device === "mobile" ? "rounded-[2rem]" : "rounded-lg")}
        style={{ height: h * scale }}
      >
        <iframe
          src={item.href}
          title={`${item.tag} · ${item.name} (${device})`}
          loading="lazy"
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{ width: w, height: h, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

export function CompareViewer({ items, labels }: { items: Item[]; labels: { desktop: string; mobile: string; all: string; open: string } }) {
  const [device, setDevice] = useState<Device>("mobile");
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? items : items.filter((i) => i.slug === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Design" className="flex flex-wrap gap-1 rounded-full bg-white/5 p-1 text-xs font-semibold">
          {[{ slug: "all", label: labels.all }, ...items.map((i) => ({ slug: i.slug, label: `${i.tag} · ${i.name}` }))].map((tab) => (
            <button
              key={tab.slug}
              role="tab"
              aria-selected={active === tab.slug}
              onClick={() => setActive(tab.slug)}
              className={cn("rounded-full px-4 py-2 transition-colors", active === tab.slug ? "bg-white text-black" : "text-white/60 hover:text-white")}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Device" className="flex gap-1 rounded-full bg-white/5 p-1 text-xs font-semibold">
          {(["desktop", "mobile"] as const).map((d) => (
            <button
              key={d}
              aria-pressed={device === d}
              onClick={() => setDevice(d)}
              className={cn("flex items-center gap-2 rounded-full px-4 py-2 transition-colors", device === d ? "bg-white text-black" : "text-white/60 hover:text-white")}
            >
              {d === "desktop" ? <Monitor className="size-3.5" aria-hidden /> : <Smartphone className="size-3.5" aria-hidden />}
              {labels[d]}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mt-8 grid gap-8",
          device === "mobile" && shown.length > 1 && "md:grid-cols-2 xl:grid-cols-4",
        )}
      >
        {shown.map((item) => (
          <figure key={`${item.slug}-${device}`} className="min-w-0">
            <figcaption className="mb-3 flex items-center justify-between text-sm">
              <span className="font-semibold">{item.tag} · {item.name}</span>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/60 underline-offset-4 hover:text-white hover:underline">
                {labels.open} ↗
              </a>
            </figcaption>
            <DeviceFrame item={item} device={device} />
          </figure>
        ))}
      </div>
    </div>
  );
}
