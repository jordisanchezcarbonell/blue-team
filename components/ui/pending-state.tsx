import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/** Explicit placeholder for data the team hasn't provided yet. Never fake it. */
export function PendingState({
  title,
  body,
  className,
  children,
}: {
  title: string;
  body?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 border border-dashed border-warn/40 bg-warn/[0.03] p-8 text-center",
        className,
      )}
    >
      <Clock aria-hidden className="size-6 text-warn" />
      <p className="font-heading font-semibold text-snow">{title}</p>
      {body && <p className="max-w-md text-sm text-muted">{body}</p>}
      {children}
    </div>
  );
}

/** Placeholder frame for a real team photo. */
export function PhotoPlaceholder({
  label,
  initials,
  accent = "cyan",
  className,
}: {
  label: string;
  initials: string;
  accent?: "cyan" | "magenta" | "snow";
  className?: string;
}) {
  const color = { cyan: "text-cyan", magenta: "text-magenta", snow: "text-snow" }[accent];
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("relative isolate overflow-hidden bg-surface", className)}
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 grid place-items-center font-display text-[7rem] leading-none opacity-15",
          color,
        )}
      >
        {initials}
      </div>
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-ink/80 px-2 py-1 font-heading text-[10px] font-semibold uppercase tracking-wider text-warn">
        <Clock aria-hidden className="size-3" />
        {label}
      </span>
    </div>
  );
}
