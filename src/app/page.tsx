import React from "react";

import { requireAuth } from "@/lib/auth/utils";
import { SignoutButton } from "@/features/auth/components/signout-button";

const HomePage = async () => {
  const { user } = await requireAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>{JSON.stringify(user)}</p>
      <SignoutButton />
    </div>
  );
};

export default HomePage;
