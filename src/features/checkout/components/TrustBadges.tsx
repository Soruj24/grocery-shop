"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RotateCcw, BadgeCheck, Lock } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "Secure Checkout",
    desc: "SSL encrypted",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: RotateCcw,
    label: "Money Back",
    desc: "7-day return",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: BadgeCheck,
    label: "Verified Seller",
    desc: "Trusted & verified",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: Lock,
    label: "SSL Encrypted",
    desc: "Data protected",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`flex items-center gap-2.5 rounded-xl border border-gray-100 dark:border-gray-800 ${badge.bg} px-3 py-2.5`}
        >
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${badge.bg}`}>
            <badge.icon className={`h-4 w-4 ${badge.color}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{badge.label}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{badge.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
