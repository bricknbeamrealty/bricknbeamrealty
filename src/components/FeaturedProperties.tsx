"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Eye,
  Sparkles,
  Ruler,
  ArrowUpRight,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import { StaggerGrid, FadeInCard, FadeInSection } from "@/components/ui/AnimatedSection";

export interface PropertyItem {
  id: string;
  developer: string;
  location: string;
  title: string;
  subLocation: string;
  area: string;
  possession: string;
  bhks: string[];
  pricing: string;
  rera: string;
  status: "Under Construction" | "Ready to Move";
  isFeatured?: boolean;
  image: string;
}

const PROPERTIES: PropertyItem[] = [
  {
    id: "raymond-ten-x-era",
    developer: "Raymond Realty",
    location: "Thane West",
    title: "Raymond Ten X Era",
    subLocation: "Pokhran Road 1 • Near Viviana Mall, Thane West",
    area: "580 - 1150 sq.ft.",
    possession: "Dec-2028",
    bhks: ["2 BHK", "3 BHK"],
    pricing: "₹1.35 Cr - ₹2.55 Cr",
    rera: "P51700049533",
    status: "Under Construction",
    isFeatured: true,
    image: "/images/properties/raymond-ten-x-thane.webp",
  },
  {
    id: "godrej-ascend",
    developer: "Godrej Properties",
    location: "Thane West",
    title: "Godrej Ascend",
    subLocation: "Kolshet Road • Prime IT Corridor, Thane West",
    area: "420 - 950 sq.ft.",
    possession: "Dec-2027",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    pricing: "₹79 Lakhs - ₹1.85 Cr",
    rera: "P51700034608",
    status: "Under Construction",
    isFeatured: true,
    image: "/images/properties/godrej-ascend-thane.webp",
  },
  {
    id: "rustomjee-uptown-urbania",
    developer: "Rustomjee Group",
    location: "Thane West",
    title: "Rustomjee Uptown Urbania",
    subLocation: "Majiwada Junction • Eastern Express Highway, Thane West",
    area: "680 - 1280 sq.ft.",
    possession: "Immediate Possession",
    bhks: ["2 BHK", "3 BHK"],
    pricing: "₹1.25 Cr - ₹2.40 Cr",
    rera: "P51700050811",
    status: "Ready to Move",
    isFeatured: false,
    image: "/images/properties/rustomjee-urbania-thane.webp",
  },
];

function FeaturedCardItem({
  property,
  index,
  openModal,
}: {
  property: PropertyItem;
  index: number;
  openModal: (property?: PropertyItem) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <FadeInCard key={property.id} yOffset={24}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => openModal(property)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(property);
          }
        }}
        aria-label={`View details for ${property.title} by ${property.developer}`}
        className="group w-full h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#a01115]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#a01115]/40"
      >
        {/* Top Media: 16/9 aspect ratio with shimmer skeleton loader */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          {/* Shimmer skeleton while image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton-shimmer z-0" />
          )}

          <Image
            src={property.image}
            alt={`${property.title} - ${property.bhks.join(", ")} by ${property.developer} in ${property.subLocation}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-102"
            }`}
            priority={index < 2}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient scrim at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent pointer-events-none" />

          {/* Floating top badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-[#a01115] text-white shadow-sm">
                <Sparkles className="w-3 h-3 text-white" />
                <span>0% Brokerage</span>
              </span>

              {property.isFeatured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[11px] bg-white/95 backdrop-blur-md text-slate-800 shadow-sm">
                  Featured
                </span>
              )}
            </div>

            {/* Status Badge */}
            {property.status === "Ready to Move" ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-[11px] border backdrop-blur-md bg-white/95 shadow-sm bg-emerald-50 text-emerald-700 border-emerald-200">
                Ready to Move
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-[11px] border backdrop-blur-md bg-white/95 shadow-sm bg-amber-50 text-amber-700 border-amber-200">
                Under Construction
              </span>
            )}
          </div>

          {/* Bottom RERA info */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-white flex items-end justify-between pointer-events-none">
            <div className="flex items-center gap-1 text-[11px] text-white/95 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate drop-shadow-sm font-mono tracking-tight">
                RERA: {property.rera}
              </span>
            </div>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          {/* Developer & Location Row */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold font-sans text-xs uppercase tracking-[0.05em] text-[#a01115]">
              {property.developer}
            </span>
            <div className="flex items-center gap-1 font-medium font-sans text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Project Title */}
          <h3 className="font-semibold font-sans text-lg sm:text-[19px] text-slate-900 mb-0.5 leading-[1.2] tracking-[-0.02em] group-hover:text-[#a01115] transition-colors">
            {property.title}
          </h3>

          {/* Sub-Location */}
          <p className="font-normal font-sans text-xs text-slate-500 line-clamp-1 mb-2.5 leading-normal">
            {property.subLocation}
          </p>

          {/* Area & Possession Spec Box */}
          <div className="grid grid-cols-[1fr_1.35fr] gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 mb-3 text-xs text-slate-600 overflow-hidden">
            <div className="flex items-start gap-1.5 min-w-0">
              <Ruler className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-sans text-slate-400 uppercase font-semibold leading-none mb-0.5">
                  Area
                </span>
                <span className="font-semibold font-sans text-xs text-slate-800 leading-snug break-words">
                  {property.area}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-1.5 min-w-0">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-sans text-slate-400 uppercase font-semibold leading-none mb-0.5">
                  Possession
                </span>
                <span className="font-semibold font-sans text-xs text-slate-800 leading-snug break-words">
                  {property.possession}
                </span>
              </div>
            </div>
          </div>

          {/* BHK Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {property.bhks.map((bhk) => (
              <span
                key={bhk}
                className="font-medium font-sans text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
              >
                {bhk}
              </span>
            ))}
          </div>

          {/* Pricing & Details Action */}
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span className="block font-semibold font-sans text-[10px] uppercase tracking-[0.05em] text-slate-400">
                Pricing
              </span>
              <div className="font-semibold font-sans text-lg sm:text-xl text-slate-900 leading-tight">
                {property.pricing}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(property);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-semibold font-sans text-xs leading-none text-white bg-[#a01115] hover:bg-[#850e11] active:bg-[#6b0b0e] rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
                title="Quick Details"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FadeInCard>
  );
}

export default function FeaturedProperties() {
  const { openModal } = useConsultationModal();
  const [propertiesList, setPropertiesList] = useState<PropertyItem[]>(PROPERTIES);

  useEffect(() => {
    let isMounted = true;
    async function fetchLiveProperties() {
      try {
        const res = await fetch("/api/properties?featured=true");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.properties) && data.properties.length > 0) {
          if (!isMounted) return;
          const mapped: PropertyItem[] = data.properties.map((p: Record<string, unknown>) => {
            const rawBhks = Array.isArray(p.bhks) && p.bhks.length > 0
              ? (p.bhks as string[])
              : Array.isArray(p.bhk) && p.bhk.length > 0
              ? (p.bhk as string[])
              : [String(p.bhks || p.bhk || "2 BHK")];

            return {
              id: String(p.id || p.slug || "prop"),
              developer: String(p.developer || "Developer"),
              location: String(p.location || "Thane West"),
              title: String(p.title || "Untitled Property"),
              subLocation: String(p.subLocation || p.sub_location || p.location || "Thane West"),
              area: String(p.area || p.carpet_area || "Contact for area"),
              possession: String(p.possession || "2028"),
              bhks: rawBhks,
              pricing: String(p.pricing || p.price_range || p.priceStartingFrom || p.starting_price || "Price on Request"),
              rera: String(p.rera || p.rera_number || "Applied"),
              status: (p.status === "Ready to Move" ? "Ready to Move" : "Under Construction") as "Ready to Move" | "Under Construction",
              isFeatured: Boolean(p.isFeatured ?? p.is_featured),
              image: String(p.image || "/images/properties/raymond-ten-x-thane.webp"),
            };
          });
          setPropertiesList(mapped);
        }
      } catch {
        // Fallback silently to static PROPERTIES
      }
    }
    fetchLiveProperties();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      {/* Staggered Properties Grid with Skeleton Image Loading */}
      <StaggerGrid
        id="featured-properties-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        staggerDelay={0.12}
      >
        {propertiesList.map((property, index) => (
          <FeaturedCardItem
            key={property.id}
            property={property}
            index={index}
            openModal={openModal}
          />
        ))}
      </StaggerGrid>

      {/* Premium 'Explore More Properties' Navigation Button */}
      <FadeInSection delay={0.25} direction="up" className="mt-10 sm:mt-12 flex justify-center">
        <div className="relative group">
          {/* Subtle Ambient Crimson Glow blooming behind button on hover */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#a01115]/40 via-rose-500/35 to-[#a01115]/40 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none -z-10"
          />

          <Link
            href="/properties"
            className="relative inline-flex items-center gap-3.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#a01115] via-[#b51419] to-[#8d0d10] text-white font-semibold text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(160,17,21,0.35),0_8px_10px_-6px_rgba(160,17,21,0.2)] hover:shadow-[0_18px_38px_-5px_rgba(160,17,21,0.5),0_10px_16px_-6px_rgba(160,17,21,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden select-none focus:outline-none focus:ring-2 focus:ring-[#a01115]/50 focus:ring-offset-2"
          >
            {/* Specular Light-Sweep Sheen */}
            <span
              aria-hidden="true"
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out pointer-events-none"
            />

            {/* Subtle top edge specular reflection line */}
            <span
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
            />

            <span className="relative z-10 tracking-[0.01em]">
              Explore More Properties
            </span>

            {/* Circular Micro-Action Icon Pill */}
            <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-[#a01115] transition-all duration-300 shadow-sm">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </FadeInSection>
    </div>
  );
}
