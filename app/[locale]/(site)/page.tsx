import type { Metadata } from "next";
import { EvoExplainer } from "@/components/home/evo-explainer";
import { UgHero, UgPitch } from "@/components/underground/hero";
import {
  UgAudience,
  UgContent,
  UgContinue,
  UgManifesto,
  UgNextChallenge,
  UgResults,
  UgRoster,
  UgStages,
  UgTiers,
} from "@/components/underground/sections";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "home");
}

/**
 * Home — "C · FGC Underground" as the main design (the previous A · Esports Elite
 * home lives on in components/elite and /designs/esports). Ordered for a 30-second
 * read: who → results → offer, then detail.
 */
export default function HomePage() {
  return (
    <>
      <UgHero />
      <UgPitch />
      <UgManifesto />
      <UgRoster />
      <UgResults />
      <UgStages />
      <UgAudience />
      <UgContent />
      <EvoExplainer />
      <UgNextChallenge />
      <UgTiers />
      <UgContinue />
    </>
  );
}
