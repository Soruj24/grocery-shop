"use client";

import { useState } from "react";
import { useGetSalesReportQuery } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatCard from "@/features/admin/shared/StatCard";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("monthly");
  const { data: rawData, isLoading } = useGetSalesReportQuery({ period });
  const data = rawData as any;

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Sales Reports" description="Revenue and sales analytics" />
      <div className="flex gap-2">
        {["weekly", "monthly", "yearly"].map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${period === p ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700"}`}>{p}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={data?.summary?.totalRevenue ? `৳${Number(data.summary.totalRevenue).toLocaleString()}` : "---"} icon={DollarSign} color="from-emerald-500 to-emerald-600" loading={isLoading} />
        <StatCard title="Total Orders" value={data?.summary?.totalOrders ?? "---"} icon={ShoppingCart} color="from-blue-500 to-blue-600" loading={isLoading} />
        <StatCard title="Products" value={data?.summary?.productCount ?? "---"} icon={Package} color="from-violet-500 to-violet-600" loading={isLoading} />
        <StatCard title="Avg Order Value" value={data?.summary?.totalOrders ? `৳${Math.round(Number(data.summary.totalRevenue) / Number(data.summary.totalOrders)).toLocaleString()}` : "---"} icon={TrendingUp} color="from-amber-500 to-amber-600" loading={isLoading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold mb-4">Revenue Over Time</h3>
          {isLoading ? <div className="h-[280px] rounded-xl bg-gray-100 animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data?.salesData || []}>
                <defs><linearGradient id="reportRev"><stop offset="5%" stopColor="#10b981" stopOpacity={0.15} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#reportRev)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold mb-4">Orders Over Time</h3>
          {isLoading ? <div className="h-[280px] rounded-xl bg-gray-100 animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data?.salesData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <h3 className="text-sm font-semibold mb-4">Top Selling Products</h3>
        {isLoading ? <div className="h-40 rounded-xl bg-gray-100 animate-pulse" /> : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {(data?.topProducts || []).map((p: any, i: number) => (
              <div key={p._id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3"><span className="text-xs font-bold text-gray-400 w-5">{i + 1}</span><span className="text-sm font-medium text-gray-900">{p.name || p._id}</span></div>
                <div className="flex items-center gap-6"><span className="text-xs text-gray-500">{p.quantity || 0} sold</span><span className="text-sm font-bold">৳{Number(p.revenue).toLocaleString()}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
