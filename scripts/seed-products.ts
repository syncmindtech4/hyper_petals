import { Client } from "pg";
import { put } from "@vercel/blob";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.join(__dirname, "..", "src", "assets");

type SeedProduct = {
  slug: string;
  name: string;
  category_label: string;
  price_ugx: number;
  description: string;
  best_for: string;
  is_bestseller: boolean;
  sort_order: number;
  imageFile: string; // filename inside src/assets
};

// Mirrors src/lib/products.ts defaultProducts — edit here before running
// if you want different data seeded, or add more entries.
const SEED_PRODUCTS: SeedProduct[] = [
  {
    slug: "wine-blush-dozen",
    name: "Wine & Blush Dozen",
    category_label: "Roses · Bestseller",
    price_ugx: 110000,
    description:
      "A dozen curated roses blending rich wine red and soft blush pink hues. Elegant, aromatic, and perfectly hand-tied with a satin ribbon.",
    best_for: "Anniversaries · Birthdays · Romantic Gestures",
    is_bestseller: true,
    sort_order: 0,
    imageFile: "bouquet_006.jpeg",
  },
  {
    slug: "two-dozen-red-roses",
    name: "Two Dozen Red Roses",
    category_label: "Roses",
    price_ugx: 190000,
    description:
      "Twenty-four premium long-stemmed red roses arranged with structural eucalyptus. The ultimate expression of classic luxury and deep affection.",
    best_for: "Anniversaries · Celebrations · Apologies",
    is_bestseller: false,
    sort_order: 1,
    imageFile: "bouquet_004.jpeg",
  },
  {
    slug: "sunrise-mixed-bouquet",
    name: "Sunrise Mixed Bouquet",
    category_label: "Mixed Bouquets",
    price_ugx: 95000,
    description:
      "A bright, warm selection of peach roses, golden chrysanthemums, and fresh summer greenery that mimics a Ugandan dawn.",
    best_for: "Get Well · Congratulations · Just Because",
    is_bestseller: false,
    sort_order: 2,
    imageFile: "bouquet_013.jpeg",
  },
  {
    slug: "garden-gift-basket",
    name: "Garden Gift Basket",
    category_label: "Baskets",
    price_ugx: 160000,
    description:
      "A lush array of spray roses, lilies, and wildflowers arranged in a rustic woven basket. A perfect centerpiece or home-warming gift.",
    best_for: "Congratulations · Mother's Day · Housewarming",
    is_bestseller: false,
    sort_order: 3,
    imageFile: "bouquet_010.jpeg",
  },
  {
    slug: "everyday-cheer-bunch",
    name: "Everyday Cheer Bunch",
    category_label: "Mixed Bouquets · Bestseller",
    price_ugx: 65000,
    description:
      "A delightful, compact bunch of vibrant mixed daisies, carnations, and spray roses to brighten anyone's everyday space.",
    best_for: "Just Because · Birthdays · Thank You",
    is_bestseller: true,
    sort_order: 4,
    imageFile: "bouquet_002.jpeg",
  },
  {
    slug: "garden-rose",
    name: "Garden Rose Bouquet",
    category_label: "Signature Bouquet",
    price_ugx: 45000,
    description:
      "A gathering of soft pink garden roses, hand-tied and finished in cream ribbon. Romantic, tender, and quietly luxurious.",
    best_for: "Anniversaries · Birthdays · Just because",
    is_bestseller: false,
    sort_order: 5,
    imageFile: "bouquet_garden_roses.jpeg",
  },
  {
    slug: "luxe-pack",
    name: "Luxe Floral Pack",
    category_label: "Statement Arrangement",
    price_ugx: 62000,
    description:
      "Velvet burgundy roses set against deep foliage. A moody, editorial arrangement for those who love drama with their romance.",
    best_for: "Milestones · Gifting · Editorial styling",
    is_bestseller: false,
    sort_order: 6,
    imageFile: "bouquet_006.jpeg",
  },
  {
    slug: "ivory-bridal",
    name: "Ivory Bridal Cluster",
    category_label: "Bridal Bouquet",
    price_ugx: 85000,
    description:
      "Cream garden roses with soft foliage in a rounded, timeless silhouette. Made to walk down the aisle.",
    best_for: "Weddings · Elopements · Bridal shoots",
    is_bestseller: false,
    sort_order: 7,
    imageFile: "bouquet_bridal.jpeg",
  },
  {
    slug: "garden-pastel",
    name: "Garden Pastel",
    category_label: "Signature Bouquet",
    price_ugx: 52000,
    description:
      "A wild, garden-picked gathering of pastel roses, ranunculus and trailing greenery. Soft, unstructured, endlessly pretty.",
    best_for: "Housewarmings · Thank-yous · Sunday tables",
    is_bestseller: false,
    sort_order: 8,
    imageFile: "product-garden.jpg",
  },
];

function guessContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

async function seed(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not defined in your .env file.");
    process.exit(1);
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN is not defined in your .env file.");
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  await client.connect();
  console.log("Connected to Neon.");

  let inserted = 0;
  let skipped = 0;

  for (const p of SEED_PRODUCTS) {
    const existing = await client.query(
      "SELECT id FROM products WHERE slug = $1",
      [p.slug]
    );
    if ((existing.rowCount ?? 0) > 0) {
      console.log(`⏭  Skipping "${p.slug}" — already exists.`);
      skipped++;
      continue;
    }

    const imagePath = path.join(ASSETS_DIR, p.imageFile);
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Image not found for "${p.slug}": ${imagePath}. Skipping.`);
      skipped++;
      continue;
    }

    console.log(`⬆  Uploading image for "${p.slug}"...`);
    const fileBuffer = fs.readFileSync(imagePath);
    const blob = await put(`products/${p.slug}-${p.imageFile}`, fileBuffer, {
      access: "public",
      contentType: guessContentType(p.imageFile),
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    await client.query(
      `INSERT INTO products (
         slug, name, category_label, price_ugx, description, best_for,
         image_url, is_bestseller, is_active, sort_order
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, $9)`,
      [
        p.slug,
        p.name,
        p.category_label,
        p.price_ugx,
        p.description,
        p.best_for,
        blob.url,
        p.is_bestseller,
        p.sort_order,
      ]
    );

    console.log(`✅ Seeded "${p.slug}" → ${blob.url}`);
    inserted++;
  }

  await client.end();
  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}.`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
