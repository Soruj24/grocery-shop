"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ListTree } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { AdminCategory } from "@/types/admin";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(Array.isArray(d) ? d : d.categories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: "image", label: "",
      render: (item: AdminCategory) => (
        <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center"><ListTree className="h-4 w-4 text-gray-300" /></div>}
        </div>
      ),
    },
    {
      key: "name", label: "Category", sortable: true,
      render: (item: AdminCategory) => (
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
          <p className="text-[10px] text-gray-400">/{item.slug}</p>
        </div>
      ),
    },
    {
      key: "parentId", label: "Parent",
      render: (item: AdminCategory) => (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {item.parentId ? (typeof item.parentId === "object" ? item.parentId.name : "Has parent") : "—"}
        </span>
      ),
    },
    {
      key: "isActive", label: "Status",
      render: (item: AdminCategory) => (
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.isActive !== false ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-500"}`}>
          {item.isActive !== false ? <><Eye className="h-3 w-3" /> Active</> : <><EyeOff className="h-3 w-3" /> Inactive</>}
        </span>
      ),
    },
    {
      key: "actions", label: "",
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
          <button className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Categories" description="Organize your products into categories."
        actions={<button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"><Plus className="h-4 w-4" /> Add Category</button>}
      />
      <DataTable columns={columns} data={categories} searchable searchKeys={["name"]} searchPlaceholder="Search categories..." />
    </div>
  );
}
