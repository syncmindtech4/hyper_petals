import { c as createServerFn } from "./esm-C9N-ta7K.mjs";
import { n as createServerRpc } from "./auth-BXgARgBJ.mjs";
import { r as requireAdminUser } from "./auth.server-dwEa7WCj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-v5R1RZ6O.js
var requireAdminFn_createServerFn_handler = createServerRpc({
	id: "6b73bbcabad50b9bb1bd3d11cc6735299ff09f25797d4ceebaf3941af3365220",
	name: "requireAdminFn",
	filename: "src/routes/_authenticated/admin.tsx"
}, (opts) => requireAdminFn.__executeServer(opts));
var requireAdminFn = createServerFn().handler(requireAdminFn_createServerFn_handler, async () => {
	await requireAdminUser();
});
//#endregion
export { requireAdminFn_createServerFn_handler };
