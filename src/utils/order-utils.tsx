import { Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import type { TranslationKey } from "@/constants/translations";

export function getStatusColor(status: string): string {
  switch (status) {
    case "pending": return "bg-warning-subtle text-warning-subtle-foreground border-warning/30";
    case "confirmed": return "bg-info-subtle text-info-subtle-foreground border-info/30";
    case "delivered": return "bg-success-subtle text-success-subtle-foreground border-success/30";
    case "cancelled": return "bg-danger-subtle text-danger-subtle-foreground border-danger/30";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

export function getStatusLabel(status: string, t: (key: TranslationKey) => string): string {
  switch (status) {
    case "pending": return t("status_pending");
    case "confirmed": return t("status_confirmed");
    case "delivered": return t("status_delivered");
    case "cancelled": return t("status_cancelled");
    default: return status;
  }
}

export function getStatusIcon(status: string): ReactNode {
  switch (status) {
    case "pending": return <Clock className="w-4 h-4" />;
    case "confirmed": return <CheckCircle2 className="w-4 h-4" />;
    case "delivered": return <CheckCircle2 className="w-4 h-4" />;
    case "cancelled": return <XCircle className="w-4 h-4" />;
    default: return <Package className="w-4 h-4" />;
  }
}
