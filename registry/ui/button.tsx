import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-sm font-semibold transition-[background-color,color,box-shadow] duration-100 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:stroke-[1.75]",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-skeuo shadow-xs inset-ring inset-ring-input hover:bg-accent hover:text-foreground [&_svg]:text-fg-quaternary hover:[&_svg]:text-muted-foreground",
        primary:
          "bg-primary text-primary-foreground shadow-skeuo shadow-xs hover:bg-brand-hover before:pointer-events-none before:absolute before:inset-px before:rounded-[7px] before:border before:border-white/25 before:[mask-image:linear-gradient(#000,transparent)] [&_svg]:text-primary-foreground/70",
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        md: "h-9 px-3",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
