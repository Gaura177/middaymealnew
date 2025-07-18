import { SchoolRegistrationForm } from "@/components/auth/school-registration-form"
import { AuthFormLayout } from "@/components/auth/auth-form-layout"

export default function SchoolRegistrationPage() {
  return (
    <AuthFormLayout
      title="School Registration"
      description="Register your school information"
    >
      <SchoolRegistrationForm />
    </AuthFormLayout>
  )
}