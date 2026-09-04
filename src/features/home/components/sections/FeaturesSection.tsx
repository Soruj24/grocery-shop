"use client";

import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCw,
  LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: Truck,
      title: t("feature_title_1"),
      desc: t("feature_desc_1"),
    },
    {
      icon: ShieldCheck,
      title: t("feature_title_2"),
      desc: t("feature_desc_2"),
    },
    {
      icon: Headphones,
      title: t("feature_title_3"),
      desc: t("feature_desc_3"),
    },
    {
      icon: RefreshCw,
      title: t("feature_title_6"),
      desc: t("feature_desc_6"),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background border-y border-border relative overflow-hidden">
      {/* Decorative Background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none dark:opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group cursor-default`}
              >
                <div
                  className={`w-18 h-18 rounded-2xl bg-muted text-foreground flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-9 h-9`}
                  />
                </div>

                <h3 className="font-bold text-foreground text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-[200px]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
