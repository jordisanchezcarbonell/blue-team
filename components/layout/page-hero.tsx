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
    <section className="relative isolate -mt-16 overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[30rem] rounded-full bg-magenta/15 blur-[120px]" />
      <div aria-hidden className="absolute -left-32 top-10 -z-10 size-[26rem] rounded-full bg-cyan/10 blur-[120px]" />
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} body={lead} />
        {children}
      </Container>
    </section>
  );
}
