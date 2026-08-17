import { n as defaultHero, r as defaultServices, t as defaultContact } from "./content-defaults-CfGnnh1v.mjs";
import { c as createServerFn } from "./esm-C9N-ta7K.mjs";
import { a as stringType, i as objectType, n as enumType, o as unknownType, r as numberType, t as booleanType } from "../_libs/zod.mjs";
import { n as createServerRpc } from "./auth-BXgARgBJ.mjs";
import { i as userHasRole, n as getSql, r as requireAdminUser, t as getAuthenticatedUserId } from "./auth.server-dwEa7WCj.mjs";
import { n as validateMediaFile } from "./media-CqgNq6ku.mjs";
import { n as put, t as del } from "../_libs/@vercel/blob+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.functions-Cw-u0ERs.js
async function fetchSiteContent(key) {
	const row = (await getSql()`SELECT value FROM site_content WHERE key = ${key} LIMIT 1`)[0];
	return row ? row.value : null;
}
async function upsertSiteContent(key, value, updatedBy) {
	await getSql()`
    INSERT INTO site_content (key, value, updated_by, updated_at)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb, ${updatedBy ?? null}, now())
    ON CONFLICT (key) DO UPDATE SET
      value = EXCLUDED.value,
      updated_by = EXCLUDED.updated_by,
      updated_at = now()
  `;
}
async function listGalleryItems() {
	return await getSql()`
    SELECT id, kind, storage_path, public_url, title, alt_text, caption, sort_order, created_at, created_by
    FROM gallery_items
    ORDER BY sort_order ASC, created_at DESC
  `;
}
async function countGalleryItems() {
	return (await getSql()`SELECT COUNT(*)::int AS count FROM gallery_items`)[0].count;
}
async function insertGalleryItem(input) {
	return (await getSql()`
    INSERT INTO gallery_items (kind, storage_path, public_url, title, alt_text, caption, sort_order, created_by)
    VALUES (
      ${input.kind},
      ${input.storage_path},
      ${input.public_url},
      ${input.title ?? null},
      ${input.alt_text ?? null},
      ${input.caption ?? null},
      ${input.sort_order ?? 0},
      ${input.created_by ?? null}
    )
    RETURNING id, kind, storage_path, public_url, title, alt_text, caption, sort_order, created_at, created_by
  `)[0];
}
async function updateGalleryItem(id, patch) {
	const sql = getSql();
	const existing = (await sql`
    SELECT title, alt_text, caption, sort_order FROM gallery_items WHERE id = ${id}::uuid
  `)[0];
	if (!existing) return;
	const merged = {
		title: patch.title !== void 0 ? patch.title : existing.title,
		alt_text: patch.alt_text !== void 0 ? patch.alt_text : existing.alt_text,
		caption: patch.caption !== void 0 ? patch.caption : existing.caption,
		sort_order: patch.sort_order !== void 0 ? patch.sort_order : existing.sort_order
	};
	await sql`
    UPDATE gallery_items SET
      title = ${merged.title},
      alt_text = ${merged.alt_text},
      caption = ${merged.caption},
      sort_order = ${merged.sort_order}
    WHERE id = ${id}::uuid
  `;
}
async function deleteGalleryItem(id) {
	return (await getSql()`
    DELETE FROM gallery_items
    WHERE id = ${id}::uuid
    RETURNING id, kind, storage_path, public_url, title, alt_text, caption, sort_order, created_at, created_by
  `)[0] ?? null;
}
function toPublicProduct(row) {
	return {
		id: row.slug,
		name: row.name,
		category: row.category_label ?? "",
		price: row.price_ugx,
		image: row.image_url,
		description: row.description,
		bestFor: row.best_for ?? "",
		isBestseller: row.is_bestseller
	};
}
async function listActiveProducts() {
	return (await getSql()`
    SELECT id, slug, name, category_label, price_ugx, description, best_for,
           image_url, is_bestseller, is_active, sort_order, created_at, updated_at
    FROM products
    WHERE is_active = true
    ORDER BY sort_order ASC, created_at ASC
  `).map(toPublicProduct);
}
async function listAllProductsAdmin() {
	return await getSql()`
    SELECT id, slug, name, category_label, price_ugx, description, best_for,
           image_url, is_bestseller, is_active, sort_order, created_at, updated_at
    FROM products
    ORDER BY sort_order ASC, created_at ASC
  `;
}
async function insertProduct(input) {
	return (await getSql()`
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
  `)[0];
}
async function updateProduct(id, patch) {
	const sql = getSql();
	const existing = (await sql`SELECT * FROM products WHERE id = ${id}::uuid`)[0];
	if (!existing) return null;
	const merged = {
		slug: patch.slug !== void 0 ? patch.slug : existing.slug,
		name: patch.name !== void 0 ? patch.name : existing.name,
		category_label: patch.category_label !== void 0 ? patch.category_label : existing.category_label,
		price_ugx: patch.price_ugx !== void 0 ? patch.price_ugx : existing.price_ugx,
		description: patch.description !== void 0 ? patch.description : existing.description,
		best_for: patch.best_for !== void 0 ? patch.best_for : existing.best_for,
		image_url: patch.image_url !== void 0 ? patch.image_url : existing.image_url,
		is_bestseller: patch.is_bestseller !== void 0 ? patch.is_bestseller : existing.is_bestseller,
		is_active: patch.is_active !== void 0 ? patch.is_active : existing.is_active,
		sort_order: patch.sort_order !== void 0 ? patch.sort_order : existing.sort_order
	};
	return (await sql`
    UPDATE products SET
      slug = ${merged.slug},
      name = ${merged.name},
      category_label = ${merged.category_label},
      price_ugx = ${merged.price_ugx},
      description = ${merged.description},
      best_for = ${merged.best_for},
      image_url = ${merged.image_url},
      is_bestseller = ${merged.is_bestseller},
      is_active = ${merged.is_active},
      sort_order = ${merged.sort_order}
    WHERE id = ${id}::uuid
    RETURNING id, slug, name, category_label, price_ugx, description, best_for,
              image_url, is_bestseller, is_active, sort_order, created_at, updated_at
  `)[0] ?? null;
}
async function deleteProduct(id) {
	return (await getSql()`
    DELETE FROM products
    WHERE id = ${id}::uuid
    RETURNING id, slug, name, category_label, price_ugx, description, best_for,
              image_url, is_bestseller, is_active, sort_order, created_at, updated_at
  `)[0] ?? null;
}
async function createEnquiry(input) {
	return (await getSql()`
    INSERT INTO enquiries (name, email, phone, enquiry_type, message)
    VALUES (${input.name}, ${input.email}, ${input.phone ?? null}, ${input.enquiryType}, ${input.message})
    RETURNING id, name, email, phone, enquiry_type, message, status, created_at
  `)[0];
}
async function listEnquiriesAdmin() {
	return await getSql()`
    SELECT id, name, email, phone, enquiry_type, message, status, created_at
    FROM enquiries
    ORDER BY created_at DESC
  `;
}
async function updateEnquiryStatus(id, status) {
	await getSql()`UPDATE enquiries SET status = ${status} WHERE id = ${id}`;
}
async function uploadFileToVercelBlob(file, folder) {
	validateMediaFile(file);
	const token = process.env.BLOB_READ_WRITE_TOKEN;
	if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured in environment variables");
	const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
	return put(`${folder}/${Date.now()}-${cleanFilename}`, file, {
		access: "public",
		token
	});
}
var adminUploadToBlob_createServerFn_handler = createServerRpc({
	id: "abdbbc7e2f1cdcdfb769f625d5df4b02009a8847ec583fb8c659f2a9a17c2360",
	name: "adminUploadToBlob",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminUploadToBlob.__executeServer(opts));
var adminUploadToBlob = createServerFn({ method: "POST" }).validator((formData) => {
	if (!(formData instanceof FormData)) throw new Error("Expected FormData");
	return formData;
}).handler(adminUploadToBlob_createServerFn_handler, async ({ data }) => {
	await requireAdminUser();
	const file = data.get("file");
	const folder = data.get("folder") || "uploads";
	if (!file || !(file instanceof File)) throw new Error("No valid file provided");
	const blob = await uploadFileToVercelBlob(file, folder);
	return {
		url: blob.url,
		pathname: blob.pathname,
		contentType: blob.contentType
	};
});
var adminUploadGalleryMedia_createServerFn_handler = createServerRpc({
	id: "42a6becae11437452c78aefe78aa9be97f84bfe28dd0b2fb56f98f799749a352",
	name: "adminUploadGalleryMedia",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminUploadGalleryMedia.__executeServer(opts));
var adminUploadGalleryMedia = createServerFn({ method: "POST" }).validator((formData) => {
	if (!(formData instanceof FormData)) throw new Error("Expected FormData");
	return formData;
}).handler(adminUploadGalleryMedia_createServerFn_handler, async ({ data }) => {
	const userId = await requireAdminUser();
	const file = data.get("file");
	const title = data.get("title") || null;
	const altText = data.get("alt_text") || null;
	const caption = data.get("caption") || null;
	if (!file || !(file instanceof File)) throw new Error("No valid file provided");
	const { isImage } = validateMediaFile(file);
	const blob = await uploadFileToVercelBlob(file, isImage ? "gallery/images" : "gallery/videos");
	return await insertGalleryItem({
		kind: isImage ? "image" : "video",
		storage_path: blob.pathname,
		public_url: blob.url,
		title: title || file.name,
		alt_text: altText,
		caption,
		created_by: userId
	});
});
var getHeroContent_createServerFn_handler = createServerRpc({
	id: "6278ebe23a81c514b976e3b27ddbcf15ed786c7c6afec8c8b7758aa1ec745971",
	name: "getHeroContent",
	filename: "src/lib/cms.functions.ts"
}, (opts) => getHeroContent.__executeServer(opts));
var getHeroContent = createServerFn({ method: "GET" }).handler(getHeroContent_createServerFn_handler, async () => {
	return await fetchSiteContent("hero") ?? defaultHero;
});
var getContactContent_createServerFn_handler = createServerRpc({
	id: "495a6adf81a7247537d1f53ac213b175bfcd88376de54d503e328a355e745bd4",
	name: "getContactContent",
	filename: "src/lib/cms.functions.ts"
}, (opts) => getContactContent.__executeServer(opts));
var getContactContent = createServerFn({ method: "GET" }).handler(getContactContent_createServerFn_handler, async () => {
	return await fetchSiteContent("contact") ?? defaultContact;
});
var getServicesContent_createServerFn_handler = createServerRpc({
	id: "ebf08975cf16b545465847c49dfe350361ccdd07cf673c99e7d2d3acd0529a09",
	name: "getServicesContent",
	filename: "src/lib/cms.functions.ts"
}, (opts) => getServicesContent.__executeServer(opts));
var getServicesContent = createServerFn({ method: "GET" }).handler(getServicesContent_createServerFn_handler, async () => {
	return await fetchSiteContent("services") ?? defaultServices;
});
var getPublicGallery_createServerFn_handler = createServerRpc({
	id: "ef3258bb638ef51d1956abac8d1ba5b03d013b3d8e968221684bb2f26695a49a",
	name: "getPublicGallery",
	filename: "src/lib/cms.functions.ts"
}, (opts) => getPublicGallery.__executeServer(opts));
var getPublicGallery = createServerFn({ method: "GET" }).handler(getPublicGallery_createServerFn_handler, async () => {
	return (await listGalleryItems()).map(({ id, kind, public_url, title, alt_text, caption }) => ({
		id,
		kind,
		public_url,
		title,
		alt_text,
		caption
	}));
});
var getProducts_createServerFn_handler = createServerRpc({
	id: "919f7c1f7db98383bbb304b4eb6067275367a396c79e4a936f6accbf035b58a0",
	name: "getProducts",
	filename: "src/lib/cms.functions.ts"
}, (opts) => getProducts.__executeServer(opts));
var getProducts = createServerFn({ method: "GET" }).handler(getProducts_createServerFn_handler, async () => {
	return listActiveProducts();
});
var enquirySchema = objectType({
	name: stringType().trim().min(1, "Name is required").max(200),
	email: stringType().trim().email("Enter a valid email address"),
	phone: stringType().trim().max(50).optional(),
	enquiryType: stringType().trim().min(1).max(50),
	message: stringType().trim().min(1, "Message is required").max(5e3)
});
var submitEnquiry_createServerFn_handler = createServerRpc({
	id: "7969728da6b4611711a4169bf9bdda77eac4ef42745d9026d330d0777d2b86e1",
	name: "submitEnquiry",
	filename: "src/lib/cms.functions.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
var submitEnquiry = createServerFn({ method: "POST" }).validator(enquirySchema).handler(submitEnquiry_createServerFn_handler, async ({ data }) => {
	return { id: (await createEnquiry(data)).id };
});
var adminListEnquiries_createServerFn_handler = createServerRpc({
	id: "a35324e53f4e5f35040ecd5ce2a39785127da156a24b350d62b50e83274a6ffa",
	name: "adminListEnquiries",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminListEnquiries.__executeServer(opts));
var adminListEnquiries = createServerFn({ method: "GET" }).handler(adminListEnquiries_createServerFn_handler, async () => {
	await requireAdminUser();
	return listEnquiriesAdmin();
});
var enquiryStatusSchema = objectType({
	id: stringType().uuid(),
	status: enumType([
		"new",
		"read",
		"archived"
	])
});
var adminUpdateEnquiryStatus_createServerFn_handler = createServerRpc({
	id: "0a3064f663b919e00bc0d2e00ddb748b888333311d246da1279cedd4a80843ae",
	name: "adminUpdateEnquiryStatus",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminUpdateEnquiryStatus.__executeServer(opts));
var adminUpdateEnquiryStatus = createServerFn({ method: "POST" }).validator(enquiryStatusSchema).handler(adminUpdateEnquiryStatus_createServerFn_handler, async ({ data }) => {
	await requireAdminUser();
	await updateEnquiryStatus(data.id, data.status);
	return { ok: true };
});
var checkIsAdmin_createServerFn_handler = createServerRpc({
	id: "a6f4e90d72158e3bd67f13498b26aee25c2e16500297b2df3ce0cf5f72470301",
	name: "checkIsAdmin",
	filename: "src/lib/cms.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
var checkIsAdmin = createServerFn({ method: "GET" }).handler(checkIsAdmin_createServerFn_handler, async () => {
	const userId = await getAuthenticatedUserId();
	if (!userId) return false;
	return userHasRole(userId, "admin");
});
var contentKeySchema = objectType({
	key: enumType([
		"hero",
		"contact",
		"services"
	]),
	value: unknownType()
});
var saveSiteContent_createServerFn_handler = createServerRpc({
	id: "42ef96df7d301903bc96302af8088f07b2ed9cfaa0b7e924f116e282aab911bc",
	name: "saveSiteContent",
	filename: "src/lib/cms.functions.ts"
}, (opts) => saveSiteContent.__executeServer(opts));
var saveSiteContent = createServerFn({ method: "POST" }).validator(contentKeySchema).handler(saveSiteContent_createServerFn_handler, async ({ data }) => {
	const userId = await requireAdminUser();
	await upsertSiteContent(data.key, data.value, userId);
});
var adminListGallery_createServerFn_handler = createServerRpc({
	id: "6889310af250e32021deb6d885887f1b94f1c40476245e18979189590563b4ea",
	name: "adminListGallery",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminListGallery.__executeServer(opts));
var adminListGallery = createServerFn({ method: "GET" }).handler(adminListGallery_createServerFn_handler, async () => {
	await requireAdminUser();
	return listGalleryItems();
});
var adminGalleryCount_createServerFn_handler = createServerRpc({
	id: "2f3f7afe480be87d928e4d4225d81e5a212aa93daa1c64b2b7b05ff00bbcf143",
	name: "adminGalleryCount",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminGalleryCount.__executeServer(opts));
var adminGalleryCount = createServerFn({ method: "GET" }).handler(adminGalleryCount_createServerFn_handler, async () => {
	await requireAdminUser();
	return countGalleryItems();
});
var galleryUpdateSchema = objectType({
	id: stringType().uuid(),
	title: stringType().nullable().optional(),
	alt_text: stringType().nullable().optional(),
	caption: stringType().nullable().optional(),
	sort_order: numberType().optional()
});
var adminUpdateGalleryItem_createServerFn_handler = createServerRpc({
	id: "ff4f506794b02ed7ca31645d84c60ffbf27b0a272f57614912616e250e4e4509",
	name: "adminUpdateGalleryItem",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminUpdateGalleryItem.__executeServer(opts));
var adminUpdateGalleryItem = createServerFn({ method: "POST" }).validator(galleryUpdateSchema).handler(adminUpdateGalleryItem_createServerFn_handler, async ({ data }) => {
	await requireAdminUser();
	const { id, ...patch } = data;
	await updateGalleryItem(id, patch);
});
var adminDeleteGalleryItem_createServerFn_handler = createServerRpc({
	id: "0b6785cfe8bcf0d3a3ca2259269166deffcabb77a2a80ad89d3ecf69b0136440",
	name: "adminDeleteGalleryItem",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminDeleteGalleryItem.__executeServer(opts));
var adminDeleteGalleryItem = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid() })).handler(adminDeleteGalleryItem_createServerFn_handler, async ({ data }) => {
	await requireAdminUser();
	const deleted = await deleteGalleryItem(data.id);
	if (!deleted) throw new Error("Gallery item not found");
	if (deleted.public_url && (deleted.public_url.includes("vercel-storage.com") || deleted.public_url.includes("blob.vercel"))) try {
		const token = process.env.BLOB_READ_WRITE_TOKEN;
		await del(deleted.public_url, { token });
	} catch (err) {
		console.error("Failed to delete blob from Vercel storage:", err);
	}
	return deleted;
});
var adminListProducts_createServerFn_handler = createServerRpc({
	id: "990c47a1b16a49feeebbd8dc54d9820bb3f2c672258d6f806e73abb790eab857",
	name: "adminListProducts",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminListProducts.__executeServer(opts));
var adminListProducts = createServerFn({ method: "GET" }).handler(adminListProducts_createServerFn_handler, async () => {
	await requireAdminUser();
	return listAllProductsAdmin();
});
var productInputSchema = objectType({
	slug: stringType().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
	name: stringType().min(1),
	category_label: stringType().nullable().optional(),
	price_ugx: numberType().int().nonnegative(),
	description: stringType().optional(),
	best_for: stringType().nullable().optional(),
	image_url: stringType().min(1),
	is_bestseller: booleanType().optional(),
	is_active: booleanType().optional(),
	sort_order: numberType().int().optional()
});
var adminCreateProduct_createServerFn_handler = createServerRpc({
	id: "60602f7e9308614abc5cb1e6c7dda7b56f60c7b359289a564f08d12dcb35e49c",
	name: "adminCreateProduct",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminCreateProduct.__executeServer(opts));
var adminCreateProduct = createServerFn({ method: "POST" }).validator(productInputSchema).handler(adminCreateProduct_createServerFn_handler, async ({ data }) => {
	await requireAdminUser();
	return insertProduct(data);
});
var adminUpdateProduct_createServerFn_handler = createServerRpc({
	id: "c6bdb6dde72a1648b280a76ff6ed6f2d949745129f7f8a2b3b2c71a41a5b96ff",
	name: "adminUpdateProduct",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminUpdateProduct.__executeServer(opts));
var adminUpdateProduct = createServerFn({ method: "POST" }).validator(productInputSchema.partial().extend({ id: stringType().uuid() })).handler(adminUpdateProduct_createServerFn_handler, async ({ data }) => {
	await requireAdminUser();
	const { id, ...patch } = data;
	const updated = await updateProduct(id, patch);
	if (!updated) throw new Error("Product not found");
	return updated;
});
var adminDeleteProduct_createServerFn_handler = createServerRpc({
	id: "7101edec48a17f1ed34a845e093c61d10089e462bc0f9af0d8552911ef34ee8b",
	name: "adminDeleteProduct",
	filename: "src/lib/cms.functions.ts"
}, (opts) => adminDeleteProduct.__executeServer(opts));
var adminDeleteProduct = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid() })).handler(adminDeleteProduct_createServerFn_handler, async ({ data }) => {
	await requireAdminUser();
	const deleted = await deleteProduct(data.id);
	if (!deleted) throw new Error("Product not found");
	return deleted;
});
//#endregion
export { adminCreateProduct_createServerFn_handler, adminDeleteGalleryItem_createServerFn_handler, adminDeleteProduct_createServerFn_handler, adminGalleryCount_createServerFn_handler, adminListEnquiries_createServerFn_handler, adminListGallery_createServerFn_handler, adminListProducts_createServerFn_handler, adminUpdateEnquiryStatus_createServerFn_handler, adminUpdateGalleryItem_createServerFn_handler, adminUpdateProduct_createServerFn_handler, adminUploadGalleryMedia_createServerFn_handler, adminUploadToBlob_createServerFn_handler, checkIsAdmin_createServerFn_handler, getContactContent_createServerFn_handler, getHeroContent_createServerFn_handler, getProducts_createServerFn_handler, getPublicGallery_createServerFn_handler, getServicesContent_createServerFn_handler, saveSiteContent_createServerFn_handler, submitEnquiry_createServerFn_handler };
