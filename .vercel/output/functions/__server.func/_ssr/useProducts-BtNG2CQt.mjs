import { m as getProducts, o as adminListProducts } from "./cms.functions-CoGRr0hG.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProducts-BtNG2CQt.js
function useProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(),
		initialData: [],
		initialDataUpdatedAt: 0,
		staleTime: 6e4
	});
}
function useAdminProducts() {
	return useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => adminListProducts()
	});
}
function useInvalidateProducts() {
	const qc = useQueryClient();
	return () => {
		qc.invalidateQueries({ queryKey: ["products"] });
		qc.invalidateQueries({ queryKey: ["admin", "products"] });
	};
}
//#endregion
export { useInvalidateProducts as n, useProducts as r, useAdminProducts as t };
