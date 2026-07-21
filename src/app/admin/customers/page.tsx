"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, ShoppingBag, DollarSign, MoreHorizontal } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { AdminCustomer } from "@/types/admin";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then((d) => setCustomers(Array.isArray(d) ? d : d.customers || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "name", label: "Customer", sortable: true, render: (item: AdminCustomer) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{item.name?.charAt(0) || "U"}</div>
        <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p><p className="text-[10px] text-gray-400">{item.email}</p></div>
      </div>
    )},
    { key: "phone", label: "Phone", render: (item: AdminCustomer) => <span className="text-xs text-gray-500">{item.phone || "—"}</span> },
    { key: "orderCount", label: "Orders", sortable: true, render: (item: AdminCustomer) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.orderCount || 0}</span> },
    { key: "totalSpent", label: "Total Spent", sortable: true, render: (item: AdminCustomer) => <span className="text-sm font-bold text-gray-900 dark:text-white">৳{(item.totalSpent || 0).toLocaleString()}</span> },
    { key: "createdAt", label: "Joined", sortable: true, render: (item: AdminCustomer) => <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span> },
    { key: "actions", label: "", render: () => <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><MoreHorizontal className="h-4 w-4" /></button> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Customers" description="View and manage your customers." />
      <DataTable columns={columns} data={customers} searchable searchKeys={["name", "email", "phone"]} searchPlaceholder="Search customers..." />
    </div>
  );
}
