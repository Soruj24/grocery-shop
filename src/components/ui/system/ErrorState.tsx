import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "./types";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  retryLabel = "Try again",
  icon,
  className,
  compact,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center text-center px-6",
        compact ? "py-10" : "py-16",
        "rounded-xl border border-danger/30 bg-danger-subtle",
        className,
      )}
    >
      <div
        className="flex items-center justify-center h-16 w-16 rounded-full bg-danger/10 text-danger mb-5"
        aria-hidden
      >
        {icon ?? <AlertTriangle className="h-8 w-8" />}
      </div>
      <h3 className="text-h4 font-extrabold tracking-tight text-danger-subtle-foreground">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-body-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <div className="mt-6">
          <Button variant="danger" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
ErrorState.displayName = "ErrorState";
