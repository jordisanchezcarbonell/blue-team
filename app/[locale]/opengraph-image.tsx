import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.claim}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typographic OG card — no photos, so nothing can be mistaken for a real team picture. */
export default async function Image() {
  const i = siteConfig.claim.lastIndexOf(" TO ");
  const [line1, line2] = i === -1 ? [siteConfig.claim, ""] : [siteConfig.claim.slice(0, i), siteConfig.claim.slice(i + 1)];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#070910",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(253,75,157,0.35), transparent 45%), radial-gradient(circle at 10% 90%, rgba(86,215,255,0.28), transparent 45%)",
          color: "#F6F7FB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#56D7FF", fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 110, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>{line1}</span>
          <span style={{ color: "#FD4B9D" }}>{line2}</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#A2AAB9" }}>
          {siteConfig.subClaim}
        </div>
      </div>
    ),
    size,
  );
}
