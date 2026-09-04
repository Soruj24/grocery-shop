"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  AlertCircle,
  Shield,
} from "lucide-react";
import {
  type PaymentMethod,
  PAYMENT_METHODS,
} from "@/types/checkout";
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
  const selected = PAYMENT_METHODS.find(
    (m) => m.id === selectedMethod
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="space-y-4"
    >
      {/* Payment Methods */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <CreditCard className="h-4.5 w-4.5 text-muted-foreground/60" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("select_payment")}
              </h3>
              <p className="text-[10px] text-muted-foreground/50">
                Choose how you&apos;d like to pay
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {PAYMENT_METHODS.map((method) => {
            const Icon = iconMap[method.icon] || CreditCard;
            const isSelected = selectedMethod === method.id;

            return (
              <motion.div
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  onSelectMethod(method.id as PaymentMethod)
                }
                className={`relative cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? "border-foreground bg-subtle shadow-xs"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isSelected
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground/60"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {method.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground/50 mt-0.5">
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

      {/* Transaction ID */}
      {selected?.requiresTransactionId && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs"
        >
          <div className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <AlertCircle className="h-4.5 w-4.5 text-muted-foreground/50" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {selected.name} Transaction ID
                </p>
                <p className="text-[11px] text-muted-foreground/50 mt-0.5">
                  After making payment, enter the
                  reference number below
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
                Transaction ID *
              </label>
              <input
                type="text"
                placeholder="e.g. 9A3B7C2D"
                value={transactionId}
                onChange={(e) =>
                  onTransactionIdChange(e.target.value)
                }
                className={`w-full rounded-xl border ${
                  error
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-border focus:border-foreground/20"
                } bg-subtle px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-foreground/10 outline-none transition-all`}
              />
              {error && (
                <p className="text-[11px] font-medium text-danger flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-rose-500" />
                  {error}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 py-2">
        <Shield className="w-3 h-3 text-muted-foreground/30" />
        <span className="text-[10px] text-muted-foreground/40 font-medium">
          {t("ssl_encrypted")} · {t("secure_payment_guarantee")}
        </span>
      </div>
    </motion.div>
  );
}
