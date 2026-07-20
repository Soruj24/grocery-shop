import * as React from "react";
import { cn, disabledState, type Size } from "./types";

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
  lg: "h-12 text-base",
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
          "group flex items-center w-full rounded-md border bg-card transition-all duration-200",
          "border-input focus-within:border-primary focus-within:shadow-focus",
          invalid && "border-danger focus-within:border-danger focus-within:shadow-[0_0_0_4px_rgb(220_38_38_/0.18)]",
          disabledState(disabled),
          inputHeight[size],
          wrapperClassName,
        )}
      >
        {leftIcon && (
          <span className="pl-3.5 text-muted-foreground group-focus-within:text-primary">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent px-3.5 outline-none placeholder:text-muted-foreground text-foreground",
            "disabled:cursor-not-allowed",
            leftIcon && "pl-2",
            rightIcon && "pr-2",
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="pr-3.5 text-muted-foreground group-focus-within:text-primary">
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
          "w-full rounded-md border bg-card px-3.5 py-2.5 text-sm text-foreground",
          "outline-none transition-all duration-200 resize-y min-h-[88px]",
          "border-input focus:border-primary focus:shadow-focus",
          "placeholder:text-muted-foreground",
          invalid && "border-danger focus:border-danger focus:shadow-[0_0_0_4px_rgb(220_38_38_/0.18)]",
          disabledState(disabled),
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
