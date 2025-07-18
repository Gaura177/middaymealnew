"use client";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { Header } from "./header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function HeaderProvider() {
  const [showHeader, setShowHeader] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Use effect to control header visibility
  useEffect(() => {
    // Only show header when session state is stable (not pending)
    if (!isPending) {
      setShowHeader(true);
    }
  }, [isPending]);

  const handleSignOut = async () => {
    await signOut();
    // Redirect to login page after successful sign out
    router.replace("/login");
  };

  // Controlled rendering of the header
  if (!showHeader) {
    return null;
  }

  return <Header isAuthenticated={!!session?.user} onSignOut={handleSignOut} />;
}
