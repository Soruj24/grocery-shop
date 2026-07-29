"use client";

import { useGetDashboardAnalyticsQuery } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminAnalyticsPage() {
  const { data, isLoading } = useGetDashboardAnalyticsQuery();
  const dailySales = data?.dailySales || [];
  const topProducts = data?.topProducts || [];
  const orderStatus = data?.orderStatus || [];
  const userGrowth = data?.userGrowth || [];

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Analytics" description="Detailed store performance insights" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Daily Sales (7 Days)</h3>
          {isLoading ? <div className="h-[280px] rounded-xl bg-gray-100 animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dailySales}>
                <defs><linearGradient id="analyticsSales"><stop offset="5%" stopColor="#10b981" stopOpacity={0.15} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                <Area type="monotone" dataKey="totalSales" stroke="#10b981" strokeWidth={2} fill="url(#analyticsSales)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          {isLoading ? <div className="h-[280px] rounded-xl bg-gray-100 animate-pulse" /> : (
            <div className="space-y-3">
              {topProducts.slice(0, 5).map((p: any, i: number) => (
                <div key={String(p._id)} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1"><span className="text-sm font-medium text-gray-900 dark:text-white">{p.name as string}</span><span className="text-xs font-bold">৳{Number(p.revenue).toLocaleString()}</span></div>
                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(100, (Number(p.totalSold) / 10) * 100)}%` }} /></div>
                  </div>
                  <span className="text-[10px] text-gray-400 w-12 text-right">{String(p.totalSold || 0)} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Order Status</h3>
          {isLoading ? <div className="h-[200px] rounded-xl bg-gray-100 animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={orderStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="count" nameKey="_id" strokeWidth={0}>
                {orderStatus.map((_: unknown, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie></PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">User Growth (30 Days)</h3>
          {isLoading ? <div className="h-[200px] rounded-xl bg-gray-100 animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="newUsers" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
