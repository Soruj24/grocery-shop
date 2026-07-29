"use client";

import { useGetAdminCombosQuery, useDeleteAdminComboMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Layers, Trash2, Plus } from "lucide-react";

export default function AdminCombosPage() {
  const { data, isLoading } = useGetAdminCombosQuery();
  const [del] = useDeleteAdminComboMutation();
  const combos = data?.data || [];

  const columns = [
    { key: "name", label: "Combo Pack", sortable: true, render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center"><Layers className="h-4 w-4 text-white" /></div>
        <span className="text-sm font-semibold text-gray-900">{item.name}</span>
      </div>
    )},
    { key: "price", label: "Price", render: (item: any) => <span className="text-sm font-bold">৳{Number(item.price).toLocaleString()}</span> },
    { key: "saveAmount", label: "You Save", render: (item: any) => <span className="text-xs font-semibold text-emerald-600">৳{Number(item.saveAmount).toLocaleString()}</span> },
    { key: "tag", label: "Tag", render: (item: any) => <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{item.tag}</span> },
    { key: "isActive", label: "Status", render: (item: any) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</span>
    )},
    { key: "actions", label: "", render: (_: any, i: number) => (
      <div className="flex items-center gap-1">
        <button onClick={() => window.location.href = `/admin/combos/${combos[i]._id}`} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
        <button onClick={() => { if (confirm("Delete combo?")) del(combos[i]._id); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Combo Packs" description="Manage product bundles and combo offers"
        actions={<button onClick={() => window.location.href = "/admin/combos/new"} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"><Plus className="h-4 w-4" /> Add Combo</button>}
      />
      <DataTable columns={columns} data={combos} searchable searchKeys={["name"]} searchPlaceholder="Search combos..." loading={isLoading} />
    </div>
  );
}
