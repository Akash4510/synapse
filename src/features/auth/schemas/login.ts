import { z } from "zod";

export const loginSchema = z.object({
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
});

export type LoginInput = z.infer<typeof loginSchema>;
