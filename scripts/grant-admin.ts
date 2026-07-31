import { Client } from "pg";
import "dotenv/config";

function parseArgs(argv: string[]) {
  // Usage: npm run db:grant-admin -- <clerk_user_id> [--email you@example.com]
  const userId = argv[0];
  let email: string | undefined;
  for (let i = 1; i < argv.length; i++) {
    if (argv[i] === "--email") email = argv[i + 1];
  }
  return { userId, email };
}

async function main(): Promise<void> {
  const { userId, email } = parseArgs(process.argv.slice(2));

  if (!userId) {
    console.error("Usage: npm run db:grant-admin -- <clerk_user_id> [--email you@example.com]");
    console.error(
      'Example: npm run db:grant-admin -- "user_2abC3dEfGhIjK" --email me@luxeflora.ug',
    );
    console.error(
      "\nFind your Clerk user id in the Clerk dashboard (Users → click your account → the id starts with 'user_').",
    );
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL is not defined in your .env file.");
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  try {
    await client.connect();

    // Introspect the live table instead of assuming it matches schema.sql —
    // it may have extra columns (e.g. a NOT NULL `email`) added by hand.
    const { rows: columns } = await client.query<{
      column_name: string;
      is_nullable: "YES" | "NO";
      column_default: string | null;
    }>(
      `SELECT column_name, is_nullable, column_default
       FROM information_schema.columns
       WHERE table_name = 'user_roles'`,
    );

    if (columns.length === 0) {
      console.error(
        "❌ Error: table 'user_roles' doesn't exist yet. Run `npm run db:migrate` first.",
      );
      process.exit(1);
    }

    const known: Record<string, string | undefined> = { user_id: userId, role: "admin", email };

    const requiredButMissing = columns.filter(
      (c) => c.is_nullable === "NO" && c.column_default === null && !(c.column_name in known),
    );
    if (requiredButMissing.length > 0) {
      console.error(
        `❌ Error: user_roles has required column(s) this script doesn't know how to fill: ${requiredButMissing
          .map((c) => c.column_name)
          .join(", ")}.`,
      );
      console.error(
        "Add support for them in scripts/grant-admin.ts, or insert the row manually via psql.",
      );
      process.exit(1);
    }

    const emailCol = columns.find((c) => c.column_name === "email");
    if (emailCol && emailCol.is_nullable === "NO" && !email) {
      console.error("❌ Error: user_roles.email is required. Re-run with --email you@example.com");
      process.exit(1);
    }

    const insertCols = ["user_id", "role"];
    const insertVals: string[] = [userId, "admin"];
    if (emailCol && email) {
      insertCols.push("email");
      insertVals.push(email);
    }

    const placeholders = insertCols.map((_, i) => `$${i + 1}`).join(", ");
    await client.query(
      `INSERT INTO user_roles (${insertCols.join(", ")})
       VALUES (${placeholders})
       ON CONFLICT (user_id, role) DO NOTHING`,
      insertVals,
    );
    console.log(`✅ Granted admin role to ${userId}${email ? ` (${email})` : ""}`);
  } catch (err) {
    console.error("❌ Error granting role:", (err as Error).message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
