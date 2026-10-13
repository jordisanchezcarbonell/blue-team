import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Row = { k: string; s: string };
type Section = { title: string; rows: Row[] };

/**
 * Post-event report template. Shows the structure a sponsor receives; every value
 * is explicitly "after the event" — no sample numbers are invented.
 */
export function ReportSample({ brand, className }: { brand?: string; className?: string }) {
  const t = useTranslations("report");
  const sections = t.raw("sections") as Section[];

  return (
    <section aria-labelledby="report-title" className={cn("py-20 lg:py-24", className)}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <p className="inline-block -rotate-1 bg-snow px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">{t("eyebrow")}</p>
          <h2 id="report-title" className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] uppercase leading-[1]">{t("title")}</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted">{t("lead")}</p>
          <p className="mt-5 border-l-4 border-magenta pl-3 text-xs text-muted">{t("note")}</p>
        </div>

        {/* The "document" */}
        <figure className="bg-snow p-5 text-ink shadow-[8px_8px_0_var(--color-magenta)] sm:p-8 lg:col-span-7 lg:col-start-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink/55">{siteConfig.name}</p>
              <p className="mt-1 font-display text-2xl uppercase leading-none">{t("docTitle")}</p>
            </div>
            <dl className="text-right text-[11px]">
              {brand && <dd className="font-bold uppercase tracking-wider">{t("docFor", { brand })}</dd>}
              <dt className="sr-only">{t("docEvent")}</dt>
              <dd className="text-ink/60">{t("docEvent")}: {t("docEventValue")}</dd>
            </dl>
          </div>
          {sections.map((section, i) => (
            <div key={section.title} className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-magenta">
                {String(i + 1).padStart(2, "0")} · {section.title}
              </p>
              <table className="mt-2 w-full text-xs">
                <tbody>
                  {section.rows.map((row) => (
                    <tr key={row.k} className="border-b border-ink/10 align-top">
                      <th scope="row" className="py-2 pr-3 text-left font-normal">
                        {row.k}
                        <span className="block text-[10px] text-ink/45">{t("source")}: {row.s}</span>
                      </th>
                      <td className="whitespace-nowrap py-2 text-right">
                        <span className="inline-block border border-dashed border-ink/35 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink/55">{t("pending")}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </figure>
      </div>
    </section>
  );
}
