import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Create a connection pool (Essential for stability)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Assign the pool to the adapter
const adapter = new PrismaPg(pool);

// 3. Singleton pattern for Next.js Fast Refresh
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    // Optional: useful for debugging your Synapse workflows
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
