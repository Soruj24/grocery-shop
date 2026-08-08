"use client";

import { useState, useMemo } from "react";
import { useGetDashboardAnalyticsQuery } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { cn } from "@/utils/utils";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  DollarSign, ShoppingCart, Users, Package, TrendingUp,
  BarChart3, Target, ArrowUpRight, ArrowDownRight, Calendar,
  Loader2, ChevronDown,
} from "lucide-react";

/* ─── Color Palette ─── */
const COLORS = {
  primary: "#18181b",
  success: "#22c55e",
  info: "#3b82f6",
  warning: "#f59e0b",
  danger: "#ef4444",
  muted: "#a1a1aa",
  accent: "#8b5cf6",
  palette: ["#18181b", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6", "#f97316"],
};

/* ─── Date Range Options ─── */
const RANGES = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "1y", label: "1 Year" },
  { value: "custom", label: "Custom" },
];

/* ─── Chart Tooltip ─── */
function ChartTooltip({ active, payload, label, prefix = "" }: {
  active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string; prefix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs font-bold text-foreground tabular-nums">
          {prefix}{typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
}

/* ─── KPI Card ─── */
function KPICard({ icon: Icon, label, value, change, prefix = "", suffix = "" }: {
  icon: React.ElementType; label: string; value: number | string; change?: number; prefix?: string; suffix?: string;
}) {
  const isPositive = (change || 0) >= 0;
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        {change !== undefined && (
          <div className={cn("flex items-center gap-0.5 text-[11px] font-semibold",
            isPositive ? "text-success" : "text-danger")}>
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-foreground tabular-nums mt-1">
        {prefix}{typeof value === "number" ? value.toLocaleString(undefined, { maximumFractionDigits: suffix === "%" ? 1 : 0 }) : value}{suffix}
      </p>
    </div>
  );
}

/* ─── Chart Card ─── */
function ChartCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card", className)}>
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="px-3 pb-4">{children}</div>
    </div>
  );
}

/* ─── Table Card ─── */
function TableCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function AdminAnalyticsPage() {
  const [range, setRange] = useState("30d");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [rangeOpen, setRangeOpen] = useState(false);

  const params = useMemo(() => {
    if (range === "custom" && customFrom && customTo) return { range, from: customFrom, to: customTo };
    return { range };
  }, [range, customFrom, customTo]);

  const { data, isLoading } = useGetDashboardAnalyticsQuery(params);

  const kpi = data?.kpi;
  const revenueTrend = data?.revenueTrend || [];
  const orderTrend = data?.orderTrend || [];
  const customerGrowth = data?.customerGrowth || [];
  const topProducts = data?.topProducts || [];
  const topCategories = data?.topCategories || [];
  const orderStatus = data?.orderStatus || [];
  const paymentMethods = data?.paymentMethods || [];

  const currentRangeLabel = RANGES.find((r) => r.value === range)?.label || "30 Days";

  const maxRevenue = useMemo(() => Math.max(...revenueTrend.map((d) => d.revenue || 0), 1), [revenueTrend]);
  const maxOrders = useMemo(() => Math.max(...orderTrend.map((d) => d.count || 0), 1), [orderTrend]);

  return (
    <div className="space-y-6">
      {/* Header with Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminPageHeader title="Analytics" description="Detailed store performance insights" />
        <div className="relative">
          <button onClick={() => setRangeOpen(!rangeOpen)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {currentRangeLabel}
            <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", rangeOpen && "rotate-180")} />
          </button>
          {rangeOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setRangeOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-52 rounded-xl border border-border bg-card shadow-xl overflow-hidden">
                <div className="p-1.5">
                  {RANGES.map((r) => (
                    <button key={r.value} onClick={() => { setRange(r.value); setRangeOpen(false); }}
                      className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        range === r.value ? "bg-foreground text-background font-medium" : "text-foreground hover:bg-muted")}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Custom Date Range */}
      {range === "custom" && (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
          <span className="text-xs text-muted-foreground">From</span>
          <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border bg-muted text-sm text-foreground focus:ring-1 focus:ring-ring outline-none" />
          <span className="text-xs text-muted-foreground">To</span>
          <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border bg-muted text-sm text-foreground focus:ring-1 focus:ring-ring outline-none" />
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 rounded-xl bg-muted animate-pulse" />
            <div className="h-80 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard icon={DollarSign} label="Revenue" value={kpi?.revenue.total || 0} change={kpi?.revenue.change} prefix="৳" />
            <KPICard icon={ShoppingCart} label="Orders" value={kpi?.orders.total || 0} change={kpi?.orders.change} />
            <KPICard icon={TrendingUp} label="Avg. Order Value" value={kpi?.aov.total || 0} change={kpi?.aov.change} prefix="৳" />
            <KPICard icon={Users} label="New Customers" value={kpi?.customers.total || 0} change={kpi?.customers.change} />
          </div>

          {/* Second row KPIs */}
          <div className="grid grid-cols-3 gap-4">
            <KPICard icon={Target} label="Conversion Rate" value={kpi?.conversionRate || 0} suffix="%" />
            <KPICard icon={BarChart3} label="Retention Rate" value={kpi?.retentionRate || 0} suffix="%" />
            <KPICard icon={Package} label="Active Products" value={kpi?.activeProducts || 0} />
          </div>

          {/* Revenue + Order Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Revenue Trend" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.08} />
                      <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="_id" tick={{ fontSize: 10, fill: COLORS.muted }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => { const d = new Date(v); return `${d.getDate()}/${d.getMonth() + 1}`; }} />
                  <YAxis tick={{ fontSize: 10, fill: COLORS.muted }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<ChartTooltip prefix="৳" />} />
                  <Area type="monotone" dataKey="revenue" stroke={COLORS.primary} strokeWidth={2} fill="url(#gradRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <TableCard title="Order Status">
              <div className="flex justify-center mb-4">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={orderStatus} cx="50%" cy="50%" innerRadius={55} outerRadius={78} dataKey="count" nameKey="_id" strokeWidth={0}>
                      {orderStatus.map((_: unknown, i: number) => (
                        <Cell key={i} fill={COLORS.palette[i % COLORS.palette.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {orderStatus.map((s, i) => (
                  <div key={String(s._id)} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS.palette[i % COLORS.palette.length] }} />
                      <span className="text-xs text-foreground capitalize">{String(s._id)}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground tabular-nums">{s.count}</span>
                  </div>
                ))}
              </div>
            </TableCard>
          </div>

          {/* Orders + Customer Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Orders Over Time">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={orderTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="_id" tick={{ fontSize: 10, fill: COLORS.muted }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => { const d = new Date(v); return `${d.getDate()}/${d.getMonth() + 1}`; }} />
                  <YAxis tick={{ fontSize: 10, fill: COLORS.muted }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" fill={COLORS.primary} radius={[3, 3, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Customer Growth">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="_id" tick={{ fontSize: 10, fill: COLORS.muted }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => { const d = new Date(v); return `${d.getDate()}/${d.getMonth() + 1}`; }} />
                  <YAxis tick={{ fontSize: 10, fill: COLORS.muted }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" fill={COLORS.info} radius={[3, 3, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Top Products + Top Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TableCard title="Top Products">
              <div className="space-y-3">
                {topProducts.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No product data for this period</p>
                ) : topProducts.map((p, i) => {
                  const maxRev = topProducts[0]?.revenue || 1;
                  return (
                    <div key={String(p._id)} className="flex items-center gap-3">
                      <span className={cn("text-[10px] font-bold w-5 text-center tabular-nums",
                        i < 3 ? "text-foreground" : "text-muted-foreground")}>
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-[13px] font-medium text-foreground truncate">{p.name}</span>
                          <span className="text-[11px] font-bold text-foreground tabular-nums ml-2">৳{p.revenue.toLocaleString()}</span>
                        </div>
                        <div className="h-1 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-foreground/80" style={{ width: `${(p.revenue / maxRev) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground w-14 text-right tabular-nums">{p.totalSold} sold</span>
                    </div>
                  );
                })}
              </div>
            </TableCard>

            <TableCard title="Top Categories">
              <div className="space-y-3">
                {topCategories.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No category data for this period</p>
                ) : topCategories.map((c, i) => {
                  const maxRev = topCategories[0]?.revenue || 1;
                  return (
                    <div key={String(c._id)} className="flex items-center gap-3">
                      <span className={cn("text-[10px] font-bold w-5 text-center tabular-nums",
                        i < 3 ? "text-foreground" : "text-muted-foreground")}>
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-[13px] font-medium text-foreground truncate">{c.name}</span>
                          <span className="text-[11px] font-bold text-foreground tabular-nums ml-2">৳{c.revenue.toLocaleString()}</span>
                        </div>
                        <div className="h-1 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-foreground/80" style={{ width: `${(c.revenue / maxRev) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground w-14 text-right tabular-nums">{c.totalSold} sold</span>
                    </div>
                  );
                })}
              </div>
            </TableCard>
          </div>

          {/* Payment Methods */}
          {paymentMethods.length > 0 && (
            <TableCard title="Payment Methods">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {paymentMethods.map((pm, i) => (
                  <div key={String(pm._id)} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider capitalize">
                      {String(pm._id || "N/A")}
                    </p>
                    <p className="text-lg font-bold text-foreground tabular-nums mt-1">৳{pm.revenue.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{pm.count} orders</p>
                  </div>
                ))}
              </div>
            </TableCard>
          )}
        </>
      )}
    </div>
  );
}
