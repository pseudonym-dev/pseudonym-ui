import { expect, test } from "@playwright/test";

test("home page renders the hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /ASCII Studio look/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Export" }).first()).toBeVisible();
});

test("theme toggle switches to dark", async ({ page }) => {
  await page.goto("/docs");
  const toggle = page.getByRole("button", { name: /Switch to dark theme|Switch to light theme/ });
  await expect(toggle).toBeVisible();
  const before = await page.locator("html").getAttribute("data-theme");
  await toggle.click();
  const after = await page.locator("html").getAttribute("data-theme");
  expect(after).not.toBe(before);
});

test("component page shows preview, code and install command", async ({ page }) => {
  await page.goto("/docs/components/button");
  await expect(page.getByRole("heading", { name: "Button" })).toBeVisible();
  await expect(page.getByText(/npx shadcn@latest add/)).toBeVisible();
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(page.locator("pre").getByText("variant=\"primary\"")).toBeVisible();
});

test("registry item is served as JSON", async ({ request }) => {
  const response = await request.get("/r/button.json");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.name).toBe("button");
  expect(body.files[0].content).toContain("buttonVariants");
});

test("home top bar is opaque so content does not show through", async ({ page }) => {
  await page.goto("/");
  const background = await page.locator('[data-slot="top-bar"]').evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(background).toBe("rgb(255, 255, 255)");
});

test("code blocks are highlighted and follow the theme", async ({ page }) => {
  await page.goto("/docs/components/button");
  await page.getByRole("tab", { name: "Code" }).click();
  const block = page.locator(".code-block").filter({ has: page.locator("pre.shiki") }).first();
  await expect(block).toBeVisible();
  expect(await block.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe("rgb(255, 255, 255)");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  expect(await block.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe("rgb(255, 255, 255)");
});
