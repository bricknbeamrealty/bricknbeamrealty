"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Loader2,
  Home,
  Banknote,
  Check,
  User,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { useConsultationModal } from "@/context/ConsultationModalContext";

type PropertyCategory = "residential" | "commercial";
type TransactionType = "buy" | "sell" | "rent";

const RESIDENTIAL_REQUIREMENTS = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "Others",
] as const;

const COMMERCIAL_REQUIREMENTS = [
  "Office Space",
  "Shop / Retail",
  "Showroom",
  "Others",
] as const;

const RESIDENTIAL_BUY_BUDGETS = [
  "30 - 45 L",
  "45 - 65 L",
  "65 L - 1.2 Cr",
  "1.2 Cr+",
] as const;

const RESIDENTIAL_RENT_BUDGETS = [
  "15k - 25k",
  "25k - 40k",
  "40k - 60k",
  "60k+",
] as const;

const COMMERCIAL_BUY_BUDGETS = [
  "50 - 90 L",
  "90 L - 1.8 Cr",
  "1.8 - 3.5 Cr",
  "3.5 Cr+",
] as const;

const COMMERCIAL_RENT_BUDGETS = [
  "30k - 60k",
  "60k - 1.2 L",
  "1.2L - 2.5 L",
  "2.5 L+",
] as const;

interface StageOption {
  id: string;
  title: string;
}

const PROPERTY_STAGES: StageOption[] = [
  { id: "RTMI", title: "Ready (RTMI)" },
  { id: "Under Construction", title: "Under Const." },
  { id: "Resale", title: "Resale" },
  { id: "Nearing Possession", title: "Possession Soon" },
];

const RENT_STAGES: StageOption[] = [
  { id: "Immediate", title: "Immediate" },
  { id: "Within 15 Days", title: "Within 15 Days" },
  { id: "Within 1 Month", title: "Within 1 Month" },
  { id: "Flexible", title: "Flexible" },
];

const VALUE_PROPOSITIONS = [
  "Your exact requirements & timeline",
  "Curated inventory with developer direct pricing",
  "Clear budget breakdown & ROI projection",
];

const SESSION_DETAILS = [
  { icon: Clock, label: "15 – 20 min dedicated session" },
  { icon: Phone, label: "Direct Phone Call or WhatsApp" },
  { icon: MapPin, label: "Mumbai • Thane • Navi Mumbai" },
];

export default function ConsultationModal() {
  const { isOpen, closeModal, projectData } = useConsultationModal();
  const isProjectMode = Boolean(projectData);

  // Primary Classification (General Mode)
  const [propertyCategory, setPropertyCategory] =
    useState<PropertyCategory>("residential");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("buy");

  // User Details & Preferences
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBhk, setSelectedBhk] = useState<string>("");
  const [selectedRequirement, setSelectedRequirement] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("");

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const [prevProjectData, setPrevProjectData] = useState(projectData);
  if (projectData !== prevProjectData) {
    setPrevProjectData(projectData);
    setSelectedBhk(projectData?.bhks && projectData.bhks.length > 0 ? projectData.bhks[0] : "");
  }

  // Dynamic Options according to category and intent
  const activeRequirements =
    propertyCategory === "residential"
      ? RESIDENTIAL_REQUIREMENTS
      : COMMERCIAL_REQUIREMENTS;

  const activeBudgets =
    transactionType === "rent"
      ? propertyCategory === "residential"
        ? RESIDENTIAL_RENT_BUDGETS
        : COMMERCIAL_RENT_BUDGETS
      : propertyCategory === "residential"
        ? RESIDENTIAL_BUY_BUDGETS
        : COMMERCIAL_BUY_BUDGETS;

  const activeStages =
    transactionType === "rent" ? RENT_STAGES : PROPERTY_STAGES;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setErrors({});
        setFullName("");
        setPhone("");
        setPropertyCategory("residential");
        setTransactionType("buy");
        setSelectedRequirement("");
        setSelectedBudget("");
        setSelectedStage("");
        setSelectedBhk("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: { fullName?: string; phone?: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter your phone number";
    } else if (cleanPhone.length < 10) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = isProjectMode && projectData
      ? {
          fullName: fullName.trim(),
          phone: phone.trim(),
          requirement: selectedBhk
            ? `${projectData.title} (${selectedBhk})`
            : projectData.title,
          price_range: projectData.pricing || null,
          property_stage: projectData.status || null,
          property_category: "residential",
          transaction_type: "buy",
          source: "project_card",
          notes: `Project: ${projectData.title} | Developer: ${projectData.developer || "Developer"} | Location: ${projectData.subLocation || projectData.location || "MMR"}${projectData.possession ? ` | Possession: ${projectData.possession}` : ""}${projectData.rera ? ` | RERA: ${projectData.rera}` : ""}`,
        }
      : {
          fullName: fullName.trim(),
          phone: phone.trim(),
          selectedRequirement,
          selectedBudget,
          selectedStage,
          property_category: propertyCategory,
          transaction_type: transactionType,
          source: "modal",
        };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("Lead dispatch offline/fallback:", err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (isProjectMode && projectData) {
      const configText = selectedBhk ? ` (${selectedBhk})` : "";
      const message = encodeURIComponent(
        `Hello Brick & Beams,\n\nI just submitted an inquiry on your website for *${projectData.title}*${configText}.\n\nPlease share the official brochure, floor plans, and current developer price breakdown.\n\n• Name: ${fullName}\n• Phone: ${phone}\n• Project: ${projectData.title}\n• Configuration: ${selectedBhk || "All Configurations"}\n• Pricing: ${projectData.pricing || "On Request"}`
      );
      window.open(
        `https://wa.me/919820084927?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      const details = [
        `• Name: ${fullName}`,
        `• Phone: ${phone}`,
        `• Category: ${propertyCategory === "residential" ? "Residential" : "Commercial"} (${transactionType.toUpperCase()})`,
        selectedRequirement ? `• Requirement: ${selectedRequirement}` : null,
        selectedBudget ? `• Budget: ₹${selectedBudget}` : null,
        selectedStage ? `• Stage: ${selectedStage}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const message = encodeURIComponent(
        `Hello Brick & Beams,\n\nI just submitted an inquiry for a property in Mumbai & MMR:\n${details}\n\nPlease share matching curated options.`
      );
      window.open(
        `https://wa.me/919820084927?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          {/* Frosted Deep Black Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Container - Responsive Split-Column Luxury Advisory Theme */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 380,
              mass: 0.6,
            }}
            className="relative w-full max-w-4xl max-h-[94dvh] flex flex-col bg-[#0e0f12] rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden z-10 text-white my-auto backdrop-blur-2xl"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#a01115] via-amber-500 to-[#a01115] shrink-0" />

            {/* Container */}
            <div className="overflow-y-auto overscroll-contain flex-1 custom-scrollbar-dark">
              {isSuccess ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 sm:p-8 text-center space-y-5 max-w-xl mx-auto"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold font-sans text-emerald-300 bg-emerald-950/50 px-3.5 py-1 rounded-full border border-emerald-700/40">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isProjectMode ? "Inquiry Recorded in System" : "Consultation Confirmed"}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-sans font-semibold text-white tracking-tight">
                      Thank You, {fullName.split(" ")[0]}!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                      {isProjectMode && projectData ? (
                        <>
                          Your inquiry for <span className="font-semibold text-white">{projectData.title}</span> has been securely saved in our system. Tap below to receive the floor plans, brochure &amp; cost sheet on WhatsApp:
                        </>
                      ) : (
                        <>
                          Our senior property strategist will connect with you on{" "}
                          <span className="font-semibold text-white">{phone}</span> shortly for your dedicated session.
                        </>
                      )}
                    </p>
                  </div>

                  {/* Summary Card */}
                  {isProjectMode && projectData ? (
                    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 text-left shadow-inner flex items-center gap-3.5">
                      {projectData.image && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-zinc-800">
                          <Image
                            src={projectData.image}
                            alt={projectData.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#e05256]">
                            {projectData.developer || "Developer"}
                          </span>
                          {selectedBhk && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white font-medium">
                              {selectedBhk}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-white truncate mt-0.5">
                          {projectData.title}
                        </h4>
                        <p className="text-xs text-amber-200 font-semibold mt-0.5">
                          {projectData.pricing || "Price on Request"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-900/70 border border-white/10 rounded-xl p-3.5 text-left text-xs shadow-inner">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase tracking-wider font-medium">
                            {propertyCategory === "residential" ? (
                              <Home className="w-3 h-3 text-zinc-400" />
                            ) : (
                              <Building2 className="w-3 h-3 text-zinc-400" />
                            )}
                            <span>Segment</span>
                          </span>
                          <span className="font-semibold text-white mt-1 block truncate capitalize">
                            {propertyCategory} •{" "}
                            <span className="text-[#e05256] uppercase font-bold">
                              {transactionType}
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase tracking-wider font-medium">
                            <Building2 className="w-3 h-3 text-zinc-400" />
                            <span>Req.</span>
                          </span>
                          <span className="font-semibold text-white mt-1 block truncate">
                            {selectedRequirement || "Flexible"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase tracking-wider font-medium">
                            <Banknote className="w-3 h-3 text-[#e05256]" />
                            <span>Budget</span>
                          </span>
                          <span className="font-semibold text-amber-200 mt-1 block truncate">
                            {selectedBudget ? `₹${selectedBudget}` : "Flexible"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase tracking-wider font-medium">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            <span>Stage</span>
                          </span>
                          <span className="font-semibold text-white truncate mt-1 block">
                            {selectedStage || "Flexible"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>{isProjectMode ? "Receive Brochure & Plans on WhatsApp" : "Chat on WhatsApp"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 text-xs sm:text-sm font-medium transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-zinc-300" />
                      <span>Done</span>
                    </button>
                  </div>
                </motion.div>
              ) : isProjectMode && projectData ? (
                /* Project VIP Lead Capture View (Split 2-Column High-Converting Layout) */
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr] min-h-full">
                  {/* Left Column: Project Highlights & Value Offer */}
                  <div className="p-5 sm:p-6 md:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-zinc-950/80">
                    <div className="space-y-4">
                      {/* Project Image & Badge Preview */}
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-zinc-900">
                        {projectData.image && (
                          <Image
                            src={projectData.image}
                            alt={projectData.title}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-[#a01115] text-white shadow-sm">
                            <Sparkles className="w-3 h-3 text-white" />
                            <span>0% Brokerage</span>
                          </span>
                          {projectData.status && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[10px] bg-black/60 backdrop-blur-md text-white border border-white/15">
                              {projectData.status}
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                            {projectData.developer}
                          </p>
                          <h3 className="text-base font-bold text-white drop-shadow-sm leading-tight">
                            {projectData.title}
                          </h3>
                          <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                            {projectData.subLocation || projectData.location}
                          </p>
                        </div>
                      </div>

                      {/* Pricing & RERA Specs */}
                      <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-900/60 rounded-xl border border-white/10 text-xs">
                        <div>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold block leading-none mb-1">
                            Price Range
                          </span>
                          <span className="text-sm font-bold text-amber-200">
                            {projectData.pricing || "On Request"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold block leading-none mb-1">
                            Possession
                          </span>
                          <span className="text-xs font-semibold text-zinc-200">
                            {projectData.possession || "Dec-2028"}
                          </span>
                        </div>
                      </div>

                      {/* What You Receive */}
                      <div className="space-y-2 pt-1">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-zinc-400">
                          What you will receive instantly:
                        </p>
                        <div className="space-y-1.5 text-xs text-zinc-300 font-normal">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>Official Developer E-Brochure &amp; Master Plan</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>Detailed Unit Floor Plans &amp; Carpet Areas</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>All-Inclusive Cost Sheet &amp; Payment Milestones</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>Direct Developer Launch Rates &amp; Zero Brokerage</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Trust Badge */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>RERA: {projectData.rera || "Verified Project"} • Verified Direct Inventory</span>
                    </div>
                  </div>

                  {/* Right Column: Capture Form */}
                  <div className="p-5 sm:p-6 md:p-7 flex flex-col justify-between relative bg-[#0e0f12]">
                    <div>
                      {/* Header and Close Button */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#a01115]/20 border border-[#a01115]/40 text-[#ff6b6e] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                            <Sparkles className="w-3 h-3" />
                            <span>Instant Access</span>
                          </div>
                          <h2 className="text-lg sm:text-xl font-bold font-sans text-white tracking-tight">
                            Unlock Brochure &amp; Price Sheet
                          </h2>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            Captured directly in your dashboard with instant WhatsApp delivery.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={closeModal}
                          aria-label="Close modal"
                          className="p-2 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* Preferred BHK Selector */}
                        {projectData.bhks && projectData.bhks.length > 0 && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-200">
                              Select Configuration <span className="text-[#e05256]">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {projectData.bhks.map((bhk) => {
                                const isSelected = selectedBhk === bhk;
                                return (
                                  <button
                                    type="button"
                                    key={bhk}
                                    onClick={() => setSelectedBhk(bhk)}
                                    className={`py-2 px-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                      isSelected
                                        ? "bg-[#a01115] border-[#a01115] text-white shadow-md shadow-[#a01115]/30 font-bold"
                                        : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700/80"
                                    }`}
                                  >
                                    {bhk}
                                  </button>
                                );
                              })}
                              <button
                                type="button"
                                onClick={() => setSelectedBhk("All Configurations")}
                                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                  selectedBhk === "All Configurations"
                                    ? "bg-[#a01115] border-[#a01115] text-white shadow-md font-bold"
                                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700/80"
                                }`}
                              >
                                All Configurations
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Full Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-200">
                            Full Name <span className="text-[#e05256]">*</span>
                          </label>
                          <div
                            className={`flex items-center px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border transition-all ${
                              errors.fullName
                                ? "border-rose-500 ring-1 ring-rose-500/30"
                                : "border-zinc-800 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400/20"
                            }`}
                          >
                            <User className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                            <input
                              type="text"
                              placeholder="e.g. Rahul Sharma"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                              }}
                              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                            />
                          </div>
                          {errors.fullName && (
                            <p className="text-[11px] text-rose-400">{errors.fullName}</p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-200">
                            WhatsApp / Mobile Number <span className="text-[#e05256]">*</span>
                          </label>
                          <div
                            className={`flex items-center px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border transition-all ${
                              errors.phone
                                ? "border-rose-500 ring-1 ring-rose-500/30"
                                : "border-zinc-800 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400/20"
                            }`}
                          >
                            <span className="text-xs font-bold text-zinc-400 mr-2 pr-2 border-r border-zinc-700 shrink-0">
                              +91
                            </span>
                            <input
                              type="tel"
                              placeholder="98200 XXXXX"
                              maxLength={10}
                              value={phone}
                              onChange={(e) => {
                                const clean = e.target.value.replace(/\D/g, "");
                                setPhone(clean);
                                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                              }}
                              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none font-mono"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-[11px] text-rose-400">{errors.phone}</p>
                          )}
                        </div>

                        {/* Value Micro-Proposition */}
                        <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center gap-2 text-[11px] text-emerald-300">
                          <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                          <span>Floor plans &amp; brochure will be sent directly to your WhatsApp</span>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.99] text-white text-sm font-bold font-sans shadow-lg shadow-[#a01115]/30 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin h-4 w-4" />
                                <span>Recording Inquiry...</span>
                              </div>
                            ) : (
                              <>
                                <span>Get Brochure &amp; Price Sheet</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Privacy Note */}
                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-medium text-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span>100% Confidential • Direct Developer Rates • No Broker Spam</span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                /* 2-Column Split Layout */
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr] min-h-full">
                  {/* Left Column: Brand Identity, Strategy Pitch & Meta */}
                  <div className="p-5 sm:p-6 md:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-zinc-950/70">
                    <div className="space-y-4">
                      {/* Brand Logo & Advisory Header */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-amber-200 shadow-inner shrink-0">
                          <Building2 className="w-4.5 h-4.5 text-amber-200" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.18em] text-zinc-400 uppercase">
                            BRICK &amp; BEAMS
                          </p>
                          <p className="text-xs font-semibold text-white tracking-wide">
                            Private Advisory
                          </p>
                        </div>
                      </div>

                      {/* Main Title */}
                      <div>
                        <h2
                          id="modal-title"
                          className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug"
                        >
                          Free Strategy
                          <br className="hidden sm:inline" /> Consultation
                        </h2>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                          Looking for the ideal property in Mumbai &amp; MMR?
                          Speak directly with our verified experts.
                        </p>
                      </div>

                      {/* Value Proposition Bullet Points */}
                      <div className="space-y-2 pt-0.5">
                        {VALUE_PROPOSITIONS.map((prop) => (
                          <div
                            key={prop}
                            className="flex items-start gap-2 text-xs text-zinc-300 font-medium"
                          >
                            <span className="text-zinc-500 font-bold shrink-0 leading-tight">
                              →
                            </span>
                            <span className="leading-snug">{prop}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Meta Info */}
                    <div className="space-y-1.5 mt-5 pt-3 border-t border-white/5 text-[11px] text-zinc-400 font-medium">
                      {SESSION_DETAILS.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Preferences Form with Refined In-Depth Spacing */}
                  <div className="p-4 sm:p-6 md:p-7 flex flex-col justify-between relative bg-[#0e0f12]">
                    <div>
                      {/* Top Header with Title and Close Button */}
                      <div className="flex items-center justify-between mb-3.5 pb-1">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold font-sans text-white tracking-tight">
                            Specify Your Preferences
                          </h3>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            Verified options tailored to your exact budget &amp; location.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={closeModal}
                          aria-label="Close modal"
                          className="p-2 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-3.5 sm:space-y-4"
                        noValidate
                      >
                        {/* 1. Category & Purpose Switcher - Unified Premium Row */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-200">
                              Category &amp; Intent <span className="text-[#e05256]">*</span>
                            </label>
                            <span className="text-[11px] text-zinc-400 font-normal">
                              Select property segment
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            {/* Category Switcher: Residential vs Commercial */}
                            <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-950/90 rounded-xl border border-zinc-800 flex-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setPropertyCategory("residential");
                                  setSelectedRequirement("");
                                  setSelectedBudget("");
                                }}
                                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${propertyCategory === "residential"
                                    ? "bg-[#a01115] text-white shadow-sm font-bold"
                                    : "text-zinc-400 hover:text-white"
                                  }`}
                              >
                                <Home className="w-3.5 h-3.5 shrink-0" />
                                <span>Residential</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setPropertyCategory("commercial");
                                  setSelectedRequirement("");
                                  setSelectedBudget("");
                                }}
                                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${propertyCategory === "commercial"
                                    ? "bg-[#a01115] text-white shadow-sm font-bold"
                                    : "text-zinc-400 hover:text-white"
                                  }`}
                              >
                                <Building2 className="w-3.5 h-3.5 shrink-0" />
                                <span>Commercial</span>
                              </button>
                            </div>

                            {/* Transaction Type: Buy / Rent / Sell */}
                            <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-950/70 rounded-xl border border-zinc-800/80 sm:w-52">
                              {(["buy", "rent", "sell"] as const).map((type) => {
                                const isSelected = transactionType === type;
                                return (
                                  <button
                                    type="button"
                                    key={type}
                                    onClick={() => {
                                      setTransactionType(type);
                                      setSelectedBudget("");
                                    }}
                                    className={`py-2 px-2 rounded-lg text-xs font-medium capitalize transition-all text-center cursor-pointer ${isSelected
                                        ? "bg-white text-zinc-950 font-bold shadow-xs"
                                        : "text-zinc-400 hover:text-white"
                                      }`}
                                  >
                                    {type === "buy"
                                      ? "Buy"
                                      : type === "rent"
                                        ? "Rent"
                                        : "Sell"}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* 2. Full Name & Phone Number - Generous In-Depth Spacing */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Full Name */}
                          <div>
                            <label className="block text-xs font-semibold text-zinc-200 mb-1.5">
                              Full Name <span className="text-[#e05256]">*</span>
                            </label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (errors.fullName)
                                  setErrors((prev) => ({
                                    ...prev,
                                    fullName: undefined,
                                  }));
                              }}
                              placeholder="e.g. Rahul Sharma"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white placeholder:text-zinc-500 bg-zinc-900/80 hover:border-zinc-700 focus:bg-zinc-900 focus:outline-none transition-all ${errors.fullName
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-zinc-800 focus:border-white/30"
                                }`}
                            />
                            {errors.fullName && (
                              <p className="text-[11px] text-red-400 mt-1">
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-xs font-semibold text-zinc-200 mb-1.5">
                              Phone Number <span className="text-[#e05256]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 pointer-events-none">
                                +91
                              </span>
                              <input
                                type="tel"
                                maxLength={10}
                                value={phone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, "");
                                  setPhone(val);
                                  if (errors.phone)
                                    setErrors((prev) => ({
                                      ...prev,
                                      phone: undefined,
                                    }));
                                }}
                                placeholder="98765 43210"
                                className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm text-white placeholder:text-zinc-500 bg-zinc-900/80 hover:border-zinc-700 focus:bg-zinc-900 focus:outline-none transition-all ${errors.phone
                                    ? "border-red-500 focus:border-red-400"
                                    : "border-zinc-800 focus:border-white/30"
                                  }`}
                              />
                            </div>
                            {errors.phone && (
                              <p className="text-[11px] text-red-400 mt-1">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* 3. Requirements: Dynamic (BHK for Residential / Space Type for Commercial) */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-zinc-200">
                              Configuration / Space{" "}
                              <span className="text-[#e05256]">*</span>
                            </label>
                            <span className="text-[11px] text-zinc-400 font-normal">
                              {propertyCategory === "residential"
                                ? "Select BHK configuration"
                                : "Select space type"}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {activeRequirements.map((req) => {
                              const isSelected = selectedRequirement === req;
                              return (
                                <button
                                  type="button"
                                  key={req}
                                  onClick={() =>
                                    setSelectedRequirement((prev) =>
                                      prev === req ? "" : req
                                    )
                                  }
                                  className={`py-2 px-1.5 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${isSelected
                                      ? "bg-[#a01115] text-white border-[#a01115] shadow-xs font-semibold"
                                      : "bg-zinc-900/70 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 border-zinc-800"
                                    }`}
                                >
                                  {req}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 4. Budget Range: Dynamically Adapted for Buy vs Rent */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-zinc-200">
                              Budget Range <span className="text-[#e05256]">*</span>
                            </label>
                            <span className="text-[11px] text-zinc-400 font-normal">
                              {transactionType === "rent"
                                ? "Monthly rental budget"
                                : "Estimated purchase value"}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {activeBudgets.map((b) => {
                              const isSelected = selectedBudget === b;
                              return (
                                <button
                                  type="button"
                                  key={b}
                                  onClick={() =>
                                    setSelectedBudget((prev) =>
                                      prev === b ? "" : b
                                    )
                                  }
                                  className={`py-2 px-1.5 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${isSelected
                                      ? "bg-[#a01115] text-white border-[#a01115] shadow-xs font-semibold"
                                      : "bg-zinc-900/70 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 border-zinc-800"
                                    }`}
                                >
                                  {b.startsWith("₹") ? b : `₹${b}`}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 5. Property Stage / Possession Timeline */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-zinc-200">
                              {transactionType === "rent"
                                ? "Possession Timeline"
                                : "Property Stage"}{" "}
                              <span className="text-[#e05256]">*</span>
                            </label>
                            <span className="text-[11px] text-zinc-400 font-normal">
                              {transactionType === "rent"
                                ? "Move-in timeline"
                                : "Construction status"}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {activeStages.map((st) => {
                              const isSelected = selectedStage === st.id;
                              return (
                                <button
                                  type="button"
                                  key={st.id}
                                  onClick={() =>
                                    setSelectedStage((prev) =>
                                      prev === st.id ? "" : st.id
                                    )
                                  }
                                  className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                                      ? "bg-zinc-900 border-[#a01115] text-white ring-1 ring-[#a01115] shadow-xs font-semibold"
                                      : "bg-zinc-900/70 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 border-zinc-800"
                                    }`}
                                >
                                  <span className="text-xs truncate block">
                                    {st.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 6. Confirm Consultation Request Button - Tactile & Premium */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-zinc-100 active:scale-[0.99] text-zinc-950 text-sm font-bold font-sans shadow-lg shadow-white/5 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2 text-zinc-900">
                                <Loader2 className="animate-spin h-4 w-4" />
                                <span>Processing Request...</span>
                              </div>
                            ) : (
                              <>
                                <span>Confirm Consultation Request</span>
                                <ArrowRight className="w-4 h-4 text-zinc-950 transition-transform duration-200 group-hover:translate-x-1" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Trust Micro-badge */}
                        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-zinc-400 font-medium text-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>
                            100% Confidential • Verified Advisor • No Broker Spam
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
