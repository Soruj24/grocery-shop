"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetAdminCustomerDetailsQuery } from "@/redux/apiSlice";
import {
  ArrowLeft, User, Mail, Phone, MapPin, Calendar, ShoppingCart,
  DollarSign, Star, Clock, TrendingUp, Package, Loader2, CreditCard,
  Award, Activity,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/utils/utils";
import StatusBadge from "@/features/admin/components/StatusBadge";

/* ─── Helpers ─── */
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-BD", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-BD", { month: "short", day: "numeric", year: "numeric" }) + " at " + d.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" });
}

/* ─── Loading ─── */
function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-muted" />
        <div className="h-6 w-48 rounded bg-muted" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="h-64 rounded-xl bg-muted" />
          <div className="h-40 rounded-xl bg-muted" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="h-48 rounded-xl bg-muted" />
          <div className="h-64 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}

/* ─── Error ─── */
function ErrorState() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-subtle mb-4">
        <span className="text-danger text-2xl">!</span>
      </div>
      <p className="text-base font-semibold text-foreground">Customer not found</p>
      <p className="text-sm text-muted-foreground mt-1">This customer may have been removed.</p>
      <button onClick={() => router.push("/admin/customers")} className="mt-4 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
        Back to Customers
      </button>
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, isError } = useGetAdminCustomerDetailsQuery(id);

  if (isLoading) return <LoadingSkeleton />;
  if (isError || !data) return <ErrorState />;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customer = data as any;
  const stats = customer.stats || {};
  const orders = customer.orders || [];
  const monthlySpending = customer.monthlySpending || [];
  const reviews = customer.reviews || [];

  const initials = (customer.name || "U").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/admin/customers")} className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Back to customers">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{customer.name}</h1>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
        <div className="ml-auto">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border",
            stats.isActive
              ? "bg-success-subtle text-success border-success/20"
              : "bg-muted text-muted-foreground border-border",
          )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", stats.isActive ? "bg-success" : "bg-muted-foreground")} />
            {stats.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Left Column ─── */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="h-20 bg-gradient-to-br from-primary/20 to-primary/5" />
            <div className="px-5 pb-5 -mt-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold border-4 border-card">
                {initials}
              </div>
              <h2 className="text-lg font-bold text-foreground mt-3">{customer.name}</h2>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
              <div className="mt-4 space-y-2.5">
                {customer.phone && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground font-mono">{customer.phone}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-start gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-foreground">{customer.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Joined {formatDate(customer.createdAt)}</span>
                </div>
                {stats.memberDays !== undefined && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Member for {stats.memberDays} days</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                  stats.isActive
                    ? "bg-success-subtle text-success border-success/20"
                    : "bg-muted text-muted-foreground border-border",
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", stats.isActive ? "bg-success" : "bg-muted-foreground")} />
                  {stats.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Loyalty Points</span>
                <span className="text-sm font-bold text-foreground tabular-nums">{customer.loyaltyPoints || 0}</span>
              </div>
              {customer.subscription && customer.subscription.plan !== "none" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subscription</span>
                    <span className="text-sm font-semibold text-foreground capitalize">{customer.subscription.plan}</span>
                  </div>
                  {customer.subscription.nextDelivery && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next Delivery</span>
                      <span className="text-sm text-foreground">{formatDate(customer.subscription.nextDelivery)}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reviews ({reviews.length})</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {reviews.map((review: Record<string, unknown>) => {
                  const comment = String(review.comment || "");
                  return (
                    <div key={String(review._id)} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={cn("h-3 w-3", i < (review.rating as number) ? "text-warning fill-warning" : "text-muted-foreground/30")} />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{formatDate(review.createdAt as string)}</span>
                      </div>
                      <p className="text-xs font-medium text-foreground">{String(review.product)}</p>
                      {comment && <p className="text-[11px] text-muted-foreground mt-1">{comment}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ─── Right Column ─── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={ShoppingCart} label="Total Orders" value={String(stats.totalOrders || 0)} color="bg-primary/10 text-primary" />
            <StatCard icon={DollarSign} label="Total Spent" value={`৳${(stats.totalSpent || 0).toLocaleString()}`} color="bg-success-subtle text-success" />
            <StatCard icon={TrendingUp} label="Avg Order" value={`৳${Math.round(stats.avgOrderValue || 0).toLocaleString()}`} color="bg-accent/10 text-accent" />
            <StatCard icon={Award} label="Loyalty Points" value={String(customer.loyaltyPoints || 0)} color="bg-warning-subtle text-warning" />
          </div>

          {/* Spending Chart */}
          {monthlySpending.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Monthly Spending</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="_id" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `৳${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: "10px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: "12px" }}
                  />
                  <Bar dataKey="spent" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Order History */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order History ({orders.length})</h3>
            </div>
            {orders.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No orders yet</p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {orders.map((order: Record<string, unknown>) => {
                  const statusColors: Record<string, string> = {
                    pending: "bg-warning-subtle text-warning border-warning/20",
                    confirmed: "bg-info-subtle text-info border-info/20",
                    processing: "bg-primary/10 text-primary border-primary/20",
                    shipped: "bg-accent/10 text-accent border-accent/20",
                    delivered: "bg-success-subtle text-success border-success/20",
                    cancelled: "bg-danger-subtle text-danger border-danger/20",
                  };
                  const dotColors: Record<string, string> = {
                    pending: "bg-warning", confirmed: "bg-info", processing: "bg-primary",
                    shipped: "bg-accent", delivered: "bg-success", cancelled: "bg-danger",
                  };
                  const items = (order.items as Array<{ name: string; price: number; quantity: number }>) || [];

                  return (
                    <div key={String(order._id)} className="px-5 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[13px] font-mono font-semibold text-foreground">#{String(order._id).slice(-6).toUpperCase()}</p>
                            <span className={cn(
                              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                              statusColors[String(order.status)] || "bg-muted text-muted-foreground border-border",
                            )}>
                              <span className={cn("w-1 h-1 rounded-full", dotColors[String(order.status)] || "bg-muted-foreground")} />
                              {String(order.status)}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{formatDateTime(String(order.createdAt))}</p>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {items.slice(0, 3).map((item, i) => (
                              <span key={i} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                                {item.name} × {item.quantity}
                              </span>
                            ))}
                            {items.length > 3 && (
                              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                                +{items.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-[13px] font-bold text-foreground tabular-nums shrink-0">৳{Number(order.total).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
