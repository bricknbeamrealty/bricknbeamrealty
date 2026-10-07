"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import FAQSection from "@/components/FAQSection";
import {
  Compass,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  Home,
  KeyRound,
  ChevronRight,
  ArrowRight,
  Coins,
  Check,
  Layers,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import { LUXURY_EASE } from "@/components/ui/AnimatedSection";

// Persona type definition
type PersonaType = "buyer" | "investor" | "seller";

interface PersonaConfig {
  id: PersonaType;
  title: string;
  badge: string;
  description: string;
  keyBenefits: string[];
}

const personas: PersonaConfig[] = [
  {
    id: "buyer",
    title: "Homebuyers (1, 2 & 3 BHK)",
    badge: "Most Popular",
    description:
      "Looking for verified residential flats and luxury apartments in Thane with zero brokerage, honest carpet area verification, and direct developer pricing.",
    keyBenefits: [
      "100% Zero Brokerage on direct developer bookings",
      "Actual carpet area audit & sample flat inspections",
      "Neighborhood connectivity (schools, transit, metro)",
      "Developer price negotiation & stamp duty savings",
    ],
  },
  {
    id: "investor",
    title: "Real Estate Investors",
    badge: "High Growth",
    description:
      "Targeting high rental yields, early-stage builder entry pricing, upcoming metro connectivity corridors, and reliable exit liquidity across Thane.",
    keyBenefits: [
      "Yield modeling & Thane capital appreciation projections",
      "Early-bird inventory access in Tier-1 launches",
      "Tenant placement assistance & lease management",
      "Tax efficiency & resale advisory",
    ],
  },
  {
    id: "seller",
    title: "Property Owners & Resale",
    badge: "Fast Turnaround",
    description:
      "Seeking institutional valuation, verified high-intent buyer matching, legally compliant documentation, and seamless key handover without distress pricing.",
    keyBenefits: [
      "Accurate comparative market analysis (CMA)",
      "Qualified, loan-approved buyer network",
      "Complete escrow & agreement coordination",
      "Zero hidden marketing fees or upfront charges",
    ],
  },
];

interface ProcessStep {
  number: string;
  title: string;
  phase: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  clientAdvantage: string;
  durationEstimate: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    phase: "Phase 1: Discovery",
    title: "Requirement Mapping & Lifestyle Audit",
    subtitle: "We listen first, with zero pushy sales calls",
    description:
      "Every successful property journey starts with clear discovery. We take the time to understand your lifestyle, exact budget bracket, possession timeline, and commute priorities across Thane's prime micro-markets.",
    icon: Compass,
    deliverables: [
      "Personalized Thane Corridor Heatmap",
      "Curated shortlist of 3–4 matched projects",
      "Realistic total cost estimation (all taxes included)",
      "Detailed unit layout & floor plan comparisons",
    ],
    clientAdvantage:
      "Eliminates 90% of irrelevant site visits and protects you from spam calls.",
    durationEstimate: "24–48 Hours",
  },
  {
    number: "02",
    phase: "Phase 2: Due Diligence",
    title: "MahaRERA & 24-Point Legal Diligence",
    subtitle: "Rigorous legal verification before you spend a single rupee",
    description:
      "We independently audit each shortlisted development against government records. We verify MahaRERA registration timelines, land title ownership, TMC sanction plans, Commencement Certificates (CC), and builder solvency.",
    icon: ShieldCheck,
    deliverables: [
      "24-point legal title & sanction audit report",
      "MahaRERA delivery milestone verification",
      "Bank approval & approved APF code list",
      "Litigation & encumbrance clearance checks",
    ],
    clientAdvantage:
      "Guarantees you never purchase into disputed, delayed, or unapproved developments.",
    durationEstimate: "Completed Prior to Visits",
  },
  {
    number: "03",
    phase: "Phase 3: Inspection",
    title: "Curated VIP Private Site Visits",
    subtitle: "Chauffeured, structured inspections of actual sample flats",
    description:
      "We schedule private, zero-hassle site tours accompanied by a senior property specialist. We analyze sunlight orientation, carpet efficiency, construction grade, ceiling height, and surrounding civic infrastructure.",
    icon: Building2,
    deliverables: [
      "Real carpet area verification vs super built-up",
      "Structural & acoustic insulation assessment",
      "Transit distance tests to Eastern Express Hwy & Metro",
      "Comparative Builder Scorecard",
    ],
    clientAdvantage:
      "Gain objective, unvarnished insight into each project's real pros and cons.",
    durationEstimate: "1–2 Weekends",
  },
  {
    number: "04",
    phase: "Phase 4: Negotiation",
    title: "Developer-Direct Negotiation Shield",
    subtitle: "Corporate institutional leverage working on your behalf",
    description:
      "Because Brick & Beams represents substantial transaction volumes across Thane's top developers, we command institutional pricing power. We negotiate developer discounts, flexible construction-linked payment plans, and stamp duty waivers.",
    icon: Coins,
    deliverables: [
      "Guaranteed developer-direct floor pricing",
      "Custom payment milestone structuring",
      "Stamp duty / registration rebate negotiation",
      "100% Zero brokerage commitment on direct inventory",
    ],
    clientAdvantage:
      "Saves you lakhs compared to retail walk-in prices, backed by absolute price transparency.",
    durationEstimate: "2–4 Days",
  },
  {
    number: "05",
    phase: "Phase 5: Completion",
    title: "Documentation, Home Loan & Key Handover",
    subtitle: "From agreement drafting to unlocking your new front door",
    description:
      "Our support doesn't end when terms are agreed. We coordinate your Agreement for Sale (AFS), assist with premier bank loan sanctions at the lowest interest rates, attend the registrar office, and conduct your final possession audit.",
    icon: KeyRound,
    deliverables: [
      "RERA-compliant Agreement for Sale vetting",
      "Direct coordination with top PSU & private banks",
      "Sub-Registrar appointment & biometric escort",
      "Pre-possession snagging checklist & key handover",
    ],
    clientAdvantage:
      "Zero friction or legal confusion; a smooth, celebratory closing experience.",
    durationEstimate: "Until Possession & Beyond",
  },
];

export default function HowWeWorkClientView() {
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useConsultationModal();
  const [activePersona, setActivePersona] = useState<PersonaType>("buyer");
  const [activeStep, setActiveStep] = useState<number>(0);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: LUXURY_EASE },
    },
  };

  const currentPersona = personas.find((p) => p.id === activePersona) || personas[0];

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white overflow-x-hidden font-sans scroll-smooth">
      {/* Dynamic Warm Ambient Architectural Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#af7953]/10 via-amber-500/5 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating Pill Glassmorphic Navbar */}
      <Navbar />

      <main className="relative z-10">
        {/* =================================================================== */}
        {/* SECTION 1: HERO HEADER & VALUE PROPOSITION */}
        {/* =================================================================== */}
        <section className="relative w-full overflow-hidden bg-zinc-950 text-white pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28">
          {/* Background Architectural Canvas */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/images/why-choose-us.jpg"
              alt="How We Work - Brick & Beams Realty Advisory"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.70] contrast-[1.10]"
            />
            {/* Atmospheric gradient overlays */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Glowing Accent Spotlights */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#a01115]/20 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-amber-500/10 rounded-full blur-[120px]" />

            {/* Soft bottom feathered seam */}
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
              <span className="text-amber-300 font-semibold">How We Work</span>
            </nav>

            {/* Main Headline & Lead Copy */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeIn}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.14] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                How We Work, <br />
                <span className="italic text-amber-200 font-serif drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                  Step by Step
                </span>
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-zinc-200 leading-relaxed font-normal font-sans max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                We make buying property in Thane simple and stress-free. From finding verified homes to legal checks and getting your keys, we guide you through every step — with zero brokerage.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="#process-steps"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-sm sm:text-base font-semibold font-sans shadow-lg shadow-[#a01115]/30 hover:shadow-xl transition-all duration-300"
                >
                  <span>Explore The 5 Steps</span>
                  <ArrowRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={openModal}
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm sm:text-base font-semibold font-sans backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-amber-200/90" />
                  <span>Book Free Advisory Call</span>
                </button>
              </div>
            </motion.div>

          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 2: PERSONA SELECTOR ("TAILORED FOR YOUR EXACT GOAL") */}
        {/* =================================================================== */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-3.5 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#a01115]" />
              <span>Tailored For You</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.18]">
              A Process Tailored to Your <br className="hidden sm:inline" />
              <span className="italic text-[#a01115] font-serif">Specific Goal</span>
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed font-normal font-sans">
              Whether you are buying your family&apos;s dream home, building a high-yield investment portfolio, or listing a prime property in Thane.
            </p>

            {/* Persona Switcher Tags */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
              {personas.map((persona) => {
                const isActive = activePersona === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => setActivePersona(persona.id)}
                    className={`group relative px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold font-sans transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                      isActive
                        ? "bg-[#a01115] text-white border-[#a01115] shadow-md shadow-[#a01115]/25 scale-[1.02]"
                        : "bg-white text-stone-700 hover:text-stone-900 border-stone-200/90 hover:border-stone-300 hover:bg-stone-50 shadow-2xs"
                    }`}
                  >
                    <span>{persona.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium font-sans transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-stone-100 text-stone-600 group-hover:bg-stone-200/70"
                      }`}
                    >
                      {persona.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Persona Spotlight Card */}
          <motion.div
            key={currentPersona.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-sans text-stone-900 font-semibold tracking-tight">
              {currentPersona.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-normal font-sans max-w-2xl mx-auto">
              {currentPersona.description}
            </p>
          </motion.div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: THE 5-STEP CORE ADVISORY JOURNEY (TIMELINE) */}
        {/* =================================================================== */}
        <section
          id="process-steps"
          className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200/80 scroll-mt-24"
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-4 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#a01115]" />
              <span>Step-by-Step Blueprint</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.18]">
              The 5-Step Advisory Journey to <br className="hidden sm:inline" />
              <span className="italic text-[#a01115] font-serif">
                Seamless Ownership
              </span>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed font-normal font-sans">
              A transparent, disciplined pathway engineered to eliminate anxiety, save substantial money, and ensure 100% legal clarity.
            </p>
          </div>

          {/* Vertical Connected Timeline Track */}
          <div className="relative max-w-5xl mx-auto pl-6 sm:pl-12 md:pl-20">
            {/* The Continuous Vertical Spine */}
            <div
              className="absolute left-[15px] sm:left-[27px] md:left-[35px] top-6 bottom-16 w-[3px] bg-gradient-to-b from-[#a01115] via-amber-600 to-[#a01115] rounded-full shadow-[0_0_10px_rgba(160,17,21,0.2)]"
              aria-hidden="true"
            />

            {/* Timeline Milestones */}
            <div className="space-y-12 sm:space-y-16">
              {processSteps.map((step, index) => {
                const isHighlighted = activeStep === index;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    id={`timeline-step-${step.number}`}
                    initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                    onMouseEnter={() => setActiveStep(index)}
                    className="relative group"
                  >
                    {/* Spine Node Marker */}
                    <div
                      className={`absolute -left-[30px] sm:-left-[42px] md:-left-[50px] top-5 w-8 h-8 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white transition-all duration-300 shadow-md ${
                        isHighlighted
                          ? "bg-[#a01115] ring-4 ring-[#a01115]/25 scale-110 shadow-lg shadow-[#a01115]/30"
                          : "bg-stone-800 group-hover:bg-[#a01115] ring-2 ring-white"
                      }`}
                    >
                      <StepIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    </div>

                    {/* Horizontal Connector Arm (Tablet / Desktop) */}
                    <div
                      className={`hidden sm:block absolute -left-[20px] md:-left-[24px] top-10 w-5 md:w-6 h-[2px] transition-colors duration-300 ${
                        isHighlighted ? "bg-[#a01115]" : "bg-stone-300 group-hover:bg-[#a01115]/60"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Timeline Milestone Card */}
                    <article
                      className={`relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-300 border ${
                        isHighlighted
                          ? "bg-white border-[#a01115]/30 shadow-xl ring-1 ring-[#a01115]/20 -translate-y-0.5"
                          : "bg-white/90 hover:bg-white border-stone-200/90 hover:border-stone-300 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#a01115] text-white text-[11px] font-bold font-mono tracking-wider">
                          STEP {step.number}
                        </span>
                        <span className="text-xs font-medium font-sans uppercase tracking-wider text-stone-500">
                          {step.phase}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-sans font-semibold text-stone-900 tracking-tight leading-snug group-hover:text-[#a01115] transition-colors">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed font-normal font-sans">
                        {step.description}
                      </p>
                    </article>
                  </motion.div>
                );
              })}
            </div>

            {/* Celebratory Final Milestone Anchor */}
            <div className="relative mt-12 sm:mt-16 pt-2">
              {/* Terminus Node Marker */}
              <div className="absolute -left-[30px] sm:-left-[42px] md:-left-[50px] top-3 w-8 h-8 sm:w-11 sm:h-11 rounded-2xl bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center text-white shadow-lg">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>

              {/* Terminus Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-stone-900 via-zinc-900 to-stone-950 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium font-sans mb-2">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Destination Reached</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-sans font-semibold text-white">
                    Keys in Hand, Zero Brokerage, Total Peace of Mind
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl font-normal font-sans">
                    Every step of your Thane home purchase is protected by institutional due diligence, transparent developer pricing, and our dedicated handover escort.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openModal}
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#a01115] hover:bg-[#850e11] text-white text-xs sm:text-sm font-semibold font-sans shadow-lg shadow-[#a01115]/30 transition-all cursor-pointer active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-amber-200" />
                  <span>Begin Step 01</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
        {/* =================================================================== */}
        <FAQSection />

        {/* =================================================================== */}
        {/* SECTION 5: FINAL CALL TO ACTION */}
        {/* =================================================================== */}
        <FinalCTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
