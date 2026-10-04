"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import {
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  MapPin,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Briefcase,
  FileCheck2,
  Star,
  Quote,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function AboutUsPage() {
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useConsultationModal();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
    },
  };

  // Team advisors data with newly generated high-res portraits
  const teamMembers = [
    {
      name: "Rajesh Sharma",
      role: "Principal Strategist & Founder",
      bio: "14+ years pioneering transparent property consulting in Thane. Former structural consultant specializing in prime residential corridors.",
      specialization: "Pokhran Road & Majiwada High-Rise",
      image: "/images/team/rajesh-sharma.jpg",
      phone: "+91 98201 44520",
      email: "rajesh@bricknbeams.com",
    },
    {
      name: "Ananya Deshmukh",
      role: "Head of Luxury Acquisitions",
      bio: "Leads exclusive developer allocations and pre-launch inventory access across Thane West's most prestigious gated communities.",
      specialization: "Luxury Penthouses & Pre-Launches",
      image: "/images/team/ananya-deshmukh.jpg",
      phone: "+91 98201 44521",
      email: "ananya@bricknbeams.com",
    },
    {
      name: "Vikram Patil",
      role: "Senior Micro-Market Analyst",
      bio: "Specializes in infrastructure catalyst modeling, Metro Line 4 & 11 impact projections, and commercial real estate returns.",
      specialization: "Commercial Suites & Rental Yields",
      image: "/images/team/vikram-patil.jpg",
      phone: "+91 98201 44522",
      email: "vikram@bricknbeams.com",
    },
    {
      name: "Priya Nair",
      role: "Head of Legal & Title Due-Diligence",
      bio: "Oversees 100% MahaRERA audits, encumbrance verification, builder-buyer agreement reviews, and transparent conveyance.",
      specialization: "MahaRERA Audits & Conveyance",
      image: "/images/team/priya-nair.jpg",
      phone: "+91 98201 44523",
      email: "priya@bricknbeams.com",
    },
  ];

  // Client testimonials data
  const testimonials = [
    {
      quote:
        "Brick & Beam made buying our 3 BHK in Raymond Ten X Era completely stress-free. Their direct builder tie-up saved us lakhs, and their team handled every single legal approval with extreme precision.",
      clientName: "Michael & Neha Williams",
      clientRole: "Purchased 3 BHK • Pokhran Road 1",
      rating: 5,
      project: "Raymond Ten X Era",
    },
    {
      quote:
        "As a doctor, I have zero time for endless broker calls. Brick & Beam provided unbiased rental yield analytics for Godrej Ascend and arranged private chauffeur-driven site visits for my family. Exceptional integrity.",
      clientName: "Dr. Sarah Thomas",
      clientRole: "Property Investor • Kolshet Road",
      rating: 5,
      project: "Godrej Ascend",
    },
    {
      quote:
        "Zero brokerage and genuine advice! They showed us both the pros and cons of every project before we settled on Rustomjee Uptown Urbania. You won't find this level of honesty anywhere else in Thane.",
      clientName: "David & Anita Martinez",
      clientRole: "Homebuyer • Majiwada Junction",
      rating: 5,
      project: "Rustomjee Uptown Urbania",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white overflow-x-hidden font-sans scroll-smooth">
      {/* Dynamic Warm Ambient Architectural Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#af7953]/10 via-amber-500/5 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating Pill Glassmorphic Navbar */}
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-32">
        {/* SECTION 1: HERO & BREADCRUMB BANNER */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 sm:pb-16 text-center">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-stone-200/80 shadow-xs backdrop-blur-md mb-6 text-xs sm:text-sm text-stone-600 font-medium"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-[#a01115] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#a01115] font-semibold">About Us</span>
          </nav>

          {/* Main Title & Lead */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#a01115]" />
              <span>Brick &amp; Beam Realty • Thane Legacy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.15]">
              About Our Legacy &amp; <br />
              <span className="italic text-[#a01115] font-serif">Property Advisory</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
              With an unwavering commitment to transparency and architectural rigor, we connect discerning homebuyers and investors to Thane’s landmark developments with zero brokerage on direct bookings.
            </p>
          </motion.div>

          {/* Trust Highlights Strip */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-stone-200/70 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-stone-600 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% MahaRERA Audited</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#a01115] shrink-0" />
              <span>0% Brokerage Direct Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600 shrink-0" />
              <span>1,250+ Thane Families Settled</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>12+ Years Local Mastery</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: COMPANY OVERVIEW (SPLIT LAYOUT - MIRRORING XPROPERTY REFERENCE) */}
        <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Visual Collage */}
            <div className="lg:col-span-6 relative">
              {/* Primary Landmark Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-stone-100">
                <Image
                  src="/images/luxury-modern-villa.jpg"
                  alt="Brick and Beam Realty Thane Luxury Portfolio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Bottom Title */}
                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold font-mono">
                    Thane West Luxury Corridors
                  </span>
                  <h3 className="text-lg font-bold drop-shadow-sm">
                    Pokhran Rd • Majiwada • Ghodbunder Rd
                  </h3>
                </div>
              </div>

              {/* Overlapping Floating Trust Badge */}
              <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:right-6 bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xl max-w-[240px] sm:max-w-[270px]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#a01115]/10 border border-[#a01115]/20 text-[#a01115] flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                      12+ Years
                    </div>
                    <div className="text-xs text-stone-500 font-medium">
                      Of Trusted Real Estate Advisory in Thane
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>₹550+ Cr Transacted Volume</span>
                </div>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
                <Compass className="w-3.5 h-3.5 text-[#a01115]" />
                <span>Our Philosophy &amp; Mission</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-serif font-normal text-stone-900 tracking-tight leading-[1.2]">
                Guiding Your Property Journey With <br />
                <span className="italic text-[#a01115] font-serif">Honesty, Rigor &amp; Zero Brokerage</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                At Brick &amp; Beam Realty, we believe finding a home in Thane should never feel like a high-pressure sales pitch. Unlike traditional brokers who push developer-sponsored inventory, we operate as independent buyer advocates.
              </p>

              <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Every residential community, luxury tower, and commercial suite in our portfolio undergoes exhaustive MahaRERA scrutiny, structural carpet efficiency checks, and builder credibility assessments. You receive direct developer pricing with zero brokerage and total peace of mind.
              </p>

              {/* 4 Core Value Checkpoints */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-900">100% Title Due-Diligence</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Rigorous legal &amp; RERA verification</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-900">0% Brokerage Guarantee</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Zero fees on direct builder bookings</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-900">Prime Micro-Markets</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Majiwada, Pokhran, Kolshet &amp; more</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-900">Private Site Tours</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Complimentary chauffeur cab pickup</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/#properties"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#a01115] hover:bg-[#850e11] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                >
                  <span>See Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-sm sm:text-base font-semibold shadow-xs hover:border-stone-400 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-[#a01115]" />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE PILLARS & SERVICES (MATCHING THE 3 CARDS IN REFERENCE) */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#a01115]" />
              <span>What We Do</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
              Comprehensive Real Estate <br />
              <span className="italic text-[#a01115] font-serif">Services in Thane</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Whether you are buying your family’s forever home, acquiring commercial suites, or seeking high-yield capital appreciation, we provide end-to-end guidance.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 1: Buy A Home */}
            <div className="group p-8 rounded-3xl bg-white border border-stone-200/80 hover:border-[#a01115]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#a01115]/10 border border-[#a01115]/20 text-[#a01115] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2.5">Buy A Home</h3>

              <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-1 font-normal">
                Find your perfect home with ease. Explore verified 1, 2, 3 &amp; 4 BHK residences and luxury penthouses across prime Thane corridors that match your lifestyle and budget, with 100% zero brokerage.
              </p>

              <div className="space-y-2 pt-4 border-t border-stone-100 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct Builder Price Negotiation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Floor Plan &amp; Carpet Due Diligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero Brokerage on Direct Bookings</span>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <Link
                  href="/#properties"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a01115] hover:text-[#850e11] group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Residential Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Commercial & Retail */}
            <div className="group p-8 rounded-3xl bg-white border border-stone-200/80 hover:border-[#a01115]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2.5">Commercial &amp; Retail</h3>

              <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-1 font-normal">
                Discover high-yield commercial investments, boutique corporate offices, and Grade-A retail spaces in Wagle Estate, Thane West, and upcoming transit hubs tailored for maximum ROI.
              </p>

              <div className="space-y-2 pt-4 border-t border-stone-100 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>7% – 10% High Rental Yields</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Prime Wagle Estate &amp; Metro Hubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Institutional Lease Structuring</span>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Inquire Commercial Inventory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar 3: Strategic Due-Diligence & Resale */}
            <div className="group p-8 rounded-3xl bg-white border border-stone-200/80 hover:border-[#a01115]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2.5">Strategic Advisory &amp; Resale</h3>

              <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-1 font-normal">
                Sell or restructure your property portfolio with ease. Receive unbiased market valuations, capital appreciation modeling, and access to a verified network of pre-qualified buyers.
              </p>

              <div className="space-y-2 pt-4 border-t border-stone-100 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Infrastructure Catalyst Mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Fast, Transparent Buyer Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Complete Legal Conveyance &amp; Handover</span>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 hover:text-sky-900 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Request Portfolio Valuation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: IMPACT NUMBERS & STATS */}
        <section className="relative py-14 bg-gradient-to-r from-stone-900 via-zinc-900 to-stone-950 text-white">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-4 md:pt-0 px-4">
                <div className="text-3xl sm:text-5xl font-bold text-white tracking-tight">1,250+</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">Families Settled in Thane</div>
              </div>
              <div className="pt-4 md:pt-0 px-4">
                <div className="text-3xl sm:text-5xl font-bold text-amber-300 tracking-tight">45+</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">Tier-1 Developer Tie-ups</div>
              </div>
              <div className="pt-4 md:pt-0 px-4">
                <div className="text-3xl sm:text-5xl font-bold text-white tracking-tight">100%</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">MahaRERA Registered Projects</div>
              </div>
              <div className="pt-4 md:pt-0 px-4">
                <div className="text-3xl sm:text-5xl font-bold text-emerald-400 tracking-tight">₹0</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">Brokerage on Direct Bookings</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: MEET OUR ADVISORY TEAM (MATCHING REFERENCE AGENTS SECTION) */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-semibold tracking-wider uppercase mb-3">
              <Users className="w-3.5 h-3.5 text-[#a01115]" />
              <span>Expert Leadership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
              Meet Our Senior <span className="italic text-[#a01115] font-serif">Property Advisors</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Our registered advisors deliver unbiased market intelligence, architectural diligence, and personalized service for a smooth real estate experience.
            </p>
          </div>

          {/* 4 Advisors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-[#a01115]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Advisor Photo */}
                <div className="relative aspect-[4/4.2] overflow-hidden bg-stone-100">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Specialty Tag overlay */}
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-medium text-amber-200">
                      {member.specialization}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex flex-col flex-1 text-left">
                  <h3 className="font-bold text-lg text-stone-900 leading-snug group-hover:text-[#a01115] transition-colors">
                    {member.name}
                  </h3>

                  <div className="text-xs font-semibold text-[#a01115] uppercase tracking-wider mt-0.5 mb-2.5">
                    {member.role}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {member.bio}
                  </p>

                  {/* Contact Details & Action */}
                  <div className="mt-auto pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 hover:text-[#a01115] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{member.phone}</span>
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 hover:text-[#a01115] transition-colors truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  </div>

                  {/* 1-on-1 Consultation trigger */}
                  <button
                    type="button"
                    onClick={openModal}
                    className="mt-4 w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-[#a01115] text-stone-800 hover:text-white font-semibold text-xs tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Schedule 1-on-1 Session</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: CLIENT REVIEWS & SUCCESS STORIES (MATCHING REFERENCE TESTIMONIALS) */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Verified Homebuyer Reviews</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
              What Our Clients Say <br />
              <span className="italic text-[#a01115] font-serif">About Their Experience</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Discover how Thane families and property investors achieved their goals through smooth, zero-brokerage advisory.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col text-left relative"
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  {/* 5 Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-200 shrink-0" />
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mb-6 flex-1 italic font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{t.clientName}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{t.clientRole}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-[10px] font-mono font-semibold text-stone-700">
                    Verified
                  </span>
                </div>
              </div>
            ))}
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
