"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full bg-muted p-0.5 shadow-[inset_0_0_0_0.5px_var(--border)] transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:bg-brand-fill disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-4 rounded-full bg-white shadow-sm transition-transform duration-150 ease-in-out data-checked:translate-x-4"
      />
    </SwitchPrimitive.Root>
  );
}

function SwitchRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="switch-row" className={cn("flex items-start gap-3", className)} {...props} />
  );
}

function SwitchLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="switch-label" className={cn("text-sm font-medium text-secondary-foreground", className)} {...props} />
  );
}

function SwitchHint({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="switch-hint" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export { Switch, SwitchHint, SwitchLabel, SwitchRow };
