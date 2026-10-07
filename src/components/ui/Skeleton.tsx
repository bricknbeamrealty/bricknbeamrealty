"use client";

import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rect" | "circle" | "pill" | "text";
}

/**
 * Base Shimmer Skeleton Element with luxury architectural tone
 */
export function Skeleton({
  className = "",
  variant = "rect",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rect: "rounded-xl",
    circle: "rounded-full",
    pill: "rounded-full",
    text: "rounded-md h-4",
  };

  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}

/**
 * Premium Luxury Property Card Skeleton
 * Accurately replicates the dimensions and layout of the real property card
 */
export function PropertyCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="w-full bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col overflow-hidden animate-pulse-subtle select-none"
    >
      {/* 16:9 Media Aspect ratio placeholder */}
      <div className="relative aspect-[16/9] w-full skeleton-shimmer">
        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <div className="w-24 h-5 rounded-full bg-white/70 backdrop-blur-xs" />
            <div className="w-16 h-5 rounded-full bg-white/50 backdrop-blur-xs hidden sm:block" />
          </div>
          <div className="w-24 h-5 rounded-full bg-white/70 backdrop-blur-xs" />
        </div>

        {/* Bottom RERA bar */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          <div className="w-28 h-3.5 rounded bg-white/60" />
          <div className="w-20 h-3.5 rounded bg-white/60" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Developer & Location Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="w-24 h-3.5 rounded bg-stone-200 skeleton-shimmer" />
          <div className="w-20 h-3.5 rounded bg-stone-200 skeleton-shimmer" />
        </div>

        {/* Title Headline */}
        <div className="w-4/5 h-6 rounded-md bg-stone-200 skeleton-shimmer mb-1.5" />

        {/* Sub-location Address */}
        <div className="w-3/5 h-3.5 rounded bg-stone-200 skeleton-shimmer mb-3.5" />

        {/* Specs Matrix Strip */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 mb-3.5">
          <div className="space-y-1.5">
            <div className="w-12 h-2.5 rounded bg-stone-200 skeleton-shimmer" />
            <div className="w-20 h-4 rounded bg-stone-200 skeleton-shimmer" />
          </div>
          <div className="space-y-1.5">
            <div className="w-14 h-2.5 rounded bg-stone-200 skeleton-shimmer" />
            <div className="w-24 h-4 rounded bg-stone-200 skeleton-shimmer" />
          </div>
        </div>

        {/* Bullets / Badges Strip */}
        <div className="flex gap-2 mb-4">
          <div className="w-14 h-5 rounded-md bg-stone-100 skeleton-shimmer" />
          <div className="w-14 h-5 rounded-md bg-stone-100 skeleton-shimmer" />
          <div className="w-14 h-5 rounded-md bg-stone-100 skeleton-shimmer" />
        </div>

        {/* Footer Pricing & CTA */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 mt-auto">
          <div className="space-y-1">
            <div className="w-14 h-2.5 rounded bg-stone-200 skeleton-shimmer" />
            <div className="w-28 h-5 rounded bg-stone-200 skeleton-shimmer" />
          </div>
          <div className="w-24 h-9 rounded-xl bg-stone-200 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of Property Card Skeletons for initial loading or filter transitions
 */
export function PropertyCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Feature Card Skeleton (For Why Choose Us / Trust / Foundations)
 */
export function FeatureCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col space-y-4">
      <div className="w-12 h-12 rounded-xl bg-stone-200 skeleton-shimmer" />
      <div className="w-3/5 h-5 rounded bg-stone-200 skeleton-shimmer" />
      <div className="w-full h-3.5 rounded bg-stone-100 skeleton-shimmer" />
      <div className="w-4/5 h-3.5 rounded bg-stone-100 skeleton-shimmer" />
    </div>
  );
}
