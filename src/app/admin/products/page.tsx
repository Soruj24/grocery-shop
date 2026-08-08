"use client";

import { useState } from "react";
import { useGetAdminProductsQuery, useCreateAdminProductMutation, useUpdateAdminProductMutation, useDeleteAdminProductMutation, useGetAdminCategoriesQuery } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import ProductModalWrapper from "@/features/admin/components/ProductModalWrapper";
import { cn } from "@/utils/utils";

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
        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : <Package className="h-4 w-4 text-muted-foreground" />}
        </div>
        <div><p className="text-sm font-semibold text-foreground">{item.name}</p><p className="text-[10px] text-muted-foreground">{item.category?.name || "N/A"}</p></div>
      </div>
    )},
    { key: "price", label: "Price", sortable: true, render: (item: any) => <span className="text-sm font-bold">৳{Number(item.price).toLocaleString()}</span> },
    { key: "stock", label: "Stock", sortable: true, render: (item: any) => (
      <span className={cn(
        "text-xs font-semibold px-2 py-0.5 rounded-full",
        Number(item.stock) > 10 && "bg-success-subtle text-success",
        Number(item.stock) > 0 && Number(item.stock) <= 10 && "bg-warning-subtle text-warning",
        Number(item.stock) <= 0 && "bg-danger-subtle text-danger"
      )}>{String(item.stock)}</span>
    )},
    { key: "isActive", label: "Status", render: (item: any) => (
      <span className={cn(
        "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
        item.isActive ? "bg-success-subtle text-success" : "bg-muted text-muted-foreground"
      )}>{item.isActive ? "Active" : "Inactive"}</span>
    )},
    { key: "actions", label: "", render: (_: any, i: number) => (
      <div className="flex items-center gap-1">
        <button onClick={() => setModal({ open: true, data: products[i] })} className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><Edit2 className="h-3.5 w-3.5" /></button>
        <button onClick={() => { const item = products[i]; if (item && confirm("Delete this product?")) del(item._id); }} className="p-1.5 rounded-lg text-muted-foreground hover:bg-danger-subtle hover:text-danger"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Products" description="Manage your product catalog"
        actions={<button onClick={() => setModal({ open: true })} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Product</button>}
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
