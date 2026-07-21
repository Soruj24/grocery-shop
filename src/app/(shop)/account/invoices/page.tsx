"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Search } from "lucide-react";

const mockInvoices = [
  { id: "INV-001", orderId: "ORD-8A3F2C", date: "2026-07-15", total: 1250, status: "paid", items: 3 },
  { id: "INV-002", orderId: "ORD-5B7D1E", date: "2026-07-10", total: 890, status: "paid", items: 2 },
  { id: "INV-003", orderId: "ORD-3C9A1F", date: "2026-07-05", total: 2100, status: "paid", items: 5 },
];

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const filtered = mockInvoices.filter((inv) =>
    inv.id.toLowerCase().includes(search.toLowerCase()) ||
    inv.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and download your invoices</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input type="text" placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No invoices found</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Invoice</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Order</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Date</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Items</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Total</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((inv, i) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white">{inv.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{inv.orderId}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(inv.date).toLocaleDateString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{inv.items}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">৳{inv.total.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-emerald-50 hover:text-emerald-500 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
