"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionShell } from "./SectionShell";

export default function BrandsStrip() {
  const { t } = useLanguage();

  const brands = [
    "FreshFarm",
    "OrganicCo",
    "DailyHarvest",
    "Nature's Best",
    "GreenLeaf",
    "PureRoot",
    "FarmToHome",
    "GoldenGrain",
    "SweetOrchard",
    "AquaFresh",
  ];

  const loop = [...brands, ...brands];

  return (
    <section className="border-y border-border bg-subtle py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-10 bg-border-strong" />
          <span className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">
            {t("sponsored_brands")}
          </span>
          <span className="h-px w-10 bg-border-strong" />
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {loop.map((brand, i) => (
              <div
                key={i}
                className="flex h-16 min-w-[180px] items-center justify-center rounded-2xl border border-border bg-card px-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <span className="text-lg font-black tracking-tight text-foreground/80">
                  {brand}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
