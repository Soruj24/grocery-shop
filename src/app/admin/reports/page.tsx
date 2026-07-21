"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatCard from "@/features/admin/shared/StatCard";

const periodData = [
  { label: "Today", revenue: "৳24,500", orders: 42, avg: "৳583", change: 12.5 },
  { label: "This Week", revenue: "৳1,45,200", orders: 248, avg: "৳585", change: 8.3 },
  { label: "This Month", revenue: "৳5,23,800", orders: 892, avg: "৳587", change: 15.7 },
  { label: "This Year", revenue: "৳62,45,000", orders: 10840, avg: "৳576", change: 22.1 },
];

const topProducts = [
  { name: "Fresh Mango 2kg", sold: 342, revenue: "৳1,19,700" },
  { name: "Basmati Rice 5kg", sold: 256, revenue: "৳1,66,400" },
  { name: "Dairy Milk 1L", sold: 198, revenue: "৳23,760" },
  { name: "Chicken Breast 1kg", sold: 176, revenue: "৳70,400" },
  { name: "Organic Eggs 12pc", sold: 165, revenue: "৳41,250" },
];

const categoryRevenue = [
  { name: "Fresh Produce", percentage: 35, color: "bg-emerald-500" },
  { name: "Dairy & Eggs", percentage: 25, color: "bg-blue-500" },
  { name: "Meat & Fish", percentage: 20, color: "bg-violet-500" },
  { name: "Pantry", percentage: 12, color: "bg-amber-500" },
  { name: "Beverages", percentage: 8, color: "bg-rose-500" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader title="Reports" description="Business analytics and performance insights."
        actions={<button className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Download className="h-4 w-4" /> Export</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Revenue" value="৳62.45L" change={22.1} icon={DollarSign} color="from-emerald-500 to-emerald-600" />
        <StatCard title="Total Orders" value="10,840" change={18.5} icon={ShoppingCart} color="from-blue-500 to-blue-600" />
        <StatCard title="Customers" value="3,420" change={12.3} icon={Users} color="from-violet-500 to-violet-600" />
        <StatCard title="Avg Order" value="৳576" change={5.8} icon={Package} color="from-amber-500 to-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
          <div className="space-y-3">
            {periodData.map((p) => (
              <div key={p.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div><p className="text-xs text-gray-400">{p.label}</p><p className="text-lg font-bold text-gray-900 dark:text-white">{p.revenue}</p></div>
                <div className="text-right"><p className="text-xs text-gray-400">{p.orders} orders</p><p className="text-xs font-semibold text-emerald-500">↑ {p.change}%</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500">#{i + 1}</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                </div>
                <div className="text-right"><p className="text-xs text-gray-400">{p.sold} sold</p><p className="text-xs font-semibold text-gray-900 dark:text-white">{p.revenue}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-5">Revenue by Category</h3>
        <div className="w-full h-4 rounded-full bg-gray-100 dark:bg-gray-800 flex overflow-hidden mb-4">
          {categoryRevenue.map((c) => (
            <motion.div key={c.name} initial={{ width: 0 }} animate={{ width: `${c.percentage}%` }} transition={{ duration: 1, delay: 0.2 }} className={`h-full ${c.color}`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {categoryRevenue.map((c) => (
            <div key={c.name} className="flex items-center gap-2"><div className={`h-2.5 w-2.5 rounded-full ${c.color}`} /><span className="text-xs text-gray-500">{c.name} ({c.percentage}%)</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
