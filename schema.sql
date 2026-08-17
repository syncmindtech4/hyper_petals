-- -- =====================================================================
-- -- Luxe Flora — Neon Postgres schema (full, from scratch)
-- -- =====================================================================
-- -- Safe to run multiple times: types, tables, indexes, and triggers are
-- -- all guarded (IF NOT EXISTS / CREATE OR REPLACE / DO-block exception
-- -- handling), and seed data uses ON CONFLICT DO NOTHING.
-- --
-- -- Covers:
-- --   1. Extensions
-- --   2. Enums
-- --   3. Admin/CMS: user_roles, site_content, gallery_items
-- --   4. Catalog: product_categories, products
-- --   5. Commerce: delivery_locations, promo_codes, orders, order_items
-- --   5b. Fixes user-id columns to TEXT for Clerk (was UUID for Supabase Auth)
-- --   6. Triggers (updated_at bookkeeping)
-- --   7. Seed data (mirrors current hardcoded content in the app)
-- --   8. Fix product image paths (idempotent)
-- --
-- -- Run against your Neon connection string, e.g.:
-- --   npm run db:migrate
-- --   (or directly: psql "$DATABASE_URL" -f schema.sql)
-- -- =====================================================================

-- BEGIN;

-- -- ---------------------------------------------------------------------
-- -- 1. Extensions
-- -- ---------------------------------------------------------------------
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()

-- -- ---------------------------------------------------------------------
-- -- 2. Enums
-- -- ---------------------------------------------------------------------
-- DO $$ BEGIN
--   CREATE TYPE app_role AS ENUM ('admin', 'editor');
-- EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- DO $$ BEGIN
--   CREATE TYPE gallery_kind AS ENUM ('image', 'video');
-- EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- DO $$ BEGIN
--   CREATE TYPE payment_method AS ENUM ('momo', 'airtel_money', 'card', 'cash_on_delivery');
-- EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- DO $$ BEGIN
--   CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
-- EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- DO $$ BEGIN
--   CREATE TYPE order_status AS ENUM (
--     'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'
--   );
-- EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- DO $$ BEGIN
--   CREATE TYPE discount_type AS ENUM ('flat', 'percent');
-- EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- -- Shared trigger to keep updated_at columns fresh
-- CREATE OR REPLACE FUNCTION set_updated_at()
-- RETURNS TRIGGER
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$;

-- -- =====================================================================
-- -- 3. Admin / CMS
-- -- =====================================================================

-- -- Admin & editor role grants. user_id is the auth provider's user id.
-- -- This is TEXT, not UUID: Clerk user ids look like "user_2abC3dEfGhIjK",
-- -- not a UUID. Neon has no built-in auth, so authorization checks happen
-- -- in application code against this table rather than via RLS/auth.uid().
-- CREATE TABLE IF NOT EXISTS user_roles (
--   id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id    TEXT NOT NULL,
--   email      TEXT,
--   role       app_role NOT NULL,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--   UNIQUE (user_id, role)
-- );
-- CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON user_roles (user_id);

-- -- Editable site copy (hero, contact, services, etc.) — flexible
-- -- key/value JSONB store so new sections don't need new migrations.
-- CREATE TABLE IF NOT EXISTS site_content (
--   key        TEXT PRIMARY KEY,
--   value      JSONB NOT NULL,
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--   updated_by TEXT
-- );

-- -- Gallery media metadata. Files themselves live in object storage
-- -- (S3/R2/Supabase Storage/etc.) — public_url is the CDN-facing URL.
-- CREATE TABLE IF NOT EXISTS gallery_items (
--   id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   kind         gallery_kind NOT NULL,
--   storage_path TEXT NOT NULL,
--   public_url   TEXT NOT NULL,
--   title        TEXT,
--   alt_text     TEXT,
--   caption      TEXT,
--   sort_order   INT NOT NULL DEFAULT 0,
--   created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
--   created_by   TEXT
-- );
-- CREATE INDEX IF NOT EXISTS gallery_items_sort_idx ON gallery_items (sort_order, created_at DESC);


-- -- =====================================================================
-- -- 4. Catalog
-- -- =====================================================================

-- CREATE TABLE IF NOT EXISTS product_categories (
--   id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   slug       TEXT NOT NULL UNIQUE,
--   name       TEXT NOT NULL,
--   sort_order INT NOT NULL DEFAULT 0,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS products (
--   id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   slug         TEXT NOT NULL UNIQUE,           -- e.g. 'wine-blush-dozen'
--   name         TEXT NOT NULL,
--   category_id  UUID REFERENCES product_categories(id) ON DELETE SET NULL,
--   category_label TEXT,                          -- display label, e.g. "Roses · Bestseller"
--   price_ugx    INTEGER NOT NULL CHECK (price_ugx >= 0),
--   description  TEXT NOT NULL DEFAULT '',
--   best_for     TEXT,                            -- e.g. "Anniversaries · Birthdays"
--   image_url    TEXT NOT NULL,
--   gallery_urls TEXT[] NOT NULL DEFAULT '{}',
--   is_bestseller BOOLEAN NOT NULL DEFAULT false,
--   is_active    BOOLEAN NOT NULL DEFAULT true,
--   stock_qty    INTEGER,                         -- NULL = made-to-order / unlimited
--   sort_order   INT NOT NULL DEFAULT 0,
--   created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
--   updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
-- );
-- CREATE INDEX IF NOT EXISTS products_category_idx ON products (category_id);
-- CREATE INDEX IF NOT EXISTS products_active_idx ON products (is_active, sort_order);

-- CREATE OR REPLACE TRIGGER products_set_updated_at
--   BEFORE UPDATE ON products
--   FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -- =====================================================================
-- -- 5. Commerce
-- -- =====================================================================

-- -- Delivery zones + flat fees (mirrors the LOCATIONS list in checkout.tsx)
-- CREATE TABLE IF NOT EXISTS delivery_locations (
--   id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   name       TEXT NOT NULL UNIQUE,
--   fee_ugx    INTEGER NOT NULL CHECK (fee_ugx >= 0),
--   is_active  BOOLEAN NOT NULL DEFAULT true,
--   sort_order INT NOT NULL DEFAULT 0
-- );

-- CREATE TABLE IF NOT EXISTS promo_codes (
--   id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   code           TEXT NOT NULL UNIQUE,
--   discount_type  discount_type NOT NULL,
--   discount_value INTEGER NOT NULL CHECK (discount_value > 0), -- UGX if flat, percent (1-100) if percent
--   is_active      BOOLEAN NOT NULL DEFAULT true,
--   max_redemptions INTEGER,           -- NULL = unlimited
--   redemptions_count INTEGER NOT NULL DEFAULT 0,
--   starts_at      TIMESTAMPTZ,
--   expires_at     TIMESTAMPTZ,
--   created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS orders (
--   id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   order_number       TEXT NOT NULL UNIQUE,            -- human-friendly, e.g. LF-20260728-0001
--   user_id            TEXT,                            -- Clerk user id; nullable: guest checkout supported

--   -- Purchaser contact
--   customer_name      TEXT NOT NULL,
--   customer_phone     TEXT NOT NULL,
--   customer_email     TEXT,

--   -- Delivery / gifting
--   send_to_self       BOOLEAN NOT NULL DEFAULT true,
--   recipient_name     TEXT,
--   recipient_phone    TEXT,
--   delivery_location_id UUID REFERENCES delivery_locations(id) ON DELETE SET NULL,
--   delivery_location_name TEXT NOT NULL,   -- snapshot in case the zone is later renamed/removed
--   delivery_fee_ugx   INTEGER NOT NULL DEFAULT 0,
--   delivery_date      DATE NOT NULL,
--   landmark_notes     TEXT,

--   -- Promo / pricing
--   promo_code_id      UUID REFERENCES promo_codes(id) ON DELETE SET NULL,
--   promo_code         TEXT,
--   discount_ugx       INTEGER NOT NULL DEFAULT 0,
--   subtotal_ugx       INTEGER NOT NULL CHECK (subtotal_ugx >= 0),
--   total_ugx          INTEGER NOT NULL CHECK (total_ugx >= 0),

--   -- Payment
--   payment_method     payment_method NOT NULL,
--   payment_status     payment_status NOT NULL DEFAULT 'pending',
--   payment_reference  TEXT,             -- MoMo/Airtel/card transaction id

--   -- Fulfillment
--   status             order_status NOT NULL DEFAULT 'pending',
--   admin_notes        TEXT,

--   created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
--   updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
-- );
-- CREATE INDEX IF NOT EXISTS orders_user_idx ON orders (user_id);
-- CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);
-- CREATE INDEX IF NOT EXISTS orders_created_idx ON orders (created_at DESC);

-- CREATE OR REPLACE TRIGGER orders_set_updated_at
--   BEFORE UPDATE ON orders
--   FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- CREATE TABLE IF NOT EXISTS order_items (
--   id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
--   product_id    UUID REFERENCES products(id) ON DELETE SET NULL,

--   -- Snapshots so historical orders stay accurate even if the product changes/is deleted
--   product_name  TEXT NOT NULL,
--   unit_price_ugx INTEGER NOT NULL CHECK (unit_price_ugx >= 0),
--   quantity      INTEGER NOT NULL CHECK (quantity > 0),
--   line_total_ugx INTEGER NOT NULL CHECK (line_total_ugx >= 0),

--   is_gift          BOOLEAN NOT NULL DEFAULT false,
--   gift_message      TEXT,

--   created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
-- );
-- CREATE INDEX IF NOT EXISTS order_items_order_idx ON order_items (order_id);
-- CREATE INDEX IF NOT EXISTS order_items_product_idx ON order_items (product_id);

-- -- ---------------------------------------------------------------------
-- -- 5b. Fix pre-existing installations
-- -- ---------------------------------------------------------------------
-- -- If this schema was already applied with these columns as UUID (the
-- -- original version, before Clerk was wired up), converting them to TEXT
-- -- here is safe and idempotent — casting UUID or TEXT to TEXT is a no-op
-- -- either way, and this runs every time this file is applied.
-- ALTER TABLE user_roles    ALTER COLUMN user_id    TYPE TEXT USING user_id::text;
-- ALTER TABLE site_content  ALTER COLUMN updated_by TYPE TEXT USING updated_by::text;
-- ALTER TABLE gallery_items ALTER COLUMN created_by TYPE TEXT USING created_by::text;
-- ALTER TABLE orders        ALTER COLUMN user_id    TYPE TEXT USING user_id::text;

-- COMMIT;

-- -- =====================================================================
-- -- 6. Seed data (matches current hardcoded content in the app)
-- -- =====================================================================

-- BEGIN;

-- -- Site copy (from src/lib/content-defaults.ts)
-- INSERT INTO site_content (key, value) VALUES
-- (
--   'hero',
--   '{
--     "eyebrow": "Kampala · Entebbe · Wakiso · Nationwide Delivery",
--     "titleLead": "Flowers and celebrations, ",
--     "titleItalic": "designed like Uganda deserves.",
--     "subtitle": "Bouquets, bridal & baby showers, birthdays, marriage proposals and Kwanjula décor — handcrafted by local florists and stylists, delivered same-day across Kampala.",
--     "stat1Label": "Events",
--     "stat1Value": "200+",
--     "stat2Label": "Delivery",
--     "stat2Value": "Same day",
--     "stat3Label": "Mobile Money accepted",
--     "stat3Value": "MTN · Airtel"
--   }'::jsonb
-- ),
-- (
--   'contact',
--   '{
--     "phone": "+256790449711",
--     "phoneHref": "tel:++256790449711",
--     "whatsapp": "+256790449711",
--     "email": "luxefloral.designevents@gmail.com",
--     "address": "Kampala, Uganda",
--     "hours": "Tue – Sat · 10am – 6pm",
--     "instagram": "https://instagram.com"
--   }'::jsonb
-- ),
-- (
--   'services',
--   '{
--     "heading": "Florals for birthdays, showers & proposals.",
--     "subtitle": "From surprise proposals to milestone celebrations, we design and install floral moments that feel like an extension of you.",
--     "items": [
--       {
--         "title": "Birthday Parties",
--         "price": "From UGX 450,000",
--         "body": "From sweet sixteen surprises to milestone celebrations — bold backdrops, table florals, and cake table styling that set the tone for an unforgettable party.",
--         "includes": ["Theme & palette design", "Backdrop & balloon florals", "Table centerpieces", "Cake table styling"]
--       },
--       {
--         "title": "Baby Showers",
--         "price": "From UGX 380,000",
--         "body": "Soft, dreamy installations in pastel or gender-neutral palettes. Thoughtful details that make the mum-to-be feel truly celebrated.",
--         "includes": ["Mood board & concept", "Welcome arch or backdrop", "Guest table florals", "Gift & dessert table styling"]
--       },
--       {
--         "title": "Wedding Proposals",
--         "price": "From UGX 280,000",
--         "body": "Intimate, romantic settings designed to make the moment unforgettable. From private dinners to surprise garden setups — one question, one yes.",
--         "includes": ["Venue scouting advice", "Romantic floral setup", "Candle & prop styling", "On-site installation"]
--       }
--     ]
--   }'::jsonb
-- )
-- ON CONFLICT (key) DO NOTHING;

-- -- Delivery zones (from src/routes/checkout.tsx LOCATIONS)
-- INSERT INTO delivery_locations (name, fee_ugx, sort_order) VALUES
-- ('Kampala Central', 5000, 1),
-- ('Muyenga', 10000, 2),
-- ('Kololo', 8000, 3),
-- ('Nakasero', 8000, 4),
-- ('Bugolobi', 10000, 5),
-- ('Entebbe', 30000, 6),
-- ('Naalya', 15000, 7),
-- ('Lubowa', 20000, 8)
-- ON CONFLICT (name) DO NOTHING;

-- -- Product categories (derived from src/lib/products.ts)
-- INSERT INTO product_categories (slug, name, sort_order) VALUES
-- ('roses', 'Roses', 1),
-- ('mixed-bouquets', 'Mixed Bouquets', 2),
-- ('baskets', 'Baskets', 3),
-- ('signature-bouquet', 'Signature Bouquet', 4),
-- ('statement-arrangement', 'Statement Arrangement', 5),
-- ('bridal-bouquet', 'Bridal Bouquet', 6)
-- ON CONFLICT (slug) DO NOTHING;

-- -- Products (from src/lib/products.ts — image_url left as a placeholder;
-- -- swap in real asset/CDN URLs once images are migrated to storage)
-- INSERT INTO products (slug, name, category_id, category_label, price_ugx, description, best_for, image_url, is_bestseller, sort_order)
-- SELECT * FROM (VALUES
--   ('wine-blush-dozen', 'Wine & Blush Dozen',
--     (SELECT id FROM product_categories WHERE slug = 'roses'), 'Roses · Bestseller', 110000,
--     'A dozen curated roses blending rich wine red and soft blush pink hues. Elegant, aromatic, and perfectly hand-tied with a satin ribbon.',
--     'Anniversaries · Birthdays · Romantic Gestures', '/products/wine-blush-dozen.jpeg', true, 1),
--   ('two-dozen-red-roses', 'Two Dozen Red Roses',
--     (SELECT id FROM product_categories WHERE slug = 'roses'), 'Roses', 190000,
--     'Twenty-four premium long-stemmed red roses arranged with structural eucalyptus. The ultimate expression of classic luxury and deep affection.',
--     'Anniversaries · Celebrations · Apologies', '/products/two-dozen-red-roses.jpeg', false, 2),
--   ('sunrise-mixed-bouquet', 'Sunrise Mixed Bouquet',
--     (SELECT id FROM product_categories WHERE slug = 'mixed-bouquets'), 'Mixed Bouquets', 95000,
--     'A bright, warm selection of peach roses, golden chrysanthemums, and fresh summer greenery that mimics a Ugandan dawn.',
--     'Get Well · Congratulations · Just Because', '/products/sunrise-mixed-bouquet.jpeg', false, 3),
--   ('garden-gift-basket', 'Garden Gift Basket',
--     (SELECT id FROM product_categories WHERE slug = 'baskets'), 'Baskets', 160000,
--     'A lush array of spray roses, lilies, and wildflowers arranged in a rustic woven basket. A perfect centerpiece or home-warming gift.',
--     'Congratulations · Mother''s Day · Housewarming', '/products/garden-gift-basket.jpeg', false, 4),
--   ('everyday-cheer-bunch', 'Everyday Cheer Bunch',
--     (SELECT id FROM product_categories WHERE slug = 'mixed-bouquets'), 'Mixed Bouquets · Bestseller', 65000,
--     'A delightful, compact bunch of vibrant mixed daisies, carnations, and spray roses to brighten anyone''s everyday space.',
--     'Just Because · Birthdays · Thank You', '/products/everyday-cheer-bunch.jpeg', true, 5),
--   ('garden-rose', 'Garden Rose Bouquet',
--     (SELECT id FROM product_categories WHERE slug = 'signature-bouquet'), 'Signature Bouquet', 45000,
--     'A gathering of soft pink garden roses, hand-tied and finished in cream ribbon. Romantic, tender, and quietly luxurious.',
--     'Anniversaries · Birthdays · Just because', '/products/garden-rose.jpeg', false, 6),
--   ('luxe-pack', 'Luxe Floral Pack',
--     (SELECT id FROM product_categories WHERE slug = 'statement-arrangement'), 'Statement Arrangement', 62000,
--     'Velvet burgundy roses set against deep foliage. A moody, editorial arrangement for those who love drama with their romance.',
--     'Milestones · Gifting · Editorial styling', '/products/luxe-pack.jpeg', false, 7),
--   ('ivory-bridal', 'Ivory Bridal Cluster',
--     (SELECT id FROM product_categories WHERE slug = 'bridal-bouquet'), 'Bridal Bouquet', 85000,
--     'Cream garden roses with soft foliage in a rounded, timeless silhouette. Made to walk down the aisle.',
--     'Weddings · Elopements · Bridal shoots', '/products/ivory-bridal.jpeg', false, 8),
--   ('garden-pastel', 'Garden Pastel',
--     (SELECT id FROM product_categories WHERE slug = 'signature-bouquet'), 'Signature Bouquet', 52000,
--     'A wild, garden-picked gathering of pastel roses, ranunculus and trailing greenery. Soft, unstructured, endlessly pretty.',
--     'Housewarmings · Thank-yous · Sunday tables', '/products/garden-pastel.jpg', false, 9)
-- ) AS v(slug, name, category_id, category_label, price_ugx, description, best_for, image_url, is_bestseller, sort_order)
-- ON CONFLICT (slug) DO NOTHING;

-- COMMIT;


-- -- =====================================================================
-- -- 8. Fix product image paths (idempotent — safe to re-run)
-- -- =====================================================================
-- -- If this schema.sql already ran once, the INSERTs above were skipped via
-- -- ON CONFLICT DO NOTHING, so the /assets/... paths from that first run are
-- -- still in place. These UPDATEs correct them to the new /products/... paths
-- -- regardless of whether this is a first run or a re-run.
-- UPDATE products SET image_url = '/products/wine-blush-dozen.jpeg' WHERE slug = 'wine-blush-dozen';
-- UPDATE products SET image_url = '/products/two-dozen-red-roses.jpeg' WHERE slug = 'two-dozen-red-roses';
-- UPDATE products SET image_url = '/products/sunrise-mixed-bouquet.jpeg' WHERE slug = 'sunrise-mixed-bouquet';
-- UPDATE products SET image_url = '/products/garden-gift-basket.jpeg' WHERE slug = 'garden-gift-basket';
-- UPDATE products SET image_url = '/products/everyday-cheer-bunch.jpeg' WHERE slug = 'everyday-cheer-bunch';
-- UPDATE products SET image_url = '/products/garden-rose.jpeg' WHERE slug = 'garden-rose';
-- UPDATE products SET image_url = '/products/luxe-pack.jpeg' WHERE slug = 'luxe-pack';
-- UPDATE products SET image_url = '/products/ivory-bridal.jpeg' WHERE slug = 'ivory-bridal';
-- UPDATE products SET image_url = '/products/garden-pastel.jpg' WHERE slug = 'garden-pastel';


-- =====================================================================
-- Luxe Flora — Neon Postgres schema (full, from scratch)
-- =====================================================================
-- Safe to run multiple times: types, tables, indexes, and triggers are
-- all guarded (IF NOT EXISTS / CREATE OR REPLACE / DO-block exception
-- handling), and seed data uses ON CONFLICT DO NOTHING.
--
-- Covers:
--   1. Extensions
--   2. Enums
--   3. Admin/CMS: user_roles, site_content, gallery_items
--   4. Catalog: product_categories, products
--   5. Commerce: delivery_locations, promo_codes, orders, order_items
--   5b. Fixes user-id columns to TEXT for Clerk (was UUID for Supabase Auth)
--   6. Triggers (updated_at bookkeeping)
--   7. Seed data (mirrors current hardcoded content in the app)
--   8. Fix product image paths (idempotent)
--
-- Run against your Neon connection string, e.g.:
--   npm run db:migrate
--   (or directly: psql "$DATABASE_URL" -f schema.sql)
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 1. Extensions
-- ---------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()

-- ---------------------------------------------------------------------
-- 2. Enums
-- ---------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE app_role AS ENUM ('admin', 'editor');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE gallery_kind AS ENUM ('image', 'video');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('momo', 'airtel_money', 'card', 'cash_on_delivery');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE discount_type AS ENUM ('flat', 'percent');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Shared trigger to keep updated_at columns fresh
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =====================================================================
-- 3. Admin / CMS
-- =====================================================================

-- Admin & editor role grants. user_id is the auth provider's user id.
-- This is TEXT, not UUID: Clerk user ids look like "user_2abC3dEfGhIjK",
-- not a UUID. Neon has no built-in auth, so authorization checks happen
-- in application code against this table rather than via RLS/auth.uid().
CREATE TABLE IF NOT EXISTS user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT NOT NULL,
  email      TEXT,
  role       app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON user_roles (user_id);

-- Editable site copy (hero, contact, services, etc.) — flexible
-- key/value JSONB store so new sections don't need new migrations.
CREATE TABLE IF NOT EXISTS site_content (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by TEXT
);

-- Gallery media metadata. Files themselves live in object storage
-- (S3/R2/Supabase Storage/etc.) — public_url is the CDN-facing URL.
CREATE TABLE IF NOT EXISTS gallery_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind         gallery_kind NOT NULL,
  storage_path TEXT NOT NULL,
  public_url   TEXT NOT NULL,
  title        TEXT,
  alt_text     TEXT,
  caption      TEXT,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by   TEXT
);
CREATE INDEX IF NOT EXISTS gallery_items_sort_idx ON gallery_items (sort_order, created_at DESC);


-- =====================================================================
-- 4. Catalog
-- =====================================================================

CREATE TABLE IF NOT EXISTS product_categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,           -- e.g. 'wine-blush-dozen'
  name         TEXT NOT NULL,
  category_id  UUID REFERENCES product_categories(id) ON DELETE SET NULL,
  category_label TEXT,                          -- display label, e.g. "Roses · Bestseller"
  price_ugx    INTEGER NOT NULL CHECK (price_ugx >= 0),
  description  TEXT NOT NULL DEFAULT '',
  best_for     TEXT,                            -- e.g. "Anniversaries · Birthdays"
  image_url    TEXT NOT NULL,
  gallery_urls TEXT[] NOT NULL DEFAULT '{}',
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  stock_qty    INTEGER,                         -- NULL = made-to-order / unlimited
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS products_category_idx ON products (category_id);
CREATE INDEX IF NOT EXISTS products_active_idx ON products (is_active, sort_order);

CREATE OR REPLACE TRIGGER products_set_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================
-- 5. Commerce
-- =====================================================================

-- Delivery zones + flat fees (mirrors the LOCATIONS list in checkout.tsx)
CREATE TABLE IF NOT EXISTS delivery_locations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,
  fee_ugx    INTEGER NOT NULL CHECK (fee_ugx >= 0),
  is_active  BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS promo_codes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code           TEXT NOT NULL UNIQUE,
  discount_type  discount_type NOT NULL,
  discount_value INTEGER NOT NULL CHECK (discount_value > 0), -- UGX if flat, percent (1-100) if percent
  is_active      BOOLEAN NOT NULL DEFAULT true,
  max_redemptions INTEGER,           -- NULL = unlimited
  redemptions_count INTEGER NOT NULL DEFAULT 0,
  starts_at      TIMESTAMPTZ,
  expires_at     TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number       TEXT NOT NULL UNIQUE,            -- human-friendly, e.g. LF-20260728-0001
  user_id            TEXT,                            -- Clerk user id; nullable: guest checkout supported

  -- Purchaser contact
  customer_name      TEXT NOT NULL,
  customer_phone     TEXT NOT NULL,
  customer_email     TEXT,

  -- Delivery / gifting
  send_to_self       BOOLEAN NOT NULL DEFAULT true,
  recipient_name     TEXT,
  recipient_phone    TEXT,
  delivery_location_id UUID REFERENCES delivery_locations(id) ON DELETE SET NULL,
  delivery_location_name TEXT NOT NULL,   -- snapshot in case the zone is later renamed/removed
  delivery_fee_ugx   INTEGER NOT NULL DEFAULT 0,
  delivery_date      DATE NOT NULL,
  landmark_notes     TEXT,

  -- Promo / pricing
  promo_code_id      UUID REFERENCES promo_codes(id) ON DELETE SET NULL,
  promo_code         TEXT,
  discount_ugx       INTEGER NOT NULL DEFAULT 0,
  subtotal_ugx       INTEGER NOT NULL CHECK (subtotal_ugx >= 0),
  total_ugx          INTEGER NOT NULL CHECK (total_ugx >= 0),

  -- Payment
  payment_method     payment_method NOT NULL,
  payment_status     payment_status NOT NULL DEFAULT 'pending',
  payment_reference  TEXT,             -- MoMo/Airtel/card transaction id

  -- Fulfillment
  status             order_status NOT NULL DEFAULT 'pending',
  admin_notes        TEXT,

  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS orders_user_idx ON orders (user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);
CREATE INDEX IF NOT EXISTS orders_created_idx ON orders (created_at DESC);

CREATE OR REPLACE TRIGGER orders_set_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS order_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,

  -- Snapshots so historical orders stay accurate even if the product changes/is deleted
  product_name  TEXT NOT NULL,
  unit_price_ugx INTEGER NOT NULL CHECK (unit_price_ugx >= 0),
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  line_total_ugx INTEGER NOT NULL CHECK (line_total_ugx >= 0),

  is_gift          BOOLEAN NOT NULL DEFAULT false,
  gift_message      TEXT,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS order_items_order_idx ON order_items (order_id);
CREATE INDEX IF NOT EXISTS order_items_product_idx ON order_items (product_id);

-- ---------------------------------------------------------------------
-- 5b. Fix pre-existing installations
-- ---------------------------------------------------------------------
-- If this schema was already applied with these columns as UUID (the
-- original version, before Clerk was wired up), converting them to TEXT
-- here is safe and idempotent — casting UUID or TEXT to TEXT is a no-op
-- either way, and this runs every time this file is applied.
ALTER TABLE user_roles    ALTER COLUMN user_id    TYPE TEXT USING user_id::text;
ALTER TABLE site_content  ALTER COLUMN updated_by TYPE TEXT USING updated_by::text;
ALTER TABLE gallery_items ALTER COLUMN created_by TYPE TEXT USING created_by::text;
ALTER TABLE orders        ALTER COLUMN user_id    TYPE TEXT USING user_id::text;

COMMIT;

-- =====================================================================
-- 6. Seed data (matches current hardcoded content in the app)
-- =====================================================================

BEGIN;

-- Site copy (from src/lib/content-defaults.ts)
INSERT INTO site_content (key, value) VALUES
(
  'hero',
  '{
    "eyebrow": "Kampala · Entebbe · Wakiso · Nationwide Delivery",
    "titleLead": "Flowers and celebrations, ",
    "titleItalic": "designed like Uganda deserves.",
    "subtitle": "Bouquets, bridal & baby showers, birthdays, marriage proposals and Kwanjula décor — handcrafted by local florists and stylists, delivered same-day across Kampala.",
    "stat1Label": "Events",
    "stat1Value": "200+",
    "stat2Label": "Delivery",
    "stat2Value": "Same day",
    "stat3Label": "Mobile Money accepted",
    "stat3Value": "MTN · Airtel"
  }'::jsonb
),
(
  'contact',
  '{
    "phone": "+256790449711",
    "phoneHref": "tel:++256790449711",
    "whatsapp": "+256790449711",
    "email": "luxefloral.designevents@gmail.com",
    "address": "Kampala, Uganda",
    "hours": "Tue – Sat · 10am – 6pm",
    "instagram": "https://instagram.com"
  }'::jsonb
),
(
  'services',
  '{
    "heading": "Florals for birthdays, showers & proposals.",
    "subtitle": "From surprise proposals to milestone celebrations, we design and install floral moments that feel like an extension of you.",
    "items": [
      {
        "title": "Birthday Parties",
        "price": "From UGX 450,000",
        "body": "From sweet sixteen surprises to milestone celebrations — bold backdrops, table florals, and cake table styling that set the tone for an unforgettable party.",
        "includes": ["Theme & palette design", "Backdrop & balloon florals", "Table centerpieces", "Cake table styling"]
      },
      {
        "title": "Baby Showers",
        "price": "From UGX 380,000",
        "body": "Soft, dreamy installations in pastel or gender-neutral palettes. Thoughtful details that make the mum-to-be feel truly celebrated.",
        "includes": ["Mood board & concept", "Welcome arch or backdrop", "Guest table florals", "Gift & dessert table styling"]
      },
      {
        "title": "Wedding Proposals",
        "price": "From UGX 280,000",
        "body": "Intimate, romantic settings designed to make the moment unforgettable. From private dinners to surprise garden setups — one question, one yes.",
        "includes": ["Venue scouting advice", "Romantic floral setup", "Candle & prop styling", "On-site installation"]
      }
    ]
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- Delivery zones (from src/routes/checkout.tsx LOCATIONS)
INSERT INTO delivery_locations (name, fee_ugx, sort_order) VALUES
('Kampala Central', 5000, 1),
('Muyenga', 10000, 2),
('Kololo', 8000, 3),
('Nakasero', 8000, 4),
('Bugolobi', 10000, 5),
('Entebbe', 30000, 6),
('Naalya', 15000, 7),
('Lubowa', 20000, 8)
ON CONFLICT (name) DO NOTHING;

-- Product categories (derived from src/lib/products.ts)
INSERT INTO product_categories (slug, name, sort_order) VALUES
('roses', 'Roses', 1),
('mixed-bouquets', 'Mixed Bouquets', 2),
('baskets', 'Baskets', 3),
('signature-bouquet', 'Signature Bouquet', 4),
('statement-arrangement', 'Statement Arrangement', 5),
('bridal-bouquet', 'Bridal Bouquet', 6)
ON CONFLICT (slug) DO NOTHING;

-- Products (from src/lib/products.ts — image_url left as a placeholder;
-- swap in real asset/CDN URLs once images are migrated to storage)
INSERT INTO products (slug, name, category_id, category_label, price_ugx, description, best_for, image_url, is_bestseller, sort_order)
SELECT * FROM (VALUES
  ('wine-blush-dozen', 'Wine & Blush Dozen',
    (SELECT id FROM product_categories WHERE slug = 'roses'), 'Roses · Bestseller', 110000,
    'A dozen curated roses blending rich wine red and soft blush pink hues. Elegant, aromatic, and perfectly hand-tied with a satin ribbon.',
    'Anniversaries · Birthdays · Romantic Gestures', '/products/wine-blush-dozen.jpeg', true, 1),
  ('two-dozen-red-roses', 'Two Dozen Red Roses',
    (SELECT id FROM product_categories WHERE slug = 'roses'), 'Roses', 190000,
    'Twenty-four premium long-stemmed red roses arranged with structural eucalyptus. The ultimate expression of classic luxury and deep affection.',
    'Anniversaries · Celebrations · Apologies', '/products/two-dozen-red-roses.jpeg', false, 2),
  ('sunrise-mixed-bouquet', 'Sunrise Mixed Bouquet',
    (SELECT id FROM product_categories WHERE slug = 'mixed-bouquets'), 'Mixed Bouquets', 95000,
    'A bright, warm selection of peach roses, golden chrysanthemums, and fresh summer greenery that mimics a Ugandan dawn.',
    'Get Well · Congratulations · Just Because', '/products/sunrise-mixed-bouquet.jpeg', false, 3),
  ('garden-gift-basket', 'Garden Gift Basket',
    (SELECT id FROM product_categories WHERE slug = 'baskets'), 'Baskets', 160000,
    'A lush array of spray roses, lilies, and wildflowers arranged in a rustic woven basket. A perfect centerpiece or home-warming gift.',
    'Congratulations · Mother''s Day · Housewarming', '/products/garden-gift-basket.jpeg', false, 4),
  ('everyday-cheer-bunch', 'Everyday Cheer Bunch',
    (SELECT id FROM product_categories WHERE slug = 'mixed-bouquets'), 'Mixed Bouquets · Bestseller', 65000,
    'A delightful, compact bunch of vibrant mixed daisies, carnations, and spray roses to brighten anyone''s everyday space.',
    'Just Because · Birthdays · Thank You', '/products/everyday-cheer-bunch.jpeg', true, 5),
  ('garden-rose', 'Garden Rose Bouquet',
    (SELECT id FROM product_categories WHERE slug = 'signature-bouquet'), 'Signature Bouquet', 45000,
    'A gathering of soft pink garden roses, hand-tied and finished in cream ribbon. Romantic, tender, and quietly luxurious.',
    'Anniversaries · Birthdays · Just because', '/products/garden-rose.jpeg', false, 6),
  ('luxe-pack', 'Luxe Floral Pack',
    (SELECT id FROM product_categories WHERE slug = 'statement-arrangement'), 'Statement Arrangement', 62000,
    'Velvet burgundy roses set against deep foliage. A moody, editorial arrangement for those who love drama with their romance.',
    'Milestones · Gifting · Editorial styling', '/products/luxe-pack.jpeg', false, 7),
  ('ivory-bridal', 'Ivory Bridal Cluster',
    (SELECT id FROM product_categories WHERE slug = 'bridal-bouquet'), 'Bridal Bouquet', 85000,
    'Cream garden roses with soft foliage in a rounded, timeless silhouette. Made to walk down the aisle.',
    'Weddings · Elopements · Bridal shoots', '/products/ivory-bridal.jpeg', false, 8),
  ('garden-pastel', 'Garden Pastel',
    (SELECT id FROM product_categories WHERE slug = 'signature-bouquet'), 'Signature Bouquet', 52000,
    'A wild, garden-picked gathering of pastel roses, ranunculus and trailing greenery. Soft, unstructured, endlessly pretty.',
    'Housewarmings · Thank-yous · Sunday tables', '/products/garden-pastel.jpg', false, 9)
) AS v(slug, name, category_id, category_label, price_ugx, description, best_for, image_url, is_bestseller, sort_order)
ON CONFLICT (slug) DO NOTHING;

COMMIT;


-- =====================================================================
-- 8. Fix product image paths (idempotent — safe to re-run)
-- =====================================================================
-- If this schema.sql already ran once, the INSERTs above were skipped via
-- ON CONFLICT DO NOTHING, so the /assets/... paths from that first run are
-- still in place. These UPDATEs correct them to the new /products/... paths
-- regardless of whether this is a first run or a re-run.
UPDATE products SET image_url = '/products/wine-blush-dozen.jpeg' WHERE slug = 'wine-blush-dozen';
UPDATE products SET image_url = '/products/two-dozen-red-roses.jpeg' WHERE slug = 'two-dozen-red-roses';
UPDATE products SET image_url = '/products/sunrise-mixed-bouquet.jpeg' WHERE slug = 'sunrise-mixed-bouquet';
UPDATE products SET image_url = '/products/garden-gift-basket.jpeg' WHERE slug = 'garden-gift-basket';
UPDATE products SET image_url = '/products/everyday-cheer-bunch.jpeg' WHERE slug = 'everyday-cheer-bunch';
UPDATE products SET image_url = '/products/garden-rose.jpeg' WHERE slug = 'garden-rose';
UPDATE products SET image_url = '/products/luxe-pack.jpeg' WHERE slug = 'luxe-pack';
UPDATE products SET image_url = '/products/ivory-bridal.jpeg' WHERE slug = 'ivory-bridal';
UPDATE products SET image_url = '/products/garden-pastel.jpg' WHERE slug = 'garden-pastel';

-- =====================================================================
-- 9. Enquiries (contact form submissions)
-- =====================================================================
BEGIN;

CREATE TABLE IF NOT EXISTS enquiries (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  enquiry_type TEXT NOT NULL DEFAULT 'other',
  message      TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'new',   -- 'new' | 'read' | 'archived'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);

COMMIT;