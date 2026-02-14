"use client";

import { Plus, Search } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  count?: number;
  countLabel?: string;
  onAddClick?: () => void;
  addButtonLabel?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function AdminHeader({
  title,
  count,
  countLabel,
  onAddClick,
  addButtonLabel,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "সার্চ করুন...",
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {count !== undefined && (
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-green-500 rounded-full"></span>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Total {count} {countLabel}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Search Bar */}
        {onSearchChange && (
          <div className="relative group min-w-[300px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none dark:text-white shadow-sm"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {/* Add Button - Only show if onAddClick is provided */}
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-lg shadow-green-500/20 transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            {addButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
