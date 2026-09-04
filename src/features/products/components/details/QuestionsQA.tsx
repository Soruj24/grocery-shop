"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronDown,
  Check,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProductQuestion } from "@/types/product";

interface QuestionsQAProps {
  questions?: ProductQuestion[];
}

export default function QuestionsQA({
  questions,
}: QuestionsQAProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<
    string | null
  >(null);

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground/60 font-medium">
          No questions yet. Be the first to ask!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground mb-5">
        Questions & Answers
      </h3>
      {questions.map((q, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: idx * 0.04,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="bg-subtle rounded-xl border border-border overflow-hidden"
        >
          <button
            onClick={() =>
              setExpanded(
                expanded === `${idx}`
                  ? null
                  : `${idx}`
              )
            }
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/[0.06] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {q.question}
              </span>
            </div>
            <motion.div
              animate={{
                rotate:
                  expanded === `${idx}` ? 180 : 0,
              }}
              className="text-muted-foreground/50"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expanded === `${idx}` && q.answer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 pb-4"
              >
                <div className="flex items-start gap-3 pt-3 border-t border-border">
                  <div className="w-8 h-8 bg-success-subtle rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-success uppercase tracking-wider mb-1">
                      Answer
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {q.answer}
                    </p>
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
