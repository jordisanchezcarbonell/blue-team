import { DesignSwitcher } from "@/components/designs/design-switcher";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { env } from "@/lib/env";

export default function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      {env.showStyleNav && <DesignSwitcher current="main" />}
    </>
  );
}
