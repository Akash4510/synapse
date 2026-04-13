"use client";

import React from "react";
import { toast } from "sonner";

import { LogoutButton } from "@/features/auth/components/logout-button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkFlows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued successfully!");
      },
    }),
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        {create.isPending ? "Creating..." : "Create Workflow"}
      </Button>

      <LogoutButton />
    </div>
  );
};

export default HomePage;
