"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section className="border-y border-border bg-muted/60 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-center gap-4 text-center">
          <span className="h-px w-12 bg-border" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
            {t("sponsored_brands")}
          </span>
          <span className="h-px w-12 bg-border" />
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {loop.map((brand, i) => (
              <div
                key={i}
                className="flex h-[4.5rem] min-w-[190px] items-center justify-center rounded-2xl border border-border bg-white px-8 shadow-xs transition-all duration-300 hover:border-primary/[0.12] hover:shadow-sm dark:bg-white/[0.02]"
              >
                <span className="text-base font-bold tracking-tight text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
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
