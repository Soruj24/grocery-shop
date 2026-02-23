"use client";

import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { motion } from "framer-motion";

export default function ProductHighlights() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: ShieldCheck,
      title: t('authentic_product'),
      desc: t('sourced_from_source'),
    },
    {
      icon: Truck,
      title: t('fast_delivery'),
      desc: t('delivery_within_24h'),
    },
    { icon: RefreshCcw, title: t('return_policy_7_days'), desc: t('easy_return_policy') },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-gray-100 dark:border-gray-800">
      {highlights.map((item, idx) => (
        <motion.div 
          key={idx} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-3 group cursor-default"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl text-green-600 dark:text-green-500 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors"
          >
            <item.icon className="w-5 h-5" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
              {item.title}
            </span>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
              {item.desc}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
