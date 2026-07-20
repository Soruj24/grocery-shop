import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
  return (
    <div className="group relative bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-subtle rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />

      <div className="relative z-10">
        <div className="w-16 h-16 bg-primary-subtle rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-black text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground font-medium leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
