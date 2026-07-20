"use client";

import {
  CreditCard,
  ShoppingBag,
  Smartphone,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PaymentMethod } from "@/types/checkout";

interface PaymentStepProps {
  paymentMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  transactionId: string;
  onTransactionIdChange: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const methods: { id: PaymentMethod; icon: typeof CreditCard }[] = [
  { id: "cod", icon: ShoppingBag },
  { id: "bkash", icon: Smartphone },
  { id: "nagad", icon: Smartphone },
  { id: "card", icon: CreditCard },
];

export default function PaymentStep({
  paymentMethod,
  onMethodChange,
  transactionId,
  onTransactionIdChange,
  onNext,
  onPrev,
}: PaymentStepProps) {
  const { t } = useLanguage();

  const isValid =
    paymentMethod === "cod" || transactionId.trim().length >= 8;

  return (
    <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-accent-subtle rounded-lg flex items-center justify-center text-accent">
          <CreditCard className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-foreground">
          {t("payment_method")}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {methods.map((method) => {
          const Icon = method.icon;
          const isActive = paymentMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onMethodChange(method.id)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 text-center ${
                isActive
                  ? "border-primary bg-primary-subtle"
                  : "border-border bg-muted hover:border-border-strong"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-black text-[10px] uppercase tracking-wider">
                {t(`${method.id}_payment`)}
              </span>
            </button>
          );
        })}
      </div>

      {paymentMethod !== "cod" && (
        <div className="p-6 bg-foreground text-background rounded-xl space-y-4">
          <p className="text-xs font-bold opacity-70 italic text-center">
            {t("payment_instruction")}
          </p>
          <input
            type="text"
            placeholder={t("transaction_id_placeholder")}
            className="w-full px-6 py-4 bg-background/10 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-center"
            value={transactionId}
            onChange={(e) => onTransactionIdChange(e.target.value)}
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-muted text-muted-foreground py-6 rounded-lg font-black transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          {t("back_to_prev")}
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-[2] bg-primary hover:bg-primary-hover text-primary-foreground py-6 rounded-lg font-black text-xl transition-all flex items-center justify-center gap-4 shadow-primary disabled:opacity-50"
        >
          {t("next_step")}
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
