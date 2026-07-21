"use client";

import { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function AdminPageHeader({ title, description, actions, breadcrumbs }: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300 dark:text-gray-600">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">{crumb.label}</a>
              ) : (
                <span className="text-xs font-medium text-gray-900 dark:text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
