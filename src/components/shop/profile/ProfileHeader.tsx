import { User, Mail, Phone, MapPin, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface ProfileHeaderProps {
  session: any;
}

export default function ProfileHeader({ session }: ProfileHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-12 h-12 text-green-600 dark:text-green-400" />
      </div>
      <div className="flex-1 text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {session.user?.name}
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 dark:text-gray-400 text-sm">
          {session.user?.email && (
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1" /> {session.user.email}
            </span>
          )}
          {session.user?.phone && (
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" /> {session.user.phone}
            </span>
          )}
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />{" "}
            {session.user?.address || "ঠিকানা দেওয়া হয়নি"}
          </span>
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="flex items-center space-x-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-colors font-medium"
      >
        <LogOut className="w-5 h-5" />
        <span>লগ আউট</span>
      </button>
    </div>
  );
}
