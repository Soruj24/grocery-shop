"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, Package, ShoppingCart, TrendingUp, ArrowUpRight, DollarSign,
  BarChart3, Activity, Eye,
} from "lucide-react";
import StatCard from "@/features/admin/shared/StatCard";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { AdminOrder } from "@/types/admin";

const revenueData = [
  { month: "Jan", revenue: 42000, orders: 120 },
  { month: "Feb", revenue: 58000, orders: 165 },
  { month: "Mar", revenue: 65000, orders: 189 },
  { month: "Apr", revenue: 72000, orders: 210 },
  { month: "May", revenue: 89000, orders: 256 },
  { month: "Jun", revenue: 95000, orders: 278 },
  { month: "Jul", revenue: 108000, orders: 312 },
];

const categoryData = [
  { name: "Fruits", value: 35, color: "#10b981" },
  { name: "Vegetables", value: 25, color: "#3b82f6" },
  { name: "Dairy", value: 20, color: "#f59e0b" },
  { name: "Meat", value: 15, color: "#ef4444" },
  { name: "Other", value: 5, color: "#8b5cf6" },
];

const trafficData = [
  { day: "Mon", visitors: 1200, pageViews: 3400 },
  { day: "Tue", visitors: 1400, pageViews: 3800 },
  { day: "Wed", visitors: 1100, pageViews: 3100 },
  { day: "Thu", visitors: 1600, pageViews: 4200 },
  { day: "Fri", visitors: 1800, pageViews: 4800 },
  { day: "Sat", visitors: 2200, pageViews: 5600 },
  { day: "Sun", visitors: 1900, pageViews: 5100 },
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  shipped: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((d) => setOrders(Array.isArray(d) ? d : d.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { title: "Total Revenue", value: `৳${(108000).toLocaleString()}`, change: 12.5, changeLabel: "vs last month", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
    { title: "Total Orders", value: orders.length || "1,530", change: 8.2, changeLabel: "vs last month", icon: ShoppingCart, color: "from-blue-500 to-blue-600" },
    { title: "Total Customers", value: "2,845", change: 15.3, changeLabel: "vs last month", icon: Users, color: "from-violet-500 to-violet-600" },
    { title: "Conversion Rate", value: "3.2%", change: -0.5, changeLabel: "vs last month", icon: TrendingUp, color: "from-amber-500 to-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Welcome back. Here's what's happening with your store."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Monthly revenue and orders</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                formatter={(value, name) => [name === "revenue" ? `৳${Number(value).toLocaleString()}` : value, name === "revenue" ? "Revenue" : "Orders"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revenueGrad)" />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Sales by Category</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Top performing categories</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{cat.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Traffic + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Site Traffic</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Visitors and page views</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Visitors</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet-500" /> Page Views</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="visitors" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pageViews" fill="#8b5cf6" radius={[6, 6, 0, 0]} opacity={0.4} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Latest orders</p>
            </div>
            <a href="/admin/orders" className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3.5"><div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800 animate-pulse" /></div>
              ))
            ) : (
              orders.slice(0, 5).map((order) => (
                <div key={order._id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0">
                      <ShoppingCart className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono font-semibold text-gray-900 dark:text-white">#{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-[10px] text-gray-400 truncate">{order.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColors[order.status] || ""}`}>{order.status}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">৳{order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
