"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AISummaryProps {
  summary?: string;
}

export default function AISummary({
  summary,
}: AISummaryProps) {
  const { t } = useLanguage();

  if (!summary) {
    return (
      <div className="text-center py-12">
        <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground/60 font-medium">
          AI summary not available for this product
          yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-gradient-to-br from-primary to-purple-500 p-2 rounded-xl text-white">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          AI Summary
        </h3>
      </div>
      <div className="bg-gradient-to-br from-primary/[0.04] via-purple-500/[0.04] to-blue-500/[0.04] p-6 rounded-xl border border-primary/[0.08]">
        <p className="text-foreground font-medium leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
}
