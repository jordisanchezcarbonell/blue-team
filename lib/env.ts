/**
 * Public configuration read from environment variables.
 * `missingConfig` lists what still needs to be set (shown in development and in the README).
 */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** Floating style navigation (main site ↔ design proposals). Set "false" before sending to brands. */
  showStyleNav: process.env.NEXT_PUBLIC_STYLE_NAV !== "false",
};

export const missingConfig = [
  !env.contactEmail && {
    key: "NEXT_PUBLIC_CONTACT_EMAIL",
    why: "Activa el formulario de contacto (mailto) y el email del media kit.",
  },
  !env.siteUrl && {
    key: "NEXT_PUBLIC_SITE_URL",
    why: "URL pública para canonical, Open Graph, sitemap y robots.",
  },
].filter(Boolean) as { key: string; why: string }[];
