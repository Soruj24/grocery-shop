"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, CreditCard, Headphones, LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
}

export default function Features() {
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: Truck,
      title: t('feature_title_1'),
      desc: t('feature_desc_1'),
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10"
    },
    {
      icon: ShieldCheck,
      title: t('feature_title_2'),
      desc: t('feature_desc_2'),
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-500/10"
    },
    {
      icon: Headphones,
      title: t('feature_title_6'),
      desc: t('feature_desc_6'),
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10"
    },
    {
      icon: CreditCard,
      title: t('feature_title_4'),
      desc: t('feature_desc_4'),
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-500/10"
    }
  ];

  return (
    <section className="py-8 lg:py-12 bg-white dark:bg-[#0B1120] border-y border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-6 rounded-3xl bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
