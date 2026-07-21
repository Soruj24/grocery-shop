"use client";

import { useState } from "react";
import { Star, MoreHorizontal, CheckCircle2, XCircle, Eye } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const mockReviews = [
  { id: "1", customer: "Rahim Uddin", product: "Fresh Mango 2kg", rating: 5, comment: "Excellent quality! Very sweet and fresh.", status: "approved", date: "2026-07-18" },
  { id: "2", customer: "Karim Ahmed", product: "Basmati Rice 5kg", rating: 4, comment: "Good rice but packaging could be better.", status: "pending", date: "2026-07-17" },
  { id: "3", customer: "Fatima Begum", product: "Dairy Milk 1L", rating: 5, comment: "Always fresh and delivered on time.", status: "approved", date: "2026-07-15" },
  { id: "4", customer: "Hasan Ali", product: "Chicken Breast 1kg", rating: 2, comment: "Not fresh enough.", status: "rejected", date: "2026-07-14" },
  { id: "5", customer: "Nadia Khatun", product: "Organic Eggs 12pc", rating: 4, comment: "Good quality eggs.", status: "approved", date: "2026-07-12" },
];

export default function ReviewsPage() {
  const [reviews] = useState(mockReviews);

  const columns = [
    { key: "customer", label: "Customer", render: (item: typeof reviews[0]) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">{item.customer.charAt(0)}</div>
        <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{item.customer}</p><p className="text-[10px] text-gray-400">{item.product}</p></div>
      </div>
    )},
    { key: "rating", label: "Rating", sortable: true, render: (item: typeof reviews[0]) => (
      <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-3.5 w-3.5 ${s <= item.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-700"}`} />)}</div>
    )},
    { key: "comment", label: "Comment", render: (item: typeof reviews[0]) => <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs truncate">{item.comment}</p> },
    { key: "status", label: "Status", render: (item: typeof reviews[0]) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.status === "approved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : item.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>{item.status}</span>
    )},
    { key: "date", label: "Date", sortable: true, render: (item: typeof reviews[0]) => <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</span> },
    { key: "actions", label: "", render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-500 transition-colors"><CheckCircle2 className="h-3.5 w-3.5" /></button>
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"><XCircle className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Reviews" description="Moderate customer reviews." />
      <DataTable columns={columns} data={reviews} searchable searchKeys={["customer", "product", "comment"]} searchPlaceholder="Search reviews..." />
    </div>
  );
}
