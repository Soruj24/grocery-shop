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

export default function OrderTrackingTimeline({
  steps,
  currentStepIndex,
  updatedAt,
  t,
}: OrderTrackingTimelineProps) {
  return (
    <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-xs">
      <div className="space-y-8">
        {steps.map((step, index) => {
          const isCompleted =
            index <= currentStepIndex;
          const isCurrent =
            index === currentStepIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className="relative flex gap-5"
            >
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-5 top-10 w-0.5 h-12 transition-colors duration-500 ${
                    index < currentStepIndex
                      ? "bg-foreground"
                      : "bg-muted"
                  }`}
                />
              )}
              <div
                className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isCompleted
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground/50"
                } ${isCurrent ? "scale-110 ring-4 ring-foreground/[0.08]" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 pt-1">
                <h3
                  className={`text-sm font-bold transition-colors ${
                    isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </h3>
                <p
                  className={`text-xs font-medium transition-colors ${
                    isCompleted
                      ? "text-muted-foreground/60"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {step.desc}
                </p>
                {isCurrent && updatedAt && (
                  <p className="text-[10px] font-semibold text-foreground mt-1.5 bg-muted px-2.5 py-1 rounded inline-block">
                    {t("last_updated")}:{" "}
                    {new Date(
                      updatedAt
                    ).toLocaleTimeString(
                      "bn-BD"
                    )}
                  </p>
                )}
              </div>
              {isCompleted && (
                <div className="hidden md:flex items-center gap-1.5 text-muted-foreground/50">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                    {t("completed")}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
