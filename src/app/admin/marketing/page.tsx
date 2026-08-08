"use client";

import { useGetAdminCampaignsQuery } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Megaphone } from "lucide-react";
import { cn } from "@/utils/utils";

export default function AdminMarketingPage() {
  const { data, isLoading } = useGetAdminCampaignsQuery();
  const campaigns = (data?.data || []) as Record<string, unknown>[];

  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground", active: "bg-success-subtle text-success",
    completed: "bg-primary/10 text-primary", scheduled: "bg-warning-subtle text-warning",
  };

  const columns = [
    { key: "name", label: "Campaign", sortable: true, render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-danger-subtle flex items-center justify-center"><Megaphone className="h-4 w-4 text-danger" /></div>
        <span className="text-sm font-semibold text-foreground">{item.name as string}</span>
      </div>
    )},
    { key: "type", label: "Type", render: (item: Record<string, unknown>) => <span className="text-xs uppercase font-semibold text-muted-foreground">{item.type as string}</span> },
    { key: "status", label: "Status", render: (item: Record<string, unknown>) => (
      <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", statusColors[item.status as string] || "")}>{item.status as string}</span>
    )},
    { key: "stats.sent", label: "Sent", render: (item: Record<string, unknown>) => {
      const stats = item.stats as Record<string, unknown> || {};
      return <span className="text-sm font-semibold">{String(stats.sent || 0)}</span>;
    }},
    { key: "createdAt", label: "Created", render: (item: Record<string, unknown>) => <span className="text-xs text-muted-foreground">{new Date(item.createdAt as string).toLocaleDateString()}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Marketing" description="Manage campaigns and promotions" />
      <DataTable columns={columns} data={campaigns} searchable searchKeys={["name"]} searchPlaceholder="Search campaigns..." loading={isLoading} />
    </div>
  );
}
