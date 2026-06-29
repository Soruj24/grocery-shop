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
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      text: 'text-green-400'
    },
    blue: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400'
    },
    orange: {
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/30',
      text: 'text-orange-400'
    }
  };

  const style = styles[color];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`w-20 h-20 ${style.bg} border ${style.border} rounded-[30px] flex items-center justify-center ${style.text} mb-2`}>
        <Icon className="w-10 h-10" />
      </div>
      <h4 className="text-white text-xl font-black">{title}</h4>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}
