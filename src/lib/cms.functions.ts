// import { put, del } from "@vercel/blob";
// import { createServerFn } from "@tanstack/react-start";
// import { z } from "zod";
// import {
//   defaultHero,
//   defaultContact,
//   defaultServices,
//   type HeroContent,
//   type ContactContent,
//   type ServicesContent,
// } from "@/lib/content-defaults";
// import { fetchSiteContent, upsertSiteContent } from "@/lib/db/site-content.server";
// import {
//   listGalleryItems,
//   countGalleryItems,
//   insertGalleryItem,
//   updateGalleryItem,
//   deleteGalleryItem,
//   type GalleryItem,
// } from "@/lib/db/gallery.server";
// import { userHasRole } from "@/lib/db/roles.server";
// import { getAuthenticatedUserId, requireAdminUser } from "@/lib/db/auth.server";
// import {
//   listActiveProducts,
//   listAllProductsAdmin,
//   insertProduct,
//   updateProduct,
//   deleteProduct,
//   type ProductInput,
// } from "@/lib/db/products.server";
// import { validateMediaFile } from "@/lib/media";

// export type { GalleryItem };

// // ── Shared Vercel Blob Helper ────────────────────────────────────────────────

// // Allowlist of blob folders callers may target — the folder is client-supplied,
// // so this stops an arbitrary/attacker-controlled path from being written into
// // the blob store even though these endpoints already require an admin session.
// const ALLOWED_BLOB_FOLDERS = ["uploads", "products", "gallery/images", "gallery/videos"] as const;

// function resolveBlobFolder(requested: string): string {
//   return (ALLOWED_BLOB_FOLDERS as readonly string[]).includes(requested) ? requested : "uploads";
// }

// // Real hostname check rather than a substring match — a URL like
// // "https://evil.example.com/?x=vercel-storage.com" would pass `.includes()`
// // but must not be treated as one of our own blobs.
// function isVercelBlobUrl(url: string): boolean {
//   try {
//     const { hostname } = new URL(url);
//     return hostname.endsWith("vercel-storage.com") || hostname.endsWith("blob.vercel-storage.com");
//   } catch {
//     return false;
//   }
// }

// async function uploadFileToVercelBlob(file: File, folder: string) {
//   validateMediaFile(file);

//   const token = process.env.BLOB_READ_WRITE_TOKEN;
//   if (!token) {
//     throw new Error("BLOB_READ_WRITE_TOKEN is not configured in environment variables");
//   }

//   const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
//   const pathname = `${folder}/${Date.now()}-${cleanFilename}`;

//   return put(pathname, file, {
//     access: "public",
//     token,
//   });
// }

// // ── Vercel Blob server functions ─────────────────────────────────────────────

// export const adminUploadToBlob = createServerFn({ method: "POST" })
//   .validator((formData: unknown) => {
//     if (!(formData instanceof FormData)) {
//       throw new Error("Expected FormData");
//     }
//     return formData;
//   })
//   .handler(async ({ data }) => {
//     await requireAdminUser();
//     const file = data.get("file");
//     const folder = resolveBlobFolder((data.get("folder") as string) || "uploads");
//     if (!file || !(file instanceof File)) {
//       throw new Error("No valid file provided");
//     }

//     const blob = await uploadFileToVercelBlob(file, folder);
//     return {
//       url: blob.url,
//       pathname: blob.pathname,
//       contentType: blob.contentType,
//     };
//   });

// export const adminUploadGalleryMedia = createServerFn({ method: "POST" })
//   .validator((formData: unknown) => {
//     if (!(formData instanceof FormData)) {
//       throw new Error("Expected FormData");
//     }
//     return formData;
//   })
//   .handler(async ({ data }) => {
//     const userId = await requireAdminUser();
//     const file = data.get("file");
//     const title = (data.get("title") as string) || null;
//     const altText = (data.get("alt_text") as string) || null;
//     const caption = (data.get("caption") as string) || null;

//     if (!file || !(file instanceof File)) {
//       throw new Error("No valid file provided");
//     }

//     const { isImage } = validateMediaFile(file);
//     const folder = isImage ? "gallery/images" : "gallery/videos";
//     const blob = await uploadFileToVercelBlob(file, folder);

//     const item = await insertGalleryItem({
//       kind: isImage ? "image" : "video",
//       storage_path: blob.pathname,
//       public_url: blob.url,
//       title: title || file.name,
//       alt_text: altText,
//       caption: caption,
//       created_by: userId,
//     });

//     return item;
//   });

// // ── Public reads ─────────────────────────────────────────────────────────────

// export const getHeroContent = createServerFn({ method: "GET" }).handler(async () => {
//   const value = await fetchSiteContent<HeroContent>("hero");
//   return value ?? defaultHero;
// });

// export const getContactContent = createServerFn({ method: "GET" }).handler(async () => {
//   const value = await fetchSiteContent<ContactContent>("contact");
//   return value ?? defaultContact;
// });

// export const getServicesContent = createServerFn({ method: "GET" }).handler(async () => {
//   const value = await fetchSiteContent<ServicesContent>("services");
//   return value ?? defaultServices;
// });

// export const getPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
//   const items = await listGalleryItems();
//   return items.map(({ id, kind, public_url, title, alt_text, caption }) => ({
//     id,
//     kind,
//     public_url,
//     title,
//     alt_text,
//     caption,
//   }));
// });

// export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
//   return listActiveProducts();
// });
// // export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
// //   console.log("DATABASE_URL present?", !!process.env.DATABASE_URL);
// //   try {
// //     const result = await listActiveProducts();
// //     console.log("getProducts returned:", result.length, "rows");
// //     return result;
// //   } catch (err) {
// //     console.error("getProducts failed:", err);
// //     throw err;
// //   }
// // });

// // ── Auth checks ───────────────────────────────────────────────────────────────

// export const checkIsAdmin = createServerFn({ method: "GET" }).handler(async () => {
//   const userId = await getAuthenticatedUserId();
//   if (!userId) return false;
//   return userHasRole(userId, "admin");
// });

// // ── Admin: site content ───────────────────────────────────────────────────────

// const contentKeySchema = z.object({
//   key: z.enum(["hero", "contact", "services"]),
//   value: z.unknown(),
// });

// export const saveSiteContent = createServerFn({ method: "POST" })
//   .validator(contentKeySchema)
//   .handler(async ({ data }) => {
//     const userId = await requireAdminUser();
//     await upsertSiteContent(data.key, data.value, userId);
//   });

// // ── Admin: gallery ────────────────────────────────────────────────────────────

// export const adminListGallery = createServerFn({ method: "GET" }).handler(async () => {
//   await requireAdminUser();
//   return listGalleryItems();
// });

// export const adminGalleryCount = createServerFn({ method: "GET" }).handler(async () => {
//   await requireAdminUser();
//   return countGalleryItems();
// });

// const galleryUpdateSchema = z.object({
//   id: z.string().uuid(),
//   title: z.string().nullable().optional(),
//   alt_text: z.string().nullable().optional(),
//   caption: z.string().nullable().optional(),
//   sort_order: z.number().optional(),
// });

// export const adminUpdateGalleryItem = createServerFn({ method: "POST" })
//   .validator(galleryUpdateSchema)
//   .handler(async ({ data }) => {
//     await requireAdminUser();
//     const { id, ...patch } = data;
//     await updateGalleryItem(id, patch);
//   });

// export const adminDeleteGalleryItem = createServerFn({ method: "POST" })
//   .validator(z.object({ id: z.string().uuid() }))
//   .handler(async ({ data }) => {
//     await requireAdminUser();
//     const deleted = await deleteGalleryItem(data.id);
//     if (!deleted) throw new Error("Gallery item not found");

//     if (deleted.public_url && isVercelBlobUrl(deleted.public_url)) {
//       try {
//         const token = process.env.BLOB_READ_WRITE_TOKEN;
//         await del(deleted.public_url, { token });
//       } catch (err) {
//         console.error("Failed to delete blob from Vercel storage:", err);
//       }
//     }
//     return deleted;
//   });

// // ── Admin: products ───────────────────────────────────────────────────────────

// export const adminListProducts = createServerFn({ method: "GET" }).handler(async () => {
//   await requireAdminUser();
//   return listAllProductsAdmin();
// });

// const productInputSchema = z.object({
//   slug: z
//     .string()
//     .min(1)
//     .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
//   name: z.string().min(1),
//   category_label: z.string().nullable().optional(),
//   price_ugx: z.number().int().nonnegative(),
//   description: z.string().optional(),
//   best_for: z.string().nullable().optional(),
//   image_url: z.string().url(),
//   is_bestseller: z.boolean().optional(),
//   is_active: z.boolean().optional(),
//   sort_order: z.number().int().optional(),
// });

// export const adminCreateProduct = createServerFn({ method: "POST" })
//   .validator(productInputSchema)
//   .handler(async ({ data }) => {
//     await requireAdminUser();
//     return insertProduct(data as ProductInput);
//   });

// export const adminUpdateProduct = createServerFn({ method: "POST" })
//   .validator(productInputSchema.partial().extend({ id: z.string().uuid() }))
//   .handler(async ({ data }) => {
//     await requireAdminUser();
//     const { id, ...patch } = data;
//     const updated = await updateProduct(id, patch);
//     if (!updated) throw new Error("Product not found");
//     return updated;
//   });

// export const adminDeleteProduct = createServerFn({ method: "POST" })
//   .validator(z.object({ id: z.string().uuid() }))
//   .handler(async ({ data }) => {
//     await requireAdminUser();
//     const deleted = await deleteProduct(data.id);
//     if (!deleted) throw new Error("Product not found");
//     return deleted;
//   });

import { put, del } from "@vercel/blob";
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
import { createEnquiry, listEnquiriesAdmin, updateEnquiryStatus } from "@/lib/db/enquiries.server";
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

    if (!file || !(file instanceof File)) {
      throw new Error("No valid file provided");
    }

    const { isImage } = validateMediaFile(file);
    const folder = isImage ? "gallery/images" : "gallery/videos";
    const blob = await uploadFileToVercelBlob(file, folder);

    const item = await insertGalleryItem({
      kind: isImage ? "image" : "video",
      storage_path: blob.pathname,
      public_url: blob.url,
      title: title || file.name,
      alt_text: altText,
      caption: caption,
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
