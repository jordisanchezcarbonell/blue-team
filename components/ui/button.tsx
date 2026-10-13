import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan text-ink shadow-[5px_5px_0_var(--color-magenta)] hover:shadow-[2px_2px_0_var(--color-magenta)]",
  secondary:
    "border-2 border-snow text-snow hover:bg-snow hover:text-ink",
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
