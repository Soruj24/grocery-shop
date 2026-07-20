"use client";

import { Check, Truck, Package, Clock, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderTrackingTimelineProps {
  status: string;
}

export default function OrderTrackingTimeline({ status }: OrderTrackingTimelineProps) {
  const { t } = useLanguage();
  const steps = [
    { id: 'pending', label: t('timeline_placed'), icon: Clock },
    { id: 'processing', label: t('timeline_processing'), icon: Package },
    { id: 'shipped', label: t('timeline_on_way'), icon: Truck },
    { id: 'delivered', label: t('timeline_delivered_past'), icon: ShieldCheck },
  ];

  const getCurrentStepIndex = () => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="py-8 px-4">
      <div className="relative flex justify-between items-center">
        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 -z-10"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3 bg-card px-4">
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? "bg-primary text-primary-foreground" 
                    : isActive 
                      ? "bg-primary text-primary-foreground shadow-primary scale-110" 
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
