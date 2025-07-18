"use client"

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data: session } = useSession();

  // If user is already authenticated, redirect to dashboard
  if (session?.user) {
    redirect("/students");
  }

  return <main className="flex min-h-screen flex-col pt-15">{children}</main>;
}
