"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye,
  ArrowUpRight, Globe, Monitor, Smartphone,
} from "lucide-react";
import StatCard from "@/features/admin/shared/StatCard";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 42000, profit: 12600 },
  { month: "Feb", revenue: 58000, profit: 17400 },
  { month: "Mar", revenue: 65000, profit: 19500 },
  { month: "Apr", revenue: 72000, profit: 21600 },
  { month: "May", revenue: 89000, profit: 26700 },
  { month: "Jun", revenue: 95000, profit: 28500 },
  { month: "Jul", revenue: 108000, profit: 32400 },
];

const topProducts = [
  { name: "Fresh Mango", sales: 450, revenue: 15750 },
  { name: "Basmati Rice", sales: 320, revenue: 20800 },
  { name: "Dairy Milk", sales: 280, revenue: 8400 },
  { name: "Chicken Breast", sales: 210, revenue: 18900 },
  { name: "Organic Eggs", sales: 190, revenue: 7600 },
];

const deviceData = [
  { name: "Desktop", value: 45, color: "#10b981" },
  { name: "Mobile", value: 40, color: "#3b82f6" },
  { name: "Tablet", value: 15, color: "#f59e0b" },
];

const hourlyOrders = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  orders: Math.floor(Math.random() * 30) + 5,
}));

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analytics"
        description="Detailed insights into your store's performance."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Page Views" value="25,847" change={18.2} icon={Eye} color="from-blue-500 to-blue-600" />
        <StatCard title="Unique Visitors" value="8,432" change={12.5} icon={Globe} color="from-emerald-500 to-emerald-600" />
        <StatCard title="Avg. Session" value="4m 32s" change={-2.1} icon={Monitor} color="from-violet-500 to-violet-600" />
        <StatCard title="Bounce Rate" value="32.5%" change={-5.3} icon={Smartphone} color="from-amber-500 to-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Revenue vs Profit</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Monthly comparison</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} formatter={(v) => [`৳${Number(v).toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} fill="url(#profitGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Orders by Hour</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Today's order distribution</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">৳{p.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(p.sales / 450) * 100}%` }} />
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 w-12 text-right">{p.sales} sold</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Devices</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Traffic by device type</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                {deviceData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {deviceData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{d.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
