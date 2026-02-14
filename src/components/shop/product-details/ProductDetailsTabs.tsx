import { Info } from "lucide-react";

interface ProductDetailsTabsProps {
  productName: string;
}

export default function ProductDetailsTabs({ productName }: ProductDetailsTabsProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[40px] border border-gray-100 dark:border-gray-800 p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-600 dark:bg-green-700 p-2 rounded-xl text-white">
          <Info className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 dark:text-white">
          পণ্য সম্পর্কে বিস্তারিত
        </h2>
      </div>
      <div className="prose prose-green dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 leading-loose text-lg font-medium italic">
          &ldquo;আমাদের এই {productName} সরাসরি সেরা উৎস থেকে সংগৃহীত। আমরা
          প্রতিটি পণ্যের গুণমান কঠোরভাবে যাচাই করি যাতে আপনি পান সেরা
          অভিজ্ঞতা। এটি একটি স্বাস্থ্যসম্মত এবং পুষ্টিকর পছন্দ।&rdquo;
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700">
            <h4 className="font-black text-gray-800 dark:text-white mb-4">
              বৈশিষ্ট্যসমূহ:
            </h4>
            <ul className="space-y-3">
              {[
                "১০০% তাজা ও প্রাকৃতিক",
                "কোনো ভেজাল বা প্রিজারভেটিভ নেই",
                "সঠিক ওজন ও পরিমাপ",
                "স্বাস্থ্যসম্মত উপায়ে প্যাকেটজাত",
              ].map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700">
            <h4 className="font-black text-gray-800 dark:text-white mb-4">
              ডেলিভারি তথ্য:
            </h4>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed">
              ঢাকা শহরের ভেতরে ২৪ ঘন্টার মধ্যে এবং সারা বাংলাদেশে ২-৩ দিনের
              মধ্যে ডেলিভারি দেওয়া হয়। ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
