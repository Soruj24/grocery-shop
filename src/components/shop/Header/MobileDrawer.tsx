"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types/category";
import { Session } from "next-auth";
import { useDrawerOverlay } from "@/hooks/useDrawerOverlay";
import MobileDrawerHeader from "./MobileDrawerHeader";
import MobileSearchForm from "./MobileSearchForm";
import MobileNavLinks from "./MobileNavLinks";
import MobileCategoryGrid from "./MobileCategoryGrid";
import MobileDrawerFooter from "./MobileDrawerFooter";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  totalWishlistItems: number;
  session: Session | null;
}

export default function MobileDrawer({ isOpen, onClose, categories, totalWishlistItems, session }: MobileDrawerProps) {
  useDrawerOverlay(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden" onClick={onClose} aria-hidden="true" />

          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[90%] max-w-[360px] bg-white dark:bg-[#0B1120] z-[201] lg:hidden flex flex-col shadow-2xl overflow-hidden"
            role="dialog" aria-modal="true"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />

            <MobileDrawerHeader onClose={onClose} session={session} />

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 sm:space-y-10 custom-scrollbar relative z-10">
              <MobileSearchForm onClose={onClose} />
              <MobileNavLinks onClose={onClose} totalWishlistItems={totalWishlistItems} />
              <MobileCategoryGrid onClose={onClose} categories={categories} />
            </div>

            {session && <MobileDrawerFooter />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
