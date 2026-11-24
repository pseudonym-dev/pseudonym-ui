import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "../..");
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8")) as {
  items: { name: string; files: { path: string }[]; dependencies?: string[]; registryDependencies?: string[] }[];
};

describe("registry.json", () => {
  it.each(registry.items.filter((item) => item.files.length > 0).map((item) => [item.name, item] as const))(
    "%s declares every import it uses",
    (_, item) => {
      const imports = item.files.flatMap((file) =>
        [...readFileSync(join(root, file.path), "utf8").matchAll(/from "([^"]+)"/g)].map((match) => match[1]),
      );
      const registryNames = (item.registryDependencies ?? []).map((url) => url.split("/").pop()!.replace(".json", ""));
      const packages = (item.dependencies ?? []).map((dep) => dep.replace(/(.)@.*$/, "$1"));

      for (const source of imports) {
        if (source.startsWith("@/")) expect(registryNames, source).toContain(source.split("/").pop());
        else if (source !== "react" && !source.startsWith("./"))
          expect(packages, source).toContain(source.startsWith("@") ? source.split("/").slice(0, 2).join("/") : source.split("/")[0]);
      }
    },
  );
});
