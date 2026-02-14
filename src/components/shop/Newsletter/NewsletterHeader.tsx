import { Mail } from "lucide-react";

export default function NewsletterHeader() {
  return (
    <div className="space-y-10">
      <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[30px] border border-white/30 flex items-center justify-center mx-auto mb-8 animate-float">
        <Mail className="w-10 h-10 text-white" />
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          নতুন অফার মিস করবেন না!
        </h2>
        <p className="text-white/80 text-lg md:text-xl font-medium">
          আমাদের নিউজলেটারে সাবস্ক্রাইব করুন এবং আপনার প্রথম অর্ডারে পান ১০%
          অতিরিক্ত ছাড়।
        </p>
      </div>
    </div>
  );
}
