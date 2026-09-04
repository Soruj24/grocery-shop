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
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="mb-6">
          <Alert tone="danger" title={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="text-sm font-medium text-foreground">
            ইমেইল এড্রেস
          </label>
          <Input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            placeholder="example@mail.com"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="login-password" className="text-sm font-medium text-foreground">
              পাসওয়ার্ড
            </label>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ভুলে গেছেন?
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
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
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          লগইন করুন
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-foreground font-medium hover:underline underline-offset-4"
          >
            নতুন তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
