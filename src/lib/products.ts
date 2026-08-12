// import garden_rose from "@/assets/bouquet_garden_roses.jpeg";
// import luxe from "@/assets/bouquet_006.jpeg";
// import bridal from "@/assets/bouquet_bridal.jpeg";
// import garden from "@/assets/product-garden.jpg";

// import wine_blush from "@/assets/bouquet_006.jpeg";
// import red_roses from "@/assets/bouquet_004.jpeg";
// import sunrise from "@/assets/bouquet_013.jpeg";
// import gift_basket from "@/assets/bouquet_010.jpeg";
// import cheer_bunch from "@/assets/bouquet_002.jpeg";

// export type Product = {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   description: string;
//   bestFor: string;
//   isBestseller?: boolean;
// };

// // Fallback/seed data. The live site reads products from the database
// // (see src/hooks/useProducts.ts) — this array is only used as `initialData`
// // so pages render instantly before the DB read resolves, and as a safety
// // net if the DB is briefly unreachable. Edit products via /admin/products,
// // not here.
// export const defaultProducts: Product[] = [
//   {
//     id: "wine-blush-dozen",
//     name: "Wine & Blush Dozen",
//     category: "Roses · Bestseller",
//     price: 110000,
//     image: wine_blush,
//     description:
//       "A dozen curated roses blending rich wine red and soft blush pink hues. Elegant, aromatic, and perfectly hand-tied with a satin ribbon.",
//     bestFor: "Anniversaries · Birthdays · Romantic Gestures",
//   },
//   {
//     id: "two-dozen-red-roses",
//     name: "Two Dozen Red Roses",
//     category: "Roses",
//     price: 190000,
//     image: red_roses,
//     description:
//       "Twenty-four premium long-stemmed red roses arranged with structural eucalyptus. The ultimate expression of classic luxury and deep affection.",
//     bestFor: "Anniversaries · Celebrations · Apologies",
//   },
//   {
//     id: "sunrise-mixed-bouquet",
//     name: "Sunrise Mixed Bouquet",
//     category: "Mixed Bouquets",
//     price: 95000,
//     image: sunrise,
//     description:
//       "A bright, warm selection of peach roses, golden chrysanthemums, and fresh summer greenery that mimics a Ugandan dawn.",
//     bestFor: "Get Well · Congratulations · Just Because",
//   },
//   {
//     id: "garden-gift-basket",
//     name: "Garden Gift Basket",
//     category: "Baskets",
//     price: 160000,
//     image: gift_basket,
//     description:
//       "A lush array of spray roses, lilies, and wildflowers arranged in a rustic woven basket. A perfect centerpiece or home-warming gift.",
//     bestFor: "Congratulations · Mother's Day · Housewarming",
//   },
//   {
//     id: "everyday-cheer-bunch",
//     name: "Everyday Cheer Bunch",
//     category: "Mixed Bouquets · Bestseller",
//     price: 65000,
//     image: cheer_bunch,
//     description:
//       "A delightful, compact bunch of vibrant mixed daisies, carnations, and spray roses to brighten anyone's everyday space.",
//     bestFor: "Just Because · Birthdays · Thank You",
//   },
//   {
//     id: "garden-rose",
//     name: "Garden Rose Bouquet",
//     category: "Signature Bouquet",
//     price: 45000,
//     image: garden_rose,
//     description:
//       "A gathering of soft pink garden roses, hand-tied and finished in cream ribbon. Romantic, tender, and quietly luxurious.",
//     bestFor: "Anniversaries · Birthdays · Just because",
//   },
//   {
//     id: "luxe-pack",
//     name: "Luxe Floral Pack",
//     category: "Statement Arrangement",
//     price: 62000,
//     image: luxe,
//     description:
//       "Velvet burgundy roses set against deep foliage. A moody, editorial arrangement for those who love drama with their romance.",
//     bestFor: "Milestones · Gifting · Editorial styling",
//   },
//   {
//     id: "ivory-bridal",
//     name: "Ivory Bridal Cluster",
//     category: "Bridal Bouquet",
//     price: 85000,
//     image: bridal,
//     description:
//       "Cream garden roses with soft foliage in a rounded, timeless silhouette. Made to walk down the aisle.",
//     bestFor: "Weddings · Elopements · Bridal shoots",
//   },
//   {
//     id: "garden-pastel",
//     name: "Garden Pastel",
//     category: "Signature Bouquet",
//     price: 52000,
//     image: garden,
//     description:
//       "A wild, garden-picked gathering of pastel roses, ranunculus and trailing greenery. Soft, unstructured, endlessly pretty.",
//     bestFor: "Housewarmings · Thank-yous · Sunday tables",
//   },
// ];

// // Back-compat alias — prefer `useProducts()` from "@/hooks/useProducts" for
// // anything user-facing, since that reads live data from the database.
// export const products = defaultProducts;

// export const formatUGX = (n: number) =>
//   new Intl.NumberFormat("en-UG", {
//     style: "currency",
//     currency: "UGX",
//     maximumFractionDigits: 0,
//   }).format(n);

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  bestFor: string;
  isBestseller?: boolean;
};

// Products are read live from the database — see src/hooks/useProducts.ts
// and src/lib/db/products.server.ts. Manage them via /admin/products.
// No hardcoded fallback data lives here anymore; useProducts() starts
// with an empty array as initialData while the first DB read resolves.

export const formatUGX = (n: number) =>
  new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(n);
