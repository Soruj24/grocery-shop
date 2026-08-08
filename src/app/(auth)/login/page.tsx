import AuthLogo from "@/features/auth/components/AuthLogo";
import LoginForm from "@/features/auth/components/LoginForm";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="bg-card rounded-xl shadow-lg border border-border relative overflow-hidden flex flex-col md:flex-row">
          
          <div className="hidden md:block w-1/2 relative min-h-[560px] bg-muted">
            <Image 
              src={getProductFallbackImage("login")} 
              alt="Login to Grocery Shop" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-10">
              <div className="text-white space-y-3 relative z-10">
                <h2 className="text-3xl font-semibold tracking-tight">Welcome Back!</h2>
                <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                  Sign in to access your orders, track deliveries, and enjoy personalized offers just for you.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-10 relative flex flex-col justify-center">
            <div className="relative max-w-sm mx-auto w-full">
              <AuthLogo subtitle="Welcome Back" />
              <div className="mt-6">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
