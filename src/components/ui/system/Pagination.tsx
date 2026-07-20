"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./types";
import { IconButton } from "./IconButton";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const total = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, page), total);

  const pages: (number | "…")[] = [];
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(total - 1, current + siblingCount);

  pages.push(1);
  if (left > 2) pages.push("…");
  pages.push(...range(left, right));
  if (right < total - 1) pages.push("…");
  if (total > 1) pages.push(total);

  return (
    <nav
      className={cn("flex items-center gap-1.5", className)}
      aria-label="Pagination"
    >
      <IconButton
        aria-label="Previous page"
        variant="outline"
        size="sm"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </IconButton>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-muted-foreground" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === current ? "page" : undefined}
            className={cn(
              "h-9 min-w-9 rounded-md px-3 text-sm font-semibold transition-colors",
              p === current
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            {p}
          </button>
        ),
      )}

      <IconButton
        aria-label="Next page"
        variant="outline"
        size="sm"
        disabled={current >= total}
        onClick={() => onPageChange(current + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </IconButton>
    </nav>
  );
}
Pagination.displayName = "Pagination";
