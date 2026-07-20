"use client";

import { motion } from "framer-motion";
import { Send, Mail, Bell } from "lucide-react";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-foreground"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-subtle/20" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-5 pointer-events-none" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" 
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-20">
            <div className="space-y-10 text-center lg:text-left">
              <div className="space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-4"
                >
                  <Bell size={18} className="text-primary animate-bounce" />
                  <span className="text-white font-black text-xs uppercase tracking-[0.3em]">{t('newsletter_badge')}</span>
                </motion.div>

                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
                >
                  {t('newsletter_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">{t('newsletter_title_2')}</span> {t('newsletter_title_3')}
                </motion.h2>

                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
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
                className="relative max-w-xl mx-auto lg:mx-0"
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Mail className="text-muted-foreground group-focus-within:text-primary transition-colors" size={24} />
                  </div>
                  <input
                    type="email"
                    placeholder={t('newsletter_placeholder')}
                    className="w-full bg-white/5 backdrop-blur-2xl border-2 border-white/10 focus:border-primary/50 rounded-full py-6 pl-16 pr-44 text-white placeholder:text-muted-foreground outline-none transition-all text-lg font-medium shadow-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 md:px-8 rounded-xl font-black text-sm flex items-center gap-3 transition-all active:scale-95 shadow-primary group/btn"
                  >
                    <span className="hidden md:inline">{t('newsletter_button')}</span>
                    <span className="md:hidden">Join</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.form>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative hidden lg:block h-[500px] w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl shadow-black/50 border-4 border-white/5 group">
                 <Image 
                  src={getProductFallbackImage("newsletter")}
                  alt="Newsletter"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Floating Badge */}
               <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-3xl shadow-lg z-20 border border-border animate-bounce-slow">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary-subtle rounded-full flex items-center justify-center text-primary text-2xl">
                     🎁
                   </div>
                   <div>
                     <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Weekly</p>
                     <p className="text-xl font-black text-foreground">Free Gifts</p>
                   </div>
                 </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}    
