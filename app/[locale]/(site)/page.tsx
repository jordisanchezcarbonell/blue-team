import type { Metadata } from "next";
import { EliteHero, Pitch, Ticker } from "@/components/elite/hero";
import {
  Audience,
  ContentBlock,
  EliteCta,
  EliteTiers,
  Leaderboard,
  Manifesto,
  NextChallenge,
  Roster,
} from "@/components/elite/sections";
import { EvoExplainer } from "@/components/home/evo-explainer";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "home");
}

/**
 * Home — "A · Esports Elite" as the main design, with editorial numbers and
 * manifesto (from B) and result bars (from C). Ordered for a 30-second read:
 * who → results → offer, then detail.
 */
export default function HomePage() {
  return (
    <>
      <Ticker />
      <EliteHero />
      <Pitch />
      <Manifesto />
      <Roster />
      <Leaderboard />
      <Audience />
      <ContentBlock />
      <EvoExplainer />
      <NextChallenge />
      <EliteTiers />
      <EliteCta />
    </>
  );
}
