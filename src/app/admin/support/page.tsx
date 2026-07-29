"use client";

import { useState } from "react";
import { useGetAdminTicketsQuery, useUpdateTicketMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { HeadphonesIcon, MessageSquare } from "lucide-react";

export default function AdminSupportPage() {
  const { data, isLoading } = useGetAdminTicketsQuery();
  const [update] = useUpdateTicketMutation();
  const [replyModal, setReplyModal] = useState<Record<string, unknown> | null>(null);
  const [replyText, setReplyText] = useState("");
  const tickets = (data?.data || []) as Record<string, unknown>[];

  const statusColors: Record<string, string> = {
    open: "bg-emerald-100 text-emerald-700", pending: "bg-amber-100 text-amber-700",
    resolved: "bg-gray-100 text-gray-500", closed: "bg-red-100 text-red-700",
  };
  const priorityColors: Record<string, string> = {
    low: "bg-blue-100 text-blue-700", medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700", urgent: "bg-rose-100 text-rose-700",
  };

  const columns = [
    { key: "_id", label: "Ticket", render: (item: Record<string, unknown>) => <span className="font-mono text-xs font-semibold">#{(item._id as string)?.slice(-6).toUpperCase()}</span> },
    { key: "customer", label: "Customer", render: (item: Record<string, unknown>) => <span className="text-sm font-medium">{item.customer as string}</span> },
    { key: "subject", label: "Subject", render: (item: Record<string, unknown>) => <span className="text-sm text-gray-600">{item.subject as string}</span> },
    { key: "priority", label: "Priority", render: (item: Record<string, unknown>) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${priorityColors[item.priority as string] || ""}`}>{item.priority as string}</span>
    )},
    { key: "status", label: "Status", render: (item: Record<string, unknown>) => (
      <select value={item.status as string} onChange={(e) => update({ id: item._id as string, body: { status: e.target.value } })}
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border-0 outline-none cursor-pointer ${statusColors[item.status as string] || ""}`}>
        {Object.keys(statusColors).map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    )},
    { key: "actions", label: "", render: (item: Record<string, unknown>) => (
      <button onClick={() => setReplyModal(item)} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500"><MessageSquare className="h-3.5 w-3.5" /></button>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Support Tickets" description="Manage customer support requests" />
      <DataTable columns={columns} data={tickets} searchable searchKeys={["customer", "subject"]} searchPlaceholder="Search tickets..." loading={isLoading} />
      {replyModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setReplyModal(null); setReplyText(""); }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-1">Reply to Ticket</h3>
            <p className="text-sm text-gray-500 mb-4">Customer: {replyModal.customer as string} — {replyModal.subject as string}</p>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply..." rows={4}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-sm outline-none focus:border-emerald-500 resize-none" />
            <div className="flex gap-2 mt-4 justify-end">
              <button onClick={() => { setReplyModal(null); setReplyText(""); }} className="px-4 py-2 rounded-xl border text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={async () => {
                if (!replyText.trim()) return;
                await update({ id: replyModal._id as string, body: { replies: [...((replyModal.replies as unknown[]) || []), { message: replyText, isStaff: true, createdAt: new Date().toISOString() }] } }).unwrap();
                setReplyModal(null); setReplyText("");
              }} className="px-4 py-2 rounded-xl bg-emerald-500 text-sm font-semibold text-white hover:bg-emerald-600">Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
