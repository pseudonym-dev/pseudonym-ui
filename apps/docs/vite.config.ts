import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.DOCS_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/components/ui": resolve(root, "../../registry/ui"),
      "@/lib": resolve(root, "../../registry/lib"),
    },
  },
  server: { port: 5173 },
  preview: { port: 4173 },
});
