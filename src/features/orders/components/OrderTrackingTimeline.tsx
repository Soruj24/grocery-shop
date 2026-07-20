
import { CheckCircle2 } from "lucide-react";
import { TranslationKey } from "@/constants/translations";

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
    <div className="bg-card backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-border shadow-xl">
      <div className="space-y-12">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="relative flex gap-8 group">
              {index !== steps.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-16 transition-colors duration-500 ${index < currentStepIndex ? "bg-primary" : "bg-border"}`} />
              )}
              <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${isCompleted ? "bg-primary text-primary-foreground shadow-lg shadow-primary" : "bg-muted text-muted-foreground"} ${isCurrent ? "scale-125 ring-4 ring-primary/10" : ""}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className={`text-lg font-black transition-colors ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</h3>
                <p className={`text-sm font-bold transition-colors ${isCompleted ? "text-muted-foreground" : "text-muted-foreground"}`}>{step.desc}</p>
                {isCurrent && updatedAt && (
                  <p className="text-xs text-primary font-black mt-2 bg-primary-subtle px-3 py-1 rounded-lg inline-block">
                    {t("last_updated")}: {new Date(updatedAt).toLocaleTimeString("bn-BD")}
                  </p>
                )}
              </div>
              {isCompleted && (
                <div className="hidden md:flex items-center gap-2 text-primary">
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
