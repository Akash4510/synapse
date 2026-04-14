import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

import { db } from "../db";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const processTask = inngest.createFunction(
  {
    id: "process-task",
    triggers: { event: "app/task.created" },
  },
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

export const executeAITest = inngest.createFunction(
  {
    id: "execute-ai-test",
    triggers: { event: "app/ai-test.executed" },
  },
  async ({ event, step }) => {
    await step.sleep("pause-before-ai", "10s");

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant",
        prompt: "What is 2 + 2?",
      },
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-3.5-turbo"),
        system: "You are a helpful assistant",
        prompt: "What is 2 + 2?",
      },
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-3-5-sonnet"),
        system: "You are a helpful assistant",
        prompt: "What is 2 + 2?",
      },
    );

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  },
);
