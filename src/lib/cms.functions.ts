import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  defaultHero,
  defaultContact,
  defaultServices,
  type HeroContent,
  type ContactContent,
  type ServicesContent,
} from "@/lib/content-defaults";
import { fetchSiteContent, upsertSiteContent } from "@/lib/db/site-content.server";
import {
  listGalleryItems,
  countGalleryItems,
  insertGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  type GalleryItem,
  type GalleryItemInput,
} from "@/lib/db/gallery.server";
import { userHasRole } from "@/lib/db/roles.server";
import { getAuthenticatedUserId, requireAdminUser } from "@/lib/db/auth.server";
import {
  listActiveProducts,
  listAllProductsAdmin,
  insertProduct,
  updateProduct,
  deleteProduct,
  type ProductInput,
} from "@/lib/db/products.server";

export type { GalleryItem };

// ── Public reads ─────────────────────────────────────────────────────────────

export const getHeroContent = createServerFn({ method: "GET" }).handler(async () => {
  const value = await fetchSiteContent<HeroContent>("hero");
  return value ?? defaultHero;
});

export const getContactContent = createServerFn({ method: "GET" }).handler(async () => {
  const value = await fetchSiteContent<ContactContent>("contact");
  return value ?? defaultContact;
});

export const getServicesContent = createServerFn({ method: "GET" }).handler(async () => {
  const value = await fetchSiteContent<ServicesContent>("services");
  return value ?? defaultServices;
});

export const getPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
  const items = await listGalleryItems();
  return items.map(({ id, kind, public_url, title, alt_text, caption }) => ({
    id,
    kind,
    public_url,
    title,
    alt_text,
    caption,
  }));
});

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  return listActiveProducts();
});

// ── Auth checks ───────────────────────────────────────────────────────────────

export const checkIsAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const userId = await getAuthenticatedUserId();
  if (!userId) return false;
  return userHasRole(userId, "admin");
});

// ── Admin: site content ───────────────────────────────────────────────────────

const contentKeySchema = z.object({
  key: z.enum(["hero", "contact", "services"]),
  value: z.unknown(),
});

export const saveSiteContent = createServerFn({ method: "POST" })
  .validator(contentKeySchema)
  .handler(async ({ data }) => {
    const userId = await requireAdminUser();
    await upsertSiteContent(data.key, data.value, userId);
  });

// ── Admin: gallery ────────────────────────────────────────────────────────────

export const adminListGallery = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminUser();
  return listGalleryItems();
});

export const adminGalleryCount = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminUser();
  return countGalleryItems();
});

const galleryInsertSchema = z.object({
  kind: z.enum(["image", "video"]),
  storage_path: z.string().min(1),
  public_url: z.string().url(),
  title: z.string().nullable().optional(),
  alt_text: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  sort_order: z.number().optional(),
});

export const adminCreateGalleryItem = createServerFn({ method: "POST" })
  .validator(galleryInsertSchema)
  .handler(async ({ data }) => {
    const userId = await requireAdminUser();
    const input: GalleryItemInput = { ...data, created_by: userId };
    return insertGalleryItem(input);
  });

const galleryUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nullable().optional(),
  alt_text: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  sort_order: z.number().optional(),
});

export const adminUpdateGalleryItem = createServerFn({ method: "POST" })
  .validator(galleryUpdateSchema)
  .handler(async ({ data }) => {
    await requireAdminUser();
    const { id, ...patch } = data;
    await updateGalleryItem(id, patch);
  });

export const adminDeleteGalleryItem = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminUser();
    const deleted = await deleteGalleryItem(data.id);
    if (!deleted) throw new Error("Gallery item not found");
    return deleted;
  });

// ── Admin: products ───────────────────────────────────────────────────────────

export const adminListProducts = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminUser();
  return listAllProductsAdmin();
});

const productInputSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1),
  category_label: z.string().nullable().optional(),
  price_ugx: z.number().int().nonnegative(),
  description: z.string().optional(),
  best_for: z.string().nullable().optional(),
  image_url: z.string().min(1),
  is_bestseller: z.boolean().optional(),
  is_active: z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export const adminCreateProduct = createServerFn({ method: "POST" })
  .validator(productInputSchema)
  .handler(async ({ data }) => {
    await requireAdminUser();
    return insertProduct(data as ProductInput);
  });

export const adminUpdateProduct = createServerFn({ method: "POST" })
  .validator(productInputSchema.partial().extend({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminUser();
    const { id, ...patch } = data;
    const updated = await updateProduct(id, patch);
    if (!updated) throw new Error("Product not found");
    return updated;
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminUser();
    const deleted = await deleteProduct(data.id);
    if (!deleted) throw new Error("Product not found");
    return deleted;
  });
