"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Pagination from "@/components/admin/Pagination";
import AdminTable from "@/components/admin/AdminTable";
import CustomerTableRow from "@/components/admin/customers/CustomerTableRow";
import { AdminCustomer } from "@/types/admin";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/admin/customers");
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer: AdminCustomer) => 
    customer.name.toLowerCase().includes(search.toLowerCase()) || 
    customer.phone?.includes(search)
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <AdminHeader
        title="কাস্টমার তালিকা"
        count={customers.length}
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
        ]}
        loading={loading}
        emptyMessage="কোন কাস্টমার পাওয়া যায়নি"
      >
        {paginatedCustomers.map((customer) => (
          <CustomerTableRow key={customer._id} customer={customer} />
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
