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

test("blocks index links to a block with a live preview", async ({ page }) => {
  await page.goto("/docs/blocks");
  await page.getByRole("link", { name: /Dashboard/ }).first().click();
  await expect(page.getByText(/npx shadcn@latest add/)).toBeVisible();
  const preview = page.frameLocator("iframe");
  await expect(preview.getByRole("heading", { name: "Overview" })).toBeVisible();
});

test("theme item does not mirror breakpoints into consumers' @theme", async ({ request }) => {
  const body = await (await request.get("/r/theme.json")).json();
  expect(Object.keys(body.cssVars.light).filter((name) => name.startsWith("breakpoint-"))).toEqual([]);
});

test("block charts show a tooltip on hover", async ({ page }) => {
  await page.goto("/view/dashboard-01");
  const plot = page.getByLabel(/^Exports over time\. Use the arrow keys/);
  const box = (await plot.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page.getByText("Previous period").nth(1)).toBeVisible();
});

test("GitHub Pages fallback serves the SPA for nested routes and leaves registry files alone", async ({ page, request }) => {
  const index = await request.get("/");
  const fallback = await request.get("/404.html");
  expect(index.ok()).toBeTruthy();
  expect(fallback.ok()).toBeTruthy();
  const html = await fallback.text();
  expect(html).toBe(await index.text());
  // Asset URLs must be root-absolute so 404.html still loads them from /docs/... or /view/....
  expect(html).toMatch(/src="\/(?:pseudonym-ui\/)?assets\/[^"]+\.js"/);
  expect(html).toMatch(/href="\/(?:pseudonym-ui\/)?assets\/[^"]+\.css"/);

  const registry = await request.get("/r/button.json");
  expect(registry.ok()).toBeTruthy();
  expect((await registry.json()).name).toBe("button");

  const nested = await request.get("/view/hero-01");
  expect(nested.status()).toBe(404);
  expect(await nested.text()).toBe(html);

  await page.goto("/view/hero-01");
  await expect(page.getByRole("heading", { name: /Turn any clip into living ASCII/ })).toBeVisible();
});
