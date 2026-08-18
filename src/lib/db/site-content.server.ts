import { getSql } from "@/integrations/db/client.server";
import type { HeroContent, ContactContent } from "@/lib/content-defaults";

type SiteContentRow = { value: HeroContent | ContactContent };

export async function fetchSiteContent<T>(key: string): Promise<T | null> {
  const sql = getSql();
  const rows = await sql`SELECT value FROM site_content WHERE key = ${key} LIMIT 1`;
  const row = rows[0] as SiteContentRow | undefined;
  return row ? (row.value as T) : null;
}

export async function upsertSiteContent(key: string, value: unknown, updatedBy?: string) {
  const sql = getSql();
  await sql`
    INSERT INTO site_content (key, value, updated_by, updated_at)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb, ${updatedBy ?? null}, now())
    ON CONFLICT (key) DO UPDATE SET
      value = EXCLUDED.value,
      updated_by = EXCLUDED.updated_by,
      updated_at = now()
  `;
}
