// Generates the downloadable media kit PDFs from the /[locale]/media-kit page.
// Usage: start the site (npm run build && npm start), then: npm run media-kit
// Env: MEDIA_KIT_BASE_URL (default http://localhost:3000), CHROME_PATH (auto-detected on macOS/Linux).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const base = process.env.MEDIA_KIT_BASE_URL ?? "http://localhost:3000";
const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome/Chromium not found. Set CHROME_PATH.");
  process.exit(1);
}

const outDir = resolve("public/media-kit");
mkdirSync(outDir, { recursive: true });

for (const locale of ["es", "en"]) {
  const out = resolve(outDir, `beyond-the-fight-media-kit-${locale}.pdf`);
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=8000",
    `--print-to-pdf=${out}`,
    `${base}/${locale}/media-kit`,
  ], { stdio: "inherit" });
  console.log(`✓ ${out}`);
}
