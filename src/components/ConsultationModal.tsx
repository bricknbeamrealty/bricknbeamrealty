"use client";

import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { useConsultationModal } from "@/context/ConsultationModalContext";

const REQUIREMENTS = ["1 BHK", "2 BHK", "3 BHK", "Others"] as const;

const BUDGET_RANGES = [
  "30 - 40 Lakhs",
  "40 - 50 Lakhs",
  "50 - 60 Lakhs",
  "60+ Lakhs",
] as const;

interface PropertyStageOption {
  id: string;
  title: string;
  subtitle: string;
}

const PROPERTY_STAGES: PropertyStageOption[] = [
  { id: "RTMI", title: "RTMI", subtitle: "Ready to Move" },
  { id: "Under Construction", title: "Under Construction", subtitle: "High ROI" },
  { id: "Resale", title: "Resale", subtitle: "Prime Locality" },
  { id: "Nearing Possession", title: "Nearing Possession", subtitle: "Within Months" },
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
  const { isOpen, closeModal } = useConsultationModal();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRequirement, setSelectedRequirement] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("");

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

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
        setSelectedRequirement("");
        setSelectedBudget("");
        setSelectedStage("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleWhatsAppRedirect = () => {
    const details = [
      `• Name: ${fullName}`,
      `• Phone: ${phone}`,
      selectedRequirement ? `• Requirement: ${selectedRequirement}` : null,
      selectedBudget ? `• Budget: ₹${selectedBudget}` : null,
      selectedStage ? `• Stage: ${selectedStage}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const message = encodeURIComponent(
      `Hello Brick & Beams,\n\nI just submitted an inquiry for a property in Mumbai & MMR:\n${details}\n\nPlease share matching curated options.`
    );
    window.open(`https://wa.me/18008492742?text=${message}`, "_blank", "noopener,noreferrer");
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
            transition={{ type: "spring", damping: 30, stiffness: 380, mass: 0.6 }}
            className="relative w-full max-w-4xl max-h-[92dvh] flex flex-col bg-[#0e0f12] rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden z-10 text-white my-auto backdrop-blur-2xl"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#a01115] via-amber-500 to-[#a01115] shrink-0" />

            {/* Scrollable Container with Smooth Inner Flow */}
            <div className="overflow-y-auto overscroll-contain flex-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/25">
              {isSuccess ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 sm:p-10 text-center space-y-4 max-w-xl mx-auto"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-950/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium font-sans text-emerald-300 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-700/40">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Consultation Confirmed</span>
                    </div>
                    <h3 className="text-2xl font-sans font-semibold text-white tracking-tight">
                      Thank You, {fullName.split(" ")[0]}!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Our senior property strategist will connect with you on{" "}
                      <span className="font-semibold text-white">{phone}</span> shortly for your dedicated session.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-zinc-900/70 border border-white/10 rounded-xl p-4 text-left text-xs shadow-inner">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase tracking-wider font-medium">
                          <Home className="w-3 h-3 text-zinc-400" />
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
                          <Building2 className="w-3 h-3 text-zinc-400" />
                          <span>Stage</span>
                        </span>
                        <span className="font-semibold text-white truncate mt-1 block">
                          {selectedStage || "Flexible"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-medium shadow-md shadow-emerald-900/40 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 text-xs sm:text-sm font-medium transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-zinc-300" />
                      <span>Done</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* 2-Column Split Layout */
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr] min-h-full">
                  {/* Left Column: Brand Identity, Strategy Consultation Pitch & Meta */}
                  <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-zinc-950/70">
                    <div className="space-y-4 sm:space-y-5">
                      {/* Brand Logo & Advisory Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-amber-200 shadow-inner shrink-0">
                          <Building2 className="w-5 h-5 text-amber-200" />
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
                          className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight"
                        >
                          Free Strategy<br className="hidden sm:inline" /> Consultation
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed">
                          Looking for the ideal property in Mumbai &amp; MMR? Speak directly with our verified experts.
                        </p>
                      </div>

                      {/* Value Proposition Bullet Points */}
                      <div className="space-y-2.5 pt-1">
                        {VALUE_PROPOSITIONS.map((prop) => (
                          <div key={prop} className="flex items-start gap-2.5 text-xs text-zinc-300 font-medium">
                            <span className="text-zinc-500 font-bold shrink-0 leading-tight">→</span>
                            <span className="leading-snug">{prop}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Meta Info */}
                    <div className="space-y-2 mt-6 sm:mt-8 pt-4 border-t border-white/5 text-[11px] text-zinc-400 font-medium">
                      {SESSION_DETAILS.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Preferences Form */}
                  <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between relative bg-[#0e0f12]">
                    <div>
                      {/* Top Header with Title and Close Button */}
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <h3 className="text-base sm:text-lg font-semibold font-sans text-white tracking-tight">
                          Specify Your Preferences
                        </h3>
                        <button
                          type="button"
                          onClick={closeModal}
                          aria-label="Close modal"
                          className="p-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
                        {/* 1. Full Name & Phone Number */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Full Name */}
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                              Full Name <span className="text-[#e05256]">*</span>
                            </label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                              }}
                              placeholder="e.g. Rahul Sharma"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-white placeholder:text-zinc-500 bg-zinc-900/80 hover:border-zinc-700 focus:bg-zinc-900 focus:outline-none transition-all ${
                                errors.fullName
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-zinc-800 focus:border-white/30"
                              }`}
                            />
                            {errors.fullName && (
                              <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
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
                                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                                }}
                                placeholder="98765 43210"
                                className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-white placeholder:text-zinc-500 bg-zinc-900/80 hover:border-zinc-700 focus:bg-zinc-900 focus:outline-none transition-all ${
                                  errors.phone
                                    ? "border-red-500 focus:border-red-400"
                                    : "border-zinc-800 focus:border-white/30"
                                }`}
                              />
                            </div>
                            {errors.phone && (
                              <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>

                        {/* 2. Requirements: 1 BHK, 2 BHK, 3 BHK, Others */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-semibold text-zinc-300">
                              Requirements <span className="text-[#e05256]">*</span>
                            </label>
                            <span className="text-[10.5px] text-zinc-500 font-normal">
                              Select configuration
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {REQUIREMENTS.map((req) => {
                              const isSelected = selectedRequirement === req;
                              return (
                                <button
                                  type="button"
                                  key={req}
                                  onClick={() =>
                                    setSelectedRequirement((prev) => (prev === req ? "" : req))
                                  }
                                  className={`py-2 px-1.5 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${
                                    isSelected
                                      ? "bg-[#a01115] text-white border-[#a01115] shadow-md shadow-[#a01115]/30 font-semibold"
                                      : "bg-zinc-900/70 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 border-zinc-800"
                                  }`}
                                >
                                  {req}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 3. Budget Range: 30 - 40 Lakhs, etc. */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-semibold text-zinc-300">
                              Budget Range <span className="text-[#e05256]">*</span>
                            </label>
                            <span className="text-[10.5px] text-zinc-500 font-normal">
                              Estimated budget
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {BUDGET_RANGES.map((b) => {
                              const isSelected = selectedBudget === b;
                              return (
                                <button
                                  type="button"
                                  key={b}
                                  onClick={() => setSelectedBudget((prev) => (prev === b ? "" : b))}
                                  className={`py-2 px-1 rounded-xl text-[10.5px] sm:text-xs font-medium transition-all text-center border cursor-pointer truncate ${
                                    isSelected
                                      ? "bg-[#a01115] text-white border-[#a01115] shadow-md shadow-[#a01115]/30 font-semibold"
                                      : "bg-zinc-900/70 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 border-zinc-800"
                                  }`}
                                >
                                  ₹{b}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 4. Property Stage: 2x2 grid with Title & Subtitle */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-semibold text-zinc-300">
                              Property Stage <span className="text-[#e05256]">*</span>
                            </label>
                            <span className="text-[10.5px] text-zinc-500 font-normal">
                              Select any one type
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                            {PROPERTY_STAGES.map((st) => {
                              const isSelected = selectedStage === st.id;
                              return (
                                <button
                                  type="button"
                                  key={st.id}
                                  onClick={() =>
                                    setSelectedStage((prev) => (prev === st.id ? "" : st.id))
                                  }
                                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-zinc-900 border-[#a01115] ring-1 ring-[#a01115] shadow-md shadow-[#a01115]/20"
                                      : "bg-zinc-900/70 hover:bg-zinc-850 hover:border-zinc-700 border-zinc-800"
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-semibold text-white leading-tight">
                                    {st.title}
                                  </div>
                                  <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                                    {st.subtitle}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 5. Confirm Consultation Request Button */}
                        <div className="pt-1.5 sm:pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-zinc-100 active:scale-[0.99] text-zinc-950 text-xs sm:text-sm font-semibold font-sans shadow-lg shadow-white/5 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
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
                        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] sm:text-xs text-zinc-400 font-medium text-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>100% Confidential • Verified Advisor • No Broker Spam</span>
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
