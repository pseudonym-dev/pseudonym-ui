import * as React from "react";

import { cn } from "@/lib/utils";

/** A pulsing placeholder for content that is still loading. Size it like the content it stands in for. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("animate-pulse rounded-md bg-foreground/8 motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

export { Skeleton };
