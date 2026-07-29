"use client";

import { useGetAdminReturnsQuery, useUpdateReturnStatusMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { RotateCcw, CheckCircle2, XCircle, Clock } from "lucide-react";

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  approved: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
  pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
  rejected: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
};

export default function AdminReturnsPage() {
  const { data, isLoading } = useGetAdminReturnsQuery();
  const [update] = useUpdateReturnStatusMutation();
  const returns = (data?.data || []) as Record<string, unknown>[];

  const columns = [
    { key: "id", label: "Return ID", render: (item: Record<string, unknown>) => <span className="font-mono text-xs font-semibold">{item.id as string}</span> },
    { key: "customer", label: "Customer", render: (item: Record<string, unknown>) => <span className="text-sm font-medium">{item.customer as string}</span> },
    { key: "item", label: "Product", render: (item: Record<string, unknown>) => <span className="text-sm text-gray-600">{item.item as string}</span> },
    { key: "reason", label: "Reason", render: (item: Record<string, unknown>) => <span className="text-xs text-gray-500">{item.reason as string}</span> },
    { key: "refund", label: "Refund", render: (item: Record<string, unknown>) => <span className="text-sm font-bold">৳{Number(item.refund).toLocaleString()}</span> },
    { key: "status", label: "Status", render: (item: Record<string, unknown>) => {
      const cfg = statusConfig[item.status as string] || statusConfig.pending;
      const Icon = cfg.icon;
      return <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}><Icon className="h-3 w-3" /> {item.status as string}</span>;
    }},
    { key: "actions", label: "", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-1">
        <button onClick={() => update({ id: item.id as string, status: "approved" })} className="p-1.5 rounded-lg text-gray-400 hover:bg-emerald-50 hover:text-emerald-500"><CheckCircle2 className="h-3.5 w-3.5" /></button>
        <button onClick={() => update({ id: item.id as string, status: "rejected" })} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><XCircle className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Returns" description="Manage return requests and refunds" />
      <DataTable columns={columns} data={returns} searchable searchKeys={["customer", "item"]} searchPlaceholder="Search returns..." loading={isLoading} />
    </div>
  );
}
