export default function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px]">
      <input
        type="email"
        placeholder="আপনার ইমেইল অ্যাড্রেস..."
        className="flex-1 bg-transparent px-8 py-5 text-white placeholder:text-white/60 outline-none font-bold text-lg"
      />
      <button className="bg-white text-green-700 hover:bg-green-50 px-10 py-5 rounded-[24px] font-black text-lg transition-all shadow-xl active:scale-95 whitespace-nowrap">
        সাবস্ক্রাইব করুন
      </button>
    </form>
  );
}
