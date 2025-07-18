import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"
import { AuthFormLayout } from "@/components/auth/auth-form-layout"

export default function RegisterPage() {
  return (
    <AuthFormLayout
      title="Create an Account"
      description="Register your school to get started"
      footer={
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium underline">
            Log in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthFormLayout>
  )
}