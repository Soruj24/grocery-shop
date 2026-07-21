"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Package, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const mockReturns = [
  { id: "RET-001", orderId: "ORD-8A3F2C", item: "Fresh Mango 2kg", reason: "Damaged product", status: "approved", date: "2026-07-18", refund: 350 },
  { id: "RET-002", orderId: "ORD-5B7D1E", item: "Basmati Rice 5kg", reason: "Wrong item", status: "pending", date: "2026-07-20", refund: 650 },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  approved: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  rejected: { icon: XCircle, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
};

export default function ReturnsPage() {
  const [returns] = useState(mockReturns);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Returns</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your return requests</p>
      </div>

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Return Policy</p>
          <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-0.5">Items can be returned within 7 days of delivery. Perishable items are not eligible for return.</p>
        </div>
      </div>

      {returns.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <RotateCcw className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No return requests</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You haven&apos;t requested any returns</p>
        </div>
      ) : (
        <div className="space-y-3">
          {returns.map((ret, i) => {
            const cfg = statusConfig[ret.status] || statusConfig.pending;
            const Icon = cfg.icon;
            return (
              <motion.div key={ret.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${cfg.bg}`}>
                      <Icon className={`h-4 w-4 ${cfg.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{ret.item}</p>
                      <p className="text-[10px] text-gray-400">{ret.id} • Order: {ret.orderId}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{ret.status}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>Reason: {ret.reason}</span>
                  <span>Refund: ৳{ret.refund}</span>
                  <span>{new Date(ret.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
