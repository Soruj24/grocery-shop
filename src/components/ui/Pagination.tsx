"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
  totalCount?: number;
  itemsPerPage?: number;
}

export default function Pagination({ totalPages, currentPage, basePath, totalCount, itemsPerPage = 12 }: PaginationProps) {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${basePath}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="px-10 py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8 bg-card rounded-2xl shadow-sm">
      {/* Showing Status */}
      {totalCount !== undefined && (
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{t('showing_text')}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-foreground">
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalCount).toLocaleString('bn-BD')} {t('to_text')} {Math.min(currentPage * itemsPerPage, totalCount).toLocaleString('bn-BD')}
            </span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t('of_text')}</span>
            <span className="text-sm font-black text-foreground">{totalCount.toLocaleString('bn-BD')}</span>
          </div>
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">{t('products_text')}</span>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center gap-3">
        {/* Previous Button */}
        <Link
          href={createPageURL(currentPage - 1)}
          className={`group flex items-center justify-center w-12 h-12 rounded-2xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary-subtle hover:shadow-lg transition-all duration-300 ${
            currentPage <= 1 ? "pointer-events-none opacity-30 grayscale" : ""
          }`}
          title={t('previous_page')}
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </Link>

        {/* Page Numbers */}
        <div className="flex items-center gap-2 bg-muted p-1.5 rounded-2xl border border-border">
          {getPageNumbers().map((page, idx) => (
            page === "..." ? (
              <span key={`dots-${idx}`} className="w-10 text-center text-muted-foreground font-black tracking-widest">...</span>
            ) : (
              <Link
                key={`page-${page}`}
                href={createPageURL(page)}
                className={`min-w-[44px] h-11 px-3 flex items-center justify-center rounded-xl font-black text-xs transition-all duration-300 ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground shadow-primary scale-105"
                    : "bg-card text-muted-foreground border border-border hover:border-primary-subtle hover:text-primary hover:shadow-sm"
                }`}
              >
                {typeof page === 'number' ? page.toLocaleString('bn-BD') : page}
              </Link>
            )
          ))}
        </div>

        {/* Next Button */}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`group flex items-center justify-center w-12 h-12 rounded-2xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary-subtle hover:shadow-lg transition-all duration-300 ${
            currentPage >= totalPages ? "pointer-events-none opacity-30 grayscale" : ""
          }`}
          title={t('next_page')}
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
