"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CredentialsSection from "@/components/CredentialsSection";
import FAQSection from "@/components/FAQSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import FinalCTA from "@/components/FinalCTA";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustTransparencySection from "@/components/TrustTransparencySection";
import {
  ArrowUpRight,
  Building2,
  ShieldCheck,
  MapPin,
  Calendar,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useConsultationModal();

  // Centralized staggered entrance animation sequence for hero section
  const heroContainerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const tagVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const headlineVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const ctaVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };






  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white overflow-x-hidden font-sans scroll-smooth">
      {/* Dynamic Warm Ambient Architectural Lighting (Soft sunlit ambience) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#af7953]/10 via-amber-500/5 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating Pill Glassmorphic Navbar */}
      <Navbar />

      {/* SECTION 1: HERO (Minimal, Premium Dark Editorial Treatment) */}
      <section
        id="home"
        className="relative z-10 h-screen min-h-[680px] w-full overflow-hidden flex items-end bg-zinc-950"
      >
        {/* Full-Bleed Hero Image with Dark Toning */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_section.png"
            alt="Thane Skyline - Brick and Beam Realty"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center brightness-[0.85] saturate-[0.90]"
          />
          {/* Subtle top scrim for floating navbar contrast */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
          {/* Multi-stop legibility gradient overlay (guarantees WCAG AAA contrast for light text) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
          {/* Minimal bottom blend into properties section (low, subtle feathered seam) */}
          <div className="absolute inset-x-0 bottom-0 h-8 sm:h-10 md:h-12 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* Editorial Headline & CTA Lockup (Left-Aligned Lower-Third) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-24 lg:pb-28">
          <motion.div
            variants={heroContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="max-w-4xl flex flex-col items-start text-left select-none"
          >
            {/* Line 1: "THANE" tag + underline */}
            <motion.div variants={tagVariants}>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-zinc-300 font-sans">
                  Real Estate in Thane
                </span>
              </div>
              <div className="w-10 sm:w-14 h-[2px] bg-[#a01115] rounded-full mt-2.5 mb-3 origin-left" />
            </motion.div>

            {/* Line 2: Small, Minimal & Clean Headline */}
            <motion.h1
              variants={headlineVariants}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.15]"
            >
              Find Your Dream Home <br />
              <span className="italic text-amber-200/90 font-serif">in Thane</span>
            </motion.h1>

            {/* Line 3: Simple & Understandable Sub-headline for Local Buyers */}
            <motion.p
              variants={headlineVariants}
              className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-300 max-w-xl font-normal font-sans leading-relaxed"
            >
              Verified flats, luxury apartments, and commercial spaces across prime locations in Thane with complete trust and guidance.
            </motion.p>

            {/* Line 4: CTA Action Buttons */}
            <motion.div
              variants={ctaVariants}
              className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3"
            >
              <Link
                href="#properties"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-sm sm:text-base font-semibold font-sans shadow-lg shadow-[#a01115]/30 hover:shadow-xl transition-all duration-200"
              >
                <span>Find Properties</span>
                <ArrowUpRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm sm:text-base font-semibold font-sans backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-amber-200/90" />
                <span>Book Consultation</span>
              </button>
            </motion.div>

            {/* Line 5: Hero Trust Proof Bar */}
            <motion.div
              variants={ctaVariants}
              className="mt-8 pt-5 border-t border-white/15 flex flex-wrap items-center gap-5 sm:gap-8 text-xs font-sans text-zinc-300"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MahaRERA Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-300 shrink-0" />
                <span>Prime Thane Locations</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: CREDENTIALS (Trust & Transparency) */}
      <CredentialsSection />

      {/* SECTION 2: PROPERTIES */}
      <section id="properties" className="relative z-10 pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#a01115]" />
            <span>Featured Properties</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight">
            Featured Properties
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal font-sans max-w-xl mx-auto leading-relaxed">
            Explore verified 1, 2 &amp; 3 BHK luxury residences and landmark communities in prime locations across Thane, with zero brokerage on direct bookings.
          </p>
        </div>

        {/* Featured Properties Interactive Grid & Filter System */}
        <FeaturedProperties />
      </section>

      {/* SECTION: WHY CHOOSE US (Replaces How We Work) */}
      <WhyChooseUs />

      {/* SECTION: ABOUT US / TRUST & TRANSPARENCY */}
      <TrustTransparencySection />

      {/* SECTION: FAQ */}
      <FAQSection />

      {/* SECTION 6: FINAL CTA (Modern, Premium, Minimalist & In-Depth) */}
      <FinalCTA />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
