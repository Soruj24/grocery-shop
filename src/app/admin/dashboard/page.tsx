"use client";

import { useGetDashboardStatsQuery, useGetDashboardAnalyticsQuery } from "@/redux/apiSlice";
import StatCard from "@/features/admin/shared/StatCard";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { DollarSign, ShoppingCart, Users, TrendingUp, Package } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/utils/utils";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: analytics, isLoading: analyticsLoading } = useGetDashboardAnalyticsQuery();

  const statCards = [
    { title: "Today's Revenue", value: stats?.todayRevenue ? `৳${stats.todayRevenue.toLocaleString()}` : "---", icon: DollarSign, color: "from-emerald-500 to-emerald-600", loading: statsLoading },
    { title: "Today's Orders", value: stats?.todayOrderCount ?? "---", icon: ShoppingCart, color: "from-blue-500 to-blue-600", loading: statsLoading },
    { title: "Total Customers", value: stats?.customerCount ?? "---", icon: Users, color: "from-violet-500 to-violet-600", loading: statsLoading },
    { title: "Total Products", value: stats?.productCount ?? "---", icon: Package, color: "from-amber-500 to-amber-600", loading: statsLoading },
  ];

  const dailySales = analytics?.dailySales || [];
  const orderStatus = analytics?.orderStatus || [];

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Dashboard" description="Welcome back. Here is your store performance." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => <StatCard key={s.title} {...s} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Sales (7 Days)</h3>
          {analyticsLoading ? (
            <div className="h-[280px] rounded-lg bg-muted animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dailySales}>
                <defs><linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.15} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                <Area type="monotone" dataKey="totalSales" stroke="#10b981" strokeWidth={2} fill="url(#salesGrad)" name="Sales" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Order Status</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribution</p>
          {analyticsLoading ? (
            <div className="h-[200px] rounded-lg bg-muted animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={orderStatus} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="count" nameKey="_id" strokeWidth={0}>
                  {orderStatus.map((_: unknown, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="space-y-2 mt-2">
            {orderStatus.map((entry: any, i: number) => (
              <div key={String(entry._id)} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-muted-foreground capitalize">{String(entry._id)}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{String(entry.count)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Orders</h3>
        {statsLoading ? (
          Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-10 rounded-lg bg-muted animate-pulse mb-2" />)
        ) : (
          <div className="divide-y divide-border/50">
            {(stats?.recentOrders || []).slice(0, 5).map((order: any) => (
              <div key={order._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">#{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{order.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                    order.status === "delivered" && "bg-success-subtle text-success",
                    order.status === "cancelled" && "bg-danger-subtle text-danger",
                    order.status !== "delivered" && order.status !== "cancelled" && "bg-warning-subtle text-warning"
                  )}>{order.status}</span>
                  <span className="text-sm font-bold text-foreground">৳{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
