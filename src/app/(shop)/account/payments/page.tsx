"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Plus, Trash2, Smartphone, Check, Shield } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "bkash" | "nagad" | "card";
  name: string;
  last4?: string;
  isDefault: boolean;
}

const defaultMethods: PaymentMethod[] = [
  { id: "1", type: "bkash", name: "bKash", last4: "1234", isDefault: true },
  { id: "2", type: "nagad", name: "Nagad", last4: "5678", isDefault: false },
];

export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(defaultMethods);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "bkash" as "bkash" | "nagad" | "card", number: "", name: "" });

  const handleAdd = () => {
    if (!form.number || !form.name) return;
    setMethods((prev) => [...prev, { id: Date.now().toString(), type: form.type, name: form.name, last4: form.number.slice(-4), isDefault: prev.length === 0 }]);
    setForm({ type: "bkash", number: "", name: "" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => setMethods((prev) => prev.filter((m) => m.id !== id));

  const handleSetDefault = (id: string) => setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));

  const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    bkash: { icon: Smartphone, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950/30" },
    nagad: { icon: Smartphone, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30" },
    card: { icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{methods.length} saved methods</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
          <Plus className="h-4 w-4" /> Add Method
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Add Payment Method</h3>
                <button onClick={() => setShowForm(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
              <div className="flex gap-2">
                {(["bkash", "nagad", "card"] as const).map((t) => {
                  const cfg = typeConfig[t];
                  return (
                    <button key={t} onClick={() => setForm({ ...form, type: t })} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${form.type === t ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "border-gray-200 dark:border-gray-700 text-gray-500"}`}>
                      <cfg.icon className="h-3.5 w-3.5" /> {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  );
                })}
              </div>
              <input placeholder="Account/Card Number *" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
              <input placeholder="Account Holder Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <Shield className="h-3 w-3" /> Your payment info is encrypted and secure
              </div>
              <button onClick={handleAdd} disabled={!form.number || !form.name} className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors">
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
            <motion.div key={method.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`rounded-2xl border-2 p-4 flex items-center gap-4 transition-all ${method.isDefault ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"}`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cfg.bg}`}>
                <Icon className={`h-6 w-6 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{method.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">**** {method.last4}</p>
              </div>
              {method.isDefault && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">Default</span>}
              <div className="flex items-center gap-2">
                {!method.isDefault && <button onClick={() => handleSetDefault(method.id)} className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline">Set Default</button>}
                <button onClick={() => handleDelete(method.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
