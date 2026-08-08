"use client";

import { useGetInventoryAlertsQuery } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Boxes, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/utils";

export default function AdminInventoryPage() {
  const { data, isLoading } = useGetInventoryAlertsQuery();
  const items = data?.data || [];
  const lowStock = items.filter((i) => (i.status as string) !== "in_stock");
  const inStock = items.filter((i) => (i.status as string) === "in_stock");

  const columns = [
    { key: "name", label: "Product", sortable: true, render: (item: Record<string, unknown>) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center"><Boxes className="h-4 w-4 text-muted-foreground" /></div>
        <div><p className="text-sm font-semibold text-foreground">{item.name as string}</p><p className="text-[10px] text-muted-foreground">{item.category as string}</p></div>
      </div>
    )},
    { key: "stock", label: "Stock", sortable: true, render: (item: Record<string, unknown>) => (
      <span className={cn(
        "text-sm font-bold",
        Number(item.stock) <= 0 && "text-danger",
        Number(item.stock) > 0 && Number(item.stock) <= 10 && "text-warning",
        Number(item.stock) > 10 && "text-success"
      )}>{String(item.stock)}</span>
    )},
    { key: "price", label: "Price", render: (item: Record<string, unknown>) => <span className="text-sm font-semibold">৳{Number(item.price).toLocaleString()}</span> },
    { key: "status", label: "Status", render: (item: Record<string, unknown>) => {
      const config: Record<string, { icon: typeof AlertTriangle; label: string; color: string }> = {
        out_of_stock: { icon: AlertTriangle, label: "Out of Stock", color: "bg-danger-subtle text-danger" },
        low_stock: { icon: AlertTriangle, label: "Low Stock", color: "bg-warning-subtle text-warning" },
        in_stock: { icon: CheckCircle2, label: "In Stock", color: "bg-success-subtle text-success" },
      };
      const cfg = config[item.status as string] || config.in_stock;
      const Icon = cfg.icon;
      return <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", cfg.color)}><Icon className="h-3 w-3" /> {cfg.label}</span>;
    }},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Inventory" description="Monitor stock levels and inventory alerts" />
      {lowStock.length > 0 && (
        <div className="rounded-xl bg-warning-subtle border border-warning/20 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-warning">{lowStock.length} product(s) need attention — low stock or out of stock.</p>
        </div>
      )}
      <DataTable columns={columns} data={[...lowStock, ...inStock]} searchable searchKeys={["name"]} searchPlaceholder="Search inventory..." loading={isLoading} />
    </div>
  );
}
