import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-detail-DxRvqIyZ.js
var $$splitComponentImporter = () => import("./product-detail-BdvJmRt2.mjs");
var productSearchSchema = objectType({ id: stringType().catch("wine-blush-dozen") });
var Route = createFileRoute("/product-detail")({
	validateSearch: (search) => productSearchSchema.parse(search),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => {
		return { meta: [{ title: "Shop Bouquets — Hyper Petals Decor" }, {
			name: "description",
			content: "Handcrafted bouquets and floral arrangements, delivered same-day across Kampala."
		}] };
	}
});
//#endregion
export { Route as t };
