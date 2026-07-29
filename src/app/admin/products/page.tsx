"use client";

import { useState } from "react";
import { useGetAdminProductsQuery, useCreateAdminProductMutation, useUpdateAdminProductMutation, useDeleteAdminProductMutation, useGetAdminCategoriesQuery } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import ProductModalWrapper from "@/features/admin/components/ProductModalWrapper";

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAdminProductsQuery({ page, search });
  const { data: cats } = useGetAdminCategoriesQuery();
  const [create] = useCreateAdminProductMutation();
  const [update] = useUpdateAdminProductMutation();
  const [del] = useDeleteAdminProductMutation();
  const [modal, setModal] = useState<{ open: boolean; data?: any }>({ open: false });
  const products = data?.data || [];

  const columns = [
    { key: "name", label: "Product", sortable: true, render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : <Package className="h-4 w-4 text-gray-400" />}
        </div>
        <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p><p className="text-[10px] text-gray-400">{item.category?.name || "N/A"}</p></div>
      </div>
    )},
    { key: "price", label: "Price", sortable: true, render: (item: any) => <span className="text-sm font-bold">৳{Number(item.price).toLocaleString()}</span> },
    { key: "stock", label: "Stock", sortable: true, render: (item: any) => (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${Number(item.stock) > 10 ? "bg-emerald-100 text-emerald-700" : Number(item.stock) > 0 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{String(item.stock)}</span>
    )},
    { key: "isActive", label: "Status", render: (item: any) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</span>
    )},
    { key: "actions", label: "", render: (_: any, i: number) => (
      <div className="flex items-center gap-1">
        <button onClick={() => setModal({ open: true, data: products[i] })} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500"><Edit2 className="h-3.5 w-3.5" /></button>
        <button onClick={() => { const item = products[i]; if (item && confirm("Delete this product?")) del(item._id); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Products" description="Manage your product catalog"
        actions={<button onClick={() => setModal({ open: true })} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"><Plus className="h-4 w-4" /> Add Product</button>}
      />
      <DataTable columns={columns} data={products} searchable searchKeys={["name"]} searchPlaceholder="Search products..." loading={isLoading} pageSize={10} />
      {modal.open && (
        <ProductModalWrapper
          data={modal.data || null}
          categories={cats || []}
          onClose={() => setModal({ open: false })}
          onSave={async (formData) => {
            if (modal.data?._id) await update({ id: modal.data._id, body: formData }).unwrap();
            else await create(formData).unwrap();
            setModal({ open: false });
          }}
        />
      )}
    </div>
  );
}
