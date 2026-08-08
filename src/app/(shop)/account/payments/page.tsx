"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Plus,
  Trash2,
  Smartphone,
  Shield,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "bkash" | "nagad" | "card";
  name: string;
  last4?: string;
  isDefault: boolean;
}

const defaultMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "bkash",
    name: "bKash",
    last4: "1234",
    isDefault: true,
  },
  {
    id: "2",
    type: "nagad",
    name: "Nagad",
    last4: "5678",
    isDefault: false,
  },
];

export default function PaymentsPage() {
  const [methods, setMethods] =
    useState<PaymentMethod[]>(defaultMethods);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: "bkash" as "bkash" | "nagad" | "card",
    number: "",
    name: "",
  });

  const handleAdd = () => {
    if (!form.number || !form.name) return;
    setMethods((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: form.type,
        name: form.name,
        last4: form.number.slice(-4),
        isDefault: prev.length === 0,
      },
    ]);
    setForm({ type: "bkash", number: "", name: "" });
    setShowForm(false);
  };

  const handleDelete = (id: string) =>
    setMethods((prev) =>
      prev.filter((m) => m.id !== id)
    );

  const handleSetDefault = (id: string) =>
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );

  const typeConfig: Record<
    string,
    {
      icon: React.ElementType;
      color: string;
      bg: string;
    }
  > = {
    bkash: {
      icon: Smartphone,
      color: "text-pink-500",
      bg: "bg-pink-500/[0.06]",
    },
    nagad: {
      icon: Smartphone,
      color: "text-orange-500",
      bg: "bg-orange-500/[0.06]",
    },
    card: {
      icon: CreditCard,
      color: "text-blue-500",
      bg: "bg-blue-500/[0.06]",
    },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Payment Methods
          </h1>
          <p className="text-sm text-muted-foreground/50 mt-1">
            {methods.length} saved methods
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Method
        </button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">
                  Add Payment Method
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-[11px] text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
              <div className="flex gap-2">
                {(["bkash", "nagad", "card"] as const).map(
                  (t) => {
                    const cfg = typeConfig[t];
                    return (
                      <button
                        key={t}
                        onClick={() =>
                          setForm({ ...form, type: t })
                        }
                        className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[11px] font-semibold transition-all ${
                          form.type === t
                            ? "border-foreground/20 bg-foreground text-background"
                            : "border-black/[0.06] dark:border-white/[0.06] text-muted-foreground/60 hover:border-foreground/10"
                        }`}
                      >
                        <cfg.icon className="h-3.5 w-3.5" />{" "}
                        {t.charAt(0).toUpperCase() +
                          t.slice(1)}
                      </button>
                    );
                  }
                )}
              </div>
              <input
                placeholder="Account/Card Number *"
                value={form.number}
                onChange={(e) =>
                  setForm({
                    ...form,
                    number: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
              />
              <input
                placeholder="Account Holder Name *"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
              />
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40">
                <Shield className="h-3 w-3" /> Your
                payment info is encrypted and secure
              </div>
              <button
                onClick={handleAdd}
                disabled={!form.number || !form.name}
                className="w-full rounded-xl bg-foreground py-2.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-30 transition-all active:scale-[0.98]"
              >
                Save Method
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {methods.map((method, i) => {
          const cfg = typeConfig[method.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={`rounded-2xl border p-4 flex items-center gap-4 transition-all ${
                method.isDefault
                  ? "border-foreground/15 bg-foreground/[0.02] dark:bg-foreground/[0.02] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  : "border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${cfg.bg}`}
              >
                <Icon
                  className={`h-5 w-5 ${cfg.color}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">
                  {method.name}
                </p>
                <p className="text-[11px] text-muted-foreground/40">
                  **** {method.last4}
                </p>
              </div>
              {method.isDefault && (
                <span className="text-[10px] font-bold bg-foreground/[0.06] text-foreground px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
              <div className="flex items-center gap-3">
                {!method.isDefault && (
                  <button
                    onClick={() =>
                      handleSetDefault(method.id)
                    }
                    className="text-[11px] font-semibold text-foreground hover:underline"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() =>
                    handleDelete(method.id)
                  }
                  className="p-1.5 rounded-lg text-muted-foreground/30 hover:bg-rose-500/[0.06] hover:text-rose-500 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
