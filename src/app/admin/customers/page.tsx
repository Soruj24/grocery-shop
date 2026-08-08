"use client";

import { useState } from "react";
import { useGetAdminCustomersQuery } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Users } from "lucide-react";

export default function AdminCustomersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAdminCustomersQuery({ page });

  const columns = [
    { key: "name", label: "Customer", sortable: true, render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold">{item.name?.charAt(0) || "?"}</div>
        <div><p className="text-sm font-semibold text-foreground">{item.name}</p><p className="text-[10px] text-muted-foreground">{item.email}</p></div>
      </div>
    )},
    { key: "phone", label: "Phone", render: (item: any) => <span className="text-xs text-muted-foreground">{item.phone || "---"}</span> },
    { key: "orderCount", label: "Orders", sortable: true, render: (item: any) => <span className="text-sm font-semibold">{String(item.orderCount || 0)}</span> },
    { key: "totalSpent", label: "Total Spent", sortable: true, render: (item: any) => <span className="text-sm font-bold">৳{Number(item.totalSpent || 0).toLocaleString()}</span> },
    { key: "createdAt", label: "Joined", render: (item: any) => <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Customers" description="View and manage your customers" />
      <DataTable columns={columns} data={data?.data || []} searchable searchKeys={["name", "email", "phone"]} searchPlaceholder="Search customers..." pageSize={10} loading={isLoading} />
    </div>
  );
}
