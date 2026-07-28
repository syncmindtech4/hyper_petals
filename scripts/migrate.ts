import { Client } from "pg";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL is not defined in your .env file.");
    process.exit(1);
  }

  // Path pointing to your schema.sql file
  const schemaPath = path.join(__dirname, "..", "schema.sql");

  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ Error: Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true, // Required for Neon SSL connections
  });

  try {
    console.log("Connecting to Neon database...");
    await client.connect();

    console.log(`Reading SQL schema from ${schemaPath}...`);
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("Applying schema to database...");
    await client.query(sql);

    console.log("✅ Schema applied successfully!");
  } catch (err) {
    const error = err as Error;
    console.error("❌ Error applying schema:", error.message);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

runMigration();
