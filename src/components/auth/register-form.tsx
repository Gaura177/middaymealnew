"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerSchema, type RegisterFormValues } from "@/lib/auth/schemas";
import { useAuth } from "@/lib/auth/hooks";
import { Button } from "@/components/ui/button";
import { AuthFormField } from "./auth-form-field";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(data: RegisterFormValues) {
    try {
      setIsLoading(true);
      const result = await registerUser(data);
      if (result.success) {
        toast.success("Account created successfully. Please log in.");
        router.push("/login");
      } else {
        console.error("Registration failed:", result.error);
        form.setError("root", {
          message: result.error || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      form.setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {errors.root.message}
        </div>
      )}

      <AuthFormField
        control={form.control}
        name="username"
        label="Username"
        placeholder="Enter your username"
        icon={<User className="h-4 w-4 text-muted-foreground" />}
      />

      <AuthFormField
        control={form.control}
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={<Mail className="h-4 w-4 text-muted-foreground" />}
      />

      <AuthFormField
        control={form.control}
        name="password"
        label="Password"
        type="password"
        placeholder="Create a password"
        autoComplete="new-password"
        inputMode="text"
      />

      <AuthFormField
        control={form.control}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        inputMode="text"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
