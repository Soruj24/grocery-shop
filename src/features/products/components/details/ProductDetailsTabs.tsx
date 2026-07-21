"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ClipboardList, MessageCircle, BarChart3, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";
import Specifications from "./Specifications";
import QuestionsQA from "./QuestionsQA";
import RatingsBreakdown from "./RatingsBreakdown";
import AISummary from "./AISummary";

interface ProductDetailsTabsProps {
  product: Product;
}

type Tab = "description" | "specifications" | "questions" | "ratings" | "ai";

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "description", label: "Description", icon: Info },
    { key: "specifications", label: "Specifications", icon: ClipboardList },
    { key: "questions", label: "Q&A", icon: MessageCircle },
    { key: "ratings", label: "Ratings", icon: BarChart3 },
    { key: "ai", label: "AI Summary", icon: Sparkles },
  ];

  const productName = product.name;

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.key
                ? 'border-primary text-primary bg-primary-subtle/30'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8 md:p-12">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="prose prose-green dark:prose-invert max-w-none"
            >
              <p className="text-muted-foreground leading-loose text-lg font-medium italic">
                &ldquo;{t('product_details_desc_prefix')} {productName} {t('product_details_desc_suffix')}&rdquo;
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-subtle p-6 rounded-2xl border border-border">
                  <h4 className="font-black text-foreground mb-4">{t('features_title')}</h4>
                  <ul className="space-y-3">
                    {[
                      t('feature_1'),
                      t('feature_2'),
                      t('feature_3'),
                      t('feature_4'),
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-subtle p-6 rounded-2xl border border-border">
                  <h4 className="font-black text-foreground mb-4">{t('delivery_info_title')}</h4>
                  <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                    {t('delivery_info_desc')}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "specifications" && (
            <motion.div
              key="specifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Specifications specifications={product.specifications} />
            </motion.div>
          )}

          {activeTab === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <QuestionsQA questions={product.questions} />
            </motion.div>
          )}

          {activeTab === "ratings" && (
            <motion.div
              key="ratings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <RatingsBreakdown rating={product.rating || 0} reviews={product.reviews || 0} />
            </motion.div>
          )}

          {activeTab === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AISummary summary={product.aiSummary} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
