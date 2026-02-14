"use client";

import Link from "next/link";

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
      <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all flex items-center gap-3 font-bold group">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-green-500 transition-colors" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
