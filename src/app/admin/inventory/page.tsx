"use client";

import { useState, useCallback, useMemo } from "react";
import {
  useGetInventoryDataQuery, useAdjustStockMutation, useBulkAdjustStockMutation,
  useGetStockHistoryQuery,
} from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import InventoryTable from "@/features/admin/shared/InventoryTable";
import { useToast } from "@/components/ui/system/Toast";
import { Modal } from "@/components/ui/system/Modal";
import {
  Boxes, AlertTriangle, CheckCircle2, DollarSign, Package,
  TrendingDown, Clock, ArrowUpDown, Loader2, Minus, Plus, History,
  X,
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

/* ─── KPI Card ─── */
function KPICard({ icon: Icon, label, value, sub, color, iconBg }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string; iconBg: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className={cn("text-2xl font-bold tabular-nums mt-1.5", color)}>{value}</p>
          {sub && <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconBg)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

/* ─── Stock Adjustment Modal ─── */
function StockAdjustmentModal({
  item, isOpen, onClose, onSave, loading,
}: {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { productId: string; newStock: number; type: string; reason: string; note: string }) => Promise<void>;
  loading: boolean;
}) {
  const [newStock, setNewStock] = useState<number>(0);
  const [type, setType] = useState("adjustment");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  // Reset when item changes
  if (item && newStock === 0 && item.stock !== 0) {
    // Don't reset if already set
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    await onSave({ productId: item._id, newStock, type, reason, note });
    setNewStock(0);
    setReason("");
    setNote("");
  };

  const quickActions = [
    { label: "Set to 0", value: 0 },
    { label: "Set to 5", value: 5 },
    { label: "Set to 10", value: 10 },
    { label: "Set to 25", value: 25 },
    { label: "Set to 50", value: 50 },
    { label: "Set to 100", value: 100 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust Stock" description={`Update stock for ${item?.name || ""}`} size="md">
      {item && (
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Current Stock */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="text-xs text-muted-foreground">Current Stock</span>
            <span className="text-sm font-bold text-foreground tabular-nums">{item.stock} {item.unit}</span>
          </div>

          {/* New Stock */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">New Stock Quantity</label>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setNewStock(Math.max(0, newStock - 1))}
                className="h-10 w-10 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <input type="number" value={newStock} onChange={(e) => setNewStock(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 h-10 px-4 rounded-lg border border-border bg-muted text-center text-lg font-bold text-foreground focus:ring-1 focus:ring-ring outline-none tabular-nums" min={0} />
              <button type="button" onClick={() => setNewStock(newStock + 1)}
                className="h-10 w-10 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Set */}
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Quick Set</label>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {quickActions.map((qa) => (
                <button key={qa.value} type="button" onClick={() => setNewStock(qa.value)}
                  className={cn("px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors",
                    newStock === qa.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground hover:text-foreground")}>
                  {qa.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difference Preview */}
          {newStock !== item.stock && (
            <div className={cn("flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium border",
              newStock > item.stock ? "bg-success-subtle text-success border-success/20" : "bg-danger-subtle text-danger border-danger/20")}>
              {newStock > item.stock ? <TrendingDown className="h-3.5 w-3.5 rotate-180" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {newStock > item.stock ? `+${newStock - item.stock} added` : `${item.stock - newStock} removed`}
            </div>
          )}

          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Adjustment Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted text-sm text-foreground focus:ring-1 focus:ring-ring outline-none appearance-none cursor-pointer">
              <option value="adjustment">Adjustment</option>
              <option value="restock">Restock</option>
              <option value="correction">Correction</option>
              <option value="return">Return</option>
            </select>
          </div>

          {/* Reason */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Reason</label>
            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Physical count correction"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring outline-none" />
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Note (optional)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
              placeholder="Additional details..."
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring outline-none resize-none" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 hover:text-foreground transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading || newStock === item.stock}
              className="px-6 py-2.5 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2">
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save Adjustment
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

/* ─── Bulk Adjustment Modal ─── */
function BulkAdjustmentModal({
  selectedIds, isOpen, onClose, onSave, loading,
}: {
  selectedIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Array<{ productId: string; stock: number }>, reason: string) => Promise<void>;
  loading: boolean;
}) {
  const [mode, setMode] = useState<"set" | "add" | "subtract">("set");
  const [value, setValue] = useState(0);
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updates = selectedIds.map((id) => ({ productId: id, stock: value }));
    await onSave(updates, reason);
    setReason("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bulk Stock Update" description={`Update ${selectedIds.length} products`} size="md">
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Update Mode</label>
          <div className="grid grid-cols-3 gap-2">
            {([["set", "Set to"], ["add", "Add"], ["subtract", "Subtract"]] as const).map(([v, l]) => (
              <button key={v} type="button" onClick={() => setMode(v)}
                className={cn("px-3 py-2 rounded-lg text-xs font-medium border transition-colors",
                  mode === v ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground hover:text-foreground")}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">{mode === "set" ? "Stock Value" : "Quantity"}</label>
          <input type="number" value={value} onChange={(e) => setValue(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full h-10 px-4 rounded-lg border border-border bg-muted text-sm font-bold text-foreground focus:ring-1 focus:ring-ring outline-none tabular-nums" min={0} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Reason</label>
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Bulk restock"
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring outline-none" />
        </div>
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <button type="button" onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2">
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Apply Update
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ─── History Panel ─── */
function HistoryPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [page, setPage] = useState(1);
  const { data: historyData, isLoading } = useGetStockHistoryQuery({ page, limit: 15 });
  const logs = (historyData?.data || []) as Array<Record<string, unknown>>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Stock History" description="Recent inventory changes" size="lg">
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />)}
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12">
            <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No stock history yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {logs.map((log) => {
              const product = log.product as Record<string, unknown>;
              const qty = log.quantity as number;
              const typeColors: Record<string, string> = {
                adjustment: "bg-muted text-muted-foreground",
                restock: "bg-success-subtle text-success",
                sale: "bg-info-subtle text-info",
                return: "bg-accent/10 text-accent",
                correction: "bg-warning-subtle text-warning",
              };
              return (
                <div key={String(log._id)} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold", typeColors[log.type as string] || "bg-muted text-muted-foreground")}>
                    {String(log.type).slice(0, 3).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{String(product?.name || "Deleted")}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {(log.previousStock as number)} → {(log.newStock as number)}
                      {log.reason ? ` · ${log.reason}` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn("text-[13px] font-bold tabular-nums", qty >= 0 ? "text-success" : "text-danger")}>
                      {qty >= 0 ? "+" : ""}{qty}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {log.createdAt ? new Date(log.createdAt as string).toLocaleDateString("en-BD", { month: "short", day: "numeric" }) : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}

/* ─── Main Page ─── */
export default function AdminInventoryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("stock");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [adjustItem, setAdjustItem] = useState<InventoryItem | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const { data, isLoading, isError } = useGetInventoryDataQuery({
    page, limit: 50, search, sort, sortDir,
    ...(statusFilter && { status: statusFilter }),
  });

  const [adjustStock, { isLoading: adjusting }] = useAdjustStockMutation();
  const [bulkAdjust, { isLoading: bulkLoading }] = useBulkAdjustStockMutation();
  const { success, error: toastError } = useToast();

  const items = (data?.data || []) as InventoryItem[];
  const stats = (data?.stats || {}) as { totalProducts: number; totalStock: number; totalValue: number; outOfStockCount: number; lowStockCount: number };
  const totalCount = (data?.totalCount as number) || 0;
  const totalPages = (data?.totalPages as number) || 0;

  const handleSearch = useCallback((v: string) => { setSearch(v); setPage(1); setSelectedIds([]); }, []);
  const handleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev === key) { setSortDir((d) => (d === "asc" ? "desc" : "asc")); return key; }
      setSortDir("asc");
      return key;
    });
  }, []);
  const handleStatusFilter = useCallback((v: string) => { setStatusFilter(v); setPage(1); setSelectedIds([]); }, []);
  const handleSelectToggle = useCallback((id: string) => { setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]); }, []);
  const handleSelectAll = useCallback(() => {
    if (items.every((i) => selectedIds.includes(i._id))) setSelectedIds([]);
    else setSelectedIds(items.map((i) => i._id));
  }, [items, selectedIds]);

  const handleAdjustStock = useCallback(async (data: { productId: string; newStock: number; type: string; reason: string; note: string }) => {
    try {
      await adjustStock(data).unwrap();
      success("Stock Updated", "Inventory has been adjusted.");
      setAdjustItem(null);
    } catch {
      toastError("Update Failed", "Could not adjust stock.");
    }
  }, [adjustStock, success, toastError]);

  const handleBulkAdjust = useCallback(async (updates: Array<{ productId: string; stock: number }>, reason: string) => {
    try {
      await bulkAdjust({ updates, reason }).unwrap();
      success("Bulk Update", `${updates.length} products updated.`);
      setSelectedIds([]);
      setBulkOpen(false);
    } catch {
      toastError("Update Failed", "Could not update stock.");
    }
  }, [bulkAdjust, success, toastError]);

  if (isError) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Inventory" description="Monitor stock levels and manage inventory" />
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-subtle mb-4">
            <span className="text-danger text-2xl">!</span>
          </div>
          <p className="text-base font-semibold text-foreground">Failed to load inventory</p>
          <p className="text-sm text-muted-foreground mt-1">Check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Inventory"
        description="Monitor stock levels and manage inventory"
        actions={
          <button onClick={() => setHistoryOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <History className="h-4 w-4" />
            History
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard icon={Package} label="Total Products" value={stats.totalProducts || 0} color="text-foreground" iconBg="bg-muted text-muted-foreground" />
        <KPICard icon={DollarSign} label="Inventory Value" value={`৳${(stats.totalValue || 0).toLocaleString()}`} color="text-foreground" iconBg="bg-success-subtle text-success" />
        <KPICard icon={Boxes} label="Total Stock" value={(stats.totalStock || 0).toLocaleString()} color="text-foreground" iconBg="bg-info-subtle text-info" />
        <KPICard icon={AlertTriangle} label="Low Stock" value={stats.lowStockCount || 0} sub="1-10 units" color="text-warning" iconBg="bg-warning-subtle text-warning" />
        <KPICard icon={TrendingDown} label="Out of Stock" value={stats.outOfStockCount || 0} color="text-danger" iconBg="bg-danger-subtle text-danger" />
      </div>

      {/* Alert Banner */}
      {(stats.lowStockCount || 0) + (stats.outOfStockCount || 0) > 0 && (
        <div className="rounded-xl bg-warning-subtle border border-warning/20 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-warning">
            {(stats.outOfStockCount || 0) > 0 && `${stats.outOfStockCount} product(s) out of stock. `}
            {(stats.lowStockCount || 0) > 0 && `${stats.lowStockCount} product(s) running low.`}
          </p>
        </div>
      )}

      {/* Table */}
      <InventoryTable
        data={items}
        totalCount={totalCount}
        currentPage={(data?.currentPage as number) || page}
        totalPages={totalPages}
        loading={isLoading}
        search={search}
        onSearchChange={handleSearch}
        sort={sort}
        sortDir={sortDir}
        onSort={handleSort}
        page={page}
        onPageChange={(p) => { setPage(p); setSelectedIds([]); }}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilter}
        selectedIds={selectedIds}
        onSelectToggle={handleSelectToggle}
        onSelectAll={handleSelectAll}
        onAdjustStock={setAdjustItem}
        onBulkAdjust={() => setBulkOpen(true)}
        bulkLoading={bulkLoading}
      />

      {/* Modals */}
      <StockAdjustmentModal
        item={adjustItem}
        isOpen={!!adjustItem}
        onClose={() => setAdjustItem(null)}
        onSave={handleAdjustStock}
        loading={adjusting}
      />
      <BulkAdjustmentModal
        selectedIds={selectedIds}
        isOpen={bulkOpen}
        onClose={() => setBulkOpen(false)}
        onSave={handleBulkAdjust}
        loading={bulkLoading}
      />
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />
    </div>
  );
}
