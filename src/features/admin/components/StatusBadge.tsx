import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";

interface StatusBadgeProps {
  status: string | boolean;
  label: string;
  icon?: LucideIcon;
  type?: "order" | "product" | "category";
}

const statusStyles: Record<string, string> = {
  true: "bg-success-subtle text-success border-success/20",
  false: "bg-danger-subtle text-danger border-danger/20",
  pending: "bg-warning-subtle text-warning border-warning/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  shipped: "bg-accent/10 text-accent border-accent/20",
  delivered: "bg-success-subtle text-success border-success/20",
  cancelled: "bg-danger-subtle text-danger border-danger/20",
};

const dotStyles: Record<string, string> = {
  true: "bg-success",
  delivered: "bg-success",
  false: "bg-danger",
  cancelled: "bg-danger",
};

export default function StatusBadge({
  status,
  label,
  icon: Icon,
}: StatusBadgeProps) {
  const statusKey = String(status);
  const styles = statusStyles[statusKey] || "bg-muted text-muted-foreground border-border";
  const dotStyle = dotStyles[statusKey] || "bg-current";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
        "text-[11px] font-semibold uppercase tracking-wider border",
        styles,
      )}
    >
      {Icon ? (
        <Icon className="w-3.5 h-3.5" />
      ) : (
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotStyle)} />
      )}
      {label}
    </span>
  );
}
