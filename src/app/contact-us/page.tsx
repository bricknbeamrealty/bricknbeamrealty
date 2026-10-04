import type { Metadata } from "next";
import ContactUsClient from "@/components/contact/ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us | Brick & Beam Realty Thane - Zero Brokerage Property Advisory",
  description:
    "Connect with Brick & Beam Realty for verified Thane residential and commercial properties. Zero brokerage on direct developer bookings, transparent MahaRERA due diligence, and 15-minute fast callback.",
  keywords: [
    "Contact Brick and Beam Realty",
    "Real Estate Consultant Thane",
    "Property Advisor Thane West",
    "Zero Brokerage Flats Thane",
    "Ghodbunder Road real estate office",
    "Thane luxury apartment consultation",
    "MahaRERA verified real estate agent",
  ],
  openGraph: {
    title: "Contact Us | Brick & Beam Realty Thane",
    description:
      "Schedule a confidential real estate consultation with Thane's premier zero-brokerage property advisory firm.",
    url: "https://bricknbeams.com/contact-us",
    siteName: "Brick & Beam Realty",
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
