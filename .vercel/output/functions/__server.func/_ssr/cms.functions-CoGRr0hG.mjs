import { c as createServerFn } from "./esm-C9N-ta7K.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BhEbcv-J.mjs";
import { a as stringType, i as objectType, n as enumType, o as unknownType, r as numberType, t as booleanType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.functions-CoGRr0hG.js
var adminUploadToBlob = createServerFn({ method: "POST" }).validator((formData) => {
	if (!(formData instanceof FormData)) throw new Error("Expected FormData");
	return formData;
}).handler(createSsrRpc("abdbbc7e2f1cdcdfb769f625d5df4b02009a8847ec583fb8c659f2a9a17c2360"));
var adminUploadGalleryMedia = createServerFn({ method: "POST" }).validator((formData) => {
	if (!(formData instanceof FormData)) throw new Error("Expected FormData");
	return formData;
}).handler(createSsrRpc("42a6becae11437452c78aefe78aa9be97f84bfe28dd0b2fb56f98f799749a352"));
var getHeroContent = createServerFn({ method: "GET" }).handler(createSsrRpc("6278ebe23a81c514b976e3b27ddbcf15ed786c7c6afec8c8b7758aa1ec745971"));
var getContactContent = createServerFn({ method: "GET" }).handler(createSsrRpc("495a6adf81a7247537d1f53ac213b175bfcd88376de54d503e328a355e745bd4"));
var getServicesContent = createServerFn({ method: "GET" }).handler(createSsrRpc("ebf08975cf16b545465847c49dfe350361ccdd07cf673c99e7d2d3acd0529a09"));
var getPublicGallery = createServerFn({ method: "GET" }).handler(createSsrRpc("ef3258bb638ef51d1956abac8d1ba5b03d013b3d8e968221684bb2f26695a49a"));
var getProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("919f7c1f7db98383bbb304b4eb6067275367a396c79e4a936f6accbf035b58a0"));
var enquirySchema = objectType({
	name: stringType().trim().min(1, "Name is required").max(200),
	email: stringType().trim().email("Enter a valid email address"),
	phone: stringType().trim().max(50).optional(),
	enquiryType: stringType().trim().min(1).max(50),
	message: stringType().trim().min(1, "Message is required").max(5e3)
});
var submitEnquiry = createServerFn({ method: "POST" }).validator(enquirySchema).handler(createSsrRpc("7969728da6b4611711a4169bf9bdda77eac4ef42745d9026d330d0777d2b86e1"));
createServerFn({ method: "GET" }).handler(createSsrRpc("a35324e53f4e5f35040ecd5ce2a39785127da156a24b350d62b50e83274a6ffa"));
var enquiryStatusSchema = objectType({
	id: stringType().uuid(),
	status: enumType([
		"new",
		"read",
		"archived"
	])
});
createServerFn({ method: "POST" }).validator(enquiryStatusSchema).handler(createSsrRpc("0a3064f663b919e00bc0d2e00ddb748b888333311d246da1279cedd4a80843ae"));
var checkIsAdmin = createServerFn({ method: "GET" }).handler(createSsrRpc("a6f4e90d72158e3bd67f13498b26aee25c2e16500297b2df3ce0cf5f72470301"));
var contentKeySchema = objectType({
	key: enumType([
		"hero",
		"contact",
		"services"
	]),
	value: unknownType()
});
var saveSiteContent = createServerFn({ method: "POST" }).validator(contentKeySchema).handler(createSsrRpc("42ef96df7d301903bc96302af8088f07b2ed9cfaa0b7e924f116e282aab911bc"));
var adminListGallery = createServerFn({ method: "GET" }).handler(createSsrRpc("6889310af250e32021deb6d885887f1b94f1c40476245e18979189590563b4ea"));
var adminGalleryCount = createServerFn({ method: "GET" }).handler(createSsrRpc("2f3f7afe480be87d928e4d4225d81e5a212aa93daa1c64b2b7b05ff00bbcf143"));
var galleryUpdateSchema = objectType({
	id: stringType().uuid(),
	title: stringType().nullable().optional(),
	alt_text: stringType().nullable().optional(),
	caption: stringType().nullable().optional(),
	sort_order: numberType().optional()
});
var adminUpdateGalleryItem = createServerFn({ method: "POST" }).validator(galleryUpdateSchema).handler(createSsrRpc("ff4f506794b02ed7ca31645d84c60ffbf27b0a272f57614912616e250e4e4509"));
var adminDeleteGalleryItem = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid() })).handler(createSsrRpc("0b6785cfe8bcf0d3a3ca2259269166deffcabb77a2a80ad89d3ecf69b0136440"));
var adminListProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("990c47a1b16a49feeebbd8dc54d9820bb3f2c672258d6f806e73abb790eab857"));
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
var adminCreateProduct = createServerFn({ method: "POST" }).validator(productInputSchema).handler(createSsrRpc("60602f7e9308614abc5cb1e6c7dda7b56f60c7b359289a564f08d12dcb35e49c"));
var adminUpdateProduct = createServerFn({ method: "POST" }).validator(productInputSchema.partial().extend({ id: stringType().uuid() })).handler(createSsrRpc("c6bdb6dde72a1648b280a76ff6ed6f2d949745129f7f8a2b3b2c71a41a5b96ff"));
var adminDeleteProduct = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid() })).handler(createSsrRpc("7101edec48a17f1ed34a845e093c61d10089e462bc0f9af0d8552911ef34ee8b"));
//#endregion
export { saveSiteContent as _, adminListGallery as a, adminUpdateProduct as c, checkIsAdmin as d, getContactContent as f, getServicesContent as g, getPublicGallery as h, adminGalleryCount as i, adminUploadGalleryMedia as l, getProducts as m, adminDeleteGalleryItem as n, adminListProducts as o, getHeroContent as p, adminDeleteProduct as r, adminUpdateGalleryItem as s, adminCreateProduct as t, adminUploadToBlob as u, submitEnquiry as v };
