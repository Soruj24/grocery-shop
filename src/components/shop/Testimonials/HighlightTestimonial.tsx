import { MessageSquare } from "lucide-react";

interface HighlightTestimonialProps {
  quote: string;
  author: string;
  initial: string;
}

export default function HighlightTestimonial({ quote, author, initial }: HighlightTestimonialProps) {
  return (
    <div className="md:col-span-2 bg-green-600 rounded-[50px] p-8 text-white flex flex-col justify-between group overflow-hidden relative shadow-2xl shadow-green-600/20">
      <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-110 transition-transform">
        <MessageSquare className="w-20 h-20" />
      </div>
      <p className="text-lg font-bold leading-relaxed relative z-10">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 mt-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black">
          {initial}
        </div>
        <h4 className="font-black">{author}</h4>
      </div>
    </div>
  );
}
