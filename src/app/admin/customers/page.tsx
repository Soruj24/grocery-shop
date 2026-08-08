"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGetAdminCustomersQuery } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import CustomersTable from "@/features/admin/shared/CustomersTable";
import type { AdminCustomer } from "@/types/admin";

export default function AdminCustomersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading, isError } = useGetAdminCustomersQuery({
    page,
    limit: 20,
    search,
    sort,
    sortDir,
    ...(statusFilter && { status: statusFilter }),
  });

  const handleSearch = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);

  const handleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return key;
      }
      setSortDir("asc");
      return key;
    });
  }, []);

  const handleStatusFilter = useCallback((v: string) => {
    setStatusFilter(v);
    setPage(1);
  }, []);

  const handleRowClick = useCallback((customer: AdminCustomer) => {
    router.push(`/admin/customers/${customer._id}`);
  }, [router]);

  if (isError) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Customers" description="View and manage your customers" />
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-subtle mb-4">
            <span className="text-danger text-2xl">!</span>
          </div>
          <p className="text-base font-semibold text-foreground">Failed to load customers</p>
          <p className="text-sm text-muted-foreground mt-1">Check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Customers" description="View and manage your customers" />

      <CustomersTable
        data={data?.data || []}
        totalCount={data?.totalCount || 0}
        currentPage={data?.currentPage || page}
        totalPages={data?.totalPages || 0}
        loading={isLoading}
        search={search}
        onSearchChange={handleSearch}
        sort={sort}
        sortDir={sortDir}
        onSort={handleSort}
        page={page}
        onPageChange={(p) => setPage(p)}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilter}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
