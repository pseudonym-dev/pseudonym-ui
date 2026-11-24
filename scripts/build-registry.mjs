/**
 * Build shadcn-compatible registry items into apps/docs/public/r.
 * Each file's source is inlined as `files[].content`, which is what
 * `npx shadcn add <url>` expects.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "apps/docs/public/r");

const registry = JSON.parse(await readFile(join(root, "registry.json"), "utf8"));

/** Turns the generated theme.css into shadcn `cssVars`, so the theme item needs no npm package. */
async function themeCssVars() {
  const css = await readFile(join(root, "packages/tokens/dist/theme.css"), "utf8");
  const block = (selector) => {
    const start = css.indexOf(`${selector} {`);
    if (start === -1) throw new Error(`theme.css has no "${selector}" block`);
    const body = css.slice(start, css.indexOf("\n}", start));
    return Object.fromEntries([...body.matchAll(/^\s*--([\w-]+):\s*(.+);$/gm)].map((m) => [m[1], m[2]]));
  };
  // shadcn mirrors every :root var into `@theme inline`, so a `--breakpoint-*` var would become
  // `@media (width >= var(...))`, which is invalid CSS and breaks consumers' `md:` classes.
  const light = Object.fromEntries(Object.entries(block(":root")).filter(([name]) => !name.startsWith("breakpoint-")));
  return { theme: block("@theme inline"), light, dark: block('[data-theme="dark"]') };
}

await mkdir(outDir, { recursive: true });

for (const item of registry.items) {
  const built = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
  };
  if (item.dependencies) built.dependencies = item.dependencies;
  if (item.devDependencies) built.devDependencies = item.devDependencies;
  if (item.registryDependencies) built.registryDependencies = item.registryDependencies;
  if (item.docs) built.docs = item.docs;
  if (item.categories) built.categories = item.categories;
  if (item.cssVars) built.cssVars = item.cssVars;
  if (item.type === "registry:theme") built.cssVars = await themeCssVars();

  built.files = [];
  for (const file of item.files ?? []) {
    const source = await readFile(join(root, file.path), "utf8");
    built.files.push({
      path: file.path,
      type: file.type,
      content: source,
      target: file.target,
    });
  }

  const dest = join(outDir, `${item.name}.json`);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, JSON.stringify(built, null, 2) + "\n");
}

await writeFile(join(outDir, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
console.log(`Wrote ${registry.items.length} registry items to apps/docs/public/r`);
