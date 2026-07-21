"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProductQuestion } from "@/types/product";

interface QuestionsQAProps {
  questions?: ProductQuestion[];
}

export default function QuestionsQA({ questions }: QuestionsQAProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-bold">No questions yet. Be the first to ask!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-black text-foreground mb-6">Questions & Answers</h3>
      {questions.map((q, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-subtle rounded-xl border border-border overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === `${idx}` ? null : `${idx}`)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground">{q.question}</span>
            </div>
            <motion.div
              animate={{ rotate: expanded === `${idx}` ? 180 : 0 }}
              className="text-muted-foreground"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expanded === `${idx}` && q.answer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-4"
              >
                <div className="flex items-start gap-3 pt-2 border-t border-border">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-success uppercase tracking-wider mb-1">Answer</p>
                    <p className="text-sm font-medium text-foreground">{q.answer}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
