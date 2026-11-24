import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-6 items-center gap-1.5 rounded-full bg-muted px-2.5 pl-2 text-xs font-medium text-secondary-foreground inset-ring inset-ring-border",
  {
    variants: {
      tone: {
        default: "before:size-1.5 before:rounded-full before:bg-primary before:content-['']",
        plain: "",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
