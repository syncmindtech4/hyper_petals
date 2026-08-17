import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// Standalone Vite config — replaces @lovable.dev/vite-tanstack-config.
//
// What this covers, matching what Lovable's wrapper used to provide:
//   - tanstackStart(): TanStack Start's SSR/router/server-fn compiler plugin
//   - viteReact(): React fast refresh
//   - tailwindcss(): Tailwind v4's Vite plugin
//   - tsConfigPaths(): resolves the "@/*" -> "./src/*" alias from tsconfig.json
//   - nitro(): production build/deploy target — explicitly pinned to the
//     "vercel" preset, and ONLY loaded during `vite build` (see below).
//
// IMPORTANT: nitro is only added to the plugins array when command === "build".
// Lovable's original config does exactly this too (gate: `command === "build"`).
// nitro's dev-mode multi-environment worker is beta-quality and known to be
// unstable on Windows ("Vite environment 'nitro' is unavailable", worker
// crashes on named pipes) — see https://github.com/nitrojs/nitro/issues/3917.
// TanStack Start's own dev server doesn't need nitro at all; nitro's only
// job here is packaging the production build for Vercel.
//
// Intentionally NOT included (Lovable-sandbox-only features, safe to drop
// for a self-hosted/standalone setup):
//   - componentTagger (Lovable's click-to-edit element tagging)
//   - @lovable.dev/vite-plugin-dev-server-bridge (live link to Lovable's editor)
//   - @lovable.dev/vite-plugin-hmr-gate (HMR coordination with that bridge)
//   - Lovable sandbox error-diagnostics / sandbox detection
//
// If you ever go back to editing this project inside Lovable's UI, you'd
// need to reinstall @lovable.dev/vite-tanstack-config and revert this file.

export default defineConfig(async ({ command }) => {
  const plugins = [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Preserves the original config's redirect to your custom SSR
      // error-wrapper entry point (src/server.ts), instead of TanStack
      // Start's default bundled server entry.
      server: { entry: "server" },
    }),
    viteReact(),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro({ preset: "vercel" }));
  }

  return {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
    plugins,
  };
});
