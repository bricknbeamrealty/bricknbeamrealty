"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Home,
  Building2,
  Compass,
  Users,
  PhoneCall,
  Sparkles,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConsultationModal } from "@/context/ConsultationModalContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "How We Work", href: "/how-we-work", icon: Compass },
  { label: "About Us", href: "/about-us", icon: Users },
  { label: "Contact Us", href: "/contact-us", icon: PhoneCall },
];

export default function Navbar() {
  const { openModal } = useConsultationModal();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Pure derived activeItem to guarantee 100% deterministic SSR and hydration
  const activeItem = useMemo(() => {
    if (pathname === "/about-us") return "About Us";
    if (pathname === "/contact-us") return "Contact Us";
    if (pathname === "/how-we-work") return "How We Work";
    if (pathname?.startsWith("/properties")) return "Properties";
    return "Home";
  }, [pathname]);

  // Dynamic scroll detection with passive listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility (Esc to close mobile sheet)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto mx-auto max-w-6xl transition-all duration-300 ${
            isScrolled ? "scale-[0.99] -translate-y-1" : ""
          }`}
        >
          {/* Main Floating Pill Container with Frosted Glassmorphism */}
          <div
            className={`relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 backdrop-blur-xl ${
              isScrolled
                ? "bg-white/95 border-stone-200/90 shadow-[0_12px_44px_rgba(0,0,0,0.08)]"
                : "bg-white/80 border-stone-200/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
            }`}
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Top Gloss Reflection Line */}
            <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

            {/* Left: Brick & Beam Realty Official Brand Logo */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a01115]/50 rounded-md py-0.5"
                aria-label="Brick and Beam Realty - Return to home"
              >
                <Image
                  src="/logo.png"
                  alt="Brick and Beam Realty"
                  width={260}
                  height={170}
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Center: Desktop Clean Direct Navigation Links (Enhanced Typography & Visibility) */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              {navItems.map((item) => {
                const isActive = activeItem === item.label;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3.5 py-1.5 xl:px-4 xl:py-2 rounded-full text-sm xl:text-[15px] tracking-[-0.01em] transition-all duration-200 ${
                      isActive
                        ? "text-stone-950 font-semibold bg-stone-100 shadow-xs border border-stone-200/60"
                        : "text-stone-600 font-medium hover:text-stone-950 hover:bg-stone-100/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Book Consultation Button (Rounded pill + circular badge) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={openModal}
                className="hidden sm:inline-flex group relative items-center gap-2 pl-4 sm:pl-4.5 pr-1.5 py-1.5 rounded-full bg-[#a01115] hover:bg-[#850e11] text-white font-semibold font-sans text-xs sm:text-sm tracking-tight shadow-md hover:shadow-xl shadow-[#a01115]/20 hover:shadow-[#a01115]/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a01115]/80 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-white/90" />
                <span className="font-semibold font-sans text-white select-none">Book Consultation</span>
                <span className="relative flex items-center justify-center w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/20 group-hover:bg-white/30 text-white shadow-inner transition-colors duration-500 overflow-hidden">
                  {/* Primary Arrow - Exits diagonally to top-right on hover */}
                  <ArrowUpRight
                    className="w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:opacity-0"
                    strokeWidth={2.5}
                  />
                  {/* Secondary Arrow - Enters from bottom-left to center on hover */}
                  <ArrowUpRight
                    className="absolute w-4 h-4 -translate-x-5 translate-y-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    strokeWidth={2.5}
                  />
                </span>
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="flex lg:hidden items-center justify-center h-9 w-9 rounded-full text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom-to-Up Sheet Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden pointer-events-auto">
            {/* Smooth Frosted Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-md"
            />

            {/* Bottom-to-Up Sliding Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed inset-x-0 bottom-0 z-10 rounded-t-[36px] border-t border-stone-200 bg-white/98 px-6 pt-3 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] backdrop-blur-3xl max-h-[88vh] overflow-y-auto text-stone-900"
            >
              {/* Grab / Pull Handle Bar */}
              <div className="mx-auto w-12 h-1.5 rounded-full bg-stone-300 mb-4" />

              {/* Drawer Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/logo.png"
                    alt="Brick and Beam Realty"
                    width={180}
                    height={118}
                    className="h-9 sm:h-10 w-auto object-contain"
                  />
                  <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-stone-500 font-mono">
                    <Sparkles className="w-3 h-3 text-[#a01115]" />
                    <span>Directory</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center h-8.5 w-8.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Navigation Items with Staggered Entrance */}
              <div className="py-4 space-y-1.5">
                {navItems.map((item, index) => {
                  const isActive = activeItem === item.label;
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 + 0.08, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-3 px-3.5 rounded-2xl text-base transition-all ${
                          isActive
                            ? "bg-stone-100 text-stone-950 font-semibold border border-stone-200/80"
                            : "text-stone-700 font-medium hover:text-stone-950 hover:bg-stone-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                              isActive
                                ? "bg-[#a01115] text-white"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="tracking-tight">{item.label}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-3 border-t border-stone-200 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal();
                  }}
                  className="group w-full flex items-center justify-between rounded-full bg-[#a01115] text-white px-5 py-3 text-sm font-semibold font-sans hover:bg-[#850e11] transition-all shadow-md shadow-[#a01115]/20 active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/90" />
                    <span className="select-none">Book Consultation</span>
                  </div>
                  <span className="flex items-center justify-center w-7.5 h-7.5 rounded-full bg-white/20 text-white">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 px-1 font-mono">
                  <a
                    href="tel:+18008492742"
                    className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-[#a01115]" />
                    <span>+1 (800) 849-2742</span>
                  </a>
                  <a
                    href="mailto:inquiry@bricknbeams.com"
                    className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
                  >
                    <Mail className="w-3 h-3 text-[#a01115]" />
                    <span>inquiry@bricknbeams.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
