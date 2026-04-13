import { db } from "../db";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    await step.sleep("pause", "10s");

    return db.workflow.create({
      data: {
        name: "Workflow for " + event.data.id,
        description: "This workflow was created by Inngest",
      },
    });
  },
);
