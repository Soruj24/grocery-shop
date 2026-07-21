"use client";

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
      onClick,
      ...props
    },
    ref,
  ) => {
    const rippleRef = React.useRef<HTMLSpanElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (rippleRef.current) {
        const ripple = rippleRef.current;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.remove("ds-ripple-active");
        void ripple.offsetWidth;
        ripple.classList.add("ds-ripple-active");
      }

      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-md font-sans",
          "transition-all duration-200 active:scale-[0.97] whitespace-nowrap",
          "ds-ripple",
          controlHeight[size],
          variantClasses[variant],
          fullWidth && "w-full",
          disabledState(disabled || loading),
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <span
          ref={rippleRef}
          className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 opacity-0 scale-0"
          aria-hidden
          style={{ position: "absolute" }}
        />
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
