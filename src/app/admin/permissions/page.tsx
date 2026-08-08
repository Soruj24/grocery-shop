"use client";

import { useGetAdminRolesQuery, useUpdateAdminRoleMutation } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Shield, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/utils/utils";

const resourceLabels: Record<string, string> = {
  dashboard: "Dashboard", orders: "Orders", products: "Products", categories: "Categories",
  brands: "Brands", customers: "Customers", reviews: "Reviews", coupons: "Coupons",
  settings: "Settings", users: "Users", reports: "Reports", notifications: "Notifications",
};

export default function AdminPermissionsPage() {
  const { data, isLoading } = useGetAdminRolesQuery();
  const [update] = useUpdateAdminRoleMutation();
  const roles = (data?.data || []) as Record<string, unknown>[];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Permissions" description="Manage roles and access control" />
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{[1, 2].map((i) => <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role._id as string} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center"><Shield className="h-5 w-5 text-accent" /></div>
                <div><h3 className="text-sm font-bold text-foreground">{role.name as string}</h3><p className="text-xs text-muted-foreground">{role.description as string}</p></div>
                <span className={cn(
                  "ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                  role.isActive ? "bg-success-subtle text-success" : "bg-muted text-muted-foreground"
                )}>{role.isActive ? "Active" : "Inactive"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(resourceLabels).map(([key, label]) => {
                  const perms = (role.permissions as Record<string, unknown>[]) || [];
                  const hasResource = perms.some((p: Record<string, unknown>) => p.resource === key);
                  return (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      {hasResource ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <XCircle className="h-3.5 w-3.5 text-gray-300" />}
                      <span className="text-muted-foreground">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
