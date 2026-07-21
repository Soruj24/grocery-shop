"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "./types";
import { springSnappy } from "@/lib/motion";

interface SuccessAnimationProps {
  size?: number;
  className?: string;
}

export function SuccessAnimation({ size = 80, className }: SuccessAnimationProps) {
  const r = (size - 10) / 2;
  const circumference = 2 * Math.PI * r;
  const strokeW = 4;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...springSnappy, delay: 0.1 }}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeW}
          className="text-success/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="text-success"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{ transformOrigin: "center", rotate: -90 }}
        />
        <motion.path
          d={`M${size * 0.35} ${size * 0.5} L${size * 0.47} ${size * 0.62} L${size * 0.65} ${size * 0.38}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-success"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}
