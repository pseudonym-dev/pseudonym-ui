import { blocks } from "./blocks";

export const docsNav = [
  {
    title: "Get started",
    items: [
      { to: "/docs", label: "Introduction" },
      { to: "/docs/installation", label: "Installation" },
      { to: "/docs/theming", label: "Theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { to: "/docs/components/button", label: "Button" },
      { to: "/docs/components/button-group", label: "Button Group" },
      { to: "/docs/components/chart", label: "Chart" },
      { to: "/docs/components/badge", label: "Badge" },
      { to: "/docs/components/field", label: "Field" },
      { to: "/docs/components/switch", label: "Switch" },
      { to: "/docs/components/slider", label: "Slider" },
      { to: "/docs/components/progress", label: "Progress" },
      { to: "/docs/components/tabs", label: "Tabs" },
      { to: "/docs/components/tooltip", label: "Tooltip" },
      { to: "/docs/components/select", label: "Select" },
      { to: "/docs/components/card", label: "Card" },
      { to: "/docs/components/drop-zone", label: "Drop Zone" },
      { to: "/docs/components/drawer", label: "Drawer" },
      { to: "/docs/components/input", label: "Input" },
      { to: "/docs/components/top-bar", label: "Top Bar" },
      { to: "/docs/components/sidebar", label: "Sidebar" },
      { to: "/docs/components/timeline", label: "Timeline" },
      { to: "/docs/components/theme-toggle", label: "Theme Toggle" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { to: "/docs/blocks", label: "Overview" },
      ...blocks.map((block) => ({ to: `/docs/blocks/${block.slug}`, label: block.title })),
    ],
  },
  {
    title: "Foundation",
    items: [{ to: "/docs/tokens", label: "Tokens" }],
  },
];
