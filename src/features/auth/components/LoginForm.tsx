"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400 animate-shake">
          <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-4">
            ইমেইল এড্রেস
          </label>
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-green-600 dark:focus:border-green-500 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
              পাসওয়ার্ড
            </label>
            <Link
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-500 hover:text-green-700"
            >
              ভুলে গেছেন?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-green-600 dark:focus:border-green-500 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-lg shadow-green-200 dark:shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              লগইন করুন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-green-600 dark:text-green-500 hover:text-green-700 underline underline-offset-4"
          >
            নতুন তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
