import { z } from "zod";

export const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  class: z
    .string()
    .min(1, "Class is required")
    .max(10, "Class must be less than 10 characters")
    .trim(),
  section: z
    .string()
    .min(1, "Section is required")
    .max(10, "Section must be less than 10 characters")
    .trim(),
  roll_number: z
    .string()
    .regex(/^[A-Z0-9]+$/i, "Roll number must contain only letters and numbers")
    .min(1, "Roll number is required")
    .max(20, "Roll number must be less than 20 characters")
    .trim(),
});

export type StudentFormData = z.infer<typeof studentSchema>;
