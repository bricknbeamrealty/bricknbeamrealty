"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Percent,
  CircleDollarSign,
  Compass,
  UserCheck,
  ShieldCheck,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

interface FeatureCardProps {
  primaryIcon: React.ReactNode;
  badgeIcon: React.ReactNode;
  title: string;
  description: string;
  delayIndex: number;
  actionText?: string;
  onClick?: () => void;
}

const features: Array<{
  primaryIcon: React.ReactNode;
  badgeIcon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  isActionable?: boolean;
}> = [
  {
    primaryIcon: <Percent className="w-6 h-6 stroke-[2.2]" />,
    badgeIcon: <CircleDollarSign className="w-3 h-3 stroke-[2.5]" />,
    title: "Negotiation Support",
    description:
      "Let us handle negotiations on your behalf to ensure the best possible. Your best interests are our top priority.",
  },
  {
    primaryIcon: <Compass className="w-6 h-6 stroke-[2.2]" />,
    badgeIcon: <Shield className="w-3 h-3 stroke-[2.5]" />,
    title: "Local Expertise",
    description:
      "We have a deep understanding of the local real estate market. We can provide you with the insider knowledge you need.",
  },
  {
    primaryIcon: <CircleDollarSign className="w-6 h-6 stroke-[2.2]" />,
    badgeIcon: <Percent className="w-3 h-3 stroke-[2.5]" />,
    title: "Market Insights",
    description:
      "Gain valuable insights and stay informed about the latest trends in the real estate market.",
  },
  {
    primaryIcon: <UserCheck className="w-6 h-6 stroke-[2.2]" />,
    badgeIcon: <Sparkles className="w-3 h-3 stroke-[2.5]" />,
    title: "Property Consultation",
    description:
      "Receive personalized 1-on-1 advisory with seasoned property specialists to evaluate vetted projects, align with your budget band, and ensure seamless due diligence.",
    actionText: "Book Free Consultation",
    isActionable: true,
  },
];

function FeatureCard({
  primaryIcon,
  badgeIcon,
  title,
  description,
  delayIndex,
  actionText,
  onClick,
}: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : delayIndex * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onClick}
      className={`group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 md:p-8 border border-stone-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#a01115]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div>
        {/* Layered Dual Badge Icon */}
        <div className="relative w-14 h-14 rounded-full bg-stone-100 border border-stone-200/80 flex items-center justify-center text-stone-800 group-hover:bg-[#a01115]/10 group-hover:text-[#a01115] group-hover:border-[#a01115]/20 transition-all duration-300 mb-5">
          {primaryIcon}
          {/* Overlapping Bottom-Right Mini Badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md border-2 border-white group-hover:bg-[#a01115] transition-colors duration-300">
            {badgeIcon}
          </div>
        </div>

        {/* Feature Title */}
        <h3 className="text-xl font-semibold font-sans text-stone-900 tracking-tight group-hover:text-[#a01115] transition-colors duration-200">
          {title}
        </h3>

        {/* Feature Description */}
        <p className="mt-2.5 text-sm text-stone-600 leading-relaxed font-normal font-sans">
          {description}
        </p>
      </div>

      {/* Subtle bottom decorative accent */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-semibold font-sans text-[#a01115]">
          {actionText || "Verified Advisory"}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#a01115]" />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useConsultationModal();

  return (
    <section
      id="why-choose-us"
      className="relative z-10 py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden scroll-mt-24"
    >
      {/* Anchor compatibility for navbar & scroll targets with offset */}
      <div id="how-we-work" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />

      {/* Subtle City Watermark in Background matching screenshot atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-transparent to-[#faf8f5] z-10" />
        <Image
          src="/images/why-choose-us.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-[0.05] grayscale mix-blend-multiply"
        />
      </div>

      {/* Section Header */}
      <div className="max-w-4xl mb-12 sm:mb-16">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-3.5">
          <Sparkles className="w-3.5 h-3.5 text-[#a01115]" />
          <span>Why Choose Us</span>
        </div>

        {/* Heading Layout matching user reference image */}
        <p className="text-xl sm:text-2xl md:text-3xl font-light font-sans text-stone-700 tracking-tight">
          Real Estate Solutions that
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-stone-900 tracking-tight leading-[1.1] mt-1">
          Tailored Your Needs
        </h2>
      </div>

      {/* Main Grid: 2x2 Feature Cards on Left, Showcase Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: 2x2 Cards Grid (Span 7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              primaryIcon={feature.primaryIcon}
              badgeIcon={feature.badgeIcon}
              title={feature.title}
              description={feature.description}
              delayIndex={idx}
              actionText={feature.actionText}
              onClick={feature.isActionable ? openModal : undefined}
            />
          ))}
        </div>

        {/* Right Column: Dark Modern Showcase Card (Span 5) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: shouldReduceMotion ? 0 : 0.25,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="group relative lg:col-span-5 min-h-[440px] sm:min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col justify-between p-7 sm:p-9 lg:p-10"
        >
          {/* Background Image with Zoom on Hover */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/why-choose-us.jpg"
              alt="Luxury high-rise residential towers and city living"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-bottom brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark Scrim and Seamless Legibility Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 via-40% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Top Content: Headline & Action Button */}
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[32px] font-semibold font-sans text-white tracking-tight leading-snug max-w-sm">
              Experience the ease of finding your ideal home with us!
            </h3>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/properties"
                className="group/btn inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-stone-100 text-zinc-950 font-semibold font-sans text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4 text-zinc-900 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/how-we-work"
                className="group/btn2 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm sm:text-base font-semibold font-sans backdrop-blur-md transition-all duration-200 active:scale-[0.98]"
              >
                <span>How We Work</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover/btn2:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Bottom Floating Badge / Trust Indicator */}
          <div className="relative z-10 mt-auto pt-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-xs text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Verified Thane Listings</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
