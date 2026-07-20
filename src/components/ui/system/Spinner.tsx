import * as React from "react";
import { cn, type Size } from "./types";

export interface SpinnerProps {
  size?: Size;
  className?: string;
  label?: string;
}

const sizeMap: Record<Size, string> = {
  xs: "h-4 w-4 border-2",
  sm: "h-5 w-5 border-2",
  md: "h-7 w-7 border-[3px]",
  lg: "h-10 w-10 border-4",
  xl: "h-14 w-14 border-4",
};

export function Spinner({ size = "md", className, label = "Loading" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "ds-animate-spin inline-block rounded-full border-current border-r-transparent text-primary",
        sizeMap[size],
        className,
      )}
    />
  );
}

export interface LoadingStateProps {
  label?: string;
  size?: Size;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingState({
  label = "Loading",
  size = "lg",
  className,
  fullScreen,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-muted-foreground",
        fullScreen ? "min-h-screen" : "min-h-[240px]",
        className,
      )}
    >
      <Spinner size={size} />
      <span className="text-sm font-semibold tracking-wide">{label}…</span>
    </div>
  );
}
