import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { PhotoPlaceholder } from "@/components/ui/pending-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { players } from "@/data/team";
import { cn } from "@/lib/utils";

export function TeamIntro() {
  const t = useTranslations("teamIntro");
  const c = useTranslations("common");
  const members = [
    ...players.map((p) => ({ id: p.id, name: p.handle, role: t("player"), accent: p.accent, games: p.games.slice(0, 3) })),
    { id: "creator", name: "TBA", role: t("creator"), accent: "snow" as const, games: ["TikTok", "Reels", "Shorts"] },
  ];

  return (
    <section id="team" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {members.map((m, i) => (
            <li key={m.id}>
              <Reveal delay={i * 0.08}>
                <Link
                  href={`/team#${m.id}`}
                  className="clip-corner group block bg-surface ring-1 ring-inset ring-line transition-colors hover:ring-cyan/60"
                >
                  <PhotoPlaceholder
                    label={c("pendingPhoto")}
                    initials={m.id === "creator" ? "C" : m.name.slice(0, 2).toUpperCase()}
                    accent={m.accent}
                    className="aspect-[4/5]"
                  />
                  <div className="p-5">
                    <p
                      className={cn(
                        "font-heading text-[11px] font-semibold uppercase tracking-[0.25em]",
                        { cyan: "text-cyan", magenta: "text-magenta", snow: "text-muted" }[m.accent],
                      )}
                    >
                      {m.role}
                    </p>
                    <p className="mt-1 flex items-center justify-between font-display text-3xl uppercase text-snow">
                      {m.name}
                      <ArrowUpRight aria-hidden className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                    </p>
                    <p className="mt-2 text-sm text-muted">{m.games.join(" · ")}</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
