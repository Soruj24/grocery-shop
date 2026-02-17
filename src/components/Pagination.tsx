"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
  totalCount?: number;
  itemsPerPage?: number;
}

export default function Pagination({ totalPages, currentPage, basePath, totalCount, itemsPerPage = 12 }: PaginationProps) {
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  
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
    <div className="px-10 py-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm">
      {/* Showing Status */}
      {totalCount !== undefined && (
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] mb-1">{t('showing_text')}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-gray-900 dark:text-gray-100">
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalCount).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} {t('to_text')} {Math.min(currentPage * itemsPerPage, totalCount).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
            </span>
            <span className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em]">{t('of_text')}</span>
            <span className="text-sm font-black text-gray-900 dark:text-gray-100">{totalCount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
          </div>
          <span className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] mt-1">{t('products_text')}</span>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center gap-3">
        {/* Previous Button */}
        <Link
          href={createPageURL(currentPage - 1)}
          className={`group flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-500 hover:border-green-100 dark:hover:border-green-900 hover:shadow-lg hover:shadow-green-900/5 transition-all duration-300 ${
            currentPage <= 1 ? "pointer-events-none opacity-30 grayscale" : ""
          }`}
          title={t('previous_page')}
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </Link>

        {/* Page Numbers */}
        <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-gray-800/50 p-1.5 rounded-[1.5rem] border border-gray-100/50 dark:border-gray-700/50">
          {getPageNumbers().map((page, idx) => (
            page === "..." ? (
              <span key={`dots-${idx}`} className="w-10 text-center text-gray-300 dark:text-gray-600 font-black tracking-widest">...</span>
            ) : (
              <Link
                key={`page-${page}`}
                href={createPageURL(page)}
                className={`min-w-[44px] h-11 px-3 flex items-center justify-center rounded-xl font-black text-xs transition-all duration-300 ${
                  currentPage === page
                    ? "bg-green-600 text-white shadow-xl shadow-green-900/20 scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 hover:border-green-100 dark:hover:border-green-900 hover:text-green-600 dark:hover:text-green-500 hover:shadow-sm"
                }`}
              >
                {typeof page === 'number' ? page.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US') : page}
              </Link>
            )
          ))}
        </div>

        {/* Next Button */}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`group flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-500 hover:border-green-100 dark:hover:border-green-900 hover:shadow-lg hover:shadow-green-900/5 transition-all duration-300 ${
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
