"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-zinc-950 text-zinc-100 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-x border-white/15 py-16 sm:py-20 overflow-hidden shadow-[0_-16px_48px_rgba(0,0,0,0.7)] selection:bg-orange-500 selection:text-white">
      {/* Subtle warm backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-orange-600/5 blur-[140px] pointer-events-none rounded-full z-0" />

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
              <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-[#f95721]/35 mx-4 sm:mx-8 shrink-0 shadow-md shadow-orange-500/15" />
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
              href="#home"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-lg"
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

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-sm drop-shadow-sm">
              We connect buyers, sellers, and investors with carefully selected properties through expert guidance, transparent service, and personalized real estate solutions.
            </p>

            {/* Social Follow */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-3 drop-shadow-sm">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#f95721] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-600/30"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#f95721] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-600/30"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 rounded-full bg-[#f95721] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-600/30"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-[#f95721] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-600/30"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide drop-shadow-sm">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li>
                <Link href="#home" className="hover:text-white transition-colors drop-shadow-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#properties" className="hover:text-white transition-colors drop-shadow-sm">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="#about-us" className="hover:text-white transition-colors drop-shadow-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors drop-shadow-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact-us" className="hover:text-white transition-colors drop-shadow-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide drop-shadow-sm">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors drop-shadow-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors drop-shadow-sm">
                  Terms &amp; Condition
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors drop-shadow-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide drop-shadow-sm">
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-200">
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#f95721] text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/20">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="drop-shadow-sm">125 Park Avenue, New York, NY 10017</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#f95721] text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/20">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a
                  href="mailto:inquiry@bricknbeams.com"
                  className="hover:text-white transition-colors drop-shadow-sm"
                >
                  inquiry@bricknbeams.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#f95721] text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/20">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <a
                  href="tel:+18008492742"
                  className="hover:text-white transition-colors drop-shadow-sm"
                >
                  +1 (800) 849-2742
                </a>
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
