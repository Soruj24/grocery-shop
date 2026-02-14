import { Check, Truck, Package, Clock, ShieldCheck } from "lucide-react";

interface OrderTrackingTimelineProps {
  status: string;
}

export default function OrderTrackingTimeline({ status }: OrderTrackingTimelineProps) {
  const steps = [
    { id: 'pending', label: 'অর্ডার প্লেসড', icon: Clock },
    { id: 'processing', label: 'প্রসেসিং', icon: Package },
    { id: 'shipped', label: 'ডেলিভারি পথে', icon: Truck },
    { id: 'delivered', label: 'ডেলিভারি হয়েছে', icon: ShieldCheck },
  ];

  const getCurrentStepIndex = () => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="py-8 px-4">
      <div className="relative flex justify-between items-center">
        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 dark:bg-white/5 -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 transition-all duration-500 -z-10"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3 bg-white dark:bg-[#0B1120] px-4">
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? "bg-green-500 text-white" 
                    : isActive 
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/30 scale-110" 
                      : "bg-gray-100 dark:bg-white/5 text-gray-400"
                }`}
              >
                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${
                isActive ? "text-green-600" : "text-gray-400"
              }`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
