"use client";

import { useState, useMemo } from "react";
import type { AdminProduct } from "@/types/admin";

interface SortConfig {
  key: keyof AdminProduct | "category";
  direction: "asc" | "desc";
}

interface UseAdminProductFiltersResult {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  filteredProducts: AdminProduct[];
  paginatedProducts: AdminProduct[];
  requestSort: (key: SortConfig["key"]) => void;
}

export function useAdminProductFilters(
  products: AdminProduct[],
): UseAdminProductFiltersResult {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const requestSort = (key: SortConfig["key"]) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p._id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory !== "all") {
      result = result.filter((p) => {
        const catId =
          typeof p.category === "string" ? p.category : p.category?._id;
        return catId === selectedCategory;
      });
    }
    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";
      if (sortConfig.key === "category") {
        aValue =
          typeof a.category === "string"
            ? a.category
            : a.category?.name || "";
        bValue =
          typeof b.category === "string"
            ? b.category
            : b.category?.name || "";
      } else {
        const valA = a[sortConfig.key as keyof AdminProduct];
        const valB = b[sortConfig.key as keyof AdminProduct];
        if (typeof valA === "number") aValue = valA;
        else if (typeof valA === "boolean") aValue = valA ? 1 : 0;
        else if (typeof valA === "string") aValue = valA.toLowerCase();
        else aValue = valA ? JSON.stringify(valA) : "";
        if (typeof valB === "number") bValue = valB;
        else if (typeof valB === "boolean") bValue = valB ? 1 : 0;
        else if (typeof valB === "string") bValue = valB.toLowerCase();
        else bValue = valB ? JSON.stringify(valB) : "";
      }
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [products, searchTerm, selectedCategory, sortConfig]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    filteredProducts,
    paginatedProducts,
    requestSort,
  };
}
