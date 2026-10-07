"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ChevronRight, Share2 } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-zinc-950 text-zinc-100 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-x border-white/15 py-16 sm:py-20 overflow-hidden shadow-[0_-16px_48px_rgba(0,0,0,0.7)] selection:bg-[#a01115] selection:text-white">
      {/* Subtle warm backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#a01115]/10 blur-[140px] pointer-events-none rounded-full z-0" />

      {/* BACKGROUND SCROLLING MARQUEE (Positioned behind footer content) */}
      <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap pointer-events-none select-none z-0 opacity-75">
        {/* Soft edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10" />

        <motion.div
          className="flex w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 24,
            ease: "linear",
          }}
        >
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <span
                className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white/30 via-zinc-400/10 to-transparent bg-clip-text text-transparent px-6 sm:px-12 whitespace-nowrap inline-block"
                style={{
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                BRICK &amp; BEAMS
              </span>
              <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-[#a01115]/50 mx-4 sm:mx-8 shrink-0 shadow-md shadow-[#a01115]/25" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* FOREGROUND CONTENT: 4-COLUMN DIRECTORY & CONTACTS (Stacked on top) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-14">
          {/* Column 1: Brand, Bio & Socials */}
          <div className="lg:col-span-4 space-y-5">
            {/* Official Brand Logo */}
            <Link
              href="/"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a01115]/50 rounded-lg"
              aria-label="Brick and Beam Realty - Return to home"
            >
              <Image
                src="/logo.png"
                alt="Brick and Beam Realty"
                width={360}
                height={220}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              />
            </Link>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              We connect buyers, sellers, and investors with carefully selected properties through expert guidance, transparent service, and personalized real estate solutions.
            </p>

            {/* Social Follow */}
            <div className="pt-2">
              <h4 className="flex items-center gap-2 text-xs font-medium font-sans text-white tracking-widest uppercase mb-3">
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>FOLLOW US</span>
              </h4>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#a01115] hover:bg-[#850e11] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#a01115]/30"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#a01115] hover:bg-[#850e11] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#a01115]/30"
                >
                  <InstagramIcon className="w-4 h-4 fill-current" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/18008492742"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#a01115] hover:bg-[#850e11] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#a01115]/30"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Group: 2-column layout on mobile, independent grid items on tablet & desktop via sm:contents */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold font-sans text-white tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                <li>
                  <Link href="/" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>Properties</span>
                  </Link>
                </li>
                <li>
                  <Link href="/how-we-work" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>How We Work</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold font-sans text-white tracking-wide">
                Legal &amp; Support
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                <li>
                  <Link href="/privacy-policy" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>Terms &amp; Conditions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>Disclaimer</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="group flex items-center gap-1.5 hover:text-white transition-colors">
                    <ChevronRight className="hidden sm:inline-block w-3 h-3 text-[#a01115] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                    <span>FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold font-sans text-white tracking-wide">
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-200">
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#a01115] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#a01115]/30">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Thane, Maharashtra</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#a01115] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#a01115]/30">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a
                  href="mailto:inquiry@bricknbeams.com"
                  className="hover:text-white transition-colors"
                >
                  inquiry@bricknbeams.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#a01115] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#a01115]/30">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <a
                  href="tel:+18008492742"
                  className="hover:text-white transition-colors"
                >
                  +1 (800) 849-2742
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#a01115] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#a01115]/30">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-zinc-300">Mon – Sun: 9:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-zinc-400">
            &copy; Copyright 2026 Brick &amp; Beams. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
