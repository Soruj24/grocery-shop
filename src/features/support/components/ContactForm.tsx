
import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-32px border border-gray-100 dark:border-gray-800 shadow-xl h-full">
        <h3 className="text-2xl font-black mb-8">আমাদের মেসেজ পাঠান</h3>
        <form className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-500 uppercase tracking-wider">আপনার নাম</label>
            <input type="text" placeholder="পুরো নাম লিখুন"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-500 uppercase tracking-wider">মোবাইল নম্বর</label>
            <input type="text" placeholder="০১৭xxxxxxxx"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-black text-gray-500 uppercase tracking-wider">বিষয়</label>
            <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none appearance-none">
              <option>অর্ডার সংক্রান্ত জিজ্ঞাসা</option>
              <option>পেমেন্ট সমস্যা</option>
              <option>পণ্য ফেরত বা পরিবর্তন</option>
              <option>অন্যান্য</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-black text-gray-500 uppercase tracking-wider">আপনার মেসেজ</label>
            <textarea rows={4} placeholder="বিস্তারিত এখানে লিখুন..."
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none resize-none" />
          </div>
          <div className="md:col-span-2">
            <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-600/20 active:scale-95">
              <Send className="w-5 h-5" /> মেসেজ পাঠান
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
