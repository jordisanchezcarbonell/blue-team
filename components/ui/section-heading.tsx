import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex -rotate-1 items-center gap-2 bg-snow px-2.5 py-1 font-heading text-[11px] font-bold uppercase tracking-widest text-ink",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 bg-magenta" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  as: Tag = "h2",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "mt-5 text-balance font-display uppercase tracking-[-0.01em] text-snow",
          // Font size before leading: tailwind-merge drops a leading-* that precedes a text-* size.
          Tag === "h1" ? "text-[clamp(2.1rem,8vw,5.5rem)]" : "text-[clamp(1.8rem,5.5vw,3.5rem)]",
          "leading-[1]",
        )}
      >
        {title}
      </Tag>
      {body && <p className="mt-5 text-pretty text-base leading-relaxed text-muted">{body}</p>}
    </div>
  );
}
