"use client";

import { useNotifications } from "@/contexts/NotificationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, X, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success": return { icon: CheckCircle2, color: "text-success", bg: "bg-success-subtle" };
      case "error": return { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" };
      default: return { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" };
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-muted hover:bg-card text-muted-foreground rounded-xl transition-all border border-transparent hover:border-border group"
      >
        <Bell size={20} className="group-hover:scale-110 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-background">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 md:w-96 bg-card rounded-2xl shadow-2xl border border-border z-[100] overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="font-black text-lg text-foreground">{t('notifications')}</h3>
                <span className="px-3 py-1 bg-success-subtle text-success text-xs font-black rounded-full">
                  {unreadCount} {t('new_count')}
                </span>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto text-muted-foreground">
                      <Bell size={32} />
                    </div>
                    <p className="text-muted-foreground font-bold">{t('no_notifications')}</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const styles = getTypeStyles(n.type);
                    return (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-4 rounded-2xl transition-all cursor-pointer border ${
                          n.read 
                            ? "bg-transparent border-transparent grayscale opacity-60" 
                            : "bg-muted border-border"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center shrink-0 ${styles.color}`}>
                            <styles.icon size={20} />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="font-black text-sm text-foreground leading-tight">
                              {n.title}
                            </h4>
                            <p className="text-xs text-muted-foreground font-bold leading-relaxed">
                              {n.message}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <Clock size={10} className="text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground font-bold">
                                {new Date(n.timestamp).toLocaleTimeString('bn-BD')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {notifications.length > 0 && (
              <div className="p-4 bg-muted text-center">
                <button className="text-xs font-black text-primary hover:underline">
                    {t('see_all_notifications')}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
