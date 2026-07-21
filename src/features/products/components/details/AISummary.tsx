"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AISummaryProps {
  summary?: string;
}

export default function AISummary({ summary }: AISummaryProps) {
  const { t } = useLanguage();

  if (!summary) {
    return (
      <div className="text-center py-12">
        <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-bold">AI summary not available for this product yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-primary to-purple-500 p-2 rounded-xl text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-black text-foreground">AI Summary</h3>
      </div>
      <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 p-6 rounded-2xl border border-primary/20">
        <p className="text-foreground font-medium leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
