import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SignIn$1 } from "./dist-Bev1KVaa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-oA2sGE2k.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function AuthPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow self-start",
				children: "Admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 self-start font-serif text-4xl text-foreground",
				children: "Sign in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 self-start text-sm text-muted-foreground",
				children: "Access reserved for site administrators."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 w-full flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignIn$1, {
					routing: "hash",
					fallbackRedirectUrl: "/admin",
					signUpFallbackRedirectUrl: "/admin"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary",
				children: "← Back to site"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
