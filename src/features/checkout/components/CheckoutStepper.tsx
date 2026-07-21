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

export default function CheckoutStepper({ steps, currentStep, onStepClick }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;
        const isClickable = isCompleted || isCurrent;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-initial">
            <button
              onClick={() => isClickable && onStepClick(step.number)}
              disabled={!isClickable}
              className={`flex items-center gap-2 transition-all ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "#10b981"
                    : isCurrent
                    ? "#10b981"
                    : "#e5e7eb",
                }}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isCompleted || isCurrent ? "text-white" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
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
                      ? "text-emerald-600 dark:text-emerald-400"
                      : isCompleted
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </button>

            {index < steps.length - 1 && (
              <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="h-full bg-emerald-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
