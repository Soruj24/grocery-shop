"use client";

import { useGetDashboardStatsQuery, useGetDashboardAnalyticsQuery } from "@/redux/apiSlice";
import StatCard from "@/features/admin/shared/StatCard";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { DollarSign, ShoppingCart, Users, TrendingUp, Package } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useRouter } from "next/navigation";

const COLORS = ["hsl(var(--success))", "hsl(var(--primary))", "hsl(var(--warning))", "hsl(var(--danger))", "hsl(var(--accent))"];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: analytics, isLoading: analyticsLoading } = useGetDashboardAnalyticsQuery();
  const router = useRouter();

  const statCards = [
    { title: "Today's Revenue", value: stats?.todayRevenue ? `৳${stats.todayRevenue.toLocaleString()}` : "---", icon: DollarSign, color: "green" as const, loading: statsLoading },
    { title: "Today's Orders", value: stats?.todayOrderCount ?? "---", icon: ShoppingCart, color: "blue" as const, loading: statsLoading },
    { title: "Total Customers", value: stats?.customerCount ?? "---", icon: Users, color: "purple" as const, loading: statsLoading },
    { title: "Total Products", value: stats?.productCount ?? "---", icon: Package, color: "amber" as const, loading: statsLoading },
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
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6" role="region" aria-label="Daily sales chart">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Sales (7 Days)</h3>
          {analyticsLoading ? (
            <div className="h-[280px] rounded-lg bg-muted animate-pulse" aria-busy="true" />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dailySales}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                <Area type="monotone" dataKey="totalSales" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#salesGrad)" name="Sales" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="rounded-xl border border-border bg-card p-6" role="region" aria-label="Order status distribution">
          <h3 className="text-sm font-semibold text-foreground mb-1">Order Status</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribution</p>
          {analyticsLoading ? (
            <div className="h-[200px] rounded-lg bg-muted animate-pulse" aria-busy="true" />
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
          <div className="space-y-2.5 mt-4">
            {orderStatus.map((entry: any, i: number) => (
              <div key={String(entry._id)} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} aria-hidden="true" />
                  <span className="text-xs text-muted-foreground capitalize">{String(entry._id)}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{String(entry.count)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
          <button onClick={() => router.push("/admin/orders")} className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">View All</button>
        </div>
        {statsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {(stats?.recentOrders || []).slice(0, 5).map((order: any) => (
              <div key={order._id} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <button onClick={() => router.push(`/admin/orders`)} className="text-sm font-mono font-semibold text-foreground hover:text-primary transition-colors" aria-label={`View order ${order._id.slice(-6).toUpperCase()}`}>
                    #{order._id.slice(-6).toUpperCase()}
                  </button>
                  <span className="text-xs text-muted-foreground">{order.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} label={order.status} />
                  <span className="text-sm font-semibold text-foreground">৳{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
