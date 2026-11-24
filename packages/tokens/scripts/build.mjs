/**
 * Reads W3C DTCG token JSON, resolves aliases with Style Dictionary,
 * and emits the Tailwind v4 theme CSS used by Pseudonym UI.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import StyleDictionary from "style-dictionary";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (...parts) => join(root, "src", ...parts);
const dist = (...parts) => join(root, "dist", ...parts);

const THEME_KEYS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "brand-hover",
  "brand-text",
  "brand-fill",
  "fg-quaternary",
  "overlay",
  "dots",
  "stripes",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "canvas-shadow",
];

function leafValue(token) {
  if (token && typeof token === "object" && "$value" in token) return token.$value;
  return token;
}

function flatten(obj, prefix = []) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && !("$value" in value) && !Array.isArray(value)) {
      Object.assign(out, flatten(value, [...prefix, key]));
    } else {
      out[[...prefix, key].join(".")] = leafValue(value);
    }
  }
  return out;
}

function resolveRef(value, primitives) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, path) => {
    if (!(path in primitives)) throw new Error(`Unknown token reference: {${path}}`);
    return String(primitives[path]);
  });
}

async function resolvedSet(sources, pick) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: sources,
    log: { verbosity: "silent" },
  });
  await sd.hasInitialized;
  const all = flatten(sd.tokens ?? sd.dictionary?.tokens ?? {});
  // Style Dictionary 5 exposes tokens after init; also merge raw files as fallback.
  const raw = {};
  for (const file of sources) {
    Object.assign(raw, flatten(JSON.parse(await readFile(file, "utf8"))));
  }
  const merged = { ...raw, ...all };
  const primitives = {};
  for (const [k, v] of Object.entries(merged)) primitives[k] = v;
  // resolve repeatedly until stable
  for (let i = 0; i < 8; i++) {
    let changed = false;
    for (const [k, v] of Object.entries(primitives)) {
      const next = resolveRef(v, primitives);
      if (next !== v) {
        primitives[k] = next;
        changed = true;
      }
    }
    if (!changed) break;
  }
  return pick(primitives);
}

function cssVars(map, indent = "  ") {
  return THEME_KEYS.map((key) => `${indent}--${key}: ${map[key]};`).join("\n");
}

function themeCss(light, dark, shared) {
  const font = Array.isArray(shared.font)
    ? shared.font.map((f) => (f.includes(" ") ? `"${f}"` : f)).join(", ")
    : shared.font;
  const easing = Array.isArray(shared.easing)
    ? `cubic-bezier(${shared.easing.join(", ")})`
    : shared.easing;

  return `/* Pseudonym UI theme. Generated from DTCG tokens. Do not edit by hand. */

@custom-variant dark (&:is(.dark *, [data-theme="dark"] *));

:root {
  color-scheme: light;
  --radius: ${shared.radius};
  --font-sans: ${font};
  --ease: ${easing};
  --duration-fast: ${shared.fast};
  --duration-mid: ${shared.mid};
  --duration-slow: ${shared.slow};
  --sidebar-width: ${shared.sidebar};
  --topbar-height: ${shared.topbar};
  --breakpoint-md: ${shared.breakpoint};
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
  --shadow-skeuo: 0 0 0 1px rgba(0, 0, 0, 0.18) inset, 0 -2px 0 0 rgba(0, 0, 0, 0.05) inset;
  --shadow-float: 0 12px 16px -4px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
${cssVars(light)}
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
${cssVars(dark)}
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-brand-hover: var(--brand-hover);
  --color-brand-text: var(--brand-text);
  --color-brand-fill: var(--brand-fill);
  --color-fg-quaternary: var(--fg-quaternary);
  --color-overlay: var(--overlay);
  --font-sans: var(--font-sans);
  --radius-sm: calc(var(--radius) * 0.75);
  --radius-md: var(--radius);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.5);
  --radius-2xl: calc(var(--radius) * 2);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-skeuo: var(--shadow-skeuo);
  --shadow-float: var(--shadow-float);
  --shadow-canvas: var(--canvas-shadow);
  --ease-standard: var(--ease);
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: "cv11", "ss01";
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
`;
}

function pickTheme(tokens, mode) {
  const prefix = `theme.${mode}.`;
  const out = {};
  for (const key of THEME_KEYS) {
    const value = tokens[prefix + key];
    if (value == null) throw new Error(`Missing ${prefix}${key}`);
    out[key] = value;
  }
  return out;
}

const primitivesPath = src("primitives.json");
const lightPath = src("semantic.light.json");
const darkPath = src("semantic.dark.json");

const lightTokens = await resolvedSet([primitivesPath, lightPath], (t) => t);
const darkTokens = await resolvedSet([primitivesPath, darkPath], (t) => t);

const shared = {
  radius: lightTokens["radius.base"],
  font: lightTokens["font.sans"],
  easing: lightTokens["easing.standard"],
  fast: lightTokens["duration.fast"],
  mid: lightTokens["duration.mid"],
  slow: lightTokens["duration.slow"],
  sidebar: lightTokens["layout.sidebar"],
  topbar: lightTokens["layout.topbar"],
  breakpoint: lightTokens["layout.breakpoint"],
};

const light = pickTheme(lightTokens, "light");
const dark = pickTheme(darkTokens, "dark");

await mkdir(dist(), { recursive: true });
await writeFile(dist("theme.css"), themeCss(light, dark, shared));
await writeFile(
  dist("tokens.json"),
  JSON.stringify({ light, dark, shared, primitives: Object.fromEntries(Object.entries(lightTokens).filter(([k]) => k.startsWith("color.") || k.startsWith("radius.") || k.startsWith("font.") || k.startsWith("duration.") || k.startsWith("easing.") || k.startsWith("layout."))) }, null, 2) + "\n",
);

console.log("Wrote packages/tokens/dist/theme.css and tokens.json");
