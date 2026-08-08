"use client";

import { useGetAdminReviewsQuery, useUpdateReviewStatusMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Star, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/utils/utils";

export default function AdminReviewsPage() {
  const { data, isLoading } = useGetAdminReviewsQuery();
  const [updateStatus] = useUpdateReviewStatusMutation();
  const reviews = data?.data || [];

  const columns = [
    { key: "customer", label: "Customer", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">{(item.customer as string)?.charAt(0)}</div>
        <div><p className="text-sm font-semibold text-foreground">{item.customer as string}</p><p className="text-[10px] text-muted-foreground">{item.product as string}</p></div>
      </div>
    )},
    { key: "rating", label: "Rating", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={cn("h-3.5 w-3.5", i < Number(item.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-700")} />)}</div>
    )},
    { key: "comment", label: "Comment", render: (item: Record<string, unknown>) => <p className="text-xs text-muted-foreground max-w-xs truncate">{item.comment as string}</p> },
    { key: "status", label: "Status", render: (item: Record<string, unknown>) => (
      <span className={cn(
        "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
        item.status === "approved" && "bg-success-subtle text-success",
        item.status === "rejected" && "bg-danger-subtle text-danger",
        item.status !== "approved" && item.status !== "rejected" && "bg-warning-subtle text-warning"
      )}>{item.status as string}</span>
    )},
    { key: "actions", label: "", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-1">
        <button onClick={() => updateStatus({ id: item.id as string, status: "approved" })} className="p-1.5 rounded-lg text-muted-foreground hover:bg-success-subtle hover:text-success"><CheckCircle2 className="h-3.5 w-3.5" /></button>
        <button onClick={() => updateStatus({ id: item.id as string, status: "rejected" })} className="p-1.5 rounded-lg text-muted-foreground hover:bg-danger-subtle hover:text-danger"><XCircle className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Reviews" description="Moderate customer reviews" />
      <DataTable columns={columns} data={reviews} searchable searchKeys={["customer", "product", "comment"]} searchPlaceholder="Search reviews..." loading={isLoading} />
    </div>
  );
}
