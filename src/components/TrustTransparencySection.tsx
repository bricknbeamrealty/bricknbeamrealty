"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { LUXURY_EASE } from "@/components/ui/AnimatedSection";

export interface AccordionItem {
  title: string;
  content: string;
}

const defaultTrustItems: AccordionItem[] = [
  {
    title: "Who We are?",
    content:
      "A team of experienced real estate professionals committed to connecting clients with their ideal properties across prime Thane corridors, backed by institutional architectural rigor and market research.",
  },
  {
    title: "What We Do",
    content:
      "We specialize in curating verified residential and commercial developments, conducting transparent MahaRERA due diligence, and facilitating seamless developer-direct transactions with zero brokerage.",
  },
  {
    title: "Our Mission & Vision",
    content:
      "Our mission is to empower homebuyers and investors with honest market intelligence, eliminating high-pressure broker tactics and establishing lifelong trust in Thane's real estate ecosystem.",
  },
];

interface TrustTransparencySectionProps {
  id?: string;
  items?: AccordionItem[];
  className?: string;
  showSeeMore?: boolean;
  seeMoreHref?: string;
  seeMoreText?: string;
}

export default function TrustTransparencySection({
  id = "about-us",
  items = defaultTrustItems,
  className = "",
  showSeeMore = true,
  seeMoreHref = "/about-us",
  seeMoreText = "See More",
}: TrustTransparencySectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id={id}
      className={`relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200/80 scroll-mt-24 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Rounded Lifestyle Consultation Image with Floating Badge */}
        <motion.div
          initial={{
            opacity: shouldReduceMotion ? 1 : 0,
            scale: shouldReduceMotion ? 1 : 0.95,
            y: shouldReduceMotion ? 0 : 20,
          }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: "-40px 0px" }}
          transition={{ duration: 0.75, ease: LUXURY_EASE }}
          className="lg:col-span-6 relative w-full flex items-center justify-center"
        >
          <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full rounded-3xl sm:rounded-4xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100 group">
            {!imgLoaded && (
              <div className="absolute inset-0 skeleton-shimmer z-0" />
            )}
            <Image
              src="/images/trust-consultation.jpg"
              alt="Trust & Transparency Consultation - Brick and Beam Realty"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-102"
              }`}
              onLoad={() => setImgLoaded(true)}
            />

            {/* Floating Glass Reassurance Badge */}
            <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-md text-xs font-medium font-sans text-stone-800 flex items-center gap-2 select-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-on-1 Personalized Advisory</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Heading & Interactive Accordion */}
        <motion.div
          initial={{
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 25,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: "-40px 0px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: LUXURY_EASE }}
          className="lg:col-span-6 flex flex-col justify-center text-left"
        >
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-4 shadow-2xs self-start">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a01115]" />
            <span>Our Core Values</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.18] mb-6">
            Trust &amp; Transparency Through Out <br className="hidden sm:inline" />
            <span className="italic text-[#a01115] font-serif">
              Your Real Estate Journey
            </span>
          </h2>

          {/* Accordion Group */}
          <div className="space-y-3.5">
            {items.map((item, index) => {
              const isOpen = openAccordion === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white p-5 sm:p-6 shadow-md border-stone-200/90"
                      : "p-4 sm:p-5 bg-white/40 hover:bg-white/80 border-stone-200/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-lg sm:text-xl font-semibold font-sans transition-colors ${
                        isOpen
                          ? "text-[#a01115]"
                          : "text-stone-900 group-hover:text-[#a01115]"
                      }`}
                    >
                      {item.title}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isOpen
                          ? "bg-[#a01115] text-white rotate-180 shadow-xs"
                          : "bg-stone-100 text-stone-600 group-hover:bg-stone-200"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2]" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3.5 mt-1">
                          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal font-sans">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Action CTA: In-depth About Us Link (Centered below the section) */}
      {showSeeMore && (
        <motion.div
          initial={{
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 20,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: shouldReduceMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-center"
        >
          <Link
            href={seeMoreHref}
            className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-sm sm:text-base font-semibold font-sans shadow-lg shadow-[#a01115]/25 hover:shadow-xl hover:shadow-[#a01115]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a01115] focus-visible:ring-offset-2 transition-all duration-300"
            aria-label="See more about Brick & Beam Realty"
          >
            <span>{seeMoreText}</span>
            <ArrowRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </section>
  );
}
