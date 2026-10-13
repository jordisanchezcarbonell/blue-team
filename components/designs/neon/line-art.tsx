/** Thin line illustrations for the chapter "player" cards. Purely decorative. */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;

function Sparkle({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <path
      {...stroke}
      d={`M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z`}
    />
  );
}

export function Sparkles() {
  const pts = [
    [30, 28], [70, 28], [110, 28], [150, 28], [190, 28],
    [50, 60], [90, 60], [130, 60], [170, 60],
    [30, 92], [70, 92], [110, 92], [150, 92], [190, 92],
  ];
  return (
    <svg viewBox="0 0 220 120" className="w-full">
      {pts.map(([x, y]) => <Sparkle key={`${x}-${y}`} x={x} y={y} r={18} />)}
    </svg>
  );
}

export function Globe() {
  return (
    <svg viewBox="0 0 220 120" className="w-full">
      <ellipse {...stroke} cx="110" cy="60" rx="100" ry="52" />
      {[20, 45, 70].map((rx) => <ellipse key={rx} {...stroke} cx="110" cy="60" rx={rx} ry="52" />)}
      {[-34, -12, 12, 34].map((dy) => (
        <line key={dy} {...stroke} x1={110 - Math.sqrt(1 - (dy / 52) ** 2) * 100} x2={110 + Math.sqrt(1 - (dy / 52) ** 2) * 100} y1={60 + dy} y2={60 + dy} />
      ))}
      <line {...stroke} x1="10" x2="210" y1="60" y2="60" />
    </svg>
  );
}

export function Rings() {
  return (
    <svg viewBox="0 0 220 120" className="w-full">
      {[45, 70, 95, 120, 145, 170].map((cx) => <ellipse key={cx} {...stroke} cx={cx} cy="60" rx="26" ry="52" />)}
    </svg>
  );
}

/** Double-elimination-ish bracket tree. */
export function Bracket() {
  return (
    <svg viewBox="0 0 220 120" className="w-full">
      <path {...stroke} d="M10 24 H60 M10 48 H60 M10 72 H60 M10 96 H60" />
      <path {...stroke} d="M60 24 V48 M60 72 V96 M60 36 H110 M60 84 H110 M110 36 V84 M110 60 H210" />
      <circle cx="210" cy="60" r="4" fill="currentColor" />
    </svg>
  );
}

export function Waves() {
  return (
    <svg viewBox="0 0 220 120" className="w-full">
      {[30, 50, 70, 90].map((y, i) => (
        <path key={y} {...stroke} d={`M5 ${y} ${Array.from({ length: 11 }, (_, k) => `Q${15 + k * 20} ${y + (k % 2 ? 10 : -10) * (i % 2 ? -1 : 1)} ${25 + k * 20} ${y}`).join(" ")}`} />
      ))}
    </svg>
  );
}

export function Star() {
  return (
    <svg viewBox="0 0 220 120" className="w-full">
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <ellipse key={a} {...stroke} cx="110" cy="60" rx="90" ry="14" transform={`rotate(${a} 110 60)`} />
      ))}
    </svg>
  );
}

/** Squiggle used as a rule between chapter label and kana. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d={`M0 6 ${Array.from({ length: 20 }, (_, k) => `Q${5 + k * 10} ${k % 2 ? 12 : 0} ${10 + k * 10} 6`).join(" ")}`}
      />
    </svg>
  );
}
