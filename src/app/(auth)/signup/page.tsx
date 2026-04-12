import React from "react";

import { requireNoAuth } from "@/lib/auth/utils";
import { SignupForm } from "@/features/auth/components/signup-form";

const SignupPage = async () => {
  await requireNoAuth();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
