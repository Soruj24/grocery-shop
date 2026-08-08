"use client";

import { useState, useCallback, useRef } from "react";
import {
  useGetAdminProductsQuery,
  useCreateAdminProductMutation,
  useUpdateAdminProductMutation,
  useDeleteAdminProductMutation,
  useBulkProductsMutation,
  useGetAdminCategoriesQuery,
} from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import ProductsTable from "@/features/admin/shared/ProductsTable";
import ConfirmDialog from "@/components/ui/system/ConfirmDialog";
import { useToast } from "@/components/ui/system/Toast";
import { Plus, AlertTriangle } from "lucide-react";
import ProductModalWrapper from "@/features/admin/components/ProductModalWrapper";
import type { AdminProduct, AdminProductFormData } from "@/types/admin";

export default function AdminProductsPage() {
  /* ─── State ─── */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [modal, setModal] = useState<{ open: boolean; data?: AdminProduct }>({ open: false });
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  /* ─── API ─── */
  const { data, isLoading, isError } = useGetAdminProductsQuery({
    page,
    limit: 20,
    search,
    sort,
    sortDir,
    ...(statusFilter && { status: statusFilter }),
    ...(stockFilter && { stockStatus: stockFilter }),
    ...(categoryFilter && { category: categoryFilter }),
  });

  const { data: cats } = useGetAdminCategoriesQuery();
  const [create] = useCreateAdminProductMutation();
  const [update] = useUpdateAdminProductMutation();
  const [del] = useDeleteAdminProductMutation();
  const [bulkOp, { isLoading: bulkLoading }] = useBulkProductsMutation();
  const { success, error: toastError } = useToast();

  const products = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 0;

  /* ─── Handlers ─── */
  const handleSearch = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return key;
      }
      setSortDir("asc");
      return key;
    });
  }, []);

  const handleStatusFilter = useCallback((v: string) => {
    setStatusFilter(v);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handleStockFilter = useCallback((v: string) => {
    setStockFilter(v);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handleCategoryFilter = useCallback((v: string) => {
    setCategoryFilter(v);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handleSelectToggle = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (products.every((p) => selectedIds.includes(p._id))) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p._id));
    }
  }, [products, selectedIds]);

  /* ─── Single Operations ─── */
  const handleEdit = useCallback((product: AdminProduct) => {
    setModal({ open: true, data: product });
  }, []);

  const handleDelete = useCallback((product: AdminProduct) => {
    setDeleteTarget(product);
  }, []);

  const handleToggleStatus = useCallback(async (product: AdminProduct) => {
    try {
      await update({ id: product._id, body: { isActive: !product.isActive } }).unwrap();
      success(
        product.isActive ? "প্রোডাক্ট ডিএক্টিভেট" : "প্রোডাক্ট এক্টিভেট",
        `"${product.name}" ${product.isActive ? "ডিএক্টিভেট" : "এক্টিভেট"} করা হয়েছে।`,
      );
    } catch {
      toastError("আপডেট ব্যর্থ", "প্রোডাক্ট স্ট্যাটাস আপডেট করা যায়নি।");
    }
  }, [update, success, toastError]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await del(deleteTarget._id).unwrap();
      success("প্রোডাক্ট ডিলিট", `"${deleteTarget.name}" ডিলিট করা হয়েছে।`);
      setDeleteTarget(null);
    } catch {
      toastError("ডিলিট ব্যর্থ", "প্রোডাক্ট ডিলিট করা যায়নি।");
    } finally {
      setDeleting(false);
    }
  }, [deleteTarget, del, success, toastError]);

  /* ─── Bulk Operations ─── */
  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) return;
    setBulkDeleteOpen(true);
  }, [selectedIds]);

  const confirmBulkDelete = useCallback(async () => {
    try {
      await bulkOp({ action: "bulkDelete", ids: selectedIds }).unwrap();
      success("বাল্ক ডিলিট", `${selectedIds.length}টি প্রোডাক্ট ডিলিট করা হয়েছে।`);
      setSelectedIds([]);
      setBulkDeleteOpen(false);
    } catch {
      toastError("ডিলিট ব্যর্থ", "প্রোডাক্ট ডিলিট করা যায়নি।");
    }
  }, [selectedIds, bulkOp, success, toastError]);

  const handleBulkStatus = useCallback(async (active: boolean) => {
    try {
      await bulkOp({ action: "bulkUpdate", ids: selectedIds, data: { isActive: active } }).unwrap();
      success(
        active ? "বাল্ক এক্টিভেট" : "বাল্ক ডিএক্টিভেট",
        `${selectedIds.length}টি প্রোডাক্ট ${active ? "এক্টিভেট" : "ডিএক্টিভেট"} করা হয়েছে।`,
      );
      setSelectedIds([]);
    } catch {
      toastError("আপডেট ব্যর্থ", "প্রোডাক্ট স্ট্যাটাস আপডেট করা যায়নি।");
    }
  }, [selectedIds, bulkOp, success, toastError]);

  /* ─── Save Handler ─── */
  const handleSave = useCallback(async (formData: AdminProductFormData) => {
    if (modal.data?._id) {
      await update({ id: modal.data._id, body: formData }).unwrap();
      success("প্রোডাক্ট আপডেট", `"${formData.name}" আপডেট করা হয়েছে।`);
    } else {
      await create(formData).unwrap();
      success("প্রোডাক্ট যোগ", `"${formData.name}" যোগ করা হয়েছে।`);
    }
    setModal({ open: false });
  }, [modal.data, update, create, success]);

  /* ─── Error State ─── */
  if (isError) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="Products"
          description="Manage your product catalog"
          actions={
            <button
              onClick={() => setModal({ open: true })}
              className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-all active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          }
        />
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-subtle mb-4">
            <AlertTriangle className="h-6 w-6 text-danger" />
          </div>
          <p className="text-base font-semibold text-foreground">Failed to load products</p>
          <p className="text-sm text-muted-foreground mt-1">Check your connection and try again.</p>
        </div>
      </div>
    );
  }

  /* ─── Main Render ─── */
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products"
        description="Manage your product catalog"
        actions={
          <button
            onClick={() => setModal({ open: true })}
            className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        }
      />

      <ProductsTable
        data={products}
        totalCount={totalCount}
        currentPage={data?.currentPage || page}
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
        stockFilter={stockFilter}
        onStockFilterChange={handleStockFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={handleCategoryFilter}
        categories={cats || []}
        selectedIds={selectedIds}
        onSelectToggle={handleSelectToggle}
        onSelectAll={handleSelectAll}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onBulkDelete={handleBulkDelete}
        onBulkStatus={handleBulkStatus}
        bulkLoading={bulkLoading}
      />

      {/* ─── Product Modal ─── */}
      {modal.open && (
        <ProductModalWrapper
          data={modal.data || null}
          categories={cats || []}
          onClose={() => setModal({ open: false })}
          onSave={handleSave}
        />
      )}

      {/* ─── Single Delete Confirmation ─── */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="প্রোডাক্ট ডিলিট করুন?"
        message={`"${deleteTarget?.name}" ডিলিট করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
        confirmLabel="ডিলিট করুন"
        cancelLabel="বাতিল"
        variant="danger"
        loading={deleting}
      />

      {/* ─── Bulk Delete Confirmation ─── */}
      <ConfirmDialog
        isOpen={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={confirmBulkDelete}
        title="প্রোডাক্ট ডিলিট করুন?"
        message={`${selectedIds.length}টি প্রোডাক্ট ডিলিট করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
        confirmLabel="ডিলিট করুন"
        cancelLabel="বাতিল"
        variant="danger"
        loading={bulkLoading}
      />
    </div>
  );
}
