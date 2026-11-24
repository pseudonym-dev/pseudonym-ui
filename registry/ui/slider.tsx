"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({ className, children, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("flex w-full touch-none flex-col select-none", className)}
      {...props}
    >
      {children ?? (
        <SliderPrimitive.Control className="flex h-6 w-full items-center">
          <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-border select-none">
            <SliderPrimitive.Indicator className="absolute h-full rounded-full bg-brand-fill" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            className="block size-5 rounded-full bg-white shadow-md ring-2 ring-brand-fill outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </SliderPrimitive.Control>
      )}
    </SliderPrimitive.Root>
  );
}

function SliderField({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="slider-field" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function SliderHead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="slider-head"
      className={cn("flex items-baseline justify-between text-sm", className)}
      {...props}
    />
  );
}

export { Slider, SliderField, SliderHead };
