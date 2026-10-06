import type { Metadata } from "next";
import HowWeWorkClientView from "@/components/how-we-work/HowWeWorkClientView";

export const metadata: Metadata = {
  title: "How We Work | 5-Stage Zero-Brokerage Advisory Framework | Brick & Beams",
  description:
    "Discover how Brick & Beams Realty helps homebuyers and investors find prime properties across Thane with 0% brokerage, 24-point MahaRERA legal due diligence, and direct developer pricing.",
  keywords: [
    "How we work real estate Thane",
    "Zero brokerage Thane advisory",
    "MahaRERA property verification Thane",
    "Thane flat buying process",
    "Developer direct pricing Thane",
    "Brick and Beam Realty process",
    "Thane real estate consultants",
  ],
  openGraph: {
    title: "How We Work | Transparent 5-Stage Property Advisory | Brick & Beams",
    description:
      "A transparent, zero-brokerage advisory framework for buying, investing, and leasing properties in Thane. Thorough MahaRERA legal checks and direct developer pricing.",
    url: "https://bricknbeams.com/how-we-work",
    siteName: "Brick & Beams Realty",
    locale: "en_IN",
    type: "website",
  },
};

export default function HowWeWorkPage() {
  return <HowWeWorkClientView />;
}
