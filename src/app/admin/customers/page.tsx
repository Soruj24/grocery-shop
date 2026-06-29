"use client";

import AdminHeader from "@/features/admin/components/AdminHeader";
import Pagination from "@/features/admin/components/Pagination";
import AdminTable from "@/features/admin/components/AdminTable";
import CustomerTableRow from "@/features/admin/customers/components/CustomerTableRow";
import { useAdminCustomers } from "@/features/admin/customers/hooks/useAdminCustomers";

export default function AdminCustomersPage() {
  const {
    filteredCustomers,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    handleDelete,
  } = useAdminCustomers();

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <AdminHeader
        title="কাস্টমার তালিকা"
        count={filteredCustomers.length}
        countLabel="Customers"
        searchTerm={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="নাম বা ফোন নম্বর দিয়ে সার্চ করুন..."
      />

      <AdminTable
        columns={[
          { header: "নাম" },
          { header: "যোগাযোগ" },
          { header: "ঠিকানা" },
          { header: "নিবন্ধিত হয়েছে" },
          { header: "অ্যাকশন", className: "text-right" },
        ]}
        loading={loading}
        emptyMessage="কোন কাস্টমার পাওয়া যায়নি"
      >
        {paginatedCustomers.map((customer) => (
          <CustomerTableRow
            key={customer._id}
            customer={customer}
            onDelete={handleDelete}
          />
        ))}
      </AdminTable>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredCustomers.length}
        itemsPerPage={itemsPerPage}
        label="Customers"
      />
    </div>
  );
}
