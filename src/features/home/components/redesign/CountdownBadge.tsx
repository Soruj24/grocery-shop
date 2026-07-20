"use client";

import { useCountdown } from "@/features/home/hooks/useCountdown";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-11 min-w-[44px] items-center justify-center rounded-xl bg-foreground px-2 font-black tabular-nums text-background text-lg">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function CountdownBadge({ endAt, compact = false }: { endAt?: string; compact?: boolean }) {
  const { hours, minutes, seconds } = useCountdown(endAt);
  return (
    <div className="flex items-center gap-2">
      <Unit value={hours} label="ঘ" />
      <span className="text-lg font-black text-foreground/30">:</span>
      <Unit value={minutes} label="মি" />
      <span className="text-lg font-black text-foreground/30">:</span>
      <Unit value={seconds} label="সে" />
    </div>
  );
}
