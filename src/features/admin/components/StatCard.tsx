import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";

interface StatCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  shadow?: string;
  label: string;
}

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: "bg-primary/10", icon: "text-primary" },
  green: { bg: "bg-success-subtle", icon: "text-success" },
  amber: { bg: "bg-warning-subtle", icon: "text-warning" },
  red: { bg: "bg-danger-subtle", icon: "text-danger" },
  purple: { bg: "bg-accent/10", icon: "text-accent" },
  neutral: { bg: "bg-muted", icon: "text-muted-foreground" },
};

export default function StatCard({
  name,
  value,
  icon: Icon,
  color = "blue",
  label,
}: StatCardProps) {
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className={cn(
      "group relative bg-card p-6 rounded-xl border border-border",
      "hover:shadow-md transition-all duration-300 overflow-hidden",
    )}>
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-muted rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col gap-4">
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center",
          colors.bg,
        )}>
          <Icon className={cn("w-5 h-5", colors.icon)} />
        </div>

        <div className="space-y-0.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {name}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-foreground">
              {value}
            </p>
            <span className="text-[11px] font-medium text-muted-foreground uppercase">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
