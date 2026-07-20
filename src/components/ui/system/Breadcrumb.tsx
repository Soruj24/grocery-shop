import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "./types";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap gap-1.5 text-sm", className)}>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
            {it.href && !last ? (
              <Link
                href={it.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {it.label}
              </Link>
            ) : (
              <span
                className={cn("font-semibold", last ? "text-foreground" : "text-muted-foreground")}
                aria-current={last ? "page" : undefined}
              >
                {it.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
Breadcrumb.displayName = "Breadcrumb";
