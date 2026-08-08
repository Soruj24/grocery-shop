"use client";

import {
  Truck,
  MapPin,
  Clock,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ShippingInfo() {
  const { t } = useLanguage();

  const items = [
    {
      icon: Truck,
      label: "Free Delivery",
      desc: "Orders over ৳500",
      color: "text-primary",
    },
    {
      icon: Clock,
      label: "Delivery Time",
      desc: "1-3 business days",
      color: "text-amber-500",
    },
    {
      icon: MapPin,
      label: "Coverage",
      desc: "All over Bangladesh",
      color: "text-sky-500",
    },
    {
      icon: Check,
      label: "Cash on Delivery",
      desc: "Pay when you receive",
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: idx * 0.04,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="flex items-center gap-3 bg-black/[0.02] dark:bg-white/[0.02] p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.04]"
        >
          <div
            className={`p-2 rounded-lg ${item.color} bg-opacity-[0.06]`}
          >
            <item.icon
              className={`w-4 h-4 ${item.color}`}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">
              {item.label}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/60">
              {item.desc}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
