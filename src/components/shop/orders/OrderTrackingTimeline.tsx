"use client";

import { CheckCircle2 } from "lucide-react";
import { TranslationKey } from "@/lib/translations";

interface Step {
  key: string;
  label: string;
  icon: React.ElementType;
  desc: string;
}

interface OrderTrackingTimelineProps {
  steps: Step[];
  currentStepIndex: number;
  updatedAt?: string;
  t: (key: TranslationKey) => string;
}

export default function OrderTrackingTimeline({ steps, currentStepIndex, updatedAt, t }: OrderTrackingTimelineProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[48px] border border-gray-100 dark:border-white/5 shadow-xl">
      <div className="space-y-12">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="relative flex gap-8 group">
              {index !== steps.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-16 transition-colors duration-500 ${index < currentStepIndex ? "bg-green-600" : "bg-gray-200 dark:bg-gray-800"}`} />
              )}
              <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${isCompleted ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "bg-gray-100 dark:bg-gray-800 text-gray-400"} ${isCurrent ? "scale-125 ring-4 ring-green-600/10" : ""}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className={`text-lg font-black transition-colors ${isCompleted ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>{step.label}</h3>
                <p className={`text-sm font-bold transition-colors ${isCompleted ? "text-gray-500 dark:text-gray-400" : "text-gray-500"}`}>{step.desc}</p>
                {isCurrent && updatedAt && (
                  <p className="text-xs text-green-600 font-black mt-2 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-lg inline-block">
                    {t("last_updated")}: {new Date(updatedAt).toLocaleTimeString("bn-BD")}
                  </p>
                )}
              </div>
              {isCompleted && (
                <div className="hidden md:flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">{t("completed")}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
