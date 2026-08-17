import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { m as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as dist_exports } from "./dist-Bev1KVaa.mjs";
import { r as useIsAdmin } from "./useSiteContent-Dfn_bZBC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-bNy43xtm.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function AdminLayout() {
	const { data: isAdmin, isLoading } = useIsAdmin();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-6 py-20 text-sm text-muted-foreground",
		children: "Loading admin…"
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-6 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Access denied"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl text-foreground",
				children: "Not an admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "This account doesn't have admin access. Ask a site owner to grant you the admin role, then reload."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(dist_exports.SignOutButton, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded-sm border border-input px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] hover:bg-accent",
					children: "Sign out"
				}) })
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-6 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Admin dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-3xl text-foreground",
					children: "Hyper Petals Decor CMS"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-4 text-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(dist_exports.UserButton, { showName: true })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-6 flex gap-6 border-b border-border/40",
				children: [
					{
						to: "/admin",
						label: "Overview"
					},
					{
						to: "/admin/content",
						label: "Site content"
					},
					{
						to: "/admin/products",
						label: "Products"
					},
					{
						to: "/admin/gallery",
						label: "Gallery"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: t.to,
					activeOptions: { exact: t.to === "/admin" },
					activeProps: { className: "border-primary text-primary" },
					inactiveProps: { className: "border-transparent text-muted-foreground hover:text-foreground" },
					className: "-mb-px border-b-2 pb-3 text-[11px] uppercase tracking-[0.22em]",
					children: t.label
				}, t.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
