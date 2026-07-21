"use client";

import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { cn, type Tone } from "./types";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: Tone;
  title?: React.ReactNode;
  icon?: boolean;
  onClose?: () => void;
}

const config: Record<
  Tone,
  { wrap: string; icon: React.ElementType; iconColor: string }
> = {
  primary: { wrap: "bg-primary-subtle text-primary-subtle-foreground border-primary-border", icon: Info, iconColor: "text-primary" },
  neutral: { wrap: "bg-muted text-foreground border-border", icon: Info, iconColor: "text-muted-foreground" },
  success: { wrap: "bg-success-subtle text-success-subtle-foreground border-success/30", icon: CheckCircle2, iconColor: "text-success" },
  warning: { wrap: "bg-warning-subtle text-warning-subtle-foreground border-warning/30", icon: AlertTriangle, iconColor: "text-warning" },
  danger: { wrap: "bg-danger-subtle text-danger-subtle-foreground border-danger/30", icon: XCircle, iconColor: "text-danger" },
  info: { wrap: "bg-info-subtle text-info-subtle-foreground border-info/30", icon: AlertCircle, iconColor: "text-info" },
  accent: { wrap: "bg-accent-subtle text-accent-subtle-foreground border-accent/30", icon: Info, iconColor: "text-accent" },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ tone = "info", title, icon = true, onClose, className, children, ...props }, ref) => {
    const { wrap, icon: Icon, iconColor } = config[tone];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex items-start gap-3 rounded-lg border p-4 ds-animate-slide-down",
          wrap,
          className,
        )}
        {...props}
      >
        {icon && <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconColor)} aria-hidden />}
        <div className="flex-1 min-w-0">
          {title && <p className="font-bold text-sm">{title}</p>}
          {children && <div className="text-sm opacity-90 mt-0.5">{children}</div>}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className="rounded-xs p-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";
