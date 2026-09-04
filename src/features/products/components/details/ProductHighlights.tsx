"use client";

import {
  ShieldCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function ProductHighlights() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: ShieldCheck,
      title: t("authentic_product"),
      desc: t("sourced_from_source"),
    },
    {
      icon: Truck,
      title: t("fast_delivery"),
      desc: t("delivery_within_24h"),
    },
    {
      icon: RefreshCcw,
      title: t("return_policy_7_days"),
      desc: t("easy_return_policy"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-7 border-y border-border">
      {highlights.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: idx * 0.08,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="flex items-center gap-3 group cursor-default"
        >
          <div className="p-2.5 rounded-xl bg-muted text-muted-foreground group-hover:bg-primary/[0.06] group-hover:text-primary transition-all duration-300">
            <item.icon className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {item.title}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground/60">
              {item.desc}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
