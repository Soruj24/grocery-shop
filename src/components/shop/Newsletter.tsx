"use client";

import { motion } from "framer-motion";
import { Send, Mail, Bell } from "lucide-react";

import { useLanguage } from "@/components/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[60px] py-20 px-8 md:px-20 text-center bg-gray-900 dark:bg-[#0B1120]"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-800/20" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-5 pointer-events-none" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" 
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-4"
              >
                <Bell size={18} className="text-green-400 animate-bounce" />
                <span className="text-white font-black text-xs uppercase tracking-[0.3em]">{t('newsletter_badge')}</span>
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight"
              >
                {t('newsletter_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 text-shadow-glow">{t('newsletter_title_2')}</span> {t('newsletter_title_3')}
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
              >
                {t('newsletter_desc')}
              </motion.p>
            </div>

            <motion.form 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={(e) => e.preventDefault()}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Mail className="text-gray-500 group-focus-within:text-green-500 transition-colors" size={24} />
                </div>
                <input
                  type="email"
                  placeholder={t('newsletter_placeholder')}
                  className="w-full bg-white/5 backdrop-blur-2xl border-2 border-white/10 focus:border-green-500/50 rounded-[30px] py-6 pl-16 pr-44 text-white placeholder:text-gray-500 outline-none transition-all text-lg font-medium shadow-2xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 rounded-[24px] font-black text-sm flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-green-500/20 group/btn"
                >
                  {t('newsletter_button')}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.form>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-xs font-bold uppercase tracking-widest"
            >
              {t('newsletter_spam_note')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
