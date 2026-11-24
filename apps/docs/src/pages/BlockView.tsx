import { Suspense, useEffect } from "react";
import { Navigate, useParams } from "react-router";

import { useTheme } from "@/components/ui/theme-toggle";

import { getBlock } from "../lib/blocks";

/** Full-screen block for the docs iframe and "open in new tab". Follows theme changes made in the docs. */
export function BlockView() {
  const block = getBlock(useParams().slug);
  const { setTheme } = useTheme();

  useEffect(() => {
    // The docs reserve a scrollbar gutter; a standalone block should use the full width.
    document.documentElement.style.scrollbarGutter = "auto";
    const onStorage = (event: StorageEvent) => {
      if (event.key === "theme" && (event.newValue === "light" || event.newValue === "dark")) setTheme(event.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      document.documentElement.style.scrollbarGutter = "";
    };
  }, [setTheme]);

  if (!block) return <Navigate to="/docs/blocks" replace />;

  return (
    <Suspense fallback={null}>
      <block.Component />
    </Suspense>
  );
}
