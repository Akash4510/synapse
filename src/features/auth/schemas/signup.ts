import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(2, { error: "Name must be at least 2 characters" })
      .max(50, { error: "Name cannot exceed 50 characters" }),
    email: z.email({
      error: "Please enter a valid email address",
    }),
    password: z
      .string({
        error: "Please enter your password",
      })
      .min(8, {
        error: "Password must be at least 8 characters long",
      }),
    confirmPassword: z.string({
      error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;
