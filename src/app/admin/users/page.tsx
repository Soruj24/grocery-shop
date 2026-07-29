"use client";

import { useGetAdminUsersQuery, useUpdateAdminUserMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { UserCog, Shield, Trash2 } from "lucide-react";

const roleColors: Record<string, string> = {
  admin: "bg-violet-100 text-violet-700", manager: "bg-blue-100 text-blue-700",
  support: "bg-emerald-100 text-emerald-700", editor: "bg-amber-100 text-amber-700",
};

export default function AdminUsersPage() {
  const { data, isLoading } = useGetAdminUsersQuery();
  const [update] = useUpdateAdminUserMutation();
  const users = (data?.data || []) as Record<string, unknown>[];

  const columns = [
    { key: "name", label: "User", sortable: true, render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold">{(item.name as string)?.charAt(0)}</div>
        <div><p className="text-sm font-semibold text-gray-900">{item.name as string}</p><p className="text-[10px] text-gray-400">{item.email as string}</p></div>
      </div>
    )},
    { key: "role", label: "Role", render: (item: Record<string, unknown>) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${roleColors[item.role as string] || ""}`}>{item.role as string}</span>
    )},
    { key: "status", label: "Status", render: (item: Record<string, unknown>) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{item.status as string}</span>
    )},
    { key: "lastLogin", label: "Last Login", render: (item: Record<string, unknown>) => <span className="text-xs text-gray-400">{item.lastLogin as string}</span> },
    { key: "actions", label: "", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-1">
        <select value={item.role as string} onChange={(e) => update({ id: item._id as string, body: { role: e.target.value } })}
          className="text-[10px] font-bold uppercase px-1 py-0.5 rounded-lg border border-gray-200 outline-none cursor-pointer bg-white dark:bg-gray-800">
          {Object.keys(roleColors).map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={() => { if (confirm("Delete this user?")) update({ id: item._id as string, body: {} }); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Admin Users" description="Manage admin users and their roles" />
      <DataTable columns={columns} data={users} searchable searchKeys={["name", "email"]} searchPlaceholder="Search users..." loading={isLoading} />
    </div>
  );
}
