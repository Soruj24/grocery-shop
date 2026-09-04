"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown,
  Users, Check, ChevronDown, X, Eye, UserCheck, UserX,
} from "lucide-react";
import { cn } from "@/utils/utils";
import type { AdminCustomer } from "@/types/admin";

/* ─── Types ─── */
interface CustomersTableProps {
  data: AdminCustomer[];
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
  onRowClick: (customer: AdminCustomer) => void;
}

/* ─── Helpers ─── */
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleDateString("en-BD", { month: "short", day: "numeric", year: "numeric" });
}

function formatRelativeDate(dateString: string | null | undefined): string {
  if (!dateString) return "No orders";
  const now = new Date();
  const date = new Date(dateString);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function isActive(lastOrderDate: string | null | undefined): boolean {
  if (!lastOrderDate) return false;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(lastOrderDate) >= thirtyDaysAgo;
}

/* ─── Filter Pill ─── */
function FilterPill({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (v: string) => void;
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
        {label}
        {active && active.value && <span className="text-foreground">: {active.label}</span>}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 w-40 rounded-xl border border-border bg-card shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2"
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

/* ─── Main Component ─── */
export default function CustomersTable({
  data, totalCount, currentPage, totalPages, loading,
  search, onSearchChange,
  sort, sortDir, onSort,
  page, onPageChange,
  statusFilter, onStatusFilterChange,
  onRowClick,
}: CustomersTableProps) {
  const sortIcon = (key: string) => {
    if (sort !== key) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* ─── Toolbar ─── */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-border">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search customers"
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
        <FilterPill
          label="Status"
          value={statusFilter}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          onChange={onStatusFilterChange}
        />
      </div>

      {/* ─── Table ─── */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left" aria-label="Customers table">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors" scope="col" onClick={() => onSort("name")} aria-sort={sort === "name" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                <div className="flex items-center gap-1.5">Customer {sortIcon("name")}</div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell" scope="col">Phone</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell" scope="col">Status</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right cursor-pointer select-none hover:text-foreground transition-colors" scope="col" onClick={() => onSort("totalSpent")} aria-sort={sort === "totalSpent" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                <div className="flex items-center justify-end gap-1.5">Total Spent {sortIcon("totalSpent")}</div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right hidden md:table-cell" scope="col">Orders</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell" scope="col">Last Order</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors" scope="col" onClick={() => onSort("createdAt")} aria-sort={sort === "createdAt" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                <div className="flex items-center gap-1.5">Joined {sortIcon("createdAt")}</div>
              </th>
              <th className="w-12 px-5 py-3" scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={`skel-${i}`}>
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-muted animate-pulse" /><div className="space-y-1.5"><div className="h-3.5 w-28 rounded bg-muted animate-pulse" /><div className="h-2.5 w-36 rounded bg-muted animate-pulse" /></div></div></td>
                  <td className="px-5 py-3 hidden md:table-cell"><div className="h-3.5 w-24 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3 hidden lg:table-cell"><div className="h-6 w-14 rounded-full bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3 text-right"><div className="h-3.5 w-16 rounded bg-muted animate-pulse ml-auto" /></td>
                  <td className="px-5 py-3 text-right hidden md:table-cell"><div className="h-3.5 w-8 rounded bg-muted animate-pulse ml-auto" /></td>
                  <td className="px-5 py-3 hidden lg:table-cell"><div className="h-3.5 w-16 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-3.5 w-20 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-8 w-8 rounded-lg bg-muted animate-pulse" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted mb-4">
                      <Users className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No customers found</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      {search || statusFilter
                        ? "Try adjusting your search or filters."
                        : "Customers will appear here once they register."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((customer) => {
                const active = isActive(customer.lastOrderDate);
                const initials = (customer.name || "U").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

                return (
                  <tr
                    key={customer._id}
                    className="transition-colors hover:bg-muted/40 cursor-pointer"
                    onClick={() => onRowClick(customer)}
                  >
                    {/* Customer */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-foreground truncate max-w-[180px]">{customer.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Phone */}
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground font-mono">{customer.phone || "—"}</span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                        active
                          ? "bg-success-subtle text-success border-success/20"
                          : "bg-muted text-muted-foreground border-border",
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-success" : "bg-muted-foreground")} />
                        {active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    {/* Total Spent */}
                    <td className="px-5 py-3 text-right">
                      <span className="text-[13px] font-bold text-foreground tabular-nums">৳{(customer.totalSpent || 0).toLocaleString()}</span>
                    </td>
                    {/* Orders */}
                    <td className="px-5 py-3 text-right hidden md:table-cell">
                      <span className="text-[13px] font-semibold text-foreground tabular-nums">{customer.orderCount || 0}</span>
                    </td>
                    {/* Last Order */}
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <div>
                        <p className="text-xs text-foreground">{formatRelativeDate(customer.lastOrderDate)}</p>
                        <p className="text-[10px] text-muted-foreground">{formatDate(customer.lastOrderDate)}</p>
                      </div>
                    </td>
                    {/* Joined */}
                    <td className="px-5 py-3">
                      <span className="text-xs text-muted-foreground">{formatDate(customer.createdAt)}</span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onRowClick(customer)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label={`View ${customer.name}`}
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
              ? `Showing ${(currentPage - 1) * 20 + 1} to ${Math.min(currentPage * 20, totalCount)} of ${totalCount} customers`
              : "No customers"}
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
