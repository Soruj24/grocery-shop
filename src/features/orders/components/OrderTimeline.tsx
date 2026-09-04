"use client";

import { Check, Clock, Truck, Package, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderTimelineProps {
  currentStatus: string;
}

export default function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const { t } = useLanguage();

  const STAGES = [
    { id: "pending", label: t('timeline_order_received'), icon: Clock },
    { id: "processing", label: t('timeline_packing'), icon: Package },
    { id: "shipping", label: t('timeline_shipping'), icon: Truck },
    { id: "delivered", label: t('timeline_delivered'), icon: Home }
  ];

  const currentIndex = STAGES.findIndex(s => s.id === currentStatus);

  return (
    <div className="py-12 px-4">
      <div className="relative flex justify-between max-w-3xl mx-auto">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
        
        {/* Active Progress Line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-1000"
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
                  scale: isActive ? 1.1 : 1,
                }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 shadow-md ${
                  isActive ? "ring-4 ring-primary/20" : ""
                } ${isCompleted || isActive ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6 transition-colors" />
                )}

                {isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
                )}
              </motion.div>

              {/* Label */}
              <div className="text-center">
                <p className={`text-sm font-black transition-colors ${
                  isCompleted || isActive ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {stage.label}
                </p>
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1"
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
