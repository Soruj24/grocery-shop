"use client";

import { useState } from "react";
import { useGetAdminCategoriesQuery, useCreateAdminCategoryMutation, useUpdateAdminCategoryMutation, useDeleteAdminCategoryMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatusBadge from "@/features/admin/components/StatusBadge";
import ConfirmDialog from "@/components/ui/system/ConfirmDialog";
import { useToast } from "@/components/ui/system/Toast";
import { Plus, Edit2, Trash2, ListTree } from "lucide-react";
import CategoryModalWrapper from "@/features/admin/components/CategoryModalWrapper";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useGetAdminCategoriesQuery();
  const [create] = useCreateAdminCategoryMutation();
  const [update] = useUpdateAdminCategoryMutation();
  const [del] = useDeleteAdminCategoryMutation();
  const [modal, setModal] = useState<{ open: boolean; data?: any }>({ open: false });
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const { success, error: toastError } = useToast();

  const mainCats = (categories || []).filter((c) => !c.parentId);
  const subCats = (categories || []).filter((c) => c.parentId);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await del(deleteTarget._id).unwrap();
      success("ক্যাটাগরি ডিলিট", "ক্যাটাগরি সফলভাবে ডিলিট করা হয়েছে।");
      setDeleteTarget(null);
    } catch {
      toastError("ডিলিট ব্যর্থ", "ক্যাটাগরি ডিলিট করা যায়নি।");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: "name", label: "Category", sortable: true, render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
          <ListTree className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.parentId ? "Sub-category" : "Main category"}</p>
        </div>
      </div>
    )},
    { key: "isActive", label: "Status", render: (item: any) => (
      <StatusBadge status={item.isActive} label={item.isActive ? "Active" : "Inactive"} />
    )},
    { key: "actions", label: "", render: (_: any, i: number) => {
      const all = [...mainCats, ...subCats];
      const item = all[i];
      return (
        <div className="flex items-center gap-1">
          <button onClick={() => item && setModal({ open: true, data: item })} className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Edit category">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => item && setDeleteTarget(item)} className="p-2 rounded-lg text-muted-foreground hover:bg-danger-subtle hover:text-danger transition-colors" aria-label="Delete category">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      );
    }},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Categories" description="Manage product categories and sub-categories"
        actions={<button onClick={() => setModal({ open: true })} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"><Plus className="h-4 w-4" /> Add Category</button>}
      />
      <DataTable columns={columns} data={[...mainCats, ...subCats]} searchable searchKeys={["name"]} searchPlaceholder="Search categories..." loading={isLoading} />
      {modal.open && (
        <CategoryModalWrapper
          data={modal.data || null}
          categories={categories || []}
          onClose={() => setModal({ open: false })}
          onSave={async (formData) => {
            if (modal.data?._id) {
              await update({ id: modal.data._id as string, body: formData }).unwrap();
              success("ক্যাটাগরি আপডেট", "ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে।");
            } else {
              await create(formData).unwrap();
              success("ক্যাটাগরি যোগ", "নতুন ক্যাটাগরি সফলভাবে যোগ করা হয়েছে।");
            }
            setModal({ open: false });
          }}
        />
      )}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="ক্যাটাগরি ডিলিট করুন?"
        message={`"${deleteTarget?.name}" ডিলিট করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
        confirmLabel="ডিলিট করুন"
        cancelLabel="বাতিল"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
