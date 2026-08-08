"use client";

import { useState } from "react";
import { useGetSalesReportQuery } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatCard from "@/features/admin/shared/StatCard";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/utils/utils";

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
            className={cn("px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors", period === p ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>{p}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={data?.summary?.totalRevenue ? `৳${Number(data.summary.totalRevenue).toLocaleString()}` : "---"} icon={DollarSign} color="green" loading={isLoading} />
        <StatCard title="Total Orders" value={data?.summary?.totalOrders ?? "---"} icon={ShoppingCart} color="blue" loading={isLoading} />
        <StatCard title="Products" value={data?.summary?.productCount ?? "---"} icon={Package} color="purple" loading={isLoading} />
        <StatCard title="Avg Order Value" value={data?.summary?.totalOrders ? `৳${Math.round(Number(data.summary.totalRevenue) / Number(data.summary.totalOrders)).toLocaleString()}` : "---"} icon={TrendingUp} color="amber" loading={isLoading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Revenue Over Time</h3>
          {isLoading ? <div className="h-[280px] rounded-lg bg-muted animate-pulse" /> : (
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
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Orders Over Time</h3>
          {isLoading ? <div className="h-[280px] rounded-lg bg-muted animate-pulse" /> : (
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
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold mb-4">Top Selling Products</h3>
        {isLoading ? <div className="h-40 rounded-lg bg-muted animate-pulse" /> : (
          <div className="divide-y divide-border/50">
            {(data?.topProducts || []).map((p: any, i: number) => (
              <div key={p._id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3"><span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span><span className="text-sm font-medium text-foreground">{p.name || p._id}</span></div>
                <div className="flex items-center gap-6"><span className="text-xs text-muted-foreground">{p.quantity || 0} sold</span><span className="text-sm font-bold">৳{Number(p.revenue).toLocaleString()}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
