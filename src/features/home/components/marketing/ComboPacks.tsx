"use client";

import { Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useCombos } from "@/features/home/hooks/useCombos";
import ComboPackCard from "./ComboPackCard";
import { Spinner } from "@/components/ui";

export default function ComboPacks() {
  const { t } = useLanguage();
  const { combos, loading } = useCombos();

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (combos.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden bg-subtle">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-info/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-subtle text-accent-subtle-foreground rounded-full text-xs font-black uppercase tracking-widest"
          >
            <Package size={14} className="animate-bounce" />
            <span>{t("combo_packs_badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight"
          >
            {t("combo_packs_title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-info">
              {t("combo_packs_title_accent")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            {t("combo_packs_desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {combos.map((combo, idx) => (
            <ComboPackCard key={combo._id} combo={combo} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
