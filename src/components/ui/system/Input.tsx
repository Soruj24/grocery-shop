import * as React from "react";
import { cn, disabledState, focusRing, invalidShadow, type Size } from "./types";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: Size;
  invalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const inputHeight: Record<Size, string> = {
  xs: "h-8 text-xs",
  sm: "h-9 text-sm",
  md: "h-11 text-sm",
  lg: "h-12 text-[15px]",
  xl: "h-14 text-base",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { size = "md", invalid, leftIcon, rightIcon, className, wrapperClassName, disabled, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "group flex items-center w-full rounded-lg border bg-card transition-all duration-200",
          "border-input hover:border-border-strong focus-within:border-foreground/20 focus-within:shadow-focus",
          invalid && cn("border-danger focus-within:border-danger", invalidShadow),
          disabledState(disabled),
          inputHeight[size],
          wrapperClassName,
        )}
      >
        {leftIcon && (
          <span className="pl-3.5 text-muted-foreground group-focus-within:text-foreground transition-colors">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent px-3.5 outline-none placeholder:text-muted-foreground/60 text-foreground",
            "disabled:cursor-not-allowed",
            leftIcon && "pl-2",
            rightIcon && "pr-2",
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="pr-3.5 text-muted-foreground group-focus-within:text-foreground transition-colors">
            {rightIcon}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid, className, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border bg-card px-3.5 py-3 text-sm text-foreground",
          "outline-none transition-all duration-200 resize-y min-h-[100px]",
          "border-input hover:border-border-strong focus:border-foreground/20 focus:shadow-focus",
          "placeholder:text-muted-foreground/60",
          focusRing,
          invalid && cn("border-danger focus:border-danger", invalidShadow),
          disabledState(disabled),
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
