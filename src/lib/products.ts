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
