import * as React from "react";

import { cn } from "@/lib/utils";

function ButtonGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn(
        "flex overflow-hidden rounded-lg shadow-xs inset-ring inset-ring-input [&>button]:flex-1 [&>button]:rounded-none [&>button]:px-2.5 [&>button]:text-secondary-foreground [&>button:not(:first-child)]:shadow-[inset_1px_0_0_var(--input)] [&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg [&>button_svg]:text-fg-quaternary",
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup };
