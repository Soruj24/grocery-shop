"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LucideIcon } from "lucide-react";

interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface CheckoutStepperProps {
  currentStep: number;
  steps: Step[];
}

export default function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto relative px-4">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0 rounded-full" />
      <motion.div className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5 }} />
      {steps.map((step) => (
        <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
          <motion.div
            animate={{ scale: currentStep === step.id ? 1.2 : 1, backgroundColor: currentStep >= step.id ? "#16a34a" : "#fff", color: currentStep >= step.id ? "#fff" : "#94a3b8" }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg transition-colors border-4 border-border ${currentStep >= step.id ? "border-primary-subtle" : "border-card"}`}>
            {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
          </motion.div>
          <span className={`text-[10px] font-black uppercase tracking-widest hidden md:block ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}>
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
}
