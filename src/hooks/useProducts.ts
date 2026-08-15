import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/lib/products";
import { getProducts, adminListProducts } from "@/lib/cms.functions";
import type { ProductRow } from "@/lib/db/products.server";

// Public: active products for the storefront (catalogue, home, product detail).
// `initialData` starts as an empty array so pages render immediately without
// a loading flash, then swap in live DB data as soon as the query resolves —
// same pattern as useHero()/useContact() in useSiteContent.ts.
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    initialData: [] as Product[],
    staleTime: 60_000,
  });
}

export function useProduct(id: string | undefined) {
  const { data: products, ...rest } = useProducts();
  const product = products.find((p) => p.id === id) ?? products[0];
  return { ...rest, data: product, products };
}

// Admin: full rows including is_active/sort_order/etc, for the dashboard table.
export function useAdminProducts() {
  return useQuery<ProductRow[]>({
    queryKey: ["admin", "products"],
    queryFn: () => adminListProducts(),
  });
}

export function useInvalidateProducts() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["admin", "products"] });
  };
}

export type { Product };
