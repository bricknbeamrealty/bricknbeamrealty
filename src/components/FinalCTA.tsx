"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Brick & Beams, I would like to inquire about verified luxury properties in Thane."
    );
    window.open("https://wa.me/18008492742?text=" + message, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact-us"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center"
    >
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        {/* Minimal Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#a01115] tracking-[0.2em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a01115]" />
          <span>Start Your Journey</span>
        </div>

        {/* Clean Luxury Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.15]">
          Ready to find your dream home <br className="hidden sm:inline" />
          <span className="italic text-[#a01115]">in Thane?</span>
        </h2>

        {/* Minimal Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
          Verified homes and luxury flats in prime locations across Thane.
          Direct builder prices, zero brokerage, and trusted guidance from site visit to handover.
        </p>

        {/* Minimal Dual Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-sm sm:text-base font-medium shadow-lg shadow-[#a01115]/20 hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-sm sm:text-base font-medium shadow-xs hover:border-stone-300 transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
