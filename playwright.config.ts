import { defineConfig, devices } from "@playwright/test";

const port = 4173;
const base = process.env.PW_BASE_URL ?? `http://127.0.0.1:${port}/`;

export default defineConfig({
  testDir: "test/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: base,
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm build && pnpm --filter @pseudonym-ui/docs exec vite preview --host 127.0.0.1 --port 4173",
    url: base,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
