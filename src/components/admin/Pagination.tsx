"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  label: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  label,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="px-10 py-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-gray-900">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">
          Showing
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-black text-gray-900 dark:text-white">
            {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>
          <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
            of
          </span>
          <span className="text-sm font-black text-gray-900 dark:text-white">
            {totalItems}
          </span>
        </div>
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mt-1">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-500 hover:border-green-100 dark:hover:border-green-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2 p-1.5 bg-gray-50/50 dark:bg-gray-800/50 rounded-[1.5rem] border border-gray-100/50 dark:border-gray-700/50">
          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span
                key={`dots-${idx}`}
                className="w-10 text-center text-gray-300 dark:text-gray-600 font-black tracking-widest"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`min-w-[44px] h-11 px-3 flex items-center justify-center rounded-xl text-xs font-black transition-all duration-300 ${
                  currentPage === page
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/20 scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 hover:border-green-100 dark:hover:border-green-900 hover:text-green-600 dark:hover:text-green-500 hover:shadow-sm"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-500 hover:border-green-100 dark:hover:border-green-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm group"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
