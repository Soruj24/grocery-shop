"use client";

import { useGetAdminReviewsQuery, useUpdateReviewStatusMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Star, CheckCircle2, XCircle } from "lucide-react";

export default function AdminReviewsPage() {
  const { data, isLoading } = useGetAdminReviewsQuery();
  const [updateStatus] = useUpdateReviewStatusMutation();
  const reviews = data?.data || [];

  const columns = [
    { key: "customer", label: "Customer", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">{(item.customer as string)?.charAt(0)}</div>
        <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{item.customer as string}</p><p className="text-[10px] text-gray-400">{item.product as string}</p></div>
      </div>
    )},
    { key: "rating", label: "Rating", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < Number(item.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-700"}`} />)}</div>
    )},
    { key: "comment", label: "Comment", render: (item: Record<string, unknown>) => <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs truncate">{item.comment as string}</p> },
    { key: "status", label: "Status", render: (item: Record<string, unknown>) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.status === "approved" ? "bg-emerald-100 text-emerald-700" : item.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{item.status as string}</span>
    )},
    { key: "actions", label: "", render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-1">
        <button onClick={() => updateStatus({ id: item.id as string, status: "approved" })} className="p-1.5 rounded-lg text-gray-400 hover:bg-emerald-50 hover:text-emerald-500"><CheckCircle2 className="h-3.5 w-3.5" /></button>
        <button onClick={() => updateStatus({ id: item.id as string, status: "rejected" })} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><XCircle className="h-3.5 w-3.5" /></button>
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
