"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Alert, Button, Input } from "@/components/ui";

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
        <div className="mb-6 animate-shake">
          <Alert tone="danger" title={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">
            ইমেইল এড্রেস
          </label>
          <Input
            type="email"
            required
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-5 h-5" />}
            placeholder="example@mail.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              পাসওয়ার্ড
            </label>
            <Link
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-hover"
            >
              ভুলে গেছেন?
            </Link>
          </div>
          <Input
            type="password"
            required
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-5 h-5" />}
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          লগইন করুন
        </Button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-sm font-bold text-muted-foreground">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-primary hover:text-primary-hover underline underline-offset-4"
          >
            নতুন তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
