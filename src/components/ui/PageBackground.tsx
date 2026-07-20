import React from "react";

interface PageBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
  children?: React.ReactNode;
}

export default function PageBackground({
  color1 = "bg-primary/10 dark:bg-primary/10",
  color2 = "bg-warning/10 dark:bg-warning/10",
  color3 = "bg-danger/10 dark:bg-danger/10",
  children,
}: PageBackgroundProps) {
  return (
    <div className="relative isolate overflow-hidden">
      <div
        className={`absolute top-0 -left-4 w-72 h-72 ${color1} rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-40 animate-blob pointer-events-none`}
      />
      <div
        className={`absolute top-0 -right-4 w-72 h-72 ${color2} rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-40 animate-blob animation-delay-2000 pointer-events-none`}
      />
      <div
        className={`absolute top-[20%] left-[20%] w-72 h-72 ${color3} rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
