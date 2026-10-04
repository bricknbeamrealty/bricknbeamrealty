"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import {
  Home,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  User,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  requirement: string;
  message: string;
}

export default function ContactUsClient() {
  const shouldReduceMotion = useReducedMotion();

  // Form State
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    topic: "General Question",
    requirement: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Please enter your message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Simulate dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white overflow-x-hidden font-sans scroll-smooth">
      {/* Dynamic Warm Ambient Architectural Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#af7953]/10 via-amber-500/5 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating Pill Glassmorphic Navbar */}
      <Navbar />

      <main className="relative z-10">
        {/* =========================================================================
            SECTION 1: HERO (EXACT REPLICATION OF USER REFERENCE SCREENSHOT)
            ========================================================================= */}
        <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-200/80">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs mb-8 text-xs sm:text-sm text-stone-600 font-medium"
          >
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-stone-900 transition-colors">
              <Home className="w-3.5 h-3.5 text-stone-400" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#a01115] font-semibold">Contact Us</span>
          </nav>

          {/* Hero Content Split Matching Reference Screenshot */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-12"
          >
            {/* Left Main Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111e1c] leading-[1.08] font-sans">
                <span>LET’S CONNECT</span>
                <br />
                <span>– WE’RE HERE TO HELP!</span>
              </h1>
            </div>

            {/* Right Side Subtitle (Parallel to first title line on desktop) */}
            <div className="max-w-md lg:pt-3">
              <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
                Have questions or need assistance? Reach out to us
                <br className="hidden sm:inline" />
                —we’re here to help you find your perfect home.
              </p>
            </div>
          </motion.div>
        </section>

        {/* =========================================================================
            SECTION 2: CONTACT DETAILS & MODULAR QUESTION FORM (IN-DEPTH)
            ========================================================================= */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Box 1: Contact Details & Proper Google Maps Embed */}
            <div className="rounded-3xl bg-[#f4f3ec] p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xs border border-stone-200/50">
              <div className="space-y-8 sm:space-y-10">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-32 sm:w-36 flex items-center gap-2.5 text-[#2e594d] shrink-0">
                    <Phone className="w-4 h-4 stroke-[1.75]" />
                    <span className="text-base font-normal">Phone</span>
                  </div>
                  <div className="text-stone-900 text-base font-medium">
                    <a
                      href="tel:+919820084927"
                      className="hover:text-[#2e594d] transition-colors"
                    >
                      +91 98200 84927
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-32 sm:w-36 flex items-center gap-2.5 text-[#2e594d] shrink-0">
                    <Mail className="w-4 h-4 stroke-[1.75]" />
                    <span className="text-base font-normal">Email</span>
                  </div>
                  <div className="text-stone-900 text-base font-medium break-all">
                    <a
                      href="mailto:hello@bricknbeams.com"
                      className="hover:text-[#2e594d] transition-colors"
                    >
                      hello@bricknbeams.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="w-32 sm:w-36 flex items-center gap-2.5 text-[#2e594d] shrink-0 pt-0.5">
                    <MapPin className="w-4 h-4 stroke-[1.75]" />
                    <span className="text-base font-normal">Location</span>
                  </div>
                  <div className="text-stone-900 text-base font-medium leading-relaxed">
                    <p>Level 4, High-Street Suites,</p>
                    <p>Ghodbunder Rd, Thane West, MH 400607</p>
                  </div>
                </div>
              </div>

              {/* Proper Google Maps Embed of Thane Location */}
              <div className="mt-8 sm:mt-12 rounded-2xl overflow-hidden border border-stone-300/70 shadow-xs relative h-[180px] sm:h-[210px] w-full bg-stone-200">
                <iframe
                  title="Brick & Beam Realty Thane Location Map"
                  src="https://maps.google.com/maps?q=Ghodbunder+Road,+Thane+West,+Thane,+Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Box 2: Question Not Answered Yet? Modular Form */}
            <div className="rounded-3xl bg-[#f4f3ec] p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xs border border-stone-200/50">
              <div>
                <h3 className="text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight font-sans mb-7 sm:mb-8">
                  Question not answered yet?
                </h3>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#2e594d]/10 text-[#2e594d] flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-normal text-stone-900 font-sans">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-sm text-stone-600 max-w-sm leading-relaxed font-normal">
                        Thank you, <span className="font-semibold text-stone-900">{formData.fullName}</span>. We have received your inquiry and our team will get back to you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            fullName: "",
                            email: "",
                            phone: "",
                            topic: "General Question",
                            requirement: "",
                            message: "",
                          });
                        }}
                        className="mt-4 px-5 py-2.5 rounded-full bg-white border border-stone-300 text-stone-800 text-sm font-medium hover:bg-stone-50 transition-all cursor-pointer shadow-2xs"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5" noValidate>
                      {errorMsg && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium">
                          {errorMsg}
                        </div>
                      )}

                      {/* Modular Box 1: Full Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Full Name */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                            Full Name <span className="text-[#a01115]">*</span>
                          </label>
                          <div className="rounded-xl bg-white border border-stone-300/80 shadow-2xs hover:border-stone-400 focus-within:border-[#2e594d] focus-within:ring-2 focus-within:ring-[#2e594d]/10 transition-all">
                            <div className="flex items-center px-3.5 py-2.5">
                              <User className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="e.g. Rahul Sharma"
                                required
                                className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 text-sm outline-none font-normal"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                            Email Address <span className="text-[#a01115]">*</span>
                          </label>
                          <div className="rounded-xl bg-white border border-stone-300/80 shadow-2xs hover:border-stone-400 focus-within:border-[#2e594d] focus-within:ring-2 focus-within:ring-[#2e594d]/10 transition-all">
                            <div className="flex items-center px-3.5 py-2.5">
                              <Mail className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="e.g. rahul@example.com"
                                required
                                className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 text-sm outline-none font-normal"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Modular Box 2: Phone & Topic */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Phone Number */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                            Phone Number <span className="text-stone-400 font-normal lowercase">(optional)</span>
                          </label>
                          <div className="rounded-xl bg-white border border-stone-300/80 shadow-2xs hover:border-stone-400 focus-within:border-[#2e594d] focus-within:ring-2 focus-within:ring-[#2e594d]/10 transition-all">
                            <div className="flex items-center px-3.5 py-2.5">
                              <span className="text-xs font-semibold text-stone-500 mr-2 pr-2 border-r border-stone-200 shrink-0">
                                +91
                              </span>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="98200 XXXXX"
                                maxLength={10}
                                className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 text-sm outline-none font-normal"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Inquiry Topic */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                            Inquiry Topic
                          </label>
                          <div className="rounded-xl bg-white border border-stone-300/80 shadow-2xs hover:border-stone-400 focus-within:border-[#2e594d] focus-within:ring-2 focus-within:ring-[#2e594d]/10 transition-all">
                            <div className="flex items-center px-3.5 py-2.5">
                              <HelpCircle className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                              <select
                                name="topic"
                                value={formData.topic}
                                onChange={handleInputChange}
                                className="w-full bg-transparent text-stone-900 text-sm outline-none font-normal cursor-pointer"
                              >
                                <option value="General Question">General Real Estate Question</option>
                                <option value="Schedule Site Visit">Schedule VIP Site Visit</option>
                                <option value="Price & Payment Plan">Price &amp; Payment Plan</option>
                                <option value="Developer Direct Offers">Developer Direct Offers</option>
                                <option value="Resale / Valuation">Property Valuation / Resale</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Modular Box 3: Quick Requirement Chips */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                            Interested In <span className="text-stone-400 font-normal lowercase">(optional)</span>
                          </label>
                          <span className="text-[10px] text-stone-500">Quick selection</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {["1 BHK", "2 BHK", "3 BHK", "Penthouse / Luxury"].map((chip) => {
                            const isSelected = formData.requirement === chip;
                            return (
                              <button
                                type="button"
                                key={chip}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    requirement: prev.requirement === chip ? "" : chip,
                                  }))
                                }
                                className={`py-1.5 px-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer truncate ${
                                  isSelected
                                    ? "bg-[#2e594d] text-white border-[#2e594d] shadow-2xs font-semibold"
                                    : "bg-white/85 hover:bg-white border-stone-300/80 text-stone-700"
                                }`}
                              >
                                {chip}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Modular Box 4: Your Message */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                          Your Message <span className="text-[#a01115]">*</span>
                        </label>
                        <div className="rounded-xl bg-white border border-stone-300/80 shadow-2xs hover:border-stone-400 focus-within:border-[#2e594d] focus-within:ring-2 focus-within:ring-[#2e594d]/10 transition-all">
                          <div className="p-3">
                            <textarea
                              name="message"
                              rows={3}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="How can our Thane advisory team help you? Please specify preferred location, budget, or timeline..."
                              required
                              className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 text-sm outline-none resize-none font-normal"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Button & Assurance */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#3d6e63] hover:bg-[#2f574e] active:scale-[0.98] text-white text-sm sm:text-base font-medium shadow-xs transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                        >
                          {/* Circular icon badge */}
                          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                            {isSubmitting ? (
                              <span className="w-3.5 h-3.5 border-2 border-[#3d6e63] border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <MessageSquare className="w-4 h-4 text-[#3d6e63] fill-[#3d6e63]/20" />
                            )}
                          </span>
                          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        </button>

                        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-normal">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#2e594d]" />
                          <span>100% Confidential • Zero Spam</span>
                        </div>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: FREQUENTLY ASKED QUESTIONS (STANDARDIZED WITH MAIN SITE)
            ========================================================================= */}
        <FAQSection />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
