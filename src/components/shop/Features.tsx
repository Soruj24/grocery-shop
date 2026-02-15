"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, CreditCard, Leaf, Headphones } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function Features() {
  const { t } = useLanguage();

  const FEATURES = [
    {
      icon: Truck,
      title: t('feature_title_1'),
      description: t('feature_desc_1'),
      color: "bg-blue-500",
      lightColor: "bg-blue-50 dark:bg-blue-500/10",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: ShieldCheck,
      title: t('feature_title_2'),
      description: t('feature_desc_2'),
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50 dark:bg-emerald-500/10",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Clock,
      title: t('feature_title_3'),
      description: t('feature_desc_3'),
      color: "bg-amber-500",
      lightColor: "bg-amber-50 dark:bg-amber-500/10",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      icon: CreditCard,
      title: t('feature_title_4'),
      description: t('feature_desc_4'),
      color: "bg-purple-500",
      lightColor: "bg-purple-50 dark:bg-purple-500/10",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Leaf,
      title: t('feature_title_5'),
      description: t('feature_desc_5'),
      color: "bg-green-500",
      lightColor: "bg-green-50 dark:bg-green-500/10",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Headphones,
      title: t('feature_title_6'),
      description: t('feature_desc_6'),
      color: "bg-rose-500",
      lightColor: "bg-rose-50 dark:bg-rose-500/10",
      textColor: "text-rose-600 dark:text-rose-400"
    }
  ];

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900 rounded-[32px] my-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className={`w-14 h-14 ${feature.lightColor} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.textColor}`} />
              </div>
              <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 mb-1">
                {feature.title}
              </h3>
              <p className="text-[10px] text-gray-400 leading-tight">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
