"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { signupSchema, type SignupInput } from "../schemas/signup";

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupInput) => {
    console.log(values);
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
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
                    {/* Label and Link on the same line */}
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </Link>
                    </div>

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
                  Sign up
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

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
};
