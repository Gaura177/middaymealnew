import { z } from "zod"

// Location related schemas
export const stateSchema = z.object({
  id: z.string(),
  name: z.string()
})

export const districtSchema = z.object({
  id: z.string(),
  stateId: z.string(),
  name: z.string()
})

export const tehsilSchema = z.object({
  id: z.string(),
  districtId: z.string(),
  name: z.string()
})

export const schoolSchema = z.object({
  name: z.string().min(3, "School name must be at least 3 characters"),
  streetAddress: z.string().min(5, "Street address must be at least 5 characters"),
  pincode: z.string().length(6, "Pincode must be exactly 6 digits").regex(/^\d+$/, "Pincode must contain only numbers"),
  stateId: z.string().min(1, "State selection is required"),
  districtId: z.string().min(1, "District selection is required"),
  tehsilId: z.string().min(1, "Tehsil selection is required")
})

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type SchoolValues = z.infer<typeof schoolSchema>
export type StateValues = z.infer<typeof stateSchema>
export type DistrictValues = z.infer<typeof districtSchema>
export type TehsilValues = z.infer<typeof tehsilSchema>