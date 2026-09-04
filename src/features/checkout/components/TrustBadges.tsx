"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  Lock,
} from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "Secure Checkout",
    desc: "SSL encrypted",
  },
  {
    icon: RotateCcw,
    label: "Money Back",
    desc: "7-day return",
  },
  {
    icon: BadgeCheck,
    label: "Verified Seller",
    desc: "Trusted & verified",
  },
  {
    icon: Lock,
    label: "Data Protected",
    desc: "Privacy assured",
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.06,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="flex items-center gap-2.5 rounded-xl border border-border bg-subtle px-3 py-2.5"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <badge.icon className="h-4 w-4 text-muted-foreground/60" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-foreground truncate">
              {badge.label}
            </p>
            <p className="text-[9px] text-muted-foreground/50 truncate">
              {badge.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
