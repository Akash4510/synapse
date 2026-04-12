"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { authClient, useAuthSession } from "@/lib/auth/client";

const HomePage = () => {
  const { data: session } = useAuthSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>{JSON.stringify(session)}</p>
      {session && (
        <Button variant="outline" onClick={() => authClient.signOut()}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default HomePage;
