import React from "react";
import Link from "next/link";
import Image from "next/image";

import { requireNoAuth } from "@/lib/auth/utils";
import { LoginForm } from "@/features/auth/components/login-form";

const LoginPage = async () => {
  await requireNoAuth();

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
