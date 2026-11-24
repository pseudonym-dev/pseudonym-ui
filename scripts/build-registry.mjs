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
  if (item.cssVars) built.cssVars = item.cssVars;

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
