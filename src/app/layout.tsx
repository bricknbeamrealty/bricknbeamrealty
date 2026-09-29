import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

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
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950 min-h-screen relative">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

