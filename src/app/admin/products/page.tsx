"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Package, Edit2, Trash2, Eye } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { AdminProduct } from "@/types/admin";

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/list")
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d : d.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: "image", label: "",
      render: (item: AdminProduct) => (
        <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
          {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center"><Package className="h-4 w-4 text-gray-300" /></div>}
        </div>
      ),
    },
    {
      key: "name", label: "Product", sortable: true,
      render: (item: AdminProduct) => (
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
          <p className="text-[10px] text-gray-400">{typeof item.category === "object" ? item.category?.name : item.category}</p>
        </div>
      ),
    },
    {
      key: "price", label: "Price", sortable: true,
      render: (item: AdminProduct) => (
        <div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">৳{item.price.toLocaleString()}</span>
          {item.discount ? <span className="ml-1.5 text-[10px] text-emerald-500 font-medium">-{item.discount}%</span> : null}
        </div>
      ),
    },
    {
      key: "stock", label: "Stock", sortable: true,
      render: (item: AdminProduct) => (
        <span className={`text-sm font-semibold ${item.stock < 10 ? "text-red-500" : item.stock < 30 ? "text-amber-500" : "text-emerald-500"}`}>
          {item.stock} {item.unit}
        </span>
      ),
    },
    {
      key: "isActive", label: "Status",
      render: (item: AdminProduct) => (
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
          {item.isActive ? "Active" : "Inactive"}
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
      <AdminPageHeader
        title="Products"
        description="Manage your product catalog."
        actions={
          <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        }
      />
      <DataTable
        columns={columns}
        data={products}
        searchable
        searchKeys={["name", "category"]}
        searchPlaceholder="Search products..."
      />
    </div>
  );
}
