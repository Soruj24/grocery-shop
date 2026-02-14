import { User, Mail, Phone, MapPin, LogOut, Camera, Settings, ShieldCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  session: any;
}

export default function ProfileHeader({ session }: ProfileHeaderProps) {
  return (
    <div className="relative group">
      {/* Background Decorative Blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl rounded-[48px] -z-10" />
      
      <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[48px] border border-gray-100 dark:border-white/5 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[48px] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-green-500/30 ring-4 ring-white dark:ring-black"
          >
            {session.user?.name?.charAt(0)}
          </motion.div>
          <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-500 hover:text-green-600 shadow-xl border border-gray-100 dark:border-white/10 transition-all hover:scale-110">
            <Camera size={20} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                {session.user?.name}
              </h1>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                Verified
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
              {session.user?.email}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-green-500/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-colors">
                <Phone size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ফোন নম্বর</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{session.user?.phone || "দেওয়া হয়নি"}</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-green-500/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-colors">
                <MapPin size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ডেলিভারি ঠিকানা</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 line-clamp-1">{session.user?.address || "ঠিকানা দেওয়া হয়নি"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col gap-3">
          <button className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-green-600 transition-all border border-transparent hover:border-green-500/20">
            <Settings size={20} />
          </button>
          <button 
            onClick={() => signOut()}
            className="p-4 bg-rose-50 dark:bg-rose-500/10 rounded-2xl text-rose-500 hover:bg-rose-100 transition-all border border-transparent hover:border-rose-500/20"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
