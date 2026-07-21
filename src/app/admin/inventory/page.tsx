"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Boxes, AlertTriangle, Package, TrendingDown, ArrowUpDown, Edit2 } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatCard from "@/features/admin/shared/StatCard";
import { AdminProduct } from "@/types/admin";

export default function InventoryPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/list")
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d : d.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const lowStock = products.filter((p) => p.stock < 10);
  const inStock = products.filter((p) => p.stock >= 10);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const columns = [
    { key: "name", label: "Product", sortable: true, render: (item: AdminProduct) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
          {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center"><Package className="h-4 w-4 text-gray-300" /></div>}
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
      </div>
    )},
    { key: "stock", label: "Stock", sortable: true, render: (item: AdminProduct) => (
      <div className="flex items-center gap-2">
        <span className={`text-sm font-bold ${item.stock < 10 ? "text-red-500" : item.stock < 30 ? "text-amber-500" : "text-emerald-500"}`}>{item.stock}</span>
        <span className="text-[10px] text-gray-400">{item.unit}</span>
      </div>
    )},
    { key: "price", label: "Cost", sortable: true, render: (item: AdminProduct) => <span className="text-sm text-gray-600 dark:text-gray-400">৳{item.price}</span> },
    { key: "stockValue", label: "Value", sortable: true, render: (item: AdminProduct) => <span className="text-sm font-semibold text-gray-900 dark:text-white">৳{(item.price * item.stock).toLocaleString()}</span> },
    { key: "status", label: "Status", render: (item: AdminProduct) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.stock === 0 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : item.stock < 10 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>
        {item.stock === 0 ? "Out of Stock" : item.stock < 10 ? "Low Stock" : "In Stock"}
      </span>
    )},
    { key: "actions", label: "", render: () => <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Edit2 className="h-3.5 w-3.5" /></button> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Inventory" description="Track and manage stock levels." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={products.length} icon={Boxes} color="from-blue-500 to-blue-600" />
        <StatCard title="In Stock" value={inStock.length} icon={Package} color="from-emerald-500 to-emerald-600" />
        <StatCard title="Low Stock" value={lowStock.length} icon={AlertTriangle} color="from-amber-500 to-amber-600" />
        <StatCard title="Inventory Value" value={`৳${totalValue.toLocaleString()}`} icon={TrendingDown} color="from-violet-500 to-violet-600" />
      </div>
      {lowStock.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
          <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-4 w-4 text-amber-500" /><p className="text-sm font-semibold text-amber-700 dark:text-amber-400">Low Stock Alert</p></div>
          <div className="flex flex-wrap gap-2">{lowStock.map((p) => <span key={p._id} className="text-xs bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-2 py-1 text-amber-700 dark:text-amber-400">{p.name} ({p.stock})</span>)}</div>
        </motion.div>
      )}
      <DataTable columns={columns} data={products} searchable searchKeys={["name"]} searchPlaceholder="Search inventory..." />
    </div>
  );
}
