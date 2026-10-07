"use client";

import React from "react";
import { motion, useReducedMotion, type Variants, type TargetAndTransition } from "framer-motion";

// Luxury real-estate cubic-bezier curve (smooth, organic spring deceleration)
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Section-level entrance animation
 * Silky smooth fade-in with directional gentle glide
 */
interface FadeInSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale";
  viewportAmount?: number;
}

export function FadeInSection({
  children,
  id,
  className,
  delay = 0,
  duration = 0.75,
  direction = "up",
  viewportAmount = 0.12,
}: FadeInSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const directionVariants: Record<
    string,
    { initial: TargetAndTransition; animate: TargetAndTransition }
  > = {
    up: {
      initial: { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0 },
    },
    down: {
      initial: { opacity: 0, y: -28 },
      animate: { opacity: 1, y: 0 },
    },
    left: {
      initial: { opacity: 0, x: 28 },
      animate: { opacity: 1, x: 0 },
    },
    right: {
      initial: { opacity: 0, x: -28 },
      animate: { opacity: 1, x: 0 },
    },
    none: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95, y: 15 },
      animate: { opacity: 1, scale: 1, y: 0 },
    },
  };

  const selected = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      id={id}
      initial={selected.initial}
      whileInView={selected.animate}
      viewport={{ once: true, amount: viewportAmount, margin: "-30px 0px" }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent container that staggers entrance of its child items with fluid pacing
 */
interface StaggerGridProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  viewportAmount?: number;
}

export function StaggerGrid({
  children,
  id,
  className,
  delay = 0,
  staggerDelay = 0.08,
  viewportAmount = 0.1,
}: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount, margin: "-40px 0px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual card/box element inside a StaggerGrid
 */
interface FadeInCardProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export function FadeInCard({
  children,
  className,
  yOffset = 22,
  duration = 0.65,
}: FadeInCardProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Pop-in scale animation for metric numbers, credentials, and stat badges
 */
interface ScaleInBadgeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scaleFrom?: number;
}

export function ScaleInBadge({
  children,
  className,
  delay = 0,
  scaleFrom = 0.9,
}: ScaleInBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: scaleFrom, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Section Header Animation lockup (Eyebrow -> Heading -> Description)
 */
interface SectionHeaderRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionHeaderReveal({
  children,
  className = "text-center max-w-2xl mx-auto mb-12",
  delay = 0,
}: SectionHeaderRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-40px 0px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Backward Compatibility Aliases for Existing Imports
// ─────────────────────────────────────────────────────────────────────────────
export default function AnimatedSection(props: FadeInSectionProps) {
  return <FadeInSection {...props} />;
}

export function StaggerContainer(props: StaggerGridProps) {
  return <StaggerGrid {...props} />;
}

export function StaggerItem(props: FadeInCardProps) {
  return <FadeInCard {...props} />;
}
