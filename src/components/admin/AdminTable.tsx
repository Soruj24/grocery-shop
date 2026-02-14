"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Column {
  header: string;
  className?: string;
}

interface AdminTableProps {
  columns: Column[];
  children: React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
}

export default function AdminTable({
  columns,
  children,
  loading = false,
  emptyMessage = "কোন তথ্য পাওয়া যায়নি",
  loadingMessage = "লোড হচ্ছে...",
}: AdminTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-8 py-6 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-8 py-12 text-center text-gray-400 dark:text-gray-500 font-bold"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                    {loadingMessage}
                  </div>
                </td>
              </tr>
            ) : React.Children.count(children) === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-8 py-12 text-center text-gray-400 dark:text-gray-500 font-bold"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
