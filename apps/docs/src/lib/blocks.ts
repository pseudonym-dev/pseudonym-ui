import { type ComponentType, lazy } from "react";

import registry from "../../../../registry.json";

const modules = import.meta.glob<{ default: ComponentType }>("../../../../registry/blocks/*.tsx");
const sources = import.meta.glob<string>("../../../../registry/blocks/*.tsx", { query: "?raw", import: "default" });

/** Preview frame heights; full-screen blocks fill whatever height they get. */
const heights: Record<string, number> = {
  "hero-01": 760,
  "pricing-01": 860,
  "login-01": 760,
  "dashboard-01": 960,
  "charts-01": 720,
  "sidebar-01": 640,
  "sidebar-02": 640,
  "navbar-01": 480,
  "settings-01": 1180,
  "editor-01": 720,
};

export const blocks = registry.items
  .filter((item) => item.type === "registry:block")
  .map((item) => {
    const path = `../../../../registry/blocks/${item.name}.tsx`;
    return {
      slug: item.name,
      title: item.title,
      description: item.description,
      height: heights[item.name] ?? 720,
      Component: lazy(modules[path]),
      loadSource: sources[path],
    };
  });

export function getBlock(slug: string | undefined) {
  return blocks.find((block) => block.slug === slug);
}
