"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  Home,
  Calendar,
  Compass,
  Award,
  KeyRound,
  Handshake,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import { LUXURY_EASE } from "@/components/ui/AnimatedSection";

export default function AboutUsPage() {
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useConsultationModal();

  // Accordion state for "Trust & Transparency" section (default first item open)
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const trustAccordionItems = [
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: LUXURY_EASE },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white overflow-x-hidden font-sans scroll-smooth">
      {/* Dynamic Warm Ambient Architectural Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#af7953]/10 via-amber-500/5 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating Pill Glassmorphic Navbar */}
      <Navbar />

      <main className="relative z-10">
        {/* SECTION 1: HERO & BREADCRUMB BANNER WITH HIGH-RISE ARCHITECTURAL CANVAS */}
        <section className="relative w-full overflow-hidden bg-zinc-950 text-white pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24">
          {/* Background Architectural Canvas & Dynamic Atmospheric Lighting */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/images/about-hero.png"
              alt="High-Rise Architecture - Brick and Beam Realty Thane"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.78] contrast-[1.08]"
            />

            {/* Balanced moderate dark layer for rich architectural contrast and crisp legibility */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/50" />

            {/* Ambient Brand Glow Spotlights */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-[#a01115]/15 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 right-10 w-[450px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />

            {/* Subtle Architectural Grid Overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Soft bottom blend into page body */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#faf8f5] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 shadow-xs backdrop-blur-md mb-6 text-xs sm:text-sm text-zinc-300 font-medium"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-zinc-400" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-amber-300 font-semibold">About Us</span>
            </nav>

            {/* Main Title & Lead */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#a01115]/30 border border-[#a01115]/50 text-rose-200 text-xs font-medium font-sans tracking-wider uppercase mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Brick &amp; Beam Realty • Thane Legacy</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                About Our Legacy &amp; <br />
                <span className="italic text-amber-200 font-serif drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                  Property Advisory
                </span>
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-200 leading-relaxed font-normal font-sans max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                With an unwavering commitment to transparency and architectural rigor, we connect discerning homebuyers and investors to Thane’s landmark developments with zero brokerage on direct bookings.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: COMPANY OVERVIEW (SPLIT LAYOUT - ELEVATED SENIOR-LEVEL DESIGN) */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column (Text, Buttons, Divider, Trust Bar) */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#a01115]" />
                <span>About Us • Established Excellence</span>
              </div>

              {/* Main Headline with Signature Serif Accent */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.18]">
                Guiding Your Property Journey With <br className="hidden sm:inline" />
                <span className="italic text-[#a01115] font-serif">
                  Honesty &amp; Rigor
                </span>
              </h2>

              {/* Body Paragraph */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-stone-600 leading-relaxed font-normal font-sans max-w-xl">
                With an unwavering commitment to excellence, we connect discerning homebuyers, commercial investors, and growing families with landmark developments across prime Thane corridors. Our registered advisors guide every milestone with transparent diligence and zero brokerage on direct developer bookings.
              </p>

              {/* CTA Action Buttons matching site-wide Hero and FinalCTA design system */}
              <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/properties"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-sm sm:text-base font-semibold font-sans shadow-lg shadow-[#a01115]/25 hover:shadow-xl hover:shadow-[#a01115]/30 transition-all duration-300"
                >
                  <span>See Properties</span>
                  <ArrowUpRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <button
                  type="button"
                  onClick={openModal}
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-stone-300 text-sm sm:text-base font-semibold font-sans shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-[#a01115]" />
                  <span>Contact Us</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Tall Clean Rounded Property Photography with Floating Badge */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative w-full h-full flex items-center justify-center"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full rounded-3xl sm:rounded-4xl overflow-hidden border border-stone-200/90 shadow-2xl bg-stone-100 group">
                <Image
                  src="/images/about-img1.png"
                  alt="Property Advisory Excellence - Brick and Beam Realty"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Floating Glassmorphic Standard Badge */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#a01115]/10 text-[#a01115] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Advisory Standard</div>
                    <div className="text-sm font-bold text-stone-900">Zero Conflict of Interest</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION: TRUST & TRANSPARENCY (ACCORDION SECTION WITH HIGH-END REFINEMENT) */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Rounded Lifestyle Consultation Image with Floating Badge */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative w-full flex items-center justify-center"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full rounded-3xl sm:rounded-4xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100 group">
                <Image
                  src="/images/trust-consultation.jpg"
                  alt="Trust & Transparency Consultation - Brick and Beam Realty"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Glass Reassurance Badge */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-md text-xs font-semibold text-stone-800 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-on-1 Personalized Advisory</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Heading & Interactive Accordion */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                {trustAccordionItems.map((item, index) => {
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
                            isOpen ? "text-[#a01115]" : "text-stone-900 group-hover:text-[#a01115]"
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
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3.5 mt-1">
                              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
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
        </section>

        {/* SECTION: HOW IT WORKS / WHAT WE DO (EXACT MATCH TO REFERENCE SCREENSHOT, ELEVATED FINISH) */}
        <section
          aria-labelledby="how-it-works-title"
          className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-white/70 backdrop-blur-xs rounded-3xl sm:rounded-4xl border border-stone-200/90 my-8 shadow-xs"
        >
          {/* Background Architectural Line-Art Illustrations matching screenshot */}
          <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
            {/* Left Background Architectural Sketch (Structural tower with cross bracing & floors) */}
            <svg
              className="absolute left-0 bottom-0 w-64 sm:w-80 lg:w-96 h-full opacity-40 text-stone-300"
              viewBox="0 0 280 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Structural Truss Tower & Chevron Bracing */}
              <path d="M 40 40 L 120 220 L 40 220 Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 120 40 L 120 220" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 40 40 L 200 40" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 200 40 L 120 220 L 200 220 Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 120 40 L 40 220" stroke="currentColor" strokeWidth="1.2" />

              {/* Tower Body & Horizontal Floor Slabs */}
              <rect x="50" y="220" width="120" height="380" stroke="currentColor" strokeWidth="1.2" />
              <line x1="50" y1="260" x2="170" y2="260" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="300" x2="170" y2="300" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="340" x2="170" y2="340" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="380" x2="170" y2="380" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="420" x2="170" y2="420" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="460" x2="170" y2="460" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="500" x2="170" y2="500" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="540" x2="170" y2="540" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="580" x2="170" y2="580" stroke="currentColor" strokeWidth="1" />

              {/* Diagonal Cross Truss */}
              <line x1="50" y1="220" x2="110" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="170" y1="220" x2="110" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Right Background Interior Sketch (Hanging pendant lamps, modern table, potted plant) */}
            <svg
              className="absolute right-0 top-0 w-72 sm:w-96 lg:w-[420px] h-full opacity-40 text-stone-300"
              viewBox="0 0 340 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ceiling Pendant Lamps */}
              <line x1="170" y1="0" x2="170" y2="60" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="140,80 200,80 185,60 155,60" stroke="currentColor" strokeWidth="1.2" />

              <line x1="260" y1="0" x2="260" y2="50" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="230,70 290,70 275,50 245,50" stroke="currentColor" strokeWidth="1.2" />

              {/* Potted Plant On Table */}
              <polygon points="90,85 125,85 118,120 97,120" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 107 85 Q 92 50 78 60 Q 94 75 107 85" stroke="currentColor" strokeWidth="1.1" />
              <path d="M 107 85 Q 107 45 117 50 Q 118 70 107 85" stroke="currentColor" strokeWidth="1.1" />
              <path d="M 107 85 Q 120 55 135 68 Q 124 78 107 85" stroke="currentColor" strokeWidth="1.1" />

              {/* Architectural Perspective Table */}
              <polygon points="60,120 300,120 265,150 35,150" stroke="currentColor" strokeWidth="1.2" />
              <line x1="42" y1="150" x2="35" y2="280" stroke="currentColor" strokeWidth="1.2" />
              <line x1="260" y1="150" x2="268" y2="280" stroke="currentColor" strokeWidth="1.2" />
              <line x1="72" y1="126" x2="68" y2="230" stroke="currentColor" strokeWidth="1" />
              <line x1="288" y1="126" x2="294" y2="230" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Top Subtle Floating Clouds */}
            <svg
              className="absolute top-6 left-28 w-20 h-12 opacity-35 text-stone-300"
              viewBox="0 0 64 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 12 26 C 7 26 4 22 6 18 C 6 12 14 10 18 14 C 22 8 34 8 38 14 C 42 10 50 12 50 16 C 56 16 58 24 52 26 Z"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Main Section Heading */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-4 shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-[#a01115]" />
                <span>Streamlined Advisory Flow</span>
              </div>

              <h2
                id="how-it-works-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.18]"
              >
                How It Works? Simple Steps to <br className="hidden sm:inline" />
                <span className="italic text-[#a01115] font-serif">
                  Buy, Sell, or Rent
                </span>
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed font-normal font-sans">
                From verified property discovery and legal title diligence to price negotiation and seamless key handover.
              </p>
            </motion.div>

            {/* 3 Step Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 items-stretch">
              {/* STEP 1: BUY A HOME */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative p-7 sm:p-9 rounded-3xl bg-white/80 hover:bg-white border border-stone-200/90 hover:border-[#a01115]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Step Circle Badge */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 border-stone-900 bg-white text-stone-900 flex items-center justify-center shadow-md relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#a01115] group-hover:text-[#a01115] group-hover:shadow-lg group-hover:shadow-[#a01115]/15">
                  <Home className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.8]" />
                </div>

                {/* Connecting Dotted Line to Step 2 (Desktop) */}
                <div className="hidden md:flex absolute top-[68px] sm:top-20 left-[calc(50%+54px)] w-[calc(100%-108px)] items-center z-0 pointer-events-none">
                  <div className="w-full border-t-[1.5px] border-dashed border-stone-400 group-hover:border-[#a01115]/40 transition-colors" />
                  <div className="w-0 h-0 border-y-[4.5px] border-y-transparent border-l-[8px] border-l-stone-600 -ml-[1px]" />
                </div>

                {/* Connecting Dotted Line to Step 2 (Mobile) */}
                <div className="flex md:hidden flex-col items-center mt-3 pointer-events-none">
                  <div className="h-8 border-l-[1.5px] border-dashed border-stone-400" />
                  <div className="w-0 h-0 border-x-[4.5px] border-x-transparent border-t-[8px] border-t-stone-600 -mt-[1px]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold font-sans text-stone-900 mt-5 sm:mt-6 mb-2.5 tracking-tight group-hover:text-[#a01115] transition-colors">
                  Buy A Home
                </h3>

                <p className="text-sm sm:text-[15px] text-stone-500 leading-relaxed max-w-[280px] sm:max-w-xs font-normal font-sans flex-1">
                  Find your perfect home with ease. Explore properties that match your lifestyle and budget, and make your homeownership dream come true.
                </p>

                <Link
                  href="/#properties"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold font-sans text-[#a01115] hover:text-[#850e11] group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Residences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              {/* STEP 2: RENT A HOME */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative p-7 sm:p-9 rounded-3xl bg-white/80 hover:bg-white border border-stone-200/90 hover:border-[#a01115]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Step Circle Badge */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg shadow-stone-900/15 relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#a01115] group-hover:shadow-xl group-hover:shadow-[#a01115]/25">
                  <KeyRound className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.8]" />
                </div>

                {/* Connecting Dotted Line to Step 3 (Desktop) */}
                <div className="hidden md:flex absolute top-[68px] sm:top-20 left-[calc(50%+54px)] w-[calc(100%-108px)] items-center z-0 pointer-events-none">
                  <div className="w-full border-t-[1.5px] border-dashed border-stone-400 group-hover:border-[#a01115]/40 transition-colors" />
                  <div className="w-0 h-0 border-y-[4.5px] border-y-transparent border-l-[8px] border-l-stone-600 -ml-[1px]" />
                </div>

                {/* Connecting Dotted Line to Step 3 (Mobile) */}
                <div className="flex md:hidden flex-col items-center mt-3 pointer-events-none">
                  <div className="h-8 border-l-[1.5px] border-dashed border-stone-400" />
                  <div className="w-0 h-0 border-x-[4.5px] border-x-transparent border-t-[8px] border-t-stone-600 -mt-[1px]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold font-sans text-stone-900 mt-5 sm:mt-6 mb-2.5 tracking-tight group-hover:text-[#a01115] transition-colors">
                  Rent A Home
                </h3>

                <p className="text-sm sm:text-[15px] text-stone-500 leading-relaxed max-w-[280px] sm:max-w-xs font-normal font-sans flex-1">
                  Discover your ideal rental home with options from cozy apartments to spacious family residences in prime locations, all tailored to fit your lifestyle.
                </p>

                <button
                  type="button"
                  onClick={openModal}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold font-sans text-[#a01115] hover:text-[#850e11] group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Inquire Rentals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>

              {/* STEP 3: SALE PROPERTY */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative p-7 sm:p-9 rounded-3xl bg-white/80 hover:bg-white border border-stone-200/90 hover:border-[#a01115]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Step Circle Badge */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg shadow-stone-900/15 relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#a01115] group-hover:shadow-xl group-hover:shadow-[#a01115]/25">
                  <Handshake className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.8]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold font-sans text-stone-900 mt-5 sm:mt-6 mb-2.5 tracking-tight group-hover:text-[#a01115] transition-colors">
                  Sale Property
                </h3>

                <p className="text-sm sm:text-[15px] text-stone-500 leading-relaxed max-w-[280px] sm:max-w-xs font-normal font-sans flex-1">
                  Sale your home with ease receive expert guidance, a fast and hassle-free process, and access to a network of qualified buyers at every step, successful &amp; profitable Sale.
                </p>

                <button
                  type="button"
                  onClick={openModal}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold font-sans text-[#a01115] hover:text-[#850e11] group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>List Your Property</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CTA (MODERN, IN-DEPTH REAL ESTATE BANNER) */}
        <FinalCTA />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
