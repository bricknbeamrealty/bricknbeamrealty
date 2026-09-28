"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  ArrowUpRight,
  Sparkles,
  Building2,
  Compass,
  Layers,
  DraftingCompass,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const properties = [
    {
      id: "villas",
      category: "villas",
      title: "Villa Solarium",
      location: "Bellagio, Lake Como",
      type: "Cantilevered Estate",
      sqft: "12,400 sq.ft",
      status: "Under Construction",
      imageGrad: "from-amber-950/40 via-zinc-900 to-zinc-950",
      accent: "text-amber-400",
    },
    {
      id: "penthouses",
      category: "penthouses",
      title: "The Vertex Sky Penthouse",
      location: "Financial District, Singapore",
      type: "Triplex Monolith",
      sqft: "8,950 sq.ft",
      status: "Completed 2025",
      imageGrad: "from-zinc-800/50 via-zinc-900 to-zinc-950",
      accent: "text-amber-300",
    },
    {
      id: "commercial",
      category: "commercial",
      title: "Aether Tower & Pavilions",
      location: "KAFD, Riyadh",
      type: "LEED Platinum Commercial",
      sqft: "84,000 sq.ft",
      status: "Engineering Phase",
      imageGrad: "from-[#af7953]/30 via-zinc-900 to-zinc-950",
      accent: "text-[#d89f76]",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Vision & Site Topography",
      description: "LiDAR terrestrial scans, solar envelope modeling, and structural zoning feasibility studies.",
    },
    {
      step: "02",
      title: "Computational Architecture",
      description: "Parametric geometry formulation, acoustic simulation, and finite-element structural stress testing.",
    },
    {
      step: "03",
      title: "Bespoke Material Engineering",
      description: "Custom pre-cast concrete mix designs, low-iron structural glazing, and thermal timber integration.",
    },
    {
      step: "04",
      title: "Precision Execution",
      description: "On-site millimeter-tolerance engineering governance from foundation pouring to final turnkey commissioning.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950 overflow-x-hidden font-sans scroll-smooth">
      {/* Dynamic Warm Ambient Architectural Lighting (Smooth, streak-free surface) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#af7953]/20 via-zinc-900/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950" />
      </div>

      {/* Floating Pill Glassmorphic Navbar */}
      <Navbar />

      {/* SECTION 1: HERO */}
      <section id="home" className="relative z-10 pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-zinc-200">
              Architectural & Structural Engineering
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-center max-w-4xl mx-auto space-y-5"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight">
            Where Vision Meets{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-[#c89065] bg-clip-text text-transparent">
              Precision
            </span>{" "}
            Engineering.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300/80 max-w-2xl mx-auto leading-relaxed">
            Elevating modern living spaces and commercial monoliths through meticulous structural design, bespoke materials, and pioneering sustainable engineering.
          </p>
        </motion.div>

        {/* Hero Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: "$1.4B+", label: "Portfolio Delivered" },
            { value: "48 Awards", label: "International Design" },
            { value: "100%", label: "Structural Compliance" },
            { value: "0 Carbon", label: "Target Ready" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">{stat.value}</div>
              <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2: PROPERTIES */}
      <section id="properties" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Featured Architectural <span className="font-serif italic text-amber-200">Properties</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Each commission reflects bespoke structural calculation, micro-climate integration, and timeless materiality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative rounded-3xl border border-white/15 bg-zinc-900/60 p-6 backdrop-blur-xl hover:border-white/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${property.imageGrad} opacity-30 group-hover:opacity-50 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>{property.type}</span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-zinc-300 border border-white/10">
                    {property.status}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {property.title}
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div className="relative z-10 mt-12 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">{property.sqft}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <DraftingCompass className="w-3.5 h-3.5" />
            <span>Comprehensive Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Integrated Architectural & <span className="font-serif italic text-amber-200">Engineering Services</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            From concept drafting to computational load optimization, we operate at the vanguard of modern structural engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: DraftingCompass,
              title: "Architectural & Spatial",
              desc: "Parametric blueprints, bioclimatic orientation, and photorealistic 3D visualization.",
            },
            {
              icon: Compass,
              title: "Structural Engineering",
              desc: "Deep pile foundations, reinforced post-tensioned slabs, and seismic damping solutions.",
            },
            {
              icon: Layers,
              title: "Interior Architecture",
              desc: "Harmonizing natural stone, acoustic acoustic wood slating, and architectural illumination.",
            },
            {
              icon: Sparkles,
              title: "Sustainable Monoliths",
              desc: "Net-zero energy balancing, thermal envelope maximization, and LEED Platinum certification.",
            },
          ].map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200"
              >
                <div className="h-10 w-10 rounded-2xl bg-[#af7953]/20 border border-[#af7953]/40 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-white">{service.title}</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: HOW WE WORK */}
      <section id="how-we-work" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Process & Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            How We <span className="font-serif italic text-amber-200">Work</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Our disciplined four-phase delivery framework guarantees millimeter tolerance and on-schedule realization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md"
            >
              <div className="text-3xl font-mono font-bold text-amber-500/40 mb-3">{step.step}</div>
              <h4 className="text-base font-semibold text-white">{step.title}</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: ABOUT US */}
      <section id="about-us" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-3xl border border-white/15 bg-zinc-900/40 p-8 sm:p-12 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legacy & Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              About <span className="font-serif italic text-amber-200">Brick & Beams</span>
            </h2>
            <p className="text-sm text-zinc-300/80 mt-4 leading-relaxed">
              Founded on the belief that enduring structures demand a union of mathematical rigor and sculptural beauty, Brick & Beams operates as a hybrid studio of registered architects, structural engineers, and parametric computational designers.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Licensed Structural Masters
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Global Regulatory Accreditation
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 font-mono text-xs text-zinc-300 space-y-3">
            <div className="text-amber-400 font-semibold uppercase tracking-wider text-[11px]">Studio Fact Sheet</div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Established</span>
              <span className="text-white">2014</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Principal Partners</span>
              <span className="text-white">Milan • London • Zurich</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Structural Software</span>
              <span className="text-white">Grasshopper, ETABS, Revit BIM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Specialization</span>
              <span className="text-white">High-Stakes Cantilever & High-Rise</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT US */}
      <section id="contact-us" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Our Principals</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Initiate Your <span className="font-serif italic text-amber-200">Architectural Dialogue</span>
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Ready to break ground or engineer a landmark? Our senior partners are available for confidential consultations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Main Studio</div>
            <div className="text-xs text-zinc-400 mt-1">45 Boulevard Haussmann, Paris / Milan</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <Phone className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Direct Line</div>
            <div className="text-xs text-zinc-400 mt-1">+1 (800) 849-2742</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <Mail className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Email Advisory</div>
            <div className="text-xs text-zinc-400 mt-1">inquiry@bricknbeams.com</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4 text-center text-xs text-zinc-500">
        <p>© 2026 Brick & Beams Architectural & Structural Engineering. All rights reserved.</p>
      </footer>
    </div>
  );
}
