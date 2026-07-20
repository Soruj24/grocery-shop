import { LucideIcon } from "lucide-react";

interface TrustItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: 'green' | 'blue' | 'orange';
}

export default function TrustItem({ icon: Icon, title, desc, color }: TrustItemProps) {
  const styles = {
    green: {
      bg: 'bg-primary/20',
      border: 'border-primary/30',
      text: 'text-primary'
    },
    blue: {
      bg: 'bg-info/20',
      border: 'border-info/30',
      text: 'text-info'
    },
    orange: {
      bg: 'bg-warning/20',
      border: 'border-warning/30',
      text: 'text-warning'
    }
  };

  const style = styles[color];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`w-20 h-20 ${style.bg} border ${style.border} rounded-2xl flex items-center justify-center ${style.text} mb-2`}>
        <Icon className="w-10 h-10" />
      </div>
      <h4 className="text-foreground text-xl font-black">{title}</h4>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}
