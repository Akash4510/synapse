"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { signupSchema, type SignupInput } from "../schemas/signup";
import { authClient } from "@/lib/auth/client";

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupInput) => {
    await authClient.signUp.email(
      {
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          console.error("Signup error:", ctx.error);
          console.error("Signup error:", ctx.error.message);
          toast.error("Signup failed: " + ctx.error.message);
        },
      },
    );
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="w-full md:w-120 mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Get Started</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* OAuth Section (Uncontrolled, just standard buttons) */}
              <div className="flex flex-col gap-2">
                <Button variant="outline" type="button" disabled={isSubmitting}>
                  Continue with Github
                </Button>
                <Button variant="outline" type="button" disabled={isSubmitting}>
                  Continue with Google
                </Button>
              </div>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                    <Input
                      {...field} // This injects onChange, onBlur, value, and name
                      id={field.name}
                      type="text"
                      placeholder="John Doe"
                      aria-invalid={fieldState.invalid}
                    />

                    {/* This handles the Zod error message display */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      {...field} // This injects onChange, onBlur, value, and name
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={fieldState.invalid}
                    />

                    {/* This handles the Zod error message display */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                    />

                    {/* Errors stay cleanly at the bottom */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                    />

                    {/* Errors stay cleanly at the bottom */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Submit Section */}
              <div className="flex flex-col gap-4 mt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Log in
                  </Link>
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
