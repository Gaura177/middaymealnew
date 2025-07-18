"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthFormLayout } from "@/components/auth/auth-form-layout";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { useLogin } from "@/lib/auth/hooks";
import { LoginFormValues, loginSchema } from "@/lib/auth/schemas";

import { DevTool } from "@hookform/devtools";
import { checkSchoolRegistration } from "@/lib/auth/auth-client";

export default function LoginPage() {
  const { login, isLoading, error: authError, setLoginError } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    const result = await login(data);

    if (result.success) {
      try {
        // Set the authentication cookie
        if (!result.session?.token) {
          console.error("[Login] Session token not found after successful login.");
          setLoginError("Failed to establish session. Please try again.");
          return;
        }

        const sessionResponse = await fetch("/api/auth/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: result.session.token }),
        });

        if (!sessionResponse.ok) {
          console.error(
            "[Login] Failed to set session cookie:",
            sessionResponse.statusText,
          );
          setLoginError("Failed to establish session. Please try again.");
          return; // Prevent redirection
        }

        const { isRegistered } = await checkSchoolRegistration();
        const targetPath = isRegistered ? "/students" : "/school-registration";

        // Force a hard navigation
        window.location.href = targetPath;
      } catch (error) {
        console.error("[Login] Navigation or session error:", error);
        // Show error to user
        setLoginError("An unexpected error occurred. Please try again.");
      }
    } else {
      console.log("[Login] Login failed:", result.error);
    }
  };

  return (
    <AuthFormLayout
      title="Sign in"
      description="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {authError && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {authError}
          </div>
        )}

        <AuthFormField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={<Mail className="h-4 w-4 text-muted-foreground" />}
          error={errors.email?.message}
          id="email"
        />

        <AuthFormField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
          error={errors.password?.message}
          id="password"
        />

        <div className="grid w-full gap-y-4 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <div className="text-center">
            <Button variant="link" size="sm" asChild>
              <Link href="/register">Don&apos;t have an account? Register</Link>
            </Button>
          </div>
        </div>
      </form>
      <DevTool control={form.control} /> {/* Set up DevTool */}
    </AuthFormLayout>
  );
}
