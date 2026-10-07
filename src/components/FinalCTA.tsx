"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import { LUXURY_EASE } from "@/components/ui/AnimatedSection";

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useConsultationModal();

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Brick & Beams, I would like to inquire about verified luxury properties in Thane."
    );
    window.open("https://wa.me/18008492742?text=" + message, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact-us"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "-40px 0px" }}
        transition={{ duration: 0.75, ease: LUXURY_EASE }}
        className="space-y-6"
      >
        {/* Minimal Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs font-medium font-sans text-[#a01115] tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#a01115]" />
          <span>Start Your Journey</span>
        </div>

        {/* Clean Luxury Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-stone-900 tracking-tight leading-[1.15]">
          Ready to find your dream home <br className="hidden sm:inline" />
          <span className="italic text-[#a01115] font-serif">in Thane?</span>
        </h2>

        {/* Minimal Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-xl mx-auto font-normal font-sans leading-relaxed">
          Verified homes and luxury flats in prime locations across Thane.
          Direct builder prices and trusted guidance from private site visit to handover.
        </p>

        {/* Minimal Dual Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={openModal}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-sm sm:text-base font-semibold font-sans shadow-lg shadow-[#a01115]/20 hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-sm sm:text-base font-semibold font-sans shadow-xs hover:border-stone-300 transition-all duration-200 cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366] fill-current shrink-0" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Product Trust Assurance Ribbon */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-stone-500 font-medium font-sans">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>MahaRERA Verified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>15 mins fast callback</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
