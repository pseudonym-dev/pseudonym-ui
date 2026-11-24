import * as React from "react";

import { cn } from "@/lib/utils";

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field" className={cn("flex min-w-0 flex-col gap-1.5", className)} {...props} />;
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn("text-sm font-medium text-secondary-foreground", className)}
      {...props}
    />
  );
}

function FieldHint({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="field-hint" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function FieldGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field-grid" className={cn("grid grid-cols-2 gap-x-3 gap-y-4", className)} {...props} />
  );
}

function FieldValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="field-value"
      className={cn("tabular-nums text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Field, FieldGrid, FieldHint, FieldLabel, FieldValue };
