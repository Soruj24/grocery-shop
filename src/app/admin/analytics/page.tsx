"use client";

import { useState, useMemo } from "react";
import { useGetDashboardAnalyticsQuery } from "@/redux/apiSlice";
import { cn } from "@/utils/utils";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  DollarSign, ShoppingCart, Users, Package, TrendingUp,
  BarChart3, Target, ArrowUpRight, ArrowDownRight, Calendar,
  ChevronDown,
} from "lucide-react";

/* ─── Dark-mode safe chart colors ─── */
const C = {
  fg: "hsl(var(--foreground))",
  muted: "hsl(var(--muted-foreground))",
  grid: "hsl(var(--border))",
  blue: "#3b82f6",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  pink: "#ec4899",
  palette: ["hsl(var(--foreground))", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"],
};

/* ─── Date range options ─── */
const RANGES = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "1y", label: "1 year" },
  { value: "custom", label: "Custom" },
];

/* ─── Tooltip ─── */
function Tip({ active, payload, label, prefix = "" }: {
  active?: boolean; payload?: Array<{ value: number }>; label?: string; prefix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-1.5 shadow-md">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold text-foreground tabular-nums">
          {prefix}{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

/* ─── KPI Card ─── */
function KPICard({ icon: Icon, label, value, change, prefix = "", suffix = "" }: {
  icon: React.ElementType; label: string; value: number | string; change?: number; prefix?: string; suffix?: string;
}) {
  const up = (change ?? 0) >= 0;
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        {change !== undefined && (
          <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", up ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums mt-0.5">
        {prefix}{typeof value === "number" ? value.toLocaleString(undefined, { maximumFractionDigits: suffix === "%" ? 1 : 0 }) : value}{suffix}
      </p>
    </div>
  );
}

/* ─── Card wrapper ─── */
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-lg border border-border bg-card", className)}>{children}</div>;
}

/* ─── Page ─── */
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

  const rangeLabel = RANGES.find((r) => r.value === range)?.label || "30 days";

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Detailed store performance insights</p>
        </div>

        {/* Range selector */}
        <div className="relative">
          <button onClick={() => setRangeOpen(!rangeOpen)} aria-haspopup="listbox" aria-expanded={rangeOpen}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {rangeLabel}
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", rangeOpen && "rotate-180")} />
          </button>
          {rangeOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setRangeOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-md border border-border bg-popover p-1 shadow-md" role="listbox" aria-label="Date range">
                {RANGES.map((r) => (
                  <button key={r.value} role="option" aria-selected={range === r.value}
                    onClick={() => { setRange(r.value); setRangeOpen(false); }}
                    className={cn("flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                      range === r.value ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    {r.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Custom range ── */}
      {range === "custom" && (
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="analytics-from" className="text-sm text-muted-foreground">From</label>
            <input id="analytics-from" type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)}
              className="h-9 rounded-md border border-border bg-transparent px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
            <label htmlFor="analytics-to" className="text-sm text-muted-foreground">To</label>
            <input id="analytics-to" type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)}
              className="h-9 rounded-md border border-border bg-transparent px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
        </Card>
      )}

      {/* ── Loading skeleton ── */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[108px] rounded-lg border border-border bg-card animate-pulse" />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="h-[360px] rounded-lg border border-border bg-card animate-pulse lg:col-span-2" />
            <div className="h-[360px] rounded-lg border border-border bg-card animate-pulse" />
          </div>
        </div>
      ) : (
        <>
          {/* ── KPIs ── */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KPICard icon={DollarSign} label="Revenue" value={kpi?.revenue.total || 0} change={kpi?.revenue.change} prefix="৳" />
            <KPICard icon={ShoppingCart} label="Orders" value={kpi?.orders.total || 0} change={kpi?.orders.change} />
            <KPICard icon={TrendingUp} label="Avg. Order Value" value={kpi?.aov.total || 0} change={kpi?.aov.change} prefix="৳" />
            <KPICard icon={Users} label="New Customers" value={kpi?.customers.total || 0} change={kpi?.customers.change} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KPICard icon={Target} label="Conversion" value={kpi?.conversionRate || 0} suffix="%" />
            <KPICard icon={BarChart3} label="Retention" value={kpi?.retentionRate || 0} suffix="%" />
            <KPICard icon={Package} label="Active Products" value={kpi?.activeProducts || 0} />
          </div>

          {/* ── Revenue + Order Status ── */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <div className="p-6 pb-2">
                <h3 className="text-sm font-semibold text-foreground">Revenue</h3>
              </div>
              <div className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueTrend}>
                    <defs>
                      <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.fg} stopOpacity={0.06} />
                        <stop offset="100%" stopColor={C.fg} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="_id" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => { const d = new Date(v); return `${d.getDate()}/${d.getMonth() + 1}`; }} />
                    <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip content={<Tip prefix="৳" />} />
                    <Area type="monotone" dataKey="revenue" stroke={C.fg} strokeWidth={1.5} fill="url(#gRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div className="p-6 pb-2">
                <h3 className="text-sm font-semibold text-foreground">Order Status</h3>
              </div>
              <div className="flex flex-col items-center px-6 pb-4">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={orderStatus} cx="50%" cy="50%" innerRadius={56} outerRadius={76} dataKey="count" nameKey="_id" strokeWidth={0}>
                      {orderStatus.map((_: unknown, i: number) => (
                        <Cell key={i} fill={C.palette[i % C.palette.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full space-y-2 mt-2">
                  {orderStatus.map((s, i) => (
                    <div key={String(s._id)} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: C.palette[i % C.palette.length] }} />
                        <span className="text-muted-foreground capitalize">{String(s._id)}</span>
                      </div>
                      <span className="font-semibold tabular-nums text-foreground">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* ── Orders + Customer Growth ── */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <div className="p-6 pb-2">
                <h3 className="text-sm font-semibold text-foreground">Orders</h3>
              </div>
              <div className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={orderTrend}>
                    <XAxis dataKey="_id" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => { const d = new Date(v); return `${d.getDate()}/${d.getMonth() + 1}`; }} />
                    <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="count" fill={C.fg} radius={[4, 4, 0, 0]} maxBarSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div className="p-6 pb-2">
                <h3 className="text-sm font-semibold text-foreground">Customer Growth</h3>
              </div>
              <div className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={customerGrowth}>
                    <XAxis dataKey="_id" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => { const d = new Date(v); return `${d.getDate()}/${d.getMonth() + 1}`; }} />
                    <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="count" fill={C.blue} radius={[4, 4, 0, 0]} maxBarSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* ── Top Products + Top Categories ── */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <div className="p-6 pb-2">
                <h3 className="text-sm font-semibold text-foreground">Top Products</h3>
              </div>
              <div className="p-6 pt-2">
                {topProducts.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No data for this period</p>
                ) : (
                  <div className="space-y-4">
                    {topProducts.map((p, i) => {
                      const max = topProducts[0]?.revenue || 1;
                      return (
                        <div key={String(p._id)} className="flex items-center gap-3">
                          <span className={cn("w-5 text-center text-xs font-semibold tabular-nums", i < 3 ? "text-foreground" : "text-muted-foreground")}>
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground truncate">{p.name}</span>
                              <span className="text-xs font-semibold tabular-nums text-foreground ml-3">৳{p.revenue.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-foreground/80" style={{ width: `${(p.revenue / max) * 100}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground tabular-nums">{p.totalSold}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <div className="p-6 pb-2">
                <h3 className="text-sm font-semibold text-foreground">Top Categories</h3>
              </div>
              <div className="p-6 pt-2">
                {topCategories.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No data for this period</p>
                ) : (
                  <div className="space-y-4">
                    {topCategories.map((c, i) => {
                      const max = topCategories[0]?.revenue || 1;
                      return (
                        <div key={String(c._id)} className="flex items-center gap-3">
                          <span className={cn("w-5 text-center text-xs font-semibold tabular-nums", i < 3 ? "text-foreground" : "text-muted-foreground")}>
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                              <span className="text-xs font-semibold tabular-nums text-foreground ml-3">৳{c.revenue.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-foreground/80" style={{ width: `${(c.revenue / max) * 100}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground tabular-nums">{c.totalSold}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* ── Payment Methods ── */}
          {paymentMethods.length > 0 && (
            <Card>
              <div className="p-6 pb-2">
                <h3 className="text-sm font-semibold text-foreground">Payment Methods</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 p-6 pt-2 sm:grid-cols-4">
                {paymentMethods.map((pm) => (
                  <div key={String(pm._id)} className="rounded-md border border-border p-4">
                    <p className="text-xs font-medium text-muted-foreground capitalize">{String(pm._id || "N/A")}</p>
                    <p className="text-lg font-bold tracking-tight text-foreground tabular-nums mt-1.5">৳{pm.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pm.count} orders</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
