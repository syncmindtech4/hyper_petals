import { neon } from "@neondatabase/serverless";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "Missing DATABASE_URL. Add your Neon connection string to .env — see .env.example.",
    );
  }
  return url;
}

/** Tagged-template SQL client for Neon Postgres (server-only). */
export function getSql() {
  return neon(getDatabaseUrl());
}
