import { inngest } from "@/lib/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";

export const appRouter = createTRPCRouter({
  getWorkFlows: protectedProcedure.query(async ({ ctx }) => {
    const workflows = await db.workflow.findMany();
    return workflows;
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/task.created",
      data: { id: "task_001" },
    });

    return { success: true, message: "Job created successfully" };
  }),
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/ai-test.executed",
    });

    return { success: true, message: "AI test job created successfully" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
