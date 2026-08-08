"use client";

import { useState } from "react";
import { useGetAdminOrdersQuery, useUpdateAdminOrderMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/utils/utils";

const statusColors: Record<string, string> = {
  pending: "bg-warning-subtle text-warning", confirmed: "bg-primary/10 text-primary",
  processing: "bg-accent/10 text-accent", shipped: "bg-info/10 text-info",
  delivered: "bg-success-subtle text-success", cancelled: "bg-danger-subtle text-danger",
};

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { data, isLoading } = useGetAdminOrdersQuery({ page, status: status || undefined });
  const [update] = useUpdateAdminOrderMutation();

  const columns = [
    { key: "_id", label: "Order", render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center"><ShoppingCart className="h-4 w-4 text-muted-foreground" /></div>
        <div><p className="text-sm font-mono font-semibold text-foreground">#{item._id?.slice(-6).toUpperCase()}</p><p className="text-[10px] text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p></div>
      </div>
    )},
    { key: "phone", label: "Customer", render: (item: any) => <span className="text-sm text-muted-foreground">{item.name || item.phone}</span> },
    { key: "total", label: "Total", sortable: true, render: (item: any) => <span className="text-sm font-bold">৳{Number(item.total).toLocaleString()}</span> },
    { key: "status", label: "Status", render: (item: any) => (
      <select value={item.status} onChange={(e) => update({ id: item._id, body: { status: e.target.value as any } })}
        className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border-0 outline-none cursor-pointer", statusColors[item.status] || "bg-muted text-muted-foreground")}>
        {Object.keys(statusColors).map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    )},
    { key: "paymentMethod", label: "Payment", render: (item: any) => <span className="text-xs text-muted-foreground uppercase">{item.paymentMethod || "---"}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Orders" description="Manage customer orders" />
      <div className="flex gap-2">
        {["", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => (
          <button key={s} onClick={() => { setStatus(s); setPage(1); }}
            className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors", status === s ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>{s || "All"}</button>
        ))}
      </div>
      <DataTable columns={columns} data={data?.data || []} searchable searchKeys={["phone", "name"]} searchPlaceholder="Search orders..." pageSize={10} loading={isLoading} />
    </div>
  );
}
