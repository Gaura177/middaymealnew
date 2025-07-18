"use client";

import { checkSchoolRegistration, useSession } from "@/lib/auth/auth-client";
import { StudentRegistrationForm } from "@/components/students/registration/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function AddStudentPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [schoolData, setSchoolData] = useState<{
    isRegistered?: boolean;
    schoolId?: string;
    schoolName?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const { isRegistered, schoolId, schoolName } =
          await checkSchoolRegistration();
        setSchoolData({
          isRegistered,
          schoolId: schoolId || undefined,
          schoolName: schoolName || undefined,
        });

        // Redirect to registration if school is not registered
        if (session && !isRegistered) {
          router.push("/school-registration");
        }
      } catch (error) {
        console.error("Error checking school registration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkRegistration();
  }, [session, router]);

  if (isLoading || !session || !schoolData.isRegistered) {
    return null;
  }

  if (!schoolData.schoolId || !schoolData.schoolName) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            School information not found. Please contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Register New Student</h1>
      <StudentRegistrationForm
        schoolName={schoolData.schoolName}
      />
    </div>
  );
}
