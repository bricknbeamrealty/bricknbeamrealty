"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Eye,
  Sparkles,
  Ruler,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

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

export default function FeaturedProperties() {
  const { openModal } = useConsultationModal();

  return (
    <div className="w-full">
      {/* 3-Column Properties Grid matching the exact live PM Properties reference card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {PROPERTIES.map((property) => (
          <div
            key={property.id}
            role="button"
            tabIndex={0}
            onClick={openModal}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal();
              }
            }}
            aria-label={`View details for ${property.title}`}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#a01115]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#a01115]/40"
          >
            {/* Top Media: 16/9 aspect ratio for compact sleek height */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              <Image
                src={property.image}
                alt={`${property.title} - ${property.bhks.join(", ")} by ${property.developer} in ${property.subLocation}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Gradient scrim at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating top badges */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-[#a01115] text-white shadow-sm">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>0% Brokerage</span>
                  </span>

                  {property.isFeatured && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[11px] bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
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
                <div className="flex items-center gap-1 text-[11px] text-white/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate drop-shadow-sm font-mono tracking-tight">
                    RERA: {property.rera}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content Body: Compact padding & streamlined vertical spacing */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
              {/* Developer & Location Row */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-xs uppercase tracking-[0.05em] text-[#a01115]">
                  {property.developer}
                </span>
                <div className="flex items-center gap-1 font-medium text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Project Title */}
              <h3 className="font-bold text-lg sm:text-[19px] text-slate-900 mb-0.5 leading-[1.2] tracking-[-0.02em] group-hover:text-[#a01115] transition-colors">
                {property.title}
              </h3>

              {/* Sub-Location */}
              <p className="font-normal text-xs text-slate-500 line-clamp-1 mb-2.5 leading-normal">
                {property.subLocation}
              </p>

              {/* Area & Possession Spec Box */}
              <div className="grid grid-cols-[1fr_1.35fr] gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 mb-3 text-xs text-slate-600 overflow-hidden">
                <div className="flex items-start gap-1.5 min-w-0">
                  <Ruler className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold leading-none mb-0.5">
                      Area
                    </span>
                    <span className="font-semibold text-xs text-slate-800 leading-snug break-words">
                      {property.area}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 min-w-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold leading-none mb-0.5">
                      Possession
                    </span>
                    <span className="font-semibold text-xs text-slate-800 leading-snug break-words">
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
                    className="font-medium text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                  >
                    {bhk}
                  </span>
                ))}
              </div>

              {/* Pricing & Details Action */}
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="block font-bold text-[10px] uppercase tracking-[0.05em] text-slate-400">
                    Pricing
                  </span>
                  <div className="font-normal text-lg sm:text-xl text-slate-900 leading-tight">
                    {property.pricing}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-semibold text-xs leading-none text-white bg-[#a01115] hover:bg-[#850e11] active:bg-[#6b0b0e] rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
                    title="Quick Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
