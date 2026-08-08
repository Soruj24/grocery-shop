import * as React from "react";
import { cn } from "./types";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "inline" | "block";
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ variant = "inline", className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        variant === "inline" && [
          "relative rounded-md px-1.5 py-0.5",
          "bg-muted text-foreground",
          "text-[0.875em] font-mono font-medium",
          "border border-border/50",
        ],
        variant === "block" && [
          "block rounded-xl p-4",
          "bg-muted text-foreground",
          "text-sm font-mono",
          "border border-border",
          "overflow-x-auto ds-custom-scrollbar",
        ],
        className,
      )}
      {...props}
    />
  ),
);
Code.displayName = "Code";

export interface KbdProps extends React.HTMLAttributes<HTMLDivElement> {
  keys: string[];
}

export const Kbd = React.forwardRef<HTMLDivElement, KbdProps>(
  ({ keys, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1",
        className,
      )}
      {...props}
    >
      {keys.map((key) => (
        <kbd
          key={key}
          className={cn(
            "inline-flex items-center justify-center",
            "min-w-[1.5rem] h-6 px-1.5",
            "rounded-md bg-muted border border-border",
            "text-[10px] font-mono font-semibold text-muted-foreground",
            "shadow-[0_1px_0_1px_var(--border)]",
          )}
        >
          {key}
        </kbd>
      ))}
    </div>
  ),
);
Kbd.displayName = "Kbd";
