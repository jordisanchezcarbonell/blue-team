import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const home = await readFile(new URL("../app/[locale]/(site)/page.tsx", import.meta.url), "utf8");
const sections = await readFile(new URL("../components/underground/sections.tsx", import.meta.url), "utf8");
const hero = await readFile(new URL("../components/underground/hero.tsx", import.meta.url), "utf8");

test("home tells sponsors a credibility-to-contact story", () => {
  for (const component of ["UgPartnerReasons", "UgEvoFranceCaseStudy", "UgAudience", "UgContent", "UgEvoRoad", "UgNextChallenge", "UgTiers", "UgContinue"]) {
    assert.match(home, new RegExp(`<${component}`));
  }

  assert.ok(home.indexOf("<UgPartnerReasons") < home.indexOf("<UgEvoFranceCaseStudy"));
  assert.ok(home.indexOf("<UgEvoFranceCaseStudy") < home.indexOf("<UgAudience"));
  assert.ok(home.indexOf("<UgAudience") < home.indexOf("<UgContent"));
});

test("hero has direct sponsor and media-kit CTAs with readable credibility stats", () => {
  assert.match(hero, /href="\/partners"/);
  assert.match(hero, /href="\/media-kit"/);
  assert.match(hero, /sponsorHome\.heroStats/);
  assert.match(hero, /sponsorHome\.downloadMediaKit/);
});

test("commercial sections use editable placeholders instead of invented reporting", () => {
  assert.match(sections, /sponsorHome\.evoFrance/);
  assert.match(sections, /sponsorHome\.partnerReasons/);
  assert.match(sections, /sponsorHome\.audience/);
  assert.match(sections, /sponsorHome\.content/);
  assert.match(sections, /roadmapTitle/);
  assert.match(sections, /sponsorshipAvailable/);
  assert.match(sections, /pending/);
});
