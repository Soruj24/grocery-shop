"use client";

import { Check, Clock, Truck, Package, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

interface OrderTimelineProps {
  currentStatus: string;
}

export default function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const { t } = useLanguage();

  const STAGES = [
    { id: "pending", label: t('timeline_order_received'), icon: Clock, color: "bg-amber-500" },
    { id: "processing", label: t('timeline_packing'), icon: Package, color: "bg-blue-500" },
    { id: "shipping", label: t('timeline_shipping'), icon: Truck, color: "bg-indigo-500" },
    { id: "delivered", label: t('timeline_delivered'), icon: Home, color: "bg-green-500" }
  ];

  const currentIndex = STAGES.findIndex(s => s.id === currentStatus);

  return (
    <div className="py-12 px-4">
      <div className="relative flex justify-between max-w-3xl mx-auto">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-white/5 -translate-y-1/2 rounded-full" />
        
        {/* Active Progress Line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-1000"
        />

        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="relative flex flex-col items-center gap-4 group">
              {/* Node */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isCompleted || isActive ? "rgb(34, 197, 94)" : "rgb(243, 244, 246)"
                }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 shadow-xl ${
                  isActive ? "ring-4 ring-green-500/20" : ""
                } ${!isCompleted && !isActive ? "dark:bg-white/5" : ""}`}
              >
                {isCompleted ? (
                  <Check className="text-white w-6 h-6" />
                ) : (
                  <Icon className={`${isActive ? "text-white" : "text-gray-400"} w-6 h-6 transition-colors`} />
                )}

                {isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
                )}
              </motion.div>

              {/* Label */}
              <div className="text-center">
                <p className={`text-sm font-black transition-colors ${
                  isCompleted || isActive ? "text-gray-900 dark:text-white" : "text-gray-400"
                }`}>
                  {stage.label}
                </p>
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1"
                  >
                    {t('timeline_in_progress')}
                  </motion.p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
