import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { players } from "@/data/team";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { navItems } from "./nav-items";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="relative mt-24 border-t border-line bg-surface/40">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-md">
          <Logo />
          <p className="mt-4 text-muted">{t("tagline")}</p>
          <p className="mt-6 text-xs leading-relaxed text-muted/80">{t("disclaimer")}</p>
          <p className="mt-3 text-xs text-muted/60">{t("brandNote")}</p>
        </div>
        <div>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("explore")}</h2>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted transition-colors hover:text-cyan">
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("sources")}</h2>
          <ul className="mt-4 space-y-2.5">
            {players.map((p) => (
              <li key={p.id}>
                <a
                  href={p.startggResults}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-cyan"
                >
                  {p.handle} · start.gg <ExternalLink aria-hidden className="size-3.5" />
                </a>
              </li>
            ))}
            {socials.map(([name, url]) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm capitalize text-muted hover:text-cyan">
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-snow">{t("work")}</h2>
          <Link href="/contact" className="mt-3 inline-block text-sm text-cyan hover:underline">
            {nav("cta")} →
          </Link>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 pb-20 pt-6 text-xs text-muted/70 sm:flex-row sm:justify-between">
          <span>© {siteConfig.recordsUntil} {siteConfig.name}</span>
          <span>{siteConfig.claim}</span>
        </Container>
      </div>
    </footer>
  );
}
