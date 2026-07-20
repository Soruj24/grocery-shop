"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getComboOffers } from "@/constants/combo-offers-data";
import ComboOfferCard from "./ComboOfferCard";

export default function ComboOffers() {
  const { t } = useLanguage();
  const combos = getComboOffers(t);

  return (
    <section className="relative py-8 px-4 overflow-hidden bg-subtle">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-info/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-info-subtle border border-info/20 text-info rounded-full text-xs font-black uppercase tracking-[0.2em]"
            >
              <Gift size={14} className="animate-bounce" />
              {t("combo_badge")}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-[1.1]"
            >
              {t("combo_title_1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-info via-accent to-accent">
                {t("combo_title_2")}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground font-medium leading-relaxed"
            >
              {t("combo_desc")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/products?category=combos"
              className="group flex items-center gap-4 bg-card border border-border px-10 py-5 rounded-2xl font-black text-foreground hover:bg-info hover:text-info-foreground hover:border-transparent transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              {t("see_all")} {t("combo_offers")}
              <div className="bg-info-subtle p-2 rounded-xl group-hover:bg-white/20 transition-colors">
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {combos.map((combo, idx) => (
            <ComboOfferCard key={combo.id} combo={combo} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
