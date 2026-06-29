"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LinkItem {
  name: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: LinkItem[];
}

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div className="space-y-8">
      <motion.h4 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]"
      >
        {title}
      </motion.h4>
      <ul className="space-y-4">
        {links.map((link, idx) => (
          <motion.li 
            key={link.href}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all flex items-center gap-3 font-bold group">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-green-500 group-hover:scale-150 transition-all duration-300" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
