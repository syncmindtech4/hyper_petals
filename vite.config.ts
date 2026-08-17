import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// Standalone Vite config — replaces @lovable.dev/vite-tanstack-config.
//
// What this covers, matching what Lovable's wrapper used to provide:
//   - tanstackStart(): TanStack Start's SSR/router/server-fn compiler plugin
//   - viteReact(): React fast refresh
//   - tailwindcss(): Tailwind v4's Vite plugin
//   - tsConfigPaths(): resolves the "@/*" -> "./src/*" alias from tsconfig.json
//   - nitro(): production build/deploy target — explicitly pinned to the
//     "vercel" preset rather than relying on auto-detection, since this
//     project deploys to Vercel.
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

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Preserves the original config's redirect to your custom SSR
      // error-wrapper entry point (src/server.ts), instead of TanStack
      // Start's default bundled server entry.
      server: { entry: "server" },
    }),
    viteReact(),
    nitro({
      preset: "vercel",
    }),
  ],
});