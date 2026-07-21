"use client";

import { ReactNode, useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: string[];
  pageSize?: number;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  actions?: ReactNode;
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys,
  pageSize = 10,
  emptyMessage = "No data found",
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = [...data];
    if (search && searchKeys) {
      const q = search.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => String(item[key] || "").toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal === bVal) return 0;
        const cmp = aVal < bVal ? -1 : 1;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, searchKeys, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      {(searchable || actions) && (
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 p-4">
          {searchable && searchKeys && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          )}
          {actions}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ${col.sortable ? "cursor-pointer select-none hover:text-gray-600 dark:hover:text-gray-300" : ""} ${col.className || ""}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                    )}
                    {col.sortable && sortKey !== col.key && <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center">
                  <p className="text-sm text-gray-400">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paged.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => onRowClick?.(item)}
                  className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30 ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 text-sm ${col.className || ""}`}>
                      {col.render ? col.render(item, (page - 1) * pageSize + i) : String(item[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 px-4 py-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold ${p === page ? "bg-emerald-500 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  {p}
                </button>
              );
            })}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
