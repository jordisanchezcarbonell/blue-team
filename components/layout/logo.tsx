import { siteConfig } from "@/config/site";

/** Wordmark: "BEYOND//THE FIGHT" — the double slash replaces the first space. */
export function Logo() {
  const [first, ...rest] = siteConfig.name.split(" ");
  return (
    <span className="font-display text-lg uppercase tracking-wide text-snow">
      {first}
      {rest.length > 0 && <span className="text-cyan">{"//"}</span>}
      {rest.join(" ")}
    </span>
  );
}
