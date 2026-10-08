import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationModal from "@/components/ConsultationModal";
import { ConsultationModalProvider } from "@/context/ConsultationModalContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brick & Beams | Premier Real Estate Advisory in Thane",
  description:
    "Verified luxury residential landmarks, high-rises, and developer-direct pricing across Thane with 0% brokerage.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable}`}>
      <body
        suppressHydrationWarning
        className="antialiased font-sans bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white min-h-screen relative"
      >
        <SmoothScrollProvider>
          <ConsultationModalProvider>
            {children}
            <ConsultationModal />
            <WhatsAppButton />
          </ConsultationModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
