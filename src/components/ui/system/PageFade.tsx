"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "./types";

/**
 * Subtle page-level entrance: quick fade with a small rise.
 * Plays once per mount (i.e. on every App Router navigation).
 * Disabled automatically when the user prefers reduced motion
 * (see `MotionConfig reducedMotion="user"` in Providers).
 */
export function PageFade({
  children,
  className,
  y = 8,
  duration = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: [0, 0, 0.2, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
PageFade.displayName = "PageFade";
