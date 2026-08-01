import { getSql } from "@/integrations/db/client.server";

// Row shape as stored in Postgres (see schema.sql / products table)
export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category_label: string | null;
  price_ugx: number;
  description: string;
  best_for: string | null;
  image_url: string;
  is_bestseller: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

// Shape the rest of the app already expects (src/lib/products.ts `Product`),
// so swapping the static array for a DB read doesn't require touching every
// consumer component's prop types.
export type PublicProduct = {
  id: string; // slug
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  bestFor: string;
  isBestseller: boolean;
};

function toPublicProduct(row: ProductRow): PublicProduct {
  return {
    id: row.slug,
    name: row.name,
    category: row.category_label ?? "",
    price: row.price_ugx,
    image: row.image_url,
    description: row.description,
    bestFor: row.best_for ?? "",
    isBestseller: row.is_bestseller,
  };
}

export async function listActiveProducts(): Promise<PublicProduct[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, slug, name, category_label, price_ugx, description, best_for,
           image_url, is_bestseller, is_active, sort_order, created_at, updated_at
    FROM products
    WHERE is_active = true
    ORDER BY sort_order ASC, created_at ASC
  `;
  return (rows as ProductRow[]).map(toPublicProduct);
}

export async function listAllProductsAdmin(): Promise<ProductRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, slug, name, category_label, price_ugx, description, best_for,
           image_url, is_bestseller, is_active, sort_order, created_at, updated_at
    FROM products
    ORDER BY sort_order ASC, created_at ASC
  `;
  return rows as ProductRow[];
}

export type ProductInput = {
  slug: string;
  name: string;
  category_label?: string | null;
  price_ugx: number;
  description?: string;
  best_for?: string | null;
  image_url: string;
  is_bestseller?: boolean;
  is_active?: boolean;
  sort_order?: number;
};

export async function insertProduct(input: ProductInput): Promise<ProductRow> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO products (
      slug, name, category_label, price_ugx, description, best_for,
      image_url, is_bestseller, is_active, sort_order
    ) VALUES (
      ${input.slug},
      ${input.name},
      ${input.category_label ?? null},
      ${input.price_ugx},
      ${input.description ?? ""},
      ${input.best_for ?? null},
      ${input.image_url},
      ${input.is_bestseller ?? false},
      ${input.is_active ?? true},
      ${input.sort_order ?? 0}
    )
    RETURNING id, slug, name, category_label, price_ugx, description, best_for,
              image_url, is_bestseller, is_active, sort_order, created_at, updated_at
  `;
  return rows[0] as ProductRow;
}

export type ProductUpdate = Partial<ProductInput>;

export async function updateProduct(id: string, patch: ProductUpdate): Promise<ProductRow | null> {
  const sql = getSql();
  const rows = await sql`
    UPDATE products SET
      slug = COALESCE(${patch.slug ?? null}, slug),
      name = COALESCE(${patch.name ?? null}, name),
      category_label = COALESCE(${patch.category_label ?? null}, category_label),
      price_ugx = COALESCE(${patch.price_ugx ?? null}, price_ugx),
      description = COALESCE(${patch.description ?? null}, description),
      best_for = COALESCE(${patch.best_for ?? null}, best_for),
      image_url = COALESCE(${patch.image_url ?? null}, image_url),
      is_bestseller = COALESCE(${patch.is_bestseller ?? null}, is_bestseller),
      is_active = COALESCE(${patch.is_active ?? null}, is_active),
      sort_order = COALESCE(${patch.sort_order ?? null}, sort_order)
    WHERE id = ${id}::uuid
    RETURNING id, slug, name, category_label, price_ugx, description, best_for,
              image_url, is_bestseller, is_active, sort_order, created_at, updated_at
  `;
  return (rows[0] as ProductRow | undefined) ?? null;
}

export async function deleteProduct(id: string): Promise<ProductRow | null> {
  const sql = getSql();
  const rows = await sql`
    DELETE FROM products
    WHERE id = ${id}::uuid
    RETURNING id, slug, name, category_label, price_ugx, description, best_for,
              image_url, is_bestseller, is_active, sort_order, created_at, updated_at
  `;
  return (rows[0] as ProductRow | undefined) ?? null;
}
