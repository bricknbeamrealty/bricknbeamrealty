import type { Metadata } from "next";
import PropertiesClientView from "@/components/properties/PropertiesClientView";

export const metadata: Metadata = {
  title: "Properties in Thane | Verified Flats & Luxury High-Rises | Brick & Beams",
  description:
    "Explore verified residential developments, luxury high-rises, and gated communities across Thane West. 100% MahaRERA audited with direct builder pricing and 0% brokerage.",
  keywords: [
    "Properties in Thane",
    "Flats in Thane West",
    "Luxury apartments Thane",
    "Raymond Ten X Era",
    "Godrej Ascend Kolshet",
    "Rustomjee Uptown Urbania Majiwada",
    "Pokhran Road flats",
    "Ready to move flats Thane",
    "0% brokerage Thane",
  ],
  openGraph: {
    title: "Properties in Thane | Luxury Flats & Apartments | Brick & Beams",
    description:
      "Explore verified residential developments and luxury high-rises across Thane with developer-direct pricing and 0% brokerage.",
    url: "https://bricknbeams.com/properties",
    siteName: "Brick & Beams Realty",
    locale: "en_IN",
    type: "website",
  },
};

export default function PropertiesPage() {
  return <PropertiesClientView />;
}
