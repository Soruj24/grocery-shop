"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProductSpecification } from "@/types/product";

interface SpecificationsProps {
  specifications?: ProductSpecification[];
}

export default function Specifications({
  specifications,
}: SpecificationsProps) {
  const { t } = useLanguage();

  if (
    !specifications ||
    specifications.length === 0
  ) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground/60 font-medium">
          No specifications available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold text-foreground">
        Product Specifications
      </h3>
      <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04] rounded-xl border border-black/[0.04] dark:border-white/[0.04] overflow-hidden">
        {specifications.map((spec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: idx * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="flex items-center justify-between px-5 py-3.5 bg-white dark:bg-[#09090b] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-200"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {spec.label}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {spec.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
