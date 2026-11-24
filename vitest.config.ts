import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components/ui": resolve(root, "registry/ui"),
      "@/lib": resolve(root, "registry/lib"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [resolve(root, "test/setup.ts")],
    include: ["registry/**/*.test.tsx", "registry/**/*.test.ts", "test/unit/**/*.test.ts"],
  },
});
