"use client";

import { motion } from "framer-motion";
import { CreditCard, Smartphone, Banknote, Check, AlertCircle } from "lucide-react";
import { type PaymentMethod, PAYMENT_METHODS } from "@/types/checkout";
import { useLanguage } from "@/contexts/LanguageContext";

interface PaymentStepProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  transactionId: string;
  onTransactionIdChange: (id: string) => void;
  error?: string;
}

const iconMap: Record<string, React.ElementType> = {
  banknote: Banknote,
  smartphone: Smartphone,
  "credit-card": CreditCard,
};

export default function PaymentStep({
  selectedMethod,
  onSelectMethod,
  transactionId,
  onTransactionIdChange,
  error,
}: PaymentStepProps) {
  const { t } = useLanguage();
  const selected = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <CreditCard className="h-4 w-4 text-emerald-500" />
          {t("payment_method")}
        </h3>
        <div className="space-y-2">
          {PAYMENT_METHODS.map((method) => {
            const Icon = iconMap[method.icon] || CreditCard;
            const isSelected = selectedMethod === method.id;
            return (
              <motion.div
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMethod(method.id as PaymentMethod)}
                className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{method.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                      <Check className="h-3 w-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selected?.requiresTransactionId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
        >
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-white">
                Enter your {selected.name} transaction ID
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                After making payment, enter the transaction reference number
              </p>
            </div>
          </div>
          <input
            type="text"
            placeholder={`Transaction ID *`}
            value={transactionId}
            onChange={(e) => onTransactionIdChange(e.target.value)}
            className={`w-full rounded-xl border ${error ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </motion.div>
      )}
    </motion.div>
  );
}
