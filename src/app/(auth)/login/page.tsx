import AuthLogo from "@/components/auth/AuthLogo";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/category-utils";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-gray-950 px-4 py-12">
      <div className="max-w-5xl w-full">
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 relative overflow-hidden flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="hidden md:block w-1/2 relative min-h-[600px] bg-gray-100 dark:bg-gray-800">
            <Image 
              src={getProductFallbackImage("login")} 
              alt="Login to Grocery Shop" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
              <div className="text-white space-y-4 relative z-10">
                <h2 className="text-4xl font-black tracking-tight">Welcome Back!</h2>
                <p className="text-lg font-medium text-gray-200 leading-relaxed">
                  Sign in to access your orders, track deliveries, and enjoy personalized offers just for you.
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 dark:bg-green-900/10 rounded-bl-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-tr-full blur-2xl pointer-events-none"></div>

            <div className="relative max-w-sm mx-auto w-full">
              <AuthLogo subtitle="Welcome Back" />
              <div className="mt-8">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
