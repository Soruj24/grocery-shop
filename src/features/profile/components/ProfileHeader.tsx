"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Camera,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui";

interface ProfileHeaderProps {
  session: Session | null;
}

export default function ProfileHeader({ session }: ProfileHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="relative group">
      {/* Background Decorative Blur */}
      <div className="absolute inset-0 bg-primary-subtle blur-3xl rounded-2xl -z-10" />

      <div className="bg-card/80 backdrop-blur-2xl p-8 md:p-12 rounded-2xl border border-border shadow-xl flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 md:w-40 md:h-40 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-5xl font-black shadow-primary ring-4 ring-background"
          >
            {session?.user?.name?.charAt(0)}
          </motion.div>
          <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-card rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary shadow-xl border border-border transition-all hover:scale-110">
            <Camera size={20} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                {session?.user?.name || t('name_missing')}
              </h1>
              <Badge tone="primary" size="sm" className="uppercase tracking-widest">
                {t('verified')}
              </Badge>
            </div>
            <p className="text-muted-foreground font-medium text-lg">
              {session?.user?.email || t('email_missing')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <Phone size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {t('phone_number')}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {(session?.user as { phone?: string })?.phone || t('not_provided')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <MapPin size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {t('delivery_address')}
                </p>
                <p className="text-sm font-bold text-foreground line-clamp-1">
                  {(session?.user as { address?: string })?.address || t('address_missing')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col gap-3">
          <button className="p-4 bg-muted rounded-2xl text-muted-foreground hover:text-primary transition-all border border-transparent hover:border-primary/20">
            <Settings size={20} />
          </button>
          <button
            onClick={() => signOut()}
            className="p-4 bg-danger-subtle rounded-2xl text-danger hover:opacity-90 transition-all border border-transparent hover:border-danger/20"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
