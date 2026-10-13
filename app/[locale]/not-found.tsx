import { useTranslations } from "next-intl";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
          <p className="text-gradient font-display text-[clamp(6rem,20vw,14rem)] leading-none">{t("title")}</p>
          <p className="mt-4 text-xl text-muted">{t("body")}</p>
          <ButtonLink href="/" className="mt-8">{t("cta")}</ButtonLink>
        </Container>
      </main>
      <Footer />
    </>
  );
}
