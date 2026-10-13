import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { CompareViewer } from "@/components/designs/compare-viewer";
import { designs } from "@/components/designs/data";
import { DesignSwitcher } from "@/components/designs/design-switcher";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = { title: "Design proposals" };

const text = {
  es: {
    title: "Cuatro direcciones visuales",
    lead: "Todas usan los mismos datos reales (start.gg, EVO con fuentes) y no muestran fotos, logros ni métricas inventadas. La web actual no se ha modificado.",
    current: "Ver la web actual",
    labels: { desktop: "Escritorio", mobile: "Móvil", all: "Todas", open: "Abrir" },
    items: {
      esports: {
        idea: "Competición profesional. Negro profundo, azul eléctrico y magenta; tipografía condensada, roster con marcos de jugador, leaderboard de resultados y tabla de modalidades sobre blanco.",
        keys: ["Ticker de eventos", "Roster a pantalla completa", "Leaderboard con barras", "Temporadas en rail horizontal"],
      },
      editorial: {
        idea: "Campaña deportiva premium. Papel claro, negro y un único acento naranja; titulares gigantes, capítulos numerados, fotografía cinematográfica y mucho aire.",
        keys: ["Titular a todo ancho", "Manifiesto tipográfico", "Spreads por jugador", "Números gigantes + tabla"],
      },
      underground: {
        idea: "Cultura arcade y FGC. Asfalto, papel, ácido y rojo; HUD de barras de vida, character select, stage select y niveles de súper como modalidades. Identidad propia, sin copiar juegos.",
        keys: ["HUD P1 / P2", "Resultados como barras de vida", "Stage select asimétrico", "Continue? como CTA"],
      },
      neon: {
        idea: "Editorial nocturno por capítulos, inspirado en la referencia Neon City. Grotesca extendida vertical, scroll horizontal con arrastre, acento lima, tarjetas de capítulo con dibujo lineal y rótulos en katakana. Pensada para fotografía nocturna real del equipo.",
        keys: ["Scroll horizontal por capítulos", "Título vertical extendido", "Tarjetas 第一章 con line-art", "Cursor lima"],
      },
    },
  },
  en: {
    title: "Four visual directions",
    lead: "All of them use the same real data (start.gg, sourced Evo facts) and show no invented photos, achievements or metrics. The current site is untouched.",
    current: "View current site",
    labels: { desktop: "Desktop", mobile: "Mobile", all: "All", open: "Open" },
    items: {
      esports: {
        idea: "Pro competition. Deep black, electric blue and magenta; condensed type, roster player frames, a results leaderboard and packages on white.",
        keys: ["Event ticker", "Full-height roster", "Leaderboard with bars", "Seasons rail"],
      },
      editorial: {
        idea: "Premium sports campaign. Light paper, black and a single orange accent; giant headlines, numbered chapters, cinematic photography and lots of air.",
        keys: ["Full-width headline", "Typographic manifesto", "Player spreads", "Giant numbers + table"],
      },
      underground: {
        idea: "Arcade and FGC culture. Asphalt, paper, acid and red; health-bar HUD, character select, stage select and super-meter levels as packages. Original identity, no copied games.",
        keys: ["P1 / P2 HUD", "Results as health bars", "Asymmetric stage select", "Continue? CTA"],
      },
      neon: {
        idea: "Night-time editorial in chapters, inspired by the Neon City reference. Vertical extended grotesk, horizontal drag-scroll, lime accent, chapter cards with line art and katakana labels. Built for real night photography of the team.",
        keys: ["Horizontal chapter scroll", "Vertical extended title", "第一章 line-art cards", "Lime cursor"],
      },
    },
  },
} as const;

const swatches = {
  esports: ["#05070d", "#56D7FF", "#FD4B9D", "#F6F7FB"],
  editorial: ["#F6F5F1", "#0B0B0B", "#FF4A1C"],
  underground: ["#0E0E0D", "#EFEAE0", "#D7FF3C", "#FF3355"],
  neon: ["#0A0A0C", "#E7E6E1", "#B8FF2C", "#FF2A55"],
} as const;

export default function DesignsPage() {
  const locale = useLocale();
  const tx = text[locale];
  const items = designs.map((d) => ({ ...d, href: `/${locale}/designs/${d.slug}` }));

  return (
    <div className="min-h-dvh bg-[#0a0a0a] font-sans text-white">
      <main id="main" className="mx-auto max-w-[1600px] px-4 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Beyond the Fight · Design review</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{tx.title}</h1>
            <p className="mt-4 max-w-2xl text-white/60">{tx.lead}</p>
          </div>
          <Link href="/" className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
            {tx.current} →
          </Link>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {items.map((d) => {
            const info = tx.items[d.slug];
            return (
              <li key={d.slug} className="flex flex-col bg-[#0a0a0a] p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/40">{d.tag}</span>
                  <span className="flex gap-1" aria-hidden>
                    {swatches[d.slug].map((s) => (
                      <span key={s} className="size-4 rounded-full ring-1 ring-white/20" style={{ background: s }} />
                    ))}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold">{d.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{info.idea}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {info.keys.map((k) => (
                    <li key={k} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/70">{k}</li>
                  ))}
                </ul>
                <Link href={`/designs/${d.slug}`} className="mt-6 inline-flex items-center gap-1 self-start text-sm font-semibold underline-offset-4 hover:underline">
                  /designs/{d.slug} <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-14">
          <CompareViewer items={items} labels={tx.labels} />
        </div>
      </main>
      <DesignSwitcher current="compare" />
    </div>
  );
}
