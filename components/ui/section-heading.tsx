import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-cyan",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current" />
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
          "mt-4 text-balance font-display uppercase leading-[0.95] tracking-tight text-snow",
          Tag === "h1" ? "text-[2.5rem] sm:text-6xl lg:text-7xl" : "text-[2rem] sm:text-5xl",
        )}
      >
        {title}
      </Tag>
      {body && <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{body}</p>}
    </div>
  );
}
