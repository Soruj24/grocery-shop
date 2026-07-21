"use client";

import { motion } from "framer-motion";
import { Download, FileText, Image, File } from "lucide-react";

const mockDownloads = [
  { id: "1", name: "Invoice_ORD-8A3F2C.pdf", type: "pdf", size: "245 KB", date: "2026-07-15" },
  { id: "2", name: "Warranty_Card.pdf", type: "pdf", size: "120 KB", date: "2026-07-10" },
  { id: "3", name: "Product_Catalog.pdf", type: "pdf", size: "2.1 MB", date: "2026-07-05" },
];

const typeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  image: Image,
  default: File,
};

export default function DownloadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Downloads</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your downloadable files</p>
      </div>

      {mockDownloads.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <Download className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No downloads available</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your purchased digital items will appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {mockDownloads.map((file, i) => {
            const Icon = typeIcons[file.type] || typeIcons.default;
            return (
              <motion.div key={file.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                    <Icon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-[10px] text-gray-400">{file.size} • {new Date(file.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-600 transition-colors">
                  <Download className="h-3 w-3" /> Download
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
