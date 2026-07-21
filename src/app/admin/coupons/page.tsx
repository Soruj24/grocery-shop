"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Ticket, Percent, DollarSign } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { AdminCoupon } from "@/types/admin";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coupons")
      .then((r) => r.json())
      .then((d) => setCoupons(Array.isArray(d) ? d : d.coupons || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "code", label: "Code", sortable: true, render: (item: AdminCoupon) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30"><Ticket className="h-4 w-4 text-emerald-500" /></div>
        <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{item.code}</span>
      </div>
    )},
    { key: "discountType", label: "Type", render: (item: AdminCoupon) => (
      <span className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
        {item.discountType === "percentage" ? <Percent className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
        {item.discountType === "percentage" ? `${item.discountValue}%` : `৳${item.discountValue}`}
      </span>
    )},
    { key: "minOrderAmount", label: "Min. Order", sortable: true, render: (item: AdminCoupon) => <span className="text-xs text-gray-500">৳{item.minOrderAmount}</span> },
    { key: "usedCount", label: "Used", sortable: true, render: (item: AdminCoupon) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.usedCount}{item.usageLimit ? `/${item.usageLimit}` : ""}</span> },
    { key: "expiryDate", label: "Expires", sortable: true, render: (item: AdminCoupon) => {
      const expired = new Date(item.expiryDate) < new Date();
      return <span className={`text-xs ${expired ? "text-red-500" : "text-gray-500"}`}>{new Date(item.expiryDate).toLocaleDateString()}</span>;
    }},
    { key: "isActive", label: "Status", render: (item: AdminCoupon) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</span>
    )},
    { key: "actions", label: "", render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Coupons" description="Create and manage discount codes."
        actions={<button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"><Plus className="h-4 w-4" /> Add Coupon</button>}
      />
      <DataTable columns={columns} data={coupons} searchable searchKeys={["code"]} searchPlaceholder="Search coupons..." />
    </div>
  );
}
