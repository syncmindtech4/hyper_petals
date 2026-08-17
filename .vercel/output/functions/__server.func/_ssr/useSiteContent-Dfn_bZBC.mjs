import { n as defaultHero, r as defaultServices, t as defaultContact } from "./content-defaults-CfGnnh1v.mjs";
import { d as checkIsAdmin, f as getContactContent, g as getServicesContent, p as getHeroContent } from "./cms.functions-CoGRr0hG.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSiteContent-Dfn_bZBC.js
function useHero() {
	return useQuery({
		queryKey: ["site_content", "hero"],
		queryFn: () => getHeroContent(),
		initialData: defaultHero,
		initialDataUpdatedAt: 0,
		staleTime: 6e4
	});
}
function useContact() {
	return useQuery({
		queryKey: ["site_content", "contact"],
		queryFn: () => getContactContent(),
		initialData: defaultContact,
		initialDataUpdatedAt: 0,
		staleTime: 6e4
	});
}
function useServicesContent() {
	return useQuery({
		queryKey: ["site_content", "services"],
		queryFn: () => getServicesContent(),
		initialData: defaultServices,
		initialDataUpdatedAt: 0,
		staleTime: 6e4
	});
}
function useIsAdmin() {
	return useQuery({
		queryKey: ["is_admin"],
		queryFn: () => checkIsAdmin(),
		staleTime: 3e4
	});
}
//#endregion
export { useServicesContent as i, useHero as n, useIsAdmin as r, useContact as t };
