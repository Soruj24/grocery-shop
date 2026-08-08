"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown,
  Package, Check, ChevronDown, X, Loader2, Minus, Plus, Pencil,
} from "lucide-react";
import { cn } from "@/utils/utils";

/* ─── Types ─── */
interface InventoryItem {
  _id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  unit: string;
  image?: string;
  category: string;
  status: "in_stock" | "low_stock" | "out_of_stock";
  inventoryValue: number;
}

interface InventoryTableProps {
  data: InventoryItem[];
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
  selectedIds: string[];
  onSelectToggle: (id: string) => void;
  onSelectAll: () => void;
  onAdjustStock: (item: InventoryItem) => void;
  onBulkAdjust: () => void;
  bulkLoading: boolean;
}

/* ─── Helpers ─── */
function getStatusConfig(status: string) {
  if (status === "out_of_stock") return { label: "Out of Stock", color: "text-danger", bg: "bg-danger-subtle", border: "border-danger/20", dot: "bg-danger", weight: 0 };
  if (status === "low_stock") return { label: "Low Stock", color: "text-warning", bg: "bg-warning-subtle", border: "border-warning/20", dot: "bg-warning", weight: 1 };
  return { label: "In Stock", color: "text-success", bg: "bg-success-subtle", border: "border-success/20", dot: "bg-success", weight: 2 };
}

function StockBar({ stock, max }: { stock: number; max: number }) {
  const pct = max > 0 ? Math.min((stock / max) * 100, 100) : 0;
  const color = stock <= 0 ? "bg-danger" : stock <= 10 ? "bg-warning" : "bg-success";
  return (
    <div className="flex items-center gap-2.5 min-w-[120px]">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-300", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] font-semibold tabular-nums text-muted-foreground w-8 text-right">{stock}</span>
    </div>
  );
}

/* ─── Filter Pill ─── */
function FilterPill({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string; count?: number }>;
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
      >
        {label}
        {active && active.value && <span className="text-foreground">: {active.label}</span>}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-44 rounded-xl border border-border bg-card shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2" role="listbox" aria-label={`${label} options`}>
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className={cn("flex w-full items-center justify-between px-3 py-2 text-[13px] transition-colors", !value ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground")}
            role="option" aria-selected={!value}
          >
            All {label}
          </button>
          {options.map((opt) => (
            <button key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
              role="option" aria-selected={value === opt.value}
              className={cn("flex w-full items-center justify-between px-3 py-2 text-[13px] transition-colors", value === opt.value ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              <span>{opt.label}</span>
              <div className="flex items-center gap-2">
                {opt.count !== undefined && <span className="text-[10px] text-muted-foreground tabular-nums">{opt.count}</span>}
                {value === opt.value && <Check className="h-3.5 w-3.5 text-primary" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function InventoryTable({
  data, totalCount, currentPage, totalPages, loading,
  search, onSearchChange,
  sort, sortDir, onSort,
  page, onPageChange,
  statusFilter, onStatusFilterChange,
  selectedIds, onSelectToggle, onSelectAll,
  onAdjustStock, onBulkAdjust,
  bulkLoading,
}: InventoryTableProps) {
  const allSelected = data.length > 0 && data.every((item) => selectedIds.includes(item._id));
  const someSelected = selectedIds.length > 0;
  const maxStock = Math.max(...data.map((d) => d.stock), 1);

  const sortIcon = (key: string) => {
    if (sort !== key) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* ─── Toolbar ─── */}
      <div className="border-b border-border">
        <div className="flex flex-wrap items-center gap-3 px-5 py-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search inventory..." value={search} onChange={(e) => onSearchChange(e.target.value)} aria-label="Search inventory"
              className={cn("w-full rounded-lg border border-border bg-muted pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all")} />
            {search && (
              <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <FilterPill label="Status" value={statusFilter}
            options={[
              { value: "out_of_stock", label: "Out of Stock" },
              { value: "low_stock", label: "Low Stock" },
              { value: "in_stock", label: "In Stock" },
            ]}
            onChange={onStatusFilterChange} />
        </div>

        {/* Bulk Actions */}
        {someSelected && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/5 border-t border-primary/10">
            <span className="text-xs font-medium text-primary">{selectedIds.length} selected</span>
            <div className="h-4 w-px bg-primary/20" />
            <button onClick={onBulkAdjust} disabled={bulkLoading}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50">
              {bulkLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Pencil className="h-3.5 w-3.5" />}
              Bulk Update
            </button>
            <button onClick={onSelectAll} className="ml-auto text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          </div>
        )}
      </div>

      {/* ─── Table ─── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label="Inventory table">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="w-12 px-5 py-3" scope="col">
                <input type="checkbox" checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={onSelectAll}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer" aria-label="Select all" />
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors" scope="col" onClick={() => onSort("name")}
                aria-sort={sort === "name" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                <div className="flex items-center gap-1.5">Product {sortIcon("name")}</div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell" scope="col">SKU</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors" scope="col" onClick={() => onSort("stock")}
                aria-sort={sort === "stock" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                <div className="flex items-center gap-1.5">Stock {sortIcon("stock")}</div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell" scope="col">Value</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground" scope="col">Status</th>
              <th className="w-12 px-5 py-3" scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={`skel-${i}`}>
                  <td className="px-5 py-3"><div className="h-4 w-4 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="h-9 w-9 rounded-lg bg-muted animate-pulse" /><div className="space-y-1.5"><div className="h-3.5 w-28 rounded bg-muted animate-pulse" /><div className="h-2.5 w-20 rounded bg-muted animate-pulse" /></div></div></td>
                  <td className="px-5 py-3 hidden md:table-cell"><div className="h-3.5 w-20 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-4 w-24 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3 hidden lg:table-cell"><div className="h-3.5 w-16 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-6 w-16 rounded-full bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-8 w-8 rounded-lg bg-muted animate-pulse" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted mb-4">
                      <Package className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No products found</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      {search || statusFilter ? "Try adjusting your search or filters." : "Inventory will appear here."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const cfg = getStatusConfig(item.status);
                const isSelected = selectedIds.includes(item._id);
                return (
                  <tr key={item._id} className={cn("transition-colors hover:bg-muted/40", isSelected && "bg-primary/5")}>
                    <td className="px-5 py-3">
                      <input type="checkbox" checked={isSelected} onChange={() => onSelectToggle(item._id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer" aria-label={`Select ${item.name}`} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
                          {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <Package className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-foreground truncate max-w-[180px]">{item.name}</p>
                          <p className="text-[11px] text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-[11px] font-mono text-muted-foreground">{item.sku}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <StockBar stock={item.stock} max={maxStock} />
                        <span className="text-[11px] text-muted-foreground">{item.unit}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-[13px] font-semibold text-foreground tabular-nums">৳{item.inventoryValue.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border", cfg.bg, cfg.color, cfg.border)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => onAdjustStock(item)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label={`Adjust stock for ${item.name}`}>
                        <Pencil className="h-4 w-4" />
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
            {totalCount > 0 ? `Showing ${(currentPage - 1) * 50 + 1} to ${Math.min(currentPage * 50, totalCount)} of ${totalCount}` : "No products"}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors" aria-label="Previous">
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
            <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors" aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
