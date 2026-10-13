/**
 * Public configuration read from environment variables.
 * `missingConfig` lists what still needs to be set (shown in development and in the README).
 */
export const env = {
  /** Explicit URL, else Vercel's production domain (auto-set, follows a custom domain), else the current deployment. */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://blue-team-five.vercel.app"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jordigw@gmail.com",
  /** Floating style navigation (main site ↔ design proposals). Set "false" before sending to brands. */
  showStyleNav: process.env.NEXT_PUBLIC_STYLE_NAV !== "false",
  /** Optional scheduling link (Calendly, Cal.com, Google Calendar…) for a 15-minute intro call. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  /** Vercel Web Analytics (cookieless). Enable it in the Vercel dashboard too. */
  analytics: process.env.NEXT_PUBLIC_ANALYTICS === "true",
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
  !env.bookingUrl && {
    key: "NEXT_PUBLIC_BOOKING_URL",
    why: "Opcional: enlace para agendar una llamada de 15 minutos (Calendly, Cal.com…).",
  },
].filter(Boolean) as { key: string; why: string }[];
