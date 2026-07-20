import * as React from "react";
import { cn } from "./types";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  /** Shimmer sweep instead of plain pulse. */
  shimmer?: boolean;
}

export function Skeleton({
  width,
  height,
  circle,
  shimmer = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden bg-muted",
        shimmer ? "ds-custom-scrollbar" : "animate-pulse",
        circle ? "rounded-full" : "rounded-md",
        className,
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    >
      {shimmer && (
        <span
          className="ds-animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10"
          aria-hidden
        />
      )}
    </div>
  );
}
Skeleton.displayName = "Skeleton";
