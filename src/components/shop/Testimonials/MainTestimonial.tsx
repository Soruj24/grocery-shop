import { Star } from "lucide-react";

interface MainTestimonialProps {
  quote: string;
  author: string;
  initial: string;
}

export default function MainTestimonial({ quote, author, initial }: MainTestimonialProps) {
  return (
    <div className="md:col-span-2 md:row-span-2 bg-white dark:bg-gray-900 p-10 rounded-[50px] border border-gray-100 dark:border-gray-800 flex flex-col justify-between shadow-xl shadow-gray-200/50 dark:shadow-none">
      <div className="space-y-6">
        <div className="flex gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-current" />
          ))}
        </div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-relaxed italic">
          "{quote}"
        </p>
      </div>
      <div className="flex items-center gap-4 pt-8">
        <div className="w-16 h-16 rounded-3xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl font-black text-green-600 dark:text-green-400">
          {initial}
        </div>
        <div>
          <h4 className="text-xl font-black text-gray-800 dark:text-gray-100">
            {author}
          </h4>
          <p className="text-gray-500 font-bold">ভেরিফাইড কাস্টমার</p>
        </div>
      </div>
    </div>
  );
}
