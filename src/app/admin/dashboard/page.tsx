"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  useGetDashboardStatsQuery,
  useGetDashboardAnalyticsQuery,
  useGetSalesReportQuery,
  useGetInventoryAlertsQuery,
  useGetAdminCustomersQuery,
} from "@/redux/apiSlice";
import StatCard from "@/features/admin/shared/StatCard";
import StatusBadge from "@/features/admin/components/StatusBadge";
import {
  DollarSign, ShoppingCart, Users, Package, TrendingUp, BarChart3,
  ArrowUpRight, Clock, AlertTriangle, Activity, ChevronRight,
  RefreshCw, Loader2, Plus, Eye, Calendar, Search,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { cn } from "@/utils/utils";

/* ─── Constants ─── */
const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  processing: "#6366f1",
  confirmed: "#3b82f6",
  shipped: "#8b5cf6",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  pending: { color: "text-warning", bg: "bg-warning-subtle", icon: Clock },
  processing: { color: "text-primary", bg: "bg-primary/10", icon: Loader2 },
  confirmed: { color: "text-info", bg: "bg-info-subtle", icon: ShoppingCart },
  shipped: { color: "text-accent", bg: "bg-accent/10", icon: ArrowUpRight },
  delivered: { color: "text-success", bg: "bg-success-subtle", icon: Package },
  cancelled: { color: "text-danger", bg: "bg-danger-subtle", icon: AlertTriangle },
};

/* ─── Animation ─── */
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as const } } };

/* ─── Helpers ─── */
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getTimeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString("en-BD", { month: "short", day: "numeric" });
}

function formatBdt(n: number): string {
  return `৳${n.toLocaleString()}`;
}

/* ─── Shared UI ─── */
function DashCard({ children, className, ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)} {...props} />;
}

function SectionHeader({ title, action, actionHref, icon: Icon }: { title: string; action?: string; actionHref?: string; icon?: React.ElementType }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {action && actionHref && (
        <button
          onClick={() => router.push(actionHref)}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action, onAction }: { icon: React.ElementType; title: string; description: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">{description}</p>
      {action && onAction && (
        <button onClick={onAction} className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-hover transition-colors">
          <Plus className="h-3 w-3" />
          {action}
        </button>
      )}
    </div>
  );
}

/* ─── Skeletons ─── */
function KPISkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5">
          <div className="h-2.5 w-16 rounded bg-muted animate-pulse mb-3" />
          <div className="h-7 w-28 rounded bg-muted animate-pulse mb-2" />
          <div className="h-2.5 w-20 rounded bg-muted animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton({ height = 280 }: { height?: number }) {
  return <div className="rounded-xl border border-border bg-card p-6"><div className={cn("rounded-lg bg-muted animate-pulse")} style={{ height }} /></div>;
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  );
}

/* ─── Chart Tooltip ─── */
function ChartTooltip({ active, payload, label, prefix = "" }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string; prefix?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-lg">
      <p className="text-[11px] font-medium text-muted-foreground mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold text-foreground">
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
          {prefix}{entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

/* ─── Tab Component ─── */
function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string; count?: number }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
            active === tab.id
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn("ml-1.5 text-[10px]", active === tab.id ? "text-muted-foreground" : "text-muted-foreground/60")}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function AdminDashboard() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("7d");
  const [activeTab, setActiveTab] = useState("orders");
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const period = dateRange === "7d" ? "weekly" : dateRange === "30d" ? "monthly" : "yearly";
  const analyticsRange = dateRange;

  const { data: stats, isLoading: statsLoading, isError: statsError, refetch: refetchStats } = useGetDashboardStatsQuery();
  const { data: analytics, isLoading: analyticsLoading, isError: analyticsError, refetch: refetchAnalytics } = useGetDashboardAnalyticsQuery({ range: analyticsRange });
  const { data: salesReport, isLoading: salesLoading } = useGetSalesReportQuery({ period });
  const { data: inventoryData, isLoading: inventoryLoading } = useGetInventoryAlertsQuery();
  const { data: customersData, isLoading: customersLoading } = useGetAdminCustomersQuery({ page: 1, limit: 5 });

  const refetchAll = () => { refetchStats(); refetchAnalytics(); };

  /* ─── Derived Data ─── */
  const kpis = useMemo(() => {
    if (!stats) return [];
    const totalOrders = stats.totalOrders || 0;
    const totalCustomers = stats.customerCount || 0;
    const avgOrderValue = totalOrders > 0 ? Math.round((stats.totalRevenue || 0) / totalOrders) : 0;
    const conversionRate = totalCustomers > 0 ? ((totalOrders / totalCustomers) * 100).toFixed(1) : "0.0";

    return [
      {
        title: "Total Revenue",
        value: formatBdt(stats.totalRevenue || 0),
        icon: DollarSign,
        color: "green" as const,
        changeLabel: "All time",
        sparkline: analytics?.dailySales?.map((d) => d.totalSales) || [],
      },
      {
        title: "Total Orders",
        value: totalOrders.toLocaleString(),
        icon: ShoppingCart,
        color: "blue" as const,
        changeLabel: "All time",
        sparkline: analytics?.dailySales?.map((d) => d.orderCount) || [],
      },
      {
        title: "Customers",
        value: totalCustomers.toLocaleString(),
        icon: Users,
        color: "purple" as const,
        changeLabel: "Registered",
      },
      {
        title: "Avg Order Value",
        value: formatBdt(avgOrderValue),
        icon: BarChart3,
        color: "amber" as const,
        changeLabel: "Per order",
      },
    ];
  }, [stats, analytics]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const salesData = salesReport as any;

  const dailySales = useMemo(() => {
    if (dateRange === "7d") {
      if (!analytics?.dailySales) return [];
      return analytics.dailySales.map((d) => ({ date: d._id, sales: d.totalSales }));
    }
    if (!salesData?.salesData) return [];
    return (salesData.salesData as Array<{ _id: string; revenue?: number }>).map((d) => ({ date: d._id, sales: d.revenue ?? 0 }));
  }, [analytics, salesData, dateRange]);

  const dailyOrders = useMemo(() => {
    if (dateRange === "7d") {
      if (!analytics?.dailySales) return [];
      return analytics.dailySales.map((d) => ({ date: d._id, orders: d.orderCount ?? 0 }));
    }
    if (!salesData?.salesData) return [];
    return (salesData.salesData as Array<{ _id: string; orders?: number }>).map((d) => ({ date: d._id, orders: d.orders ?? 0 }));
  }, [analytics, salesData, dateRange]);

  const orderStatus = useMemo(() => analytics?.orderStatus || [], [analytics]);

  const lowStockProducts = useMemo(() => {
    if (!inventoryData?.data) return [];
    return (inventoryData.data as Array<Record<string, unknown>>)
      .filter((p) => p.status === "low_stock" || p.status === "out_of_stock")
      .slice(0, 6) as Array<{ _id: string; name: string; stock: number; unit: string; status: string }>;
  }, [inventoryData]);

  const recentCustomers = useMemo(() => {
    if (!customersData?.data) return [];
    return customersData.data.slice(0, 5);
  }, [customersData]);

  const topProducts = useMemo(() => analytics?.topProducts?.slice(0, 5) || [], [analytics]);
  const recentOrders = useMemo(() => (stats?.recentOrders || []).slice(0, 7), [stats]);

  /* ─── Error State ─── */
  if (statsError || analyticsError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Something went wrong loading your data.</p>
        </div>
        <DashCard className="flex flex-col items-center justify-center py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-subtle mb-4">
            <AlertTriangle className="h-7 w-7 text-danger" />
          </div>
          <p className="text-base font-semibold text-foreground">Failed to load dashboard</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Check your connection and try again.</p>
          <button
            onClick={refetchAll}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors shadow-primary"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </DashCard>
      </div>
    );
  }

  /* ─── Render ─── */
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6" id="main-content">

      {/* ─── Header ─── */}
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{clock}</p>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-0.5">
            {getGreeting()}, Admin
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date Range */}
          <div className="flex items-center rounded-lg border border-border bg-card p-0.5" role="radiogroup" aria-label="Date range">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                role="radio"
                aria-checked={dateRange === range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                  dateRange === range
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {range === "7d" ? "7D" : range === "30d" ? "30D" : "90D"}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={refetchAll}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Refresh dashboard data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Quick Actions */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-hover transition-colors shadow-primary">
              <Plus className="h-3.5 w-3.5" />
              Quick Actions
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border bg-card shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <button onClick={() => router.push("/admin/products")} className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                Add Product
              </button>
              <button onClick={() => router.push("/admin/orders")} className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                <ShoppingCart className="h-3.5 w-3.5 text-muted-foreground" />
                View Orders
              </button>
              <button onClick={() => router.push("/admin/customers")} className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                Customers
              </button>
              <button onClick={() => router.push("/admin/reports")} className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                Reports
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── KPI Cards ─── */}
      <motion.div variants={item}>
        {statsLoading ? (
          <KPISkeleton />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <StatCard key={kpi.title} {...kpi} />
            ))}
          </div>
        )}
      </motion.div>

      {/* ─── Charts Row ─── */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <DashCard className="lg:col-span-2 p-6">
          <SectionHeader title="Revenue Trend" action="View Report" actionHref="/admin/reports" icon={TrendingUp} />
          {analyticsLoading || salesLoading ? (
            <ChartSkeleton height={280} />
          ) : dailySales.length === 0 ? (
            <EmptyState icon={BarChart3} title="No revenue data" description="Sales will appear here once orders are placed." />
          ) : (
            <div role="img" aria-label="Revenue trend chart">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={dailySales}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v: string) => v.slice(5)} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `৳${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<ChartTooltip prefix="৳" />} />
                  <Area type="monotone" dataKey="sales" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#revenueGrad)" name="revenue" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "hsl(var(--success))", fill: "#fff" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </DashCard>

        {/* Order Status */}
        <DashCard className="p-6">
          <SectionHeader title="Order Status" icon={ShoppingCart} />
          {analyticsLoading ? (
            <ChartSkeleton height={200} />
          ) : orderStatus.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No orders yet" description="Order status will appear here." />
          ) : (
            <>
              <div role="img" aria-label="Order status distribution chart">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={orderStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="count" nameKey="_id" strokeWidth={0} paddingAngle={2}>
                      {orderStatus.map((entry: { _id: string }, i: number) => (
                        <Cell key={i} fill={STATUS_COLORS[entry._id] || "#a1a1aa"} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2.5 mt-4">
                {orderStatus.map((entry: { _id: string; count: number }) => (
                  <div key={entry._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[entry._id] || "#a1a1aa" }} aria-hidden="true" />
                      <span className="text-xs text-muted-foreground capitalize">{STATUS_LABELS[entry._id] || entry._id}</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground tabular-nums">{entry.count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </DashCard>
      </motion.div>

      {/* ─── Orders Overview ─── */}
      <motion.div variants={item}>
        <DashCard className="p-6">
          <SectionHeader title="Orders Overview" action="View All" actionHref="/admin/orders" icon={BarChart3} />
          {analyticsLoading || salesLoading ? (
            <ChartSkeleton height={240} />
          ) : dailyOrders.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No order data" description="Order trends will appear here." />
          ) : (
            <div role="img" aria-label="Orders overview bar chart">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={dailyOrders}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v: string) => v.slice(5)} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="orders" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="orders" maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </DashCard>
      </motion.div>

      {/* ─── Tabbed Section: Orders / Activity ─── */}
      <motion.div variants={item}>
        <DashCard>
          <div className="p-5 pb-0 flex items-center justify-between">
            <Tabs
              tabs={[
                { id: "orders", label: "Recent Orders", count: recentOrders.length },
                { id: "activity", label: "Activity", count: recentOrders.length },
              ]}
              active={activeTab}
              onChange={setActiveTab}
            />
            <button
              onClick={() => router.push("/admin/orders")}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {statsLoading ? (
            <TableSkeleton rows={5} />
          ) : recentOrders.length === 0 ? (
            <div className="p-5">
              <EmptyState icon={ShoppingCart} title="No orders yet" description="Orders will appear here once customers start purchasing." />
            </div>
          ) : activeTab === "orders" ? (
            <div className="overflow-x-auto">
              <table className="w-full" aria-label="Recent orders">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Order</th>
                    <th className="text-left py-3 px-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Customer</th>
                    <th className="text-left py-3 px-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                    <th className="text-right py-3 px-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-5">
                        <button
                          onClick={() => router.push(`/admin/orders`)}
                          className="text-[13px] font-mono font-semibold text-foreground hover:text-primary transition-colors"
                          aria-label={`View order ${order._id.slice(-6).toUpperCase()}`}
                        >
                          #{order._id.slice(-6).toUpperCase()}
                        </button>
                      </td>
                      <td className="py-3 px-5 text-xs text-muted-foreground truncate max-w-[160px] hidden sm:table-cell">{order.phone}</td>
                      <td className="py-3 px-5">
                        <StatusBadge status={order.status} label={STATUS_LABELS[order.status] || order.status} />
                      </td>
                      <td className="py-3 px-5 text-[13px] font-semibold text-foreground tabular-nums text-right">{formatBdt(order.total)}</td>
                      <td className="py-3 px-5 text-[11px] text-muted-foreground text-right tabular-nums hidden md:table-cell">{getTimeAgo(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Activity Timeline */
            <div className="p-5 space-y-0">
              {recentOrders.map((order) => {
                const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                const StatusIcon = config.icon;
                return (
                  <div key={order._id} className="flex items-start gap-3 py-3">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg shrink-0 mt-0.5", config.bg)}>
                      <StatusIcon className={cn("h-4 w-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-foreground">
                        <span className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</span>
                        {" "}changed to{" "}
                        <span className={cn("font-semibold capitalize", config.color)}>{order.status}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{getTimeAgo(order.createdAt)}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-foreground tabular-nums shrink-0">{formatBdt(order.total)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </DashCard>
      </motion.div>

      {/* ─── Three Column: Top Products, Low Stock, Customers ─── */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Products */}
        <DashCard>
          <div className="p-5 pb-0">
            <SectionHeader title="Top Products" action="View All" actionHref="/admin/products" icon={Package} />
          </div>
          {analyticsLoading ? (
            <TableSkeleton rows={5} />
          ) : topProducts.length === 0 ? (
            <div className="p-5">
              <EmptyState icon={Package} title="No product data" description="Top sellers will appear here." />
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {topProducts.map((product, i) => (
                <div key={product._id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold shrink-0",
                    i < 3 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                  )}>
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{product.totalSold} sold</p>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground tabular-nums shrink-0">{formatBdt(product.revenue)}</span>
                </div>
              ))}
            </div>
          )}
        </DashCard>

        {/* Low Stock */}
        <DashCard>
          <div className="p-5 pb-0">
            <SectionHeader title="Low Stock" action="View All" actionHref="/admin/inventory" icon={AlertTriangle} />
          </div>
          {inventoryLoading ? (
            <TableSkeleton rows={5} />
          ) : lowStockProducts.length === 0 ? (
            <div className="p-5">
              <EmptyState icon={Package} title="Stock is healthy" description="No products are running low." />
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {lowStockProducts.map((product) => (
                <div key={product._id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
                    product.status === "out_of_stock" ? "bg-danger-subtle" : "bg-warning-subtle",
                  )}>
                    <AlertTriangle className={cn("h-4 w-4", product.status === "out_of_stock" ? "text-danger" : "text-warning")} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{product.unit}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn("text-[13px] font-bold tabular-nums", product.status === "out_of_stock" ? "text-danger" : "text-warning")}>
                      {product.stock}
                    </p>
                    <p className="text-[10px] text-muted-foreground">units</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashCard>

        {/* Recent Customers */}
        <DashCard>
          <div className="p-5 pb-0">
            <SectionHeader title="Customers" action="View All" actionHref="/admin/customers" icon={Users} />
          </div>
          {customersLoading ? (
            <TableSkeleton rows={5} />
          ) : recentCustomers.length === 0 ? (
            <div className="p-5">
              <EmptyState icon={Users} title="No customers yet" description="New customers will appear here." />
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {recentCustomers.map((customer) => {
                const initials = (customer.name || "U").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <div key={customer._id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-[11px] font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-foreground truncate">{customer.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{customer.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-semibold text-foreground tabular-nums">{customer.orderCount || 0}</p>
                      <p className="text-[10px] text-muted-foreground">orders</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DashCard>
      </motion.div>
    </motion.div>
  );
}
