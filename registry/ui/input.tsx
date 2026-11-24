import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-10 w-full min-w-0 rounded-lg bg-background px-3 text-base text-foreground shadow-xs inset-ring inset-ring-input outline-none transition-[box-shadow] duration-100 placeholder:text-muted-foreground focus-visible:inset-ring-2 focus-visible:inset-ring-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:inset-ring-destructive sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
