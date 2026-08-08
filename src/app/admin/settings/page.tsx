"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/admin/settings/general"); }, [router]);
  return null;
}
