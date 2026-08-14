import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Add an uppercase letter")
  .regex(/[a-z]/, "Add a lowercase letter")
  .regex(/\d/, "Add a number")
  .regex(/[^A-Za-z0-9]/, "Add a special character");

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email"),
  password: passwordSchema,
  country: z.string().min(1).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
