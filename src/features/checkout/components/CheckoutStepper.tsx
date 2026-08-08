"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function CheckoutStepper({
  steps,
  currentStep,
  onStepClick,
}: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted =
          currentStep > step.number;
        const isCurrent =
          currentStep === step.number;
        const isClickable =
          isCompleted || isCurrent;

        return (
          <div
            key={step.number}
            className="flex items-center flex-1 last:flex-initial"
          >
            <button
              onClick={() =>
                isClickable &&
                onStepClick(step.number)
              }
              disabled={!isClickable}
              className={`flex items-center gap-2 transition-all ${
                isClickable
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.05 : 1,
                  backgroundColor: isCompleted
                    ? "var(--foreground)"
                    : isCurrent
                    ? "var(--foreground)"
                    : "rgba(0,0,0,0.04)",
                }}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  isCompleted || isCurrent
                    ? "text-background dark:text-[#09090b]"
                    : "text-muted-foreground/50 dark:text-white/30"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  step.number
                )}
              </motion.div>
              <div className="hidden sm:block">
                <p
                  className={`text-xs font-semibold ${
                    isCurrent
                      ? "text-foreground"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </button>

            {index < steps.length - 1 && (
              <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isCompleted
                      ? "100%"
                      : "0%",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="h-full bg-foreground"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
