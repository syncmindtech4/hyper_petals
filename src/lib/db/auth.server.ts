import { auth } from "@clerk/tanstack-react-start/server";
import { userHasRole } from "@/lib/db/roles.server";
import { HttpError } from "@/lib/http-error";

/** Validates Clerk session token and confirms admin role in Neon. Returns user id. */
export async function requireAdminUser(): Promise<string> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    throw new HttpError(401, "Unauthorized");
  }

  const isAdmin = await userHasRole(userId, "admin");
  if (!isAdmin) {
    throw new HttpError(403, "Forbidden: admin role required");
  }

  return userId;
}

/** Returns authenticated Clerk user id if session present, null otherwise. */
export async function getAuthenticatedUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId || null;
}
