import * as React from "react";
import { Check } from "lucide-react";
import { cn, disabledState } from "./types";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group inline-flex items-start gap-3 cursor-pointer select-none",
          disabledState(disabled),
          className,
        )}
      >
        <span className="relative mt-0.5 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer sr-only"
            disabled={disabled}
            {...props}
          />
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-xs border border-input",
              "bg-card transition-all duration-200",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-focus-visible:shadow-focus peer-focus-visible:border-primary",
              "group-hover:border-primary",
            )}
            aria-hidden
          >
            <Check
              className="h-3.5 w-3.5 text-primary-foreground scale-0 transition-transform duration-200 peer-checked:scale-100"
            />
          </span>
        </span>
        {(label || description) && (
          <span className="space-y-0.5">
            {label && (
              <span className="block text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group inline-flex items-start gap-3 cursor-pointer select-none",
          disabledState(disabled),
          className,
        )}
      >
        <span className="relative mt-0.5 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className="peer sr-only"
            disabled={disabled}
            {...props}
          />
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border border-input bg-card",
              "transition-all duration-200 peer-focus-visible:shadow-focus peer-focus-visible:border-primary group-hover:border-primary",
            )}
            aria-hidden
          >
            <span
              className="h-2.5 w-2.5 rounded-full bg-primary scale-0 transition-transform duration-200 peer-checked:scale-100"
            />
          </span>
        </span>
        {(label || description) && (
          <span className="space-y-0.5">
            {label && (
              <span className="block text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);
Radio.displayName = "Radio";
