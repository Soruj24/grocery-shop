"use client";

import { useState, useEffect } from "react";
import { UserPlus, Shield, Mail, MoreHorizontal, Trash2, Edit } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@grocerybd.com", role: "admin", status: "active", lastLogin: "2 hours ago" },
  { id: "2", name: "Manager Rahim", email: "rahim@grocerybd.com", role: "manager", status: "active", lastLogin: "1 day ago" },
  { id: "3", name: "Support Agent", email: "support@grocerybd.com", role: "support", status: "active", lastLogin: "5 hours ago" },
  { id: "4", name: "Content Editor", email: "content@grocerybd.com", role: "editor", status: "inactive", lastLogin: "2 weeks ago" },
];

const roleColors: Record<string, string> = {
  admin: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  manager: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  support: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  editor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function UsersPage() {
  const [users] = useState(mockUsers);

  const columns = [
    { key: "name", label: "User", sortable: true, render: (item: typeof users[0]) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold">{item.name.charAt(0)}</div>
        <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p><p className="text-[10px] text-gray-400">{item.email}</p></div>
      </div>
    )},
    { key: "role", label: "Role", render: (item: typeof users[0]) => <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${roleColors[item.role]}`}>{item.role}</span> },
    { key: "status", label: "Status", render: (item: typeof users[0]) => <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-500"}`}>{item.status}</span> },
    { key: "lastLogin", label: "Last Login", render: (item: typeof users[0]) => <span className="text-xs text-gray-400">{item.lastLogin}</span> },
    { key: "actions", label: "", render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-colors"><Edit className="h-3.5 w-3.5" /></button>
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Users" description="Manage admin users and their roles."
        actions={<button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"><UserPlus className="h-4 w-4" /> Add User</button>}
      />
      <DataTable columns={columns} data={users} searchable searchKeys={["name", "email"]} searchPlaceholder="Search users..." />
    </div>
  );
}
