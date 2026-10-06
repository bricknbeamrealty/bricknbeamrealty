"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PropertiesHero, {
  PropertiesFilterState,
} from "@/components/properties/PropertiesHero";
import { PROPERTIES, Property } from "@/data/properties";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Sparkles,
  Ruler,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Phone,
  Building,
  RotateCcw,
  Layers,
  ChevronDown,
} from "lucide-react";

export default function PropertiesClientView() {
  const { openModal } = useConsultationModal();

  // Initial Filter State
  const initialFilterState: PropertiesFilterState = {
    searchQuery: "",
    propertyType: "all",
    location: "all",
    bhk: "all",
    budget: "all",
    status: "all",
  };

  const [filters, setFilters] = useState<PropertiesFilterState>(initialFilterState);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "possession">("featured");

  const handleFilterChange = (key: keyof PropertiesFilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  // Filter and Sort Engine
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // 0. Property Type Filter (Residential, Commercial, Industrial)
      if (filters.propertyType !== "all") {
        if (property.propertyType !== filters.propertyType) return false;
      }

      // 1. Text Search (Project Title or Developer)
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesDev = property.developer.toLowerCase().includes(query);
        const matchesLoc = property.subLocation.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDev && !matchesLoc) return false;
      }

      // 2. Micro-Market Location Filter
      if (filters.location !== "all") {
        const locMap: Record<string, string[]> = {
          pokhran: ["pokhran"],
          kolshet: ["kolshet"],
          majiwada: ["majiwada"],
          ghodbunder: ["ghodbunder"],
          wagle: ["wagle"],
          extension: ["extension", "dombivli"],
        };

        const targetKeywords = locMap[filters.location] || [filters.location];
        const matchFound = targetKeywords.some(
          (k) =>
            property.subLocation.toLowerCase().includes(k) ||
            property.location.toLowerCase().includes(k)
        );
        if (!matchFound) return false;
      }

      // 3. BHK Configuration Filter
      if (filters.bhk !== "all") {
        const bhkNum = parseInt(filters.bhk, 10);
        if (!property.bhkNumeric.includes(bhkNum)) return false;
      }

      // 4. Budget Range Filter (in Lakhs)
      if (filters.budget !== "all") {
        if (filters.budget === "under-1cr" && property.priceNumeric >= 100) return false;
        if (filters.budget === "1cr-1.5cr" && (property.priceNumeric < 100 || property.priceNumeric > 150)) return false;
        if (filters.budget === "above-1.5cr" && property.priceNumeric <= 150) return false;
      }

      // 5. Possession Status Filter
      if (filters.status !== "all") {
        if (property.status !== filters.status) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceNumeric - b.priceNumeric;
      if (sortBy === "price-desc") return b.priceNumeric - a.priceNumeric;
      if (sortBy === "possession") return a.possessionYear - b.possessionYear;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters, sortBy]);

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white font-sans scroll-smooth">
      {/* Warm Ambient Architectural Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#af7953]/10 via-amber-500/5 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating Pill Glassmorphic Navbar */}
      <Navbar />

      {/* Properties Hero Section */}
      <PropertiesHero
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalCount={PROPERTIES.length}
        filteredCount={filteredProperties.length}
      />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Results Bar: Filter Summary & Sorting Controls */}
        <div
          id="properties-listing-grid"
          className="scroll-mt-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200/80"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 tracking-tight">
              Verified Properties in Thane
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Showing{" "}
              <span className="font-semibold text-stone-900">
                {filteredProperties.length}
              </span>{" "}
              of {PROPERTIES.length} developer-direct listings
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "featured" | "price-asc" | "price-desc" | "possession"
                  )
                }
                className="pl-3 pr-8 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#a01115]/30 cursor-pointer appearance-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="possession">Possession Timeline</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property, idx) => (
              <article
                key={property.id}
                className="group bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-[#a01115]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden select-none"
              >
                {/* Property Image & Badges Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={property.image}
                    alt={`${property.title} by ${property.developer} in ${property.subLocation}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={idx < 3}
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-[#a01115] text-white shadow-sm">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span>0% Brokerage</span>
                      </span>

                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[11px] bg-stone-900/85 backdrop-blur-md text-white shadow-sm capitalize">
                        {property.propertyType}
                      </span>

                      {property.isFeatured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[11px] bg-white/95 backdrop-blur-md text-stone-800 shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Status Badge */}
                    {property.status === "Ready to Move" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-[11px] backdrop-blur-md bg-emerald-50/95 text-emerald-800 border border-emerald-200 shadow-sm">
                        Ready to Move
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-[11px] backdrop-blur-md bg-amber-50/95 text-amber-800 border border-amber-200 shadow-sm">
                        Under Construction
                      </span>
                    )}
                  </div>

                  {/* Bottom RERA Bar on Image */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white text-xs pointer-events-none">
                    <div className="flex items-center gap-1 font-mono text-[11px] drop-shadow-sm text-zinc-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>RERA: {property.rera}</span>
                    </div>
                    <span className="text-[11px] text-zinc-300 font-medium">
                      Possession: {property.possession}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Developer Name & Micro-location */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-semibold font-sans text-xs uppercase tracking-wider text-[#a01115]">
                      {property.developer}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-stone-500 font-medium font-sans truncate">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-sans text-xl font-semibold text-stone-900 group-hover:text-[#a01115] transition-colors leading-tight mb-1">
                    {property.title}
                  </h3>

                  {/* Sub-location Address */}
                  <p className="text-xs text-stone-500 font-normal font-sans line-clamp-1 mb-3">
                    {property.subLocation}
                  </p>

                  {/* Specs Matrix Strip */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 mb-3 text-xs">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-semibold block">
                        Typology
                      </span>
                      <span className="font-semibold text-stone-800">
                        {property.bhks.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-semibold block">
                        Carpet Area
                      </span>
                      <span className="font-semibold text-stone-800 truncate block">
                        {property.area}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet */}
                  <div className="space-y-1 mb-4 flex-1">
                    {property.keyHighlights.slice(0, 2).map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-1.5 text-xs text-stone-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="text-[10px] font-semibold font-sans text-stone-400 uppercase tracking-wider block">
                        Starting From
                      </span>
                      <span className="font-semibold font-sans text-base sm:text-lg text-stone-900 leading-tight">
                        {property.priceStartingFrom}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={openModal}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold font-sans transition-all shadow-sm shadow-[#a01115]/20 cursor-pointer"
                    >
                      <span>Enquire Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-[#a01115] flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-stone-900 mb-1">
              No matching properties found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-normal font-sans mb-6">
              We couldn’t find properties matching your current filter criteria.
              Try adjusting your filters or resetting to view all Thane inventory.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a01115] text-white text-xs sm:text-sm font-semibold font-sans hover:bg-[#850e11] transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Final Call to Action */}
      <FinalCTA />

      {/* Official Footer */}
      <Footer />
    </div>
  );
}
