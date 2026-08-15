import { getSql } from "@/integrations/db/client.server";

export type GalleryItem = {
  id: string;
  kind: "image" | "video";
  storage_path: string;
  public_url: string;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
  created_by: string | null;
};

export type GalleryItemInput = {
  kind: "image" | "video";
  storage_path: string;
  public_url: string;
  title?: string | null;
  alt_text?: string | null;
  caption?: string | null;
  sort_order?: number;
  created_by?: string | null;
};

export type GalleryItemUpdate = {
  title?: string | null;
  alt_text?: string | null;
  caption?: string | null;
  sort_order?: number;
};

export async function listGalleryItems(): Promise<GalleryItem[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, kind, storage_path, public_url, title, alt_text, caption, sort_order, created_at, created_by
    FROM gallery_items
    ORDER BY sort_order ASC, created_at DESC
  `;
  return rows as GalleryItem[];
}

export async function countGalleryItems(): Promise<number> {
  const sql = getSql();
  const rows = await sql`SELECT COUNT(*)::int AS count FROM gallery_items`;
  return (rows[0] as { count: number }).count;
}

export async function insertGalleryItem(input: GalleryItemInput): Promise<GalleryItem> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO gallery_items (kind, storage_path, public_url, title, alt_text, caption, sort_order, created_by)
    VALUES (
      ${input.kind},
      ${input.storage_path},
      ${input.public_url},
      ${input.title ?? null},
      ${input.alt_text ?? null},
      ${input.caption ?? null},
      ${input.sort_order ?? 0},
      ${input.created_by ?? null}
    )
    RETURNING id, kind, storage_path, public_url, title, alt_text, caption, sort_order, created_at, created_by
  `;
  return rows[0] as GalleryItem;
}

export async function updateGalleryItem(id: string, patch: GalleryItemUpdate): Promise<void> {
  const sql = getSql();

  // Fetch-then-merge instead of SQL COALESCE — see updateProduct in products.server.ts
  // for why: COALESCE can't distinguish "omitted from patch" from "explicitly cleared
  // to null", so it silently kept the old value in both cases.
  const existingRows = await sql`
    SELECT title, alt_text, caption, sort_order FROM gallery_items WHERE id = ${id}::uuid
  `;
  const existing = existingRows[0] as
    | { title: string | null; alt_text: string | null; caption: string | null; sort_order: number }
    | undefined;
  if (!existing) return;

  const merged = {
    title: patch.title !== undefined ? patch.title : existing.title,
    alt_text: patch.alt_text !== undefined ? patch.alt_text : existing.alt_text,
    caption: patch.caption !== undefined ? patch.caption : existing.caption,
    sort_order: patch.sort_order !== undefined ? patch.sort_order : existing.sort_order,
  };

  await sql`
    UPDATE gallery_items SET
      title = ${merged.title},
      alt_text = ${merged.alt_text},
      caption = ${merged.caption},
      sort_order = ${merged.sort_order}
    WHERE id = ${id}::uuid
  `;
}

export async function deleteGalleryItem(id: string): Promise<GalleryItem | null> {
  const sql = getSql();
  const rows = await sql`
    DELETE FROM gallery_items
    WHERE id = ${id}::uuid
    RETURNING id, kind, storage_path, public_url, title, alt_text, caption, sort_order, created_at, created_by
  `;
  return (rows[0] as GalleryItem | undefined) ?? null;
}
