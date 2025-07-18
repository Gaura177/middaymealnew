"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { LoginFormValues, RegisterFormValues } from "./schemas";
import { signIn, signUp, checkSchoolRegistration } from "./auth-client";

interface AuthResult {
  success: boolean;
  error?: string;
  session?: {
    token: string;
    // Add other session properties if needed
  };
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const setLoginError = (message: string) => setError(message);

  const login = async (data: LoginFormValues): Promise<AuthResult> => {
    console.log("[hooks/login] Starting login process");
    setIsLoading(true);
    setError(undefined);

    try {
      console.log("[hooks/login] Calling signIn.email");
      const { data: LoginData, error } = await signIn.email({
        email: data.email,
        password: data.password,
      }, {
        onSuccess: (ctx) => {
          // The token is typically in the response headers or a specific data property
          // Assuming `better-auth` puts the token in `ctx.data` or similar for client-side use
          // Based on the original prompt, it expects `result.session.token`
          // We'll extract it from `LoginData` if it exists.
        }
      });

      if (error) {
        console.log("[hooks/login] Sign in error:", error);
        const message = "Login failed";
        setError(message);
        return { success: false, error: message };
      }

      console.log("[hooks/login] Sign in successful");
      // Assuming LoginData contains the session information directly or indirectly
      // If LoginData contains a `token` directly, use that. Otherwise, adjust.
      // For now, we assume LoginData itself is the session or contains it.
      return { success: true, session: LoginData };
    } catch (err) {
      console.error("[hooks/login] Exception during login:", err);
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
      console.log("[hooks/login] Login process completed");
    }
  };

  return { login, isLoading, error, setLoginError };
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const router = useRouter();

  const register = async (data: RegisterFormValues): Promise<AuthResult> => {
    setIsLoading(true);
    setError(undefined);

    try {
      await signUp.email({
        email: data.email,
        password: data.password,
        name: data.username,
      });

      // Check school registration status after successful registration

      return { success: true };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}

export function useAuth() {
  const {
    register,
    isLoading: isRegistering,
    error: registerError,
  } = useRegister();
  const { login, isLoading: isLoggingIn, error: loginError } = useLogin();

  return {
    register,
    login,
    isLoading: isRegistering || isLoggingIn,
    error: registerError || loginError,
  };
}

export function useSchoolRegistrationStatus() {
  const [isChecking, setIsChecking] = useState(true);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  const checkStatus = useCallback(async () => {
    try {
      const status = await checkSchoolRegistration();
      setIsRegistered(status.isRegistered);
    } catch (error) {
      console.error("Failed to check school registration:", error);
    } finally {
      setIsChecking(false);
    }
  }, []);

  return { isChecking, isRegistered, checkStatus };
}
