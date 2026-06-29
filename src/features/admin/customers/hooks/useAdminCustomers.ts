"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminCustomer } from "@/types/admin";
import { toast, confirmAlert, errorAlert } from "@/utils/swal";

interface UseAdminCustomersResult {
  customers: AdminCustomer[];
  filteredCustomers: AdminCustomer[];
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  handleDelete: (id: string) => Promise<void>;
}

export function useAdminCustomers(): UseAdminCustomersResult {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleDelete = async (id: string) => {
    const result = await confirmAlert({
      title: "আপনি কি নিশ্চিত?",
      text: "এই কাস্টমারকে ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, থাক",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/customers/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.fire({ icon: "success", title: "কাস্টমার ডিলিট করা হয়েছে" });
        fetchCustomers();
      }
    } catch (error) {
      errorAlert("ভুল হয়েছে!", "ডিলিট করতে সমস্যা হয়েছে");
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone?.includes(search),
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return {
    customers,
    filteredCustomers,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    handleDelete,
  };
}
