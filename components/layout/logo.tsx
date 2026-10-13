import { siteConfig } from "@/config/site";

/** Wordmark: "BEYOND/THE FIGHT" — the slash replaces the first space. */
export function Logo() {
  const [first, ...rest] = siteConfig.name.split(" ");
  return (
    <span className="font-display text-xl uppercase tracking-wide text-snow">
      {first}
      {rest.length > 0 && <span className="text-cyan">/</span>}
      {rest.join(" ")}
    </span>
  );
}
