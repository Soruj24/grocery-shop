"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  type PaymentMethod,
  PAYMENT_METHODS,
} from "@/types/checkout";
import { useLanguage } from "@/contexts/LanguageContext";

interface PaymentStepProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (
    method: PaymentMethod
  ) => void;
  transactionId: string;
  onTransactionIdChange: (id: string) => void;
  error?: string;
}

const iconMap: Record<
  string,
  React.ElementType
> = {
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
  const selected = PAYMENT_METHODS.find(
    (m) => m.id === selectedMethod
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <CreditCard className="h-4 w-4 text-muted-foreground/60" />
          {t("payment_method")}
        </h3>
        <div className="space-y-2">
          {PAYMENT_METHODS.map((method) => {
            const Icon =
              iconMap[method.icon] ||
              CreditCard;
            const isSelected =
              selectedMethod === method.id;
            return (
              <motion.div
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  onSelectMethod(
                    method.id as PaymentMethod
                  )
                }
                className={`relative cursor-pointer rounded-lg border p-3 transition-all ${
                  isSelected
                    ? "border-foreground bg-black/[0.02] dark:bg-white/[0.04]"
                    : "border-black/[0.04] dark:border-white/[0.04] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isSelected
                        ? "bg-foreground text-background"
                        : "bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground/60"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {method.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground/50">
                      {method.description}
                    </p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground"
                    >
                      <Check className="h-3 w-3 text-background" />
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
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">
                Enter your{" "}
                {selected.name} transaction
                ID
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                After making payment, enter
                the transaction reference
                number
              </p>
            </div>
          </div>
          <input
            type="text"
            placeholder={`Transaction ID *`}
            value={transactionId}
            onChange={(e) =>
              onTransactionIdChange(
                e.target.value
              )
            }
            className={`w-full rounded-lg border ${
              error
                ? "border-rose-500"
                : "border-black/[0.04] dark:border-white/[0.04]"
            } bg-black/[0.02] dark:bg-white/[0.03] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 outline-none transition-colors`}
          />
          {error && (
            <p className="mt-1 text-xs text-rose-500">
              {error}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
