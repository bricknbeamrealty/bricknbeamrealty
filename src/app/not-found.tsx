"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Home,
  Building2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Dynamic document title for 404 view
    document.title = "404 - Broken Property Link | Brick & Beams Thane";
  }, []);

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white relative overflow-x-hidden">
      {/* Global Navigation */}
      <Navbar />

      {/* Main 404 Error Section */}
      <main className="flex-1 flex items-center justify-center relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle Architectural Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #a01115 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient Brand Maroon / Warm Amber Radial Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-[#a01115]/10 via-[#d4af37]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Crane Lifting Red 404 Block Hero Illustration */}
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl my-2 sm:my-3 flex flex-col items-center"
            >
              {/* Floating animation container for the crane & 404 block */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                }}
                className="relative w-full flex justify-center"
              >
                <Image
                  src="/images/404-crane-red.png"
                  alt="Brick & Beams 404 - Construction crane lifting red 404 block"
                  width={640}
                  height={403}
                  priority
                  className="w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] h-auto object-contain select-none drop-shadow-md"
                />
              </motion.div>

              {/* Soft Grounding Ambient Shadow */}
              <div className="w-48 sm:w-64 h-3 bg-stone-900/10 blur-md rounded-full mt-1" />
            </motion.div>

            {/* Single Punchy Real Estate / Broken Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight max-w-2xl mx-auto mt-6 sm:mt-8"
            >
              Broken Foundation: This Property Link Is Broken
            </motion.h1>

            {/* The 2 Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4"
            >
              {/* Button 1: Back to Home Page */}
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#a01115] text-white font-medium text-sm sm:text-base shadow-lg shadow-[#a01115]/25 hover:bg-[#850e12] hover:shadow-xl hover:shadow-[#a01115]/30 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <Home className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Home Page</span>
                <ArrowLeft className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all hidden sm:inline-block" />
              </Link>

              {/* Button 2: Properties Page Button */}
              <Link
                href="/#properties"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white text-stone-900 font-medium text-sm sm:text-base border border-stone-300 hover:border-[#a01115] hover:text-[#a01115] hover:bg-stone-50/80 shadow-xs hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#a01115] transition-transform group-hover:scale-110" />
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-stone-400 group-hover:text-[#a01115]" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
