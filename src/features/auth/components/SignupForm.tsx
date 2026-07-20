"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Alert, Button, Input } from "@/components/ui";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?success=true");
      } else {
        setError(data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
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
            আপনার নাম
          </label>
          <Input
            type="text"
            required
            size="lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            leftIcon={<User className="w-5 h-5" />}
            placeholder="আপনার নাম লিখুন"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">
            ইমেইল এড্রেস
          </label>
          <Input
            type="email"
            required
            size="lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            leftIcon={<Mail className="w-5 h-5" />}
            placeholder="example@mail.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">
            পাসওয়ার্ড
          </label>
          <Input
            type="password"
            required
            size="lg"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
          অ্যাকাউন্ট তৈরি করুন
        </Button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-sm font-bold text-muted-foreground">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary-hover underline underline-offset-4"
          >
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
