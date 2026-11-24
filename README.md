# Pseudonym UI

The interface language of [ASCII Studio](https://pseudonym-dev.github.io/ASCII-Studio/), packaged as a [shadcn](https://ui.shadcn.com) registry plus a small CSS token package.

Components are source you copy into your app. The visual identity — colours, typography, radius, shadows — lives in `@pseudonym-ui/tokens`, so a theme change can roll out without rewriting every project.

Documentation (once GitHub Pages is on): [pseudonym-dev.github.io/pseudonym-ui](https://pseudonym-dev.github.io/pseudonym-ui)

## Install

You need a React + Tailwind CSS v4 project already initialised with `npx shadcn@latest init`.

### Theme

```bash
npx shadcn@latest add https://pseudonym-dev.github.io/pseudonym-ui/r/theme.json
```

This writes the light and dark CSS variables and the Tailwind theme into your global CSS. Once `@pseudonym-ui/tokens` is published to npm, you can import it as a package instead:

```bash
pnpm add @pseudonym-ui/tokens
```

```css
@import "tailwindcss";
@import "@pseudonym-ui/tokens/theme.css";
```

### Components

```bash
npx shadcn@latest add https://pseudonym-dev.github.io/pseudonym-ui/r/button.json
```

Or register a namespace in `components.json`:

```json
{
  "registries": {
    "@pseudonym": "https://pseudonym-dev.github.io/pseudonym-ui/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @pseudonym/button
```

## What’s in v0.1

Button, Button Group, Badge, Field, Switch, Slider, Progress, Tabs, Tooltip, Select, Card, Drop Zone, Drawer, Top Bar, Sidebar, Timeline, Theme Toggle.

The look matches ASCII Studio at commit `cc9f890`: lime `#d4ff3a`, Inter, 8px radius, skeuomorphic secondary buttons, light and dark themes.

Interactive controls use [Base UI](https://base-ui.com). Variants use `cva`. Class names are merged with `cn`.

## Repo layout

```
packages/tokens   DTCG token sources, Style Dictionary build, published as @pseudonym-ui/tokens
registry/ui       Component source installed by the shadcn CLI
registry/lib      cn() helper
apps/docs         Documentation site (Vite). Serves /r/*.json for the registry
```

## Development

```bash
pnpm install
pnpm build:tokens
pnpm dev
```

Then open [http://localhost:5173](http://localhost:5173).

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build          # tokens, registry, docs
pnpm test:e2e
```

Version bumps for the token package go through [Changesets](https://github.com/changesets/changesets).

## Credits

Visual language from [ASCII Studio](https://pseudonym-dev.github.io/ASCII-Studio/). Font: [Inter](https://rsms.me/inter/) (SIL OFL 1.1). Icons: [Lucide](https://lucide.dev) (ISC). Registry format and token names follow [shadcn/ui](https://ui.shadcn.com).

This repository does not include a license file yet.
