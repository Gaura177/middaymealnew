import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** Base URL of the authentication server from environment variables */
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  fetchOptions:{
    credentials: "include", // Include cookies in requests
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;

export async function checkSchoolRegistration(): Promise<{
  isRegistered: boolean;
  schoolId: string | null;
  schoolName: string | null;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools/registration-status`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking school registration:", error);
    throw error;
  }
}
