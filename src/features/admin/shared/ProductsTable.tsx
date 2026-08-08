"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown,
  MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Package, Check,
  ChevronDown, X, Loader2,
} from "lucide-react";
import { cn } from "@/utils/utils";
import type { AdminProduct } from "@/types/admin";

/* ─── Types ─── */
interface ProductsTableProps {
  data: AdminProduct[];
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
  stockFilter: string;
  onStockFilterChange: (v: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (v: string) => void;
  categories: Array<{ _id: string; name: string }>;
  selectedIds: string[];
  onSelectToggle: (id: string) => void;
  onSelectAll: () => void;
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
  onToggleStatus: (product: AdminProduct) => void;
  onBulkDelete: () => void;
  onBulkStatus: (active: boolean) => void;
  bulkLoading: boolean;
}

/* ─── Helpers ─── */
function getStockInfo(stock: number): { label: string; color: string; bg: string } {
  if (stock <= 0) return { label: "Out of Stock", color: "text-danger", bg: "bg-danger-subtle" };
  if (stock <= 10) return { label: "Low Stock", color: "text-warning", bg: "bg-warning-subtle" };
  return { label: "In Stock", color: "text-success", bg: "bg-success-subtle" };
}

/* ─── Dropdown ─── */
function RowActions({ product, onEdit, onDelete, onToggleStatus }: {
  product: AdminProduct;
  onEdit: (p: AdminProduct) => void;
  onDelete: (p: AdminProduct) => void;
  onToggleStatus: (p: AdminProduct) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Actions"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-border bg-card shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2"
          role="menu"
        >
          <button
            onClick={() => { onEdit(product); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-muted transition-colors"
            role="menuitem"
          >
            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            Edit
          </button>
          <button
            onClick={() => { onToggleStatus(product); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-muted transition-colors"
            role="menuitem"
          >
            {product.isActive ? <EyeOff className="h-3.5 w-3.5 text-muted-foreground" /> : <Eye className="h-3.5 w-3.5 text-muted-foreground" />}
            {product.isActive ? "Deactivate" : "Activate"}
          </button>
          <div className="my-1 border-t border-border" />
          <button
            onClick={() => { onDelete(product); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-danger hover:bg-danger-subtle transition-colors"
            role="menuitem"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
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
export default function ProductsTable({
  data, totalCount, currentPage, totalPages, loading,
  search, onSearchChange,
  sort, sortDir, onSort,
  page, onPageChange,
  statusFilter, onStatusFilterChange,
  stockFilter, onStockFilterChange,
  categoryFilter, onCategoryFilterChange,
  categories,
  selectedIds, onSelectToggle, onSelectAll,
  onEdit, onDelete, onToggleStatus,
  onBulkDelete, onBulkStatus,
  bulkLoading,
}: ProductsTableProps) {
  const allSelected = data.length > 0 && data.every((p) => selectedIds.includes(p._id));
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
              placeholder="Search products..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search products"
              className={cn(
                "w-full rounded-lg border border-border bg-muted pl-10 pr-4 py-2",
                "text-sm text-foreground placeholder:text-muted-foreground",
                "focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all",
              )}
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <FilterPill
            label="Status"
            value={statusFilter}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            onChange={onStatusFilterChange}
          />
          <FilterPill
            label="Stock"
            value={stockFilter}
            options={[
              { value: "in_stock", label: "In Stock" },
              { value: "low_stock", label: "Low Stock" },
              { value: "out_of_stock", label: "Out of Stock" },
            ]}
            onChange={onStockFilterChange}
          />
          <FilterPill
            label="Category"
            value={categoryFilter}
            options={categories.map((c) => ({ value: c._id, label: c.name }))}
            onChange={onCategoryFilterChange}
          />
        </div>

        {/* Bulk Actions Bar */}
        {someSelected && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/5 border-t border-primary/10">
            <span className="text-xs font-medium text-primary">
              {selectedIds.length} selected
            </span>
            <div className="h-4 w-px bg-primary/20" />
            <button
              onClick={() => onBulkStatus(true)}
              disabled={bulkLoading}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              <Eye className="h-3.5 w-3.5" />
              Activate
            </button>
            <button
              onClick={() => onBulkStatus(false)}
              disabled={bulkLoading}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              <EyeOff className="h-3.5 w-3.5" />
              Deactivate
            </button>
            <button
              onClick={onBulkDelete}
              disabled={bulkLoading}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-danger hover:bg-danger-subtle transition-colors disabled:opacity-50"
            >
              {bulkLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              Delete
            </button>
            <button
              onClick={() => onSelectAll()}
              className="ml-auto text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          </div>
        )}
      </div>

      {/* ─── Table ─── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label="Products table">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {/* Checkbox */}
              <th className="w-12 px-5 py-3" scope="col">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={onSelectAll}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer"
                  aria-label="Select all products"
                />
              </th>
              {/* Product */}
              <th
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                scope="col"
                onClick={() => onSort("name")}
                aria-sort={sort === "name" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
              >
                <div className="flex items-center gap-1.5">Product {sortIcon("name")}</div>
              </th>
              {/* Price */}
              <th
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                scope="col"
                onClick={() => onSort("price")}
                aria-sort={sort === "price" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
              >
                <div className="flex items-center gap-1.5">Price {sortIcon("price")}</div>
              </th>
              {/* Stock */}
              <th
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                scope="col"
                onClick={() => onSort("stock")}
                aria-sort={sort === "stock" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
              >
                <div className="flex items-center gap-1.5">Stock {sortIcon("stock")}</div>
              </th>
              {/* Status */}
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground" scope="col">
                Status
              </th>
              {/* Category */}
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell" scope="col">
                Category
              </th>
              {/* Actions */}
              <th className="w-12 px-5 py-3" scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {loading ? (
              /* ─── Loading Skeleton ─── */
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={`skel-${i}`}>
                  <td className="px-5 py-3"><div className="h-4 w-4 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-32 rounded bg-muted animate-pulse" />
                        <div className="h-2.5 w-20 rounded bg-muted animate-pulse" />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><div className="h-3.5 w-16 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-6 w-14 rounded-full bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-6 w-16 rounded-full bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3 hidden lg:table-cell"><div className="h-3.5 w-20 rounded bg-muted animate-pulse" /></td>
                  <td className="px-5 py-3"><div className="h-8 w-8 rounded-lg bg-muted animate-pulse" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              /* ─── Empty State ─── */
              <tr>
                <td colSpan={7} className="px-5 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted mb-4">
                      <Package className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No products found</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      {search || statusFilter || stockFilter || categoryFilter
                        ? "Try adjusting your search or filters."
                        : "Get started by adding your first product."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              /* ─── Data Rows ─── */
              data.map((product) => {
                const stockInfo = getStockInfo(product.stock);
                const isSelected = selectedIds.includes(product._id);
                const categoryName = typeof product.category === "object" && product.category !== null
                  ? (product.category as { name?: string }).name || "N/A"
                  : "N/A";

                return (
                  <tr
                    key={product._id}
                    className={cn(
                      "transition-colors hover:bg-muted/40",
                      isSelected && "bg-primary/5 hover:bg-primary/5",
                    )}
                  >
                    {/* Checkbox */}
                    <td className="px-5 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectToggle(product._id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer"
                        aria-label={`Select ${product.name}`}
                      />
                    </td>
                    {/* Product */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                          ) : (
                            <Package className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-foreground truncate max-w-[200px]">{product.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {product.isDeal && <span className="text-[10px] font-bold text-warning bg-warning-subtle px-1.5 py-0.5 rounded">DEAL</span>}
                            {product.isPopular && <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">POPULAR</span>}
                            {product.isNewArrival && <span className="text-[10px] font-bold text-info bg-info-subtle px-1.5 py-0.5 rounded">NEW</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Price */}
                    <td className="px-5 py-3">
                      <div>
                        {product.discount && product.discount > 0 ? (
                          <>
                            <p className="text-[13px] font-bold text-foreground tabular-nums">৳{(product.discountPrice || product.price).toLocaleString()}</p>
                            <p className="text-[11px] text-muted-foreground line-through tabular-nums">৳{product.price.toLocaleString()}</p>
                          </>
                        ) : (
                          <p className="text-[13px] font-bold text-foreground tabular-nums">৳{product.price.toLocaleString()}</p>
                        )}
                      </div>
                    </td>
                    {/* Stock */}
                    <td className="px-5 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                        stockInfo.bg, stockInfo.color,
                        stockInfo.color === "text-success" && "border-success/20",
                        stockInfo.color === "text-warning" && "border-warning/20",
                        stockInfo.color === "text-danger" && "border-danger/20",
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          stockInfo.color === "text-success" && "bg-success",
                          stockInfo.color === "text-warning" && "bg-warning",
                          stockInfo.color === "text-danger" && "bg-danger",
                        )} />
                        {product.stock} {product.unit || "pcs"}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                        product.isActive
                          ? "bg-success-subtle text-success border-success/20"
                          : "bg-muted text-muted-foreground border-border",
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          product.isActive ? "bg-success" : "bg-muted-foreground",
                        )} />
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    {/* Category */}
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{categoryName}</span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3">
                      <RowActions
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleStatus={onToggleStatus}
                      />
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
              ? `Showing ${(currentPage - 1) * 20 + 1} to ${Math.min(currentPage * 20, totalCount)} of ${totalCount} products`
              : "No products"
            }
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  className={cn(
                    "h-8 w-8 rounded-lg text-xs font-medium transition-colors",
                    p === page
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
