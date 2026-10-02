import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brick & Beams",
  description: "Modern architectural engineering platform powered by Next.js 16, Tailwind CSS v4, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className="antialiased bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white min-h-screen relative">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

