"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown,
  MoreHorizontal, Package, Check, ChevronDown, X, Loader2, Eye,
  Download, Calendar, Truck, CreditCard,
} from "lucide-react";
import { cn } from "@/utils/utils";
import type { AdminOrder } from "@/types/admin";

/* ─── Types ─── */
interface OrdersTableProps {
  data: AdminOrder[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  search: string;
  onSearchChange: (v: string) => void;
  sort: string;
  sortDir: "asc" | "desc";
  onSort: (key: string) => void;
  page: number;
  onPageChange: (p: number) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  paymentFilter: string;
  onPaymentFilterChange: (v: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateChange: (from: string, to: string) => void;
  selectedIds: string[];
  onSelectToggle: (id: string) => void;
  onSelectAll: () => void;
  onBulkStatus: (status: string) => void;
  onBulkPaymentStatus: (status: string) => void;
  onBulkExport: () => void;
  onRowClick: (order: AdminOrder) => void;
  onStatusChange: (orderId: string, status: string) => void;
  bulkLoading: boolean;
}

/* ─── Constants ─── */
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "text-warning", bg: "bg-warning-subtle", border: "border-warning/20", dot: "bg-warning" },
  { value: "confirmed", label: "Confirmed", color: "text-info", bg: "bg-info-subtle", border: "border-info/20", dot: "bg-info" },
  { value: "processing", label: "Processing", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", dot: "bg-primary" },
  { value: "shipped", label: "Shipped", color: "text-accent", bg: "bg-accent/10", border: "border-accent/20", dot: "bg-accent" },
  { value: "delivered", label: "Delivered", color: "text-success", bg: "bg-success-subtle", border: "border-success/20", dot: "bg-success" },
  { value: "cancelled", label: "Cancelled", color: "text-danger", bg: "bg-danger-subtle", border: "border-danger/20", dot: "bg-danger" },
];

const PAYMENT_METHODS: Record<string, string> = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
  card: "Card",
};

const PAYMENT_STATUS_MAP: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  unpaid: { label: "Unpaid", color: "text-warning", bg: "bg-warning-subtle", border: "border-warning/20", dot: "bg-warning" },
  paid: { label: "Paid", color: "text-success", bg: "bg-success-subtle", border: "border-success/20", dot: "bg-success" },
  partially_paid: { label: "Partial", color: "text-info", bg: "bg-info-subtle", border: "border-info/20", dot: "bg-info" },
};

/* ─── Helpers ─── */
function getStatusInfo(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

function getPaymentInfo(status: string) {
  return PAYMENT_STATUS_MAP[status] || PAYMENT_STATUS_MAP.unpaid;
}

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-BD", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" });
}

/* ─── Filter Pill ─── */
function FilterPill({ label, value, options, onChange, icon: Icon }: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (v: string) => void;
  icon?: React.ElementType;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
          value ? "border-foreground/20 bg-foreground/5 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
        {active && active.value && <span className="text-foreground">: {active.label}</span>}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 w-44 rounded-xl border border-border bg-card shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2"
          role="listbox"
        >
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className={cn(
              "flex w-full items-center px-3 py-2 text-[13px] transition-colors",
              !value ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            role="option"
            aria-selected={!value}
          >
            All {label}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-[13px] transition-colors",
                value === opt.value ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              role="option"
              aria-selected={value === opt.value}
            >
              {opt.label}
              {value === opt.value && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Date Range Picker ─── */
function DateRangePicker({ from, to, onChange }: { from: string; to: string; onChange: (f: string, t: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const active = from || to;
  const label = from && to
    ? `${formatDate(from)} — ${formatDate(to)}`
    : from
    ? `From ${formatDate(from)}`
    : to
    ? `Until ${formatDate(to)}`
    : "";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
          active ? "border-foreground/20 bg-foreground/5 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
        )}
        aria-expanded={open}
      >
        <Calendar className="h-3.5 w-3.5" />
        {active ? label : "Date Range"}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-card shadow-lg z-50 p-4 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">From</label>
              <input
                type="date"
                value={from}
                onChange={(e) => onChange(e.target.value, to)}
                className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">To</label>
              <input
                type="date"
                value={to}
                onChange={(e) => onChange(from, e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-ring outline-none"
              />
            </div>
            {(from || to) && (
              <button
                onClick={() => { onChange("", ""); setOpen(false); }}
                className="w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground py-1"
              >
                Clear dates
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function OrdersTable({
  data, totalCount, currentPage, totalPages, loading,
  search, onSearchChange,
  sort, sortDir, onSort,
  page, onPageChange,
  statusFilter, onStatusFilterChange,
  paymentFilter, onPaymentFilterChange,
  dateFrom, dateTo, onDateChange,
  selectedIds, onSelectToggle, onSelectAll,
  onBulkStatus, onBulkPaymentStatus, onBulkExport,
  onRowClick, onStatusChange,
  bulkLoading,
}: OrdersTableProps) {
  const allSelected = data.length > 0 && data.every((o) => selectedIds.includes(o._id));
  const someSelected = selectedIds.length > 0;

  const sortIcon = (key: string) => {
    if (sort !== key) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* ─── Toolbar ─── */}
      <div className="border-b border-border">
        {/* Search + Filters Row */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search orders"
              className={cn(
                "w-full rounded-lg border border-border bg-muted pl-10 pr-4 py-2",
                "text-sm text-foreground placeholder:text-muted-foreground",
                "focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all",
              )}
            />
            {search && (
              <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <FilterPill
            label="Status"
            value={statusFilter}
            options={STATUS_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            onChange={onStatusFilterChange}
            icon={Truck}
          />
          <FilterPill
            label="Payment"
            value={paymentFilter}
            options={Object.entries(PAYMENT_STATUS_MAP).map(([k, v]) => ({ value: k, label: v.label }))}
            onChange={onPaymentFilterChange}
            icon={CreditCard}
          />
          <DateRangePicker from={dateFrom} to={dateTo} onChange={onDateChange} />
        </div>

        {/* Bulk Actions Bar */}
        {someSelected && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/5 border-t border-primary/10">
            <span className="text-xs font-medium text-primary">{selectedIds.length} selected</span>
            <div className="h-4 w-px bg-primary/20" />
            <select
              onChange={(e) => { if (e.target.value) { onBulkStatus(e.target.value); e.target.value = ""; } }}
              defaultValue=""
              className="text-xs font-medium text-foreground bg-muted border border-border rounded-md px-2 py-1 cursor-pointer"
            >
              <option value="" disabled>Set Status</option>
              {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <select
              onChange={(e) => { if (e.target.value) { onBulkPaymentStatus(e.target.value); e.target.value = ""; } }}
              defaultValue=""
              className="text-xs font-medium text-foreground bg-muted border border-border rounded-md px-2 py-1 cursor-pointer"
            >
              <option value="" disabled>Set Payment</option>
              {Object.entries(PAYMENT_STATUS_MAP).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <button
              onClick={onBulkExport}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button onClick={onSelectAll} className="ml-auto text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          </div>
        )}
      </div>

      {/* ─── Table ─── */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left" aria-label="Orders table">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="w-12 px-5 py-3" scope="col">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={onSelectAll}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer"
                  aria-label="Select all orders"
                />
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors" scope="col" onClick={() => onSort("createdAt")} aria-sort={sort === "createdAt" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                <div className="flex items-center gap-1.5">Order {sortIcon("createdAt")}</div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground" scope="col">Customer</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell" scope="col">Products</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors" scope="col" onClick={() => onSort("total")} aria-sort={sort === "total" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                <div className="flex items-center gap-1.5">Total {sortIcon("total")}</div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell" scope="col">Payment</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground" scope="col">Status</th>
              <th className="w-12 px-5 py-3" scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={`skel-${i}`}>
                  <td className="px-5 py-3"><div className="h-4 w-4 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-4 w-24 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-4 w-28 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3 hidden md:table-cell"><div className="h-4 w-16 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-4 w-16 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3 hidden lg:table-cell"><div className="h-4 w-16 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-6 w-16 rounded-full bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-8 w-8 rounded-lg bg-muted animate-pulse" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted mb-4">
                      <Package className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No orders found</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      {search || statusFilter || paymentFilter || dateFrom || dateTo
                        ? "Try adjusting your filters."
                        : "Orders will appear here once customers start ordering."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const paymentInfo = getPaymentInfo(order.paymentStatus || "unpaid");
                const isSelected = selectedIds.includes(order._id);
                const customerName = order.name || (order.guestInfo?.name) || order.phone || "Unknown";
                const itemCount = order.items?.length || 0;

                return (
                  <tr
                    key={order._id}
                    className={cn(
                      "transition-colors hover:bg-muted/40 cursor-pointer",
                      isSelected && "bg-primary/5 hover:bg-primary/5",
                    )}
                    onClick={() => onRowClick(order)}
                  >
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectToggle(order._id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer"
                        aria-label={`Select order ${order._id.slice(-6).toUpperCase()}`}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <div>
                        <p className="text-[13px] font-mono font-semibold text-foreground">#{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-[11px] text-muted-foreground">{formatDate(order.createdAt)} {formatTime(order.createdAt)}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div>
                        <p className="text-[13px] font-medium text-foreground truncate max-w-[160px]">{customerName}</p>
                        <p className="text-[11px] text-muted-foreground">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-[13px] font-bold text-foreground tabular-nums">৳{order.total.toLocaleString()}</p>
                      {order.coupon && (
                        <p className="text-[10px] text-success font-medium">Coupon: {order.coupon.code}</p>
                      )}
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <div>
                        <p className="text-[11px] font-medium text-foreground">{PAYMENT_METHODS[order.paymentMethod || "cod"] || order.paymentMethod}</p>
                        <span className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-semibold",
                          paymentInfo.color,
                        )}>
                          <span className={cn("w-1 h-1 rounded-full", paymentInfo.dot)} />
                          {paymentInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => onStatusChange(order._id, e.target.value)}
                        aria-label={`Status for order ${order._id.slice(-6).toUpperCase()}`}
                        className={cn(
                          "text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer outline-none focus:ring-2 focus:ring-ring",
                          statusInfo.bg, statusInfo.color, statusInfo.border,
                        )}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onRowClick(order)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label={`View order ${order._id.slice(-6).toUpperCase()}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Pagination ─── */}
      {!loading && totalPages > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-3.5" role="navigation" aria-label="Pagination">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {totalCount > 0
              ? `Showing ${(currentPage - 1) * 20 + 1} to ${Math.min(currentPage * 20, totalCount)} of ${totalCount} orders`
              : "No orders"}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors" aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;
              return (
                <button key={p} onClick={() => onPageChange(p)} aria-label={`Page ${p}`} aria-current={p === page ? "page" : undefined}
                  className={cn("h-8 w-8 rounded-lg text-xs font-medium transition-colors", p === page ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>
                  {p}
                </button>
              );
            })}
            <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors" aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
