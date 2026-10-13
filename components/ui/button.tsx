import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-[0.08em] transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "clip-corner-sm bg-cyan text-ink hover:bg-snow hover:shadow-[0_0_40px_-8px_var(--color-cyan)]",
  secondary:
    "clip-corner-sm bg-surface-2 text-snow ring-1 ring-inset ring-line hover:ring-magenta hover:text-snow",
  ghost: "text-snow underline-offset-4 hover:text-cyan hover:underline",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-xs",
  lg: "h-14 px-7 text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

type LinkProps = React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant, size, className, ...props }: LinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonProps = React.ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
