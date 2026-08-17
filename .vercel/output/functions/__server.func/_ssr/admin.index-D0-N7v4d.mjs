import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as adminGalleryCount } from "./cms.functions-CoGRr0hG.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useAdminProducts } from "./useProducts-BtNG2CQt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-D0-N7v4d.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Overview() {
	const { data: galleryCount } = useQuery({
		queryKey: ["admin", "gallery_count"],
		queryFn: () => adminGalleryCount()
	});
	const { data: products } = useAdminProducts();
	const productCount = products?.length ?? 0;
	const liveCount = products?.filter((p) => p.is_active).length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 md:grid-cols-3",
		children: [
			{
				title: "Site content",
				body: "Edit hero copy, contact info, and service cards.",
				to: "/admin/content",
				cta: "Edit content"
			},
			{
				title: "Products",
				body: `${productCount} product${productCount === 1 ? "" : "s"} (${liveCount} live). Add, edit, or hide bouquets.`,
				to: "/admin/products",
				cta: "Manage products"
			},
			{
				title: "Gallery",
				body: `${galleryCount ?? 0} media item${galleryCount === 1 ? "" : "s"} on the site. Upload, edit, or remove.`,
				to: "/admin/gallery",
				cta: "Manage gallery"
			}
		].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: c.to,
			className: "group rounded-sm border border-border/70 bg-card p-8 shadow-[var(--shadow-card)] transition-colors hover:border-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl text-foreground",
					children: c.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: c.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-6 inline-block border-b border-primary pb-1 text-[11px] uppercase tracking-[0.22em] text-primary group-hover:opacity-70",
					children: [c.cta, " →"]
				})
			]
		}, c.to))
	});
}
//#endregion
export { Overview as component };
