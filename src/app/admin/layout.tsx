"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminCommandPalette from "@/features/admin/shared/CommandPalette";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?callbackUrl=/admin/dashboard");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-foreground flex items-center justify-center animate-pulse">
            <div className="h-5 w-5 rounded bg-background/30" />
          </div>
          <div className="h-2 w-20 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar session={session} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
          <div className="flex h-12 items-center justify-between px-6">
            <div className="pl-12 lg:pl-0">
              <AdminCommandPalette />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Live
              </div>
              <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center text-background text-xs font-medium">
                {session.user?.name?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
