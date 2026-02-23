"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, CreditCard, Headphones, LucideIcon, RefreshCw, Lock } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

export default function Features() {
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: Truck,
      title: t('feature_title_1'),
      desc: t('feature_desc_1'),
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "group-hover:border-blue-200 dark:group-hover:border-blue-500/30"
    },
    {
      icon: ShieldCheck,
      title: t('feature_title_2'),
      desc: t('feature_desc_2'),
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-500/10",
      border: "group-hover:border-green-200 dark:group-hover:border-green-500/30"
    },
    {
      icon: Headphones,
      title: t('feature_title_3'), // 24/7 Support
      desc: t('feature_desc_3'),
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "group-hover:border-purple-200 dark:group-hover:border-purple-500/30"
    },
    {
      icon: RefreshCw,
      title: t('feature_title_6'), // Easy Return
      desc: t('feature_desc_6'),
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      border: "group-hover:border-orange-200 dark:group-hover:border-orange-500/30"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-[#0B1120] border-y border-gray-100 dark:border-white/5 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`flex flex-col items-center text-center p-8 rounded-[32px] bg-gray-50/50 dark:bg-white/5 border border-transparent ${feature.border} transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:-translate-y-2 group cursor-default`}
              >
                <div className={`w-20 h-20 rounded-full ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  <Icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">
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
