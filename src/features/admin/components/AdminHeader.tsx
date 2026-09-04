"use client";

import { Plus, Search } from "lucide-react";
import { cn } from "@/utils/utils";

interface AdminHeaderProps {
  title: string;
  count?: number;
  countLabel?: string;
  onAddClick?: () => void;
  addLabel?: string;
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
  addLabel,
  addButtonLabel,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "সার্চ করুন...",
}: AdminHeaderProps) {
  const finalAddLabel = addLabel || addButtonLabel || "নতুন যোগ করুন";
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {title}
        </h1>
        {count !== undefined && (
          <p className="text-sm text-muted-foreground">
            মোট {count} {countLabel}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        {onSearchChange && (
          <div className="relative group w-full sm:w-auto sm:min-w-[300px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={cn(
                "block w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-lg",
                "text-sm text-foreground placeholder:text-muted-foreground",
                "focus:ring-1 focus:ring-ring focus:border-ring transition-all outline-none",
              )}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {onAddClick && (
          <button
            onClick={onAddClick}
            className={cn(
              "flex items-center justify-center gap-2 px-5 py-2.5",
              "bg-primary text-primary-foreground rounded-lg text-sm font-medium",
              "hover:bg-primary/90 transition-all active:scale-[0.98]",
            )}
          >
            <Plus className="h-4 w-4" />
            {finalAddLabel}
          </button>
        )}
      </div>
    </div>
  );
}
