import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { designs, type DesignSlug } from "./data";

/**
 * Floating style navigation: main site ↔ design proposals A–D ↔ comparator.
 * On the main site it can be hidden with NEXT_PUBLIC_STYLE_NAV=false (do it before sending to brands).
 */
export function DesignSwitcher({ current }: { current: DesignSlug | "main" | "compare" }) {
  const t = useTranslations("styleNav");
  const items = [
    { key: "main", href: "/", short: "★", long: t("main") },
    ...designs.map((d) => ({ key: d.slug, href: `/designs/${d.slug}`, short: d.tag, long: `${d.tag} · ${d.name}` })),
    { key: "compare", href: "/designs", short: "⇆", long: t("compare") },
  ];

  return (
    <nav
      aria-label={t("label")}
      className="fixed bottom-4 left-1/2 z-[90] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full bg-black/85 p-1 font-sans text-[11px] font-semibold text-white shadow-2xl ring-1 ring-white/15 backdrop-blur [scrollbar-width:none]"
    >
      <span className="hidden px-2.5 text-white/40 md:inline">{t("label")}</span>
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          aria-current={item.key === current ? "page" : undefined}
          className={cn(
            "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors",
            item.key === current ? "bg-white text-black" : "text-white/70 hover:text-white",
          )}
        >
          <span className="md:hidden" aria-hidden>{item.short}</span>
          <span className="sr-only md:not-sr-only">{item.long}</span>
        </Link>
      ))}
    </nav>
  );
}
