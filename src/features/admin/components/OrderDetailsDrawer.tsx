"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Package, User, CreditCard, Truck, Clock, MapPin, Phone, Mail,
  Hash, Tag, Loader2, ChevronRight, CheckCircle2, Circle, AlertCircle,
} from "lucide-react";
import { cn } from "@/utils/utils";
import type { AdminOrder } from "@/types/admin";

/* ─── Types ─── */
interface OrderDetailsDrawerProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, status: string) => void;
  onPaymentStatusChange: (orderId: string, status: string) => void;
  updating: boolean;
}

/* ─── Constants ─── */
const STATUS_FLOW = ["pending", "confirmed", "processing", "shipped", "delivered"];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "text-warning", bg: "bg-warning-subtle", border: "border-warning/20", icon: Clock },
  confirmed: { label: "Confirmed", color: "text-info", bg: "bg-info-subtle", border: "border-info/20", icon: CheckCircle2 },
  processing: { label: "Processing", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", icon: Package },
  shipped: { label: "Shipped", color: "text-accent", bg: "bg-accent/10", border: "border-accent/20", icon: Truck },
  delivered: { label: "Delivered", color: "text-success", bg: "bg-success-subtle", border: "border-success/20", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "text-danger", bg: "bg-danger-subtle", border: "border-danger/20", icon: AlertCircle },
};

const PAYMENT_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  unpaid: { label: "Unpaid", color: "text-warning", bg: "bg-warning-subtle", border: "border-warning/20" },
  paid: { label: "Paid", color: "text-success", bg: "bg-success-subtle", border: "border-success/20" },
  partially_paid: { label: "Partial", color: "text-info", bg: "bg-info-subtle", border: "border-info/20" },
};

const PAYMENT_METHODS: Record<string, string> = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
  card: "Card",
};

/* ─── Helpers ─── */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-BD", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" });
}

function formatDateTime(dateString: string): string {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
}

/* ─── Section ─── */
function Section({ title, icon: Icon, children, className }: { title: string; icon: React.ElementType; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
      </div>
      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
        {children}
      </div>
    </div>
  );
}

/* ─── Info Row ─── */
function InfoRow({ label, value, mono, bold }: { label: string; value: string; mono?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("text-xs", mono && "font-mono", bold ? "font-bold text-foreground" : "font-medium text-foreground")}>{value}</span>
    </div>
  );
}

/* ─── Main Component ─── */
export default function OrderDetailsDrawer({
  order,
  isOpen,
  onClose,
  onStatusChange,
  onPaymentStatusChange,
  updating,
}: OrderDetailsDrawerProps) {
  /* ─── Escape key ─── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* ─── Build timeline from order data ─── */
  const timeline = useCallback(() => {
    if (!order) return [];
    const events: Array<{ status: string; label: string; time: string; done: boolean; current: boolean }> = [];
    const currentIdx = STATUS_FLOW.indexOf(order.status);

    if (order.status === "cancelled") {
      events.push({ status: "cancelled", label: "Order Placed", time: formatDateTime(order.createdAt), done: true, current: false });
      events.push({ status: "cancelled", label: "Cancelled", time: "—", done: true, current: true });
    } else {
      STATUS_FLOW.forEach((s, i) => {
        const config = STATUS_CONFIG[s];
        const done = i <= currentIdx;
        const current = i === currentIdx;
        events.push({
          status: s,
          label: config.label,
          time: done ? (current ? "Current" : "Completed") : "Pending",
          done,
          current,
        });
      });
    }
    return events;
  }, [order]);

  if (!order) return null;

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const paymentConfig = PAYMENT_CONFIG[order.paymentStatus || "unpaid"] || PAYMENT_CONFIG.unpaid;
  const customerName = order.name || order.guestInfo?.name || order.phone || "Unknown";
  const customerEmail = order.guestInfo?.email || "";
  const customerPhone = order.phone;
  const subtotal = order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const discount = order.coupon?.discount || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-card border-l border-border shadow-xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`Order ${order._id.slice(-6).toUpperCase()} details`}
          >
            {/* ─── Header ─── */}
            <div className="shrink-0 px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-foreground">Order #{order._id.slice(-6).toUpperCase()}</h2>
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border", statusConfig.bg, statusConfig.color, statusConfig.border)}>
                      <span className={cn("w-1 h-1 rounded-full", statusConfig.color.replace("text-", "bg-"))} />
                      {statusConfig.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDateTime(order.createdAt)}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ─── Content ─── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

              {/* Status Management */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manage Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Order Status</label>
                    <select
                      value={order.status}
                      onChange={(e) => onStatusChange(order._id, e.target.value)}
                      disabled={updating}
                      className={cn(
                        "w-full text-xs font-semibold px-3 py-2 rounded-lg border cursor-pointer outline-none focus:ring-2 focus:ring-ring disabled:opacity-50",
                        statusConfig.bg, statusConfig.color, statusConfig.border,
                      )}
                    >
                      {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Payment Status</label>
                    <select
                      value={order.paymentStatus || "unpaid"}
                      onChange={(e) => onPaymentStatusChange(order._id, e.target.value)}
                      disabled={updating}
                      className={cn(
                        "w-full text-xs font-semibold px-3 py-2 rounded-lg border cursor-pointer outline-none focus:ring-2 focus:ring-ring disabled:opacity-50",
                        paymentConfig.bg, paymentConfig.color, paymentConfig.border,
                      )}
                    >
                      {Object.entries(PAYMENT_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                </div>
                {updating && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Updating...
                  </div>
                )}
              </div>

              {/* Order Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order Timeline</h3>
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="space-y-0">
                    {timeline().map((event, i) => {
                      const config = STATUS_CONFIG[event.status];
                      const Icon = config?.icon || Circle;
                      return (
                        <div key={i} className="flex gap-3 relative">
                          {/* Vertical line */}
                          {i < timeline().length - 1 && (
                            <div className={cn("absolute left-[11px] top-6 w-0.5 h-full", event.done ? "bg-foreground/20" : "bg-border")} />
                          )}
                          {/* Icon */}
                          <div className={cn(
                            "relative z-10 flex h-6 w-6 items-center justify-center rounded-full shrink-0 border",
                            event.current ? `${config.bg} ${config.border}` :
                            event.done ? "bg-foreground/10 border-foreground/20" : "bg-muted border-border",
                          )}>
                            <Icon className={cn(
                              "h-3 w-3",
                              event.current ? config.color :
                              event.done ? "text-foreground/60" : "text-muted-foreground",
                            )} />
                          </div>
                          {/* Label */}
                          <div className="pb-5 min-w-0">
                            <p className={cn(
                              "text-xs font-semibold",
                              event.current ? config.color :
                              event.done ? "text-foreground" : "text-muted-foreground",
                            )}>
                              {event.label}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <Section title="Customer" icon={User}>
                <InfoRow label="Name" value={customerName} bold />
                {customerEmail && <InfoRow label="Email" value={customerEmail} />}
                <InfoRow label="Phone" value={customerPhone} mono />
                <InfoRow label="Address" value={order.address || "—"} />
                {order.deliveryBoy && (
                  <>
                    <div className="border-t border-border/50 my-2" />
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Delivery Person</p>
                    <InfoRow label="Name" value={order.deliveryBoy.name} />
                    <InfoRow label="Phone" value={order.deliveryBoy.phone} mono />
                  </>
                )}
              </Section>

              {/* Products */}
              <Section title="Products" icon={Package}>
                <div className="space-y-2.5">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 overflow-hidden">
                        {item.product?.image ? (
                          <img src={item.product.image} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <Package className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">Qty: {item.quantity} × ৳{item.price.toLocaleString()}</p>
                      </div>
                      <p className="text-[13px] font-bold text-foreground tabular-nums shrink-0">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/50 pt-3 mt-3 space-y-1.5">
                  <InfoRow label="Subtotal" value={`৳${subtotal.toLocaleString()}`} />
                  {discount > 0 && <InfoRow label={`Discount (${order.coupon?.code})`} value={`-৳${discount.toLocaleString()}`} />}
                  <div className="border-t border-border/50 pt-1.5">
                    <InfoRow label="Total" value={`৳${order.total.toLocaleString()}`} bold />
                  </div>
                </div>
              </Section>

              {/* Payment Information */}
              <Section title="Payment" icon={CreditCard}>
                <InfoRow label="Method" value={PAYMENT_METHODS[order.paymentMethod || "cod"] || order.paymentMethod || "—"} />
                <InfoRow label="Status" value={paymentConfig.label} bold />
                {order.transactionId && <InfoRow label="Transaction ID" value={order.transactionId} mono />}
                {order.coupon && (
                  <>
                    <div className="border-t border-border/50 my-2" />
                    <InfoRow label="Coupon" value={order.coupon.code} />
                    <InfoRow label="Coupon Discount" value={`-৳${order.coupon.discount.toLocaleString()}`} />
                  </>
                )}
              </Section>

              {/* Shipping Information */}
              <Section title="Shipping" icon={Truck}>
                <InfoRow label="Method" value={order.deliveryMethod || "Standard"} />
                <InfoRow label="Slot" value={order.deliverySlot || "Morning"} />
                <InfoRow label="Delivery Status" value={order.deliveryStatus || "Pending"} />
                {order.trackingId && <InfoRow label="Tracking ID" value={order.trackingId} mono />}
              </Section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
