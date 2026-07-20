import * as React from "react";
import { cn } from "./types";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const iconWrap: Record<string, string> = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-20 w-20",
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = "md",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center px-6 py-16 rounded-xl border border-dashed border-border bg-subtle",
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground mb-5",
            iconWrap[size],
          )}
          aria-hidden
        >
          {icon}
        </div>
      )}
      <h3 className="text-h4 font-extrabold tracking-tight">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-body-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
EmptyState.displayName = "EmptyState";
