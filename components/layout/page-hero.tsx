import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-14 sm:pb-20 sm:pt-20">
      <div aria-hidden className="bg-halftone absolute -right-10 top-10 -z-10 size-[26rem] text-magenta opacity-25 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} body={lead} />
        {children}
      </Container>
    </section>
  );
}
