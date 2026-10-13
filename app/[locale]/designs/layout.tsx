import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design proposals",
  robots: { index: false, follow: false },
};

export default function DesignsLayout({ children }: LayoutProps<"/[locale]/designs">) {
  return children;
}
