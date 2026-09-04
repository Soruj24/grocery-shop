"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
  description?: string;
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
    <div className="flex items-center justify-between gap-1 sm:gap-2">
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
              className={`flex items-center gap-2 sm:gap-3 transition-all min-h-[44px] ${
                isClickable
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1 : 1,
                }}
                className={`relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-foreground text-background"
                    : isCurrent
                    ? "bg-foreground text-background shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                    : "bg-muted text-muted-foreground/50"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <span>{step.number}</span>
                )}
                {isCurrent && (
                  <motion.div
                    layoutId="step-pulse"
                    className="absolute inset-0 rounded-xl border-2 border-foreground/20"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Step Label - hidden on very small screens */}
              <div className="hidden sm:block">
                <p
                  className={`text-xs font-semibold transition-colors ${
                    isCurrent
                      ? "text-foreground"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p
                    className={`text-[10px] transition-colors ${
                      isCurrent
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </button>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="mx-1.5 sm:mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isCompleted
                      ? "100%"
                      : isCurrent
                      ? "50%"
                      : "0%",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.21, 0.47, 0.32, 0.98],
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
