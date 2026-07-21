"use client";

import { useState } from "react";
import { HeadphonesIcon, MessageSquare, Clock, CheckCircle2, AlertCircle, Send } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const mockTickets = [
  { id: "TKT-001", customer: "Rahim Uddin", subject: "Order not received", priority: "high", status: "open", date: "2026-07-18", lastReply: "2 hours ago" },
  { id: "TKT-002", customer: "Karim Ahmed", subject: "Wrong item delivered", priority: "medium", status: "open", date: "2026-07-17", lastReply: "5 hours ago" },
  { id: "TKT-003", customer: "Fatima Begum", subject: "Refund not processed", priority: "high", status: "pending", date: "2026-07-15", lastReply: "1 day ago" },
  { id: "TKT-004", customer: "Hasan Ali", subject: "Delivery delay", priority: "low", status: "resolved", date: "2026-07-12", lastReply: "3 days ago" },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const statusColors: Record<string, string> = {
  open: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  resolved: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

export default function SupportPage() {
  const [tickets] = useState(mockTickets);

  const columns = [
    { key: "id", label: "Ticket", render: (item: typeof tickets[0]) => <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white">{item.id}</span> },
    { key: "customer", label: "Customer", render: (item: typeof tickets[0]) => <span className="text-sm font-medium text-gray-900 dark:text-white">{item.customer}</span> },
    { key: "subject", label: "Subject", render: (item: typeof tickets[0]) => <span className="text-sm text-gray-600 dark:text-gray-400">{item.subject}</span> },
    { key: "priority", label: "Priority", render: (item: typeof tickets[0]) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${priorityColors[item.priority]}`}>{item.priority}</span>
    )},
    { key: "status", label: "Status", render: (item: typeof tickets[0]) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>{item.status}</span>
    )},
    { key: "lastReply", label: "Last Reply", render: (item: typeof tickets[0]) => <span className="text-xs text-gray-400">{item.lastReply}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Support Tickets" description="Manage customer support requests." />
      <DataTable columns={columns} data={tickets} searchable searchKeys={["customer", "subject", "id"]} searchPlaceholder="Search tickets..." />
    </div>
  );
}
