"use client";

import { useState } from "react";
import { RotateCcw, CheckCircle2, XCircle, Clock, Package } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const mockReturns = [
  { id: "RET-001", orderId: "ORD-8A3F2C", customer: "Rahim Uddin", item: "Fresh Mango 2kg", reason: "Damaged product", status: "approved", date: "2026-07-18", refund: 350 },
  { id: "RET-002", orderId: "ORD-5B7D1E", customer: "Karim Ahmed", item: "Basmati Rice 5kg", reason: "Wrong item delivered", status: "pending", date: "2026-07-20", refund: 650 },
  { id: "RET-003", orderId: "ORD-3C9A1F", customer: "Fatima Begum", item: "Dairy Milk 1L", reason: "Expired product", status: "rejected", date: "2026-07-15", refund: 120 },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  approved: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  rejected: { icon: XCircle, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
};

export default function ReturnsPage() {
  const [returns] = useState(mockReturns);

  const columns = [
    { key: "id", label: "Return ID", render: (item: typeof returns[0]) => <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white">{item.id}</span> },
    { key: "customer", label: "Customer", render: (item: typeof returns[0]) => <span className="text-sm font-medium text-gray-900 dark:text-white">{item.customer}</span> },
    { key: "item", label: "Product", render: (item: typeof returns[0]) => <span className="text-sm text-gray-600 dark:text-gray-400">{item.item}</span> },
    { key: "reason", label: "Reason", render: (item: typeof returns[0]) => <span className="text-xs text-gray-500">{item.reason}</span> },
    { key: "refund", label: "Refund", sortable: true, render: (item: typeof returns[0]) => <span className="text-sm font-bold text-gray-900 dark:text-white">৳{item.refund}</span> },
    { key: "status", label: "Status", render: (item: typeof returns[0]) => {
      const cfg = statusConfig[item.status];
      const Icon = cfg.icon;
      return <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}><Icon className="h-3 w-3" /> {item.status}</span>;
    }},
    { key: "date", label: "Date", sortable: true, render: (item: typeof returns[0]) => <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Returns" description="Manage return requests and refunds." />
      <DataTable columns={columns} data={returns} searchable searchKeys={["customer", "item", "orderId"]} searchPlaceholder="Search returns..." />
    </div>
  );
}
