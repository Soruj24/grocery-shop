"use client";

import { useState, useMemo } from "react";
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
  ArrowUpRight, Clock, AlertTriangle, UserPlus, Activity,
  ChevronRight, RefreshCw, Loader2,
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

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as const } },
};

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-lg">
      <p className="text-[11px] font-medium text-muted-foreground mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold text-foreground">
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
          {entry.name === "sales" || entry.name === "revenue" ? `৳${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

/* ─── Loading Skeletons ─── */
function KPISkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5">
          <div className="h-3 w-16 rounded bg-muted animate-pulse mb-3" />
          <div className="h-8 w-24 rounded bg-muted animate-pulse mb-2" />
          <div className="h-2.5 w-20 rounded bg-muted animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton({ height = 280 }: { height?: number }) {
  return <div className={cn("rounded-xl bg-muted animate-pulse")} style={{ height }} />;
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-11 rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ title, action, actionHref }: { title: string; action?: string; actionHref?: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
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

/* ─── Card Wrapper ─── */
function DashCard({ children, className, ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function AdminDashboard() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("7d");

  const { data: stats, isLoading: statsLoading, isError: statsError, refetch: refetchStats } = useGetDashboardStatsQuery();
  const { data: analytics, isLoading: analyticsLoading, isError: analyticsError, refetch: refetchAnalytics } = useGetDashboardAnalyticsQuery({ range: "7d" });
  const { data: salesReport, isLoading: salesLoading } = useGetSalesReportQuery({ period: dateRange === "7d" ? "weekly" : dateRange === "30d" ? "monthly" : "yearly" });
  const { data: inventoryData, isLoading: inventoryLoading } = useGetInventoryAlertsQuery();
  const { data: customersData, isLoading: customersLoading } = useGetAdminCustomersQuery({ page: 1, limit: 5 });

  /* ─── Derived Data ─── */
  const kpis = useMemo(() => {
    if (!stats) return [];
    const totalOrders = stats.totalOrders || 0;
    const totalCustomers = stats.customerCount || 0;
    const conversionRate = totalCustomers > 0 ? ((totalOrders / totalCustomers) * 100).toFixed(1) : "0.0";
    const avgOrderValue = totalOrders > 0 ? Math.round((stats.totalRevenue || 0) / totalOrders) : 0;

    return [
      {
        title: "Total Revenue",
        value: `৳${(stats.totalRevenue || 0).toLocaleString()}`,
        icon: DollarSign,
        color: "green" as const,
        change: undefined,
        changeLabel: "All time",
      },
      {
        title: "Total Orders",
        value: totalOrders.toLocaleString(),
        icon: ShoppingCart,
        color: "blue" as const,
        change: undefined,
        changeLabel: "All time",
      },
      {
        title: "Total Customers",
        value: totalCustomers.toLocaleString(),
        icon: Users,
        color: "purple" as const,
        change: undefined,
        changeLabel: "Registered",
      },
      {
        title: "Total Products",
        value: (stats.productCount || 0).toLocaleString(),
        icon: Package,
        color: "amber" as const,
        change: undefined,
        changeLabel: "Active",
      },
      {
        title: "Conversion Rate",
        value: `${conversionRate}%`,
        icon: TrendingUp,
        color: "blue" as const,
        change: undefined,
        changeLabel: "Orders / Customers",
      },
      {
        title: "Avg Order Value",
        value: `৳${avgOrderValue.toLocaleString()}`,
        icon: BarChart3,
        color: "purple" as const,
        change: undefined,
        changeLabel: "All time",
      },
    ];
  }, [stats]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const salesData = salesReport as any;

  const dailySales = useMemo(() => {
    if (dateRange === "7d") {
      if (!analytics?.dailySales) return [];
      return analytics.dailySales.map((d) => ({
        date: d._id,
        sales: d.totalSales,
      }));
    }
    if (!salesData?.salesData) return [];
    return (salesData.salesData as Array<{ _id: string; revenue?: number }>).map((d) => ({
      date: d._id,
      sales: d.revenue ?? 0,
    }));
  }, [analytics, salesData, dateRange]);

  const dailyOrders = useMemo(() => {
    if (dateRange === "7d") {
      if (!analytics?.dailySales) return [];
      return analytics.dailySales.map((d) => ({
        date: d._id,
        orders: d.orderCount ?? 0,
      }));
    }
    if (!salesData?.salesData) return [];
    return (salesData.salesData as Array<{ _id: string; orders?: number }>).map((d) => ({
      date: d._id,
      orders: d.orders ?? 0,
    }));
  }, [analytics, salesData, dateRange]);

  const orderStatus = useMemo(() => analytics?.orderStatus || [], [analytics]);

  const lowStockProducts = useMemo(() => {
    if (!inventoryData?.data) return [];
    return (inventoryData.data as Array<Record<string, unknown>>)
      .filter((p) => p.status === "low_stock" || p.status === "out_of_stock")
      .slice(0, 8) as Array<{ _id: string; name: string; stock: number; unit: string; status: string }>;
  }, [inventoryData]);

  const recentCustomers = useMemo(() => {
    if (!customersData?.data) return [];
    return customersData.data.slice(0, 5);
  }, [customersData]);

  const topProducts = useMemo(() => analytics?.topProducts || [], [analytics]);

  /* ─── Error State ─── */
  if (statsError || analyticsError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Something went wrong loading your data.</p>
          </div>
          <button
            onClick={() => { refetchStats(); refetchAnalytics(); }}
            className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
        <DashCard className="flex flex-col items-center justify-center py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-subtle mb-4">
            <AlertTriangle className="h-7 w-7 text-danger" />
          </div>
          <p className="text-base font-semibold text-foreground">Failed to load dashboard</p>
          <p className="text-sm text-muted-foreground mt-1">Check your connection and try again.</p>
        </DashCard>
      </div>
    );
  }

  /* ─── Main Render ─── */
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ─── Header ─── */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Welcome back. Here is your store overview.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date Range Selector */}
          <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                  dateRange === range
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-pressed={dateRange === range}
              >
                {range === "7d" ? "7D" : range === "30d" ? "30D" : "90D"}
              </button>
            ))}
          </div>
          <button
            onClick={() => { refetchStats(); refetchAnalytics(); }}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Refresh data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* ─── KPI Cards ─── */}
      <motion.div variants={itemVariants}>
        {statsLoading ? (
          <KPISkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpis.map((kpi) => (
              <StatCard key={kpi.title} {...kpi} />
            ))}
          </div>
        )}
      </motion.div>

      {/* ─── Charts Row ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <DashCard className="lg:col-span-2 p-6">
          <SectionHeader title="Revenue Trend" action="View Report" actionHref="/admin/reports" />
          {analyticsLoading || salesLoading ? (
            <ChartSkeleton height={280} />
          ) : dailySales.length === 0 ? (
            <EmptyState icon={BarChart3} title="No revenue data" description="Sales will appear here once orders are placed." />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dailySales}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: string) => v.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `৳${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                  name="sales"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2, stroke: "#22c55e", fill: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </DashCard>

        {/* Order Status Distribution */}
        <DashCard className="p-6">
          <SectionHeader title="Order Status" />
          {analyticsLoading ? (
            <ChartSkeleton height={200} />
          ) : orderStatus.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No orders yet" description="Order status will appear here." />
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={orderStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    dataKey="count"
                    nameKey="_id"
                    strokeWidth={0}
                    paddingAngle={2}
                  >
                    {orderStatus.map((entry: { _id: string }, i: number) => (
                      <Cell key={i} fill={STATUS_COLORS[entry._id] || "#a1a1aa"} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2.5 mt-4">
                {orderStatus.map((entry: { _id: string; count: number }) => (
                  <div key={entry._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: STATUS_COLORS[entry._id] || "#a1a1aa" }}
                        aria-hidden="true"
                      />
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

      {/* ─── Orders Chart ─── */}
      <motion.div variants={itemVariants}>
        <DashCard className="p-6">
          <SectionHeader title="Orders Overview" action="View All" actionHref="/admin/orders" />
          {analyticsLoading || salesLoading ? (
            <ChartSkeleton height={240} />
          ) : dailyOrders.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No order data" description="Order trends will appear here." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: string) => v.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="orders"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  name="orders"
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </DashCard>
      </motion.div>

      {/* ─── Three Column Grid: Recent Orders, Top Products, Low Stock ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Orders */}
        <DashCard className="xl:col-span-1">
          <div className="p-5 pb-0">
            <SectionHeader title="Recent Orders" action="View All" actionHref="/admin/orders" />
          </div>
          {statsLoading ? (
            <TableSkeleton rows={5} />
          ) : (stats?.recentOrders || []).length === 0 ? (
            <div className="p-5">
              <EmptyState icon={ShoppingCart} title="No orders yet" description="Orders will appear here." />
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {(stats?.recentOrders || []).slice(0, 7).map((order) => (
                <div key={order._id} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => router.push("/admin/orders")}
                      className="text-[13px] font-mono font-semibold text-foreground hover:text-primary transition-colors shrink-0"
                      aria-label={`View order ${order._id.slice(-6).toUpperCase()}`}
                    >
                      #{order._id.slice(-6).toUpperCase()}
                    </button>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{order.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={order.status} label={STATUS_LABELS[order.status] || order.status} />
                    <span className="text-[13px] font-semibold text-foreground tabular-nums">৳{order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashCard>

        {/* Top Products */}
        <DashCard className="xl:col-span-1">
          <div className="p-5 pb-0">
            <SectionHeader title="Top Products" action="View All" actionHref="/admin/products" />
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-[11px] font-bold text-muted-foreground shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{product.totalSold} sold</p>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground tabular-nums shrink-0">৳{product.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </DashCard>

        {/* Low Stock Products */}
        <DashCard className="xl:col-span-1">
          <div className="p-5 pb-0">
            <SectionHeader title="Low Stock" action="View All" actionHref="/admin/inventory" />
          </div>
          {inventoryLoading ? (
            <TableSkeleton rows={5} />
          ) : lowStockProducts.length === 0 ? (
            <div className="p-5">
              <EmptyState icon={Package} title="Stock is healthy" description="No products are running low." />
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {lowStockProducts.map((product: { _id: string; name: string; stock: number; unit: string; status: string }) => (
                <div key={product._id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
                    product.status === "out_of_stock" ? "bg-danger-subtle" : "bg-warning-subtle",
                  )}>
                    <AlertTriangle className={cn(
                      "h-4 w-4",
                      product.status === "out_of_stock" ? "text-danger" : "text-warning",
                    )} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{product.unit}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn(
                      "text-[13px] font-bold tabular-nums",
                      product.status === "out_of_stock" ? "text-danger" : "text-warning",
                    )}>
                      {product.stock}
                    </p>
                    <p className="text-[10px] text-muted-foreground">units</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashCard>
      </motion.div>

      {/* ─── Recent Customers ─── */}
      <motion.div variants={itemVariants}>
        <DashCard className="p-6">
          <SectionHeader title="Recent Customers" action="View All" actionHref="/admin/customers" />
          {customersLoading ? (
            <TableSkeleton rows={5} />
          ) : recentCustomers.length === 0 ? (
            <EmptyState icon={Users} title="No customers yet" description="New customers will appear here." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" aria-label="Recent customers">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Orders</th>
                    <th className="text-right py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Total Spent</th>
                    <th className="text-right py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentCustomers.map((customer) => {
                    const initials = (customer.name || "U").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                    return (
                      <tr key={customer._id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-[11px] font-bold shrink-0">
                              {initials}
                            </div>
                            <span className="text-[13px] font-medium text-foreground">{customer.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground hidden sm:table-cell">{customer.email}</td>
                        <td className="py-3 px-4 text-[13px] font-medium text-foreground tabular-nums hidden md:table-cell">{customer.orderCount || 0}</td>
                        <td className="py-3 px-4 text-[13px] font-semibold text-foreground tabular-nums text-right hidden md:table-cell">৳{(customer.totalSpent || 0).toLocaleString()}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground text-right">
                          {new Date(customer.createdAt).toLocaleDateString("en-BD", { month: "short", day: "numeric" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </DashCard>
      </motion.div>

      {/* ─── Recent Activity ─── */}
      <motion.div variants={itemVariants}>
        <DashCard className="p-6">
          <SectionHeader title="Recent Activity" action="View Logs" actionHref="/admin/activity-logs" />
          {statsLoading ? (
            <TableSkeleton rows={4} />
          ) : (stats?.recentOrders || []).length === 0 ? (
            <EmptyState icon={Activity} title="No recent activity" description="Activity will appear here as events occur." />
          ) : (
            <div className="space-y-0">
              {(stats?.recentOrders || []).slice(0, 6).map((order, i) => {
                const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
                  pending: { color: "text-warning", bg: "bg-warning-subtle", icon: Clock },
                  processing: { color: "text-primary", bg: "bg-primary/10", icon: Loader2 },
                  confirmed: { color: "text-info", bg: "bg-info-subtle", icon: ShoppingCart },
                  shipped: { color: "text-accent", bg: "bg-accent/10", icon: ArrowUpRight },
                  delivered: { color: "text-success", bg: "bg-success-subtle", icon: Package },
                  cancelled: { color: "text-danger", bg: "bg-danger-subtle", icon: AlertTriangle },
                };
                const config = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = config.icon;
                const timeAgo = getTimeAgo(order.createdAt);

                return (
                  <div key={order._id} className="flex items-start gap-3 py-3">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg shrink-0 mt-0.5", config.bg)}>
                      <StatusIcon className={cn("h-4 w-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-foreground">
                        <span className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</span>
                        {" "}status changed to{" "}
                        <span className={cn("font-semibold capitalize", config.color)}>{order.status}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{timeAgo}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-foreground tabular-nums shrink-0">৳{order.total.toLocaleString()}</span>
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

/* ─── Helpers ─── */
function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-BD", { month: "short", day: "numeric" });
}
