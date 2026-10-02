"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CredentialsSection from "@/components/CredentialsSection";
import FinalCTA from "@/components/FinalCTA";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

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
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#a01115] shadow-sm shadow-[#a01115]/60" />
                <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-zinc-300 font-sans">
                  Real Estate in Thane
                </span>
              </div>
              <div className="w-10 sm:w-14 h-[2px] bg-[#a01115] rounded-full mt-2.5 mb-3 origin-left" />
            </motion.div>

            {/* Line 2: Small, Minimal & Clean Headline */}
            <motion.h1
              variants={headlineVariants}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15]"
            >
              Find Your Dream Home <br />
              <span className="italic text-amber-200/90 font-serif">in Thane</span>
            </motion.h1>

            {/* Line 3: Simple & Understandable Sub-headline for Local Buyers */}
            <motion.p
              variants={headlineVariants}
              className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed"
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
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-sm sm:text-base font-medium shadow-lg shadow-[#a01115]/30 hover:shadow-xl transition-all duration-200"
              >
                <span>Find Properties</span>
                <ArrowUpRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="#contact-us"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm sm:text-base font-medium backdrop-blur-md transition-all duration-200"
              >
                <span>Contact Us</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: CREDENTIALS (Trust & Transparency) */}
      <CredentialsSection />

      {/* SECTION 2: PROPERTIES */}
      <section id="properties" className="relative z-10 pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#a01115] tracking-wider uppercase mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
              Featured Architectural <span className="font-serif italic text-[#a01115]">Properties</span>
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Each commission reflects bespoke structural calculation, micro-climate integration, and timeless materiality.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="relative rounded-3xl border border-stone-200/80 bg-white py-16 px-6 sm:py-20 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium text-stone-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a01115] animate-pulse" />
            <span>Curating Prime Thane Inventory</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
            Featured Properties <span className="italic text-[#a01115]">Coming Soon</span>
          </h3>
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-md mx-auto leading-relaxed">
            We are curating handpicked, verified luxury flats, penthouses, and prime commercial projects in Thane. Stay tuned.
          </p>
        </div>
      </section>

      {/* SECTION: HOW WE WORK */}
      <section id="how-we-work" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="relative rounded-3xl border border-stone-200/80 bg-white py-16 px-6 sm:py-20 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium text-stone-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a01115] animate-pulse" />
            <span>Process &amp; Methodology</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
            How We Work <span className="italic text-[#a01115]">In Progress</span>
          </h3>
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-md mx-auto leading-relaxed">
            Our step-by-step buyer guidance and client onboarding framework is currently being updated.
          </p>
        </div>
      </section>

      {/* SECTION: ABOUT US */}
      <section id="about-us" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="relative rounded-3xl border border-stone-200/80 bg-white p-8 sm:p-14 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium text-stone-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a01115] animate-pulse" />
              <span>Who We Are &amp; Our Story</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
              About Us <span className="italic text-[#a01115]">Work in Progress</span>
            </h3>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
              We are currently finalizing our in-depth company profile, founding story, and local real estate vision for Thane.
              While our full story is being documented here, our team is actively on the ground delivering transparent, verified property consulting.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-stone-50/70 border border-stone-200/70 text-left">
              <div className="w-8 h-8 rounded-xl bg-[#a01115]/10 border border-[#a01115]/20 text-[#a01115] flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-stone-900">MahaRERA Registered</h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Operating with complete regulatory compliance, verified titles, and zero-brokerage direct builder access across Thane.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50/70 border border-stone-200/70 text-left">
              <div className="w-8 h-8 rounded-xl bg-[#a01115]/10 border border-[#a01115]/20 text-[#a01115] flex items-center justify-center mb-3">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-stone-900">Local Thane Expertise</h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Specialized focus on high-growth prime corridors including Majiwada, Ghodbunder Road, and Pokhran Road.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50/70 border border-stone-200/70 text-left">
              <div className="w-8 h-8 rounded-xl bg-[#a01115]/10 border border-[#a01115]/20 text-[#a01115] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-semibold text-stone-900">Transparent Advisory</h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Unbiased, client-first guidance from initial private site tours to structural review and key handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA (Modern, Premium, Minimalist & In-Depth) */}
      <FinalCTA />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
