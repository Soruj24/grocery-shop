"use client";

import {
  CreditCard,
  ShoppingBag,
  Smartphone,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/providers/LanguageContext";
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
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600">
          <CreditCard className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
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
              className={`p-4 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 text-center ${
                isActive
                  ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-900 text-gray-300"
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
        <div className="p-6 bg-gray-900 text-white rounded-[32px] space-y-4">
          <p className="text-xs font-bold opacity-70 italic text-center">
            {t("payment_instruction")}
          </p>
          <input
            type="text"
            placeholder={t("transaction_id_placeholder")}
            className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all font-bold text-center"
            value={transactionId}
            onChange={(e) => onTransactionIdChange(e.target.value)}
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 py-6 rounded-[32px] font-black transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          {t("back_to_prev")}
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 disabled:opacity-50"
        >
          {t("next_step")}
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
