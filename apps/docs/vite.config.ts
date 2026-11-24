import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

/** GitHub Pages has no SPA fallback; it serves 404.html for missing paths. */
function pagesSpaFallback(): Plugin {
  let outDir = resolve(root, "dist");
  return {
    name: "pages-spa-fallback",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const index = resolve(outDir, "index.html");
      if (!existsSync(index)) throw new Error("pages-spa-fallback: index.html was not written");
      copyFileSync(index, resolve(outDir, "404.html"));
    },
  };
}

export default defineConfig({
  base: process.env.DOCS_BASE ?? "/",
  plugins: [react(), tailwindcss(), pagesSpaFallback()],
  resolve: {
    alias: {
      "@/components/ui": resolve(root, "../../registry/ui"),
      "@/lib": resolve(root, "../../registry/lib"),
    },
  },
  server: { port: 5173 },
  preview: { port: 4173 },
});
