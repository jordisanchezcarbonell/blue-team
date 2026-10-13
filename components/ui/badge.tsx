import { cn } from "@/lib/utils";

type Tone = "cyan" | "magenta" | "muted" | "warn";

const tones: Record<Tone, string> = {
  cyan: "bg-cyan/10 text-cyan ring-cyan/30",
  magenta: "bg-magenta/10 text-magenta ring-magenta/30",
  muted: "bg-snow/5 text-muted ring-line",
  warn: "bg-warn/10 text-warn ring-warn/30",
};

export function Badge({
  tone = "muted",
  className,
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-heading text-[11px] font-semibold uppercase tracking-wider ring-1 ring-inset",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
