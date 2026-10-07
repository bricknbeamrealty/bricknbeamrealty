"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Building2,
} from "lucide-react";

export interface PropertiesFilterState {
  searchQuery: string;
  propertyType: string;
  location: string;
  bhk: string;
  budget: string;
  status: string;
}

interface PropertiesHeroProps {
  filters: PropertiesFilterState;
  onFilterChange: (key: keyof PropertiesFilterState, value: string) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function PropertiesHero({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
  filteredCount,
}: PropertiesHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const handleScrollToGrid = () => {
    const gridEl = document.getElementById("properties-listing-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isAnyFilterActive =
    filters.searchQuery !== "" ||
    filters.location !== "all" ||
    filters.bhk !== "all" ||
    filters.budget !== "all" ||
    filters.status !== "all";

  return (
    <header className="relative w-full overflow-hidden bg-zinc-950 text-white pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-20">
      {/* Background Architectural Canvas & Dynamic Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/hero-thane-skyline.jpg"
          alt="Thane Real Estate Skyline - Brick and Beam Realty"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.45] saturate-[0.85] scale-[1.02]"
        />

        {/* Multi-tier gradient scrim for pristine WCAG AAA legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent" />

        {/* Ambient Brand Glow Spotlights */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[350px] bg-[#a01115]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />

        {/* Subtle Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Soft bottom blend to page body */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#faf8f5] to-transparent" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Row 1: Breadcrumb Navigation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2.5 sm:gap-3 mb-6"
          >
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-xs sm:text-sm text-zinc-300 transition-colors"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-zinc-400" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-zinc-500" />
              <span className="text-amber-300 font-medium">Properties</span>
            </nav>
          </motion.div>

          {/* Row 2: Simple & Authoritative Heading */}
          <motion.div variants={itemVariants} className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.14]">
              Find Your Ideal Property <br className="hidden sm:inline" />
              <span className="italic text-amber-200/90 font-serif">
                in Thane
              </span>
            </h1>

            {/* Row 3: Simple & Clear Subheading */}
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl font-normal font-sans leading-relaxed">
              Explore verified flats, luxury high-rises, and gated communities
              across Thane’s prime locations with complete transparency and zero
              brokerage.
            </p>
          </motion.div>

          {/* Row 4: Interactive Search & Quick-Filter Dock (Senior Engineer Architecture) */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-8 sm:mt-10 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              {/* Filter 1: Free Text Search (Project Name or Developer) */}
              <div className="lg:col-span-3 relative">
                <label htmlFor="search-input" className="sr-only">
                  Search properties by name or developer
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="search-input"
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      onFilterChange("searchQuery", e.target.value)
                    }
                    placeholder="Search by project or builder..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border border-white/15 text-white placeholder-zinc-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a01115] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Filter 2: Property Type (Residential, Commercial, Industrial) */}
              <div className="lg:col-span-3 relative">
                <label htmlFor="property-type-select" className="sr-only">
                  Property Type
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="property-type-select"
                    value={filters.propertyType}
                    onChange={(e) =>
                      onFilterChange("propertyType", e.target.value)
                    }
                    className="w-full pl-10 pr-8 py-3 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a01115] focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Property Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-zinc-400 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Filter 3: Prime Location / Corridor */}
              <div className="lg:col-span-2 relative">
                <label htmlFor="location-select" className="sr-only">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="location-select"
                    value={filters.location}
                    onChange={(e) =>
                      onFilterChange("location", e.target.value)
                    }
                    className="w-full pl-10 pr-8 py-3 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a01115] focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Locations</option>
                    <option value="pokhran">Pokhran Road</option>
                    <option value="kolshet">Kolshet Road</option>
                    <option value="majiwada">Majiwada Junction</option>
                    <option value="ghodbunder">Ghodbunder Road</option>
                    <option value="wagle">Wagle Estate</option>
                    <option value="extension">Thane Extension</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-zinc-400 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Filter 4: BHK Configuration */}
              <div className="lg:col-span-2 relative">
                <label htmlFor="bhk-select" className="sr-only">
                  BHK Configuration
                </label>
                <div className="relative">
                  <select
                    id="bhk-select"
                    value={filters.bhk}
                    onChange={(e) => onFilterChange("bhk", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a01115] focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Any BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-zinc-400 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Filter 5: Budget */}
              <div className="lg:col-span-2 relative">
                <label htmlFor="budget-select" className="sr-only">
                  Budget
                </label>
                <div className="relative">
                  <select
                    id="budget-select"
                    value={filters.budget}
                    onChange={(e) =>
                      onFilterChange("budget", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/15 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a01115] focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Any Budget</option>
                    <option value="under-1cr">Under ₹1.0 Cr</option>
                    <option value="1cr-1.5cr">₹1.0 Cr - ₹1.5 Cr</option>
                    <option value="above-1.5cr">Above ₹1.5 Cr</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-zinc-400 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filter Status & Reset */}
            {isAnyFilterActive && (
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
                <span>
                  Filter applied:{" "}
                  <strong className="text-white font-medium">
                    {filteredCount}
                  </strong>{" "}
                  matching {filteredCount === 1 ? "property" : "properties"}
                </span>
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="inline-flex items-center gap-1.5 text-rose-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
