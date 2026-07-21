"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Tag } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const mockBrands = [
  { id: "1", name: "Fresh Farm", slug: "fresh-farm", productCount: 45, isActive: true },
  { id: "2", name: "Organic Valley", slug: "organic-valley", productCount: 32, isActive: true },
  { id: "3", name: "Premium Select", slug: "premium-select", productCount: 28, isActive: true },
  { id: "4", name: "Daily Fresh", slug: "daily-fresh", productCount: 18, isActive: false },
  { id: "5", name: "Green Life", slug: "green-life", productCount: 52, isActive: true },
];

export default function BrandsPage() {
  const [brands] = useState(mockBrands);

  const columns = [
    { key: "name", label: "Brand", sortable: true, render: (item: typeof brands[0]) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"><Tag className="h-4 w-4 text-gray-400" /></div>
        <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p><p className="text-[10px] text-gray-400">/{item.slug}</p></div>
      </div>
    )},
    { key: "productCount", label: "Products", sortable: true, render: (item: typeof brands[0]) => <span className="text-sm text-gray-600 dark:text-gray-400">{item.productCount}</span> },
    { key: "isActive", label: "Status", render: (item: typeof brands[0]) => (
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
      <AdminPageHeader title="Brands" description="Manage product brands and labels."
        actions={<button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"><Plus className="h-4 w-4" /> Add Brand</button>}
      />
      <DataTable columns={columns} data={brands} searchable searchKeys={["name"]} searchPlaceholder="Search brands..." />
    </div>
  );
}
