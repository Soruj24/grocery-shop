import * as React from "react";
import { cn, controlHeight, disabledState, type Size, type Variant } from "./types";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: Size;
  loading?: boolean;
  "aria-label": string;
}

const iconVariant: Record<string, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "bg-muted text-foreground hover:bg-border",
  outline: "border border-border-strong text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  danger: "bg-danger text-danger-foreground hover:opacity-90",
};

const square: Record<Size, string> = {
  xs: "h-8 w-8",
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-12 w-12",
  xl: "h-14 w-14",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant = "ghost", size = "md", loading, className, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-all duration-200 active:scale-95",
          square[size],
          iconVariant[variant],
          disabledState(disabled || loading),
          className,
        )}
        {...props}
      >
        {loading ? (
          <span
            className="ds-animate-spin h-4 w-4 rounded-full border-2 border-current border-r-transparent"
            aria-hidden
          />
        ) : (
          children
        )}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";
