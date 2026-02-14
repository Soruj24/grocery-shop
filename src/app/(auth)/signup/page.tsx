import AuthLogo from "@/components/auth/AuthLogo";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-gray-950 px-4 py-12">
      <div className="max-w-md w-full px-6">
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <AuthLogo subtitle="Create New Account" />
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
