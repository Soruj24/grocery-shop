"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProductSpecification } from "@/types/product";

interface SpecificationsProps {
  specifications?: ProductSpecification[];
}

export default function Specifications({ specifications }: SpecificationsProps) {
  const { t } = useLanguage();

  if (!specifications || specifications.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-bold">No specifications available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-foreground">Product Specifications</h3>
      <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
        {specifications.map((spec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="flex items-center justify-between px-6 py-4 bg-card hover:bg-muted/30 transition-colors"
          >
            <span className="text-sm font-bold text-muted-foreground">{spec.label}</span>
            <span className="text-sm font-black text-foreground">{spec.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
