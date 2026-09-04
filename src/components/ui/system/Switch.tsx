import * as React from "react";
import { cn, disabledState, focusRing } from "./types";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md";
}

const trackSize = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
} as const;

const thumbSize = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
} as const;

const thumbTranslate = {
  sm: "translate-x-4",
  md: "translate-x-5",
} as const;

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onCheckedChange,
      label,
      description,
      size = "md",
      className,
      disabled,
      onClick,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onCheckedChange?.(!checked);
      onClick?.(e);
    };

    return (
      <span
        className={cn(
          "inline-flex items-start gap-3 select-none",
          disabledState(disabled),
          className,
        )}
      >
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "relative shrink-0 rounded-full transition-colors duration-200 mt-0.5",
            trackSize[size],
            checked ? "bg-primary" : "bg-muted border border-border",
            focusRing,
          )}
          {...props}
        >
          <span
            aria-hidden
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-0.5 flex items-center justify-center",
              "rounded-full bg-background shadow-sm transition-transform duration-200",
              thumbSize[size],
              checked && thumbTranslate[size],
            )}
          />
        </button>
        {(label || description) && (
          <span className="space-y-0.5">
            {label && (
              <label
                htmlFor={id}
                className="block text-sm font-medium text-foreground cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <span className="block text-xs text-muted-foreground leading-relaxed">
                {description}
              </span>
            )}
          </span>
        )}
      </span>
    );
  },
);
Switch.displayName = "Switch";
