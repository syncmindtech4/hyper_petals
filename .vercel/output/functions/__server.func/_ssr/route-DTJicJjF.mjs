import { B as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./esm-C9N-ta7K.mjs";
import { n as createServerRpc, t as auth } from "./auth-BXgARgBJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DTJicJjF.js
var checkAuthFn_createServerFn_handler = createServerRpc({
	id: "d689aea8e830972b0e4feeb279cbaa4916d4d159555731905062a836b90546b8",
	name: "checkAuthFn",
	filename: "src/routes/_authenticated/route.tsx"
}, (opts) => checkAuthFn.__executeServer(opts));
var checkAuthFn = createServerFn().handler(checkAuthFn_createServerFn_handler, async () => {
	const { userId } = await auth();
	if (!userId) throw redirect({ to: "/auth" });
	return { userId };
});
//#endregion
export { checkAuthFn_createServerFn_handler };
