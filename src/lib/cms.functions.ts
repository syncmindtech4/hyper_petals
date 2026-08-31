import { put, del } from "@vercel/blob";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  defaultHero,
  defaultContact,
  type HeroContent,
  type ContactContent,
} from "@/lib/content-defaults";
import { fetchSiteContent, upsertSiteContent } from "@/lib/db/site-content.server";
import {
  listGalleryItems,
  listGalleryItemsByOccasion,
  countGalleryItems,
  insertGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  type GalleryItem,
} from "@/lib/db/gallery.server";
import { isOccasionSlug } from "@/lib/occasions";
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
import { createEnquiry, listEnquiriesAdmin, updateEnquiryStatus } from "@/lib/db/enquiries.server";
import {
  createOrder,
  listOrdersAdmin,
  updateOrderStatus,
  getOrderById,
  markOrderWhatsAppSent as markOrderWhatsAppSentDb,
  getOrderGroup,
  markGroupWhatsAppSent as markGroupWhatsAppSentDb,
} from "@/lib/db/orders.server";
import {
  listActiveDeliveryLocations,
  validatePromoCode as validatePromoCodeDb,
  incrementPromoRedemption,
} from "@/lib/db/checkout.server";
import { isPaymentConfigured } from "@/lib/payments/index.server";
import { getProductIdBySlug } from "@/lib/db/products.server";
import { FLOWER_TYPES, STYLES, OCCASIONS, ARRANGEMENT_STYLES } from "@/lib/bouquet-customization";
import { validateMediaFile } from "@/lib/media";

export type { GalleryItem };

// ── Shared Vercel Blob Helper ────────────────────────────────────────────────

async function uploadFileToVercelBlob(file: File, folder: string) {
  validateMediaFile(file);

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured in environment variables");
  }

  const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const pathname = `${folder}/${Date.now()}-${cleanFilename}`;

  return put(pathname, file, {
    access: "public",
    token,
  });
}

// ── Vercel Blob server functions ─────────────────────────────────────────────

export const adminUploadToBlob = createServerFn({ method: "POST" })
  .validator((formData: unknown) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Expected FormData");
    }
    return formData;
  })
  .handler(async ({ data }) => {
    await requireAdminUser();
    const file = data.get("file");
    const folder = (data.get("folder") as string) || "uploads";
    if (!file || !(file instanceof File)) {
      throw new Error("No valid file provided");
    }

    const blob = await uploadFileToVercelBlob(file, folder);
    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
    };
  });

export const adminUploadGalleryMedia = createServerFn({ method: "POST" })
  .validator((formData: unknown) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Expected FormData");
    }
    return formData;
  })
  .handler(async ({ data }) => {
    const userId = await requireAdminUser();
    const file = data.get("file");
    const title = (data.get("title") as string) || null;
    const altText = (data.get("alt_text") as string) || null;
    const caption = (data.get("caption") as string) || null;
    const occasionRaw = (data.get("occasion") as string) || null;
    // Validated server-side too, not just in the admin dropdown — don't
    // trust an arbitrary string from FormData as an occasion tag.
    const occasion = occasionRaw && isOccasionSlug(occasionRaw) ? occasionRaw : null;

    if (!file || !(file instanceof File)) {
      throw new Error("No valid file provided");
    }

    const { isImage } = validateMediaFile(file);
    // Nested by occasion purely so the Blob dashboard is browsable by eye —
    // this has no effect on the app itself, which always filters by the
    // `occasion` column in Postgres, never by storage path.
    const folder = `gallery/${isImage ? "images" : "videos"}/${occasion ?? "general"}`;
    const blob = await uploadFileToVercelBlob(file, folder);

    const item = await insertGalleryItem({
      kind: isImage ? "image" : "video",
      storage_path: blob.pathname,
      public_url: blob.url,
      title: title || file.name,
      alt_text: altText,
      caption: caption,
      occasion,
      created_by: userId,
    });

    return item;
  });

// ── Public reads ─────────────────────────────────────────────────────────────

export const getHeroContent = createServerFn({ method: "GET" }).handler(async () => {
  const value = await fetchSiteContent<HeroContent>("hero");
  return value ?? defaultHero;
});

export const getContactContent = createServerFn({ method: "GET" }).handler(async () => {
  const value = await fetchSiteContent<ContactContent>("contact");
  return value ?? defaultContact;
});

export const getPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
  const items = await listGalleryItems();
  return items.map(({ id, kind, public_url, title, alt_text, caption, occasion }) => ({
    id,
    kind,
    public_url,
    title,
    alt_text,
    caption,
    occasion,
  }));
});

// Public: gallery items for one occasion page (e.g. src/routes/occasions.kwanjula.tsx).
const occasionGallerySchema = z.object({ occasion: z.string().trim().min(1).max(100) });

export const getGalleryByOccasion = createServerFn({ method: "GET" })
  .validator(occasionGallerySchema)
  .handler(async ({ data }) => {
    if (!isOccasionSlug(data.occasion)) return [];
    const items = await listGalleryItemsByOccasion(data.occasion);
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

// ── Public: contact form ────────────────────────────────────────────────────

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(50).optional(),
  enquiryType: z.string().trim().min(1).max(50),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator(enquirySchema)
  .handler(async ({ data }) => {
    const enquiry = await createEnquiry(data);
    return { id: enquiry.id };
  });

// ── Admin: enquiries ─────────────────────────────────────────────────────────

export const adminListEnquiries = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminUser();
  return listEnquiriesAdmin();
});

const enquiryStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "read", "archived"]),
});

export const adminUpdateEnquiryStatus = createServerFn({ method: "POST" })
  .validator(enquiryStatusSchema)
  .handler(async ({ data }) => {
    await requireAdminUser();
    await updateEnquiryStatus(data.id, data.status);
    return { ok: true };
  });

// ── Public: orders (confirmed via product-detail "Order via WhatsApp") ─────────

const orderAddOnSchema = z.object({
  name: z.string().trim().min(1).max(200),
  price: z.number().min(0),
});

const customizationSchema = z.object({
  flowerType: z.enum(FLOWER_TYPES).nullable(),
  style: z.enum(STYLES).nullable(),
  colors: z.array(z.string()),
  occasion: z.enum(OCCASIONS).nullable(),
  arrangementStyle: z.enum(ARRANGEMENT_STYLES).nullable(),
});

const orderSchema = z.object({
  // Shared across every line item submitted from the same checkout (a cart
  // with several products = several submitOrder calls with the same
  // groupId), so the success page can show/confirm them together. Omit for
  // single-item flows (e.g. product-detail) — the DB generates one.
  groupId: z.string().uuid().optional(),
  // The frontend's Product.id is actually the slug (see toPublicProduct in
  // products.server.ts) — resolved to the real products.id UUID below,
  // server-side, before it's used as a foreign key.
  productSlug: z.string().trim().min(1).max(300).optional(),
  productName: z.string().trim().min(1).max(300),
  size: z.string().trim().min(1).max(100),
  sizePriceUgx: z.number().min(0),
  quantity: z.number().int().min(1).max(50),
  addOns: z.array(orderAddOnSchema).default([]),
  customization: customizationSchema.nullish(),
  isGift: z.boolean().default(false),
  recipientName: z.string().trim().max(200).optional(),
  recipientPhone: z.string().trim().max(50).optional(),
  giftMessage: z.string().trim().max(1000).optional(),
  deliveryLocation: z.string().trim().min(1).max(300),
  deliveryDate: z.string().trim().min(1).max(100),
  deliveryFeeUgx: z.number().min(0).default(0),
  promoCode: z.string().trim().max(50).optional(),
  discountUgx: z.number().min(0).default(0),
  totalPriceUgx: z.number().min(0),
  paymentMethod: z.enum(["momo", "airtel_money", "card", "cash_on_delivery"]).optional(),
});

export const submitOrder = createServerFn({ method: "POST" })
  .validator(orderSchema)
  .handler(async ({ data }) => {
    const { productSlug, ...rest } = data;
    // Best-effort lookup — if the slug doesn't resolve (e.g. product was
    // since deleted), the order still saves with productId: null; product
    // name/price/etc are already captured directly on the row regardless.
    const productId = productSlug ? await getProductIdBySlug(productSlug) : undefined;
    const order = await createOrder({ ...rest, productId: productId ?? undefined });
    // Best-effort: don't fail the order if this update hiccups — the code
    // still validated and applied correctly for the customer either way.
    if (rest.promoCode) {
      incrementPromoRedemption(rest.promoCode).catch((err) =>
        console.error("incrementPromoRedemption failed:", err),
      );
    }
    return { id: order.id, groupId: order.group_id };
  });

// Public: fetch one order for the post-checkout success page. `id` is a
// UUID acting as a capability token — see getOrderById for the trust model.
const orderIdSchema = z.object({ id: z.string().uuid() });

export const getOrder = createServerFn({ method: "GET" })
  .validator(orderIdSchema)
  .handler(async ({ data }) => {
    return getOrderById(data.id);
  });

export const markOrderWhatsAppSent = createServerFn({ method: "POST" })
  .validator(orderIdSchema)
  .handler(async ({ data }) => {
    await markOrderWhatsAppSentDb(data.id);
    return { ok: true };
  });

// Public: fetch every line item from one checkout (cart with several
// products). Same capability-token model as getOrder above.
const groupIdSchema = z.object({ groupId: z.string().uuid() });

export const getOrderGroupItems = createServerFn({ method: "GET" })
  .validator(groupIdSchema)
  .handler(async ({ data }) => {
    return getOrderGroup(data.groupId);
  });

export const markOrderGroupWhatsAppSent = createServerFn({ method: "POST" })
  .validator(groupIdSchema)
  .handler(async ({ data }) => {
    await markGroupWhatsAppSentDb(data.groupId);
    return { ok: true };
  });

// ── Public: checkout data (delivery locations, promo codes) ────────────────

export const getDeliveryLocations = createServerFn({ method: "GET" }).handler(async () => {
  return listActiveDeliveryLocations();
});

const promoCodeCheckSchema = z.object({ code: z.string().trim().min(1).max(50) });

export const validatePromoCode = createServerFn({ method: "POST" })
  .validator(promoCodeCheckSchema)
  .handler(async ({ data }) => {
    return validatePromoCodeDb(data.code);
  });

// Lets checkout.tsx know whether a real payment gateway is wired up yet.
// Today this always returns false until Flutterwave (or whichever
// processor the client picks) has real API keys in .env — see
// src/lib/payments/flutterwave.server.ts. Until then, checkout saves
// orders as pending and confirms payment manually over WhatsApp, the same
// as the product-detail flow.
export const checkPaymentConfigured = createServerFn({ method: "GET" }).handler(async () => {
  return { configured: isPaymentConfigured() };
});

// ── Admin: orders ────────────────────────────────────────────────────────────

export const adminListOrders = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminUser();
  return listOrdersAdmin();
});

const orderStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "confirmed", "fulfilled", "cancelled"]),
});

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .validator(orderStatusSchema)
  .handler(async ({ data }) => {
    await requireAdminUser();
    await updateOrderStatus(data.id, data.status);
    return { ok: true };
  });

// ── Auth checks ───────────────────────────────────────────────────────────────

export const checkIsAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const userId = await getAuthenticatedUserId();
  if (!userId) return false;
  return userHasRole(userId, "admin");
});

// ── Admin: site content ───────────────────────────────────────────────────────

const contentKeySchema = z.object({
  key: z.enum(["hero", "contact"]),
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

const galleryUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nullable().optional(),
  alt_text: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  occasion: z.string().nullable().optional(),
  sort_order: z.number().optional(),
});

export const adminUpdateGalleryItem = createServerFn({ method: "POST" })
  .validator(galleryUpdateSchema)
  .handler(async ({ data }) => {
    await requireAdminUser();
    const { id, occasion, ...rest } = data;
    // Same server-side validation as the upload handler — don't trust an
    // arbitrary string as an occasion tag, but allow explicit null (clears
    // the tag back to "general/unsorted").
    const cleanOccasion =
      occasion === null ? null : occasion && isOccasionSlug(occasion) ? occasion : undefined;
    await updateGalleryItem(id, {
      ...rest,
      ...(cleanOccasion !== undefined ? { occasion: cleanOccasion } : {}),
    });
  });

export const adminDeleteGalleryItem = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminUser();
    const deleted = await deleteGalleryItem(data.id);
    if (!deleted) throw new Error("Gallery item not found");

    if (
      deleted.public_url &&
      (deleted.public_url.includes("vercel-storage.com") ||
        deleted.public_url.includes("blob.vercel"))
    ) {
      try {
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        await del(deleted.public_url, { token });
      } catch (err) {
        console.error("Failed to delete blob from Vercel storage:", err);
      }
    }
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
