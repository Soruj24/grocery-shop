"use client";

import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const TESTIMONIALS = [
    {
      id: 1,
      content: t('testimonial_1_content'),
      author: t('testimonial_1_author'),
      role: t('testimonial_1_role'),
      rating: 5,
      size: "large",
      color: "bg-green-500"
    },
    {
      id: 2,
      content: t('testimonial_2_content'),
      author: t('testimonial_2_author'),
      role: t('testimonial_2_role'),
      rating: 5,
      size: "small",
      color: "bg-orange-500"
    },
    {
      id: 3,
      content: t('testimonial_3_content'),
      author: t('testimonial_3_author'),
      role: t('testimonial_3_role'),
      rating: 4,
      size: "small",
      color: "bg-blue-500"
    },
    {
      id: 4,
      content: t('testimonial_4_content'),
      author: t('testimonial_4_author'),
      role: t('testimonial_4_role'),
      rating: 5,
      size: "medium",
      color: "bg-purple-500"
    },
    {
      id: 5,
      content: t('testimonial_5_content'),
      author: t('testimonial_5_author'),
      role: t('testimonial_5_role'),
      rating: 5,
      size: "small",
      color: "bg-emerald-500"
    }
  ];

  return (
    <section className="py-8 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-info/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-danger-subtle border border-danger/30 text-danger rounded-full text-xs font-black uppercase tracking-[0.2em]"
            >
              <Quote size={14} className="animate-pulse" />
              {t('testimonials_badge')}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-foreground tracking-tight"
            >
              {t('testimonials_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-danger to-warning">{t('testimonials_title_2')}</span>
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between group ${
                testimonial.size === "large" ? "md:col-span-2 md:row-span-2" :
                testimonial.size === "medium" ? "md:row-span-2" : ""
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < testimonial.rating ? "text-warning fill-warning" : "text-border-strong"}`}
                      />
                    ))}
                  </div>
                  <Quote size={40} className="text-border absolute top-8 right-8" />
                </div>
                <p className={`text-muted-foreground font-medium leading-relaxed ${testimonial.size === "large" ? "text-xl" : "text-base"}`}>
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className={`w-12 h-12 rounded-2xl ${testimonial.color} flex items-center justify-center text-white shadow-sm`}>
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-black text-foreground">{testimonial.author}</h4>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
