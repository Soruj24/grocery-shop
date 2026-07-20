import * as React from "react";
import { cn, controlHeight, disabledState, type Size, type Variant } from "./types";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-primary",
  secondary:
    "bg-muted text-foreground hover:bg-border active:bg-border-strong",
  outline:
    "border border-border-strong bg-transparent text-foreground hover:bg-muted active:bg-subtle",
  ghost: "bg-transparent text-foreground hover:bg-muted active:bg-subtle",
  danger:
    "bg-danger text-danger-foreground hover:opacity-90 active:opacity-100 shadow-sm",
  success:
    "bg-success text-success-foreground hover:opacity-90 active:opacity-100 shadow-sm",
  warning:
    "bg-warning text-warning-foreground hover:opacity-90 active:opacity-100 shadow-sm",
  info: "bg-info text-info-foreground hover:opacity-90 active:opacity-100 shadow-sm",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth,
      loading,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-md font-sans",
          "transition-all duration-200 active:scale-[0.97] whitespace-nowrap",
          controlHeight[size],
          variantClasses[variant],
          fullWidth && "w-full",
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
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);
Button.displayName = "Button";
