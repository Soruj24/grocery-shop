"use client";

import { useState } from "react";
import { useGetAdminBrandsQuery, useCreateAdminBrandMutation, useUpdateAdminBrandMutation, useDeleteAdminBrandMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Plus, Edit2, Trash2, Tag } from "lucide-react";
import { cn } from "@/utils/utils";

export default function AdminBrandsPage() {
  const { data, isLoading } = useGetAdminBrandsQuery();
  const [create] = useCreateAdminBrandMutation();
  const [update] = useUpdateAdminBrandMutation();
  const [del] = useDeleteAdminBrandMutation();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const resetForm = () => { setName(""); setSlug(""); setEditing(null); setShowForm(false); };

  const handleSave = async () => {
    if (!name.trim()) return;
    if (editing) await update({ id: editing._id as string, body: { name, slug, isActive: true } }).unwrap();
    else await create({ name, slug: slug || name.toLowerCase().replace(/\s+/g, "-") }).unwrap();
    resetForm();
  };

  const brands = data?.data || [];

  const columns = [
    { key: "name", label: "Brand", sortable: true, render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center"><Tag className="h-4 w-4 text-muted-foreground" /></div>
        <div><p className="text-sm font-semibold text-foreground">{item.name as string}</p><p className="text-[10px] text-muted-foreground">/{item.slug as string}</p></div>
      </div>
    )},
    { key: "productCount", label: "Products", render: (item: Record<string, unknown>) => <span className="text-sm text-muted-foreground">{String(item.productCount)}</span> },
    { key: "isActive", label: "Status", render: (item: Record<string, unknown>) => (
      <span className={cn(
        "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
        item.isActive ? "bg-success-subtle text-success" : "bg-muted text-muted-foreground"
      )}>{item.isActive ? "Active" : "Inactive"}</span>
    )},
    { key: "actions", label: "", render: (_: Record<string, unknown>, i: number) => (
      <div className="flex items-center gap-1">
        <button onClick={() => { const b = brands[i]; setEditing(b); setName(b.name as string); setSlug(b.slug as string); setShowForm(true); }} className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><Edit2 className="h-3.5 w-3.5" /></button>
        <button onClick={() => { if (confirm("Delete brand?")) del(brands[i]._id as string); }} className="p-1.5 rounded-lg text-muted-foreground hover:bg-danger-subtle hover:text-danger"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Brands" description="Manage product brands"
        actions={<button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Brand</button>}
      />
      {showForm && (
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
          <input aria-label="Brand name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Brand name" className="flex-1 rounded-xl border border-border px-4 py-2 text-sm bg-muted outline-none focus:border-primary" />
          <input aria-label="Brand slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug (auto)" className="flex-1 rounded-xl border border-border px-4 py-2 text-sm bg-muted outline-none focus:border-primary" />
          <button onClick={handleSave} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">{editing ? "Update" : "Create"}</button>
          <button onClick={resetForm} className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button>
        </div>
      )}
      <DataTable columns={columns} data={brands} searchable searchKeys={["name"]} searchPlaceholder="Search brands..." loading={isLoading} />
    </div>
  );
}
