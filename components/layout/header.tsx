"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { navItems } from "./nav-items";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const otherLocale = routing.locales.find((l) => l !== locale)!;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b-2 transition-colors duration-300",
        scrolled || open ? "border-line bg-ink/95 backdrop-blur" : "border-transparent bg-ink",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0" aria-label="Home">
          <Logo />
        </Link>

        <nav aria-label={t("main")} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block whitespace-nowrap px-2 py-1.5 font-heading text-xs uppercase tracking-wider text-snow/60 transition-colors hover:bg-cyan hover:text-ink aria-[current=page]:bg-snow aria-[current=page]:text-ink"
                >
                  <span className="hidden opacity-60 xl:inline">[{String(i + 1).padStart(2, "0")}] </span>{t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={pathname}
            locale={otherLocale}
            aria-label={t("switchTo")}
            className="grid h-9 min-w-9 place-items-center px-2 font-heading text-xs font-bold uppercase tracking-wider text-muted ring-2 ring-inset ring-line transition-colors hover:text-snow hover:ring-cyan"
          >
            {otherLocale}
          </Link>
          <Link
            href="/partners"
            className="group hidden items-center gap-2 whitespace-nowrap bg-cyan px-4 py-2 font-heading text-xs font-bold uppercase tracking-wider text-ink sm:flex"
          >
            {t("cta")} <span aria-hidden className="transition-transform group-hover:translate-x-1">▶</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center text-snow lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t("main")}
        hidden={!open}
        className="h-[calc(100dvh-3.5rem)] overflow-y-auto border-t-2 border-line bg-ink lg:hidden"
      >
        <ul className="flex flex-col px-4 py-6 sm:px-6">
          {[{ href: "/", key: "home" } as const, ...navItems].map((item, i) => (
            <li key={item.href} className="border-b border-line/60">
              <Link
                href={item.href}
                aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                className="flex items-baseline gap-4 py-4 font-display text-[1.75rem] uppercase text-snow aria-[current=page]:text-cyan"
              >
                <span className="font-heading text-xs text-muted">[{String(i).padStart(2, "0")}]</span>
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 pb-10 sm:px-6">
          <Link href="/partners" className={buttonClasses("primary", "lg", "w-full")}>
            {t("cta")} ▶
          </Link>
        </div>
      </nav>
    </header>
  );
}
