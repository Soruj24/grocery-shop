"use client";

import { useState } from "react";
import { useGetAdminCategoriesQuery, useCreateAdminCategoryMutation, useUpdateAdminCategoryMutation, useDeleteAdminCategoryMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Plus, Edit2, Trash2, ListTree } from "lucide-react";
import CategoryModalWrapper from "@/features/admin/components/CategoryModalWrapper";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useGetAdminCategoriesQuery();
  const [create] = useCreateAdminCategoryMutation();
  const [update] = useUpdateAdminCategoryMutation();
  const [del] = useDeleteAdminCategoryMutation();
  const [modal, setModal] = useState<{ open: boolean; data?: any }>({ open: false });

  const mainCats = (categories || []).filter((c) => !c.parentId);
  const subCats = (categories || []).filter((c) => c.parentId);

  const columns = [
    { key: "name", label: "Category", sortable: true, render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><ListTree className="h-4 w-4 text-gray-400" /></div>
        <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p><p className="text-[10px] text-gray-400">{item.parentId ? "Sub-category" : "Main category"}</p></div>
      </div>
    )},
    { key: "isActive", label: "Status", render: (item: any) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</span>
    )},
    { key: "actions", label: "", render: (_: any, i: number) => (
      <div className="flex items-center gap-1">
        <button onClick={() => setModal({ open: true, data: [...mainCats, ...subCats][i] || _ })} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500"><Edit2 className="h-3.5 w-3.5" /></button>
        <button onClick={async () => { const all = [...mainCats, ...subCats]; const item = all[i]; if (item && confirm("Delete this category?")) await del(item._id); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Categories" description="Manage product categories and sub-categories"
        actions={<button onClick={() => setModal({ open: true })} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"><Plus className="h-4 w-4" /> Add Category</button>}
      />
      <DataTable columns={columns} data={[...mainCats, ...subCats]} searchable searchKeys={["name"]} searchPlaceholder="Search categories..." loading={isLoading} />
      {modal.open && (
        <CategoryModalWrapper
          data={modal.data || null}
          categories={categories || []}
          onClose={() => setModal({ open: false })}
          onSave={async (formData) => {
            if (modal.data?._id) await update({ id: modal.data._id as string, body: formData }).unwrap();
            else await create(formData).unwrap();
            setModal({ open: false });
          }}
        />
      )}
    </div>
  );
}
