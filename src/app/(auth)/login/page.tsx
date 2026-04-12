import React from "react";

import { requireNoAuth } from "@/lib/auth/utils";
import { LoginForm } from "@/features/auth/components/login-form";

const LoginPage = async () => {
  await requireNoAuth();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
