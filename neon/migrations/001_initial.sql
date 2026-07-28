-- Luxe Flora — Neon Postgres schema
-- Run with: npm run db:migrate

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE app_role AS ENUM ('admin', 'editor');

-- Admin roles (user_id = Supabase Auth UUID, or any external auth provider id)
CREATE TABLE user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL,
  role       app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

CREATE INDEX user_roles_user_id_idx ON user_roles (user_id);

-- Editable site copy (hero, contact, services)
CREATE TABLE site_content (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID
);

-- Gallery metadata (files live in Supabase Storage / S3 / R2 — public_url is the CDN URL)
CREATE TABLE gallery_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind         TEXT NOT NULL CHECK (kind IN ('image', 'video')),
  storage_path TEXT NOT NULL,
  public_url   TEXT NOT NULL,
  title        TEXT,
  alt_text     TEXT,
  caption      TEXT,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by   UUID
);

CREATE INDEX gallery_items_sort_idx ON gallery_items (sort_order, created_at DESC);

-- Seed default CMS content (matches src/lib/content-defaults.ts)
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
