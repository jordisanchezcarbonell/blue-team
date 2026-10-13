/**
 * Stylised (not geographic) route of the documented competitive path:
 * Barcelona → Evo Online (2021) → Las Vegas (2022, 2023) → Nice (2025, 2026).
 */
const stops = [
  { id: "bcn", x: 60, y: 300, city: "BARCELONA", years: "2018 →", tone: "snow" },
  { id: "online", x: 150, y: 140, city: "EVO ONLINE", years: "2021", tone: "muted" },
  { id: "lv", x: 330, y: 80, city: "LAS VEGAS", years: "2022 · 2023", tone: "cyan" },
  { id: "nice", x: 360, y: 300, city: "NICE · EVO FRANCE", years: "2025 · 2026", tone: "magenta" },
] as const;

const colors = { snow: "#F6F7FB", muted: "#A2AAB9", cyan: "#56D7FF", magenta: "#FD4B9D" };

export function RouteMap({ label }: { label: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="clip-corner relative bg-surface/60 p-5 ring-1 ring-inset ring-line backdrop-blur">
        <figcaption className="flex items-center justify-between font-heading text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
          <span>{label}</span>
          <span className="text-cyan">2018—2026</span>
        </figcaption>
        <svg viewBox="0 0 440 380" className="mt-4 w-full" role="img" aria-label="Barcelona → Evo Online 2021 → Las Vegas 2022, 2023 → Nice 2025, 2026">
          <defs>
            <linearGradient id="route" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#56D7FF" />
              <stop offset="100%" stopColor="#FD4B9D" />
            </linearGradient>
          </defs>
          <g stroke="#232B3F" strokeWidth="1">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`h${i}`} x1="0" x2="440" y1={i * 47.5} y2={i * 47.5} />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <line key={`v${i}`} y1="0" y2="380" x1={i * 48.9} x2={i * 48.9} />
            ))}
          </g>
          <path
            d="M60 300 C 80 210, 110 160, 150 140 S 280 60, 330 80 S 420 220, 360 300"
            fill="none"
            stroke="url(#route)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="900"
            strokeDashoffset="900"
            className="animate-dash"
          />
          {stops.map((s) => (
            <g key={s.id}>
              <circle cx={s.x} cy={s.y} r="14" fill={colors[s.tone]} opacity="0.15" />
              <circle cx={s.x} cy={s.y} r="5" fill={colors[s.tone]} />
              <text
                x={s.x + (s.id === "nice" || s.id === "lv" ? -12 : 14)}
                y={s.y - 18}
                textAnchor={s.id === "nice" || s.id === "lv" ? "end" : "start"}
                fill={colors[s.tone]}
                fontSize="13"
                fontWeight="700"
                style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.08em" }}
              >
                {s.city}
              </text>
              <text
                x={s.x + (s.id === "nice" || s.id === "lv" ? -12 : 14)}
                y={s.y - 2}
                textAnchor={s.id === "nice" || s.id === "lv" ? "end" : "start"}
                fill="#A2AAB9"
                fontSize="11"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {s.years}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
}
