import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from ".";

/**
 * 🔒 SECURE SESSION MEMOIZATION
 * * We wrap the session fetch in React's `cache()` function to deduplicate database calls.
 * * WHY IT IS SAFE:
 * - This uses "Request-Scoped Memoization", NOT Next.js Data Caching.
 * - The cache only lives for the exact duration of a SINGLE HTTP request/page load.
 * - It is immediately destroyed after the HTML is rendered. It NEVER shares data between different users or persists across subsequent requests.
 * - (Warning: Using Next.js `unstable_cache` or `fetch({ cache: 'force-cache' })` here would be a critical vulnerability as it caches globally across the server).
 * * THE BENEFIT:
 * - We can call `requireAuth()` inside Layouts, Pages, and deep nested Server Components
 * simultaneously. Even if called 50 times on one screen, the database is queried exactly once.
 */
const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const requireAuth = async () => {
  const session = await getSession(); // Uses the cached version

  if (!session) {
    redirect("/login");
  }

  return session;
};

export const requireNoAuth = async () => {
  const session = await getSession(); // Uses the cached version

  if (session) {
    redirect("/");
  }

  return session;
};
