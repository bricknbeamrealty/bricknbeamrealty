"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

import { LUXURY_EASE, SectionHeaderReveal, FadeInSection } from "@/components/ui/AnimatedSection";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const shouldReduceMotion = useReducedMotion();

  // State to track the single currently active FAQ item (mutually exclusive accordion)
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const leftColumnFaqs: FAQItem[] = [
    {
      id: "area-buy",
      question: "What's The Best Area To Buy In Thane?",
      answer:
        "Pokhran Road and Hiranandani Estate are ideal for peaceful family living, while Majiwada and Ghodbunder Road offer the highest growth and best connectivity.",
    },
    {
      id: "down-payment",
      question: "How Much Is The Down Payment?",
      answer:
        "Typically 10% to 20% of the property value, with banks financing the rest. Many builders also offer easy milestone payment plans.",
    },
    {
      id: "brokerage-fees",
      question: "Is There Any Brokerage Fee On New Projects?",
      answer:
        "No, 0% brokerage. Our consultations, site visits, and developer price negotiations are 100% free for all buyers.",
    },
  ];

  const rightColumnFaqs: FAQItem[] = [
    {
      id: "price-property",
      question: "How Do I Price My Property?",
      answer:
        "We evaluate recent registered sales and current buyer demand in your area to give you an accurate, free valuation report.",
    },
    {
      id: "rental-yields",
      question: "Which Areas Have High Rental Yields?",
      answer:
        "Kolshet Road, Majiwada, and Ghodbunder Road offer top rental returns (3.5%–4.5%) with strong tenant demand from nearby corporate hubs.",
    },
    {
      id: "manage-rentals",
      question: "How Do I Manage Rental Properties?",
      answer:
        "We handle everything from finding verified tenants and registered agreements to routine property checkups and seamless rent collection.",
    },
  ];

  const renderFaqCard = (faq: FAQItem) => {
    const isOpen = activeId === faq.id;

    return (
      <div
        key={faq.id}
        className={`rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-200 ${
          isOpen ? "border-[#a01115]/30 shadow-md ring-1 ring-[#a01115]/10" : "border-stone-200/80 hover:border-stone-300"
        }`}
      >
        {/* Card Header: Question + Plus/Minus Toggle */}
        <button
          type="button"
          onClick={() => toggleItem(faq.id)}
          className="flex items-center justify-between w-full text-left cursor-pointer group"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
        >
          <span className={`text-base sm:text-[17px] font-semibold font-sans transition-colors pr-4 leading-snug ${
            isOpen ? "text-[#a01115]" : "text-slate-900 group-hover:text-[#a01115]"
          }`}>
            {faq.question}
          </span>
          <span className="text-xl font-medium text-slate-500 shrink-0 w-6 h-6 flex items-center justify-center">
            {isOpen ? <Minus className="w-4 h-4 text-[#a01115]" /> : <Plus className="w-4 h-4 text-slate-700 group-hover:text-[#a01115] transition-colors" />}
          </span>
        </button>

        {/* Collapsible Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-answer-${faq.id}`}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: LUXURY_EASE }}
              className="overflow-hidden"
            >
              <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal font-sans">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="faq" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200 scroll-mt-24">
      {/* Section Header with smooth entrance */}
      <SectionHeaderReveal>
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#a01115] text-xs font-medium font-sans tracking-wider uppercase mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#a01115]" />
          <span>Frequently Asked Questions</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal font-sans">
          Did you find the question as you expected?
        </p>
      </SectionHeaderReveal>

      {/* Two Column Grid of FAQ Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto items-start">
        {/* Left Column */}
        <FadeInSection direction="up" delay={0.1} duration={0.7} className="space-y-5 sm:space-y-6">
          {leftColumnFaqs.map(renderFaqCard)}
        </FadeInSection>

        {/* Right Column */}
        <FadeInSection direction="up" delay={0.2} duration={0.7} className="space-y-5 sm:space-y-6">
          {rightColumnFaqs.map(renderFaqCard)}
        </FadeInSection>
      </div>
    </section>
  );
}
