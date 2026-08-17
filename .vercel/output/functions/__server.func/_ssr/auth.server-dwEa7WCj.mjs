import { t as auth } from "./auth-BXgARgBJ.mjs";
import { t as cs } from "../_libs/neondatabase__serverless.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.server-dwEa7WCj.js
function getDatabaseUrl() {
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error("Missing DATABASE_URL. Add your Neon connection string to .env — see .env.example.");
	return url;
}
/** Tagged-template SQL client for Neon Postgres (server-only). */
function getSql() {
	return cs(getDatabaseUrl());
}
async function userHasRole(userId, role = "admin") {
	return (await getSql()`
    SELECT 1 FROM user_roles
    WHERE user_id = ${userId} AND role = ${role}::app_role
    LIMIT 1
  `).length > 0;
}
var HttpError = class extends Error {
	statusCode;
	constructor(statusCode, message) {
		super(message);
		this.name = "HttpError";
		this.statusCode = statusCode;
	}
};
/** Validates Clerk session token and confirms admin role in Neon. Returns user id. */
async function requireAdminUser() {
	const userId = await getAuthenticatedUserId();
	if (!userId) throw new HttpError(401, "Unauthorized");
	if (!await userHasRole(userId, "admin")) throw new HttpError(403, "Forbidden: admin role required");
	return userId;
}
/** Returns authenticated Clerk user id if session present, null otherwise. */
async function getAuthenticatedUserId() {
	const { userId } = await auth();
	return userId || null;
}
//#endregion
export { userHasRole as i, getSql as n, requireAdminUser as r, getAuthenticatedUserId as t };
