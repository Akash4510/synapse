"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export const SignoutButton = ({ ...props }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    setIsPending(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Force the router to go to login
          router.push("/login");
          // Clear the Next.js client-side cache so the protected page doesn't linger
          router.refresh();
        },
      },
    });

    setIsPending(false);
  };

  return (
    <Button {...props} onClick={handleSignOut} disabled={isPending}>
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
};
