import Link from "next/link";
import { Layers } from "lucide-react";

interface CategoryMapProps {
  categories: any[];
}

export default function CategoryMap({ categories }: CategoryMapProps) {
  return (
    <section className="relative bg-white dark:bg-gray-900 rounded-[60px] p-12 md:p-20 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
            ক্যাটাগরি ম্যাপ
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold max-w-2xl mx-auto">
            এক নজরে আমাদের সব কালেকশন দেখে নিন এবং সরাসরি আপনার পছন্দের সেকশনে চলে
            যান।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {categories.map((cat: any) => (
            <div key={cat._id} className="space-y-6 group/item">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-600/20 group-hover/item:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <Link
                  href={`/category/${cat._id}`}
                  className="text-xl font-black text-gray-800 dark:text-gray-100 hover:text-green-600 transition-colors"
                >
                  {cat.name}
                </Link>
              </div>

              <div className="space-y-3 pl-16 border-l-2 border-gray-50 dark:border-gray-800">
                {cat.subCategories?.map((sub: any) => (
                  <Link
                    key={sub._id}
                    href={`/category/${sub._id}`}
                    className="block text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-all hover:translate-x-2"
                  >
                    • {sub.name}
                  </Link>
                ))}
                <Link
                  href={`/category/${cat._id}`}
                  className="block text-xs font-black text-green-600 dark:text-green-500 uppercase tracking-widest pt-2 hover:opacity-70"
                >
                  সবগুলো দেখুন →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
