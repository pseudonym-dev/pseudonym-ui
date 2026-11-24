import * as React from "react";

import { cn } from "@/lib/utils";

function TopBar({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="top-bar"
      className={cn(
        "sticky top-0 z-20 flex h-(--topbar-height,60px) shrink-0 items-center gap-3 border-b border-border bg-background px-5",
        className,
      )}
      {...props}
    />
  );
}

function TopBarBrand({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="top-bar-brand"
      type="button"
      className={cn(
        "inline-flex items-center gap-2.5 bg-transparent p-0 text-base font-semibold text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    />
  );
}

function TopBarBrandMark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="top-bar-brand-mark"
      className={cn(
        "inline-grid size-8 place-items-center rounded-lg bg-primary font-mono text-[13px] font-bold tracking-tighter text-primary-foreground shadow-skeuo",
        className,
      )}
      {...props}
    />
  );
}

function TopBarSpacer({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="top-bar-spacer" className={cn("flex-1", className)} {...props} />;
}

export { TopBar, TopBarBrand, TopBarBrandMark, TopBarSpacer };
