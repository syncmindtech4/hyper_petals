import { Client } from "pg";
import "dotenv/config";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("❌ DATABASE_URL not found in process.env after dotenv load.");
    return;
  }
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true });
  await client.connect();
  const res = await client.query("SELECT id, slug, name, is_active FROM products ORDER BY sort_order");
  console.log(`Found ${res.rowCount} rows:`);
  console.table(res.rows);
  await client.end();
}
main().catch((e) => console.error("Query failed:", e.message));